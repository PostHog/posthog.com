import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { regions } from '../journeyData'
import { useJourneyStore } from '../journeyStore'

// ============ TYPES ============

interface GridPosition {
    gridX: number // 0-100, percentage of width
    gridY: number // 0-100, percentage of height
}

interface Location {
    id: string
    name: string
    description?: string
    position: GridPosition
    hitbox?: { width: number; height: number } // Size in grid units
    content?: React.ReactNode
    onVisit?: () => void
}

interface Path {
    from: string
    to: string
    waypoints?: GridPosition[]
}

interface WorldMapConfig {
    background: string
    baseWidth: number
    baseHeight: number
    locations: Location[]
    paths: Path[]
    startLocation: string
    character?: {
        sprite?: React.ReactNode
        size?: number // Grid units (default: 3)
    }
}

interface WorldMapProps {
    config: WorldMapConfig
    onLocationVisit?: (location: Location) => void
    onLocationClick?: (location: Location) => void
    showDebug?: boolean
    className?: string
}

// ============ HELPERS ============

const toPixels = (gridX: number, gridY: number, baseWidth: number, baseHeight: number) => ({
    x: (gridX / 100) * baseWidth,
    y: (gridY / 100) * baseHeight,
})

const toGrid = (x: number, y: number, baseWidth: number, baseHeight: number) => ({
    gridX: (x / baseWidth) * 100,
    gridY: (y / baseHeight) * 100,
})

// ============ HOOKS ============

function useScale(baseWidth: number, baseHeight: number) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState(1)

    useEffect(() => {
        const updateScale = () => {
            if (!containerRef.current) return
            const containerWidth = containerRef.current.clientWidth
            const newScale = containerWidth / baseWidth
            setScale(newScale)
        }

        updateScale()

        const resizeObserver = new ResizeObserver(updateScale)
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current)
        }

        window.addEventListener('resize', updateScale)

        return () => {
            resizeObserver.disconnect()
            window.removeEventListener('resize', updateScale)
        }
    }, [baseWidth])

    return { scale, containerRef }
}

function useNavigation(locations: Location[], paths: Path[], startLocation: string) {
    const [currentLocation, setCurrentLocation] = useState(startLocation)
    const [isMoving, setIsMoving] = useState(false)
    const [currentPosition, setCurrentPosition] = useState<GridPosition>(() => {
        const loc = locations.find((l) => l.id === startLocation)
        return loc?.position || { gridX: 50, gridY: 50 }
    })
    const [waypoints, setWaypoints] = useState<GridPosition[]>([])
    const [waypointIndex, setWaypointIndex] = useState(0)

    // Build adjacency graph
    const buildGraph = useCallback(() => {
        const adj: Record<string, string[]> = {}
        locations.forEach((loc) => {
            adj[loc.id] = []
        })
        paths.forEach((path) => {
            if (adj[path.from] && !adj[path.from].includes(path.to)) {
                adj[path.from].push(path.to)
            }
            if (adj[path.to] && !adj[path.to].includes(path.from)) {
                adj[path.to].push(path.from)
            }
        })
        return adj
    }, [locations, paths])

    // BFS to find path
    const findPath = useCallback(
        (from: string, to: string): string[] => {
            if (from === to) return []
            const adj = buildGraph()
            const queue: string[][] = [[from]]
            const visited = new Set<string>([from])

            while (queue.length > 0) {
                const route = queue.shift()!
                const last = route[route.length - 1]

                if (last === to) {
                    return route.slice(1) // Exclude starting point
                }

                for (const neighbor of adj[last] || []) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor)
                        queue.push([...route, neighbor])
                    }
                }
            }

            return [to] // Direct jump if no path
        },
        [buildGraph]
    )

    // Generate waypoints for path
    const generateWaypoints = useCallback(
        (locationPath: string[]): GridPosition[] => {
            const result: GridPosition[] = []
            let prevLocId = currentLocation

            for (const locId of locationPath) {
                // Check if there's a defined path with waypoints
                const pathDef = paths.find(
                    (p) => (p.from === prevLocId && p.to === locId) || (p.from === locId && p.to === prevLocId)
                )

                if (pathDef?.waypoints) {
                    const shouldReverse = pathDef.from !== prevLocId
                    const wp = shouldReverse ? [...pathDef.waypoints].reverse() : pathDef.waypoints
                    result.push(...wp)
                }

                // Add destination location
                const destLoc = locations.find((l) => l.id === locId)
                if (destLoc) {
                    result.push(destLoc.position)
                }

                prevLocId = locId
            }

            return result
        },
        [currentLocation, locations, paths]
    )

    const navigateTo = useCallback(
        (targetId: string) => {
            if (isMoving || targetId === currentLocation) return

            const locationPath = findPath(currentLocation, targetId)
            if (locationPath.length === 0) return

            const newWaypoints = generateWaypoints(locationPath)
            if (newWaypoints.length === 0) return

            setWaypoints(newWaypoints)
            setWaypointIndex(0)
            setIsMoving(true)
        },
        [isMoving, currentLocation, findPath, generateWaypoints]
    )

    // Handle waypoint progression
    useEffect(() => {
        if (!isMoving || waypoints.length === 0) return

        const targetWaypoint = waypoints[waypointIndex]
        setCurrentPosition(targetWaypoint)
    }, [isMoving, waypoints, waypointIndex])

    const onWaypointReached = useCallback(() => {
        if (waypoints.length === 0) return

        if (waypointIndex < waypoints.length - 1) {
            setWaypointIndex((i) => i + 1)
        } else {
            // Reached final destination
            setIsMoving(false)
            const finalWaypoint = waypoints[waypoints.length - 1]
            if (finalWaypoint) {
                const destLoc = locations.find(
                    (l) => l.position.gridX === finalWaypoint.gridX && l.position.gridY === finalWaypoint.gridY
                )
                if (destLoc) {
                    setCurrentLocation(destLoc.id)
                }
            }
            setWaypoints([])
            setWaypointIndex(0)
        }
    }, [waypointIndex, waypoints, locations])

    return {
        currentLocation,
        currentPosition,
        isMoving,
        navigateTo,
        onWaypointReached,
    }
}

// ============ SUBCOMPONENTS ============

function Hotspot({
    location,
    baseWidth,
    baseHeight,
    onClick,
    debug,
}: {
    location: Location
    baseWidth: number
    baseHeight: number
    onClick: () => void
    debug?: boolean
}) {
    const [hovered, setHovered] = useState(false)
    const { x, y } = toPixels(location.position.gridX, location.position.gridY, baseWidth, baseHeight)
    const hitbox = location.hitbox || { width: 10, height: 10 }
    const width = (hitbox.width / 100) * baseWidth
    const height = (hitbox.height / 100) * baseHeight

    return (
        <div
            className={`absolute cursor-pointer rounded-xl transition-all duration-200 ${
                debug ? 'border-4 border-dashed border-red' : ''
            } ${hovered && !debug ? 'bg-white/15 shadow-lg' : ''}`}
            style={{
                left: x - width / 2,
                top: y - height / 2,
                width,
                height,
            }}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Tooltip */}
            <div
                className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 transition-all duration-200 pointer-events-none z-50 ${
                    hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                }`}
            >
                <div className="bg-accent dark:bg-accent-dark text-primary dark:text-primary-dark px-3 py-2 rounded-md whitespace-nowrap border border-border dark:border-dark shadow-lg text-xl font-bold">
                    {location.name}
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-8 border-transparent border-t-border dark:border-t-dark" />
            </div>
        </div>
    )
}

function Character({
    position,
    isMoving,
    baseWidth,
    baseHeight,
    size = 3,
    sprite,
    onAnimationComplete,
}: {
    position: GridPosition
    isMoving: boolean
    baseWidth: number
    baseHeight: number
    size?: number
    sprite?: React.ReactNode
    onAnimationComplete?: () => void
}) {
    const { x, y } = toPixels(position.gridX, position.gridY, baseWidth, baseHeight)
    const pixelSize = (size / 100) * baseWidth

    return (
        <motion.div
            className="absolute pointer-events-none z-40"
            style={{
                width: pixelSize,
                height: pixelSize,
            }}
            animate={{
                left: x - pixelSize / 2,
                top: y - pixelSize / 2,
            }}
            transition={{
                type: 'tween',
                duration: 0.5,
                ease: 'easeInOut',
            }}
            onAnimationComplete={onAnimationComplete}
        >
            <motion.div
                className="w-full h-full"
                animate={{
                    y: isMoving ? [0, -6, 0] : 0,
                }}
                transition={{
                    repeat: isMoving ? Infinity : 0,
                    duration: 0.2,
                }}
            >
                {sprite || (
                    <div
                        className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center shadow-lg"
                        style={{ fontSize: pixelSize * 0.7 }}
                    >
                        🦔
                    </div>
                )}
            </motion.div>
        </motion.div>
    )
}

function Modal({ location, onClose }: { location: Location | null; onClose: () => void }) {
    if (!location) return null

    return (
        <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-accent dark:bg-accent-dark border border-border dark:border-dark rounded-lg p-6 max-w-md mx-4 shadow-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold text-primary dark:text-primary-dark mb-3">{location.name}</h2>
                {location.description && (
                    <p className="text-secondary dark:text-secondary-dark mb-4">{location.description}</p>
                )}
                <button
                    className="bg-red dark:bg-yellow text-white dark:text-primary font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
                    onClick={onClose}
                >
                    Close
                </button>
            </motion.div>
        </motion.div>
    )
}

// ============ MAIN COMPONENT ============

function WorldMap({ config, onLocationVisit, onLocationClick, showDebug = false, className = '' }: WorldMapProps) {
    const { scale, containerRef } = useScale(config.baseWidth, config.baseHeight)
    const { currentLocation, currentPosition, isMoving, navigateTo, onWaypointReached } = useNavigation(
        config.locations,
        config.paths,
        config.startLocation
    )
    const [debugInfo, setDebugInfo] = useState('Ready to explore!')
    const [modalLocation, setModalLocation] = useState<Location | null>(null)

    const handleLocationClick = (location: Location) => {
        if (isMoving) return

        onLocationClick?.(location)

        if (location.id === currentLocation) {
            // Already at location - show modal and trigger visit callback
            setModalLocation(location)
            onLocationVisit?.(location)
            location.onVisit?.()
        } else {
            // Navigate to location
            navigateTo(location.id)
            setDebugInfo(`Traveling to ${location.name}...`)
        }
    }

    const handleAnimationComplete = () => {
        // Check if this is the final waypoint before calling onWaypointReached
        // (since onWaypointReached will clear waypoints and we need to check first)
        const isFinalDestination =
            isMoving &&
            config.locations.some(
                (l) => l.position.gridX === currentPosition.gridX && l.position.gridY === currentPosition.gridY
            )
        const arrivedLoc = isFinalDestination
            ? config.locations.find(
                  (l) => l.position.gridX === currentPosition.gridX && l.position.gridY === currentPosition.gridY
              )
            : null

        onWaypointReached()

        // If we arrived at a location, trigger callbacks
        if (arrivedLoc) {
            setDebugInfo(`At: ${arrivedLoc.name}`)
            onLocationVisit?.(arrivedLoc)
            arrivedLoc.onVisit?.()
        }
    }

    return (
        <div className={`w-full ${className}`}>
            {/* Map Wrapper - maintains aspect ratio */}
            <div
                ref={containerRef}
                className="w-full relative"
                style={{ aspectRatio: `${config.baseWidth} / ${config.baseHeight}` }}
            >
                {/* Map Container - scaled to fit */}
                <div
                    className="absolute top-0 left-0 origin-top-left overflow-hidden"
                    style={{
                        width: config.baseWidth,
                        height: config.baseHeight,
                        transform: `scale(${scale})`,
                        backgroundImage: `url(${config.background})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {/* Hotspots */}
                    {config.locations.map((location) => (
                        <Hotspot
                            key={location.id}
                            location={location}
                            baseWidth={config.baseWidth}
                            baseHeight={config.baseHeight}
                            onClick={() => handleLocationClick(location)}
                            debug={showDebug}
                        />
                    ))}

                    {/* Character */}
                    <Character
                        position={currentPosition}
                        isMoving={isMoving}
                        baseWidth={config.baseWidth}
                        baseHeight={config.baseHeight}
                        size={config.character?.size || 3}
                        sprite={config.character?.sprite}
                        onAnimationComplete={handleAnimationComplete}
                    />

                    {/* Debug Info */}
                    {showDebug && (
                        <div
                            className="absolute bottom-2 left-2 bg-black/80 text-green-400 px-3 py-2 rounded text-xs z-50"
                            style={{ fontFamily: 'monospace' }}
                        >
                            {debugInfo} | Pos: ({currentPosition.gridX.toFixed(1)}, {currentPosition.gridY.toFixed(1)})
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            <Modal location={modalLocation} onClose={() => setModalLocation(null)} />
        </div>
    )
}

// ============ CONFIG FROM REGIONS DATA ============
// Converted from journeyData.ts regions with svgCoordinates
// Base image: 1510x849, coordinates converted to grid percentages (0-100)

// Convert regions to WorldMap locations
const regionsToLocations = (): Location[] => {
    return regions.map((region) => {
        const { x, y, width, height } = region.svgCoordinates
        // Convert pixel coords to grid percentages (center of the region)
        const gridX = ((x + width / 2) / 1510) * 100
        const gridY = ((y + height / 2) / 849) * 100
        const hitboxWidth = (width / 1510) * 100
        const hitboxHeight = (height / 849) * 100

        return {
            id: region.id,
            name: region.name,
            description: region.description,
            position: { gridX, gridY },
            hitbox: { width: hitboxWidth, height: hitboxHeight },
        }
    })
}

// Create paths connecting regions in order (1 -> 2 -> 3 -> 4 -> 5)
const regionsToPaths = (): Path[] => {
    const paths: Path[] = []
    for (let i = 0; i < regions.length - 1; i++) {
        paths.push({
            from: regions[i].id,
            to: regions[i + 1].id,
        })
    }
    return paths
}

const journeyConfig: WorldMapConfig = {
    background:
        'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/pasted_image_2025_12_09_T21_28_20_572_Z_5ba1b4134c.png',
    baseWidth: 1510,
    baseHeight: 849,
    startLocation: regions[0]?.id || 'product-market-fit',
    character: {
        size: 4,
    },
    locations: regionsToLocations(),
    paths: regionsToPaths(),
}

// ============ PAGE EXPORT ============

export default function WorldMap2Page(): JSX.Element {
    const { selectRegion } = useJourneyStore()

    const handleLocationVisit = (location: Location) => {
        selectRegion(location.id)
    }

    return (
        <div className="flex flex-col items-center justify-center py-5">
            <div className="w-full max-w-5xl">
                <WorldMap config={journeyConfig} showDebug={true} onLocationVisit={handleLocationVisit} />
            </div>
        </div>
    )
}
