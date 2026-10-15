import React from 'react'

interface FigureProps {
    /** Explicit, not auto-numbered: a guide has 2–3 figures and the order is editorial. */
    number?: number
    caption?: string
    /** Extra lines under the caption, e.g. an annotation legend. */
    children: React.ReactNode
    legend?: React.ReactNode
}

/** A framed exhibit wrapping live components rather than screenshots. */
export default function Figure({ number, caption, legend, children }: FigureProps): JSX.Element {
    return (
        <figure className="not-prose pocket-guide-exhibit">
            <div className="pocket-guide-panel">{children}</div>
            {caption && (
                <figcaption className="pocket-guide-exhibit__caption">
                    <span className="pocket-guide-exhibit__number">Fig. {number}</span> – {caption}
                    {legend}
                </figcaption>
            )}
        </figure>
    )
}
