import Script from "next/script"

export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Buscador de Coordenadas GPS",
    headline: "Buscador de Coordenadas GPS | Latitud y Longitud de Ciudades",
    description:
      "Encuentra fácilmente las coordenadas geográficas (latitud y longitud) de cualquier ciudad, provincia o país del mundo. Herramienta gratuita y precisa.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    url: "https://coordenadas-gps.com.ar",
    inLanguage: "es-AR",
    datePublished: "2023-01-01T00:00:00+00:00",
    dateModified: new Date().toISOString(),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "ARS",
      availability: "https://schema.org/InStock",
    },
    author: {
      "@type": "Organization",
      name: "Coordenadas GPS",
      url: "https://coordenadas-gps.com.ar",
      logo: {
        "@type": "ImageObject",
        url: "https://coordenadas-gps.com.ar/logo.png",
        width: 112,
        height: 112,
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Coordenadas GPS",
      url: "https://coordenadas-gps.com.ar",
      logo: {
        "@type": "ImageObject",
        url: "https://coordenadas-gps.com.ar/logo.png",
        width: 112,
        height: 112,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://coordenadas-gps.com.ar?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    sameAs: [
      "https://facebook.com/coordenadasgps",
      "https://twitter.com/coordenadasgps",
      "https://instagram.com/coordenadasgps",
    ],
    keywords:
      "coordenadas GPS, latitud y longitud, geocodificación, mapa interactivo, ubicación GPS, coordenadas geográficas, buscador de coordenadas, GPS online",
  }

  // Agregar un segundo bloque de JSON-LD para la organización
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Coordenadas GPS",
    url: "https://coordenadas-gps.com.ar",
    logo: "https://coordenadas-gps.com.ar/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "contacto@coordenadas-gps.com.ar",
    },
    sameAs: [
      "https://facebook.com/coordenadasgps",
      "https://twitter.com/coordenadasgps",
      "https://instagram.com/coordenadasgps",
    ],
  }

  // Agregar un tercer bloque de JSON-LD para BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://coordenadas-gps.com.ar",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Buscador de Coordenadas",
        item: "https://coordenadas-gps.com.ar",
      },
    ],
  }

  return (
    <>
      <Script id="json-ld-app" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <Script id="json-ld-org" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(organizationJsonLd)}
      </Script>
      <Script id="json-ld-breadcrumb" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
    </>
  )
}

