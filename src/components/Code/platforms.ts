import { useEffect, useState } from 'react'

export const DOWNLOAD_URL = 'https://desktop.posthog.com/download'
export const RELEASES_URL = 'https://posthog.com/desktop/releases'

type OS = 'mac' | 'windows' | 'linux' | 'unknown'
type Arch = 'arm64' | 'x64' | 'unknown'

interface UserAgentData {
    mobile: boolean
    platform: string
    getHighEntropyValues?: (hints: string[]) => Promise<{ architecture?: string }>
}

type NavigatorWithUserAgentData = Navigator & { userAgentData?: UserAgentData }

const getUserAgentData = (): UserAgentData | undefined => (navigator as NavigatorWithUserAgentData).userAgentData

export const PLATFORMS = [
    { key: 'mac-arm64', os: 'macOS', label: 'macOS (Apple Silicon)', url: `${DOWNLOAD_URL}/mac/arm64` },
    { key: 'mac-x64', os: 'macOS', label: 'macOS (Intel)', url: `${DOWNLOAD_URL}/mac/intel` },
    { key: 'windows-x64', os: 'Windows', label: 'Windows', url: `${DOWNLOAD_URL}/windows` },
    { key: 'linux-x64', os: 'Linux', label: 'Linux (x64)', url: `${DOWNLOAD_URL}/linux/x64` },
    { key: 'linux-arm64', os: 'Linux', label: 'Linux (Arm64)', url: `${DOWNLOAD_URL}/linux/arm64` },
] as const

export const PACKAGES = [
    { key: 'linux-deb-x64', label: 'Linux x64 (.deb)', arch: 'x64', url: `${DOWNLOAD_URL}/linux/deb/x64` },
    {
        key: 'linux-deb-arm64',
        label: 'Linux Arm64 (.deb)',
        arch: 'arm64',
        url: `${DOWNLOAD_URL}/linux/deb/arm64`,
    },
    { key: 'linux-rpm-x64', label: 'Linux x64 (.rpm)', arch: 'x64', url: `${DOWNLOAD_URL}/linux/rpm/x64` },
    {
        key: 'linux-rpm-arm64',
        label: 'Linux Arm64 (.rpm)',
        arch: 'arm64',
        url: `${DOWNLOAD_URL}/linux/rpm/arm64`,
    },
] as const

export type Platform = (typeof PLATFORMS)[number]
export type PlatformKey = Platform['key']

export function getPlatform(key: PlatformKey): Platform {
    return PLATFORMS.find((p) => p.key === key) as Platform
}

function detectIsMobile(): boolean {
    if (typeof navigator === 'undefined') return false

    const uaData = getUserAgentData()
    const ua = (navigator.userAgent || navigator.vendor || '').toLowerCase()

    // iPadOS reports a desktop Mac user agent, so touch points are what give it away.
    return (
        uaData?.mobile === true ||
        /android|iphone|ipad|ipod|windows phone/i.test(ua) ||
        (/mac/i.test(ua) && typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1)
    )
}

function detectOS(): OS {
    if (typeof navigator === 'undefined' || detectIsMobile()) return 'unknown'

    const uaData = getUserAgentData()
    const ua = (navigator.userAgent || navigator.vendor || '').toLowerCase()
    const platform = (uaData?.platform || navigator.platform || '').toLowerCase()
    if (platform.includes('mac') || ua.includes('mac')) return 'mac'
    if (platform.includes('win') || ua.includes('win')) return 'windows'
    if (platform.includes('linux') || ua.includes('linux') || ua.includes('x11')) return 'linux'
    return 'unknown'
}

function detectArchFromUserAgent(os: OS): Arch {
    if (os !== 'linux') return 'unknown'

    const ua = (navigator.userAgent || '').toLowerCase()
    return ua.includes('aarch64') || ua.includes('arm64') ? 'arm64' : 'x64'
}

async function detectArch(os: OS): Promise<Arch> {
    try {
        const uaData = getUserAgentData()
        if (uaData?.getHighEntropyValues) {
            const { architecture } = await uaData.getHighEntropyValues(['architecture'])
            if (architecture === 'arm') return 'arm64'
            if (architecture === 'x86') return 'x64'
        }
    } catch {
        return detectArchFromUserAgent(os)
    }
    return detectArchFromUserAgent(os)
}

export interface DetectedDevice {
    platform: Platform | null
    isMobile: boolean
}

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
