import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { type: string } }) {
  try {
    const type = params.type
    const db = await connectToDB()
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
          SELECT TOP 100 Name, PkCount
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
          SELECT TOP 100 memb___id
          FROM MEMB_STAT
          WHERE ConnectStat = 1
          ORDER BY memb___id
        `
        break
      case "gens":
        query = `
          SELECT TOP 100 Name, GensFamily, GensContribution
          FROM Character
          WHERE GensFamily > 0
          ORDER BY GensContribution DESC
        `
        break
      case "votes":
        query = `
          SELECT TOP 100 account, votes
          FROM webengine_votes
          ORDER BY votes DESC
        `
        break
      default:
        return NextResponse.json([], { status: 404 })
    }

    const result = await db.query(query)
    return NextResponse.json(result.recordset)
  } catch (error) {
    console.error(`Error fetching ${params.type} rankings:`, error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
