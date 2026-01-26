import React, { useState, useCallback, useRef, useEffect } from 'react'
import SEO from 'components/seo'
import Explorer from 'components/Explorer'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { Switch } from 'radix-ui'
import { useUser } from 'hooks/useUser'
import PlacesMap, { getPlaceIcon } from 'components/HogMap/PlacesMap'
import PlaceDetail from 'components/HogMap/PlaceDetail'
import { PlaceType, PlaceItem } from 'components/HogMap/types'
import { AnimatePresence } from 'framer-motion'

function Places(): JSX.Element {
    const { isModerator } = useUser()
    // Initialize with all place types selected
    const [selectedLayers, setSelectedLayers] = useState<string[]>(Object.values(PlaceType))
    const [places, setPlaces] = useState<PlaceItem[]>([])
    const [selectedPlace, setSelectedPlace] = useState<PlaceItem | null>(null)
    const [isInitialized, setIsInitialized] = useState(false)
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
                        handlePlaceSelect(place)
                    }
                }, 500)
            }
        }

        window.addEventListener('hogmap:places-updated', handlePlaceAdded as EventListener)
        return () => window.removeEventListener('hogmap:places-updated', handlePlaceAdded as EventListener)
    }, [])

    // Select a place and update URL hash
    const handlePlaceSelect = useCallback((place: PlaceItem, updateHash = true) => {
        setSelectedPlace(place)

        if (updateHash) {
            window.history.replaceState(null, '', `#placeId=${place.id}`)
        }
    }, [])

    // Show place detail overlay when a marker is clicked
    const handlePlaceClick = useCallback(
        (placeId: number) => {
            const place = placesRef.current.find((p) => p.id === placeId)
            if (place) {
                handlePlaceSelect(place)
            }
        },
        [handlePlaceSelect]
    )

    // Close place detail and clear URL hash
    const handleClosePlace = useCallback(() => {
        setSelectedPlace(null)
        window.history.replaceState(null, '', window.location.pathname)
    }, [])

    // Initialize from URL hash on page load
    useEffect(() => {
        if (!isInitialized && places.length > 0) {
            const hash = window.location.hash
            const match = hash.match(/#placeId=(\d+)/)

            if (match) {
                const placeId = parseInt(match[1], 10)
                const place = places.find((p) => p.id === placeId)

                if (place) {
                    // Select place without updating hash (since we're reading from it)
                    handlePlaceSelect(place, false)
                }
            }

            setIsInitialized(true)
        }
    }, [places, isInitialized, handlePlaceSelect])

    // Handle ESC key to close detail panel
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && selectedPlace) {
                handleClosePlace()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [selectedPlace, handleClosePlace])

    // Count places by type
    const placesByType = places.reduce((acc, place) => {
        const type = place.type || PlaceType.COFFEE
        acc[type] = (acc[type] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    // Handle switch toggle
    const handleLayerToggle = (type: string, checked: boolean) => {
        if (checked) {
            setSelectedLayers((prev) => [...prev, type])
        } else {
            setSelectedLayers((prev) => prev.filter((layer) => layer !== type))
        }
    }

    // Handle toggle all
    const handleToggleAll = (checked: boolean) => {
        if (checked) {
            setSelectedLayers(Object.values(PlaceType))
        } else {
            setSelectedLayers([])
        }
    }

    const allSelected = selectedLayers.length === Object.values(PlaceType).length

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
                                        <h2 className="text-lg font-semibold mb-3">Places</h2>
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

                            <div className="px-4 pt-4 pb-4">
                                <h3 className="text-base font-semibold mb-2">Filter by type</h3>

                                {/* Toggle all control */}
                                <div className="flex items-center justify-between py-3 border-b border-primary mb-3">
                                    <span className="text-sm font-semibold">Toggle all</span>
                                    <Switch.Root
                                        checked={allSelected}
                                        onCheckedChange={handleToggleAll}
                                        className="relative h-[27px] w-[44px] cursor-default border border-primary rounded-full bg-primary outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black data-[state=checked]:bg-green"
                                    >
                                        <Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-dark dark:bg-light transition-transform duration-100 will-change-transform data-[state=checked]:bg-white data-[state=checked]:translate-x-[19px]" />
                                    </Switch.Root>
                                </div>

                                <div className="space-y-3">
                                    {Object.values(PlaceType).map((type) => {
                                        const { icon, colorClass } = getPlaceIcon(type, 'size-3')
                                        return (
                                            <div key={type} className="flex items-center justify-between gap-3">
                                                <div className="flex items-center gap-2 flex-1">
                                                    <span
                                                        className={`flex items-center justify-center w-6 h-6 rounded-full ${colorClass} border border-white shadow`}
                                                    >
                                                        {icon}
                                                    </span>
                                                    <span className="text-sm">
                                                        {type} ({placesByType[type] || 0})
                                                    </span>
                                                </div>
                                                <Switch.Root
                                                    checked={selectedLayers.includes(type)}
                                                    onCheckedChange={(checked) => handleLayerToggle(type, checked)}
                                                    className="relative h-[27px] w-[44px] cursor-default border border-primary rounded-full bg-primary outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black data-[state=checked]:bg-green"
                                                >
                                                    <Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-dark dark:bg-light transition-transform duration-100 will-change-transform data-[state=checked]:bg-white data-[state=checked]:translate-x-[19px]" />
                                                </Switch.Root>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </ScrollArea>
                    </aside>

                    <div className="flex-1 relative h-full border-primary border-t @xl:border-t-0">
                        <AnimatePresence>
                            {selectedPlace && <PlaceDetail place={selectedPlace} onClose={handleClosePlace} />}
                        </AnimatePresence>

                        <PlacesMap
                            layers={selectedLayers}
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
