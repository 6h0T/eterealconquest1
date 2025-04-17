"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import { Preloader } from "./preloader"
import { usePathname, useSearchParams } from "next/navigation"

interface PreloaderWrapperProps {
  children: React.ReactNode
}

export function PreloaderWrapper({ children }: PreloaderWrapperProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isInitialLoad = useRef(true)
  const previousPathname = useRef(pathname)

  // Verificar si estamos en una página de registro o inicio de sesión
  const isAuthPage =
    pathname.includes("/registro") || pathname.includes("/inicio-sesion") || pathname.includes("/recuperacion")

  // Controlar la carga inicial vs navegación
  useEffect(() => {
    // Si ya se completó la carga inicial, no mostrar el preloader en navegaciones posteriores
    if (initialLoadComplete) {
      setIsLoading(false)
      return
    }

    // Solo mostrar el preloader en la carga inicial
    if (!isInitialLoad.current) {
      setIsLoading(false)
    }

    // Actualizar la referencia a la ruta anterior
    previousPathname.current = pathname

    // Marcar que ya no es la carga inicial después del primer renderizado
    if (isInitialLoad.current) {
      isInitialLoad.current = false
    }
  }, [pathname, searchParams, initialLoadComplete])

  // Si estamos en una página de autenticación, no mostrar el preloader
  useEffect(() => {
    if (isAuthPage) {
      setIsLoading(false)
      document.body.style.overflow = "auto"
    }
  }, [isAuthPage])

  // Verificar cuando las fuentes están cargadas
  useEffect(() => {
    // Solo ejecutar si no es una página de autenticación y estamos cargando
    if (!isAuthPage && isLoading) {
      // El evento 'load' se dispara cuando la página y todos sus recursos están cargados
      if (document.readyState === "complete") {
        setFontsLoaded(true)
      } else {
        window.addEventListener("load", () => {
          setFontsLoaded(true)
        })
      }

      return () => {
        window.removeEventListener("load", () => {
          setFontsLoaded(true)
        })
      }
    }
  }, [isAuthPage, isLoading])

  // Verificar cuando las imágenes están cargadas
  useEffect(() => {
    // Solo ejecutar si no es una página de autenticación y estamos cargando
    if (!isAuthPage && isLoading) {
      // Obtener todas las imágenes de la página
      const images = document.querySelectorAll("img")
      let loadedCount = 0

      // Si no hay imágenes, marcar como cargado
      if (images.length === 0) {
        setImagesLoaded(true)
        return
      }

      // Función para verificar si todas las imágenes están cargadas
      const checkImagesLoaded = () => {
        loadedCount++
        if (loadedCount === images.length) {
          setImagesLoaded(true)
        }
      }

      // Verificar cada imagen
      images.forEach((img) => {
        if (img.complete) {
          checkImagesLoaded()
        } else {
          img.addEventListener("load", checkImagesLoaded)
          img.addEventListener("error", checkImagesLoaded) // Contar también las imágenes con error
        }
      })

      // Limpiar event listeners
      return () => {
        images.forEach((img) => {
          img.removeEventListener("load", checkImagesLoaded)
          img.removeEventListener("error", checkImagesLoaded)
        })
      }
    }
  }, [isAuthPage, isLoading])

  // Función para manejar cuando el preloader ha completado
  const handleLoadingComplete = () => {
    setIsLoading(false)
    setInitialLoadComplete(true)

    // Desbloquear el scroll cuando la carga esté completa
    document.body.style.overflow = "auto"
  }

  // Bloquear el scroll durante la carga
  useEffect(() => {
    if (isLoading && !isAuthPage) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isLoading, isAuthPage])

  return (
    <>
      <AnimatePresence>
        {isLoading && !isAuthPage && <Preloader onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <div style={{ visibility: isLoading && !isAuthPage ? "hidden" : "visible" }}>{children}</div>
    </>
  )
}
