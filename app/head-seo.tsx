import Head from "next/head"

export default function HeadSEO() {
  return (
    <Head>
      {/* Etiquetas adicionales para SEO */}
      <link rel="alternate" hrefLang="es-AR" href="https://coordenadas-gps.com.ar" />
      <link rel="alternate" hrefLang="x-default" href="https://coordenadas-gps.com.ar" />

      {/* Preconectar a dominios externos para mejorar el rendimiento */}
      <link rel="preconnect" href="https://nominatim.openstreetmap.org" />

      {/* Etiquetas de Open Graph adicionales */}
      <meta property="og:site_name" content="Coordenadas GPS" />
      <meta property="og:locale" content="es_AR" />

      {/* Etiquetas de Twitter adicionales */}
      <meta name="twitter:site" content="@coordenadasgps" />
      <meta name="twitter:creator" content="@coordenadasgps" />

      {/* Etiquetas de verificación de propiedad */}
      <meta name="facebook-domain-verification" content="codigo-de-verificacion-facebook" />

      {/* Etiquetas de geolocalización */}
      <meta name="geo.region" content="AR" />
      <meta name="geo.position" content="-34.6037;-58.3816" />
      <meta name="ICBM" content="-34.6037, -58.3816" />

      {/* Etiquetas de autor y copyright */}
      <meta name="author" content="Coordenadas GPS" />
      <meta name="copyright" content="Coordenadas GPS" />

      {/* Etiquetas de clasificación de contenido */}
      <meta name="rating" content="general" />
    </Head>
  )
}

