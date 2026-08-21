import { useEffect, useState } from 'react'

export const DOWNLOAD_URL = 'https://code.posthog.com/download'
// Desktop ships from the PostHog monorepo under `desktop-v*` tags, interleaved
// with agent-skills and posthog-cli releases, so `?q=desktop` narrows the list to
// ours. Two ways to get this wrong: `/releases/latest` resolves to whichever
// component shipped most recently rather than to desktop, and `?q=desktop-v`
// matches nothing at all because the search doesn't handle the hyphen. The old
// PostHog/code repo is archived, so it is not an option either.
export const RELEASES_URL = 'https://github.com/PostHog/posthog/releases?q=desktop&expanded=true'

type OS = 'mac' | 'windows' | 'linux' | 'unknown'
type Arch = 'arm64' | 'x64' | 'unknown'

// code.posthog.com is a Cloudflare Worker that redirects to the matching asset
// on the latest published release. Arch is detected client-side and passed as
// an explicit path because browsers don't send the Sec-CH-UA-Arch hint on
// cross-origin navigation, so the worker can't tell an Intel Mac from Apple
// Silicon on its own.
// `label` names the exact build (used in the platform dropdown); `os` is the short
// form the primary button uses, so it stays a button rather than a paragraph.
export const PLATFORMS = [
    { key: 'mac-arm64', os: 'macOS', label: 'macOS (Apple Silicon)', url: `${DOWNLOAD_URL}/mac/arm64` },
    { key: 'mac-x64', os: 'macOS', label: 'macOS (Intel)', url: `${DOWNLOAD_URL}/mac/intel` },
    { key: 'windows-x64', os: 'Windows', label: 'Windows', url: `${DOWNLOAD_URL}/windows` },
    { key: 'linux-x64', os: 'Linux', label: 'Linux (x64)', url: `${DOWNLOAD_URL}/linux/x64` },
    { key: 'linux-arm64', os: 'Linux', label: 'Linux (Arm64)', url: `${DOWNLOAD_URL}/linux/arm64` },
] as const

// Linux package builds, offered alongside the plain binaries but never auto-detected.
export const PACKAGES = [
    { key: 'linux-deb', label: 'Linux (.deb)', url: `${DOWNLOAD_URL}/linux/deb` },
    { key: 'linux-rpm', label: 'Linux (.rpm)', url: `${DOWNLOAD_URL}/linux/rpm` },
] as const

export type Platform = (typeof PLATFORMS)[number]
export type PlatformKey = Platform['key']

export function getPlatform(key: PlatformKey): Platform {
    return PLATFORMS.find((p) => p.key === key) as Platform
}

function detectIsMobile(): boolean {
    if (typeof navigator === 'undefined') return false

    const uaData = (navigator as any)?.userAgentData
    const ua = (navigator.userAgent || (navigator as any).vendor || '').toLowerCase()

    // iPadOS reports a desktop Mac user agent, so touch points are what give it away.
    return (
        uaData?.mobile === true ||
        /android|iphone|ipad|ipod|windows phone/i.test(ua) ||
        (/mac/i.test(ua) && typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1)
    )
}

function detectOS(): OS {
    if (typeof navigator === 'undefined' || detectIsMobile()) return 'unknown'

    const uaData = (navigator as any)?.userAgentData
    const ua = (navigator.userAgent || (navigator as any).vendor || '').toLowerCase()
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

export interface DetectedDevice {
    /** The build matching this device, or `null` if we can't confidently match one. */
    platform: Platform | null
    /** Phones and tablets, which can't run PostHog Desktop at all. */
    isMobile: boolean
}

/**
 * What the visitor is browsing on. During SSR this reports no platform and not
 * mobile, so the server-rendered markup is the neutral "pick a platform" state.
 */
export function useDetectedDevice(): DetectedDevice {
    const [os, setOS] = useState<OS>('unknown')
    const [arch, setArch] = useState<Arch>('unknown')
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const detected = detectOS()
        setOS(detected)
        setIsMobile(detectIsMobile())
        detectArch(detected).then(setArch)
    }, [])

    const key: PlatformKey | null =
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

    return { platform: key ? getPlatform(key) : null, isMobile }
}
