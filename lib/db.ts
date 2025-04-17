import sql from "mssql"

// Configuración de la conexión a la base de datos
const config = {
  user: process.env.SQL_DB_USER,
  password: process.env.SQL_DB_PASS,
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

// Singleton para la conexión a la base de datos
let pool: sql.ConnectionPool | null = null

export async function connectToDB() {
  try {
    // Check if all required connection parameters are provided
    if (!process.env.SQL_DB_USER || !process.env.SQL_DB_PASS || !process.env.SQL_DB_HOST || !process.env.SQL_DB_NAME) {
      console.warn("Database connection parameters missing.")
      throw new Error("Database connection parameters missing")
    }

    // Imprimir información de diagnóstico (sin la contraseña)
    console.log("Intentando conectar a la base de datos con la siguiente configuración:", {
      user: process.env.SQL_DB_USER,
      server: process.env.SQL_DB_HOST,
      database: process.env.SQL_DB_NAME,
      port: process.env.SQL_DB_PORT,
    })

    if (!pool) {
      console.log("Creando nueva conexión a la base de datos...")
      pool = new sql.ConnectionPool(config)
      await pool.connect()
      console.log("Conexión a la base de datos establecida correctamente")
    } else if (!pool.connected) {
      console.log("Reconectando a la base de datos...")
      await pool.connect()
    }

    return pool
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error)
    
    // Proporcionar información más detallada sobre el error
    if (error instanceof Error) {
      console.error("Tipo de error:", error.name)
      console.error("Mensaje:", error.message)
      console.error("Stack:", error.stack)
      
      // Verificar si es un error específico de SQL Server
      const sqlError = error as any;
      if (sqlError.code) {
        console.error("Código de error SQL:", sqlError.code)
      }
    }
    
    pool = null // Resetear el pool en caso de error
    throw error
  }
}

// Helper function to check if we're in development mode
export function isDevelopment() {
  return process.env.NODE_ENV === "development"
}

// Helper function to generate mock data for development
export function getMockData(type: string) {
  // This will be implemented in the route handler
  return []
}
