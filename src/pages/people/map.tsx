import React, { useState } from 'react'
import SEO from 'components/seo'
import HogMap, { LAYER_PEOPLE, LAYER_EVENTS } from 'components/HogMap'
import Checkbox from 'components/Checkbox'

export default function PeopleMapPage(): JSX.Element {
    const [layers, setLayers] = useState<string[]>([LAYER_PEOPLE, LAYER_EVENTS])
    const toggleLayer = (layer: string) => {
        setLayers((prev) => (prev.includes(layer) ? prev.filter((l) => l !== layer) : [...prev, layer]))
    }
    return (
        <div data-scheme="primary" className="bg-primary h-full relative">
            <SEO title="Team map - PostHog" />
            <div className="absolute top-3 left-3 z-10">
                <div className="rounded border border-primary bg-primary px-3 py-2 shadow-sm">
                    <div className="flex items-center gap-4">
                        <Checkbox
                            value="people"
                            checked={layers.includes(LAYER_PEOPLE)}
                            onChange={() => toggleLayer(LAYER_PEOPLE)}
                        />
                        <Checkbox
                            value="events"
                            checked={layers.includes(LAYER_EVENTS)}
                            onChange={() => toggleLayer(LAYER_EVENTS)}
                        />
                    </div>
                </div>
            </div>
            <HogMap layers={layers} />
        </div>
    )
}
