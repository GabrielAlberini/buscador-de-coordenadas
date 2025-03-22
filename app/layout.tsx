import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

// Update the metadata with the new domain and improved SEO elements
export const metadata: Metadata = {
  title: "Buscador de Coordenadas GPS | Latitud y Longitud de Ciudades",
  description:
    "Encuentra fácilmente las coordenadas geográficas (latitud y longitud) de cualquier ciudad, provincia o país del mundo. Visualiza la ubicación en un mapa interactivo y comparte ubicaciones GPS.",
  keywords: [
    "coordenadas GPS",
    "latitud y longitud",
    "geocodificación",
    "mapa interactivo",
    "ubicación GPS",
    "coordenadas geográficas",
    "buscador de coordenadas",
    "GPS online",
  ],
  authors: [{ name: "Coordenadas GPS" }],
  creator: "Coordenadas GPS",
  publisher: "Coordenadas GPS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://coordenadas-gps.com.ar"),
  alternates: {
    canonical: "/",
    languages: {
      "es-AR": "https://coordenadas-gps.com.ar",
    },
  },
  openGraph: {
    title: "Buscador de Coordenadas GPS | Latitud y Longitud de Ciudades",
    description:
      "Encuentra fácilmente las coordenadas geográficas (latitud y longitud) de cualquier ciudad, provincia o país del mundo. Herramienta gratuita y precisa.",
    url: "https://coordenadas-gps.com.ar",
    siteName: "Coordenadas GPS",
    images: [
      {
        url: "https://coordenadas-gps.com.ar/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Buscador de Coordenadas GPS",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buscador de Coordenadas GPS | Latitud y Longitud de Ciudades",
    description:
      "Encuentra fácilmente las coordenadas geográficas de cualquier lugar del mundo. Herramienta gratuita y precisa.",
    images: ["https://coordenadas-gps.com.ar/twitter-image.jpg"],
    site: "@coordenadasgps",
    creator: "@coordenadasgps",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verificacion-google", // Reemplazar con tu código real de Google Search Console
    yandex: "verificacion-yandex", // Opcional: añadir si usas Yandex
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="min-h-screen bg-background">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}

