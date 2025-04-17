/**
 * Utilidades para trabajar con Vercel Blob
 */

/**
 * Verifica si una URL es de Vercel Blob
 */
export function isVercelBlobUrl(url: string): boolean {
  return url.startsWith("https://v0.blob.com/")
}

/**
 * Obtiene el nombre del archivo de una URL de Vercel Blob
 */
export function getBlobFileName(url: string): string {
  if (!isVercelBlobUrl(url)) return ""

  // Extraer el nombre del archivo de la URL
  const parts = url.split("/")
  return parts[parts.length - 1]
}

/**
 * Genera una URL de Vercel Blob para un archivo
 * @param blobId El ID del blob (la parte final de la URL)
 */
export function getBlobUrl(blobId: string): string {
  if (!blobId) return ""

  // Si ya es una URL completa, devolverla
  if (isVercelBlobUrl(blobId)) return blobId

  // Si no, construir la URL
  return `https://v0.blob.com/${blobId}`
}

/**
 * Tipos de archivos multimedia soportados
 */
export const SUPPORTED_IMAGE_TYPES = ["png", "jpg", "jpeg", "gif", "webp", "svg"]
export const SUPPORTED_VIDEO_TYPES = ["mp4", "webm", "ogg"]

/**
 * Determina si un archivo es una imagen basado en su extensión
 */
export function isImageFile(fileName: string): boolean {
  const extension = fileName.split(".").pop()?.toLowerCase() || ""
  return SUPPORTED_IMAGE_TYPES.includes(extension)
}

/**
 * Determina si un archivo es un video basado en su extensión
 */
export function isVideoFile(fileName: string): boolean {
  const extension = fileName.split(".").pop()?.toLowerCase() || ""
  return SUPPORTED_VIDEO_TYPES.includes(extension)
}
