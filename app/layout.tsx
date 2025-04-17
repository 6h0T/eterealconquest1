import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ETERNALQUEST - MU Online",
  description: "Prepárate para la nueva era de MU Online",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


import './globals.css'