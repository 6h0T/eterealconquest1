/**
 * Utility function to get the correct API URL regardless of environment
 * @param path - The API path (should start with "/api/")
 * @returns The complete API URL
 */
export function getApiUrl(path: string): string {
  // Ensure path starts with /api/
  const apiPath = path.startsWith("/api/") ? path : `/api/${path}`

  // In browser environment
  if (typeof window !== "undefined") {
    // Get the origin (protocol + domain)
    const origin = window.location.origin
    return `${origin}${apiPath}`
  }

  // In server environment (SSR)
  // Use environment variable or default to localhost
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
  return `${baseUrl}${apiPath}`
}

/**
 * Utility function to create fetch options with appropriate headers
 * @param options - Optional fetch options to extend
 * @returns Fetch options with appropriate headers
 */
export function createFetchOptions(options?: RequestInit): RequestInit {
  return {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      ...(options?.headers || {}),
    },
    next: { revalidate: 0 },
  }
}
