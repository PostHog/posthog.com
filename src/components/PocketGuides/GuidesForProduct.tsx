import { CallToAction } from 'components/CallToAction'
import React from 'react'

import { WINDOW_BG } from '../../constants/frostedSurfaces'
import { volumeForProduct } from '../../constants/pocketGuides'
import usePocketGuideCounts from '../../hooks/usePocketGuideCounts'
import Cover from './Cover'

interface GuidesForProductProps {
    /** Docs slug of the product, e.g. "ai-observability". Matched against `docsProduct` on a volume. */
    product: string
    /** Optional heading. Omit it when the surrounding block already has one, e.g. a `QuestLogItem`. */
    heading?: string
}

/** The pocket guide for one product, on its docs page. Renders nothing when the product has none. */
export default function GuidesForProduct({ product, heading }: GuidesForProductProps): JSX.Element | null {
    const volume = volumeForProduct(product)
    const counts = usePocketGuideCounts()

    // Most products have no volume – returning null is what makes this safe to drop on any page.
    if (!volume) {
        return null
    }

    return (
        <div className={`not-prose ${heading ? 'my-12' : ''}`}>
            {heading && <h3 className="my-6 text-2xl font-bold @md/reader-content:text-3xl">{heading}</h3>}
            <div
                className={`flex flex-col items-center gap-8 rounded-md border border-primary p-6 @md/reader-content:flex-row @md/reader-content:items-start @md/reader-content:p-8 ${WINDOW_BG}`}
            >
                <div className="w-[200px] shrink-0">
                    <Cover volume={volume} count={counts[volume.id] ?? 0} />
                </div>
                <div className="min-w-0">
                    <p className="m-0 text-base font-bold text-primary">The pocket guide to {volume.title}</p>
                    <p className="m-0 mt-2 max-w-xl text-base leading-relaxed text-secondary">{volume.description}</p>
                    <CallToAction
                        to={`/pocket-guides/${volume.id}`}
                        state={{ newWindow: true }}
                        type="secondary"
                        size="md"
                        className="mt-4"
                    >
                        Read the pocket guide
                    </CallToAction>
                </div>
            </div>
        </div>
    )
}
