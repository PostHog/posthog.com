import { IconChevronDown } from '@posthog/icons'
import { CallToAction, TrackedCTA, child, container } from 'components/CallToAction'
import Link from 'components/Link'
import { Popover } from 'components/RadixUI/Popover'
import usePostHog from 'hooks/usePostHog'
import React from 'react'
import { DOWNLOAD_URL, PACKAGES, PLATFORMS, RELEASES_URL, useDetectedDevice } from './platforms'

interface DownloadButtonsProps {
    className?: string
    /** Horizontal alignment of the buttons. */
    align?: 'start' | 'center'
    size?: 'sm' | 'md'
}

/**
 * Reminder that every download link resolves to the latest release. Rendered
 * separately from the buttons so callers can give it the full width of their
 * section instead of squeezing it into a narrow column. Hidden on mobile, where
 * there are no download links for it to qualify.
 */
export function DownloadNote({ className = '' }: { className?: string }): JSX.Element | null {
    const { isMobile } = useDetectedDevice()
    if (isMobile) return null

    return (
        <p className={`m-0 text-sm text-secondary ${className}`}>
            These always grab the latest release, since older builds can behave unexpectedly.{' '}
            <Link to={RELEASES_URL} external>
                See what's new
            </Link>
        </p>
    )
}

/**
 * Primary "Download for <your OS>" button with a dropdown of every specific
 * build, plus a secondary link into the docs. Every link points at the download
 * worker, which always resolves to the latest published release.
 *
 * On phones and tablets there's nothing to download, so the docs become the
 * only call to action.
 */
export function DownloadButtons({ className = '', align = 'start', size = 'md' }: DownloadButtonsProps): JSX.Element {
    const posthog = usePostHog()
    const { platform, isMobile } = useDetectedDevice()
    const justify = align === 'center' ? 'justify-center' : ''

    if (isMobile) {
        return (
            <div className={className}>
                <div className={`flex flex-wrap items-center gap-2 ${justify}`}>
                    <CallToAction type="primary" size={size} to="/docs/posthog-desktop" state={{ newWindow: true }}>
                        Read the docs
                    </CallToAction>
                </div>
                <p className={`mt-3 mb-0 text-sm text-secondary ${align === 'center' ? 'text-center' : ''}`}>
                    PostHog Desktop is a desktop app – open this page on your computer to download it.
                </p>
            </div>
        )
    }

    const otherPlatforms = [...PLATFORMS, ...PACKAGES].filter((p) => p.key !== platform?.key)

    return (
        <div className={`flex flex-wrap items-center gap-2 ${justify} ${className}`}>
            {/* Primary download and the platform dropdown sit together so they read as one split button */}
            <div className="flex items-center gap-1">
                <TrackedCTA
                    event={{ name: 'clicked code download', platform: platform?.key || 'unknown' }}
                    type="primary"
                    size={size}
                    to={platform?.url || DOWNLOAD_URL}
                >
                    {platform ? `Download for ${platform.os}` : 'Download'}
                </TrackedCTA>

                <Popover
                    dataScheme="secondary"
                    align="start"
                    contentClassName="min-w-[13rem]"
                    trigger={
                        <button aria-label="Download for another platform" className={container('primary', size)}>
                            <span className={child('primary', 'auto', '!px-1.5 flex items-center', size)}>
                                <IconChevronDown className="size-4" />
                            </span>
                        </button>
                    }
                >
                    <ul className="m-0 list-none p-0 text-left">
                        {otherPlatforms.map((p) => (
                            <li key={p.key}>
                                <Link
                                    to={p.url}
                                    externalNoIcon
                                    className="block rounded px-2 py-1.5 text-sm !text-primary !no-underline hover:bg-accent"
                                    onClick={() => posthog?.capture('clicked code download', { platform: p.key })}
                                >
                                    {p.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Popover>
            </div>

            <CallToAction type="secondary" size={size} to="/docs/posthog-desktop" state={{ newWindow: true }}>
                Read the docs
            </CallToAction>
        </div>
    )
}
