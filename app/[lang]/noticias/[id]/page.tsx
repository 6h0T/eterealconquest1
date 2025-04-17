import { getDictionary } from "@/i18n/config"
import type { Locale } from "@/i18n/config"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { CalendarDays, ArrowLeft, ChevronRight } from "lucide-react"
import { VimeoBackground } from "@/components/vimeo-background"
import { SectionDivider } from "@/components/section-divider"

// Importamos los datos de ejemplo de noticias
// Normalmente esto vendría de una base de datos
const mockNews = [
  {
    id: 1,
    title: {
      es: "Nueva región: El Valle de las Sombras",
      en: "New region: The Shadow Valley",
      pt: "Nova região: O Vale das Sombras",
    },
    description: {
      es: "Explora la nueva región con enemigos y recompensas exclusivas. ¡Desafía al nuevo jefe de mazmorra! Esta actualización trae nuevos desafíos y misiones para todos los jugadores.",
      en: "Explore the new region with exclusive enemies and rewards. Challenge the new dungeon boss! This update brings new challenges and quests for all players.",
      pt: "Explore a nova região com inimigos e recompensas exclusivas. Desafie o novo chefe de masmorra! Esta atualização traz novos desafios e misiones para todos los jugadores.",
    },
    content: {
      es: `
        <p>¡Saludos, aventureros de ETERNALQUEST!</p>
        
        <p>Nos complace anunciar la apertura de una nueva región: <strong>El Valle de las Sombras</strong>. Esta misteriosa zona ha estado oculta durante siglos, protegida por poderosos hechizos que finalmente se han debilitado lo suficiente como para permitir el acceso.</p>
        
        <p>El Valle de las Sombras es una región de nivel 400+ que ofrece:</p>
        
        <ul>
          <li>Nuevos monstruos con mecánicas de combate únicas</li>
          <li>Sets de equipamiento exclusivos con bonificaciones especiales</li>
          <li>Una mazmorra principal con 5 jefes desafiantes</li>
          <li>Nuevas misiones con recompensas legendarias</li>
          <li>Recursos únicos para artesanía avanzada</li>
        </ul>
        
        <p>El jefe final de la mazmorra, <strong>Mornoth, el Señor de las Sombras</strong>, representa uno de los desafíos más difíciles que hemos creado hasta ahora. Se recomienda un grupo bien coordinado de al menos 8 jugadores para enfrentarlo.</p>
        
        <p>Para acceder al Valle de las Sombras, los jugadores deben completar la cadena de misiones "Ecos del Pasado" que comienza con el NPC Arcanista Valeria en la Ciudad Imperial.</p>
        
        <p>¡Prepara tu equipo, mejora tus habilidades y enfréntate a los horrores que acechan en el Valle de las Sombras!</p>
      `,
      en: `
        <p>Greetings, ETERNALQUEST adventurers!</p>
        
        <p>We are pleased to announce the opening of a new region: <strong>The Shadow Valley</strong>. This mysterious area has been hidden for centuries, protected by powerful spells that have finally weakened enough to allow access.</p>
        
        <p>The Shadow Valley is a level 400+ region that offers:</p>
        
        <ul>
          <li>New monsters with unique combat mechanics</li>
          <li>Exclusive equipment sets with special bonuses</li>
          <li>A main dungeon with 5 challenging bosses</li>
          <li>New quests with legendary rewards</li>
          <li>Unique resources for advanced crafting</li>
        </ul>
        
        <p>The final dungeon boss, <strong>Mornoth, the Shadow Lord</strong>, represents one of the most difficult challenges we have created so far. A well-coordinated group of at least 8 players is recommended to face him.</p>
        
        <p>To access the Shadow Valley, players must complete the "Echoes of the Past" quest chain that begins with the NPC Arcanist Valeria in the Imperial City.</p>
        
        <p>Prepare your equipment, improve your skills, and face the horrors that lurk in the Shadow Valley!</p>
      `,
      pt: `
        <p>Saudações, aventureiros do ETERNALQUEST!</p>
        
        <p>Temos o prazer de anunciar a abertura de uma nova região: <strong>O Vale das Sombras</strong>. Esta área misteriosa esteve escondida por séculos, protegida por feitiços poderosos que finalmente enfraqueceram o suficiente para permitir o acesso.</p>
        
        <p>O Vale das Sombras é uma região de nível 400+ que oferece:</p>
        
        <ul>
          <li>Novos monstros com mecânicas de combate únicas</li>
          <li>Conjuntos de equipamento exclusivos com bônus especiais</li>
          <li>Uma masmorra principal com 5 chefes desafiadores</li>
          <li>Novas missões com recompensas lendárias</li>
          <li>Recursos únicos para artesanato avançada</li>
        </ul>
        
        <p>O chefe final da masmorra, <strong>Mornoth, o Senhor das Sombras</strong>, representa um dos desafios mais difíceis que criamos até agora. Recomenda-se um grupo bem coordenado de pelo menos 8 jogadores para enfrentá-lo.</p>
        
        <p>Para acessar o Vale das Sombras, os jogadores devem completar a cadeia de missões "Ecos do Passado" que começa com o NPC Arcanista Valeria na Cidade Imperial.</p>
        
        <p>Prepare seu equipamento, melhore suas habilidades e enfrente os horrores que espreitam no Vale das Sombras!</p>
      `,
    },
    date: "2025-04-10",
    image: "/placeholder.svg?height=300&width=500&text=News 1",
    featured: true,
  },
  // Aquí irían el resto de noticias con su contenido completo
  // Por brevedad, solo incluyo la primera noticia completa
]

// Función para formatear la fecha
function formatDate(dateString: string, locale: string) {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  return date.toLocaleDateString(locale === "es" ? "es-ES" : locale === "pt" ? "pt-BR" : "en-US", options)
}

// Y cambiar la definición de la función:
// A:
// Definir el tipo correcto para las props de la página

export default async function NoticiaDetallePage({ params }: { params: { lang: Locale; id: string } }) {
  const lang = params.lang as Locale
  const id = Number.parseInt(params.id)
  const dict = await getDictionary(lang)

  // Buscar la noticia por ID
  const news = mockNews.find((item) => item.id === id) || mockNews[0]

  // Traducciones específicas para la página de detalle de noticia
  const translations = {
    es: {
      backToNews: "Volver a noticias",
      publishedOn: "Publicado el",
      relatedNews: "Noticias relacionadas",
    },
    en: {
      backToNews: "Back to news",
      publishedOn: "Published on",
      relatedNews: "Related news",
    },
    pt: {
      backToNews: "Voltar para notícias",
      publishedOn: "Publicado em",
      relatedNews: "Notícias relacionadas",
    },
  }

  const t = translations[lang as keyof typeof translations]

  return (
    <div className="pt-32 pb-24 relative overflow-visible">
      {/* Fondo con video de Vimeo */}
      <VimeoBackground videoId="1074464598" fallbackId="1074465089" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8">
          <Link
            href={`/${lang}/noticias`}
            className="text-gold-500 hover:text-gold-400 transition-colors font-medium flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> {t.backToNews}
          </Link>
        </div>

        <Card className="bg-bunker-800/90 backdrop-blur-sm border border-gold-700/30 overflow-hidden mb-12">
          <div className="relative h-64 md:h-96">
            <Image
              src={news.image || "/placeholder.svg"}
              alt={news.title[lang as keyof typeof news.title] || ""}
              fill
              className="object-cover"
            />
          </div>
          <CardContent className="p-8">
            <div className="flex items-center text-gold-400 text-sm mb-4">
              <CalendarDays className="h-4 w-4 mr-1" />
              <span>
                {t.publishedOn} {formatDate(news.date, lang)}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gold-300 mb-6">
              {news.title[lang as keyof typeof news.title]}
            </h1>

            <div
              className="text-gold-100 prose prose-invert prose-gold max-w-none"
              dangerouslySetInnerHTML={{
                __html:
                  news.content?.[lang as keyof typeof news.content] ||
                  news.description[lang as keyof typeof news.description],
              }}
            />
          </CardContent>
        </Card>

        {/* Noticias relacionadas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gold-300 mb-8 border-b border-gold-500/30 pb-2">{t.relatedNews}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockNews
              .filter((item) => item.id !== id)
              .slice(0, 3)
              .map((relatedNews) => (
                <Card
                  key={relatedNews.id}
                  className="bg-bunker-800/90 backdrop-blur-sm border border-gold-700/30 overflow-hidden transition-all duration-300 hover:scale-105"
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedNews.image || "/placeholder.svg"}
                      alt={relatedNews.title[lang as keyof typeof relatedNews.title] || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gold-300 mb-3">
                      {relatedNews.title[lang as keyof typeof relatedNews.title]}
                    </h3>
                    <p className="text-gold-100/80 mb-4 line-clamp-3">
                      {relatedNews.description[lang as keyof typeof relatedNews.description]}
                    </p>
                    <Link
                      href={`/${lang}/noticias/${relatedNews.id}`}
                      className="text-gold-500 hover:text-gold-400 transition-colors font-medium flex items-center"
                    >
                      {dict.news.readMore} <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>

      {/* Divisor al final de la página */}
      <SectionDivider />
    </div>
  )
}
