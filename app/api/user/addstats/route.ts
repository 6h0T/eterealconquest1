import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { characterName, stats } = await req.json()
    if (!characterName || !stats) return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 })

    const db = await connectToDB()
    const checkResult = await db
      .request()
      .input("characterName", characterName)
      .query(`
      SELECT LevelUpPoint, AccountID FROM Character WHERE Name = @characterName
    `)

    if (checkResult.recordset.length === 0) {
      return NextResponse.json({ error: "Personaje no encontrado" }, { status: 404 })
    }

    const available = checkResult.recordset[0].LevelUpPoint
    const accountID = checkResult.recordset[0].AccountID
    const total = stats.str + stats.agi + stats.vit + stats.ene
    if (total > available) {
      return NextResponse.json({ error: "No tienes suficientes puntos" }, { status: 400 })
    }

    // Iniciar una transacción para asegurar que ambas operaciones se completen o fallen juntas
    const transaction = new db.transaction()
    await transaction.begin()

    try {
      // Actualizar estadísticas del personaje
      await transaction
        .request()
        .input("characterName", characterName)
        .input("str", stats.str)
        .input("agi", stats.agi)
        .input("vit", stats.vit)
        .input("ene", stats.ene)
        .input("total", total)
        .query(`
          UPDATE Character SET
            Strength = Strength + @str,
            Dexterity = Dexterity + @agi,
            Vitality = Vitality + @vit,
            Energy = Energy + @ene,
            LevelUpPoint = LevelUpPoint - @total
          WHERE Name = @characterName
        `)

      // Registrar la actividad en la tabla de logs
      await transaction
        .request()
        .input("accountID", accountID)
        .input("characterName", characterName)
        .input("str", stats.str)
        .input("agi", stats.agi)
        .input("vit", stats.vit)
        .input("ene", stats.ene)
        .input("total", total)
        .input("ipAddress", req.headers.get("x-forwarded-for") || "unknown")
        .input("timestamp", new Date())
        .query(`
          INSERT INTO CharacterStatsLog (
            AccountID, 
            CharacterName, 
            StrengthAdded, 
            DexterityAdded, 
            VitalityAdded, 
            EnergyAdded, 
            TotalPointsUsed, 
            IPAddress, 
            Timestamp
          ) 
          VALUES (
            @accountID, 
            @characterName, 
            @str, 
            @agi, 
            @vit, 
            @ene, 
            @total, 
            @ipAddress, 
            @timestamp
          )
        `)

      // Confirmar la transacción
      await transaction.commit()

      return NextResponse.json({
        success: true,
        message: "Puntos añadidos correctamente",
        log: {
          accountID,
          characterName,
          stats: {
            str: stats.str,
            agi: stats.agi,
            vit: stats.vit,
            ene: stats.ene,
          },
          total,
          timestamp: new Date(),
        },
      })
    } catch (error) {
      // Revertir la transacción en caso de error
      await transaction.rollback()
      throw error
    }
  } catch (error) {
    console.error("Error al añadir estadísticas:", error)
    return NextResponse.json({ error: "Error al procesar la solicitud", details: String(error) }, { status: 500 })
  }
}
