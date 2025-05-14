import React from 'react'
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  Marker,
  ZoomableGroup
} from 'react-simple-maps'

// Define types for the component props
interface Location {
  name: string
  place: string
  coordinates: [number, number]
  team: string
  date: string
  description?: string
  funFact?: string
}

interface WorldMapProps {
  locations: Location[]
  onLocationClick?: (location: Location) => void
}

// Path to the world map topojson file
// You'll need to add this file to your public/maps directory
const geoUrl = '/maps/world-110m.json'

const WorldMap: React.FC<WorldMapProps> = ({ locations, onLocationClick }) => {
  return (
    <div className="worldmap-container w-full h-full">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          scale: 170,
          center: [0, 0]
        }}
        width={800}
        height={400}
        className="w-full h-full"
      >
        <ZoomableGroup zoom={1} center={[0, 0]}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                  style={{
                    default: { fill: 'rgba(var(--color-accent-light), 0.2)', stroke: 'rgba(var(--color-accent-dark), 0.3)', outline: 'none' },
                    hover: { fill: 'rgba(var(--color-accent-light), 0.4)', stroke: 'rgba(var(--color-accent-dark), 0.5)', outline: 'none' },
                    pressed: { fill: 'rgba(var(--color-accent-light), 0.3)', stroke: 'rgba(var(--color-accent-dark), 0.4)', outline: 'none' }
                  }}
                  className="outline-none focus:outline-none dark:fill-accent-dark/20 dark:stroke-accent-light/30 dark:hover:fill-accent-dark/40 dark:hover:stroke-accent-light/50"
                />
              ))
            }
          </Geographies>
          
          {/* Add markers for each location with coordinates */}
          {locations
            .filter(location => location.coordinates && location.coordinates.length === 2)
            .map((location, index) => (
              <Marker
                key={index}
                coordinates={location.coordinates}
                onClick={() => onLocationClick && onLocationClick(location)}
              >
                <circle 
                  r={6} 
                  fill="#E9016A" // PostHog red color
                  stroke="#fff"
                  strokeWidth={2}
                  className="cursor-pointer hover:scale-125 transition-transform"
                />
                <circle
                  r={15}
                  fill="#E9016A"
                  opacity={0.2}
                  strokeWidth={0}
                  className="cursor-pointer hover:opacity-40 transition-opacity"
                />
              </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}

export default WorldMap 