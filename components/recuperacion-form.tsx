"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Check, AlertCircle, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { getDictionary } from "@/i18n/config"
import type { Locale } from "@/i18n/config"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface RecuperacionFormProps {
  lang: Locale
}

export function RecuperacionForm({ lang }: RecuperacionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [dictionary, setDictionary] = useState<any>({})
  const router = useRouter()

  // Cargar diccionario
  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dict = await getDictionary(lang)
        setDictionary(dict)
      } catch (error) {
        console.error("Error loading dictionary:", error)
      }
    }
    loadDictionary()
  }, [lang])

  // Traducciones específicas para el formulario
  const translations = {
    es: {
      email: "Correo electrónico",
      emailPlaceholder: "Ingresa tu correo electrónico",
      recover: "Recuperar Contraseña",
      recovering: "Procesando...",
      success: "¡Instrucciones enviadas! Revisa tu correo electrónico.",
      error: "Error al procesar la solicitud. Por favor, intenta nuevamente.",
      emailRequired: "El correo electrónico es requerido",
      emailInvalid: "El correo electrónico no es válido",
      backToLogin: "Volver a Iniciar Sesión",
      instructions: "Te enviaremos un enlace para restablecer tu contraseña.",
    },
    en: {
      email: "Email address",
      emailPlaceholder: "Enter your email address",
      recover: "Recover Password",
      recovering: "Processing...",
      success: "Instructions sent! Check your email.",
      error: "Error processing request. Please try again.",
      emailRequired: "Email is required",
      emailInvalid: "Email is invalid",
      backToLogin: "Back to Sign In",
      instructions: "We'll send you a link to reset your password.",
    },
    pt: {
      email: "Endereço de email",
      emailPlaceholder: "Digite seu endereço de email",
      recover: "Recuperar Senha",
      recovering: "Processando...",
      success: "Instruções enviadas! Verifique seu email.",
      error: "Erro ao processar solicitação. Por favor, tente novamente.",
      emailRequired: "Email é obrigatório",
      emailInvalid: "Email é inválido",
      backToLogin: "Voltar para Entrar",
      instructions: "Enviaremos um link para redefinir sua senha.",
    },
  }

  const t = translations[lang as keyof typeof translations]

  // Esquema de validación con Zod
  const formSchema = z.object({
    email: z.string().email(t.emailInvalid).min(1, t.emailRequired),
  })

  // Configurar React Hook Form con Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  // Manejar envío del formulario
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Usar una ruta absoluta para la API
      const response = await fetch("/api/recover-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || t.error)
      }

      // Simulación de éxito
      setSubmitSuccess(true)

      // Redirigir después de un breve retraso
      setTimeout(() => {
        router.push(`/${lang}/inicio-sesion`)
      }, 3000)
    } catch (error: any) {
      console.error("Error al procesar la solicitud:", error)
      setSubmitError(error.message || t.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="bg-bunker-800/90 backdrop-blur-sm border border-gold-700/30">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Instrucciones */}
          <p className="text-gold-100 text-center mb-4">{t.instructions}</p>

          {/* Email */}
          <div className="space-y-1">
            <Label htmlFor="email" className="text-gold-300">
              {t.email}
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-500/70">
                <Mail className="h-5 w-5" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder={t.emailPlaceholder}
                {...register("email")}
                className={`bg-bunker-900/80 border-gold-700/30 text-gold-100 placeholder:text-gold-500/50 focus:border-gold-500 pl-10 ${
                  errors.email ? "border-red-500" : ""
                }`}
                disabled={isSubmitting || submitSuccess}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Mensajes de éxito o error */}
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-900/30 border border-green-500/30 text-green-300 p-3 rounded-md flex items-center"
            >
              <Check className="h-5 w-5 mr-2" />
              {t.success}
            </motion.div>
          )}

          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-900/30 border border-red-500/30 text-red-300 p-3 rounded-md flex items-center"
            >
              <AlertCircle className="h-5 w-5 mr-2" />
              {submitError}
            </motion.div>
          )}

          {/* Botón de recuperación */}
          <div className="pt-2">
            <button type="submit" disabled={isSubmitting || submitSuccess} className="golden-button w-full">
              {isSubmitting ? t.recovering : t.recover}
            </button>
          </div>

          {/* Enlace para volver a iniciar sesión */}
          <div className="text-center text-gold-300 mt-4">
            <Link href={`/${lang}/inicio-sesion`} className="text-gold-500 hover:text-gold-400 font-medium underline">
              {t.backToLogin}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
