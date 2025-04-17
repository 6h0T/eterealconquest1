"use client"

import { useState, useEffect } from "react"
import { Trophy, Medal, Award, Crown, Star, Heart, Users, Swords, AlertTriangle } from "lucide-react"
import type { Locale } from "@/i18n/config"

interface RankingsTableProps {
  type: string
  lang?: Locale
}

interface RankingData {
  ranking: any[]
  success: boolean
  isDemo?: boolean
  message?: string
}

const rankingTypes = [
  { id: "level", label: "Level" },
  { id: "resets", label: "Resets" },
  { id: "grandresets", label: "Grand Resets" },
  { id: "killers", label: "Killers" },
  { id: "guilds", label: "Guilds" },
  { id: "votes", label: "Votes" },
  { id: "online", label: "Online" },
  { id: "gens", label: "Gens" },
  { id: "master", label: "Master Level" },
]

export function RankingsTable({ type = "resets", lang = "es" }: RankingsTableProps) {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>("")
  const [isDemo, setIsDemo] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  // Traducciones específicas para la tabla de rankings
  const translations = {
    es: {
      loading: "Cargando rankings...",
      error: "Error al cargar los rankings",
      retry: "Reintentar",
      position: "Posición",
      name: "Nombre",
      level: "Nivel",
      resets: "Resets",
      grandresets: "Grand Resets",
      kills: "Asesinatos",
      guild: "Guild",
      master: "Líder",
      score: "Puntuación",
      account: "Cuenta",
      votes: "Votos",
      family: "Familia",
      contribution: "Contribución",
      class: "Clase",
      noData: "No hay datos disponibles",
      masterLevel: "Master Level",
      demoData: "Mostrando datos de ejemplo",
    },
    en: {
      loading: "Loading rankings...",
      error: "Error loading rankings",
      retry: "Retry",
      position: "Position",
      name: "Name",
      level: "Level",
      resets: "Resets",
      grandresets: "Grand Resets",
      kills: "Kills",
      guild: "Guild",
      master: "Leader",
      score: "Score",
      account: "Account",
      votes: "Votes",
      family: "Family",
      contribution: "Contribution",
      class: "Class",
      noData: "No data available",
      masterLevel: "Master Level",
      demoData: "Showing sample data",
    },
    pt: {
      loading: "Carregando rankings...",
      error: "Erro ao carregar rankings",
      retry: "Tentar novamente",
      position: "Posição",
      name: "Nome",
      level: "Nível",
      resets: "Resets",
      grandresets: "Grand Resets",
      kills: "Assassinatos",
      guild: "Guild",
      master: "Líder",
      score: "Pontuação",
      account: "Conta",
      votes: "Votos",
      family: "Família",
      contribution: "Contribuição",
      class: "Classe",
      noData: "Não há dados disponíveis",
      masterLevel: "Master Level",
      demoData: "Mostrando dados de exemplo",
    },
  }

  const t = translations[lang as keyof typeof translations]

  // Mapeo de clases para mostrar nombres legibles
  const classNames: Record<number, string> = {
    0: "Dark Wizard",
    1: "Soul Master",
    16: "Dark Knight",
    17: "Blade Knight",
    32: "Fairy Elf",
    33: "Muse Elf",
    48: "Magic Gladiator",
    64: "Dark Lord",
    80: "Summoner",
    96: "Rage Fighter",
  }

  // Mapeo de familias Gens
  const gensFamilies: Record<number, string> = {
    1: "Duprian",
    2: "Vanert",
  }

  // Cargar datos del ranking
  useEffect(() => {
    const fetchRankings = async () => {
      setIsLoading(true)
      setError(null)
      setIsDemo(false)
      setMessage(null)

      try {
        // Add a timeout to the fetch request
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

        console.log(`Fetching rankings from /api/ranking/${type}`)
        // Usar URL absoluta para evitar que se trate como ruta relativa
        const response = await fetch(`${window.location.origin}/api/ranking/${type}/`, {
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          const errText = await response.text()
          throw new Error(`Error ${response.status}: ${errText}`)
        }

        const result: RankingData = await response.json()
        console.log("API response:", result)

        if (!result.success) {
          throw new Error(result.message || "Error desconocido")
        }

        // Set demo flag if the data is mock data
        if (result.isDemo) {
          setIsDemo(true)
          setMessage(result.message || t.demoData)
        }

        // Set the ranking data
        setData(result.ranking || [])
      } catch (err: any) {
        console.error("Error fetching rankings:", err)
        let errorMessage = "Error desconocido al cargar los datos"

        if (err.name === "AbortError") {
          errorMessage = "La solicitud ha excedido el tiempo de espera. Por favor, inténtelo de nuevo."
        } else if (err.message === "Failed to fetch") {
          errorMessage = "No se pudo conectar con el servidor. Verifique su conexión o inténtelo más tarde."
        } else {
          errorMessage = err.message || "Error desconocido al cargar los datos"
        }

        setError(errorMessage)

        // Generate mock data for the UI even when there's an error
        setData(getMockDataForType(type))
        setIsDemo(true)
        setMessage(t.demoData)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRankings()
  }, [type])

  // Function to generate mock data for development/testing
  const getMockDataForType = (type: string): any[] => {
    const baseData = Array.from({ length: 10 }, (_, i) => ({
      Name: `Player${i + 1}`,
      Class: Math.floor(Math.random() * 5) * 16, // Random class
      cLevel: Math.floor(Math.random() * 400) + 100,
      Resets: Math.floor(Math.random() * 20),
    }))

    switch (type) {
      case "level":
        return baseData.sort((a, b) => b.cLevel - a.cLevel)
      case "resets":
        return baseData.sort((a, b) => b.Resets - a.Resets)
      case "killers":
        return baseData
          .map((item) => ({ ...item, PkCount: Math.floor(Math.random() * 100) }))
          .sort((a, b) => b.PkCount - a.PkCount)
      case "guilds":
        return Array.from({ length: 10 }, (_, i) => ({
          G_Name: `Guild${i + 1}`,
          G_Master: `Master${i + 1}`,
          G_Score: Math.floor(Math.random() * 10000),
        })).sort((a, b) => b.G_Score - a.G_Score)
      case "grandresets":
        return baseData
          .map((item) => ({ ...item, GrandResets: Math.floor(Math.random() * 5) }))
          .sort((a, b) => b.GrandResets - a.GrandResets)
      case "gens":
        return baseData
          .map((item) => ({ ...item, GensContribution: Math.floor(Math.random() * 5000) }))
          .sort((a, b) => b.GensContribution - a.GensContribution)
      case "votes":
        return Array.from({ length: 10 }, (_, i) => ({
          username: `User${i + 1}`,
          votes: Math.floor(Math.random() * 100),
        })).sort((a, b) => b.votes - a.votes)
      case "online":
        return baseData.slice(0, 5) // Fewer online players
      case "master":
        return baseData
          .map((item) => ({ ...item, MasterLevel: Math.floor(Math.random() * 200) }))
          .sort((a, b) => b.MasterLevel - a.MasterLevel)
      default:
        return baseData
    }
  }

  // Función para obtener el icono según la posición
  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-5 w-5 text-gold-400" />
      case 2:
        return <Medal className="h-5 w-5 text-gold-300" />
      case 3:
        return <Award className="h-5 w-5 text-gold-500" />
      case 4:
      case 5:
        return <Crown className="h-5 w-5 text-gold-200" />
      default:
        return null
    }
  }

  // Función para obtener el icono según el tipo de ranking
  const getRankingIcon = () => {
    switch (type) {
      case "level":
        return <Star className="h-6 w-6 text-gold-400" />
      case "resets":
      case "grandresets":
        return <Award className="h-6 w-6 text-gold-400" />
      case "killers":
        return <Swords className="h-6 w-6 text-gold-400" />
      case "guilds":
        return <Crown className="h-6 w-6 text-gold-400" />
      case "votes":
        return <Heart className="h-6 w-6 text-gold-400" />
      case "online":
        return <Users className="h-6 w-6 text-gold-400" />
      case "gens":
        return <Trophy className="h-6 w-6 text-gold-400" />
      case "master":
        return <Star className="h-6 w-6 text-gold-400" />
      default:
        return <Star className="h-6 w-6 text-gold-400" />
    }
  }

  // Renderizar estado de carga
  if (isLoading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-400 mx-auto mb-4"></div>
        <p className="text-gold-300">{t.loading}</p>
      </div>
    )
  }

  // Get column headers based on ranking type
  const getHeaders = () => {
    switch (type) {
      case "level":
        return (
          <tr className="bg-bunker-800 border-b border-gold-600">
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">{t.name}</th>
            <th className="px-4 py-2 text-left">{t.class}</th>
            <th className="px-4 py-2 text-left">{t.level}</th>
            <th className="px-4 py-2 text-left">{t.resets}</th>
          </tr>
        )
      case "resets":
        return (
          <tr className="bg-bunker-800 border-b border-gold-600">
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">{t.name}</th>
            <th className="px-4 py-2 text-left">{t.class}</th>
            <th className="px-4 py-2 text-left">{t.resets}</th>
            <th className="px-4 py-2 text-left">{t.level}</th>
          </tr>
        )
      case "killers":
        return (
          <tr className="bg-bunker-800 border-b border-gold-600">
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">{t.name}</th>
            <th className="px-4 py-2 text-left">{t.class}</th>
            <th className="px-4 py-2 text-left">{t.kills}</th>
          </tr>
        )
      case "guilds":
        return (
          <tr className="bg-bunker-800 border-b border-gold-600">
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">{t.guild}</th>
            <th className="px-4 py-2 text-left">{t.master}</th>
            <th className="px-4 py-2 text-left">{t.score}</th>
          </tr>
        )
      default:
        return (
          <tr className="bg-bunker-800 border-b border-gold-600">
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">{t.name}</th>
            <th className="px-4 py-2 text-left">{t.class}</th>
            <th className="px-4 py-2 text-left">{t.value}</th>
          </tr>
        )
    }
  }

  // Get row data based on ranking type
  const getRowData = (char: any, i: number) => {
    const getClassName = (classId: number) => {
      return classNames[classId] || `Class ${classId}`
    }

    switch (type) {
      case "level":
        return (
          <tr key={i} className="hover:bg-bunker-700 border-b border-gold-700/30">
            <td className="px-4 py-2 flex items-center">
              {i + 1} {getPositionIcon(i + 1)}
            </td>
            <td className="px-4 py-2">{char.Name}</td>
            <td className="px-4 py-2">{getClassName(char.Class)}</td>
            <td className="px-4 py-2">{char.cLevel}</td>
            <td className="px-4 py-2">{char.Resets}</td>
          </tr>
        )
      case "resets":
        return (
          <tr key={i} className="hover:bg-bunker-700 border-b border-gold-700/30">
            <td className="px-4 py-2 flex items-center">
              {i + 1} {getPositionIcon(i + 1)}
            </td>
            <td className="px-4 py-2">{char.Name}</td>
            <td className="px-4 py-2">{getClassName(char.Class)}</td>
            <td className="px-4 py-2">{char.Resets}</td>
            <td className="px-4 py-2">{char.cLevel}</td>
          </tr>
        )
      case "killers":
        return (
          <tr key={i} className="hover:bg-bunker-700 border-b border-gold-700/30">
            <td className="px-4 py-2 flex items-center">
              {i + 1} {getPositionIcon(i + 1)}
            </td>
            <td className="px-4 py-2">{char.Name}</td>
            <td className="px-4 py-2">{getClassName(char.Class)}</td>
            <td className="px-4 py-2">{char.PkCount}</td>
          </tr>
        )
      case "guilds":
        return (
          <tr key={i} className="hover:bg-bunker-700 border-b border-gold-700/30">
            <td className="px-4 py-2 flex items-center">
              {i + 1} {getPositionIcon(i + 1)}
            </td>
            <td className="px-4 py-2">{char.G_Name}</td>
            <td className="px-4 py-2">{char.G_Master}</td>
            <td className="px-4 py-2">{char.G_Score}</td>
          </tr>
        )
      default:
        return (
          <tr key={i} className="hover:bg-bunker-700 border-b border-gold-700/30">
            <td className="px-4 py-2 flex items-center">
              {i + 1} {getPositionIcon(i + 1)}
            </td>
            <td className="px-4 py-2">{char.Name || "N/A"}</td>
            <td className="px-4 py-2">{char.Class !== undefined ? getClassName(char.Class) : "N/A"}</td>
            <td className="px-4 py-2">N/A</td>
          </tr>
        )
    }
  }

  return (
    <div className="overflow-x-auto rounded-md shadow-md bg-bunker-900/90 border border-gold-600 p-4">
      {isDemo && (
        <div className="bg-gold-500/20 text-gold-100 p-2 mb-4 rounded flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <span>{message || t.demoData}</span>
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 text-red-100 p-2 mb-4 rounded flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      <table className="min-w-full text-gold-100 text-sm">
        <thead>{getHeaders()}</thead>
        <tbody>
          {data.length > 0 ? (
            data.map((char, i) => getRowData(char, i))
          ) : (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-gold-300">
                {t.noData}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
