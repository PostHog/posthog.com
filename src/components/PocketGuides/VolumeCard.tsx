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
        // Always stacked: side by side squeezed the copy at ordinary widths (#19713 review).
        // No `overflow-hidden`: the cover's hover tilt lifts a drop shadow that clipping would cut off.
        <div
            className={`flex flex-col items-center gap-6 rounded-md border border-primary p-6 text-center @md/reader-content:p-8 ${WINDOW_BG}`}
        >
            {/* Caps at 200px but shrinks into narrow cards, which `shrink-0` would not. */}
            <div className="w-full max-w-[200px]">
                <Cover volume={volume} count={count} placement={placement} />
            </div>
            <div className="max-w-xl">
                <p className="m-0 text-base font-bold text-primary">The pocket guide to {volume.title}</p>
                <p className="m-0 mt-2 text-base leading-relaxed text-secondary">{description ?? volume.description}</p>
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
