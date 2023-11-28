import React from 'react'
import { ComposableMap, Geographies, Geography, Marker, Text } from 'react-simple-maps'

const geoUrl = '/world-countries-sans-antarctica.json'

const locations = [
    { latitude: 41.38848523453815, longitude: 2.166622174480074 }, // barcelona
    { latitude: 50.49696315467801, longitude: 4.784774969058086 }, // belgium
    { latitude: 33.02974986434739, longitude: -96.65277294573141 }, // dallas
    { latitude: 58.73834579394511, longitude: 25.916902090034583 }, // estonia
    { latitude: -4.440324327352228, longitude: 15.260257368359758 }, // kinshasa
    { latitude: 38.72214459464023, longitude: -9.136195374970244 }, // lisbon
    { latitude: 51.78883703365682, longitude: 0.09233783565354269 }, // london
    { latitude: 34.047765253694564, longitude: -118.23017278903602 }, // los angeles
    { latitude: 45.006964607558096, longitude: -69.08934685858212 }, // maine
    { latitude: 48.138139474816086, longitude: 11.56465867778196 }, // munich
    { latitude: 40.89197279618272, longitude: -73.3075046535768 }, // nyc
    { latitude: 48.856552321989945, longitude: 2.349091743776085 }, // paris
    { latitude: 52.953719434919975, longitude: 18.756829547133602 }, // poland
    { latitude: 45.5132298379867, longitude: -122.67575202285597 }, // portland
    { latitude: 39.576113891366866, longitude: -119.7908947720339 }, // reno
    { latitude: 64.14665324556529, longitude: -21.94206026716483 }, // reykjavik
    { latitude: 37.774485054188894, longitude: -122.38519988449306 }, // san francisco
    { latitude: 37.55577207246805, longitude: -122.29307269491872 }, // san mateo
    { latitude: 27.950692375717704, longitude: -82.46326115746774 }, // tampa
    { latitude: 54.88414675556349, longitude: -2.091537651357038 }, // uk
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
