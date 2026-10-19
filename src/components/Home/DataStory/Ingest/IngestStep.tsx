import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { cn } from '../../../../utils'
import { EXTERNAL_SOURCES } from './session'
import { useToolsProducts } from '../../ToolsTicker'
import useSourcePlatforms from 'hooks/useSourcePlatforms'
import Link from 'components/Link'
import { useLayoutMode, useStepLayout } from '../layoutMode'

const TILT_DEG = 56
const INNER_RADIUS_PERCENT = 24
const OUTER_RADIUS_PERCENT = 45
const MAGNET_RADIUS_PX = 110
const MAGNET_PULL = 0.16
const MAGNET_MAX_PX = 9
const MAGNET_MAX_DOWN_PX = 2
const MAGNET_EASE = 0.06
const MAGNET_SETTLED_PX = 0.1

const PRODUCT_HANDLES = [
    'product_analytics',
    'web_analytics',
    'session_replay',
    'heatmaps',
    'error_tracking',
    'surveys',
    'logs',
    'ai_observability',
]
const WAREHOUSE_SOURCES = ['stripe', 'hubspot', 'zendesk', 'postgres', 'salesforce', 'snowflake', 'bigquery', 'shopify']

interface OrbitNode {
    key: string
    label: string
    tone?: string
    Icon?: React.ComponentType<{ className?: string }>
    image?: string
    url: string
}

type RegisterMagnet = (element: HTMLElement | null) => void

const clampPull = (value: number): number => Math.max(-MAGNET_MAX_PX, Math.min(MAGNET_MAX_PX, value))

const useMagnets = (enabled: boolean) => {
    const offsets = useRef(new Map<HTMLElement, { x: number; y: number }>())
    const pointer = useRef<{ x: number; y: number } | null>(null)
    const frame = useRef<number>()

    const tick = useCallback(() => {
        let moving = false
        offsets.current.forEach((offset, element) => {
            const rect = element.getBoundingClientRect()
            const restX = rect.left + rect.width / 2 - offset.x
            const restY = rect.top + rect.height / 2 - offset.y
            let targetX = 0
            let targetY = 0
            if (pointer.current) {
                const dx = pointer.current.x - restX
                const dy = pointer.current.y - restY
                const distance = Math.hypot(dx, dy)
                if (distance < MAGNET_RADIUS_PX) {
                    const strength = (1 - distance / MAGNET_RADIUS_PX) * MAGNET_PULL
                    targetX = clampPull(dx * strength)
                    targetY = Math.min(clampPull(dy * strength), MAGNET_MAX_DOWN_PX)
                }
            }
            offset.x += (targetX - offset.x) * MAGNET_EASE
            offset.y += (targetY - offset.y) * MAGNET_EASE
            if (Math.abs(targetX - offset.x) > MAGNET_SETTLED_PX || Math.abs(targetY - offset.y) > MAGNET_SETTLED_PX) {
                moving = true
            }
            element.style.transform = `translate3d(${offset.x}px, ${offset.y}px, 0)`
        })
        frame.current = moving ? requestAnimationFrame(tick) : undefined
    }, [])

    const start = useCallback(() => {
        if (frame.current === undefined) frame.current = requestAnimationFrame(tick)
    }, [tick])

    useEffect(
        () => () => {
            if (frame.current !== undefined) cancelAnimationFrame(frame.current)
        },
        []
    )

    const register: RegisterMagnet = useCallback((element) => {
        if (element && !offsets.current.has(element)) offsets.current.set(element, { x: 0, y: 0 })
    }, [])

    return {
        register,
        onPointerMove: (event: React.PointerEvent) => {
            if (!enabled || event.pointerType !== 'mouse') return
            pointer.current = { x: event.clientX, y: event.clientY }
            start()
        },
        onPointerLeave: () => {
            pointer.current = null
            start()
        },
    }
}

const SPIN_PERIOD_MS = 120000
const INNER_LAYER_PERIOD_MS = 60000
const PERSPECTIVE_PX = 1300
const TILT_LIFT = 0.06
const EMIT_INTERVAL_S = 5.2
const HUB_GRAVITY = 0.024
const HUB_SOFTENING = 0.03
const CURSOR_GRAVITY = 0.0075
const CURSOR_SOFTENING = 0.06
const TANGENTIAL_FACTOR = 0.45
const DAMPING_PER_SECOND = 0.7
const MAX_SPEED = 1.1
const ABSORB_RADIUS = 0.05
const ESCAPE_RADIUS = 0.7
const MAX_LIFETIME_S = 8
const FADE_IN_S = 0.3
const MAX_STEP_S = 1 / 30
const DOT_POOL = 48

interface Emitter {
    angle: number
    radius: number
    tone: string
    phase: number
    layer: 'outer' | 'inner'
}

interface Dot {
    x: number
    y: number
    vx: number
    vy: number
    age: number
    element: HTMLSpanElement
}

const animationAngle = (element: HTMLElement | null, periodMs: number, direction: number): number => {
    const time = Number(element?.getAnimations()[0]?.currentTime ?? 0)
    return direction * 360 * ((time % periodMs) / periodMs)
}

const accelerationToward = (dx: number, dy: number, gravity: number, softening: number): [number, number] => {
    const distanceSquared = dx * dx + dy * dy + softening * softening
    const scale = gravity / (distanceSquared * Math.sqrt(distanceSquared))
    return [dx * scale, dy * scale]
}

const pointerToPlane = (event: PointerEvent, plane: HTMLElement): { x: number; y: number } | null => {
    const rect = plane.getBoundingClientRect()
    const size = plane.offsetWidth
    if (!size) return null
    const tilt = (TILT_DEG * Math.PI) / 180
    const a = event.clientX - (rect.left + rect.width / 2)
    const b = event.clientY - (rect.top + rect.height / 2)
    const lift = TILT_LIFT * size
    const denominator = PERSPECTIVE_PX * Math.cos(tilt) + b * Math.sin(tilt)
    if (denominator <= 0) return null
    const v = (PERSPECTIVE_PX * (b - lift)) / denominator
    const u = (a * (PERSPECTIVE_PX - v * Math.sin(tilt))) / PERSPECTIVE_PX
    return { x: u / size, y: v / size }
}

interface Well {
    x: number
    y: number
    strength: number
    radius: number
    lights?: boolean
}

const FLOOR_EXTEND_X = 0.45
const FLOOR_EXTEND_Y = 0.14
const GRID_SPACING_PX = 24
const GRID_DOT_RADIUS_PX = 1.15
const GRID_PEAK_ALPHA = 0.55
const WELL_PULL = 0.13
const WELL_SHRINK = 0.3
const GLOW_GROW = 0.55
const GLOW_BLUR_PX = 4
const GLOW_VISIBLE = 0.04
const WELL_EASE = 0.035
const WELL_FOLLOW = 0.07
const WELL_SETTLED = 0.001
const CURSOR_WELL_RADIUS = 0.11
const HUB_WELL: Well = { x: 0, y: 0, strength: 0.35, radius: 0.1 }

const parseColor = (color: string): [number, number, number, number] => {
    const parts = (color.match(/rgba?\(([^)]+)\)/)?.[1] ?? '0, 0, 0, 0.2')
        .split(/[\s,/]+/)
        .filter(Boolean)
        .map(Number)
    return [parts[0], parts[1], parts[2], parts[3] ?? 1]
}

const drawGrid = (canvas: HTMLCanvasElement, size: number, wells: Well[]): void => {
    const context = canvas.getContext('2d')
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    if (!context || !width || !height || !size) return
    const ratio = window.devicePixelRatio || 1
    if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
        canvas.width = Math.round(width * ratio)
        canvas.height = Math.round(height * ratio)
    }
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    context.clearRect(0, 0, width, height)
    const [red, green, blue, baseAlpha] = parseColor(getComputedStyle(canvas).color)
    const originX = (0.5 + FLOOR_EXTEND_X) * size
    const originY = (0.5 + FLOOR_EXTEND_Y) * size
    const placed = wells
        .filter((well) => well.strength > WELL_SETTLED)
        .map((well) => ({
            x: originX + well.x * size,
            y: originY + well.y * size,
            strength: well.strength,
            radiusSquared: (well.radius * size) ** 2,
            lights: Boolean(well.lights),
        }))
    for (let y = GRID_SPACING_PX / 2; y < height; y += GRID_SPACING_PX) {
        for (let x = GRID_SPACING_PX / 2; x < width; x += GRID_SPACING_PX) {
            let drawX = x
            let drawY = y
            let depth = 0
            let glow = 0
            for (const well of placed) {
                const dx = well.x - x
                const dy = well.y - y
                const influence = well.strength * Math.exp(-(dx * dx + dy * dy) / well.radiusSquared)
                drawX += dx * influence * WELL_PULL
                drawY += dy * influence * WELL_PULL
                depth = Math.max(depth, influence)
                if (well.lights) glow = Math.max(glow, influence)
            }
            const alpha = baseAlpha + (GRID_PEAK_ALPHA - baseAlpha) * Math.max(depth, glow)
            const fill = `rgba(${red}, ${green}, ${blue}, ${alpha})`
            const radius = GRID_DOT_RADIUS_PX * (1 - WELL_SHRINK * (depth - glow) + GLOW_GROW * glow)
            context.fillStyle = fill
            if (glow > GLOW_VISIBLE) {
                context.shadowColor = fill
                context.shadowBlur = GLOW_BLUR_PX * glow
            }
            context.beginPath()
            context.arc(drawX, drawY, radius, 0, Math.PI * 2)
            context.fill()
            if (glow > GLOW_VISIBLE) context.shadowBlur = 0
        }
    }
}

const GravityField = ({
    emitters,
    playing,
    stageRef,
    planeRef,
    spinnerRef,
    innerLayerRef,
    gridRef,
}: {
    emitters: Emitter[]
    playing: boolean
    stageRef: React.RefObject<HTMLDivElement>
    planeRef: React.RefObject<HTMLDivElement>
    spinnerRef: React.RefObject<HTMLDivElement>
    innerLayerRef: React.RefObject<HTMLDivElement>
    gridRef: React.RefObject<HTMLCanvasElement>
}) => {
    const poolRef = useRef<(HTMLSpanElement | null)[]>([])
    const cursor = useRef<{ x: number; y: number } | null>(null)
    const cursorWell = useRef<Well>({ x: 0, y: 0, strength: 0, radius: CURSOR_WELL_RADIUS, lights: true })

    useEffect(() => {
        const canvas = gridRef.current
        const plane = planeRef.current
        if (!canvas || !plane) return
        const redraw = () => drawGrid(canvas, plane.offsetWidth, [HUB_WELL, cursorWell.current])
        redraw()
        const resize = new ResizeObserver(redraw)
        resize.observe(canvas)
        const theme = new MutationObserver(redraw)
        theme.observe(document.body, { attributes: true, attributeFilter: ['class'] })
        return () => {
            resize.disconnect()
            theme.disconnect()
        }
    }, [gridRef, planeRef])

    useEffect(() => {
        const stage = stageRef.current
        const plane = planeRef.current
        if (!stage || !plane) return
        const onMove = (event: PointerEvent) => {
            cursor.current = pointerToPlane(event, plane)
        }
        const onLeave = () => {
            cursor.current = null
        }
        stage.addEventListener('pointermove', onMove)
        stage.addEventListener('pointerleave', onLeave)
        return () => {
            stage.removeEventListener('pointermove', onMove)
            stage.removeEventListener('pointerleave', onLeave)
        }
    }, [stageRef, planeRef])

    useEffect(() => {
        const plane = planeRef.current
        if (!playing || !plane || emitters.length === 0) return
        const free = poolRef.current.filter(Boolean) as HTMLSpanElement[]
        const dots: Dot[] = []
        const nextEmit = emitters.map((emitter) => emitter.phase * EMIT_INTERVAL_S)
        let clock = 0
        let last: number | undefined
        let frame = 0

        const release = (dot: Dot) => {
            dot.element.style.opacity = '0'
            free.push(dot.element)
        }

        const emit = (emitter: Emitter) => {
            const element = free.pop()
            if (!element) return
            const spin = animationAngle(spinnerRef.current, SPIN_PERIOD_MS, 1)
            const layer =
                emitter.layer === 'inner' ? animationAngle(innerLayerRef.current, INNER_LAYER_PERIOD_MS, -1) : 0
            const angle = ((emitter.angle + spin + layer) * Math.PI) / 180
            const radius = emitter.radius / 100
            const swirl = emitter.layer === 'inner' ? -1 : 1
            const speed = TANGENTIAL_FACTOR * Math.sqrt(HUB_GRAVITY / radius)
            element.className = cn(DOT_CLASS, emitter.tone)
            dots.push({
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                vx: -Math.sin(angle) * speed * swirl,
                vy: Math.cos(angle) * speed * swirl,
                age: 0,
                element,
            })
        }

        const tick = (now: number) => {
            const step = last === undefined ? 0 : Math.min((now - last) / 1000, MAX_STEP_S)
            last = now
            clock += step
            emitters.forEach((emitter, index) => {
                if (clock >= nextEmit[index]) {
                    nextEmit[index] += EMIT_INTERVAL_S
                    emit(emitter)
                }
            })
            const size = plane.offsetWidth
            const well = cursorWell.current
            const target = cursor.current
            const previous = { x: well.x, y: well.y, strength: well.strength }
            well.strength += ((target ? 1 : 0) - well.strength) * WELL_EASE
            if (target) {
                well.x += (target.x - well.x) * (well.strength < WELL_SETTLED ? 1 : WELL_FOLLOW)
                well.y += (target.y - well.y) * (well.strength < WELL_SETTLED ? 1 : WELL_FOLLOW)
            }
            const wellMoved =
                Math.abs(well.strength - previous.strength) > WELL_SETTLED ||
                (well.strength > WELL_SETTLED &&
                    (Math.abs(well.x - previous.x) > WELL_SETTLED || Math.abs(well.y - previous.y) > WELL_SETTLED))
            if (wellMoved && gridRef.current) drawGrid(gridRef.current, size, [HUB_WELL, well])
            const damping = Math.exp(-DAMPING_PER_SECOND * step)
            for (let index = dots.length - 1; index >= 0; index--) {
                const dot = dots[index]
                let [ax, ay] = accelerationToward(-dot.x, -dot.y, HUB_GRAVITY, HUB_SOFTENING)
                if (cursor.current) {
                    const [cx, cy] = accelerationToward(
                        cursor.current.x - dot.x,
                        cursor.current.y - dot.y,
                        CURSOR_GRAVITY,
                        CURSOR_SOFTENING
                    )
                    ax += cx
                    ay += cy
                }
                dot.vx = (dot.vx + ax * step) * damping
                dot.vy = (dot.vy + ay * step) * damping
                const speed = Math.hypot(dot.vx, dot.vy)
                if (speed > MAX_SPEED) {
                    dot.vx *= MAX_SPEED / speed
                    dot.vy *= MAX_SPEED / speed
                }
                dot.x += dot.vx * step
                dot.y += dot.vy * step
                dot.age += step
                const distance = Math.hypot(dot.x, dot.y)
                if (distance < ABSORB_RADIUS || distance > ESCAPE_RADIUS || dot.age > MAX_LIFETIME_S) {
                    release(dot)
                    dots.splice(index, 1)
                    continue
                }
                const fadeIn = Math.min(1, dot.age / FADE_IN_S)
                const fadeOut = Math.min(1, (distance - ABSORB_RADIUS) / ABSORB_RADIUS)
                dot.element.style.opacity = String(Math.min(fadeIn, fadeOut))
                dot.element.style.transform = `translate3d(${dot.x * size}px, ${dot.y * size}px, 0)`
            }
            frame = requestAnimationFrame(tick)
        }

        frame = requestAnimationFrame(tick)
        return () => {
            cancelAnimationFrame(frame)
            dots.forEach(release)
        }
    }, [playing, emitters, planeRef, spinnerRef, innerLayerRef, gridRef])

    return (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {Array.from({ length: DOT_POOL }, (_, index) => (
                <span
                    key={index}
                    ref={(element) => {
                        poolRef.current[index] = element
                    }}
                    className={DOT_CLASS}
                />
            ))}
        </div>
    )
}

const DOT_CLASS =
    'absolute left-1/2 top-1/2 -ml-[3px] -mt-[3px] block size-[6px] rounded-full bg-current opacity-0 shadow-[0_0_8px_currentColor]'

const angleFor = (index: number, count: number, phase: number): number => (index / count) * 360 + phase

const Tile = ({ node, size, magnet }: { node: OrbitNode; size: 'sm' | 'md'; magnet: RegisterMagnet }) => (
    <Link
        to={node.url}
        state={{ newWindow: true }}
        aria-label={node.label}
        className="group relative flex flex-col items-center"
    >
        <span
            ref={magnet}
            className={cn(
                'flex items-center justify-center rounded-lg border border-primary shadow-lg transition-shadow group-hover:shadow-xl group-focus-visible:ring-2 group-focus-visible:ring-orange',
                node.image ? 'bg-white' : 'bg-primary',
                size === 'md' ? 'size-11 p-2' : 'size-9 p-1.5'
            )}
        >
            {node.image ? (
                <img src={node.image} alt="" className="max-h-full max-w-full object-contain" />
            ) : (
                node.Icon && <node.Icon className={cn('size-full [&_[clip-path]]:![clip-path:none]', node.tone)} />
            )}
        </span>
        <span className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded bg-primary px-1.5 font-code text-[10px] leading-4 text-primary opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            {node.label}
        </span>
    </Link>
)

const SPIN = 'animate-[spin_120s_linear_infinite] motion-reduce:animate-none'
const COUNTER_SPIN = 'animate-[spin_120s_linear_infinite_reverse] motion-reduce:animate-none'
const INNER_LAYER_SPIN = 'animate-[spin_60s_linear_infinite_reverse] motion-reduce:animate-none'

const NodeOnPlane = ({
    node,
    angle,
    radius,
    size,
    paused,
    magnet,
    uprightSpin = COUNTER_SPIN,
}: {
    node: OrbitNode
    angle: number
    radius: number
    size: 'sm' | 'md'
    paused: boolean
    magnet: RegisterMagnet
    uprightSpin?: string
}) => {
    const radians = (angle * Math.PI) / 180
    return (
        <div
            className="absolute size-0 [transform-style:preserve-3d]"
            style={{
                left: `${50 + Math.cos(radians) * radius}%`,
                top: `${50 + Math.sin(radians) * radius}%`,
            }}
        >
            <span className="absolute -left-5 -top-2.5 h-5 w-10 rounded-[50%] bg-black/15 blur-md dark:bg-black/50" />
            <div
                className={cn(
                    uprightSpin,
                    'absolute left-0 top-0 size-0 [transform-origin:0_0] [transform-style:preserve-3d]',
                    paused && '[animation-play-state:paused]'
                )}
            >
                <div
                    className="absolute left-0 top-0 w-max [transform-origin:50%_100%]"
                    style={{
                        transform: `translate(-50%, -100%) rotateX(${-TILT_DEG}deg)`,
                    }}
                >
                    <Tile node={node} size={size} magnet={magnet} />
                </div>
            </div>
        </div>
    )
}

const Hub = () => (
    <div
        className="absolute left-1/2 top-1/2 [transform-origin:50%_100%]"
        style={{ transform: `translate(-50%, -100%) rotateX(${-TILT_DEG}deg)` }}
    >
        <div className="relative flex flex-col items-center gap-2">
            <span className="relative flex size-16 items-center justify-center rounded-2xl border border-primary bg-white shadow-2xl ring-8 ring-orange/10">
                <img src="/brand/posthog-logomark.svg" alt="PostHog" className="w-9" />
            </span>
        </div>
    </div>
)

const useOrbitNodes = (): { inner: OrbitNode[]; outer: OrbitNode[] } => {
    const products = useToolsProducts(PRODUCT_HANDLES)
    const platforms = useSourcePlatforms() as { label: string; image: string; url: string }[]
    return useMemo(() => {
        const inner = products.map((product: any) => ({
            key: product.handle,
            label: product.name,
            Icon: product.Icon,
            tone: `text-${product.color}`,
            url: `/${product.slug}`,
        }))
        const outer = WAREHOUSE_SOURCES.map((key) => {
            const platform = platforms.find(({ label }) => label.toLowerCase().replace(/\s/g, '') === key)
            const fallback = EXTERNAL_SOURCES.find((source) => source.key === key)
            const image = platform?.image ?? fallback?.logo
            return image
                ? {
                      key,
                      label: platform?.label ?? fallback?.label ?? key,
                      image,
                      url: platform?.url ?? `/docs/data-warehouse/sources/${key}`,
                  }
                : null
        }).filter(Boolean) as OrbitNode[]
        return { inner, outer }
    }, [products, platforms])
}

const ORBIT_MASK = {
    '--edge-mask':
        'linear-gradient(to right, transparent, black 9%, black 91%, transparent), linear-gradient(to bottom, transparent, black 8%, black 86%, transparent)',
    '--orbit-mask':
        'radial-gradient(ellipse 50% 74% at 100% 50%, transparent 50%, rgba(0,0,0,0.05) 62%, rgba(0,0,0,0.28) 76%, rgba(0,0,0,0.68) 89%, black 100%)',
} as React.CSSProperties

const OUTER_PARTICLE_TONES = ['text-purple', 'text-orange', 'text-teal', 'text-blue']

const Orbit = () => {
    const stageRef = useRef<HTMLDivElement>(null)
    const inView = useInView(stageRef, { amount: 0.25 })
    const shouldReduceMotion = useReducedMotion()
    const playing = inView && !shouldReduceMotion
    const spinning = playing
    const magnets = useMagnets(!shouldReduceMotion)
    const { inner, outer } = useOrbitNodes()
    const cinematic = useLayoutMode() === 'cinematic'
    const planeRef = useRef<HTMLDivElement>(null)
    const spinnerRef = useRef<HTMLDivElement>(null)
    const innerLayerRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLCanvasElement>(null)
    const emitters = useMemo<Emitter[]>(
        () => [
            ...inner.map((node, index) => ({
                angle: angleFor(index, inner.length, -90),
                radius: INNER_RADIUS_PERCENT,
                tone: node.tone ?? '',
                phase: index / inner.length,
                layer: 'inner' as const,
            })),
            ...outer.map((_, index) => ({
                angle: angleFor(index, outer.length, -90 + 180 / outer.length),
                radius: OUTER_RADIUS_PERCENT,
                tone: OUTER_PARTICLE_TONES[index % OUTER_PARTICLE_TONES.length],
                phase: (index * 0.37) % 1,
                layer: 'outer' as const,
            })),
        ],
        [inner, outer]
    )

    return (
        <div
            ref={stageRef}
            className="relative"
            onPointerMove={magnets.onPointerMove}
            onPointerLeave={magnets.onPointerLeave}
        >
            <div
                className={cn(
                    'relative @3xl:-mx-6 @3xl:-mb-24 @3xl:-mt-6 @3xl:px-6 @3xl:pb-24 @3xl:pt-6 [-webkit-mask-composite:source-in] [mask-composite:intersect] [mask-image:var(--edge-mask)]',
                    !cinematic && '@3xl:[mask-image:var(--orbit-mask),var(--edge-mask)]'
                )}
                style={ORBIT_MASK}
            >
                <div className="relative mx-auto aspect-[16/10] w-full">
                    <div
                        ref={planeRef}
                        className={cn(
                            'absolute top-[42%] aspect-square -translate-y-1/2 [perspective:1300px]',
                            cinematic ? 'inset-x-[6%]' : 'left-[1%] right-[11%]'
                        )}
                    >
                        <div
                            className="absolute inset-0 [transform-style:preserve-3d]"
                            style={{ transform: `translateY(6%) rotateX(${TILT_DEG}deg)` }}
                        >
                            <canvas
                                ref={gridRef}
                                className="absolute -left-[45%] -top-[14%] h-[128%] w-[190%] text-black/20 [mask-image:radial-gradient(ellipse_closest-side,black_35%,transparent)] dark:text-white/20"
                                aria-hidden="true"
                            />
                            <GravityField
                                emitters={emitters}
                                playing={playing}
                                stageRef={stageRef}
                                planeRef={planeRef}
                                spinnerRef={spinnerRef}
                                innerLayerRef={innerLayerRef}
                                gridRef={gridRef}
                            />
                            <div
                                ref={spinnerRef}
                                className={cn(
                                    SPIN,
                                    'absolute inset-0 [transform-style:preserve-3d]',
                                    !spinning && '[animation-play-state:paused]'
                                )}
                            >
                                <div
                                    className="absolute rounded-full border border-black/15 dark:border-white/15"
                                    style={{ inset: `${50 - OUTER_RADIUS_PERCENT}%` }}
                                />
                                <span className="absolute left-1/2 top-1/2 size-[18%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/10" />
                                <div
                                    ref={innerLayerRef}
                                    className={cn(
                                        INNER_LAYER_SPIN,
                                        'absolute inset-0 [transform-style:preserve-3d]',
                                        !spinning && '[animation-play-state:paused]'
                                    )}
                                >
                                    <div
                                        className="absolute rounded-full border border-dashed border-black/20 dark:border-white/20"
                                        style={{ inset: `${50 - INNER_RADIUS_PERCENT}%` }}
                                    />
                                    {inner.map((node, index) => (
                                        <NodeOnPlane
                                            key={node.key}
                                            node={node}
                                            angle={angleFor(index, inner.length, -90)}
                                            radius={INNER_RADIUS_PERCENT}
                                            size="sm"
                                            paused={!spinning}
                                            magnet={magnets.register}
                                            uprightSpin={SPIN}
                                        />
                                    ))}
                                </div>
                                {outer.map((node, index) => (
                                    <NodeOnPlane
                                        key={node.key}
                                        node={node}
                                        angle={angleFor(index, outer.length, -90 + 180 / outer.length)}
                                        radius={OUTER_RADIUS_PERCENT}
                                        size="md"
                                        paused={!spinning}
                                        magnet={magnets.register}
                                    />
                                ))}
                            </div>
                            <Hub />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function IngestStep({
    title,
    description,
}: {
    title: string
    description: React.ReactNode
}): JSX.Element {
    const layout = useStepLayout({
        grid: 'relative mx-auto grid max-w-[58rem] gap-6 @3xl:grid-cols-12 @3xl:items-center @3xl:gap-x-0',
        text: '@3xl:col-start-8 @3xl:col-end-13 @3xl:row-start-1 @3xl:pl-4',
        visual: '@3xl:col-start-1 @3xl:col-end-10 @3xl:row-start-1',
    })
    return (
        <div className="@container mt-10">
            <div className={layout.grid}>
                <div className={cn('relative z-10', layout.text)}>
                    <h3 className="!mt-0">1. {title}</h3>
                    <p>{description}</p>
                </div>
                <div className={cn('not-prose', layout.visual)}>
                    <Orbit />
                </div>
            </div>
        </div>
    )
}
