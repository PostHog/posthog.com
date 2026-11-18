import React from 'react'

import {
    HedgehogConstruction,
    HedgehogTrenchcoat,
    HedgehogDirector,
    HedgehogDollHouse,
    HedgehogImTheDriver,
    HedgehogPanic,
    HedgehogTrafficController,
    HedgehogXRay,
} from '@posthog/brand/hoggies'

/** The hedgehog carrying a pipe, as on the Data Pipelines product page. */
const HedgehogCarryingPipe = (props: { size?: number; className?: string }) => (
    <HedgehogConstruction variant="2" {...props} />
)

/**
 * One specimen per volume, so a new volume picks an existing hoggie instead of commissioning one.
 * Shared by the shelf cover and the volume's title page – the same character in both places is
 * what makes a book recognizable once it's off the shelf.
 */
export const VOLUME_ART: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    'product-analytics': HedgehogTrenchcoat,
    'self-driving': HedgehogImTheDriver,
    'ai-observability': HedgehogXRay,
    'data-stack': HedgehogDollHouse,
    'session-replay': HedgehogDirector,
    'error-tracking': HedgehogPanic,
    'feature-flags': HedgehogTrafficController,
}

/** Art for volumes that aren't written yet, keyed by the id they will take. Drawn on their coming-soon covers. */
const UPCOMING_VOLUME_ART: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    'data-pipelines': HedgehogCarryingPipe,
}

export function volumeArt(id?: string): React.ComponentType<{ size?: number; className?: string }> | undefined {
    return id ? VOLUME_ART[id] ?? UPCOMING_VOLUME_ART[id] : undefined
}
