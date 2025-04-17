import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { characterName } = await req.json()
    if (!characterName) {
      return NextResponse.json({ error: "Falta el nombre del personaje" }, { status: 400 })
    }

    const db = await connectToDB()

    // Traer nivel actual del personaje
    const res = await db
      .request()
      .input("characterName", characterName)
      .query(`
      SELECT cLevel FROM Character WHERE Name = @characterName
    `)

    if (res.recordset.length === 0) {
      return NextResponse.json({ error: "Personaje no encontrado" }, { status: 404 })
    }

    const currentLevel = res.recordset[0].cLevel
    const requiredLevel = 400 // o el que tu server utilice

    if (currentLevel < requiredLevel) {
      return NextResponse.json({ error: `Debes ser nivel ${requiredLevel} para hacer reset.` }, { status: 400 })
    }

    // Ejecutar reset
    await db
      .request()
      .input("characterName", characterName)
      .query(`
      UPDATE Character
      SET cLevel = 1,
          Experience = 0,
          LevelUpPoint = 0,
          MapNumber = 0,
          MapPosX = 125,
          MapPosY = 125,
          Resets = Resets + 1
      WHERE Name = @characterName
    `)

    return NextResponse.json({ success: true, message: "Reset realizado correctamente" })
  } catch (error) {
    return NextResponse.json({ error: "Error al procesar el reset", details: String(error) }, { status: 500 })
  }
}
