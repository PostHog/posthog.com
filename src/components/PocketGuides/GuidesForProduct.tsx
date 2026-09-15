import React from 'react'

import { volumeForProduct } from '../../constants/pocketGuides'
import usePocketGuideCounts from '../../hooks/usePocketGuideCounts'
import VolumeCard from './VolumeCard'

interface GuidesForProductProps {
    /** Docs slug of the product, e.g. "ai-observability". Matched against `docsProduct` on a volume. */
    product: string
    /** Which docs page the card sits on, so the two entry points stay apart in `pocket_guide_interaction`. */
    placement?: 'product_docs' | 'product_index'
}

/** The pocket guide for one product, on its docs page. Renders nothing when the product has none. */
export default function GuidesForProduct({
    product,
    placement = 'product_docs',
}: GuidesForProductProps): JSX.Element | null {
    const volume = volumeForProduct(product)
    const counts = usePocketGuideCounts()

    // Most products have no volume – returning null is what makes this safe to drop on any page.
    if (!volume) {
        return null
    }

    return (
        <div className="not-prose">
            <VolumeCard volume={volume} count={counts[volume.id] ?? 0} placement={placement} />
        </div>
    )
}
