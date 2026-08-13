import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import Tooltip from 'components/RadixUI/Tooltip'

import usePostHog from '../../hooks/usePostHog'

/**
 * The book's figure annotations, in one place: the numbered dot every figure draws, the
 * interactive marker that opens a gloss, and the key those glosses print as on narrow
 * readers. Anything annotating a figure – an anatomy diagram, an annotated screenshot,
 * the inbox exhibit – draws from here, so the apparatus reads the same across volumes.
 */

/** The dot itself. Presentational, so a figure can place a number without a gloss. */
export function MarkerChip({
    n,
    size = 'md',
    className = '',
    ...rest
}: {
    n: number
    /** `sm` sits inline in body text; `md` overlays a figure. */
    size?: 'sm' | 'md'
    className?: string
} & React.HTMLAttributes<HTMLSpanElement>): JSX.Element {
    const sizeClasses = size === 'sm' ? 'size-4 text-[10px]' : 'size-5 text-[11px]'
    return (
        <span
            className={`inline-flex shrink-0 select-none items-center justify-center rounded-full bg-orange font-bold leading-none text-white ${sizeClasses} ${className}`}
            {...rest}
        >
            {n}
        </span>
    )
}

export interface FigureGloss {
    n: number
    label: string
    gloss: string
}

type RegisterGloss = (gloss: FigureGloss) => () => void

const FigureGlossContext = createContext<RegisterGloss | null>(null)

/** Register a marker's gloss with the enclosing figure. No-op outside a figure. */
function useRegisterFigureGloss(n: number, label: string, gloss: string): void {
    const register = useContext(FigureGlossContext)
    useEffect(() => register?.({ n, label, gloss }), [register, n, label, gloss])
}

export function useFigureGlossCollector(): { register: RegisterGloss; glosses: FigureGloss[] } {
    const [glosses, setGlosses] = useState<FigureGloss[]>([])
    const register = useCallback<RegisterGloss>((gloss) => {
        setGlosses((prev) => [...prev.filter((g) => g.n !== gloss.n), gloss])
        return () => setGlosses((prev) => prev.filter((g) => g.n !== gloss.n))
    }, [])
    return { register, glosses }
}

export const FigureGlossProvider = FigureGlossContext.Provider

/**
 * A numbered annotation: opens its gloss on hover or tap, and registers the gloss with the
 * enclosing figure so narrow readers get it as a printed key instead (no hover on touch).
 *
 * `visibility` defaults to the anatomy figures' hover-reveal on wide readers – the reader
 * wrapper supplies the wide-only hiding, so narrow readers always see the numbers the key
 * refers to. Pass 'always' for markers that anchor a spot on an image, where a marker
 * hidden until hover would leave nothing to find at any width.
 */
export function FigureMarker({
    n,
    label,
    gloss,
    visibility = 'on-figure-hover',
}: {
    n: number
    label: string
    gloss: string
    visibility?: 'on-figure-hover' | 'always'
}): JSX.Element {
    const [open, setOpen] = useState(false)
    const posthog = usePostHog()
    useRegisterFigureGloss(n, label, gloss)
    const onOpenChange = (next: boolean) => {
        setOpen(next)
        if (next) {
            posthog?.capture('pocket_guide_interaction', { kind: 'marker_gloss', marker: label })
        }
    }
    // No baked opacity-0: the wide-reader hover-reveal comes from the reader wrapper's
    // `@2xl:[&_.anatomy-marker]:opacity-0`, which group-hover and focus outrank.
    const visibilityClasses =
        visibility === 'on-figure-hover'
            ? 'anatomy-marker transition-opacity duration-200 focus-visible:!opacity-100 group-hover/anatomy:opacity-100'
            : ''
    return (
        <Tooltip
            delay={100}
            sideOffset={4}
            open={open}
            onOpenChange={onOpenChange}
            contentClassName="max-w-[16rem] whitespace-normal text-left text-sm leading-snug"
            trigger={
                <button
                    type="button"
                    onClick={() => onOpenChange(!open)}
                    aria-label={`${n}. ${label} – ${gloss}`}
                    className={`inline-flex size-4 shrink-0 cursor-help select-none items-center justify-center rounded-full bg-orange align-middle font-bold leading-none text-white ${visibilityClasses}`}
                >
                    <span className="text-[10px]">{n}</span>
                </button>
            }
        >
            <span className="font-bold">{label}</span> – {gloss}
        </Tooltip>
    )
}

/**
 * The narrow-reader key: every registered gloss, numbered to match the markers on the
 * figure. Hidden at @2xl, where hovering the markers does this job in place.
 */
export function FigureGlossKey({ glosses }: { glosses: FigureGloss[] }): JSX.Element | null {
    if (glosses.length === 0) {
        return null
    }
    const sorted = [...glosses].sort((a, b) => a.n - b.n)
    return (
        <ul className="m-0 mt-3 list-none space-y-1.5 border-t border-primary p-0 pt-3 text-sm leading-snug text-secondary @2xl:hidden">
            {sorted.map(({ n, label, gloss }) => (
                <li key={n} className="flex items-start gap-2">
                    <MarkerChip n={n} size="sm" className="mt-0.5" />
                    <span>
                        <span className="font-bold text-primary">{label}</span>
                        {gloss ? <> – {gloss}</> : null}
                    </span>
                </li>
            ))}
        </ul>
    )
}
