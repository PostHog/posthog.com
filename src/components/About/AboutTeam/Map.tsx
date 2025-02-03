import React from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { useStaticQuery, graphql } from 'gatsby'

// Avoid displaying two locations that are too close to each other
const isOverlapping = (location: Location, locations: Location[], offset = 2) => {
    return locations.some(otherLocation => {
        return Math.abs(otherLocation.coordinates.latitude - location.coordinates.latitude) < offset &&
            Math.abs(otherLocation.coordinates.longitude - location.coordinates.longitude) < offset
    })
}

const GEO_URL = '/world-countries-sans-antarctica.json'
const QUERY = graphql`
    query {
        allMapboxLocation {
            nodes {
                location
                coordinates {
                    latitude
                    longitude
                }
            }
        }
    }
`

interface Location {
    location: string
    coordinates: {
        latitude: number
        longitude: number
    }
}

export default function Map(): JSX.Element {
    const data = useStaticQuery(QUERY)

    const allLocations: Location[] = data.allMapboxLocation.nodes
    const nonOverlappingLocations: Location[] = allLocations.reduce((otherLocations, location) => {
        if (isOverlapping(location, otherLocations))
            return otherLocations

        return [...otherLocations, location]
    }, [] as Location[])

    return (
        <ComposableMap>
            <Geographies geography={GEO_URL}>
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
            {nonOverlappingLocations.map(({ location, coordinates: { longitude, latitude } }) => (
                <Marker key={location} coordinates={[longitude, latitude]}>
                    <g>
                        <title>{location}</title>
                        <circle className="animate-ping" r={7} fill="white" />
                        <circle r={6} fill="#F54E00" />
                    </g>
                </Marker>
            ))}
        </ComposableMap>
    )
}
