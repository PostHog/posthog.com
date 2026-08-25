import { CallToAction } from 'components/CallToAction'
import React from 'react'

import { WINDOW_BG } from '../../constants/frostedSurfaces'
import type { PocketGuideVolume } from '../../constants/pocketGuides'
import Cover from './Cover'

interface VolumeCardProps {
    volume: PocketGuideVolume
    /** Guides printed on the cover. Callers count them, because the sources differ per surface. */
    count: number
    /** Which surface this card sits on. Forwarded to `Cover` so every open is attributable. */
    placement: 'shelf' | 'self_driving_page' | 'product_docs'
    /** The pitch. Defaults to the volume's own one-liner. */
    description?: React.ReactNode
    /** Where the button goes. Defaults to the volume itself. */
    to?: string
    ctaLabel?: string
}

/** One volume pitched as a card: cover, pitch, button. Shared by the docs pages and `/self-driving`. */
export default function VolumeCard({
    volume,
    count,
    placement,
    description,
    to,
    ctaLabel = 'Read the pocket guide',
}: VolumeCardProps): JSX.Element {
    return (
        // No `overflow-hidden`: the cover's hover tilt lifts a drop shadow that clipping would cut off.
        <div
            className={`flex flex-col items-center gap-8 rounded-md border border-primary p-6 @md/reader-content:flex-row @md/reader-content:items-start @md/reader-content:p-8 ${WINDOW_BG}`}
        >
            <div className="w-[200px] shrink-0">
                <Cover volume={volume} count={count} placement={placement} />
            </div>
            <div className="min-w-0">
                <p className="m-0 text-base font-bold text-primary">The pocket guide to {volume.title}</p>
                <p className="m-0 mt-2 max-w-xl text-base leading-relaxed text-secondary">
                    {description ?? volume.description}
                </p>
                <CallToAction
                    to={to ?? `/pocket-guides/${volume.id}`}
                    state={{ newWindow: true }}
                    type="secondary"
                    size="md"
                    className="mt-4"
                >
                    {ctaLabel}
                </CallToAction>
            </div>
        </div>
    )
}
