import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { createPeelRenderer, getPeelProgress, localPeelPoint, PEEL_CANVAS_SCALE, PEEL_RADIUS } from './peelRenderer'
import { Sticker, StickerArtwork } from './stickers'

type PeelLayer = { sticker: Sticker; x: number; y: number; size: number; rotation: number }

type Props = {
    layers?: PeelLayer[]
    sticker: Sticker
    width: number
    attached?: boolean
    rotation?: number
    onComplete: (keyboard: boolean) => void
}

const diagonalPull = 2 - (Math.PI * PEEL_RADIUS) / Math.SQRT2

export default function PeelSticker({ sticker, layers, width, attached = false, rotation = 0, onComplete }: Props) {
    const artworkLayers = useMemo(
        () => layers || [{ sticker, x: 0.5, y: 0.5, size: 1, rotation: 0 }],
        [layers, sticker]
    )
    const artwork = (finish: boolean) =>
        artworkLayers.map((layer, index) => (
            <span
                key={index}
                data-peel-layer
                className="absolute aspect-square"
                style={{
                    left: `${layer.x * 100}%`,
                    top: `${layer.y * 100}%`,
                    width: `${layer.size * 100}%`,
                    transform: `translate(-50%, -50%) rotate(${layer.rotation}deg)`,
                }}
            >
                <StickerArtwork sticker={layer.sticker} className="w-full h-full" finish={finish} />
            </span>
        ))
    const progress = useMotionValue(0)
    const fallbackOpacity = useTransform(progress, [0, 1], [1, 0])
    const [percent, setPercent] = useState(0)
    const [rendered, setRendered] = useState(false)
    const button = useRef<HTMLButtonElement>(null)
    const source = useRef<HTMLSpanElement>(null)
    const floating = useRef<HTMLDivElement>(null)
    const canvas = useRef<HTMLCanvasElement>(null)
    const grab = useRef<[number, number]>([0.5, 0.5])
    const pull = useRef<[number, number]>([-diagonalPull, -diagonalPull])
    const fallbackX = useMotionValue(0)
    const fallbackY = useMotionValue(0)
    const draw = useRef<() => void>(() => undefined)
    const gesture = useRef<{ x: number; y: number; width: number; pointerId: number } | null>(null)
    const rewind = useRef<{ stop: () => void } | null>(null)
    const reducedMotion = useReducedMotion()
    const completed = useRef(false)

    const complete = (keyboard: boolean) => {
        if (completed.current) return
        completed.current = true
        onComplete(keyboard)
    }

    useEffect(() => progress.on('change', (value) => setPercent(Math.round(value * 100))), [progress])
    useEffect(() => {
        const frame = window.requestAnimationFrame(() => button.current?.focus({ preventScroll: true }))
        return () => {
            window.cancelAnimationFrame(frame)
            rewind.current?.stop()
        }
    }, [])

    useEffect(() => {
        setRendered(false)
        const sources = source.current?.querySelectorAll('[data-peel-layer]')
        const urls: string[] = []
        let disposed = false
        let renderer: ReturnType<typeof createPeelRenderer> = null
        draw.current = () => {
            if (!source.current || !floating.current) return
            const bounds = source.current.getBoundingClientRect()
            const size = source.current.offsetWidth
            floating.current.style.left = `${bounds.left + bounds.width / 2}px`
            floating.current.style.top = `${bounds.top + bounds.height / 2}px`
            floating.current.style.width = `${size}px`
            floating.current.style.visibility = 'visible'
            const delta: [number, number] = [pull.current[0] * progress.get(), pull.current[1] * progress.get()]
            fallbackX.set(delta[0] * size)
            fallbackY.set(-delta[1] * size)
            renderer?.draw(grab.current, delta, size)
        }
        const unsubscribe = progress.on('change', () => draw.current())
        window.addEventListener('resize', draw.current)
        window.addEventListener('scroll', draw.current, true)
        draw.current()
        if (!reducedMotion && sources) {
            const images = Array.from(
                sources,
                (element) =>
                    new Promise<HTMLImageElement>((resolve, reject) => {
                        const svg = element.querySelector('svg')
                        const uploaded = element.querySelector('img')
                        const image = new Image()
                        image.crossOrigin = 'anonymous'
                        image.onload = () => resolve(image)
                        image.onerror = reject
                        if (svg) {
                            const clone = svg.cloneNode(true) as SVGSVGElement
                            clone.setAttribute('width', '512')
                            clone.setAttribute('height', '512')
                            clone.style.color = window.getComputedStyle(svg).color
                            const url = URL.createObjectURL(
                                new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml' })
                            )
                            urls.push(url)
                            image.src = url
                        } else if (uploaded) image.src = uploaded.src
                        else reject(new Error('Missing sticker artwork'))
                    })
            )
            void Promise.all(images)
                .then((loaded) => {
                    if (disposed || !canvas.current) return
                    const resolution = layers ? 1024 : 512
                    const texture = document.createElement('canvas')
                    const foil = document.createElement('canvas')
                    texture.width = texture.height = foil.width = foil.height = resolution
                    const context = texture.getContext('2d')
                    const mask = foil.getContext('2d')
                    if (!context || !mask) return
                    loaded.forEach((image, index) => {
                        const layer = artworkLayers[index]
                        const size = layer.size * resolution
                        const scale = size / Math.max(image.naturalWidth, image.naturalHeight)
                        const w = image.naturalWidth * scale
                        const h = image.naturalHeight * scale
                        const silhouette = document.createElement('canvas')
                        silhouette.width = silhouette.height = Math.ceil(size)
                        const ink = silhouette.getContext('2d')
                        if (!ink) throw new Error('Canvas is unavailable')
                        ink.drawImage(image, (size - w) / 2, (size - h) / 2, w, h)
                        ink.globalCompositeOperation = 'source-in'
                        ink.fillStyle = layer.sticker.holographic ? '#fff' : '#000'
                        ink.fillRect(0, 0, size, size)
                        for (const target of [context, mask]) {
                            target.save()
                            target.translate(layer.x * resolution, layer.y * resolution)
                            target.rotate((layer.rotation * Math.PI) / 180)
                            if (target === context) target.drawImage(image, -w / 2, -h / 2, w, h)
                            else target.drawImage(silhouette, -size / 2, -size / 2, size, size)
                            target.restore()
                        }
                    })
                    renderer = createPeelRenderer(canvas.current, texture, false, foil)
                    if (!renderer) return
                    draw.current()
                    setRendered(true)
                })
                .catch(() => {
                    if (!disposed) setRendered(false)
                })
        }
        const lost = (event: Event) => {
            event.preventDefault()
            setRendered(false)
        }
        const element = canvas.current
        element?.addEventListener('webglcontextlost', lost)
        return () => {
            disposed = true
            urls.forEach((url) => URL.revokeObjectURL(url))
            unsubscribe()
            window.removeEventListener('resize', draw.current)
            window.removeEventListener('scroll', draw.current, true)
            renderer?.dispose()
            element?.removeEventListener('webglcontextlost', lost)
        }
    }, [artworkLayers, layers, progress, reducedMotion])

    useEffect(() => draw.current(), [width, rotation])

    const release = () => {
        gesture.current = null
        if (progress.get() < 1)
            rewind.current = animate(progress, 0, {
                duration: reducedMotion ? 0 : 0.3,
                ease: 'easeOut',
                onComplete: () => {
                    grab.current = [0.5, 0.5]
                    pull.current = [-diagonalPull, -diagonalPull]
                },
            })
    }

    useEffect(() => {
        window.addEventListener('blur', release)
        return () => window.removeEventListener('blur', release)
    }, [progress, reducedMotion])

    return (
        <div className={attached ? 'absolute inset-0' : 'relative'} data-peel-mode={attached ? 'removal' : 'library'}>
            <button
                ref={button}
                type="button"
                aria-label={`Peel ${
                    artworkLayers.length > 1
                        ? `${artworkLayers.length} overlapping stickers`
                        : `${sticker.name.toLowerCase()} sticker`
                }${attached ? ' off the laptop' : ''}`}
                aria-describedby={attached ? 'laptop-sticker-help' : undefined}
                className={`touch-none select-none cursor-grab active:cursor-grabbing focus-visible:outline-orange ${
                    attached
                        ? 'block w-full h-full p-0 border-0 bg-transparent'
                        : 'w-full flex flex-col items-center border-0 p-0 bg-transparent'
                }`}
                onClick={(event) => {
                    event.stopPropagation()
                    if (event.detail === 0 && !completed.current) {
                        rewind.current?.stop()
                        rewind.current = animate(progress, 1, {
                            duration: reducedMotion ? 0 : 0.5,
                            ease: 'easeInOut',
                            onComplete: () => complete(true),
                        })
                    }
                }}
                onPointerDown={(event) => {
                    const element = source.current
                    if (event.button !== 0 || !event.isPrimary || completed.current || !element?.offsetWidth) return
                    const bounds = element.getBoundingClientRect()
                    const sourceWidth = element.offsetWidth
                    const point = localPeelPoint(
                        event.clientX - (bounds.left + bounds.width / 2),
                        event.clientY - (bounds.top + bounds.height / 2),
                        sourceWidth,
                        rotation
                    )
                    if (point.some((coordinate) => Math.abs(coordinate) > 0.5)) return
                    event.stopPropagation()
                    rewind.current?.stop()
                    event.currentTarget.setPointerCapture(event.pointerId)
                    grab.current = point
                    progress.set(0)
                    draw.current()
                    gesture.current = {
                        x: event.clientX,
                        y: event.clientY,
                        width: sourceWidth,
                        pointerId: event.pointerId,
                    }
                }}
                onPointerMove={(event) => {
                    if (!gesture.current || gesture.current.pointerId !== event.pointerId) return
                    const dx = event.clientX - gesture.current.x
                    const dy = event.clientY - gesture.current.y
                    const delta = localPeelPoint(dx, dy, gesture.current.width, rotation)
                    const value = getPeelProgress(grab.current, delta)
                    pull.current = value ? [delta[0] / value, delta[1] / value] : [0, 0]
                    const previous = progress.get()
                    progress.set(value)
                    if (value === previous) draw.current()
                    if (value === 1) {
                        gesture.current = null
                        complete(false)
                    }
                }}
                onPointerUp={release}
                onPointerCancel={release}
                onLostPointerCapture={release}
                onKeyDown={(event) => {
                    if (completed.current) return
                    if (!['ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp'].includes(event.key)) return
                    event.preventDefault()
                    event.stopPropagation()
                    rewind.current?.stop()
                    const sign = ['ArrowLeft', 'ArrowDown'].includes(event.key) ? -1 : 1
                    const value = Math.max(0, Math.min(1, progress.get() + sign * (event.shiftKey ? 0.25 : 0.1)))
                    progress.set(value)
                    if (value === 1) complete(true)
                }}
            >
                <span
                    ref={source}
                    className="relative block aspect-square max-w-full pointer-events-none"
                    style={{ width, filter: 'brightness(0)', opacity: attached ? 0 : 0.12 }}
                >
                    {artwork(false)}
                </span>
            </button>
            {typeof document !== 'undefined' &&
                createPortal(
                    <div
                        ref={floating}
                        aria-hidden="true"
                        className="fixed aspect-square pointer-events-none"
                        style={{
                            visibility: 'hidden',
                            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                            zIndex: 2147483647,
                        }}
                    >
                        {!rendered && (
                            <motion.div
                                className="absolute inset-0"
                                style={{ x: fallbackX, y: fallbackY, opacity: fallbackOpacity }}
                            >
                                {artwork(true)}
                            </motion.div>
                        )}
                        <canvas
                            ref={canvas}
                            width={512}
                            height={512}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                            style={{
                                width: `${PEEL_CANVAS_SCALE * 100}%`,
                                height: `${PEEL_CANVAS_SCALE * 100}%`,
                                opacity: rendered ? 1 : 0,
                                filter: 'drop-shadow(0px 3px 2px rgba(0,0,0,0.14))',
                            }}
                        />
                    </div>,
                    document.body
                )}
            <div
                role="progressbar"
                aria-label="Peeling progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
                className="absolute inset-x-2 bottom-0 h-1 rounded bg-accent overflow-hidden pointer-events-none"
            >
                <motion.div className="h-full bg-orange origin-left" style={{ scaleX: progress }} />
            </div>
        </div>
    )
}
