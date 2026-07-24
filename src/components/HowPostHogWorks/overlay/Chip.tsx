import React from 'react'
import { PRODUCTS } from './products'
import { Annotation } from './types'

interface ChipProps {
    annotation: Annotation
    index: number
    dimmed: boolean
    registerDot: (el: HTMLElement | null) => void
    registerChip: (el: HTMLElement | null) => void
    onOpen: () => void
    onHoverChange: (hovering: boolean) => void
}

// One annotation = an anchored pulsing dot + a floating labeled chip. Both
// start hidden; the tracking loop positions and shows them each frame.
export default function Chip({
    annotation,
    index,
    dimmed,
    registerDot,
    registerChip,
    onOpen,
    onHoverChange,
}: ChipProps): JSX.Element {
    const product = PRODUCTS[annotation.product]

    return (
        <>
            <span
                ref={registerDot}
                className="hpw-anchor"
                style={{ background: product.color, color: product.color }}
                aria-hidden
            />
            <button
                ref={registerChip}
                data-hpw-chip
                className={`hpw-chip hpw-chip-in${dimmed ? ' dim' : ''}`}
                style={{ animationDelay: `${index * 40}ms` }}
                onAnimationEnd={(e) => {
                    // Only animate the entrance — without this, toggling
                    // display in the tracking loop would replay it.
                    e.currentTarget.style.animation = 'none'
                }}
                onClick={(e) => {
                    e.stopPropagation()
                    onOpen()
                }}
                onMouseEnter={() => onHoverChange(true)}
                onMouseLeave={() => onHoverChange(false)}
            >
                <span className="hpw-ic" style={{ background: product.color }} />
                <span className="hpw-lbl">{annotation.label}</span>
                <span className="hpw-ptag">{product.short}</span>
            </button>
        </>
    )
}
