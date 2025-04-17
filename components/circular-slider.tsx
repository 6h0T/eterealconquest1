"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronUp, ChevronDown, Play } from "lucide-react"
import { getDictionary } from "@/i18n/config"
import type { Locale } from "@/i18n/config"
import { motion, AnimatePresence } from "framer-motion"

const characters = [
  {
    id: "darkKnight",
    name: "Dark Knight",
    img: "/images/dk-icon.png",
    headerImg:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dk%20encabezado-lcoV3t6HQuJVVhjJXDqgmaGKudt5se.png",
    characterImg:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dk%20placeholder-kcoHFqc20rd5R8aa08Y1aK4VJ2gal4.png",
    videoPlaceholder: "/placeholder.svg?height=400&width=600&text=Dark Knight Video",
    fullImage: "/placeholder.svg?height=800&width=600&text=Dark Knight Full",
  },
  {
    id: "darkWizard",
    name: "Dark Wizard",
    img: "/images/dw-icon.png",
    headerImg:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DW%20encabezado-pb2BdiJ2sv6kUfmSS9UKZpemlyHyvt.png",
    characterImg:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DW%20placeholder-5nD9u3x1iccJXt9q1xfxxyUtT3tQRS.png",
    videoPlaceholder: "/placeholder.svg?height=400&width=600&text=Dark Wizard Video",
    fullImage: "/placeholder.svg?height=800&width=600&text=Dark Wizard Full",
  },
  {
    id: "fairyElf",
    name: "Fairy Elf",
    img: "/images/elf-icon.png",
    headerImg:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ELf%20encabezado-WmkejHhTPPZ6wZaPMkqTLLQg1QRAoB.png",
    characterImg:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ELF%20placeholder-IQncvz5LHHMYfxmBVAUDZloN0AKMXU.png",
    videoPlaceholder: "/placeholder.svg?height=400&width=600&text=Fairy Elf Video",
    fullImage: "/placeholder.svg?height=800&width=600&text=Fairy Elf Full",
  },
  {
    id: "darkLord",
    name: "Dark Lord",
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dl%20icon-9iWuoEieourpGLPfwakoJ5n25JgK9d.png",
    headerImg:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DL%20encabezado-UtyMeAn3JYzXaRb3Qsg4WghhaJ5phs.png",
    characterImg:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DL%20PLACEHOLDER-TdrPDJNjf9yGOlJeBqBhFSvNmIREfb.png",
    videoPlaceholder: "/placeholder.svg?height=400&width=600&text=Dark Lord Video",
    fullImage: "/placeholder.svg?height=800&width=600&text=Dark Lord Full",
  },
  {
    id: "magicGladiator",
    name: "Magic Gladiator",
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mg%20icon-j4JbVDDxZvVl37jY9ok1j6Ju8oKk5e.png",
    headerImg:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MG%20encabezado-iMn0FldvAQ4OiKKXnIIy867l0HjIlk.png",
    characterImg:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MG%20placeholder-DtMOijbmtu2FH0TAJV37AGm22MnjXa.png",
    videoPlaceholder: "/placeholder.svg?height=400&width=600&text=Magic Gladiator Video",
    fullImage: "/placeholder.svg?height=800&width=600&text=Magic Gladiator Full",
  },
  {
    id: "summoner",
    name: "Summoner",
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sm%20icon-s48QKxxEAZTMG1Z63AMmXx7cZNtnVB.png",
    headerImg:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SM%20encabezado-98ZrOUin6DOUye2HxePJ9AEZbtViaU.png",
    characterImg:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SM%20placeholder-4G6fG7ZaSh6nCX910ceshTDY3sMaSS.png",
    videoPlaceholder: "/placeholder.svg?height=400&width=600&text=Summoner Video",
    fullImage: "/placeholder.svg?height=800&width=600&text=Summoner Full",
  },
  {
    id: "rageFighter",
    name: "Rage Fighter",
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rf%20icon-fYR6m1wPZLX3OH84j7GQFB2AGt8yAC.png",
    headerImg:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RF-encabezado-ct9fP32PedvAWUhrMyTYYYshiisORL.png",
    characterImg:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RF%20placeholder-cfsrFGTGRBhHwD9HwdGcmRI3KWKo80.png",
    videoPlaceholder: "/placeholder.svg?height=400&width=600&text=Rage Fighter Video",
    fullImage: "/placeholder.svg?height=800&width=600&text=Rage Fighter Full",
  },
]

// Variantes para las animaciones
const panelVariants = {
  leftInitial: { x: "-100%", opacity: 1 },
  rightInitial: { x: "100%", opacity: 1 },
  center: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.3, // Reducido de 0.5 a 0.3
    },
  },
  exit: {
    opacity: 0,
    scale: 1.2,
    transition: {
      duration: 0.2, // Reducido de 0.3 a 0.2
    },
  },
}

// Variantes para el selector
const selectorVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3, // Reducido de 0.5 a 0.3
      delay: 0.6, // Reducido de 1.2 a 0.6
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.15, // Reducido de 0.2 a 0.15
    },
  },
}

// Variantes para animaciones secuenciales
const headerVariants = {
  initial: { opacity: 0, y: -50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3, // Reducido de 0.5 a 0.3
      delay: 0.65, // Reducido de 1.3 a 0.65
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.15, // Reducido de 0.2 a 0.15
    },
  },
}

const characterImageVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3, // Reducido de 0.5 a 0.3
      delay: 0.7, // Reducido de 1.4 a 0.7
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.15, // Reducido de 0.2 a 0.15
    },
  },
}

const descriptionVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3, // Reducido de 0.5 a 0.3
      delay: 0.75, // Reducido de 1.5 a 0.75
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.15, // Reducido de 0.2 a 0.15
    },
  },
}

const videoVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3, // Reducido de 0.5 a 0.3
      delay: 0.8, // Reducido de 1.6 a 0.8
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.15, // Reducido de 0.2 a 0.15
    },
  },
}

interface CircularSliderProps {
  lang: Locale
}

export default function CircularSlider({ lang }: CircularSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState(0)
  const [dictionary, setDictionary] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showContent, setShowContent] = useState(true)
  const [showSelector, setShowSelector] = useState(true)
  const [wipeComplete, setWipeComplete] = useState(false)

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

  const changeClass = (index: number) => {
    if (index === activeIndex || isAnimating) return

    setPreviousIndex(activeIndex)
    setIsAnimating(true)
    setShowContent(false) // Ocultar el contenido durante la animación
    setShowSelector(false) // Ocultar el selector durante la animación
    setWipeComplete(false) // Reiniciar el estado del wipe

    // Cambiar la clase inmediatamente para que el wipe muestre la transición correcta
    setActiveIndex(index)

    // Configurar un temporizador para mostrar el contenido después de que el wipe termine
    setTimeout(() => {
      setWipeComplete(true) // Marcar que el wipe ha terminado

      // Mostrar el selector y el contenido después de que el wipe termine completamente
      setTimeout(() => {
        setShowSelector(true)
        setShowContent(true)

        // Finalizar la animación después de que todos los elementos hayan entrado
        setTimeout(() => {
          setIsAnimating(false)
        }, 900) // Reducido de 1800 a 900
      }, 100) // Reducido de 200 a 100
    }, 500) // Reducido de 1000 a 500
  }

  const moveUp = () => {
    const newIndex = (activeIndex - 1 + characters.length) % characters.length
    changeClass(newIndex)
  }

  const moveDown = () => {
    const newIndex = (activeIndex + 1) % characters.length
    changeClass(newIndex)
  }

  const activeCharacter = characters[activeIndex]
  const previousCharacter = characters[previousIndex]

  // Renderizar un estado de carga mientras se obtienen las traducciones
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-pulse h-40 w-40 rounded-full bg-bunker-800/50"></div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative">
      {/* Contenedor principal para la animación */}
      <div className="relative w-full min-h-screen overflow-hidden">
        {/* Fondo plano */}
        <div className="absolute inset-0 bg-bunker-950 z-5"></div>

        {/* Paneles de energía que chocan - SOLO DORADOS */}
        <AnimatePresence>
          {isAnimating && !wipeComplete && (
            <>
              {/* Panel izquierdo - Color dorado */}
              <motion.div
                key="left-panel"
                className="absolute inset-0 z-10"
                initial="leftInitial"
                animate="center"
                exit="exit"
                variants={panelVariants}
                onAnimationComplete={() => {
                  // Esta función se llama cuando la animación del panel izquierdo termina
                  // No hacemos nada aquí porque ya tenemos un temporizador en changeClass
                }}
              >
                <div
                  className="h-full w-full"
                  style={{
                    background: `linear-gradient(to right, rgba(255, 215, 0, 0.6), transparent)`,
                    clipPath: "polygon(0 0, 100% 0, 70% 100%, 0% 100%)",
                  }}
                />
              </motion.div>

              {/* Panel derecho - Color dorado */}
              <motion.div
                key="right-panel"
                className="absolute inset-0 z-10"
                initial="rightInitial"
                animate="center"
                exit="exit"
                variants={panelVariants}
              >
                <div
                  className="h-full w-full"
                  style={{
                    background: `linear-gradient(to left, rgba(255, 215, 0, 0.6), transparent)`,
                    clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)",
                  }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Imagen del personaje como fondo */}
        <AnimatePresence mode="wait">
          {showContent && (
            <motion.div
              key={`bg-${activeCharacter.id}`}
              className="absolute left-0 bottom-0 h-full w-1/2 z-5"
              variants={characterImageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="relative w-full h-full">
                <Image
                  src={activeCharacter.characterImg || "/placeholder.svg"}
                  alt={activeCharacter.name}
                  fill
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contenido principal con animaciones secuenciales */}
        <div className="relative z-20 w-full h-screen flex items-center justify-center">
          <div className="flex w-full max-w-6xl px-4">
            {/* Selector de clases con iconos */}
            <AnimatePresence>
              {showSelector && (
                <motion.div
                  className="flex-shrink-0 mr-8 self-center relative z-30"
                  variants={selectorVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <button
                      onClick={moveUp}
                      className="w-10 h-10 rounded-full bg-bunker-800/80 flex items-center justify-center text-gold-400 hover:bg-bunker-700 hover:text-gold-300 transition-colors"
                      aria-label="Personaje anterior"
                      disabled={isAnimating}
                    >
                      <ChevronUp size={20} />
                    </button>

                    <div className="flex flex-col space-y-4">
                      {characters.map((char, i) => (
                        <div
                          key={i}
                          className={`relative cursor-pointer transition-all duration-300 ${isAnimating ? "pointer-events-none" : ""}`}
                          onClick={() => changeClass(i)}
                        >
                          {/* Contenedor exterior para el borde y la sombra */}
                          <div
                            className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                              i === activeIndex
                                ? "border-gold-500 shadow-lg shadow-gold-500/30"
                                : "border-transparent hover:border-gold-500/50"
                            }`}
                          >
                            {/* Contenedor intermedio para centrar la imagen */}
                            <div className="w-full h-full flex items-center justify-center">
                              {/* Imagen con escala independiente */}
                              <Image
                                src={char.img || "/placeholder.svg"}
                                alt={char.name}
                                width={56}
                                height={56}
                                className={`object-contain transition-transform duration-300 ${i === activeIndex ? "scale-125" : ""}`}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={moveDown}
                      className="w-10 h-10 rounded-full bg-bunker-800/80 flex items-center justify-center text-gold-400 hover:bg-bunker-700 hover:text-gold-300 transition-colors"
                      aria-label="Siguiente personaje"
                      disabled={isAnimating}
                    >
                      <ChevronDown size={20} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Contenido de la clase */}
            <AnimatePresence mode="wait">
              {showContent && (
                <div key={activeCharacter.id} className="flex-grow">
                  {/* Imagen del encabezado con animación */}
                  <motion.div
                    className="relative w-full max-w-xl h-32 md:h-40 mb-8 mx-auto"
                    variants={headerVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Image
                      src={activeCharacter.headerImg || "/placeholder.svg"}
                      alt={activeCharacter.name}
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>

                  {/* Contenido principal */}
                  <div className="flex flex-col md:flex-row items-start justify-between gap-8">
                    {/* Espacio vacío donde estaba la imagen para mantener el layout */}
                    <div className="md:w-1/3"></div>

                    {/* Descripción y video a la derecha */}
                    <div className="md:w-2/3">
                      {/* Descripción con animación */}
                      <motion.div
                        className="bg-bunker-800/70 backdrop-blur-sm p-6 rounded-lg mb-8"
                        variants={descriptionVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <p className="text-xl text-gold-100/90">
                          {dictionary.classes && dictionary.classes[activeCharacter.id]
                            ? dictionary.classes[activeCharacter.id].description
                            : "Loading..."}
                        </p>
                      </motion.div>

                      {/* Video placeholder con animación */}
                      <motion.div
                        className="relative w-full aspect-video bg-bunker-800/70 backdrop-blur-sm rounded-lg overflow-hidden"
                        variants={videoVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <Image
                          src={activeCharacter.videoPlaceholder || "/placeholder.svg"}
                          alt={`${activeCharacter.name} video`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="w-16 h-16 rounded-full bg-gold-500/80 flex items-center justify-center text-bunker-950 hover:bg-gold-400 transition-colors">
                            <Play size={32} fill="currentColor" />
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
