interface TwigIdentity {
    has_opted_out_capturing?: () => boolean
    get_distinct_id?: () => string
    get_session_id?: () => string
}

/** Require the site's recorded cookie consent as well as the SDK's opt-out check. */
export function twigLearnUrl(
    posthog: TwigIdentity | undefined,
    twigUrl: string,
    learnSource = 'product-analytics'
): string {
    try {
        const consent = window.localStorage.getItem('cookie_consent')
        // The current toast records acknowledgement; the older banner records explicit acceptance.
        if (consent !== 'yes' && consent !== 'acknowledged') return twigUrl
    } catch {
        // Missing or blocked storage cannot confirm consent.
        return twigUrl
    }
    if (posthog?.has_opted_out_capturing?.() !== false) return twigUrl
    const distinctId = posthog.get_distinct_id?.()
    if (!distinctId) return twigUrl

    const params = new URLSearchParams({ learn_source: learnSource, distinct_id: distinctId })
    const sessionId = posthog.get_session_id?.()
    if (sessionId) params.set('session_id', sessionId)
    return `${twigUrl}#${params.toString()}`
}

/** Open Twig with the visitor's IDs when consent allows it. Otherwise the plain link opens as usual. */
export function handOffToTwig(
    event: { preventDefault: () => void },
    posthog: (TwigIdentity & { createPersonProfile?: () => void }) | undefined,
    twigUrl: string,
    learnSource: string
): void {
    const destination = twigLearnUrl(posthog, twigUrl, learnSource)
    if (destination === twigUrl) return
    // The website project needs a profile to join this anonymous visitor across domains.
    posthog?.createPersonProfile?.()
    // Keep the copyable link free of this visitor's ID.
    event.preventDefault()
    window.open(destination, '_blank', 'noopener,noreferrer')
}

interface ReaderWindow {
    key: string
    zIndex: number
    minimized: boolean
}

/** A covered or minimized reader should not accrue chapter time. */
export function isReaderWindowActive(windows: ReaderWindow[], readerKey: string | undefined): boolean {
    const reader = windows.find((window) => window.key === readerKey)
    return (
        !!reader && !reader.minimized && windows.every((window) => window.minimized || window.zIndex <= reader.zIndex)
    )
}
