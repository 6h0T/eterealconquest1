import { NextResponse } from "next/server"
import { z } from "zod"
import { connectToDB } from "@/lib/db"

// Esquema de validación para los datos de entrada
const schema = z.object({
  username: z.string().min(1, "El nombre de usuario es requerido"),
  password: z.string().min(1, "La contraseña es requerida"),
  newEmail: z.string().email("El formato del email no es válido"),
})

export async function POST(req: Request) {
  let pool = null
  try {
    // Obtener y validar los datos de entrada
    const data = await req.json()
    console.log("Datos recibidos en actualización de email:", JSON.stringify(data, null, 2))

    const parsed = schema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Datos inválidos",
          details: parsed.error.format(),
        },
        { status: 400 },
      )
    }

    const { username, password, newEmail } = parsed.data

    // Conectar a la base de datos
    pool = await connectToDB()

    // Verificar credenciales del usuario
    const authResult = await pool
      .request()
      .input("username", username)
      .input("password", password)
      .query("SELECT memb___id FROM MEMB_INFO WHERE memb___id = @username AND memb__pwd = @password")

    if (authResult.recordset.length === 0) {
      return NextResponse.json(
        {
          error: "Contraseña incorrecta",
        },
        { status: 401 },
      )
    }

    // Verificar si el nuevo email ya está en uso
    const emailCheckResult = await pool
      .request()
      .input("email", newEmail)
      .input("username", username)
      .query("SELECT memb___id FROM MEMB_INFO WHERE mail_addr = @email AND memb___id <> @username")

    if (emailCheckResult.recordset.length > 0) {
      return NextResponse.json(
        {
          error: "El correo electrónico ya está en uso por otra cuenta",
        },
        { status: 400 },
      )
    }

    // Actualizar el email
    await pool
      .request()
      .input("username", username)
      .input("newEmail", newEmail)
      .query("UPDATE MEMB_INFO SET mail_addr = @newEmail WHERE memb___id = @username")

    // Registrar la actividad (opcional)
    await pool
      .request()
      .input("username", username)
      .input("newEmail", newEmail)
      .input("ipAddress", req.headers.get("x-forwarded-for") || "unknown")
      .input("timestamp", new Date())
      .query(`
        INSERT INTO EmailChangeLog (
          AccountID,
          NewEmail,
          IPAddress,
          ChangeDate
        ) VALUES (
          @username,
          @newEmail,
          @ipAddress,
          @timestamp
        )
      `)

    return NextResponse.json({
      success: true,
      message: "Correo electrónico actualizado correctamente",
      data: {
        username,
        email: newEmail,
      },
    })
  } catch (err: any) {
    console.error("Error al actualizar email:", err)

    // Mensaje de error más descriptivo para el cliente
    let errorMessage = "Error en la base de datos"
    if (err.message && err.message.includes("Failed to connect")) {
      errorMessage = "No se pudo conectar a la base de datos. Por favor, inténtalo más tarde."
    } else if (err.message && err.message.includes("Login failed")) {
      errorMessage = "Error de autenticación con la base de datos. Contacta al administrador."
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: err.message,
        code: err.code || "UNKNOWN",
      },
      { status: 500 },
    )
  } finally {
    if (pool) {
      try {
        await pool.close()
        console.log("Conexión a la base de datos cerrada correctamente")
      } catch (closeErr) {
        console.error("Error al cerrar la conexión:", closeErr)
      }
    }
  }
}
