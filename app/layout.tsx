import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

// Definimos los metadatos para SEO
export const metadata: Metadata = {
  title: "Buscador de Coordenadas Geográficas | Latitud y Longitud",
  description:
    "Encuentra fácilmente las coordenadas geográficas (latitud y longitud) de cualquier ciudad, provincia o país del mundo. Visualiza la ubicación en un mapa interactivo.",
  keywords: ["coordenadas geográficas", "latitud", "longitud", "geocodificación", "mapa", "ubicación", "GPS"],
  authors: [{ name: "Buscador de Coordenadas" }],
  creator: "Buscador de Coordenadas",
  publisher: "Buscador de Coordenadas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tu-dominio.com"), // Reemplaza con tu dominio real
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Buscador de Coordenadas Geográficas | Latitud y Longitud",
    description:
      "Encuentra fácilmente las coordenadas geográficas (latitud y longitud) de cualquier ciudad, provincia o país del mundo.",
    url: "https://tu-dominio.com",
    siteName: "Buscador de Coordenadas",
    images: [
      {
        url: "https://tu-dominio.com/og-image.jpg", // Reemplaza con tu imagen real
        width: 1200,
        height: 630,
        alt: "Buscador de Coordenadas Geográficas",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buscador de Coordenadas Geográficas | Latitud y Longitud",
    description: "Encuentra fácilmente las coordenadas geográficas de cualquier lugar del mundo.",
    images: ["https://tu-dominio.com/twitter-image.jpg"], // Reemplaza con tu imagen real
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "tu-codigo-de-verificacion", // Reemplaza con tu código de verificación de Google Search Console
  },
    generator: 'v0.dev'
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



import './globals.css'