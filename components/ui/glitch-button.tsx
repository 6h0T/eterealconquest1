"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface GlitchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary"
  children: React.ReactNode
  className?: string
}

export function GlitchButton({ variant = "primary", children, className, ...props }: GlitchButtonProps) {
  const variantClass =
    variant === "secondary"
      ? "button-glitch-secondary"
      : variant === "tertiary"
        ? "button-glitch-tertiary"
        : "button-glitch"

  return (
    <button
      className={cn(variantClass, className)}
      data-text={typeof children === "string" ? children : "HOVER ME"}
      {...props}
    >
      {children}
    </button>
  )
}
