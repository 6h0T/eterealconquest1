"use client"

import { useEffect, useRef, useState } from "react"

interface VimeoBackgroundProps {
  videoId: string
  fallbackId?: string // ID de respaldo en caso de que el principal no funcione
  className?: string
  overlayOpacity?: number
  extraZoom?: boolean // Nueva prop para controlar el zoom extra
}

export function VimeoBackground({
  videoId,
  fallbackId,
  className = "",
  overlayOpacity = 0.6,
  extraZoom = false, // Por defecto, no aplicar zoom extra
}: VimeoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Asegurar que el ID del video es válido
  const validVideoId = videoId || fallbackId || "1074465089" // ID de respaldo por si acaso

  useEffect(() => {
    // Función para calcular las dimensiones necesarias para cubrir el contenedor
    const calculateDimensions = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      const containerHeight = containerRef.current.offsetHeight
      const aspectRatio = 16 / 9

      // Calcular dimensiones para cubrir completamente el contenedor
      let width, height

      // Factor de escala basado en la prop extraZoom
      const scaleFactor = extraZoom ? 2.5 : 1.5

      if (containerWidth / containerHeight > aspectRatio) {
        // Si el contenedor es más ancho que la relación de aspecto del video
        width = containerWidth * scaleFactor
        height = width / aspectRatio
      } else {
        // Si el contenedor es más alto que la relación de aspecto del video
        height = containerHeight * scaleFactor
        width = height * aspectRatio
      }

      setDimensions({ width, height })
    }

    // Calcular dimensiones iniciales
    calculateDimensions()
    setIsLoaded(true)

    // Recalcular cuando cambie el tamaño de la ventana
    window.addEventListener("resize", calculateDimensions)

    return () => {
      window.removeEventListener("resize", calculateDimensions)
    }
  }, [extraZoom])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Overlay con opacidad configurable */}
      <div className="absolute inset-0 bg-bunker-950 z-10" style={{ opacity: overlayOpacity }}></div>

      {/* Contenedor del video */}
      <div className="absolute inset-0 w-full h-full z-0">
        {isLoaded && (
          <iframe
            src={`https://player.vimeo.com/video/${validVideoId}?h=468905b58b&badge=0&autopause=0&player_id=vimeo-background-${validVideoId}&app_id=58479&background=1&muted=1&loop=1&autoplay=1`}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            title="Background Video"
            className="absolute"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              minWidth: extraZoom ? "200%" : "150%", // Ajustar según extraZoom
              minHeight: extraZoom ? "200%" : "150%", // Ajustar según extraZoom
            }}
            onError={() => {
              // Si hay un error al cargar el video, intentar con el ID de respaldo
              if (videoId !== fallbackId && fallbackId) {
                console.log(`Error loading Vimeo video ${videoId}, falling back to ${fallbackId}`)
                // No podemos cambiar la URL directamente, pero podemos notificar al usuario
                console.warn("Vimeo video failed to load. Please check the video ID.")
              }
            }}
          ></iframe>
        )}
      </div>
    </div>
  )
}
