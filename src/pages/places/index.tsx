import React, { useState, useCallback, useRef, useEffect } from 'react'
import SEO from 'components/seo'
import Explorer from 'components/Explorer'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { Checkbox } from 'components/RadixUI/Checkbox'
import { useUser } from 'hooks/useUser'
import PlacesMap, { getPlaceIcon } from 'components/HogMap/PlacesMap'
import PlaceDetail from 'components/HogMap/PlaceDetail'
import { PlaceType, PlaceItem } from 'components/HogMap/types'
import { AnimatePresence } from 'framer-motion'

function Places() {
    const { isModerator } = useUser()
    // Initialize with all place types selected
    const [selectedLayers, setSelectedLayers] = useState<string[]>(Object.values(PlaceType))
    const [places, setPlaces] = useState<PlaceItem[]>([])
    const [selectedPlace, setSelectedPlace] = useState<PlaceItem | null>(null)
    const placesRef = useRef<PlaceItem[]>([])

    // Receive places data from PlacesMap component
    const handlePlacesLoaded = useCallback((loadedPlaces: PlaceItem[]) => {
        setPlaces(loadedPlaces)
        placesRef.current = loadedPlaces
    }, [])

    // Listen for new places being added and auto-open their detail
    useEffect(() => {
        const handlePlaceAdded = (event: CustomEvent) => {
            const placeId = event.detail?.placeId
            if (placeId && placesRef.current.length > 0) {
                // Wait a bit for the places to refresh, then open the detail
                setTimeout(() => {
                    const place = placesRef.current.find((p) => p.id === placeId)
                    if (place) {
                        setSelectedPlace(place)
                    }
                }, 500)
            }
        }

        window.addEventListener('hogmap:places-updated', handlePlaceAdded as EventListener)
        return () => window.removeEventListener('hogmap:places-updated', handlePlaceAdded as EventListener)
    }, [])

    // Show place detail overlay when a marker is clicked
    const handlePlaceClick = useCallback((placeId: number) => {
        const place = placesRef.current.find((p) => p.id === placeId)
        if (place) {
            setSelectedPlace(place)
        }
    }, [])

    // Count places by type
    const placesByType = places.reduce((acc, place) => {
        const type = place.type || PlaceType.COFFEE
        acc[type] = (acc[type] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    // Handle checkbox toggle
    const handleLayerToggle = (type: string, checked: boolean) => {
        if (checked) {
            setSelectedLayers((prev) => [...prev, type])
        } else {
            setSelectedLayers((prev) => prev.filter((layer) => layer !== type))
        }
    }

    return (
        <>
            <SEO
                title="Places - PostHog"
                description="Recommended places from the PostHog team"
                image="/images/og/default.png"
            />

            <Explorer template="generic" slug="places" title="Places" fullScreen viewportClasses="[&>div>div]:h-full">
                <div data-scheme="primary" className="flex flex-col @xl:flex-row text-primary h-full">
                    <aside
                        data-scheme="secondary"
                        className="basis-3/5 @xl:basis-80 bg-primary @xl:border-r border-primary h-full flex flex-col"
                    >
                        <ScrollArea className="flex-1">
                            <div className="p-4">
                                <div className="space-y-4">
                                    <div>
                                        <h2 className="text-lg font-semibold mb-3">HogMaps</h2>
                                        <p className="text-sm text-secondary">
                                            Recommended places discovered by the PostHog team around the world.
                                            {isModerator && (
                                                <span className="block mt-2 font-semibold">
                                                    As a moderator, you can add new places using the search bar on the
                                                    map.
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>

                        <div className="border-b border-primary px-4 pt-4 pb-4">
                            <h3 className="text-base font-semibold mb-2">Filter by type</h3>
                            <div className="space-y-3">
                                {Object.values(PlaceType).map((type) => {
                                    const { icon, colorClass } = getPlaceIcon(type, 'size-3')
                                    return (
                                        <label
                                            key={type}
                                            className="flex items-center gap-3 cursor-pointer group"
                                            htmlFor={`place-type-${type}`}
                                        >
                                            <Checkbox
                                                id={`place-type-${type}`}
                                                checked={selectedLayers.includes(type)}
                                                onCheckedChange={(checked) => handleLayerToggle(type, checked)}
                                            />
                                            <span className="flex items-center gap-2 flex-1">
                                                <span
                                                    className={`flex items-center justify-center w-6 h-6 rounded-full ${colorClass} border border-white shadow`}
                                                >
                                                    {icon}
                                                </span>
                                                <span className="text-sm">
                                                    {type} ({placesByType[type] || 0})
                                                </span>
                                            </span>
                                        </label>
                                    )
                                })}
                            </div>
                        </div>
                    </aside>

                    <div className="flex-1 relative h-full border-primary border-t @xl:border-t-0">
                        <AnimatePresence>
                            {selectedPlace && (
                                <PlaceDetail place={selectedPlace} onClose={() => setSelectedPlace(null)} />
                            )}
                        </AnimatePresence>

                        <PlacesMap
                            layers={selectedLayers.length > 0 ? selectedLayers : undefined}
                            onPlaceClick={handlePlaceClick}
                            selectedPlaceId={selectedPlace?.id || null}
                            onPlacesLoaded={handlePlacesLoaded}
                        />
                    </div>
                </div>
            </Explorer>
        </>
    )
}

export default Places
