export default function SeoText() {
  return (
    <div className="container max-w-md mx-auto py-6 px-4 text-sm text-muted-foreground">
      <h2 className="text-lg font-semibold mb-2">¿Qué son las coordenadas GPS?</h2>
      <p className="mb-3">
        Las coordenadas GPS son un sistema de referencia que permite ubicar con precisión cualquier punto en la
        superficie terrestre. Están compuestas por dos valores: la latitud (distancia angular norte o sur desde el
        ecuador) y la longitud (distancia angular este u oeste desde el meridiano de Greenwich).
      </p>

      <h2 className="text-lg font-semibold mb-2">¿Para qué sirven las coordenadas geográficas?</h2>
      <p className="mb-3">
        Las coordenadas geográficas son fundamentales para la navegación, cartografía, sistemas de información
        geográfica (GIS), aplicaciones de mapas, servicios basados en ubicación, y muchas otras tecnologías que
        requieren precisión en la localización de puntos en la Tierra.
      </p>

      <h2 className="text-lg font-semibold mb-2">¿Cómo usar nuestro buscador de coordenadas?</h2>
      <p className="mb-3">
        Nuestro buscador de coordenadas GPS es muy sencillo de utilizar. Puede buscar las coordenadas de un lugar
        ingresando su nombre (ciudad, dirección, punto de interés) o puede obtener información sobre una ubicación
        ingresando sus coordenadas (latitud y longitud). Los resultados se muestran en un mapa interactivo y puede
        copiar las coordenadas o compartir la ubicación con un solo clic.
      </p>

      <h2 className="text-lg font-semibold mb-2">Formatos de coordenadas disponibles</h2>
      <p className="mb-3">Ofrecemos dos formatos principales de coordenadas:</p>
      <ul className="list-disc pl-5 mb-3">
        <li>
          <strong>Decimal:</strong> El formato más común, expresado en grados decimales (ej. 40.7128, -74.0060).
        </li>
        <li>
          <strong>DMS (Grados, Minutos, Segundos):</strong> El formato tradicional que divide cada grado en 60 minutos y
          cada minuto en 60 segundos (ej. 40° 42' 46" N, 74° 0' 21" W).
        </li>
      </ul>

      <h2 className="text-lg font-semibold mb-2">Aplicaciones prácticas</h2>
      <p className="mb-3">Nuestro buscador de coordenadas GPS es útil para:</p>
      <ul className="list-disc pl-5 mb-3">
        <li>Planificar rutas y viajes</li>
        <li>Compartir ubicaciones precisas</li>
        <li>Geocaching y actividades al aire libre</li>
        <li>Investigación y educación</li>
        <li>Desarrollo de aplicaciones basadas en ubicación</li>
        <li>Documentación de lugares visitados</li>
      </ul>
    </div>
  )
}

