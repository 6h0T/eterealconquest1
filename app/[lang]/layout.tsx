import type React from "react"
import { Trade_Winds } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Locale } from "@/i18n/config"
import { PreloaderWrapper } from "@/components/preloader-wrapper"

// Importar la función de precarga
import { preloadCommonDictionaries } from "@/i18n/config"

// Configurar la fuente Trade Winds
const tradeWinds = Trade_Winds({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-trade-winds",
  display: "swap",
})

// Interfaz para el layout
interface LayoutProps {
  children: React.ReactNode
  params: { lang: string }
}

// Añadir esta línea antes de la definición de la función LangLayout
// Intentar precargar el diccionario predeterminado
preloadCommonDictionaries()

export default function LangLayout({ children, params }: LayoutProps) {
  // @ts-ignore - Suppress TS warning about direct param access
  const lang = params.lang as Locale

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${tradeWinds.variable} font-sans bg-bunker-950 text-gold-100`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <PreloaderWrapper>
            <div className="relative flex min-h-screen flex-col">
              <Navbar lang={lang} />
              <main className="flex-1">{children}</main>
              <Footer lang={lang} />
            </div>
          </PreloaderWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
