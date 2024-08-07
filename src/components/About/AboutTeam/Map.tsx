import React from 'react'
import { ComposableMap, Geographies, Geography, Marker, Text } from 'react-simple-maps'

const geoUrl = '/world-countries-sans-antarctica.json'

const locations = [
    { latitude: 41.38848523453815, longitude: 2.166622174480074 }, // barcelona
    { latitude: 50.49696315467801, longitude: 4.784774969058086 }, // belgium
    { latitude: 51.78883703365682, longitude: 0.09233783565354269 }, // london
    { latitude: 45.006964607558096, longitude: -69.08934685858212 }, // maine
    { latitude: 48.138139474816086, longitude: 11.56465867778196 }, // munich
    { latitude: 40.89197279618272, longitude: -73.3075046535768 }, // nyc
    { latitude: 52.953719434919975, longitude: 18.756829547133602 }, // poland
    { latitude: 39.576113891366866, longitude: -119.7908947720339 }, // reno
    { latitude: 37.774485054188894, longitude: -122.38519988449306 }, // san francisco
    { latitude: 37.55577207246805, longitude: -122.29307269491872 }, // san mateo
    { latitude: 27.950692375717704, longitude: -82.46326115746774 }, // tampa
    { latitude: 49.2827291, longitude: -123.1207375 }, // vancouver
    { latitude: 45.5016889, longitude: -73.567256 }, // montreal
    { latitude: 43.653226, longitude: -79.3831843 }, // toronto
    { latitude: 55.8642, longitude: -4.2518 }, // glasgow
    { latitude: 47.6062095, longitude: -122.3320708 }, // seattle
    { latitude: 44.977753, longitude: -93.2650108 }, // minneapolis
    { latitude: 4.7109886, longitude: -74.072092 }, // colombia
    { latitude: 47.497912, longitude: 19.040235 }, // budapest
    { latitude: 53.3498053, longitude: -6.2603097 }, // dublin
    { latitude: 39.7392358, longitude: -104.990251 }, // denver
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
