/**
 * The yellow variant of `HoggieCallout`. The hog stands next to the copy and talks when a reader pokes it.
 * The wrapper is a size container, so the layout changes on the callout's width, not the window's:
 * - below `@xl`: the hog, then the copy, then a full-width button
 * - `@xl`: a hog column next to the copy, with the button under the description
 * - `@4xl`: one row, with the button after the copy
 */
import React, { useEffect, useRef, useState } from 'react'
import OSButton from 'components/OSButton'
import SpeechBubble from 'components/SpeechBubble'
import { focusRing } from 'components/UI/styles'
import type { YellowHoggieCalloutProps } from './index'
import { MAX_LINE_LENGTH, STANDARD_LINES } from './lines'

// How long the bubble stays up after a poke, and how long the hog stays up in a hover nudge.
const BUBBLE_MS = 1800
const NUDGE_MS = 200

// In a medium or wide container, the hog sits in a 152px column. The box pads the hog side by
// the outer padding plus the column plus a 24px gap.
const SIDES = {
    left: {
        box: '@xl:pl-[208px] @xl:pr-8 @4xl:pl-[216px] @4xl:pr-10',
        hog: '@xl:left-8 @4xl:left-10',
    },
    right: {
        box: '@xl:pr-[208px] @xl:pl-8 @4xl:pr-[216px] @4xl:pl-10',
        hog: '@xl:right-8 @4xl:right-10',
    },
}

export default function YellowHoggieCallout({
    hoggie: Hoggie,
    hoggieTitle,
    ariaLabel,
    title,
    description,
    buttonLabel,
    to,
    className = '',
    hoggieSide = 'left',
    interactive = true,
    hoggieLines = [],
}: YellowHoggieCalloutProps): JSX.Element {
    const side = SIDES[hoggieSide]
    const [nudging, setNudging] = useState(false)
    // Each poke mounts a new wiggle element, so a poke during a wiggle starts the wiggle again.
    const [pokes, setPokes] = useState(0)
    const [saying, setSaying] = useState('')
    const lastLine = useRef('')
    const bubbleTimer = useRef<ReturnType<typeof setTimeout>>()
    const nudgeTimer = useRef<ReturnType<typeof setTimeout>>()

    const linesKey = hoggieLines.join('\n')
    useEffect(() => {
        if (process.env.NODE_ENV !== 'production') {
            hoggieLines
                .filter((line) => line.length > MAX_LINE_LENGTH)
                .forEach((line) =>
                    console.warn(
                        `HoggieCallout: "${line}" is longer than ${MAX_LINE_LENGTH} characters. It may not fit the speech bubble.`
                    )
                )
        }
    }, [linesKey])

    useEffect(
        () => () => {
            clearTimeout(bubbleTimer.current)
            clearTimeout(nudgeTimer.current)
        },
        []
    )

    // A small hop on hover. It goes up fast and settles slowly, with transitions only.
    // Touch and pen also fire pointerenter, so a tap would hop and wiggle at the same time.
    const nudge = (event: React.PointerEvent) => {
        if (event.pointerType !== 'mouse') return
        setNudging(true)
        clearTimeout(nudgeTimer.current)
        nudgeTimer.current = setTimeout(() => setNudging(false), NUDGE_MS)
    }

    // A random line that is not the line the hog just said.
    const poke = () => {
        const lines = [...STANDARD_LINES, ...hoggieLines]
        const fresh = lines.filter((line) => line !== lastLine.current)
        const line = fresh[Math.floor(Math.random() * fresh.length)] ?? lines[0]
        lastLine.current = line
        setSaying(line)
        setPokes((count) => count + 1)
        clearTimeout(bubbleTimer.current)
        bubbleTimer.current = setTimeout(() => setSaying(''), BUBBLE_MS)
    }

    const hog = <Hoggie title={hoggieTitle} className="block h-full w-auto max-w-none" />

    return (
        <aside aria-label={ariaLabel} className={`@container not-prose mt-12 mb-8 ${className}`}>
            <div
                className={`relative flex flex-col rounded-[8px] border border-solid border-primary bg-lemon-lighter dark:bg-accent text-primary p-5 @xl:py-7 @4xl:min-h-[168px] @4xl:justify-center ${side.box}`}
            >
                {/* Narrow: centered, in the flow, and 32px over the top border. Medium and wide: in the
                    hog column, 16px above the bottom border. */}
                <div
                    className={`relative flex items-end justify-center self-center h-[120px] -mt-[52px] mb-4 @xl:absolute @xl:bottom-4 @xl:m-0 @xl:h-44 @xl:w-[152px] ${side.hog}`}
                >
                    {interactive ? (
                        <>
                            <div
                                role="status"
                                className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-3 w-max max-w-[11rem] -translate-x-1/2"
                            >
                                {saying && (
                                    <SpeechBubble className="px-3 py-2 text-center text-sm font-medium">
                                        {saying}
                                    </SpeechBubble>
                                )}
                            </div>
                            <button
                                type="button"
                                aria-label="Poke the hog"
                                onClick={poke}
                                onPointerEnter={nudge}
                                className={`h-full cursor-pointer rounded-sm ${focusRing}`}
                            >
                                <span
                                    className={`block h-full motion-safe:transition-transform motion-safe:ease-out ${
                                        nudging
                                            ? 'motion-safe:duration-200 motion-safe:-translate-y-2 motion-safe:rotate-[1.5deg]'
                                            : 'motion-safe:duration-500'
                                    }`}
                                >
                                    <span
                                        key={pokes}
                                        className={`block h-full ${pokes > 0 ? 'motion-safe:animate-wiggle' : ''}`}
                                    >
                                        {hog}
                                    </span>
                                </span>
                            </button>
                        </>
                    ) : (
                        hog
                    )}
                </div>
                <div className="flex flex-col gap-4 @4xl:flex-row @4xl:items-center @4xl:gap-8">
                    <div className="flex-1 min-w-0">
                        <strong className="block font-rounded font-extrabold text-xl !leading-[1.25] text-balance @xl:text-[22px]">
                            {title}
                        </strong>
                        <p className="m-0 mt-2 text-[15px] !leading-normal text-secondary">{description}</p>
                    </div>
                    <div className="w-full @xl:w-fit shrink-0">
                        <OSButton asLink to={to} variant="primary" size="md" width="full" state={{ newWindow: true }}>
                            {buttonLabel}
                        </OSButton>
                    </div>
                </div>
            </div>
        </aside>
    )
}
