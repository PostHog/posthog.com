/**
 * The card layout of `HoggieCallout`. The hog stands next to the copy and talks when a reader pokes it.
 * The wrapper is a size container, so the layout changes on the callout's width, not the window's:
 * - below `@xl`: the hog, then the copy, then a full-width button
 * - `@xl`: a hog column next to the copy, with the button under the description
 * - `@4xl`: one row, with the button after the copy
 */
import React, { useEffect, useRef, useState } from 'react'
import OSButton from 'components/OSButton'
import SpeechBubble from 'components/SpeechBubble'
import { focusRing } from 'components/UI/styles'
import type { FeaturedHoggieCalloutProps, HoggieAlign, HoggieSize } from './index'
import { MAX_LINE_LENGTH, STANDARD_LINES } from './lines'

// How long the bubble stays up after a poke.
const BUBBLE_MS = 1800

// The outer padding on the side without the hog, and the hog's distance from its edge. `hogOut` is for
// a centered hog that breaks out: it goes 16px past the side border.
const SIDES = {
    left: { box: '@xl:pr-8 @4xl:pr-10', hog: '@xl:left-8 @4xl:left-10', hogOut: '@xl:-left-4' },
    right: { box: '@xl:pl-8 @4xl:pl-10', hog: '@xl:right-8 @4xl:right-10', hogOut: '@xl:-right-4' },
}

// In a medium or wide container, the hog sits in a column. The box pads the hog side by the outer
// padding plus the column plus a 24px gap. A centered hog that breaks out needs less padding, because
// its column starts past the border. `md` is the size the callout had before the `hoggieSize` prop.
const SIZES: Record<HoggieSize, { hog: string; left: string; right: string; leftOut: string; rightOut: string }> = {
    sm: {
        hog: 'h-24 @xl:h-32 @xl:w-28',
        left: '@xl:pl-[168px] @4xl:pl-[176px]',
        right: '@xl:pr-[168px] @4xl:pr-[176px]',
        leftOut: '@xl:pl-[120px]',
        rightOut: '@xl:pr-[120px]',
    },
    md: {
        hog: 'h-[120px] @xl:h-44 @xl:w-[152px]',
        left: '@xl:pl-[208px] @4xl:pl-[216px]',
        right: '@xl:pr-[208px] @4xl:pr-[216px]',
        leftOut: '@xl:pl-[160px]',
        rightOut: '@xl:pr-[160px]',
    },
    lg: {
        hog: 'h-36 @xl:h-56 @xl:w-48',
        left: '@xl:pl-[248px] @4xl:pl-[256px]',
        right: '@xl:pr-[248px] @4xl:pr-[256px]',
        leftOut: '@xl:pl-[200px]',
        rightOut: '@xl:pr-[200px]',
    },
}

type HoggieMode = 'inside' | 'breakout'

// Where the hog sits in a medium or wide container. In a narrow container, the hog is always above the
// copy, 32px over the top border. Breakout goes past one border: 32px over the top, 16px under the
// bottom, or (for `center`) 16px past the side.
const POSITIONS: Record<HoggieMode, Record<HoggieAlign, string>> = {
    inside: { top: '@xl:top-4', center: '@xl:top-1/2 @xl:-translate-y-1/2', bottom: '@xl:bottom-4' },
    breakout: { top: '@xl:-top-8', center: '@xl:top-1/2 @xl:-translate-y-1/2', bottom: '@xl:-bottom-4' },
}

// Minimum box heights, so the hog only goes past the border it breaks out of. Inside at the bottom has
// no minimum below `@4xl`, as before this prop: a short box lets the hog go over the top border.
const MIN_HEIGHTS: Record<HoggieMode, Record<HoggieAlign, Record<HoggieSize, string>>> = {
    inside: {
        top: {
            sm: '@xl:min-h-[160px] @4xl:min-h-[168px] @xl:justify-center',
            md: '@xl:min-h-[208px] @4xl:min-h-[208px] @xl:justify-center',
            lg: '@xl:min-h-[256px] @4xl:min-h-[256px] @xl:justify-center',
        },
        center: {
            sm: '@xl:min-h-[160px] @4xl:min-h-[168px] @xl:justify-center',
            md: '@xl:min-h-[208px] @4xl:min-h-[208px] @xl:justify-center',
            lg: '@xl:min-h-[256px] @4xl:min-h-[256px] @xl:justify-center',
        },
        bottom: { sm: '@4xl:min-h-[168px]', md: '@4xl:min-h-[168px]', lg: '@4xl:min-h-[168px]' },
    },
    breakout: {
        top: {
            sm: '@xl:min-h-[112px] @4xl:min-h-[168px] @xl:justify-center',
            md: '@xl:min-h-[160px] @4xl:min-h-[168px] @xl:justify-center',
            lg: '@xl:min-h-[208px] @4xl:min-h-[208px] @xl:justify-center',
        },
        center: {
            sm: '@xl:min-h-[144px] @4xl:min-h-[168px] @xl:justify-center',
            md: '@xl:min-h-[192px] @4xl:min-h-[192px] @xl:justify-center',
            lg: '@xl:min-h-[240px] @4xl:min-h-[240px] @xl:justify-center',
        },
        bottom: {
            sm: '@xl:min-h-[128px] @4xl:min-h-[168px] @xl:justify-center',
            md: '@xl:min-h-[176px] @4xl:min-h-[176px] @xl:justify-center',
            lg: '@xl:min-h-[224px] @4xl:min-h-[224px] @xl:justify-center',
        },
    },
}

export default function FeaturedHoggieCallout({
    hoggie: Hoggie,
    hoggieTitle,
    hoggieAlign = 'bottom',
    hoggieBreakout = false,
    hoggieSize = 'md',
    ariaLabel,
    title,
    description,
    buttonLabel,
    to,
    className = '',
    hoggieSide = 'left',
    interactive = true,
    hoggieLines = [],
}: FeaturedHoggieCalloutProps): JSX.Element {
    const side = SIDES[hoggieSide]
    const size = SIZES[hoggieSize]
    const mode: HoggieMode = hoggieBreakout ? 'breakout' : 'inside'
    const outToSide = hoggieBreakout && hoggieAlign === 'center'
    const hogSide = outToSide ? side.hogOut : side.hog
    const sizedBox = `${outToSide ? (hoggieSide === 'left' ? size.leftOut : size.rightOut) : size[hoggieSide]} ${
        MIN_HEIGHTS[mode][hoggieAlign][hoggieSize]
    }`
    const [nudging, setNudging] = useState(false)
    // Each poke mounts a new bouncing element, so a poke during a bounce starts the bounce again.
    const [pokes, setPokes] = useState(0)
    const [bouncing, setBouncing] = useState(false)
    const [saying, setSaying] = useState('')
    const lastLine = useRef('')
    const bubbleTimer = useRef<ReturnType<typeof setTimeout>>()

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
        },
        []
    )

    // A springy hop on hover. It does not play while the hog bounces from a poke.
    const nudge = () => {
        if (!bouncing) setNudging(true)
    }

    // A random line that is not the line the hog just said.
    const poke = () => {
        const lines = [...STANDARD_LINES, ...hoggieLines]
        const fresh = lines.filter((line) => line !== lastLine.current)
        const line = fresh[Math.floor(Math.random() * fresh.length)] ?? lines[0]
        lastLine.current = line
        setSaying(line)
        setNudging(false)
        setPokes((count) => count + 1)
        setBouncing(true)
        clearTimeout(bubbleTimer.current)
        bubbleTimer.current = setTimeout(() => setSaying(''), BUBBLE_MS)
    }

    const hog = <Hoggie title={hoggieTitle} className="block h-full w-auto max-w-none" />

    return (
        <aside aria-label={ariaLabel} className={`@container not-prose mt-12 mb-8 ${className}`}>
            <div
                className={`relative flex flex-col rounded-[8px] border border-solid border-primary bg-lemon-lighter dark:bg-accent text-primary p-5 @xl:py-7 @4xl:justify-center ${side.box} ${sizedBox}`}
            >
                {/* Narrow: centered, in the flow, and 32px over the top border. Medium and wide: in the
                    hog column, where `hoggieAlign` and `hoggieBreakout` put it. */}
                <div
                    className={`relative flex items-end justify-center self-center -mt-[52px] mb-4 @xl:absolute @xl:m-0 ${size.hog} ${POSITIONS[mode][hoggieAlign]} ${hogSide}`}
                >
                    {interactive ? (
                        <>
                            <div
                                role="status"
                                className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-3 w-max max-w-[11rem] -translate-x-1/2"
                            >
                                {saying && (
                                    <SpeechBubble
                                        key={saying}
                                        className="px-3 py-2 text-center text-sm font-medium motion-safe:animate-hog-bubble"
                                    >
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
                                {/* Both spans pivot near the hog's feet. The bounce's animationend also
                                    reaches the outer span, so the outer span checks the target. */}
                                <span
                                    onAnimationEnd={(event) =>
                                        event.target === event.currentTarget && setNudging(false)
                                    }
                                    className={`block h-full origin-[50%_92%] ${
                                        nudging ? 'motion-safe:animate-hog-nudge' : ''
                                    }`}
                                >
                                    <span
                                        key={pokes}
                                        onAnimationEnd={() => setBouncing(false)}
                                        className={`block h-full origin-[50%_92%] ${
                                            bouncing ? 'motion-safe:animate-hog-poke' : ''
                                        }`}
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
