import React, { useEffect, useRef, useState } from 'react'
import { formatLong, stops } from '../data'
import type { Stop } from '../data'
import { IconChevronLeft, IconChevronRight } from '@posthog/icons'
import { IconButton } from 'components/UI/Button'
import { Slider } from 'components/UI/Slider'
import { useStepper } from './shared'

const GAP = 20
const MIN_SCALE = 0.03
const MAX_SCALE = 8
const WIDE = 768
const TOP_FADE = 'linear-gradient(to bottom, transparent, black 96px)'
const RIGHT_FADE = 72
const MOTION = 'transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none'

const otherFills = [
    { fill: 'bg-blue', ink: 'text-white' },
    { fill: 'bg-teal', ink: 'text-black' },
    { fill: 'bg-purple', ink: 'text-white' },
    { fill: 'bg-green', ink: 'text-black' },
    { fill: 'bg-seagreen', ink: 'text-black' },
]

const looks = (() => {
    let others = 0
    return stops.map((stop) =>
        stop.ours ? { fill: 'bg-orange', ink: 'text-black' } : otherFills[others++ % otherFills.length]
    )
})()

function CardFace({ stop, position }: { stop: Stop; position: number }): JSX.Element {
    const [number, unit] = formatLong(stop.value).split(' ')
    const look = looks[position]
    return (
        <div className="flex size-full flex-col">
            <div className={`flex min-h-0 flex-1 flex-col justify-end px-[6%] pb-[5%] ${look.fill} ${look.ink}`}>
                <div className="text-[length:21cqw] font-bold leading-[0.85] tracking-tight tabular-nums">{number}</div>
                {unit && <div className="text-[length:9cqw] font-bold leading-none">{unit}</div>}
            </div>
            <div className="flex h-[36%] flex-col border-t-2 border-black px-[6%] py-[4%]">
                <div className="text-[length:5.4cqw] font-bold leading-tight">{stop.label}</div>
                <div className="mt-[1.5%] text-[length:4cqw] leading-snug opacity-70">{stop.note}</div>
                <div className="mt-auto flex justify-between font-code text-[length:3.2cqw] uppercase tracking-wider opacity-70">
                    <span>{stop.ours ? 'PostHog' : 'For scale'}</span>
                    <span>
                        {String(position + 1).padStart(2, '0')}/{stops.length}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default function Conveyor({ inset = 0 }: { inset?: number }): JSX.Element {
    const stepper = useStepper()
    const { index, go } = stepper
    const root = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(0)
    const [bleed, setBleed] = useState({ left: 0, right: 0 })

    useEffect(() => {
        const element = root.current
        if (!element) {
            return
        }
        const frame = element.closest('.overflow-x-hidden')
        const measure = () => {
            const own = element.getBoundingClientRect()
            setWidth(own.width)
            if (frame) {
                const outer = frame.getBoundingClientRect()
                setBleed({ left: Math.max(0, own.left - outer.left), right: Math.max(0, outer.right - own.right) })
            }
        }
        const observer = new ResizeObserver(measure)
        observer.observe(element)
        if (frame) {
            observer.observe(frame)
        }
        window.addEventListener('resize', measure)
        const timers = [100, 600, 1500].map((delay) => window.setTimeout(measure, delay))
        return () => {
            observer.disconnect()
            window.removeEventListener('resize', measure)
            timers.forEach((timer) => window.clearTimeout(timer))
        }
    }, [])

    const reserved = width >= WIDE ? inset : 0
    const free = Math.max(0, width - reserved)
    const side = Math.round(Math.min(380, Math.max(180, free * 0.52)))
    const activeLeft = 0
    const rightEnd = bleed.left + free - (reserved ? 24 : 0)
    const fade = reserved
        ? `${TOP_FADE}, linear-gradient(to right, black ${rightEnd - RIGHT_FADE}px, transparent ${rightEnd}px)`
        : TOP_FADE

    const current = stops[index]
    const scales = stops.map((stop) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, Math.sqrt(stop.value / current.value))))
    const lefts = stops.map(() => activeLeft)
    for (let position = index - 1; position >= 0; position--) {
        lefts[position] = lefts[position + 1] - GAP - scales[position] * side
    }
    for (let position = index + 1; position < stops.length; position++) {
        lefts[position] = lefts[position - 1] + scales[position - 1] * side + GAP
    }

    return (
        <div ref={root} className="flex flex-col gap-3">
            <div
                className="relative overflow-hidden"
                style={{
                    height: side * 1.25,
                    marginLeft: -bleed.left,
                    marginRight: -bleed.right,
                    maskImage: fade,
                    WebkitMaskImage: fade,
                    maskComposite: 'intersect',
                    WebkitMaskComposite: 'source-in',
                }}
            >
                {width > 0 &&
                    stops.map((stop, position) => {
                        const distance = position - index
                        const shown = Math.abs(distance) <= 6
                        return (
                            <button
                                key={stop.label}
                                tabIndex={distance === 0 || !shown ? -1 : 0}
                                aria-label={`${formatLong(stop.value)} ${stop.label}`}
                                onClick={() => go(position)}
                                className={`absolute bottom-0 left-0 overflow-hidden rounded-sm border-2 border-black bg-white text-left text-black [container-type:inline-size] ${MOTION} ${
                                    distance === 0 ? 'cursor-default' : 'cursor-pointer'
                                }`}
                                style={{
                                    width: side,
                                    height: side,
                                    transformOrigin: 'bottom left',
                                    transform: `translateX(${lefts[position] + bleed.left}px) scale(${
                                        scales[position]
                                    })`,
                                    visibility: shown ? 'visible' : 'hidden',
                                    pointerEvents: shown ? 'auto' : 'none',
                                }}
                            >
                                <CardFace stop={stop} position={position} />
                            </button>
                        )
                    })}
            </div>

            <div className="flex items-center gap-3" style={{ paddingRight: reserved }}>
                <IconButton
                    size="sm"
                    aria-label="Previous comparison"
                    icon={<IconChevronLeft />}
                    disabled={index === 0}
                    onClick={() => go(index - 1)}
                />
                <IconButton
                    size="sm"
                    aria-label="Next comparison"
                    icon={<IconChevronRight />}
                    disabled={index === stops.length - 1}
                    onClick={() => go(index + 1)}
                />
                <Slider.Root
                    className="min-w-0 flex-1"
                    min={0}
                    max={stops.length - 1}
                    step={1}
                    value={index}
                    onValueChange={(value) => go(value as number)}
                >
                    <Slider.Control>
                        <Slider.Track>
                            <Slider.Indicator />
                            <Slider.Thumb aria-label="Comparison" />
                        </Slider.Track>
                    </Slider.Control>
                </Slider.Root>
                <span className="font-code text-13 tabular-nums text-secondary">
                    {index + 1}/{stops.length}
                </span>
            </div>
        </div>
    )
}
