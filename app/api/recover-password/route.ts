import { NextResponse } from "next/server"
import { z } from "zod"
import { connectToDB } from "@/lib/db"

const schema = z.object({
  email: z.string().email(),
})

export async function POST(req: Request) {
  try {
    const data = await req.json()
    console.log("Datos recibidos:", JSON.stringify(data, null, 2)) // Log para depuración

    const parsed = schema.safeParse(data)
    if (!parsed.success) {
      console.error("Error de validación:", parsed.error.format())
      return NextResponse.json({ error: "Datos inválidos", details: parsed.error.format() }, { status: 400 })
    }

    const { email } = parsed.data

    let pool
    try {
      // Conectar a la base de datos
      pool = await connectToDB()

      // Verificar si el email existe
      const result = await pool
        .request()
        .input("email", email)
        .query("SELECT memb___id FROM MEMB_INFO WHERE mail_addr = @email")

      if (result.recordset.length === 0) {
        return NextResponse.json({ error: "El correo electrónico no está registrado" }, { status: 400 })
      }

      // En un caso real, aquí enviaríamos un correo electrónico con un enlace para restablecer la contraseña
      // Por ahora, simulamos que el correo se envió correctamente

      return NextResponse.json({ success: true, message: "Instrucciones enviadas al correo electrónico" })
    } catch (err: any) {
      console.error("Error en recuperación de contraseña:", err)

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
        },
        { status: 500 },
      )
    } finally {
      if (pool) {
        await pool.close()
      }
    }
  } catch (err: any) {
    console.error("Error al procesar la solicitud:", err)
    return NextResponse.json(
      {
        error: "Error al procesar la solicitud",
        details: err.message,
      },
      { status: 400 },
    )
  }
}
