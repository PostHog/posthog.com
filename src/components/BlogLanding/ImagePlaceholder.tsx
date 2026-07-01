import React from 'react'
import { IconImage } from '@posthog/icons'

/**
 * A neutral placeholder for an image slot that has no source yet (e.g. the hedgehog art to be
 * dropped in later). Fills its parent; give the parent the desired aspect ratio.
 */
export default function ImagePlaceholder({ label = 'Image coming soon' }: { label?: string }) {
    return (
        <div className="w-full h-full bg-accent border border-dashed border-primary flex flex-col items-center justify-center gap-1 text-secondary">
            <IconImage className="size-8 opacity-60" />
            <span className="text-xs">{label}</span>
        </div>
    )
}
