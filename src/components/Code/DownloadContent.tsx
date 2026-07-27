import { CallToAction, TrackedCTA } from 'components/CallToAction'
import Link from 'components/Link'
import React, { useEffect, useState } from 'react'

const DOWNLOAD_URL = 'https://code.posthog.com/download'
const RELEASES_URL = 'https://github.com/PostHog/code/releases/latest'

type OS = 'mac' | 'windows' | 'linux' | 'unknown'
type Arch = 'arm64' | 'x64' | 'unknown'

// code.posthog.com is a Cloudflare Worker that redirects to the matching asset
// on the latest published release. Arch is detected client-side and passed as
// an explicit path because browsers don't send the Sec-CH-UA-Arch hint on
// cross-origin navigation, so the worker can't tell an Intel Mac from Apple
// Silicon on its own.
const PLATFORMS = [
    { key: 'mac-arm64', label: 'macOS (Apple Silicon)', url: `${DOWNLOAD_URL}/mac/arm64` },
    { key: 'mac-x64', label: 'macOS (Intel)', url: `${DOWNLOAD_URL}/mac/intel` },
    { key: 'windows-x64', label: 'Windows', url: `${DOWNLOAD_URL}/windows` },
    { key: 'linux-x64', label: 'Linux (x64)', url: `${DOWNLOAD_URL}/linux/x64` },
    { key: 'linux-arm64', label: 'Linux (Arm64)', url: `${DOWNLOAD_URL}/linux/arm64` },
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

async function detectArch(os: OS): Promise<Arch> {
    try {
        const uaData = (navigator as any)?.userAgentData
        if (uaData?.getHighEntropyValues) {
            const { architecture } = await uaData.getHighEntropyValues(['architecture'])
            if (architecture === 'arm') return 'arm64'
            if (architecture === 'x86') return 'x64'
        }
    } catch {
        // ignore — fall through to defaults
    }
    if (os === 'linux') {
        const ua = (navigator.userAgent || '').toLowerCase()
        return ua.includes('aarch64') || ua.includes('arm64') ? 'arm64' : 'x64'
    }
    return 'unknown'
}

export function DownloadContent({ className }: { className?: string }): JSX.Element {
    const [os, setOS] = useState<OS>('unknown')
    const [arch, setArch] = useState<Arch>('unknown')

    useEffect(() => {
        const detected = detectOS()
        setOS(detected)
        detectArch(detected).then(setArch)
    }, [])

    const primaryKey: PlatformKey | null =
        os === 'mac'
            ? arch === 'x64'
                ? 'mac-x64'
                : 'mac-arm64'
            : os === 'windows'
            ? 'windows-x64'
            : os === 'linux'
            ? arch === 'arm64'
                ? 'linux-arm64'
                : 'linux-x64'
            : null
    const primary = primaryKey ? getPlatform(primaryKey) : null
    const macAlt = os === 'mac' ? getPlatform(primaryKey === 'mac-x64' ? 'mac-arm64' : 'mac-x64') : null

    return (
        <div className={className}>
            <h1 className="text-3xl mb-3 !mt-0">Download PostHog Desktop</h1>
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
                    {primary ? `Download for ${primary.label}` : 'Download PostHog Desktop'}
                </TrackedCTA>
                <CallToAction type="secondary" size="lg" to="/docs/posthog-desktop" state={{ newWindow: true }}>
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
                    Linux builds are also available as a{' '}
                    <Link to={`${DOWNLOAD_URL}/linux/deb`} external>
                        .deb
                    </Link>{' '}
                    or{' '}
                    <Link to={`${DOWNLOAD_URL}/linux/rpm`} external>
                        .rpm
                    </Link>
                    .
                </p>
                <p className="mt-2 text-sm text-secondary">
                    <Link to={RELEASES_URL} external>
                        View all releases and notes
                    </Link>
                </p>
            </div>
        </div>
    )
}
