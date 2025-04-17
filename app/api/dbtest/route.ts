import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"
import sql from "mssql"

export async function GET() {
  let pool = null
  try {
    console.log("Test de conexión a la base de datos")
    console.log("Configuración:", {
      host: process.env.SQL_DB_HOST,
      port: process.env.SQL_DB_PORT,
      database: process.env.SQL_DB_NAME,
      user: process.env.SQL_DB_USER,
      // No mostrar password por seguridad
    })

    // Método 1: Intentar conectar directamente usando la configuración como objeto
    const config = {
      user: process.env.SQL_DB_USER,
      password: `${process.env.SQL_DB_PASS}`,
      server: process.env.SQL_DB_HOST || "",
      database: process.env.SQL_DB_NAME || "",
      port: Number(process.env.SQL_DB_PORT) || 1433,
      options: {
        encrypt: false,
        trustServerCertificate: true,
        connectionTimeout: 30000,
        requestTimeout: 30000,
        enableArithAbort: true,
        useUTC: true,
        dateFormat: 'ymd'
      },
    }

    let directResult = null;
    let connectionMethod = "";
    let directPool = null;

    try {
      console.log("Método 1: Intentando conectar con objeto de configuración...")
      directPool = new sql.ConnectionPool(config)
      await directPool.connect()
      console.log("Método 1: Conexión directa exitosa")

      // Probar una consulta simple
      directResult = await directPool.request().query("SELECT TOP 1 * FROM MEMB_INFO")
      console.log("Método 1: Consulta exitosa. Filas encontradas:", directResult.recordset.length)
      
      connectionMethod = "object";
      
      await directPool.close()
    } catch (objError: any) {
      console.error("Método 1: Error al conectar con objeto:", objError.message)
      
      // Método 2: Intentar con cadena de conexión
      try {
        console.log("Método 2: Intentando con cadena de conexión...")
        const connectionString = `Server=${process.env.SQL_DB_HOST},${process.env.SQL_DB_PORT};Database=${process.env.SQL_DB_NAME};User Id=${process.env.SQL_DB_USER};Password=${process.env.SQL_DB_PASS};Encrypt=false;TrustServerCertificate=true;Connection Timeout=30;`;
        
        directPool = new sql.ConnectionPool(connectionString)
        await directPool.connect()
        console.log("Método 2: Conexión con cadena exitosa")
        
        // Probar una consulta simple
        directResult = await directPool.request().query("SELECT TOP 1 * FROM MEMB_INFO")
        console.log("Método 2: Consulta exitosa. Filas encontradas:", directResult.recordset.length)
        
        connectionMethod = "string";
        
        await directPool.close()
      } catch (strError: any) {
        console.error("Método 2: Error al conectar con cadena:", strError.message)
        
        // Método 3: Intentar con contraseña entre comillas
        try {
          console.log("Método 3: Intentando con contraseña entrecomillada...")
          const configQuoted = {
            user: process.env.SQL_DB_USER,
            password: process.env.SQL_DB_PASS_QUOTED,
            server: process.env.SQL_DB_HOST || "",
            database: process.env.SQL_DB_NAME || "",
            port: Number(process.env.SQL_DB_PORT) || 1433,
            options: {
              encrypt: false,
              trustServerCertificate: true,
              connectionTimeout: 30000,
              requestTimeout: 30000,
              enableArithAbort: true
            }
          }
          
          directPool = new sql.ConnectionPool(configQuoted)
          await directPool.connect()
          console.log("Método 3: Conexión con contraseña entrecomillada exitosa")
          
          // Probar una consulta simple
          directResult = await directPool.request().query("SELECT TOP 1 * FROM MEMB_INFO")
          console.log("Método 3: Consulta exitosa. Filas encontradas:", directResult.recordset.length)
          
          connectionMethod = "quoted";
          
          await directPool.close()
        } catch (quotedError: any) {
          console.error("Método 3: Error al conectar con contraseña entrecomillada:", quotedError.message)
          throw quotedError; // Propagar el error para el manejador principal
        }
      }
    }

    // Ahora probar usando la función connectToDB
    console.log("Método 4: Intentando conectar usando connectToDB()...")
    pool = await connectToDB()
    console.log("Método 4: Conexión mediante connectToDB exitosa")

    return NextResponse.json({
      success: true,
      message: "Conexión a la base de datos establecida correctamente",
      connectionMethod,
      config: {
        host: process.env.SQL_DB_HOST,
        port: process.env.SQL_DB_PORT,
        database: process.env.SQL_DB_NAME,
        user: process.env.SQL_DB_USER,
      },
    })
  } catch (err: any) {
    console.error("Error al conectar a la base de datos:", err)
    console.error("Tipo:", err.name)
    console.error("Mensaje:", err.message)
    console.error("Código:", err.code || "UNKNOWN")
    console.error("Stack trace:", err.stack)

    return NextResponse.json(
      {
        success: false,
        error: "Error al conectar a la base de datos",
        message: err.message,
        code: err.code || "UNKNOWN",
        name: err.name,
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