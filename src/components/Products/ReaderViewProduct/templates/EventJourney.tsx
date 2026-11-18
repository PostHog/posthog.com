import React from 'react'
import type { SectionComponentProps } from '../types'
import { SECTION_H2 } from '../helpers'

/**
 * A heading, a lede, and a short list of points, beside a placeholder box for
 * a future visualization. Reads `productData.eventJourney`.
 */
const EventJourney = ({ id, productData }: SectionComponentProps) => {
    const journey = productData?.eventJourney
    if (!journey) return null
    const points: React.ReactNode[] = journey.points ?? []

    return (
        <section
            id={id}
            className="scroll-mt-20 not-prose grid items-center gap-6 @3xl/reader-content:grid-cols-2 @3xl/reader-content:gap-10"
        >
            <div>
                <h2 className={SECTION_H2}>{journey.title}</h2>
                {journey.lede && <p className="m-0 mb-4 text-lg leading-relaxed text-secondary">{journey.lede}</p>}
                {points.length > 0 && (
                    <ul className="m-0 list-disc space-y-2 pl-6 text-lg leading-relaxed text-secondary">
                        {points.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                )}
            </div>

            {journey.placeholder && (
                <div className="flex min-h-[26rem] items-center justify-center rounded-md border-2 border-dashed border-primary bg-accent p-8 text-center">
                    <p className="m-0 max-w-xs text-lg font-semibold leading-snug text-secondary">
                        {journey.placeholder}
                    </p>
                </div>
            )}
        </section>
    )
}

export default EventJourney
