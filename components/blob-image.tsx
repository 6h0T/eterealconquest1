import type React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface BlobImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
}

export function BlobImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  ...props
}: BlobImageProps & React.ComponentPropsWithoutRef<typeof Image>) {
  // Verificar si la URL ya es de Vercel Blob
  const isVercelBlob =
    src.startsWith("https://v0.blob.com/") || src.startsWith("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/")

  // Usar la URL proporcionada directamente, sin placeholder
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={cn(className)}
      priority={priority}
      fill={fill}
      sizes={sizes}
      {...props}
    />
  )
}
