"use client"

import { useState, useEffect } from "react"
import { getDictionary } from "@/i18n/config"
import type { Locale } from "@/i18n/config"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { CalendarDays, ChevronRight } from "lucide-react"
import { VimeoBackground } from "@/components/vimeo-background"

// Datos de ejemplo para las noticias
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
      pt: "Explore a nova região com inimigos e recompensas exclusivas. Desafie o novo chefe de masmorra! Esta atualização traz novos desafios e missões para todos os jogadores.",
    },
    date: "2025-04-10",
    image: "/placeholder.svg?height=300&width=500&text=News 1",
    featured: true,
  },
  {
    id: 2,
    title: {
      es: "Actualización de balance de clases",
      en: "Class balance update",
      pt: "Atualização de equilíbrio de classes",
    },
    description: {
      es: "Hemos realizado ajustes en todas las clases para mejorar el equilibrio del juego. Consulta los detalles en las notas del parche para ver cómo estos cambios afectan a tu personaje.",
      en: "We have made adjustments to all classes to improve game balance. Check the patch notes for details on how these changes affect your character.",
      pt: "Fizemos ajustes em todas as classes para melhorar o equilíbrio do jogo. Confira as notas do patch para ver como essas mudanças afetam seu personagem.",
    },
    date: "2025-04-05",
    image: "/placeholder.svg?height=300&width=500&text=News 2",
    featured: true,
  },
  {
    id: 3,
    title: {
      es: "Evento de Navidad: Regalos y sorpresas",
      en: "Christmas event: Gifts and surprises",
      pt: "Evento de Natal: Presentes e surpresas",
    },
    description: {
      es: "Celebra las fiestas con nosotros y obtén regalos diarios, eventos especiales y más. Durante todo el mes de diciembre, podrás participar en actividades temáticas y conseguir objetos exclusivos.",
      en: "Celebrate the holidays with us and get daily gifts, special events and more. Throughout December, you can participate in themed activities and get exclusive items.",
      pt: "Celebre as festas conosco e ganhe presentes diários, eventos especiais e mais. Durante todo o mês de dezembro, você poderá participar em atividades temáticas e obter itens exclusivos.",
    },
    date: "2025-04-01",
    image: "/placeholder.svg?height=300&width=500&text=News 3",
    featured: true,
  },
  {
    id: 4,
    title: {
      es: "Torneo PvP: La Copa del Conquistador",
      en: "PvP tournament: The Conqueror's Cup",
      pt: "Torneio PvP: A Copa do Conquistador",
    },
    description: {
      es: "Participa en el mayor torneo PvP del año y gana premios exclusivos. ¡Inscripciones abiertas! Demuestra tus habilidades en combate y conviértete en el campeón de ETERNALQUEST.",
      en: "Participate in the biggest PvP tournament of the year and win exclusive prizes. Registrations open! Show your combat skills and become the ETERNALQUEST champion.",
      pt: "Participe do maior torneio PvP do ano e ganhe prêmios exclusivos. Inscrições abertas! Mostre suas habilidades de combate e torne-se o campeão do ETERNALQUEST.",
    },
    date: "2025-03-25",
    image: "/placeholder.svg?height=300&width=500&text=News 4",
    featured: true,
  },
  {
    id: 5,
    title: {
      es: "Nuevos sets de equipamiento legendario",
      en: "New legendary equipment sets",
      pt: "Novos conjuntos de equipamento lendário",
    },
    description: {
      es: "Descubre los nuevos sets de equipamiento legendario que hemos añadido al juego. Cada clase tiene un nuevo set con bonificaciones únicas que potenciarán tu personaje.",
      en: "Discover the new legendary equipment sets we've added to the game. Each class has a new set with unique bonuses that will enhance your character.",
      pt: "Descubra os novos conjuntos de equipamento lendário que adicionamos ao jogo. Cada classe tem um novo conjunto com bônus únicos que potencializarão seu personagem.",
    },
    date: "2025-03-20",
    image: "/placeholder.svg?height=300&width=500&text=News 5",
    featured: false,
  },
  {
    id: 6,
    title: {
      es: "Mejoras en el sistema de gremios",
      en: "Improvements to the guild system",
      pt: "Melhorias no sistema de guildas",
    },
    description: {
      es: "Hemos implementado varias mejoras en el sistema de gremios, incluyendo nuevos niveles, habilidades y beneficios. Los líderes de gremio ahora tienen más herramientas para gestionar a sus miembros.",
      en: "We have implemented several improvements to the guild system, including new levels, skills, and benefits. Guild leaders now have more tools to manage their members.",
      pt: "Implementamos várias melhorias no sistema de guildas, incluindo novos níveis, habilidades e benefícios. Os líderes de guilda agora têm mais ferramentas para gerenciar seus membros.",
    },
    date: "2025-03-15",
    image: "/placeholder.svg?height=300&width=500&text=News 6",
    featured: false,
  },
  {
    id: 7,
    title: {
      es: "Nueva mazmorra: Las Catacumbas Olvidadas",
      en: "New dungeon: The Forgotten Catacombs",
      pt: "Nova masmorra: As Catacumbas Esquecidas",
    },
    description: {
      es: "Explora la nueva mazmorra 'Las Catacumbas Olvidadas' y enfrenta a enemigos nunca antes vistos. Esta mazmorra está diseñada para grupos de 5 jugadores de nivel 400+.",
      en: "Explore the new dungeon 'The Forgotten Catacombs' and face enemies never seen before. This dungeon is designed for groups of 5 players level 400+.",
      pt: "Explore a nova masmorra 'As Catacumbas Esquecidas' e enfrente inimigos nunca vistos antes. Esta masmorra foi projetada para grupos de 5 jogadores de nível 400+.",
    },
    date: "2025-03-10",
    image: "/placeholder.svg?height=300&width=500&text=News 7",
    featured: false,
  },
  {
    id: 8,
    title: {
      es: "Actualización del cliente: Versión 1.5.2",
      en: "Client update: Version 1.5.2",
      pt: "Atualização do cliente: Versão 1.5.2",
    },
    description: {
      es: "Hemos lanzado una nueva actualización del cliente que incluye correcciones de errores y mejoras de rendimiento. Descarga la actualización para disfrutar de una experiencia de juego más fluida.",
      en: "We have released a new client update that includes bug fixes and performance improvements. Download the update to enjoy a smoother gaming experience.",
      pt: "Lançamos uma nova atualização do cliente que inclui correções de bugs e melhorias de desempenho. Baixe a atualização para desfrutar de uma experiência de jogo mais fluida.",
    },
    date: "2025-03-05",
    image: "/placeholder.svg?height=300&width=500&text=News 8",
    featured: false,
  },
  {
    id: 9,
    title: {
      es: "Evento de aniversario: ¡5 años de ETERNALQUEST!",
      en: "Anniversary event: 5 years of ETERNALQUEST!",
      pt: "Evento de aniversário: 5 anos de ETERNALQUEST!",
    },
    description: {
      es: "Celebra con nosotros el quinto aniversario de ETERNALQUEST con eventos especiales, regalos diarios y bonificaciones de experiencia. ¡Gracias por ser parte de esta increíble comunidad!",
      en: "Celebrate with us the fifth anniversary of ETERNALQUEST with special events, daily gifts, and experience bonuses. Thank you for being part of this amazing community!",
      pt: "Celebre conosco o quinto aniversário do ETERNALQUEST com eventos especiais, presentes diários e bônus de experiência. Obrigado por fazer parte desta incrível comunidade!",
    },
    date: "2025-03-01",
    image: "/placeholder.svg?height=300&width=500&text=News 9",
    featured: false,
  },
  {
    id: 10,
    title: {
      es: "Nuevo sistema de misiones diarias",
      en: "New daily quest system",
      pt: "Novo sistema de missões diárias",
    },
    description: {
      es: "Hemos implementado un nuevo sistema de misiones diarias que ofrece recompensas más variadas y desafiantes. Completa misiones diarias para obtener tokens que podrás canjear por objetos exclusivos.",
      en: "We have implemented a new daily quest system that offers more varied and challenging rewards. Complete daily quests to earn tokens that you can exchange for exclusive items.",
      pt: "Implementamos um novo sistema de missões diárias que oferece recompensas mais variadas e desafiadoras. Complete missões diárias para ganhar tokens que você pode trocar por itens exclusivos.",
    },
    date: "2025-02-25",
    image: "/placeholder.svg?height=300&width=500&text=News 10",
    featured: false,
  },
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

// Cambiar la definición del componente a:
export default function NoticiasPage({ params }: { params: { lang: Locale } }) {
  const [dictionary, setDictionary] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const lang = params.lang as Locale

  // Cargar el diccionario
  useEffect(() => {
    const loadDictionary = async () => {
      setIsLoading(true)
      try {
        const dict = await getDictionary(lang)
        setDictionary(dict)
        setIsLoading(false)
      } catch (error) {
        console.error("Error loading dictionary:", error)
        setIsLoading(false)
      }
    }

    loadDictionary()
  }, [lang])

  // Traducciones específicas para la página de noticias
  const translations = {
    es: {
      title: "Noticias",
      subtitle: "Mantente al día con las últimas actualizaciones y eventos de ETERNALQUEST",
      readMore: "Leer más",
      latestNews: "Últimas noticias",
      allNews: "Todas las noticias",
      publishedOn: "Publicado el",
    },
    en: {
      title: "News",
      subtitle: "Stay up to date with the latest ETERNALQUEST updates and events",
      readMore: "Read more",
      latestNews: "Latest news",
      allNews: "All news",
      publishedOn: "Published on",
    },
    pt: {
      title: "Notícias",
      subtitle: "Mantenha-se atualizado com as últimas atualizações e eventos do ETERNALQUEST",
      readMore: "Ler mais",
      latestNews: "Últimas notícias",
      allNews: "Todas as notícias",
      publishedOn: "Publicado em",
    },
  }

  const t = isLoading ? translations.es : translations[lang as keyof typeof translations]

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 relative overflow-visible">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="h-10 w-64 bg-bunker-800 animate-pulse mx-auto rounded-md"></div>
            <div className="h-6 w-96 bg-bunker-800 animate-pulse mx-auto mt-4 rounded-md"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-bunker-800 animate-pulse h-80 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-24 relative overflow-visible">
      {/* Fondo con video de Vimeo */}
      <VimeoBackground videoId="1074464598" fallbackId="1074465089" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold gold-gradient-text mb-6">{t.title}</h1>
          <p className="text-xl text-gold-100 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Sección de noticias destacadas */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gold-300 mb-8 border-b border-gold-500/30 pb-2">{t.latestNews}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockNews.slice(0, 4).map((news) => (
              <Card
                key={news.id}
                className="bg-bunker-800/90 backdrop-blur-sm border border-gold-700/30 overflow-hidden transition-all duration-300 hover:scale-105 animate-glow"
              >
                <div className="relative h-48">
                  <Image
                    src={news.image || "/placeholder.svg"}
                    alt={news.title[lang as keyof typeof news.title] || ""}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-gold-400 text-sm mb-2">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    <span>
                      {t.publishedOn} {formatDate(news.date, lang)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gold-300 mb-3">
                    {news.title[lang as keyof typeof news.title]}
                  </h3>
                  <p className="text-gold-100/80 mb-4 line-clamp-3">
                    {news.description[lang as keyof typeof news.description]}
                  </p>
                  <Link
                    href={`/${lang}/noticias/${news.id}`}
                    className="text-gold-500 hover:text-gold-400 transition-colors font-medium flex items-center"
                  >
                    {t.readMore} <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sección de todas las noticias */}
        <div>
          <h2 className="text-2xl font-bold text-gold-300 mb-8 border-b border-gold-500/30 pb-2">{t.allNews}</h2>

          <div className="space-y-6">
            {mockNews.slice(4).map((news) => (
              <Card
                key={news.id}
                className="bg-bunker-800/90 backdrop-blur-sm border border-gold-700/30 overflow-hidden transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative h-48 md:h-auto md:w-1/3 lg:w-1/4">
                    <Image
                      src={news.image || "/placeholder.svg"}
                      alt={news.title[lang as keyof typeof news.title] || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6 md:w-2/3 lg:w-3/4">
                    <div className="flex items-center text-gold-400 text-sm mb-2">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>
                        {t.publishedOn} {formatDate(news.date, lang)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gold-300 mb-3">
                      {news.title[lang as keyof typeof news.title]}
                    </h3>
                    <p className="text-gold-100/80 mb-4">{news.description[lang as keyof typeof news.description]}</p>
                    <Link
                      href={`/${lang}/noticias/${news.id}`}
                      className="text-gold-500 hover:text-gold-400 transition-colors font-medium flex items-center"
                    >
                      {t.readMore} <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Divisor al final de la página */}
    </div>
  )
}
