import React, { useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'

// Map data types
export interface HogLocation {
  name: string
  place: string
  date: string
  team: string
  description?: string
  funFact?: string
  coordinates: [number, number] // [longitude, latitude]
}

interface HogsitesMapProps {
  locations: HogLocation[]
  onLocationClick?: (location: HogLocation | null) => void
  selectedLocation?: HogLocation | null
}

// Path to the world map topojson file
const WORLD_MAP_URL = '/world-countries-sans-antarctica.json'

/**
 * Map component for displaying PostHog team visit locations
 */
const HogsitesMap: React.FC<HogsitesMapProps> = ({ 
  locations, 
  onLocationClick,
  selectedLocation 
}) => {
  // State for zoom and position
  const [position, setPosition] = useState<{ coordinates: [number, number], zoom: number }>({
    coordinates: [0, 0],
    zoom: 1
  });

  // Handle zoom change
  const handleZoomChange = (position: { coordinates: [number, number], zoom: number }) => {
    setPosition(position);
  };

  // Handle zoom in button click
  const handleZoomIn = () => {
    if (position.zoom >= 6) return;
    setPosition(pos => ({ ...pos, zoom: Math.min(pos.zoom * 1.5, 6) }));
  };

  // Handle zoom out button click
  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: Math.max(pos.zoom / 1.5, 1) }));
  };

  // Handle reset button click
  const handleReset = () => {
    setPosition({ coordinates: [0, 0], zoom: 1 });
  };

  // Handle closing the sidebar
  const handleCloseSidebar = () => {
    if (onLocationClick) {
      onLocationClick(null);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div className="hogsites-map w-full h-full relative flex">
      {/* Main map area */}
      <div className="relative flex-1 h-full">
        {/* Zoom controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
          <button 
            onClick={handleZoomIn}
            className="bg-white dark:bg-dark rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
            aria-label="Zoom in"
          >
            <span className="text-lg font-bold">+</span>
          </button>
          <button 
            onClick={handleZoomOut}
            className="bg-white dark:bg-dark rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
            aria-label="Zoom out"
          >
            <span className="text-lg font-bold">-</span>
          </button>
          <button 
            onClick={handleReset}
            className="bg-white dark:bg-dark rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
            aria-label="Reset zoom"
          >
            <span className="text-sm">↻</span>
          </button>
        </div>
        
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{
            scale: 140,
            center: [0, 0]
          }}
          className="w-full h-full"
        >
          <ZoomableGroup
            center={position.coordinates}
            zoom={position.zoom}
            onMoveEnd={handleZoomChange}
            minZoom={1}
            maxZoom={6}
          >
            <Geographies geography={WORLD_MAP_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: { 
                        fill: 'rgba(191, 191, 189, 0.2)', 
                        stroke: 'rgba(191, 191, 189, 0.5)', 
                        outline: 'none' 
                      },
                      hover: { 
                        fill: 'rgba(191, 191, 189, 0.3)', 
                        stroke: 'rgba(191, 191, 189, 0.6)', 
                        outline: 'none' 
                      },
                      pressed: { 
                        fill: 'rgba(191, 191, 189, 0.4)', 
                        stroke: 'rgba(191, 191, 189, 0.7)', 
                        outline: 'none' 
                      }
                    }}
                    className="outline-none focus:outline-none dark:fill-accent-dark/20 dark:stroke-accent-light/30 dark:hover:fill-accent-dark/40 dark:hover:stroke-accent-light/50"
                  />
                ))
              }
            </Geographies>
            
            {locations.map((location) => {
              const isSelected = selectedLocation?.place === location.place
              return (
                <Marker 
                  key={location.place} 
                  coordinates={location.coordinates}
                  onClick={() => onLocationClick && onLocationClick(location)}
                >
                  <g>
                    <title>{location.name}</title>
                    {isSelected && (
                      <circle 
                        className="animate-ping" 
                        r={10} 
                        fill="rgba(233, 1, 106, 0.2)" 
                      />
                    )}
                    <circle 
                      r={isSelected ? 8 : 5} 
                      fill="#E9016A" // PostHog red color
                      stroke="#fff"
                      strokeWidth={2}
                      className={`cursor-pointer transition-all duration-300 ${isSelected ? 'drop-shadow-md' : 'hover:scale-125'}`}
                    />
                    <circle
                      r={15}
                      fill="#E9016A"
                      opacity={0.2}
                      strokeWidth={0}
                      className="cursor-pointer hover:opacity-40 transition-opacity"
                    />
                  </g>
                </Marker>
              )
            })}
          </ZoomableGroup>
        </ComposableMap>
      </div>
      
      {/* Sidebar for location details */}
      <div className={`w-64 bg-accent/5 dark:bg-accent-dark/10 h-full overflow-y-auto border-l border-light dark:border-dark transition-all duration-300 ${selectedLocation ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 hidden md:block'}`}>
        {selectedLocation && (
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-bold text-primary dark:text-primary-dark">{selectedLocation.place}</h3>
              <button 
                onClick={handleCloseSidebar} 
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label="Close sidebar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {/* Event name */}
            <h4 className="text-lg font-semibold mb-2">{selectedLocation.name}</h4>
            
            {/* Date */}
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {formatDate(selectedLocation.date)}
            </div>
            
            <div className="border-b border-light dark:border-dark mb-3"></div>
            
            {/* Team information */}
            <div className="mb-4">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Team</span>
              <div className="mt-1 flex items-center">
                <div className="bg-accent/30 dark:bg-accent-dark/30 px-2 py-1 rounded-md text-sm font-medium">
                  {selectedLocation.team}
                </div>
              </div>
            </div>
            
            {/* Description if available */}
            {selectedLocation.description && (
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">About</span>
                <p className="mt-1 text-sm">{selectedLocation.description}</p>
              </div>
            )}
            
            {/* Fun fact if available */}
            {selectedLocation.funFact && (
              <div className="mt-4 bg-accent/20 dark:bg-accent-dark/20 p-3 rounded-md">
                <span className="text-sm font-medium">🦔 Hog Fact</span>
                <p className="mt-1 text-sm">{selectedLocation.funFact}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default HogsitesMap 