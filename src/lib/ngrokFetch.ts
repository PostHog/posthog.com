export function withNgrokBypass(
    fetch: typeof globalThis.fetch,
    hosts: (string | undefined)[]
): typeof globalThis.fetch {
    const origins = new Set(
        hosts.flatMap((host) => {
            if (!host) return []
            try {
                const url = new URL(host)
                return /\.ngrok(?:-free)?\.(app|dev|io)$/.test(url.hostname) ? [url.origin] : []
            } catch {
                return []
            }
        })
    )
    if (!origins.size) return fetch

    return (input, init) => {
        let url: URL
        try {
            url = new URL(input instanceof Request ? input.url : String(input))
        } catch {
            return fetch(input, init)
        }
        if (!origins.has(url.origin) || !url.pathname.startsWith('/api/')) return fetch(input, init)

        const headers = new Headers(init?.headers ?? (input instanceof Request ? input.headers : undefined))
        headers.set('ngrok-skip-browser-warning', '1')
        return fetch(input, { ...init, headers })
    }
}
