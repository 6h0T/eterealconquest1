"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getApiUrl, createFetchOptions } from "@/lib/api-utils"

const tabs = [
  { key: "level", label: "Nivel" },
  { key: "online", label: "Online" },
  { key: "killers", label: "PK" },
  { key: "guilds", label: "Guilds" },
]

export function RankingsTabs() {
  const [activeTab, setActiveTab] = useState("level")
  const [data, setData] = useState<any[]>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError("")

      try {
        // Use the utility function to get the correct API URL
        const url = getApiUrl(`ranking/${activeTab}`)
        console.log(`Fetching rankings from: ${url}`)

        const res = await fetch(url, createFetchOptions())

        if (!res.ok) {
          const errorText = await res.text()
          throw new Error(`Error ${res.status}: ${errorText}`)
        }

        const json = await res.json()
        console.log("Rankings data received:", json)

        // Find the first array in the response
        const firstArray = Array.isArray(json) ? json : Object.values(json).find((val) => Array.isArray(val))

        if (!firstArray || !Array.isArray(firstArray) || firstArray.length === 0) {
          console.warn("No ranking data found in response")
          setData([])
          setError("No hay datos de ranking disponibles.")
        } else {
          setData(firstArray)
        }
      } catch (err: any) {
        console.error("Ranking error:", err)
        setError(`No se pudo obtener el ranking: ${err.message || "Error desconocido"}`)
        setData([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [activeTab])

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              tab.key === activeTab ? "bg-gold-500 text-bunker-900" : "bg-bunker-700 text-gold-300 hover:bg-bunker-600"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2 text-gold-300">Cargando rankings...</p>
        </div>
      ) : error ? (
        <div className="text-red-400 text-center p-4 bg-bunker-800/50 rounded-lg border border-red-900/30">
          <p>{error}</p>
        </div>
      ) : data.length === 0 ? (
        <div className="text-gold-300 text-center p-4 bg-bunker-800/50 rounded-lg">
          <p>No hay datos disponibles para este ranking.</p>
        </div>
      ) : (
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-x-auto"
        >
          <table className="w-full text-sm border-collapse bg-bunker-900/80 backdrop-blur-sm border border-gold-700/40 rounded-md overflow-hidden">
            <thead>
              <tr className="bg-bunker-800 text-gold-200 text-left">
                <th className="px-4 py-2 border-b border-gold-700/20">#</th>
                {data[0] &&
                  Object.keys(data[0]).map((key) => (
                    <th key={key} className="px-4 py-2 capitalize border-b border-gold-700/20">
                      {key}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data.map((entry, i) => (
                <tr key={i} className="hover:bg-bunker-800 text-gold-100 border-b border-gold-700/10">
                  <td className="px-4 py-2">{i + 1}</td>
                  {Object.values(entry).map((val, j) => (
                    <td key={j} className="px-4 py-2">
                      {val !== null && val !== undefined ? String(val) : ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  )
}
