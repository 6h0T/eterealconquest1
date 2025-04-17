"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Twitch, DiscIcon as Discord } from "lucide-react"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/config"

interface FooterProps {
  lang: Locale
}

export function Footer({ lang }: FooterProps) {
  const year = new Date().getFullYear()
  const [dictionary, setDictionary] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)

  // Cargar el diccionario directamente en el componente
  useEffect(() => {
    const loadDictionary = async () => {
      setIsLoading(true)
      try {
        const dict = await getDictionary(lang)
        setDictionary(dict)
      } catch (error) {
        console.error("Error loading dictionary:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDictionary()
  }, [lang])

  // Renderizar un footer simplificado mientras se cargan las traducciones
  if (isLoading) {
    return (
      <footer className="bg-bunker-900 pt-12 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse h-40 bg-bunker-800/50 rounded-lg"></div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-bunker-900 pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-gold-400 font-bold text-lg mb-4">{dictionary.footer?.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/features`} className="text-gold-100 hover:text-gold-300 transition-colors">
                  {dictionary.footer?.features}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/news`} className="text-gold-100 hover:text-gold-300 transition-colors">
                  {dictionary.footer?.news}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/roadmap`} className="text-gold-100 hover:text-gold-300 transition-colors">
                  {dictionary.footer?.roadmap}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/info`} className="text-gold-100 hover:text-gold-300 transition-colors">
                  {dictionary.footer?.info}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-gold-400 font-bold text-lg mb-4">{dictionary.footer?.support}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/download`} className="text-gold-100 hover:text-gold-300 transition-colors">
                  {dictionary.footer?.downloads}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/rankings`} className="text-gold-100 hover:text-gold-300 transition-colors">
                  {dictionary.footer?.rankings}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/terms`} className="text-gold-100 hover:text-gold-300 transition-colors">
                  {dictionary.footer?.terms}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="text-gold-100 hover:text-gold-300 transition-colors">
                  {dictionary.footer?.contact}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-gold-400 font-bold text-lg mb-4">{dictionary.footer?.social}</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="#" className="text-gold-100 hover:text-gold-400 transition-colors">
                <Discord className="h-6 w-6" />
                <span className="sr-only">Discord</span>
              </Link>
              <Link href="#" className="text-gold-100 hover:text-gold-400 transition-colors">
                <Youtube className="h-6 w-6" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="#" className="text-gold-100 hover:text-gold-400 transition-colors">
                <Twitch className="h-6 w-6" />
                <span className="sr-only">Twitch</span>
              </Link>
              <Link href="#" className="text-gold-100 hover:text-gold-400 transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>

              <Link href="#" className="text-gold-100 hover:text-gold-400 transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gold-100 hover:text-gold-400 transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-gold-400 font-bold text-lg mb-4">{dictionary.footer?.legal}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/privacy`} className="text-gold-100 hover:text-gold-300 transition-colors">
                  {dictionary.footer?.privacy}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/terms`} className="text-gold-100 hover:text-gold-300 transition-colors">
                  {dictionary.footer?.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 text-center">
          <p className="text-gold-200 text-sm">
            &copy; {year} ETEREALCONQUEST. {dictionary.footer?.allRightsReserved}.
          </p>
          <p className="text-gold-200 text-sm mt-2">
            {dictionary.footer?.developedBy}{" "}
            <a
              href="https://www.gh0tstudio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:text-gold-300 transition-colors"
            >
              www.gh0tstudio.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
