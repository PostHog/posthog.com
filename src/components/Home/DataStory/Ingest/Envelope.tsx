import React from 'react'
import { EVENT_KINDS } from './eventKinds'
import type { EventKind } from './eventKinds'

export const ENVELOPE_WIDTH = 64
export const ENVELOPE_HEIGHT = 56
export const ENVELOPE_MOUTH = { x: 32, y: 18 }
export const LETTER_LINES = 5

interface EnvelopeProps {
    lines: EventKind[]
    isOpen: boolean
}

const LEFT = 2
const RIGHT = 62
const BODY_TOP = 20
const BOTTOM = 54
const CENTER = 32
const POCKET_DEPTH = 17
const FLAP_HEIGHT = 18
const LETTER = { left: 10, top: 6, right: 54, bottom: 46 }
const LINE_TOP = 12
const LINE_GAP = 4.5
const LINE_INSET = 3
const MAX_LINE_HALF_WIDTH = 16
const LINE_LENGTHS = [1, 0.78, 0.92, 0.7, 0.86]
const INK = 'stroke-light-12'
const OUTLINE = 2.5

const pocketEdge = (y: number): number => LEFT + Math.max(0, y - BODY_TOP) * ((CENTER - LEFT) / POCKET_DEPTH)

function letterLine(index: number): { y: number; halfWidth: number } {
    const y = LINE_TOP + index * LINE_GAP
    const visibleHalf = CENTER - Math.max(pocketEdge(y), LETTER.left) - LINE_INSET
    return { y, halfWidth: Math.min(MAX_LINE_HALF_WIDTH, visibleHalf) * LINE_LENGTHS[index] }
}

export default function Envelope({ lines, isOpen }: EnvelopeProps): JSX.Element {
    const flapTip = isOpen ? BODY_TOP - FLAP_HEIGHT : BODY_TOP + FLAP_HEIGHT
    return (
        <svg
            width={ENVELOPE_WIDTH}
            height={ENVELOPE_HEIGHT}
            viewBox={`0 0 ${ENVELOPE_WIDTH} ${ENVELOPE_HEIGHT}`}
            className="overflow-visible"
            aria-hidden
        >
            <rect
                x={LEFT}
                y={BODY_TOP}
                width={RIGHT - LEFT}
                height={BOTTOM - BODY_TOP}
                rx={3}
                className="fill-orange"
            />
            {isOpen && (
                <polygon
                    points={`${LEFT},${BODY_TOP} ${CENTER},${flapTip} ${RIGHT},${BODY_TOP}`}
                    className={`fill-orange ${INK}`}
                    strokeWidth={OUTLINE}
                    strokeLinejoin="round"
                />
            )}
            {isOpen && (
                <g>
                    <rect
                        x={LETTER.left}
                        y={LETTER.top}
                        width={LETTER.right - LETTER.left}
                        height={LETTER.bottom - LETTER.top}
                        rx={2}
                        className={`fill-light-1 ${INK}`}
                        strokeWidth={2}
                    />
                    {Array.from({ length: LETTER_LINES }, (_, index) => {
                        const { y, halfWidth } = letterLine(index)
                        const kind = lines[index]
                        return (
                            <line
                                key={index}
                                x1={CENTER - halfWidth}
                                x2={CENTER + halfWidth}
                                y1={y}
                                y2={y}
                                className={kind ? EVENT_KINDS[kind].strokeClassName : 'stroke-light-4'}
                                strokeWidth={kind ? 2.6 : 1.6}
                                strokeLinecap="round"
                            />
                        )
                    })}
                </g>
            )}
            <polygon
                points={`${LEFT},${BODY_TOP} ${CENTER},${
                    BODY_TOP + POCKET_DEPTH
                } ${RIGHT},${BODY_TOP} ${RIGHT},${BOTTOM} ${LEFT},${BOTTOM}`}
                className={`fill-gold ${INK}`}
                strokeWidth={OUTLINE}
                strokeLinejoin="round"
            />
            <path
                d={`M ${LEFT + 1} ${BOTTOM - 1} L ${CENTER - 7} ${BODY_TOP + POCKET_DEPTH + 3} M ${RIGHT - 1} ${
                    BOTTOM - 1
                } L ${CENTER + 7} ${BODY_TOP + POCKET_DEPTH + 3}`}
                className={INK}
                strokeWidth={1.6}
                strokeLinecap="round"
                fill="none"
            />
            {!isOpen && (
                <polygon
                    points={`${LEFT},${BODY_TOP} ${CENTER},${flapTip} ${RIGHT},${BODY_TOP}`}
                    className={`fill-gold ${INK}`}
                    strokeWidth={OUTLINE}
                    strokeLinejoin="round"
                />
            )}
            <rect
                x={LEFT}
                y={BODY_TOP}
                width={RIGHT - LEFT}
                height={BOTTOM - BODY_TOP}
                rx={3}
                fill="none"
                className={INK}
                strokeWidth={OUTLINE}
            />
        </svg>
    )
}
