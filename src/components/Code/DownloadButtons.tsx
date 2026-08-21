import { IconChevronDown } from '@posthog/icons'
import { CallToAction, TrackedCTA, child, container } from 'components/CallToAction'
import Link from 'components/Link'
import { Popover } from 'components/RadixUI/Popover'
import usePostHog from 'hooks/usePostHog'
import React from 'react'
import { DOWNLOAD_URL, PACKAGES, PLATFORMS, RELEASES_URL, useDetectedPlatform } from './platforms'

interface DownloadButtonsProps {
    className?: string
    /** Horizontal alignment of the buttons and the supporting copy. */
    align?: 'start' | 'center'
    size?: 'md' | 'lg'
}

/**
 * Primary "Download for <your platform>" button with a dropdown of every other
 * platform, plus a secondary link into the docs. Every link points at the
 * download worker, which always resolves to the latest published release.
 */
export function DownloadButtons({ className = '', align = 'start', size = 'lg' }: DownloadButtonsProps): JSX.Element {
    const posthog = usePostHog()
    const detected = useDetectedPlatform()
    const otherPlatforms = [...PLATFORMS, ...PACKAGES].filter((p) => p.key !== detected?.key)

    return (
        <div className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
            <div className={`flex flex-wrap items-start gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
                {/* Primary download and the platform dropdown sit together so they read as one split button */}
                <div className="flex items-start gap-1">
                    <TrackedCTA
                        event={{ name: 'clicked code download', platform: detected?.key || 'unknown' }}
                        type="primary"
                        size={size}
                        to={detected?.url || DOWNLOAD_URL}
                    >
                        {detected ? `Download for ${detected.label}` : 'Download PostHog Desktop'}
                    </TrackedCTA>

                    <Popover
                        dataScheme="secondary"
                        align="start"
                        contentClassName="min-w-[15rem]"
                        trigger={
                            <button aria-label="Download for another platform" className={container('primary', size)}>
                                <span className={child('primary', 'auto', '!px-2 flex items-center', size)}>
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

            <p className="mt-4 mb-0 text-sm text-secondary">
                These always grab the latest release – start there, since older builds can behave unexpectedly.{' '}
                <Link to={RELEASES_URL} external>
                    See what's new
                </Link>
                .
            </p>
        </div>
    )
}
