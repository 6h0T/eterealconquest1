import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"

// Función para determinar si estamos en desarrollo
function isDevelopment() {
  return process.env.NODE_ENV === "development"
}

// Mock data generator function
function generateMockData(type: string) {
  switch (type) {
    case "level":
      return Array.from({ length: 10 }, (_, i) => ({
        Name: `Player${i + 1}`,
        Class: Math.floor(Math.random() * 5) * 16,
        cLevel: 400 - i * 10,
        Resets: Math.floor(Math.random() * 20),
      }))
    case "resets":
      return Array.from({ length: 10 }, (_, i) => ({
        Name: `Player${i + 1}`,
        Class: Math.floor(Math.random() * 5) * 16,
        cLevel: 300 + Math.floor(Math.random() * 100),
        Resets: 20 - i,
      }))
    case "grandresets":
      return Array.from({ length: 10 }, (_, i) => ({
        Name: `Player${i + 1}`,
        Class: Math.floor(Math.random() * 5) * 16,
        Resets: 20 - Math.floor(Math.random() * 5),
        GrandResets: 5 - Math.floor(i / 2),
      }))
    case "killers":
      return Array.from({ length: 10 }, (_, i) => ({
        Name: `Killer${i + 1}`,
        Class: Math.floor(Math.random() * 5) * 16,
        cLevel: 300 + Math.floor(Math.random() * 100),
        PkCount: 100 - i * 8,
      }))
    case "guilds":
      return Array.from({ length: 10 }, (_, i) => ({
        G_Name: `Guild${i + 1}`,
        G_Master: `Master${i + 1}`,
        G_Score: 10000 - i * 800,
      }))
    case "online":
      return Array.from({ length: 5 }, (_, i) => ({
        Name: `Online${i + 1}`,
        Class: Math.floor(Math.random() * 5) * 16,
        cLevel: 300 + Math.floor(Math.random() * 100),
      }))
    case "gens":
      return Array.from({ length: 10 }, (_, i) => ({
        Name: `GensPlayer${i + 1}`,
        Class: Math.floor(Math.random() * 5) * 16,
        GensFamily: Math.floor(Math.random() * 2) + 1,
        GensContribution: 5000 - i * 400,
      }))
    case "votes":
      return Array.from({ length: 10 }, (_, i) => ({
        username: `Voter${i + 1}`,
        votes: 100 - i * 8,
      }))
    case "master":
      return Array.from({ length: 10 }, (_, i) => ({
        Name: `Master${i + 1}`,
        Class: Math.floor(Math.random() * 5) * 16,
        cLevel: 400,
        Resets: 20 - Math.floor(Math.random() * 5),
        MasterLevel: 200 - i * 15,
      }))
    default:
      return []
  }
}

export async function GET(request: Request, { params }: { params: { type: string } }) {
  try {
    const type = params.type
    let query = ""

    // Define queries based on ranking type
    switch (type) {
      case "level":
        query = `
          SELECT TOP 100 Name, Class, cLevel, Resets
          FROM Character
          WHERE CtlCode IS NULL OR CtlCode = 0
          ORDER BY cLevel DESC, Resets DESC
        `
        break
      case "resets":
        query = `
          SELECT TOP 100 Name, Class, cLevel, Resets
          FROM Character
          WHERE CtlCode IS NULL OR CtlCode = 0
          ORDER BY Resets DESC, cLevel DESC
        `
        break
      case "grandresets":
        query = `
          SELECT TOP 100 Name, Class, Resets, GrandResets
          FROM Character
          WHERE CtlCode IS NULL OR CtlCode = 0
          ORDER BY GrandResets DESC, Resets DESC
        `
        break
      case "killers":
        query = `
          SELECT TOP 100 Name, Class, cLevel, PkCount
          FROM Character
          WHERE CtlCode IS NULL OR CtlCode = 0
          ORDER BY PkCount DESC
        `
        break
      case "guilds":
        query = `
          SELECT TOP 100 G_Name, G_Master, G_Score
          FROM Guild
          ORDER BY G_Score DESC
        `
        break
      case "online":
        query = `
          SELECT TOP 100 C.Name, C.Class, C.cLevel
          FROM Character C
          INNER JOIN MEMB_STAT M ON C.AccountID = M.memb___id
          WHERE M.ConnectStat = 1
          ORDER BY C.Name
        `
        break
      case "gens":
        query = `
          SELECT TOP 100 Name, Class, GensFamily, GensContribution
          FROM Character
          WHERE GensFamily > 0
          ORDER BY GensContribution DESC
        `
        break
      case "votes":
        query = `
          SELECT TOP 100 username, votes
          FROM webengine_votes
          ORDER BY votes DESC
        `
        break
      case "master":
        query = `
          SELECT TOP 100 Name, Class, cLevel, Resets, MasterLevel
          FROM Character
          WHERE CtlCode IS NULL OR CtlCode = 0
          ORDER BY MasterLevel DESC, Resets DESC
        `
        break
      default:
        return NextResponse.json({ success: false, error: "Tipo de ranking no válido" }, { status: 404 })
    }

    try {
      // Try to connect to the database
      const db = await connectToDB()
      const result = await db.query(query)

      // Return the database results
      return NextResponse.json({
        success: true,
        ranking: result.recordset,
      })
    } catch (dbError) {
      console.error(`Database error fetching ${type} rankings:`, dbError)

      // Always return mock data when there's a database error
      // This ensures the UI doesn't break
      const mockData = generateMockData(type)

      // In development, we'll return success with mock data
      // In production, we'll also return mock data but with a warning flag
      return NextResponse.json({
        success: true,
        ranking: mockData,
        isDemo: true,
        message: isDevelopment()
          ? "Using demo data in development mode"
          : "Database connection error - showing sample data",
      })
    }
  } catch (error) {
    console.error(`Error fetching ${params.type} rankings:`, error)

    // Return mock data even for general errors
    const mockData = generateMockData(params.type)

    return NextResponse.json({
      success: true,
      ranking: mockData,
      isDemo: true,
      message: "Error processing request - showing sample data",
    })
  }
}
