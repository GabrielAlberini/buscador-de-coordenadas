"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react"
import L from "leaflet"

// Arreglar el problema de los iconos de Leaflet en Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

interface MapComponentProps {
  position: [number, number]
  locationName: string
  mapType?: string
}

export default function MapComponent({ position, locationName, mapType = "streets" }: MapComponentProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  // Seleccionar la capa del mapa según el tipo
  const getTileLayer = () => {
    switch (mapType) {
      case "satellite":
        return (
          <TileLayer
            attribution='&copy; <a href="https://www.esri.com">Esri</a>'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        )
      case "terrain":
        return (
          <TileLayer
            attribution='&copy; <a href="https://www.opentopomap.org">OpenTopoMap</a>'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          />
        )
      case "streets":
      default:
        return (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )
    }
  }

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
      scrollWheelZoom={false}
      key={`${position[0]}-${position[1]}-${mapType}`} // Forzar re-render cuando cambian las props
    >
      {getTileLayer()}
      <Marker position={position} icon={icon}>
        <Popup>{locationName}</Popup>
      </Marker>
    </MapContainer>
  )
}

