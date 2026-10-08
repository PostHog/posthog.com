import React from 'react'
import { WistiaPlayer } from '@wistia/wistia-player-react'

interface WistiaEmbedProps {
    mediaId: string
    aspectRatio?: number
    className?: string
    autoPlay?: boolean
    muted?: boolean
    controlsVisibleOnLoad?: boolean
    /** Video frame corners only — set via onApiReady; not forwarded as a React prop by @wistia/wistia-player-react */
    playerBorderRadius?: number
    /** Control bar corners only — independent of playerBorderRadius */
    controlBarBorderRadius?: number
    roundedPlayer?: number
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
    controlsVisibleOnLoad,
    playerBorderRadius,
    controlBarBorderRadius,
    roundedPlayer,
}: WistiaEmbedProps) {
    const handleApiReady = (event: CustomEvent) => {
        const player = event.target as {
            playerBorderRadius?: number
            controlBarBorderRadius?: number
        }

        if (playerBorderRadius !== undefined) {
            player.playerBorderRadius = playerBorderRadius
        }

        if (controlBarBorderRadius !== undefined) {
            player.controlBarBorderRadius = controlBarBorderRadius
        }
    }

    const shouldConfigureBorderRadius = playerBorderRadius !== undefined || controlBarBorderRadius !== undefined

    return (
        <WistiaPlayer
            mediaId={mediaId}
            aspect={aspectRatio}
            autoplay={autoPlay}
            muted={muted}
            className={className}
            controlsVisibleOnLoad={controlsVisibleOnLoad}
            roundedPlayer={roundedPlayer}
            onApiReady={shouldConfigureBorderRadius ? handleApiReady : undefined}
        />
    )
}
