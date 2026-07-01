import { CallToAction, TrackedCTA } from 'components/CallToAction'
import Link from 'components/Link'
import React, { useEffect, useState } from 'react'

const DOWNLOAD_URL = 'https://code.posthog.com/download'
const RELEASES_URL = 'https://github.com/PostHog/code/releases/latest'

type OS = 'mac' | 'windows' | 'linux' | 'unknown'
type MacArch = 'arm64' | 'x64'

// code.posthog.com serves the latest build published to the auto-update server.
// It only covers Apple Silicon and Windows today; Intel Mac and Linux link to
// the GitHub release assets because the worker bounces unsupported platforms
// back to /code.
const PLATFORMS = [
    { key: 'mac-arm64', label: 'macOS (Apple Silicon)', url: `${DOWNLOAD_URL}/mac` },
    { key: 'mac-x64', label: 'macOS (Intel)', url: RELEASES_URL },
    { key: 'windows-x64', label: 'Windows', url: `${DOWNLOAD_URL}/windows` },
    { key: 'linux', label: 'Linux', url: RELEASES_URL },
] as const

type Platform = (typeof PLATFORMS)[number]
type PlatformKey = Platform['key']

function getPlatform(key: PlatformKey): Platform {
    return PLATFORMS.find((p) => p.key === key) as Platform
}

function detectOS(): OS {
    if (typeof navigator === 'undefined') return 'unknown'

    const uaData = (navigator as any)?.userAgentData
    const ua = (navigator.userAgent || (navigator as any).vendor || '').toLowerCase()

    const isMobile =
        uaData?.mobile === true ||
        /android|iphone|ipad|ipod|windows phone/i.test(ua) ||
        (/mac/i.test(ua) && typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1)
    if (isMobile) return 'unknown'

    const platform = (uaData?.platform || navigator.platform || '').toLowerCase()
    if (platform.includes('mac') || ua.includes('mac')) return 'mac'
    if (platform.includes('win') || ua.includes('win')) return 'windows'
    if (platform.includes('linux') || ua.includes('linux') || ua.includes('x11')) return 'linux'
    return 'unknown'
}

async function detectMacArch(): Promise<MacArch> {
    try {
        const uaData = (navigator as any)?.userAgentData
        if (uaData?.getHighEntropyValues) {
            const { architecture } = await uaData.getHighEntropyValues(['architecture'])
            if (architecture === 'x86') return 'x64'
        }
    } catch {
        // ignore — assume Apple Silicon
    }
    return 'arm64'
}

export function DownloadContent({ className }: { className?: string }): JSX.Element {
    const [os, setOS] = useState<OS>('unknown')
    const [macArch, setMacArch] = useState<MacArch>('arm64')

    useEffect(() => {
        const detected = detectOS()
        setOS(detected)
        if (detected === 'mac') detectMacArch().then(setMacArch)
    }, [])

    const primaryKey: PlatformKey | null =
        os === 'mac'
            ? macArch === 'x64'
                ? 'mac-x64'
                : 'mac-arm64'
            : os === 'windows'
            ? 'windows-x64'
            : os === 'linux'
            ? 'linux'
            : null
    const primary = primaryKey ? getPlatform(primaryKey) : null
    const macAlt = os === 'mac' ? getPlatform(macArch === 'x64' ? 'mac-arm64' : 'mac-x64') : null

    return (
        <div className={className}>
            <h1 className="text-3xl mb-3 !mt-0">Download PostHog Code</h1>
            <p className="mb-8 text-base leading-relaxed">
                We’ve picked the build that matches your device. Grab it below, or choose another platform.
            </p>

            <div className="flex flex-wrap gap-3 mb-3 justify-center">
                <TrackedCTA
                    event={{ name: 'clicked code download', platform: primary?.key || 'unknown' }}
                    type="primary"
                    size="lg"
                    to={primary?.url || DOWNLOAD_URL}
                >
                    {primary ? `Download for ${primary.label}` : 'Download PostHog Code'}
                </TrackedCTA>
                <CallToAction type="secondary" size="lg" to="/docs/posthog-code" state={{ newWindow: true }}>
                    Read the docs
                </CallToAction>
            </div>

            {macAlt && (
                <p className="mb-8 text-sm text-secondary">
                    {macAlt.key === 'mac-x64' ? 'On an Intel Mac? ' : 'On an Apple Silicon Mac? '}
                    <Link to={macAlt.url} external>
                        Download the {macAlt.label} build
                    </Link>
                </p>
            )}

            <div className="mt-12">
                <p className="mb-4 text-sm text-secondary uppercase tracking-wide">All platforms</p>
                <div className="flex flex-wrap gap-2 justify-center">
                    {PLATFORMS.map((p) => (
                        <TrackedCTA
                            key={p.key}
                            event={{ name: 'clicked code download', platform: p.key }}
                            type="secondary"
                            size="sm"
                            to={p.url}
                        >
                            {p.label}
                        </TrackedCTA>
                    ))}
                </div>
                <p className="mt-6 text-sm text-secondary">
                    <Link to={RELEASES_URL} external>
                        View all releases and notes
                    </Link>
                </p>
            </div>
        </div>
    )
}
