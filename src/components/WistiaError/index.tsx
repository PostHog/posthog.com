import React from 'react'
import { IconWarning, IconRefresh, IconExternal } from '@posthog/icons'
import OSButton from 'components/OSButton'

interface WistiaErrorProps {
    videoId: string
    onRetry: () => void
    className?: string
}

/**
 * Shared fallback shown when a Wistia embed fails to load (script blocked or
 * the player never reports ready). Replaces the eternal loading spinner with a
 * recoverable error state: a retry action and a direct link to the video.
 *
 * Rendered as an absolutely-positioned overlay so it can sit on top of the
 * embed container in any of the Wistia player components.
 */
export default function WistiaError({ videoId, onRetry, className = '' }: WistiaErrorProps): JSX.Element {
    return (
        <div
            data-scheme="primary"
            className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-primary text-center p-6 ${className}`}
        >
            <IconWarning className="size-8 text-secondary" />
            <div className="flex flex-col gap-1">
                <p className="text-[15px] font-semibold text-primary m-0">This video didn't load</p>
                <p className="text-sm text-secondary m-0 max-w-xs">
                    It may have been blocked by an ad blocker or a slow connection.
                </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
                <OSButton variant="secondary" size="md" icon={<IconRefresh />} onClick={onRetry}>
                    Try again
                </OSButton>
                <OSButton
                    variant="default"
                    size="md"
                    icon={<IconExternal />}
                    to={`https://fast.wistia.net/embed/iframe/${videoId}`}
                    external
                >
                    Watch the video
                </OSButton>
            </div>
        </div>
    )
}
