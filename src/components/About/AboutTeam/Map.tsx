import React from 'react'
import { ComposableMap, Geographies, Geography, Marker, Text } from 'react-simple-maps'

const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json'

const locations = [
    { latitude: 37.7749295, longitude: -122.4194183 },
    { latitude: 37.7749295, longitude: -122.4194183 },
    { latitude: 40.7142691, longitude: -74.0059738 },
    { latitude: 51.5084153, longitude: -0.1255327 },
]

export default function Map() {
    return (
        <ComposableMap>
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                    geographies.map((geo) => (
                        <Geography
                            style={{
                                default: { outline: 'none' },
                                hover: { outline: 'none' },
                                pressed: { outline: 'none' },
                            }}
                            key={geo.rsmKey}
                            geography={geo}
                            fill={'#bfbfbd'}
                        />
                    ))
                }
            </Geographies>
            {locations.map(({ longitude, latitude }, index) => {
                return (
                    <Marker key={index} style coordinates={[longitude, latitude]}>
                        <circle className="animate-ping" r={7} fill="white" />
                        <circle r={6} fill="#F54E00" />
                    </Marker>
                )
            })}
        </ComposableMap>
    )
}
