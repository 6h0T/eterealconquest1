"use client"

import Image from "next/image"

interface AltSectionDividerProps {
  className?: string
  inverted?: boolean
  reducedMargin?: boolean
}

export function AltSectionDivider({ className = "", inverted = false, reducedMargin = false }: AltSectionDividerProps) {
  return (
    <div className={`section-divider ${reducedMargin ? "section-divider-reduced" : ""} ${className}`}>
      {/* Usar una imagen directa en lugar de next/image */}
      <img
        src="/images/separator-new.png"
        alt="Section divider"
        className={`w-full max-w-[2400px] h-auto object-contain ${inverted ? "rotate-180" : ""}`}
        style={{
          filter: "drop-shadow(0px 0px 5px rgba(255, 215, 0, 0.3))",
        }}
      />
    </div>
  )
} 