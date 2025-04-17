"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Globe, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Locale } from "@/i18n/config"
import { i18n } from "@/i18n/config"
import { getDictionary } from "@/i18n/config"
import { setCookie } from "cookies-next"

interface NavbarProps {
  lang: Locale
}

export function Navbar({ lang }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dictionary, setDictionary] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const pathname = usePathname()

  // Verificar si el usuario está autenticado
  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("isAuthenticated") === "true"
      setIsAuthenticated(auth)
    }

    // Verificar al montar el componente
    checkAuth()

    // Verificar cuando cambia la ruta
    const handleRouteChange = () => {
      checkAuth()
    }

    window.addEventListener("storage", handleRouteChange)

    return () => {
      window.removeEventListener("storage", handleRouteChange)
    }
  }, [])

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Modificar la función changeLanguage para establecer español como predeterminado
  const changeLanguage = (newLang: string) => {
    // Guardar la preferencia de idioma en una cookie
    setCookie("NEXT_LOCALE", newLang, { maxAge: 60 * 60 * 24 * 30 }) // 30 días

    // Construir la nueva ruta con el nuevo idioma
    let newPath = pathname

    // Reemplazar el idioma actual en la ruta
    for (const locale of i18n.locales) {
      if (pathname.startsWith(`/${locale}/`)) {
        newPath = pathname.replace(`/${locale}/`, `/${newLang}/`)
        break
      } else if (pathname === `/${locale}`) {
        newPath = `/${newLang}`
        break
      }
    }

    // Usar una redirección más directa para asegurar que la página se recargue completamente
    window.location.href = newPath
  }

  // Si estamos cargando, mostrar un esqueleto
  if (isLoading) {
    return (
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <div className="navbar-left">
            <div className="w-36 h-10 bg-bunker-800 animate-pulse rounded"></div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex space-x-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-24 h-8 bg-bunker-800 animate-pulse rounded"></div>
              ))}
            </div>
          </div>
          <div className="navbar-right">
            <div className="w-24 h-10 bg-bunker-800 animate-pulse rounded"></div>
          </div>
        </div>
      </nav>
    )
  }

  // Verificar que el diccionario y navbar existen antes de crear los elementos de navegación
  const navItems =
    dictionary && dictionary.navbar
      ? [
          { name: dictionary.navbar.home, href: `/${lang}` },
          { name: dictionary.navbar.features, href: `/${lang}#info-section` },
          { name: dictionary.navbar.news, href: `/${lang}/noticias` },
          { name: dictionary.navbar.rankings, href: `/${lang}/ranking` }, // Updated from /rankings to /ranking
          { name: dictionary.navbar.classes, href: `/${lang}#classes-section` },
          { name: dictionary.navbar.download, href: `/${lang}#cta-section` },
        ]
      : []

  // Modificar la función handleNavigation para evitar que se active el preloader
  const handleNavigation = (href: string) => {
    setIsOpen(false)

    // Si es un enlace con ancla en la página actual
    if (href.includes("#")) {
      const sectionId = href.split("#")[1]
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    }
    // Si es el enlace Home y estamos en la página principal
    else if (href === `/${lang}` && pathname.startsWith(`/${lang}`)) {
      // Scroll al inicio de la página o al hero-section si existe
      const heroSection = document.getElementById("hero-section")
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: "smooth" })
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }
  }

  const languages = [
    { code: "es", name: "Español" },
    { code: "en", name: "English" },
    { code: "pt", name: "Português" },
  ]

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <Link href={`/${lang}`} className="navbar-logo">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO-OFICIAL-1.2-2r5D3y3IGm2ODScjRY2hduLVEpLl7x.png"
              alt="ETERNAL CONQUEST - Mu Online"
              width={150}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="language-selector">
                <Globe className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">{lang.toUpperCase()}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-bunker-800 border-gold-700/50">
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  className={`w-full cursor-pointer ${
                    lang === language.code ? "text-gold-400" : "text-gold-100 hover:text-gold-300"
                  }`}
                  onClick={() => changeLanguage(language.code)}
                >
                  {language.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="radio-inputs-desktop">
          {navItems.map((item) => (
            <label className="radio" key={item.href}>
              <input
                type="radio"
                name="navbar-radio"
                checked={pathname === item.href.split("#")[0]}
                onChange={() => {
                  // Este onChange es necesario para React pero no hace nada
                }}
              />
              <Link
                href={item.href}
                onClick={(e) => {
                  // Prevenir navegación por defecto para Home y enlaces con hash
                  if (item.href.includes("#") || (item.href === `/${lang}` && pathname.startsWith(`/${lang}`))) {
                    e.preventDefault()
                    handleNavigation(item.href)
                  }
                }}
              >
                <span className="name">{item.name}</span>
              </Link>
            </label>
          ))}
        </div>

        <div className="navbar-right">
          {dictionary && dictionary.navbar && (
            <>
              {isAuthenticated ? (
                <Link href={`/${lang}/panel`}>
                  <Button className="button-secondary hidden md:inline-flex">
                    <User className="h-4 w-4 mr-2" />
                    Panel de Usuario
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href={`/${lang}/inicio-sesion`}>
                    <Button className="button-secondary hidden md:inline-flex">{dictionary.navbar.signin}</Button>
                  </Link>
                  <Link href={`/${lang}/registro`}>
                    <button className="button hidden md:inline-flex">{dictionary.navbar.register}</button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <div className="mobile-menu-items">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-menu-item ${pathname === item.href.split("#")[0] ? "active" : ""}`}
              onClick={(e) => {
                // Prevenir navegación por defecto para Home y enlaces con hash
                if (item.href.includes("#") || (item.href === `/${lang}` && pathname.startsWith(`/${lang}`))) {
                  e.preventDefault()
                  handleNavigation(item.href)
                }
                setIsOpen(false)
              }}
            >
              {item.name}
            </Link>
          ))}
          <div className="mobile-menu-buttons">
            {dictionary && dictionary.navbar && (
              <>
                {isAuthenticated ? (
                  <Link href={`/${lang}/panel`} className="w-full">
                    <Button className="button-secondary w-full mb-2" onClick={() => setIsOpen(false)}>
                      <User className="h-4 w-4 mr-2" />
                      Panel de Usuario
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href={`/${lang}/inicio-sesion`} className="w-full">
                      <Button className="button-secondary w-full mb-2" onClick={() => setIsOpen(false)}>
                        {dictionary.navbar.signin}
                      </Button>
                    </Link>
                    <Link href={`/${lang}/registro`} className="w-full">
                      <button className="button w-full" onClick={() => setIsOpen(false)}>
                        {dictionary.navbar.register}
                      </button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
