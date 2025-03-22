import Script from "next/script"

export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Buscador de Coordenadas Geográficas",
    description:
      "Encuentra fácilmente las coordenadas geográficas (latitud y longitud) de cualquier ciudad, provincia o país del mundo.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    author: {
      "@type": "Organization",
      name: "Buscador de Coordenadas",
    },
  }

  return (
    <Script id="json-ld" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(jsonLd)}
    </Script>
  )
}

