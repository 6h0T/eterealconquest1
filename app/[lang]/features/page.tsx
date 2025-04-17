import { getDictionary } from "@/i18n/config"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Shield, Award, Star, BarChart, Layout, Sparkles, ShoppingBag } from "lucide-react"
import { SectionDivider } from "@/components/section-divider"
import { VimeoBackground } from "@/components/vimeo-background"
import type { Locale } from "@/i18n/config"

export default async function FeaturesPage({ params }: { params: { lang: Locale } }) {
  const { lang } = params
  const dict = await getDictionary(params.lang as any)

  return (
    <div className="pt-32 pb-24 relative overflow-visible">
      {/* Fondo con video de Vimeo */}
      <VimeoBackground videoId="1074464598" fallbackId="1074465089" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold gold-gradient-text mb-6">{dict.features.title}</h1>
          <p className="text-xl text-gold-100 max-w-3xl mx-auto">
            {lang === "es"
              ? "Descubre todas las características exclusivas que ETERNALQUEST tiene para ofrecer."
              : lang === "en"
                ? "Discover all the exclusive features that ETERNALQUEST has to offer."
                : "Descubra todas as características exclusivas que ETERNALQUEST tem para oferecer."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-bunker-800 overflow-hidden card-hover">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gold-500/10 flex items-center justify-center mb-6">
                <Zap className="h-10 w-10 text-gold-400" />
              </div>
              <h3 className="text-2xl font-bold text-gold-300 mb-4">{dict.features.fps}</h3>
              <p className="text-gold-100/80">
                {lang === "es"
                  ? "Disfruta de una experiencia fluida con 60 FPS reales en todo momento. Optimizado para un rendimiento excepcional incluso en equipos de gama media."
                  : lang === "en"
                    ? "Enjoy a smooth experience with real 60 FPS at all times. Optimized for exceptional performance even on mid-range computers."
                    : "Desfrute de uma experiência fluida com 60 FPS reais o tempo todo. Otimizado para um desempenho excepcional mesmo em computadores de médio porte."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-bunker-800 overflow-hidden card-hover">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gold-500/10 flex items-center justify-center mb-6">
                <Shield className="h-10 w-10 text-gold-400" />
              </div>
              <h3 className="text-2xl font-bold text-gold-300 mb-4">{dict.features.skills}</h3>
              <p className="text-gold-100/80">
                {lang === "es"
                  ? "Sistema de habilidades mejorado con nuevas mecánicas y efectos visuales. Personaliza tu estilo de juego con combinaciones únicas de habilidades."
                  : lang === "en"
                    ? "Enhanced skill system with new mechanics and visual effects. Customize your gameplay style with unique skill combinations."
                    : "Sistema de habilidades aprimorado com novas mecânicas e efeitos visuais. Personalize seu estilo de jogo com combinações únicas de habilidades."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-bunker-800 overflow-hidden card-hover">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gold-500/10 flex items-center justify-center mb-6">
                <Award className="h-10 w-10 text-gold-400" />
              </div>
              <h3 className="text-2xl font-bold text-gold-300 mb-4">{dict.features.tests}</h3>
              <p className="text-gold-100/80">
                {lang === "es"
                  ? "Pon a prueba tus habilidades en desafiantes pruebas de combate y estrategia. Supera retos únicos y obtén recompensas exclusivas."
                  : lang === "en"
                    ? "Test your skills in challenging combat and strategy trials. Overcome unique challenges and earn exclusive rewards."
                    : "Teste suas habilidades em desafios de combate e estratégia. Supere desafios únicos e ganhe recompensas exclusivas."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-bunker-800 overflow-hidden card-hover">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gold-500/10 flex items-center justify-center mb-6">
                <Star className="h-10 w-10 text-gold-400" />
              </div>
              <h3 className="text-2xl font-bold text-gold-300 mb-4">{dict.features.items}</h3>
              <p className="text-gold-100/80">
                {lang === "es"
                  ? "Sistema de rareza de ítems con efectos únicos y apariencias exclusivas. Colecciona ítems legendarios con propiedades especiales."
                  : lang === "en"
                    ? "Item rarity system with unique effects and exclusive appearances. Collect legendary items with special properties."
                    : "Sistema de raridade de itens com efeitos únicos e aparências exclusivas. Colete itens lendários com propriedades especiais."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-bunker-800 overflow-hidden card-hover">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gold-500/10 flex items-center justify-center mb-6">
                <BarChart className="h-10 w-10 text-gold-400" />
              </div>
              <h3 className="text-2xl font-bold text-gold-300 mb-4">{dict.features.equipment}</h3>
              <p className="text-gold-100/80">
                {lang === "es"
                  ? "Sistema de puntuación de equipo para optimizar tu personaje. Analiza y mejora tu equipamiento para maximizar tu poder."
                  : lang === "en"
                    ? "Equipment scoring system to optimize your character. Analyze and improve your gear to maximize your power."
                    : "Sistema de pontuação de equipamento para otimizar seu personagem. Analise e melhore seu equipamento para maximizar seu poder."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-bunker-800 overflow-hidden card-hover">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gold-500/10 flex items-center justify-center mb-6">
                <Layout className="h-10 w-10 text-gold-400" />
              </div>
              <h3 className="text-2xl font-bold text-gold-300 mb-4">{dict.features.interface}</h3>
              <p className="text-gold-100/80">
                {lang === "es"
                  ? "Interfaz moderna y personalizable para una mejor experiencia de juego. Adapta la interfaz a tu estilo de juego."
                  : lang === "en"
                    ? "Modern and customizable interface for a better gaming experience. Adapt the interface to your gameplay style."
                    : "Interface moderna e personalizável para uma melhor experiência de jogo. Adapte a interface ao seu estilo de jogo."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-bunker-800 overflow-hidden card-hover">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gold-500/10 flex items-center justify-center mb-6">
                <Sparkles className="h-10 w-10 text-gold-400" />
              </div>
              <h3 className="text-2xl font-bold text-gold-300 mb-4">{dict.features.buffs}</h3>
              <p className="text-gold-100/80">
                {lang === "es"
                  ? "Sistema de buffs mejorado con nuevos efectos y duración personalizable. Potencia tu personaje con combinaciones estratégicas."
                  : lang === "en"
                    ? "Enhanced buff system with new effects and customizable duration. Power up your character with strategic combinations."
                    : "Sistema de buffs aprimorado com novos efeitos e duração personalizável. Potencialize seu personagem com combinações estratégicas."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-bunker-800 overflow-hidden card-hover">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gold-500/10 flex items-center justify-center mb-6">
                <ShoppingBag className="h-10 w-10 text-gold-400" />
              </div>
              <h3 className="text-2xl font-bold text-gold-300 mb-4">{dict.features.auction}</h3>
              <p className="text-gold-100/80">
                {lang === "es"
                  ? "Casa de subastas con sistema de ofertas y compra inmediata. Comercia con otros jugadores de forma segura y eficiente."
                  : lang === "en"
                    ? "Auction house with bidding system and immediate purchase. Trade with other players safely and efficiently."
                    : "Casa de leilões com sistema de lances e compra imediata. Negocie com outros jogadores de forma segura e eficiente."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Divisor al final de la página - como elemento independiente */}
      <SectionDivider />
    </div>
  )
}
