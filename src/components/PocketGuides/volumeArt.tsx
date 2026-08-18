import React from 'react'

import { HedgehogDataThief, HedgehogDirector, HedgehogImTheDriver } from '@posthog/brand/hoggies'

/**
 * One specimen per volume, so a new volume picks an existing hoggie instead of commissioning one.
 * Shared by the shelf cover and the volume's title page – the same character in both places is
 * what makes a book recognizable once it's off the shelf.
 */
export const VOLUME_ART: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    'self-driving': HedgehogImTheDriver,
    'data-warehouse': HedgehogDataThief,
    'session-replay': HedgehogDirector,
}

export function volumeArt(id?: string): React.ComponentType<{ size?: number; className?: string }> | undefined {
    return id ? VOLUME_ART[id] : undefined
}
