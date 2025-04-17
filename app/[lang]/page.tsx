import Link from "next/link"
import Image from "next/image"
import { getDictionary } from "@/i18n/config"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Shield, Award, Layout, Sparkles, Server, Trophy } from "lucide-react"
import { SoundControl } from "@/components/sound-control"
import CircularSlider from "@/components/circular-slider"
import type { Locale } from "@/i18n/config"
import { SectionDivider } from "@/components/section-divider"
import { AltSectionDivider } from "@/components/alt-section-divider"
import { VimeoScript } from "@/components/vimeo-script"
import { VimeoBackground } from "@/components/vimeo-background"
import { characters } from "@/constants"

export default async function Home({ params }: { params: { lang: Locale } }) {
  // @ts-ignore - Suppress TS warning about direct param access
  const lang = params.lang as Locale
  const dict = await getDictionary(lang)

  // Lista de imágenes importantes para precargar
  const importantImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO-OFICIAL-1.2-2r5D3y3IGm2ODScjRY2hduLVEpLl7x.png",
    // Añadir aquí otras imágenes importantes
    ...characters.map((char) => char.img),
    ...characters.map((char) => char.headerImg),
    ...characters.map((char) => char.characterImg),
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Vimeo Script */}
      <VimeoScript />

      {/* Hero Section with Vimeo Background */}
      <section id="hero-section" className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          {/* Overlay para mejorar la legibilidad del contenido */}
          <div className="absolute inset-0 bg-gradient-to-b from-bunker-950/50 via-bunker-950/60 to-bunker-950 z-10"></div>

          {/* Video de Vimeo como fondo */}
          <div className="absolute inset-0 w-full h-full">
            <div className="vimeo-wrapper">
              <iframe
                id="vimeo-background"
                src="https://player.vimeo.com/video/1072837249?h=468905b58b&badge=0&autopause=0&player_id=vimeo-background&app_id=58479&background=1&muted=1&loop=1&autoplay=1"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                title="ETEREALCONQUEST Background"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="animate-float mb-12">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO-OFICIAL-1.2-2r5D3y3IGm2ODScjRY2hduLVEpLl7x.png"
              alt="ETEREALCONQUEST - Mu Online"
              width={600}
              height={300}
              className="mx-auto"
              priority
            />
          </div>
          <div className="flex justify-center w-full mx-auto">
            <a href="#info-section" className="scroll-smooth">
              <button className="golden-button">{dict.hero.explore}</button>
            </a>
          </div>
        </div>

        {/* Sound Control */}
        <SoundControl playerId="vimeo-background" lang={lang} />
      </section>

      {/* Divisor después del hero - como elemento independiente */}
      <AltSectionDivider />

      {/* Bento Grid Section - Características y Server Info */}
      <section id="info-section" className="py-16 relative">
        {/* Fondo con video de Vimeo */}
        <VimeoBackground videoId="1074464598" fallbackId="1074465089" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-2">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold gold-gradient-text mb-4">
              {dict.features.featuresAndServer}
            </h2>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Tarjeta - Tasas del servidor (ajustada al contenido) */}
            <Card className="bg-bunker-800 overflow-hidden md:col-span-2 card-hover h-auto pb-0">
              <CardContent className="p-4 pb-2">
                <div className="flex items-center mb-3">
                  <Server className="h-6 w-6 text-gold-400 mr-2" />
                  <h3 className="text-xl font-bold text-gold-300">{dict.info.serverRates}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 text-base">
                  <div className="flex justify-between items-center">
                    <span className="text-gold-100">{dict.info.expNormal}</span>
                    <span className="text-gold-400 font-bold">5x</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gold-100">{dict.info.zenDrop}</span>
                    <span className="text-gold-400 font-bold">{dict.info.low}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gold-100">{dict.info.expMaster}</span>
                    <span className="text-gold-400 font-bold">3x</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gold-100">{dict.info.itemDrop}</span>
                    <span className="text-gold-400 font-bold">25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gold-100">{dict.info.excellent}</span>
                    <span className="text-gold-400 font-bold">5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gold-100">{dict.info.epic}</span>
                    <span className="text-gold-400 font-bold">0.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gold-100">{dict.info.rare}</span>
                    <span className="text-gold-400 font-bold">0.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gold-100">{dict.info.legendary}</span>
                    <span className="text-gold-400 font-bold">0.01%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resto de tarjetas... */}
            <Card className="bg-bunker-800 overflow-hidden card-hover">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-gold-400" />
                </div>
                <h3 className="text-xl font-bold text-gold-300 mb-2">{dict.features.skills}</h3>
                <p className="text-gold-100/80">
                  {lang === "es"
                    ? "Sistema de habilidades mejorado con nuevas mecánicas y efectos visuales."
                    : lang === "en"
                      ? "Enhanced skill system with new mechanics and visual effects."
                      : "Sistema de habilidades aprimorado com novas mecânicas e efeitos visuais."}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-bunker-800 overflow-hidden card-hover">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-gold-400" />
                </div>
                <h3 className="text-xl font-bold text-gold-300 mb-2">{dict.features.buffs}</h3>
                <p className="text-gold-100/80">
                  {lang === "es"
                    ? "Sistema de buffs mejorado con nuevos efectos y duración personalizable."
                    : lang === "en"
                      ? "Enhanced buff system with new mechanics and visual effects."
                      : "Sistema de buffs aprimorado com novos efeitos e duração personalizável."}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-bunker-800 overflow-hidden md:col-span-2 card-hover pb-0">
              <CardContent className="p-4 pb-2">
                <div className="flex items-center mb-3">
                  <Trophy className="h-6 w-6 text-gold-400 mr-2" />
                  <h3 className="text-xl font-bold text-gold-300">{dict.info.benefits}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 text-base">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gold-500/10 flex items-center justify-center mr-2">
                      <Zap className="h-3 w-3 text-gold-400" />
                    </div>
                    <span className="text-gold-100">{dict.info.fps}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gold-500/10 flex items-center justify-center mr-2">
                      <Zap className="h-3 w-3 text-gold-400" />
                    </div>
                    <span className="text-gold-100">{dict.info.dungeons}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gold-500/10 flex items-center justify-center mr-2">
                      <Zap className="h-3 w-3 text-gold-400" />
                    </div>
                    <span className="text-gold-100">{dict.info.pvp}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gold-500/10 flex items-center justify-center mr-2">
                      <Zap className="h-3 w-3 text-gold-400" />
                    </div>
                    <span className="text-gold-100">{dict.info.items}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gold-500/10 flex items-center justify-center mr-2">
                      <Zap className="h-3 w-3 text-gold-400" />
                    </div>
                    <span className="text-gold-100">{dict.info.antihack}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gold-500/10 flex items-center justify-center mr-2">
                      <Zap className="h-3 w-3 text-gold-400" />
                    </div>
                    <span className="text-gold-100">{dict.features.auction}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-bunker-800 overflow-hidden card-hover">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-gold-400" />
                </div>
                <h3 className="text-xl font-bold text-gold-300 mb-2">{dict.features.tests}</h3>
                <p className="text-gold-100/80">
                  {lang === "es"
                    ? "Pon a prueba tus habilidades en desafiantes pruebas de combate y estrategia."
                    : lang === "en"
                      ? "Test your skills in challenging combat and strategy trials."
                      : "Teste suas habilidades em desafios de combate e estratégia."}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-bunker-800 overflow-hidden card-hover">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center mb-4">
                  <Layout className="h-8 w-8 text-gold-400" />
                </div>
                <h3 className="text-xl font-bold text-gold-300 mb-2">{dict.features.interface}</h3>
                <p className="text-gold-100/80">
                  {lang === "es"
                    ? "Interfaz moderna y personalizable para una mejor experiencia de juego."
                    : lang === "en"
                      ? "Modern and customizable interface for a better gaming experience."
                      : "Interface moderna e personalizável para uma melhor experiência de jogo."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Divisor de sección alternativo para probar */}
      <AltSectionDivider />

      {/* News Section */}
      <section id="news-section" className="py-16 relative">
        {/* Fondo con video de Vimeo */}
        <VimeoBackground videoId="1074464598" fallbackId="1074465089" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-2">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold gold-gradient-text mb-4">{dict.news.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="bg-bunker-800 overflow-hidden card-hover">
                <div className="relative h-48">
                  <Image
                    src={`/news-banner.png?key=ttacs&height=300&width=500&text=News ${item}`}
                    alt={`News ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="text-gold-400 text-sm mb-2">15.11.2024</div>
                  <h3 className="text-xl font-bold text-gold-300 mb-3">
                    {dict.news.newsItems[item as keyof typeof dict.news.newsItems]?.title}
                  </h3>
                  <p className="text-gold-100/80 mb-4 line-clamp-3">
                    {dict.news.newsItems[item as keyof typeof dict.news.newsItems]?.description}
                  </p>
                  <Link
                    href={`/${lang}/news/${item}`}
                    className="text-gold-500 hover:text-gold-400 transition-colors font-medium"
                  >
                    {dict.news.readMore} →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href={`/${lang}/noticias`}>
              <Button className="button-tertiary">{dict.news.viewAll}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Divisor después de news section - como elemento independiente */}
      <SectionDivider />

      {/* Classes Section with CircularSlider */}
      <section id="classes-section" className="py-16 relative bg-bunker-950">
        {/* Circular Slider Component */}
        <CircularSlider lang={lang} />
      </section>

      {/* Divisor después de classes section - como elemento independiente */}
      <SectionDivider />

      {/* CTA Section */}
      <section id="cta-section" className="py-16 relative">
        {/* Fondo con video de Vimeo */}
        <VimeoBackground videoId="1074465089" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-2 text-center">
          <h2 className="text-3xl md:text-4xl font-bold gold-gradient-text mb-4">{dict.cta.title}</h2>
          <p className="text-xl text-gold-100 mb-8 max-w-2xl mx-auto">{dict.cta.description}</p>
          <div className="flex justify-center">
            <Link href={`/${lang}/descargas`} className="golden-button">
              {dict.cta.download}
            </Link>
          </div>
        </div>
      </section>

      {/* Divisor después de la sección CTA - como elemento independiente */}
      <SectionDivider />
    </div>
  )
}
