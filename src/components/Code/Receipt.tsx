import React from 'react'

// Deliberate skeuomorphic object: fixed paper/ink colors (like KeyBadge) so the
// receipt reads as a physical receipt in both light and dark mode.
export const RECEIPT_PAPER = '#f7f4ee'

// A torn/zigzag paper edge. Flush along the top, sawtooth teeth pointing down.
// preserveAspectRatio="none" stretches a fixed tooth count across the receipt width.
function TornEdge({ className = '' }: { className?: string }) {
    const width = 200
    const height = 12
    const teeth = 20
    const step = width / teeth
    let d = `M0 0 H${width}`
    for (let i = 0; i <= teeth; i++) {
        const x = (width - i * step).toFixed(1)
        const y = i % 2 === 0 ? height : 0
        d += ` L${x} ${y}`
    }
    d += ' Z'
    return (
        <svg
            className={className}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            aria-hidden
            focusable="false"
        >
            <path d={d} fill={RECEIPT_PAPER} />
        </svg>
    )
}

export interface ReceiptRow {
    label: string
    price?: string
}

interface ReceiptProps {
    /** Bold, letter-spaced title line, e.g. "TABLE STAKES 2026". A node, so a word can carry a strike-through. */
    title: React.ReactNode
    /** Small italic line under the title. */
    subtitle?: string
    rows: ReceiptRow[]
    totalLabel?: string
    total?: string
    /** Small muted line at the bottom, e.g. "thanks for shopping at agent mart". */
    footer?: string
    className?: string
}

/**
 * A paper till receipt with a torn bottom edge. Rows default to "$0.00" so the
 * punchline (everything on it is free) reads at a glance.
 */
export function Receipt({
    title,
    subtitle,
    rows,
    totalLabel = 'TOTAL',
    total = '$0.00',
    footer,
    className = 'rotate-1',
}: ReceiptProps) {
    return (
        <div className={`mx-auto w-full max-w-xs ${className}`}>
            <div
                className="font-code text-sm leading-relaxed shadow-2xl px-6 pt-6 pb-5 text-[#2b2b2b]"
                style={{ backgroundColor: RECEIPT_PAPER }}
            >
                <p className="m-0 text-center font-bold tracking-widest">{title}</p>
                {subtitle && <p className="m-0 mb-4 text-center text-xs italic text-[#8a8272]">{subtitle}</p>}

                <div className={`space-y-1 ${subtitle ? '' : 'mt-4'}`}>
                    {rows.map(({ label, price = '$0.00' }) => (
                        <div key={label} className="flex items-baseline justify-between gap-4">
                            <span>{label}</span>
                            <span className="whitespace-nowrap">{price}</span>
                        </div>
                    ))}
                </div>

                <div className="my-3 border-t border-dashed border-[#c9c2b4]" />

                <div className="flex items-baseline justify-between gap-4 font-bold">
                    <span>{totalLabel}</span>
                    <span className="whitespace-nowrap">{total}</span>
                </div>

                {footer && <p className="m-0 mt-4 text-center text-xs text-[#8a8272]">{footer}</p>}
            </div>
            <TornEdge className="w-full h-3" />
        </div>
    )
}
