import React from 'react'

interface FigureProps {
    /** Explicit, not auto-numbered: a guide has 2–3 figures and the order is editorial. */
    number: number
    caption: string
    /** Extra lines under the caption, e.g. an annotation legend. */
    children: React.ReactNode
    legend?: React.ReactNode
}

/** A framed, numbered, captioned exhibit wrapping live components rather than screenshots. */
export default function Figure({ number, caption, legend, children }: FigureProps): JSX.Element {
    return (
        <figure className="not-prose my-6 mx-0">
            <div className="overflow-hidden rounded border border-primary bg-accent p-3 dark:bg-accent-dark @md:p-4">
                {children}
            </div>
            <figcaption className="mt-2 text-sm leading-snug text-secondary">
                {/* Orange, matching the in-text <SeeFig> cues – one color for all the
                    figure apparatus, so the cue and its target visibly pair up. */}
                <span className="text-xs font-bold uppercase tracking-wide text-orange">Fig. {number}</span> – {caption}
                {legend}
            </figcaption>
        </figure>
    )
}
