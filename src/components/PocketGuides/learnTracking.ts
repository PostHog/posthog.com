interface TwigIdentity {
    has_opted_out_capturing?: () => boolean
    get_distinct_id?: () => string
    get_session_id?: () => string
}

/** Only pass the website identity when analytics consent can be checked. */
export function twigLearnUrl(posthog: TwigIdentity | undefined, twigUrl: string): string {
    if (!posthog?.has_opted_out_capturing || posthog.has_opted_out_capturing()) return twigUrl
    const distinctId = posthog.get_distinct_id?.()
    if (!distinctId) return twigUrl

    const params = new URLSearchParams({ learn_source: 'product-analytics', distinct_id: distinctId })
    const sessionId = posthog.get_session_id?.()
    if (sessionId) params.set('session_id', sessionId)
    return `${twigUrl}#${params.toString()}`
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
