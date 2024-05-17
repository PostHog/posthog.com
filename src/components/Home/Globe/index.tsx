/* eslint-disable react/no-unknown-property */

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Canvas, extend, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import ThreeGlobe from 'three-globe'
import {
    BufferGeometry,
    CanvasTexture,
    CatmullRomCurve3,
    Color,
    CubicBezierCurve3,
    Curve,
    DataTexture,
    EllipseCurve,
    Euler,
    Line,
    LineBasicMaterial,
    MeshToonMaterial,
    RedFormat,
    Scene,
    Sprite,
    SpriteMaterial,
    TextureLoader,
    Vector2,
    Vector3,
} from 'three'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { geoDistance, geoInterpolate } from 'd3-geo'

import countries from './globe-data.json'
import { loadStarsPreset } from 'tsparticles-preset-stars'
import Particles from 'react-tsparticles'
import { heading } from '../classes'
import { generateUUID } from 'three/src/math/MathUtils'
import KeyboardShortcut from 'components/KeyboardShortcut'

extend({ OutlinePass })

function getDOY(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0)
    const diff = date.valueOf() - start.valueOf() + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000
    const oneDay = 1000 * 60 * 60 * 24
    const day = Math.floor(diff / oneDay)

    return day
}

function calculateAxialTiltDegrees(date: Date): number {
    const dayOfYear = getDOY(date)
    const tiltAtSolstice = 23.44
    const daysInYear = 365

    // Calculate the current tilt based on a sine wave that peaks at the solstices and is zero at the equinoxes
    const currentTilt = Math.sin((dayOfYear / daysInYear) * 2 * Math.PI) * tiltAtSolstice

    return currentTilt
}

function useJSONEventSource<T extends Record<string, any>>(
    url: string,
    callback: (data: T[]) => void,
    intervalMs: number
) {
    const timeoutRef = useRef<number>()
    const eventSourceRef = useRef<EventSource>()
    const bufferRef = useRef<T[]>([])

    const [isPageVisible, setPageVisible] = useState(document.visibilityState === 'visible')
    useEffect(() => {
        const handleVisibilityChange = () => {
            setPageVisible(document.visibilityState === 'visible')
        }
        document.addEventListener('visibilitychange', handleVisibilityChange)
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [])

    useEffect(() => {
        if (isPageVisible) {
            if (window.EventSource) {
                eventSourceRef.current = new EventSource(url)
                eventSourceRef.current.onmessage = function (event) {
                    const message = JSON.parse(event.data)
                    bufferRef.current.push(message)
                }
            } else {
                console.error("Your browser doesn't support SSE")
            }

            return () => {
                eventSourceRef.current?.close()
            }
        }
    }, [isPageVisible, url])

    const clearBatch = useCallback(() => {
        callback(bufferRef.current)
        bufferRef.current = []
        timeoutRef.current = setTimeout(clearBatch, intervalMs)
    }, [callback])

    useEffect(() => {
        if (isPageVisible) {
            timeoutRef.current = setTimeout(clearBatch, intervalMs)
            return () => {
                timeoutRef.current && clearInterval(timeoutRef.current)
            }
        } else {
            clearInterval(timeoutRef.current)
        }
    }, [isPageVisible, clearBatch])
}

/** Taken from https://gist.github.com/atyachin/a011edf76df66c5aa1eac0cdca412ea9. */
const US_EAST_1_LAT_LNG = [38.9940541, -77.4524237] as const
const EU_CENTRAL_1_LAT_LNG = [50.0992094, 8.6303932] as const

function polar2Cartesian(globeRadius: number, lat: number, lng: number, relAltitude = 0) {
    const phi = ((90 - lat) * Math.PI) / 180
    const theta = ((90 - lng) * Math.PI) / 180
    const r = globeRadius * (1 + relAltitude)
    return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.cos(phi),
        z: r * Math.sin(phi) * Math.sin(theta),
    }
}

function calcCurve(
    globeRadius: number,
    {
        startLat,
        startLng,
        endLat,
        endLng,
    }: {
        startLat: number
        startLng: number
        endLat: number
        endLng: number
    }
) {
    const getVec = ([lng, lat, alt]: readonly [lng: number, lat: number, alt?: number]) => {
        const { x, y, z } = polar2Cartesian(globeRadius, lat, lng, alt)
        return new Vector3(x, y, z)
    }

    //calculate curve
    const startPnt = [startLng, startLat] as const
    const endPnt = [endLng, endLat] as const

    const altitude = geoDistance(startPnt, endPnt) / 3

    const interpolate = geoInterpolate(startPnt, endPnt)
    const [m1Pnt, m2Pnt] = [0.25, 0.75].map((t) => [...interpolate(t), altitude] as [number, number, number])
    const curve = new CubicBezierCurve3(...([startPnt, m1Pnt, m2Pnt, endPnt] as const).map(getVec))
    return curve
}

function processEvents(
    scene: Scene,
    globe: ThreeGlobe,
    region: 'US' | 'EU',
    events: { lat: number; lng: number; count: number }[]
) {
    const arcs = events.map((d) => ({
        id: generateUUID(),
        startLat: d.lat,
        startLng: d.lng,
        endLat: region === 'US' ? US_EAST_1_LAT_LNG[0] : EU_CENTRAL_1_LAT_LNG[0],
        endLng: region === 'US' ? US_EAST_1_LAT_LNG[1] : EU_CENTRAL_1_LAT_LNG[1],
        count: d.count,
    }))
    const globeRadius = globe.getGlobeRadius()
    // Create custom animated arcs
    arcs.forEach((arc) => {
        setTimeout(() => {
            const curve = calcCurve(globeRadius, arc)
            const points = curve.getPoints(50)

            const geometry = new BufferGeometry().setFromPoints(points)
            const material = new LineBasicMaterial({ color: region === 'US' ? '#f54e00' : '#1371ff' })
            const curveObject = new Line(geometry, material)

            scene.add(curveObject)
            setTimeout(() => {
                scene.remove(curveObject)
            }, 250)
        }, Math.random() * 1500)
    })
}

function createTextSprite(text: string): Sprite {
    // Create a canvas and get its 2D context
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')!

    // Set the text styles
    context.font = '24px MatterVF 500'
    context.fillStyle = 'white'
    context.textBaseline = 'top'

    // Draw the text onto the canvas
    context.fillText(text, 0, 0)

    // Create a texture from the canvas
    const texture = new CanvasTexture(canvas)

    // Create a sprite material with the canvas texture
    const material = new SpriteMaterial({ map: texture })

    // Create a sprite with the material
    const sprite = new Sprite(material)

    return sprite
}
function Globe({
    updateEventCountPerSec,
}: {
    updateEventCountPerSec: (region: 'US' | 'EU', count: number) => void
}): null {
    const globeRef = useRef<ThreeGlobe>()
    const { scene } = useThree()

    useJSONEventSource<{ lat: number; lng: number; count: number }>(
        'https://live.us.posthog.com/events?geo=true',
        (data) => {
            processEvents(scene, globeRef.current!, 'US', data)
            updateEventCountPerSec('US', data.length)
        },
        1000
    )
    useJSONEventSource<{ lat: number; lng: number; count: number }>(
        'https://live.eu.posthog.com/events?geo=true',
        (data) => {
            processEvents(scene, globeRef.current!, 'EU', data)
            updateEventCountPerSec('EU', data.length)
        },
        1000
    )

    useLayoutEffect(() => {
        // Initialize the Globe
        const globe = new ThreeGlobe({
            waitForGlobeReady: true,
            animateIn: true,
        })
            .hexPolygonsData(countries.features)
            .hexPolygonResolution(3)
            .hexPolygonMargin(0.6)
            .showAtmosphere(false)
            .hexPolygonColor('#000')

        globe
            .labelsData([
                {
                    lat: US_EAST_1_LAT_LNG[0],
                    lng: US_EAST_1_LAT_LNG[1],
                    text: 'PostHog Cloud US',
                    color: '#f54e00',
                },
                {
                    lat: EU_CENTRAL_1_LAT_LNG[0],
                    lng: EU_CENTRAL_1_LAT_LNG[1],
                    text: 'PostHog Cloud EU',
                    color: '#063199',
                },
            ])
            .labelAltitude(0.25)
            .labelSize(3)
            .labelDotRadius(1)
            .labelColor((l) => l.color)
            .labelResolution(3)

        const colors = new Uint8Array(16)
        for (let c = 0; c <= colors.length; c++) {
            if (c < colors.length / 4) {
                colors[c] = 0
            } else if (c < colors.length / 2) {
                colors[c] = ((c - colors.length / 4) / colors.length) * 2 * 255
            } else {
                colors[c] = 255
            }
        }

        const gradientMap = new DataTexture(colors, colors.length, 1, RedFormat)
        gradientMap.needsUpdate = true
        const diffuseColor = new Color().setHSL(0, 0, 1)

        const globeMaterial = new MeshToonMaterial({
            color: diffuseColor,
            gradientMap: gradientMap,
        })

        globe.globeMaterial(globeMaterial)

        scene.add(globe)
        console.log('globe', globe.objectFacesSurface)
        globeRef.current = globe
        return () => {
            scene.remove(globe)
            globeRef.current = undefined
        }
    }, [])

    return null
}

export function GlobeScene(): JSX.Element {
    const particlesInit = useCallback(async (engine) => {
        await loadStarsPreset(engine, true)
    }, [])

    const [usEventsPerSec, setUsEventsPerSec] = useState<number | null>(null)
    const [euEventsPerSec, setEuEventsPerSec] = useState<number | null>(null)
    const [currentSunPosition, setCurrentSunPosition] = useState(new Vector3())
    const updateSunPosition = () => {
        const date = new Date()
        const angleFromPrimeMeridianRadians = (date.getUTCHours() + date.getUTCMinutes() / 60) * 15 * (Math.PI / 180)
        const sunPosition = new Vector3(
            Math.sin(angleFromPrimeMeridianRadians),
            0,
            Math.cos(angleFromPrimeMeridianRadians - Math.PI)
        )
        const axialTiltDegrees = calculateAxialTiltDegrees(date)
        sunPosition.applyEuler(new Euler(axialTiltDegrees * (-Math.PI / 180), 0, 0))
        console.log(axialTiltDegrees, sunPosition)
        setCurrentSunPosition(sunPosition)
    }
    useEffect(() => {
        updateSunPosition()
        const interval = setInterval(updateSunPosition, 600_000)
        return () => clearInterval(interval)
    }, [])

    const jitterRatio = Math.random() * 0.1 + 0.95

    return (
        <div className="h-[50rem] mb-16 mt-12 pt-20 pb-16 relative">
            <Particles
                init={particlesInit}
                className="absolute inset-0 hidden dark:block"
                options={{
                    preset: 'stars',
                    fullScreen: false,
                    background: {
                        color: 'transparent',
                    },
                    particles: {
                        number: {
                            value: 100,
                        },
                    },
                }}
            />
            <h2 className={heading(undefined, undefined, 'mb-2')}>
                Planet-<span className="text-red">scale</span>
            </h2>
            <h3 className={heading('sm')}>
                <KeyboardShortcut
                    className="!text-inherit"
                    size="lg"
                    text={
                        usEventsPerSec != null && euEventsPerSec != null
                            ? ((usEventsPerSec + euEventsPerSec) * 60 * jitterRatio).toLocaleString('fr', {
                                  maximumFractionDigits: 0,
                              })
                            : '⋯'
                    }
                    live
                />{' '}
                analytics events processed globally in the last minute
            </h3>
            <Canvas
                style={{
                    cursor: 'move',
                }}
                camera={{
                    type: 'OrthographicCamera',
                }}
                dpr={[1, 2]}
            >
                <OrbitControls
                    enableRotate
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={-0.25}
                    rotateSpeed={0.25}
                    minDistance={225}
                    maxDistance={225}
                />
                <ambientLight intensity={0.2} />
                <pointLight position={currentSunPosition.multiplyScalar(500)} intensity={1} />
                <Globe
                    updateEventCountPerSec={(region, count) =>
                        region === 'US' ? setUsEventsPerSec(count) : setEuEventsPerSec(count)
                    }
                />
            </Canvas>
        </div>
    )
}
