import React from 'react'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import type { Event } from '../../pages/events'
import { eventGraphicHogIndex } from 'constants/eventGraphicPalette'
import { eventTilt } from './utils'

// Seven rubber-stamp designs, after the PostHog Airlines passport in Figma. Each design has its own
// ink (a project color token, applied as `currentColor`), so a page of stamps reads as many inks.
type Design = 'seal' | 'dashedOval' | 'scallop' | 'postage' | 'sunOval' | 'label' | 'wavy'

const DESIGNS: { design: Design; ink: string }[] = [
    { design: 'seal', ink: 'text-burnt-orange' },
    { design: 'dashedOval', ink: 'text-blue' },
    { design: 'scallop', ink: 'text-black' },
    { design: 'postage', ink: 'text-yellow' },
    { design: 'sunOval', ink: 'text-pink' },
    { design: 'label', ink: 'text-green' },
    { design: 'wavy', ink: 'text-navy' },
]

// Same stable hash the event graphic uses, so an event keeps its stamp design everywhere
const pickDesign = (event: Event) => DESIGNS[eventGraphicHogIndex(`${event.id}-${event.name}`, DESIGNS.length)]

// Average width of a Squeak capital, in ems (measured against the label stamp)
const CHAR_WIDTH = 0.72

/** Font size for one line of text, squeezed with textLength when it would overflow `maxWidth`. */
const fit = (text: string, fontSize: number, maxWidth: number) =>
    text.length * fontSize * CHAR_WIDTH > maxWidth
        ? { fontSize, textLength: maxWidth, lengthAdjust: 'spacingAndGlyphs' as const }
        : { fontSize }

/** A rectangle whose edges are a run of bumps: big bumps for a cloud stamp, small ones for perforations. */
const scallopPath = (x: number, y: number, w: number, h: number, bump: number, amp: number): string => {
    const nx = Math.max(2, Math.round(w / bump))
    const ny = Math.max(2, Math.round(h / bump))
    const sx = w / nx
    const sy = h / ny
    let d = `M${x} ${y}`
    for (let i = 0; i < nx; i++) d += ` Q${x + sx * (i + 0.5)} ${y - amp} ${x + sx * (i + 1)} ${y}`
    for (let i = 0; i < ny; i++) d += ` Q${x + w + amp} ${y + sy * (i + 0.5)} ${x + w} ${y + sy * (i + 1)}`
    for (let i = 0; i < nx; i++) d += ` Q${x + w - sx * (i + 0.5)} ${y + h + amp} ${x + w - sx * (i + 1)} ${y + h}`
    for (let i = 0; i < ny; i++) d += ` Q${x - amp} ${y + h - sy * (i + 0.5)} ${x} ${y + h - sy * (i + 1)}`
    return `${d} Z`
}

// Arc paths for curved text. Top arcs run left to right over the top; bottom arcs run left to right
// under the bottom, so text on both reads the right way up.
const topArc = (cx: number, cy: number, rx: number, ry: number) =>
    `M${cx - rx} ${cy} A${rx} ${ry} 0 0 1 ${cx + rx} ${cy}`
const bottomArc = (cx: number, cy: number, rx: number, ry: number) =>
    `M${cx - rx} ${cy} A${rx} ${ry} 0 0 0 ${cx + rx} ${cy}`

// Stamps have room for a word or two. Keep whole words up to ~14 characters.
const MAX_MAIN = 14
const shorten = (text: string): string => {
    if (text.length <= MAX_MAIN) return text
    const words = text.split(' ')
    let out = words[0]
    for (const word of words.slice(1)) {
        if (`${out} ${word}`.length > MAX_MAIN) break
        out = `${out} ${word}`
    }
    // Don't end a stamp on a filler word ("SURVEYS THAT")
    return out.replace(/\s+(that|the|a|an|of|with|for|and|to|in|on|without)$/i, '')
}

type StampText = { top: string; main: string; year: string; kind: string }

const stampText = (event: Event): StampText => {
    const date = dayjs(event.date)
    const main = shorten(
        event.online
            ? event.name.split(/[:—–(]/)[0].trim()
            : event.location?.label?.split(',')[0]?.trim() || 'Somewhere'
    )
    return {
        top: event.online ? 'PostHog online' : 'PostHog events',
        main: main.toUpperCase(),
        year: date.format('YYYY'),
        kind: (event.online ? 'Online' : event.format?.[0] || 'Meetup').toUpperCase(),
    }
}

const Art = ({ design, text, uid }: { design: Design; text: StampText; uid: string }) => {
    const { top, main, year, kind } = text
    const topUpper = top.toUpperCase()

    switch (design) {
        // Round seal: double ring, curved text top and bottom, city in the middle, "20 · 26" on the sides
        case 'seal':
            return (
                <svg viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="5" />
                    <circle cx="60" cy="60" r="36" fill="none" stroke="currentColor" strokeWidth="2.5" />
                    {/* Glyphs sit on the outside of the top arc and the inside of the bottom arc, so the radii differ */}
                    <path id={`${uid}-t`} d={topArc(60, 60, 41, 41)} fill="none" />
                    <path id={`${uid}-b`} d={bottomArc(60, 60, 50, 50)} fill="none" />
                    <text fontSize="11" letterSpacing="1" fill="currentColor">
                        <textPath href={`#${uid}-t`} startOffset="50%" textAnchor="middle">
                            {topUpper}
                        </textPath>
                    </text>
                    <text fontSize="11" letterSpacing="1" fill="currentColor">
                        <textPath href={`#${uid}-b`} startOffset="50%" textAnchor="middle">
                            {kind}
                        </textPath>
                    </text>
                    <text x="16" y="64" fontSize="9" textAnchor="middle" fill="currentColor">
                        {year.slice(0, 2)}
                    </text>
                    <text x="104" y="64" fontSize="9" textAnchor="middle" fill="currentColor">
                        {year.slice(2)}
                    </text>
                    <text x="60" y="66" textAnchor="middle" fill="currentColor" {...fit(main, 17, 64)}>
                        {main}
                    </text>
                </svg>
            )

        // Oval with a dashed outer ring and curved caption
        case 'dashedOval':
            return (
                <svg viewBox="0 0 160 104">
                    <ellipse
                        cx="80"
                        cy="52"
                        rx="76"
                        ry="48"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray="9 6"
                    />
                    <ellipse cx="80" cy="52" rx="66" ry="39" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path id={`${uid}-t`} d={topArc(80, 56, 54, 30)} fill="none" />
                    <text fontSize="10" letterSpacing="0.5" fill="currentColor">
                        <textPath href={`#${uid}-t`} startOffset="50%" textAnchor="middle">
                            {topUpper}
                        </textPath>
                    </text>
                    <text x="80" y="60" textAnchor="middle" fill="currentColor" {...fit(main, 20, 96)}>
                        {main}
                    </text>
                    <text x="80" y="80" textAnchor="middle" fontSize="16" fill="currentColor">
                        {year}
                    </text>
                </svg>
            )

        // Cloud-edged block with stacked, left-aligned lines
        case 'scallop':
            return (
                <svg viewBox="0 0 130 114">
                    <path d={scallopPath(8, 8, 114, 98, 13, 6)} fill="none" stroke="currentColor" strokeWidth="4" />
                    <g fill="currentColor" transform="rotate(4 65 57)">
                        <text x="20" y="34" fontSize="15">
                            POSTHOG
                        </text>
                        <text x="20" y="52" fontSize="15">
                            {kind}
                        </text>
                        <text x="20" y="70" {...fit(main, 15, 90)}>
                            {main}
                        </text>
                        <text x="20" y="88" fontSize="15">
                            {year}
                        </text>
                    </g>
                </svg>
            )

        // Postage stamp: perforated edge and an inner frame
        case 'postage':
            return (
                <svg viewBox="0 0 112 122">
                    <path d={scallopPath(8, 8, 96, 106, 8, 4)} fill="none" stroke="currentColor" strokeWidth="3.5" />
                    <rect x="18" y="18" width="76" height="86" fill="none" stroke="currentColor" strokeWidth="3" />
                    <text x="56" y="58" textAnchor="middle" fill="currentColor" {...fit(main, 18, 64)}>
                        {main}
                    </text>
                    <text x="56" y="80" textAnchor="middle" fontSize="17" fill="currentColor">
                        {year}
                    </text>
                </svg>
            )

        // Double-ring oval with an arched city name and a little sunrise
        case 'sunOval':
            return (
                <svg viewBox="0 0 124 112">
                    <ellipse cx="62" cy="56" rx="58" ry="52" fill="none" stroke="currentColor" strokeWidth="5" />
                    <ellipse cx="62" cy="56" rx="49" ry="43" fill="none" stroke="currentColor" strokeWidth="2.5" />
                    <path id={`${uid}-t`} d={topArc(62, 62, 36, 28)} fill="none" />
                    <text fill="currentColor" {...fit(main, 16, 70)}>
                        <textPath href={`#${uid}-t`} startOffset="50%" textAnchor="middle">
                            {main}
                        </textPath>
                    </text>
                    <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none">
                        <path d="M52 66 A10 10 0 0 1 72 66" />
                        <line x1="62" y1="50" x2="62" y2="54" />
                        <line x1="50" y1="54" x2="53" y2="57" />
                        <line x1="74" y1="54" x2="71" y2="57" />
                        <line x1="45" y1="62" x2="49" y2="63" />
                        <line x1="79" y1="62" x2="75" y2="63" />
                    </g>
                    <text x="62" y="88" textAnchor="middle" fontSize="18" fill="currentColor">
                        {year}
                    </text>
                </svg>
            )

        // Rounded label with letter-spaced header
        case 'label':
            return (
                <svg viewBox="0 0 170 64">
                    <rect
                        x="4"
                        y="4"
                        width="162"
                        height="56"
                        rx="9"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                    />
                    <text x="85" y="25" textAnchor="middle" fontSize="10" letterSpacing="6" fill="currentColor">
                        POSTHOG
                    </text>
                    <text x="85" y="48" textAnchor="middle" fill="currentColor" {...fit(`${main} ${year}`, 19, 146)}>
                        {`${main} ${year}`}
                    </text>
                </svg>
            )

        // Wavy-edged badge, set at a slant
        case 'wavy':
        default:
            return (
                <svg viewBox="0 0 120 112">
                    <path d={scallopPath(10, 10, 100, 92, 9, 4.5)} fill="none" stroke="currentColor" strokeWidth="4" />
                    <g fill="currentColor" textAnchor="middle" transform="rotate(-8 60 56)">
                        <text x="60" y="44" fontSize="14">
                            POSTHOG
                        </text>
                        <text x="60" y="63" {...fit(main, 15, 80)}>
                            {main}
                        </text>
                        <text x="60" y="82" fontSize="14">
                            {year}
                        </text>
                    </g>
                </svg>
            )
    }
}

// Relative widths, so a wide label and a round seal look the same size side by side
const DESIGN_SCALE: Record<Design, number> = {
    seal: 1.05,
    dashedOval: 1.2,
    scallop: 1.1,
    postage: 0.95,
    sunOval: 1.05,
    label: 1.15,
    wavy: 1,
}

type StampProps = {
    event: Event
    onClick?: () => void
    /** Thump in like it was just stamped */
    animate?: boolean
    rotate?: number
}

/** An ink stamp for one event. Fills its container's width. */
export default function PassportStamp({ event, onClick, animate, rotate }: StampProps): JSX.Element {
    const { design, ink } = pickDesign(event)
    return (
        <motion.button
            onClick={onClick}
            initial={animate ? { scale: 2.2, opacity: 0 } : false}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 18 }}
            className={`block font-squeak uppercase mix-blend-multiply transition-transform hover:scale-110 [&_svg]:block [&_svg]:h-auto [&_svg]:w-full ${ink}`}
            style={{ width: `${DESIGN_SCALE[design] * 100}%`, rotate: `${rotate ?? eventTilt(event, 12)}deg` }}
            title={event.name}
        >
            <Art design={design} text={stampText(event)} uid={`stamp-${event.id}`} />
        </motion.button>
    )
}
