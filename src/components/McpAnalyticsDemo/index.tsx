import React, { useEffect, useState } from 'react'
import PlayOverlay from './PlayOverlay'

type VideoModule = typeof import('./Video')

// The engine touches browser globals when it loads, so it is imported only after mount; the server renders the placeholder.
export default function McpAnalyticsDemo({ className = '' }: { className?: string }): JSX.Element {
    const [mod, setMod] = useState<VideoModule | null>(null)

    useEffect(() => {
        void import('./Video').then(setMod, (error) => console.error('Could not load the video player', error))
    }, [])

    return mod ? (
        <mod.default className={className} />
    ) : (
        <div className={`@container relative aspect-video bg-black ${className}`}>
            <PlayOverlay />
        </div>
    )
}
