"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

interface SectionDividerProps {
  className?: string
  inverted?: boolean
  reducedMargin?: boolean // Añadir nueva prop para controlar el margen
}

export function SectionDivider({ className = "", inverted = false, reducedMargin = false }: SectionDividerProps) {
  const [imgSrc, setImgSrc] = useState("/images/DIVISORMU123.png")
  
  // Fallback en caso de que la primera imagen falle
  const handleImageError = () => {
    setImgSrc("/images/separator-new.png")
  }

  return (
    <div className={`section-divider ${reducedMargin ? "section-divider-reduced" : ""} ${className}`}>
      <Image
        src={imgSrc}
        alt="Section divider"
        width={2400}
        height={65}
        className={`object-contain w-full ${inverted ? "rotate-180" : ""}`}
        style={{
          filter: "drop-shadow(0px 0px 5px rgba(255, 215, 0, 0.3))",
          maxWidth: "100%"
        }}
        priority
        unoptimized
        onError={handleImageError}
      />
    </div>
  )
}
