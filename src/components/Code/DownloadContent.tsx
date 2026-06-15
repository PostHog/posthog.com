import { CallToAction, TrackedCTA } from 'components/CallToAction'
import Link from 'components/Link'
import React, { useEffect, useState } from 'react'

const RELEASES_URL = 'https://github.com/PostHog/code/releases/latest'
const LATEST_API_URL = 'https://api.github.com/repos/PostHog/code/releases/latest'

const CACHE_KEY = 'posthog-code-latest-release'
const CACHE_TTL = 1000 * 60 * 60

type PlatformKey = 'mac-arm64' | 'mac-x64' | 'windows-x64' | 'linux-x64' | 'linux-arm64'

type Release = {
    version?: string
    platforms: Partial<Record<PlatformKey, string>>
}

type OS = 'mac' | 'windows' | 'linux' | 'unknown'
type Arch = 'arm64' | 'x64' | 'unknown'

const PLATFORM_LABELS: Record<PlatformKey, string> = {
    'mac-arm64': 'macOS (Apple Silicon)',
    'mac-x64': 'macOS (Intel)',
    'windows-x64': 'Windows',
    'linux-x64': 'Linux (x64)',
    'linux-arm64': 'Linux (Arm64)',
}

const ALL_PLATFORMS: PlatformKey[] = ['mac-arm64', 'mac-x64', 'windows-x64', 'linux-x64', 'linux-arm64']

const ASSET_MATCHERS: Array<[PlatformKey, (name: string) => boolean]> = [
    ['mac-arm64', (n) => n.endsWith('-arm64.dmg')],
    ['mac-x64', (n) => n.endsWith('-x64.dmg')],
    ['windows-x64', (n) => n.endsWith('.exe')],
    ['linux-x64', (n) => n.endsWith('-x64.AppImage')],
    ['linux-arm64', (n) => n.endsWith('-arm64.AppImage')],
]

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
    if (os === 'mac') return 'arm64'
    if (os === 'linux') return 'x64'
    return 'unknown'
}

function platformKey(os: OS, arch: Arch): PlatformKey | null {
    if (os === 'mac') return arch === 'x64' ? 'mac-x64' : 'mac-arm64'
    if (os === 'windows') return 'windows-x64'
    if (os === 'linux') return arch === 'arm64' ? 'linux-arm64' : 'linux-x64'
    return null
}

function parseRelease(data: any): Release {
    const assets: Array<{ name?: string; browser_download_url?: string }> = Array.isArray(data?.assets)
        ? data.assets
        : []
    const platforms: Partial<Record<PlatformKey, string>> = {}
    for (const [key, match] of ASSET_MATCHERS) {
        const asset = assets.find((a) => typeof a?.name === 'string' && match(a.name))
        if (asset?.browser_download_url) platforms[key] = asset.browser_download_url
    }
    const tag = typeof data?.tag_name === 'string' ? data.tag_name : undefined
    return { version: tag ? tag.replace(/^v/, '') : undefined, platforms }
}

async function loadRelease(): Promise<Release | null> {
    try {
        const cached = window.localStorage.getItem(CACHE_KEY)
        if (cached) {
            const parsed = JSON.parse(cached)
            if (parsed && typeof parsed.ts === 'number' && Date.now() - parsed.ts < CACHE_TTL) {
                return parsed.data as Release
            }
        }
    } catch {
        // ignore cache read errors
    }
    try {
        const res = await fetch(LATEST_API_URL, { headers: { Accept: 'application/vnd.github+json' } })
        if (!res.ok) return null
        const release = parseRelease(await res.json())
        try {
            window.localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: release }))
        } catch {
            // ignore cache write errors
        }
        return release
    } catch {
        return null
    }
}

export function DownloadContent({ className }: { className?: string }): JSX.Element {
    const [os, setOS] = useState<OS>('unknown')
    const [arch, setArch] = useState<Arch>('unknown')
    const [release, setRelease] = useState<Release | null>(null)

    useEffect(() => {
        const detectedOS = detectOS()
        setOS(detectedOS)
        detectArch(detectedOS).then(setArch)
        loadRelease().then(setRelease)
    }, [])

    const platforms = release?.platforms || {}
    const urlFor = (key: PlatformKey | null): string => (key && platforms[key]) || RELEASES_URL

    const primaryKey = platformKey(os, arch)
    const primaryUrl = urlFor(primaryKey)
    const primaryLabel = primaryKey ? `Download for ${PLATFORM_LABELS[primaryKey]}` : 'Download PostHog Code'

    const macAltKey: PlatformKey | null = os === 'mac' ? (primaryKey === 'mac-x64' ? 'mac-arm64' : 'mac-x64') : null

    const version = release?.version

    return (
        <div className={className}>
            <h1 className="text-3xl mb-3 !mt-0">Download PostHog Code</h1>
            <p className="mb-8 text-base leading-relaxed">
                We’ve picked the build that matches your device. Grab it below, or choose another platform.
            </p>

            <div className="flex flex-wrap gap-3 mb-3 justify-center">
                <TrackedCTA
                    event={{ name: 'clicked code download', platform: primaryKey || 'unknown', version }}
                    type="primary"
                    size="lg"
                    to={primaryUrl}
                >
                    {primaryLabel}
                </TrackedCTA>
                <CallToAction type="secondary" size="lg" to="/docs/posthog-code" state={{ newWindow: true }}>
                    Read the docs
                </CallToAction>
            </div>

            {macAltKey && (
                <p className="mb-8 text-sm text-secondary">
                    {primaryKey === 'mac-arm64' ? 'On an Intel Mac? ' : 'On an Apple Silicon Mac? '}
                    <Link to={urlFor(macAltKey)} external>
                        Download the {PLATFORM_LABELS[macAltKey]} build
                    </Link>
                </p>
            )}

            <div className="mt-12">
                <p className="mb-4 text-sm text-secondary uppercase tracking-wide">All platforms</p>
                <div className="flex flex-wrap gap-2 justify-center">
                    {ALL_PLATFORMS.map((key) => (
                        <TrackedCTA
                            key={key}
                            event={{ name: 'clicked code download', platform: key, version }}
                            type="secondary"
                            size="sm"
                            to={urlFor(key)}
                        >
                            {PLATFORM_LABELS[key]}
                        </TrackedCTA>
                    ))}
                </div>
                <p className="mt-6 text-sm text-secondary">
                    {version ? `Latest release: v${version}. ` : ''}
                    <Link to={RELEASES_URL} external>
                        View all releases and notes
                    </Link>
                </p>
            </div>
        </div>
    )
}
