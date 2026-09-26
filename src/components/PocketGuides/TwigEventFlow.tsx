import React, { useEffect, useRef, useState } from 'react'
import type { StaySetting } from '@posthog/twig-components/filters'
import ExploreTwigLink from './ExploreTwigLink'
import PostHogEventInspector from './PostHogEventInspector'
import TwigBrowseFigure from './TwigBrowseFigure'

type VisitorCursor = {
    x: number
    y: number
    labelSide: 'left' | 'right'
    moving: boolean
    pressed: boolean
}

export default function TwigEventFlow({
    withDestination = false,
    autoplay = false,
}: {
    withDestination?: boolean
    autoplay?: boolean
}): JSX.Element {
    const [clicked, setClicked] = useState<string | null>(null)
    const [capturedAt, setCapturedAt] = useState<string | null>(null)
    const [eventCount, setEventCount] = useState(0)
    const [visitorSetting, setVisitorSetting] = useState<StaySetting>('Coast')
    const [inView, setInView] = useState(false)
    const [manual, setManual] = useState(false)
    const [cursor, setCursor] = useState<VisitorCursor | null>(null)
    const rootRef = useRef<HTMLDivElement>(null)
    const twigRef = useRef<HTMLDivElement>(null)
    const nextChoice = useRef(0)

    useEffect(() => {
        if (!autoplay || !rootRef.current) return
        if (typeof IntersectionObserver === 'undefined') {
            setInView(true)
            return
        }

        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 })
        observer.observe(rootRef.current)
        return () => observer.disconnect()
    }, [autoplay])

    useEffect(() => {
        if (!autoplay || !inView || manual) return

        const choices: StaySetting[] = ['Forest', 'City', 'Coast']
        const timeouts: number[] = []
        let firstMove = true
        const advance = () => {
            const choice = choices[nextChoice.current % choices.length]
            const button = Array.from(
                twigRef.current?.querySelectorAll<HTMLButtonElement>('button[data-replay-label]') ?? []
            ).find((element) => element.getAttribute('data-replay-label') === `Filter: ${choice}`)
            if (!button || !twigRef.current) return

            const frame = twigRef.current.getBoundingClientRect()
            const target = button.getBoundingClientRect()
            const x = target.left - frame.left + target.width / 2
            const y = target.top - frame.top + target.height / 2
            const labelSide = x + 165 > frame.width && x > 145 ? 'left' : 'right'
            nextChoice.current += 1

            if (firstMove) {
                setCursor({ x: x + 70, y: y - 55, labelSide, moving: false, pressed: false })
                timeouts.push(window.setTimeout(() => setCursor({ x, y, labelSide, moving: true, pressed: false }), 80))
                firstMove = false
            } else {
                setCursor({ x, y, labelSide, moving: true, pressed: false })
            }

            timeouts.push(
                window.setTimeout(() => {
                    setCursor((current) => (current ? { ...current, pressed: true } : current))
                    setVisitorSetting(choice)
                    setClicked(choice)
                    setCapturedAt(new Date().toISOString())
                    setEventCount((count) => count + 1)
                }, 1600)
            )
            timeouts.push(
                window.setTimeout(() => {
                    setCursor((current) => (current ? { ...current, pressed: false } : current))
                }, 1850)
            )
        }

        let interval: number | undefined
        const start = window.setTimeout(() => {
            advance()
            interval = window.setInterval(advance, 6500)
        }, 500)

        return () => {
            window.clearTimeout(start)
            if (interval !== undefined) window.clearInterval(interval)
            timeouts.forEach((timeout) => window.clearTimeout(timeout))
        }
    }, [autoplay, inView, manual])

    return (
        <div ref={rootRef} className="twig-click-demo @container">
            <div className="grid gap-3">
                <div ref={twigRef} className="relative overflow-hidden rounded border border-primary bg-primary">
                    <TwigBrowseFigure
                        id={`guide-event-${withDestination ? 'destination' : 'bare'}`}
                        initialSetting="Coast"
                        controlledSetting={autoplay ? visitorSetting : undefined}
                        onFilter={(setting) => {
                            setClicked(setting)
                            setCapturedAt(new Date().toISOString())
                            setEventCount((count) => count + 1)
                            if (autoplay) {
                                setVisitorSetting(setting)
                                setManual(true)
                            }
                        }}
                    />
                    {autoplay && !manual && cursor && (
                        <div
                            className={`pointer-events-none absolute z-10 ${
                                cursor.moving
                                    ? 'transition-[left,top] duration-[1100ms] ease-in-out motion-reduce:transition-none'
                                    : ''
                            }`}
                            style={{ left: cursor.x, top: cursor.y }}
                            role="img"
                            aria-label="Twig visitor cursor"
                        >
                            <svg
                                className={cursor.pressed ? 'scale-90' : ''}
                                width="24"
                                height="30"
                                viewBox="0 0 24 30"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M2 2v21l5.8-5.4 4.1 9.2 4.2-1.8-4.1-9.1H20L2 2Z"
                                    fill="#1d1d1d"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span
                                className={`absolute top-5 whitespace-nowrap rounded border border-[#2d2b29] bg-[#fffdf9] px-2 py-1 font-rounded text-xs font-semibold text-[#2d2b29] shadow-[2px_2px_0_#f7a81b] ${
                                    cursor.labelSide === 'left' ? 'right-5' : 'left-6'
                                }`}
                            >
                                Twig visitor
                            </span>
                        </div>
                    )}
                </div>
                <PostHogEventInspector
                    clicked={clicked}
                    destination={withDestination ? clicked ?? undefined : undefined}
                    timestamp={capturedAt}
                    eventCount={eventCount}
                />
            </div>
            <ExploreTwigLink />
        </div>
    )
}
