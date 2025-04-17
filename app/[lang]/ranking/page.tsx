import { RankingsTabs } from "@/components/rankings-tabs"
import { SectionDivider } from "@/components/section-divider"
import { VimeoBackground } from "@/components/vimeo-background"
import type { Locale } from "@/i18n/config"

export default function RankingsPage({ params }: { params: { lang: Locale } }) {
  return (
    <div className="pt-20 pb-16 relative overflow-visible min-h-screen">
      {/* Fondo con video de Vimeo */}
      <VimeoBackground videoId="1074464598" fallbackId="1074465089" />

      <div className="container max-w-5xl mx-auto px-4 sm:px-6 relative z-20">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold gold-gradient-text mb-4">Rankings</h1>
          <p className="text-xl text-gold-100 max-w-3xl mx-auto">
            Descubre quiénes son los mejores jugadores de ETERNALQUEST
          </p>
        </div>

        <RankingsTabs />
      </div>

      {/* Divisor al final de la página */}
      <SectionDivider />
    </div>
  )
}
