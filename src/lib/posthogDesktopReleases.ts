const RELEASE_FEED_URL = 'https://desktop-releases.posthog.com/stable/releases.json'
const DESKTOP_VERSION_PATTERN = /^\d+\.\d+\.\d+$/
const DESKTOP_RELEASE_URL_PATTERN = /^https:\/\/github\.com\/PostHog\/posthog\/releases\/tag\/desktop-v\d+\.\d+\.\d+$/

interface DesktopRelease {
    version: string
    htmlUrl: string
}

interface DesktopReleaseFeed {
    releases: [DesktopRelease, ...unknown[]]
}

const isDesktopReleaseFeed = (value: unknown): value is DesktopReleaseFeed => {
    if (!value || typeof value !== 'object') return false

    const releases = (value as { releases?: unknown }).releases
    if (!Array.isArray(releases)) return false

    const firstRelease: unknown = releases[0]
    if (!firstRelease || typeof firstRelease !== 'object') return false

    const { version, htmlUrl } = firstRelease as { version?: unknown; htmlUrl?: unknown }
    return (
        typeof version === 'string' &&
        DESKTOP_VERSION_PATTERN.test(version) &&
        typeof htmlUrl === 'string' &&
        DESKTOP_RELEASE_URL_PATTERN.test(htmlUrl)
    )
}

export const getLatestDesktopReleaseUrl = async (fetchImpl: typeof fetch = fetch): Promise<string> => {
    const response = await fetchImpl(RELEASE_FEED_URL, { headers: { Accept: 'application/json' } })
    if (!response.ok) {
        throw new Error(`Desktop release feed returned ${response.status}`)
    }

    const feed: unknown = await response.json()
    if (!isDesktopReleaseFeed(feed)) {
        throw new Error('Desktop release feed has no valid release')
    }

    return feed.releases[0].htmlUrl
}
