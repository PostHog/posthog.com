/**
 * Shared iframe embed preflight for posthog.com (Vercel /api and Cloudflare Pages Functions).
 *
 * Lives server-side because browsers cannot read framing headers on cross-origin responses
 * (see comment on `fetchIframeStatus` in `src/components/Link/index.tsx`).
 */

const TIMEOUT_MS = 5000
const EMBED_ORIGIN = 'https://posthog.com'

function isPrivateHost(hostname) {
    if (!hostname) return true
    const lower = hostname.toLowerCase()
    if (lower === 'localhost' || lower === '0.0.0.0' || lower.endsWith('.local') || lower.endsWith('.internal')) {
        return true
    }
    const v4 = lower.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/)
    if (v4) {
        const a = parseInt(v4[1], 10)
        const b = parseInt(v4[2], 10)
        if (a === 0 || a === 10 || a === 127) return true
        if (a === 169 && b === 254) return true
        if (a === 172 && b >= 16 && b <= 31) return true
        if (a === 192 && b === 168) return true
    }
    if (lower === '::1' || lower.startsWith('fc') || lower.startsWith('fd') || lower.startsWith('fe80:')) {
        return true
    }
    return false
}

function parseFrameAncestors(csp) {
    if (!csp) return null
    const directive = csp
        .split(';')
        .map((d) => d.trim())
        .find((d) => /^frame-ancestors\b/i.test(d))
    if (!directive) return null
    return directive
        .replace(/^frame-ancestors/i, '')
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((s) => s.replace(/^['"]|['"]$/g, '').toLowerCase())
}

function frameAncestorsAllow(sources) {
    if (!sources || sources.length === 0) return false
    if (sources.includes("'none'")) return false
    if (sources.some((s) => s === '*' || s === 'https:' || s === 'http:')) {
        return true
    }
    return sources.some((s) => {
        if (s === EMBED_ORIGIN || s === 'posthog.com') return true
        if (s === '*.posthog.com' || s === 'https://*.posthog.com') return true
        return false
    })
}

function isBlocking(xfo, csp) {
    const ancestors = parseFrameAncestors(csp)
    if (ancestors) {
        return !frameAncestorsAllow(ancestors)
    }
    if (xfo) {
        const value = xfo.toLowerCase().trim().split(',')[0].trim()
        if (value === 'deny' || value === 'sameorigin') return true
        if (value.startsWith('allow-from')) {
            const allowed = value.replace('allow-from', '').trim()
            return allowed !== EMBED_ORIGIN && !allowed.endsWith('.posthog.com')
        }
    }
    return false
}

async function fetchWithMethod(url, method, signal) {
    return fetch(url, {
        method,
        redirect: 'follow',
        signal,
        headers: {
            'User-Agent': 'PostHog-IframeCheck/1.0 (+https://posthog.com)',
            Accept: 'text/html,*/*',
        },
    })
}

/**
 * @param {string | null | undefined} urlParam raw `url` query value
 * @returns {Promise<{ status: number, json: Record<string, unknown> }>}
 */
export async function runIframePreflight(urlParam) {
    const url = urlParam
    if (!url || typeof url !== 'string') {
        return { status: 400, json: { error: 'url query param required' } }
    }

    let parsed
    try {
        parsed = new URL(url)
    } catch {
        return { status: 400, json: { error: 'invalid url' } }
    }
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return { status: 200, json: { allowed: false, reason: 'unsupported-protocol' } }
    }
    if (isPrivateHost(parsed.hostname)) {
        return { status: 200, json: { allowed: false, reason: 'private-host' } }
    }

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

    try {
        let response
        try {
            response = await fetchWithMethod(parsed.toString(), 'HEAD', controller.signal)
            if (response.status === 405 || response.status === 501) {
                response = await fetchWithMethod(parsed.toString(), 'GET', controller.signal)
            }
        } catch {
            response = await fetchWithMethod(parsed.toString(), 'GET', controller.signal)
        }

        const xfo = response.headers.get('x-frame-options')
        const csp = response.headers.get('content-security-policy')
        const blocked = isBlocking(xfo, csp)
        return {
            status: 200,
            json: {
                allowed: !blocked,
                reason: blocked ? (parseFrameAncestors(csp) ? 'frame-ancestors' : 'x-frame-options') : undefined,
            },
        }
    } catch {
        return { status: 200, json: { allowed: false, reason: 'fetch-failed' } }
    } finally {
        clearTimeout(timer)
    }
}
