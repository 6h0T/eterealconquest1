"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface BlobVideoProps {
  src: string
  className?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  poster?: string
}

export function BlobVideo({
  src,
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
  poster,
  ...props
}: BlobVideoProps & React.ComponentPropsWithoutRef<"video">) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Verificar si la URL ya es de Vercel Blob
  const isVercelBlob = src.startsWith("https://v0.blob.com/")

  // Si no es una URL de Vercel Blob, usar un placeholder o una URL vacía
  const videoSrc = isVercelBlob ? src : ""

  useEffect(() => {
    const videoElement = videoRef.current
    if (videoElement && autoPlay) {
      const playPromise = videoElement.play()

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Error al reproducir el video:", error)
        })
      }
    }
  }, [autoPlay])

  return (
    <video
      ref={videoRef}
      className={cn("w-full h-auto", className)}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      controls={controls}
      poster={poster}
      playsInline
      {...props}
    >
      {videoSrc && <source src={videoSrc} type="video/mp4" />}
      Tu navegador no soporta el elemento de video.
    </video>
  )
}
