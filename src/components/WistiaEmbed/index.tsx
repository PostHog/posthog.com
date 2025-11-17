import React from 'react'
import { WistiaPlayer } from '@wistia/wistia-player-react'

interface WistiaEmbedProps {
    mediaId: string
    aspectRatio?: number
    className?: string
    autoPlay?: boolean
    muted?: boolean
}

declare global {
    interface Window {
        Wistia?: any
    }
}

export default function WistiaEmbed({
    mediaId,
    aspectRatio = 1.7777777777777777, // 16:9 default
    className = '',
    autoPlay = false,
    muted = false,
}: WistiaEmbedProps) {
    return (
        <WistiaPlayer mediaId={mediaId} aspect={aspectRatio} autoplay={autoPlay} muted={muted} className={className} />
    )
}
