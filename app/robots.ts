import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: "/private/",
        crawlDelay: 2,
      },
    ],
    sitemap: "https://coordenadas-gps.com.ar/sitemap.xml",
    host: "https://coordenadas-gps.com.ar",
  }
}

