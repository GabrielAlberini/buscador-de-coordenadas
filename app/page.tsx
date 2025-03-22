"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Copy, Check, Clock, Share2, Layers, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import dynamic from "next/dynamic"
import JsonLd from "./json-ld"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

// Importar el componente HeadSEO
import HeadSEO from "./head-seo"
import SeoText from "./seo-text"

// Importamos el mapa dinámicamente para evitar problemas de SSR
const MapComponent = dynamic(() => import("./map-component"), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-muted flex items-center justify-center">Cargando mapa...</div>,
})

// Tipos para nuestros datos
interface LocationResult {
  lat: string
  lon: string
  display_name: string
  address?: {
    country?: string
    state?: string
    city?: string
    postcode?: string
  }
  [key: string]: any
}

interface HistoryItem {
  query: string
  result: LocationResult
  timestamp: number
}

// Función para convertir coordenadas decimales a DMS (grados, minutos, segundos)
function decimalToDMS(coordinate: number, isLatitude: boolean): string {
  const absolute = Math.abs(coordinate)
  const degrees = Math.floor(absolute)
  const minutesNotTruncated = (absolute - degrees) * 60
  const minutes = Math.floor(minutesNotTruncated)
  const seconds = Math.floor((minutesNotTruncated - minutes) * 60)

  const direction = isLatitude ? (coordinate >= 0 ? "N" : "S") : coordinate >= 0 ? "E" : "W"

  return `${degrees}° ${minutes}' ${seconds}" ${direction}`
}

export default function GeoLocator() {
  const [location, setLocation] = useState("")
  const [results, setResults] = useState<LocationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedLat, setCopiedLat] = useState(false)
  const [copiedLon, setCopiedLon] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("forward")
  const [coordinateFormat, setCoordinateFormat] = useState<string>("decimal")
  const [mapType, setMapType] = useState<string>("streets")
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [latInput, setLatInput] = useState<string>("")
  const [lonInput, setLonInput] = useState<string>("")
  const [shareUrl, setShareUrl] = useState<string>("")
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)

  const { toast } = useToast()
  const searchParams = useSearchParams()
  const router = useRouter()

  // Cargar historial del localStorage al iniciar
  useEffect(() => {
    const savedHistory = localStorage.getItem("geoLocationHistory")
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error("Error parsing history from localStorage", e)
      }
    }
  }, [])

  // Guardar historial en localStorage cuando cambie
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("geoLocationHistory", JSON.stringify(history))
    }
  }, [history])

  // Procesar parámetros de URL para compartir ubicaciones
  useEffect(() => {
    const lat = searchParams.get("lat")
    const lon = searchParams.get("lon")
    const query = searchParams.get("q")

    if (lat && lon) {
      setLatInput(lat)
      setLonInput(lon)
      setActiveTab("reverse")
      handleReverseGeocode({ lat, lon })
    } else if (query) {
      setLocation(query)
      setActiveTab("forward")
      handleForwardGeocode(query)
    }
  }, [searchParams])

  const copyToClipboard = (text: string, type: "lat" | "lon") => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === "lat") {
        setCopiedLat(true)
        setTimeout(() => setCopiedLat(false), 2000)
      } else {
        setCopiedLon(true)
        setTimeout(() => setCopiedLon(false), 2000)
      }

      toast({
        description: "Coordenada copiada al portapapeles",
        duration: 2000,
      })
    })
  }

  const formatCoordinate = (coordinate: string, isLatitude: boolean): string => {
    const num = Number.parseFloat(coordinate)

    switch (coordinateFormat) {
      case "dms":
        return decimalToDMS(num, isLatitude)
      case "decimal":
      default:
        return coordinate
    }
  }

  const handleForwardGeocode = async (searchQuery: string = location) => {
    if (!searchQuery.trim()) return

    setLoading(true)
    setError(null)

    try {
      // Usar la API de Nominatim de OpenStreetMap para geocodificación
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1&addressdetails=1`,
        { headers: { "Accept-Language": "es" } },
      )

      const data = await response.json()

      if (data && data.length > 0) {
        setResults(data[0])

        // Añadir a historial
        const newHistoryItem: HistoryItem = {
          query: searchQuery,
          result: data[0],
          timestamp: Date.now(),
        }

        setHistory((prev) => {
          // Evitar duplicados y limitar a 10 elementos
          const filtered = prev.filter((item) => item.query !== searchQuery)
          return [newHistoryItem, ...filtered].slice(0, 10)
        })
      } else {
        setError("No se encontró la ubicación. Intenta con un nombre más específico.")
      }
    } catch (err) {
      setError("Error al buscar la ubicación. Inténtalo de nuevo más tarde.")
    } finally {
      setLoading(false)
    }
  }

  const handleReverseGeocode = async (coords: { lat: string; lon: string } = { lat: latInput, lon: lonInput }) => {
    if (!coords.lat || !coords.lon) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lon}&addressdetails=1`,
        { headers: { "Accept-Language": "es" } },
      )

      const data = await response.json()

      if (data && data.display_name) {
        setResults(data)

        // Añadir a historial
        const newHistoryItem: HistoryItem = {
          query: `${coords.lat}, ${coords.lon}`,
          result: data,
          timestamp: Date.now(),
        }

        setHistory((prev) => {
          // Evitar duplicados y limitar a 10 elementos
          const filtered = prev.filter((item) => item.query !== newHistoryItem.query)
          return [newHistoryItem, ...filtered].slice(0, 10)
        })
      } else {
        setError("No se encontró información para estas coordenadas.")
      }
    } catch (err) {
      setError("Error al buscar la ubicación. Inténtalo de nuevo más tarde.")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (activeTab === "forward") {
      handleForwardGeocode()
    } else {
      handleReverseGeocode()
    }
  }

  const loadHistoryItem = (item: HistoryItem) => {
    if (item.query.includes(",")) {
      // Es una búsqueda inversa
      const [lat, lon] = item.query.split(",").map((s) => s.trim())
      setLatInput(lat)
      setLonInput(lon)
      setActiveTab("reverse")
    } else {
      // Es una búsqueda directa
      setLocation(item.query)
      setActiveTab("forward")
    }

    setResults(item.result)
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem("geoLocationHistory")
    toast({
      description: "Historial borrado correctamente",
      duration: 3000,
    })
  }

  const shareLocation = () => {
    if (!results) return

    const url = new URL(window.location.href)
    url.searchParams.delete("q")
    url.searchParams.delete("lat")
    url.searchParams.delete("lon")

    if (activeTab === "forward") {
      url.searchParams.set("q", location)
    } else {
      url.searchParams.set("lat", results.lat)
      url.searchParams.set("lon", results.lon)
    }

    setShareUrl(url.toString())
    setIsShareDialogOpen(true)
  }

  const copyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast({
        description: "Enlace copiado al portapapeles",
        duration: 3000,
      })
      setIsShareDialogOpen(false)
    })
  }

  // Añadir el componente HeadSEO justo después de JsonLd en el return
  return (
    <>
      <JsonLd />
      <HeadSEO />
      <Toaster />
      <div className="container max-w-md mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Buscador de Coordenadas</CardTitle>
            <CardDescription>Encuentra coordenadas geográficas o información de ubicación.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="forward">Nombre → Coordenadas</TabsTrigger>
                <TabsTrigger value="reverse">Coordenadas → Nombre</TabsTrigger>
              </TabsList>

              <TabsContent value="forward">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ej: Madrid, Barcelona, España..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      disabled={loading}
                      aria-label="Nombre de la ubicación"
                    />
                    <Button type="submit" disabled={loading} aria-label="Buscar coordenadas">
                      {loading ? "Buscando..." : <Search className="h-4 w-4" />}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="reverse">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <Label htmlFor="latitude">Latitud</Label>
                      <Input
                        id="latitude"
                        placeholder="Ej: 40.4168"
                        value={latInput}
                        onChange={(e) => setLatInput(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <Label htmlFor="longitude">Longitud</Label>
                      <Input
                        id="longitude"
                        placeholder="Ej: -3.7038"
                        value={lonInput}
                        onChange={(e) => setLonInput(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Buscando..." : "Buscar dirección"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between items-center mb-4">
              <RadioGroup value={coordinateFormat} onValueChange={setCoordinateFormat} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="decimal" id="decimal" />
                  <Label htmlFor="decimal">Decimal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dms" id="dms" />
                  <Label htmlFor="dms">DMS</Label>
                </div>
              </RadioGroup>

              <div className="flex space-x-2">
                <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={!results}
                      onClick={shareLocation}
                      title="Compartir ubicación"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Compartir ubicación</DialogTitle>
                      <DialogDescription>Copia este enlace para compartir la ubicación actual.</DialogDescription>
                    </DialogHeader>
                    <div className="flex space-x-2">
                      <Input value={shareUrl} readOnly />
                      <Button onClick={copyShareUrl}>Copiar</Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" title="Historial">
                      <Clock className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[300px]">
                    {history.length > 0 ? (
                      <>
                        {history.map((item, index) => (
                          <DropdownMenuItem
                            key={index}
                            onClick={() => loadHistoryItem(item)}
                            className="cursor-pointer"
                          >
                            <div className="truncate">
                              <div className="font-medium">{item.query}</div>
                              <div className="text-xs text-muted-foreground truncate">
                                {new Date(item.timestamp).toLocaleString()}
                              </div>
                            </div>
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuItem onClick={clearHistory} className="text-destructive cursor-pointer">
                          Borrar historial
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <div className="p-2 text-center text-muted-foreground">No hay búsquedas recientes</div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" title="Capas del mapa">
                      <Layers className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setMapType("streets")} className="cursor-pointer">
                      Calles
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setMapType("satellite")} className="cursor-pointer">
                      Satélite
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setMapType("terrain")} className="cursor-pointer">
                      Terreno
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {results && (
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-muted p-3 rounded-md relative">
                    <div className="text-sm font-medium text-muted-foreground">Latitud</div>
                    <div className="text-lg font-bold flex items-center">
                      <span className="truncate">{formatCoordinate(results.lat, true)}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-1 shrink-0"
                        onClick={() => copyToClipboard(results.lat, "lat")}
                        title="Copiar latitud"
                        aria-label="Copiar latitud"
                      >
                        {copiedLat ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded-md relative">
                    <div className="text-sm font-medium text-muted-foreground">Longitud</div>
                    <div className="text-lg font-bold flex items-center">
                      <span className="truncate">{formatCoordinate(results.lon, false)}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-1 shrink-0"
                        onClick={() => copyToClipboard(results.lon, "lon")}
                        title="Copiar longitud"
                        aria-label="Copiar longitud"
                      >
                        {copiedLon ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                {results.display_name && (
                  <div className="text-sm mb-4">
                    <span className="font-medium">Ubicación:</span> {results.display_name}
                  </div>
                )}

                {/* Información adicional */}
                {results.address && (
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    {results.address.country && (
                      <div>
                        <span className="font-medium">País:</span> {results.address.country}
                      </div>
                    )}
                    {results.address.state && (
                      <div>
                        <span className="font-medium">Estado/Provincia:</span> {results.address.state}
                      </div>
                    )}
                    {results.address.city && (
                      <div>
                        <span className="font-medium">Ciudad:</span> {results.address.city}
                      </div>
                    )}
                    {results.address.postcode && (
                      <div>
                        <span className="font-medium">Código Postal:</span> {results.address.postcode}
                      </div>
                    )}
                  </div>
                )}

                {/* Componente de mapa */}
                <div className="mt-4 border rounded-md overflow-hidden">
                  <MapComponent
                    position={[Number.parseFloat(results.lat), Number.parseFloat(results.lon)]}
                    locationName={results.display_name}
                    mapType={mapType}
                  />
                </div>
              </div>
            )}
          </CardContent>

          {/* Sección de donaciones */}
          <CardFooter className="flex flex-col border-t pt-4">
            <div className="flex items-center justify-center gap-2 mb-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-red-500" />
              <span>¿Te gusta esta aplicación? Apoya su desarrollo</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="https://link.mercadopago.com.ar/gabrielalberini"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Colaborar con Mercado Pago
              </Link>
              <Link
                href="https://www.paypal.me/GabrielAlberini"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-600 h-10 px-4 py-2"
              >
                Colaborar con PayPal
              </Link>
            </div>
          </CardFooter>
        </Card>
        <SeoText />
      </div>
    </>
  )
}

