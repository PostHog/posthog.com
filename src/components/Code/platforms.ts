import { useEffect, useState } from 'react'

export const DOWNLOAD_URL = 'https://code.posthog.com/download'
export const RELEASES_URL = 'https://github.com/PostHog/code/releases/latest'

type OS = 'mac' | 'windows' | 'linux' | 'unknown'
type Arch = 'arm64' | 'x64' | 'unknown'

// code.posthog.com is a Cloudflare Worker that redirects to the matching asset
// on the latest published release. Arch is detected client-side and passed as
// an explicit path because browsers don't send the Sec-CH-UA-Arch hint on
// cross-origin navigation, so the worker can't tell an Intel Mac from Apple
// Silicon on its own.
export const PLATFORMS = [
    { key: 'mac-arm64', label: 'macOS (Apple Silicon)', url: `${DOWNLOAD_URL}/mac/arm64` },
    { key: 'mac-x64', label: 'macOS (Intel)', url: `${DOWNLOAD_URL}/mac/intel` },
    { key: 'windows-x64', label: 'Windows', url: `${DOWNLOAD_URL}/windows` },
    { key: 'linux-x64', label: 'Linux (x64)', url: `${DOWNLOAD_URL}/linux/x64` },
    { key: 'linux-arm64', label: 'Linux (Arm64)', url: `${DOWNLOAD_URL}/linux/arm64` },
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

/**
 * The build matching the visitor's device, or `null` during SSR and on any
 * device we can't confidently match (mobile, unrecognized user agents).
 */
export function useDetectedPlatform(): Platform | null {
    const [os, setOS] = useState<OS>('unknown')
    const [arch, setArch] = useState<Arch>('unknown')

    useEffect(() => {
        const detected = detectOS()
        setOS(detected)
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

    return key ? getPlatform(key) : null
}
