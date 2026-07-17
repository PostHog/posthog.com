/**
 * PostHog Time Machine – fetch the list of Wayback Machine snapshots for a URL.
 *
 * Proxies the Internet Archive CDX Server API (which sends no CORS headers, so it
 * can't be called from the browser) and returns a compact, de-duplicated timeline.
 *
 * GET /api/wayback-snapshots?path=          -> snapshots of posthog.com
 * GET /api/wayback-snapshots?path=/pricing  -> snapshots of posthog.com/pricing
 *
 * Response: { target: string, snapshots: Array<{ timestamp, iso, label, url }> }
 * where `url` is the toolbar-free embeddable snapshot (the `if_` modifier).
 */
const CDX_BASE = 'https://web.archive.org/cdx/search/cdx'
const WEB_BASE = 'https://web.archive.org/web'

// One capture per year-month keeps the timeline readable without hammering CDX.
const COLLAPSE = 'timestamp:6'

function sanitizePath(input) {
    if (!input || typeof input !== 'string') return ''
    // Strip protocol/host if someone passes a full URL, keep just the path.
    let path = input.trim().replace(/^https?:\/\/(www\.)?posthog\.com/i, '')
    if (!path || path === '/') return ''
    if (!path.startsWith('/')) path = `/${path}`
    // Drop any hash/query and trailing slash for a stable CDX key.
    path = path.split('#')[0].split('?')[0].replace(/\/$/, '')
    return path
}

// "20210401183915" -> ISO string + human label
function parseTimestamp(ts) {
    const y = ts.slice(0, 4)
    const mo = ts.slice(4, 6)
    const d = ts.slice(6, 8)
    const h = ts.slice(8, 10)
    const mi = ts.slice(10, 12)
    const s = ts.slice(12, 14)
    const iso = `${y}-${mo}-${d}T${h}:${mi}:${s}Z`
    const date = new Date(iso)
    const label = Number.isNaN(date.getTime())
        ? `${y}-${mo}`
        : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', timeZone: 'UTC' })
    return { iso, label }
}

// The Internet Archive throttles anonymous cloud egress hard, and a request with
// no descriptive User-Agent frequently comes back as an empty `[]` (HTTP 200) or a
// 429/403. A real UA + a short retry makes the CDX call reliable from serverless.
async function fetchCdxRows(url, attempt = 1) {
    const MAX_ATTEMPTS = 3
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 12000)
    try {
        const res = await fetch(url, {
            signal: controller.signal,
            headers: {
                'User-Agent': 'PostHog-TimeMachine/1.0 (+https://posthog.com/time-machine)',
                Accept: 'application/json',
            },
        })
        if (!res.ok) {
            throw new Error(`CDX API responded ${res.status}`)
        }
        // CDX sometimes returns an empty body or plain text when throttled.
        const text = await res.text()
        const trimmed = text.trim()
        if (!trimmed) return []
        let rows
        try {
            rows = JSON.parse(trimmed)
        } catch {
            throw new Error('CDX API returned a non-JSON response (likely throttled)')
        }
        // A successful-but-empty array from a throttled edge node — retry.
        if (Array.isArray(rows) && rows.length <= 1 && attempt < MAX_ATTEMPTS) {
            throw new Error('CDX API returned no rows')
        }
        return rows
    } catch (err) {
        if (attempt < MAX_ATTEMPTS) {
            await new Promise((r) => setTimeout(r, 500 * attempt))
            return fetchCdxRows(url, attempt + 1)
        }
        throw err
    } finally {
        clearTimeout(timeout)
    }
}

const handler = async (req, res) => {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET')
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const path = sanitizePath(req.query?.path)
        const target = `posthog.com${path}`

        const params = new URLSearchParams({
            url: target,
            output: 'json',
            fl: 'timestamp,statuscode',
            filter: 'statuscode:200',
            collapse: COLLAPSE,
            limit: '500',
        })

        const rows = await fetchCdxRows(`${CDX_BASE}?${params}`)
        // First row is the header (["timestamp","statuscode"]).
        const dataRows = Array.isArray(rows) ? rows.slice(1) : []

        const seen = new Set()
        const snapshots = []
        for (const row of dataRows) {
            const ts = row?.[0]
            if (!ts || seen.has(ts)) continue
            seen.add(ts)
            const { iso, label } = parseTimestamp(ts)
            snapshots.push({
                timestamp: ts,
                iso,
                label,
                // `if_` strips the Wayback toolbar so the page embeds cleanly.
                url: `${WEB_BASE}/${ts}if_/https://${target}/`,
            })
        }

        snapshots.sort((a, b) => a.timestamp.localeCompare(b.timestamp))

        // Cache hard at the edge – the archive rarely changes for past dates.
        res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800')
        return res.status(200).json({ target, snapshots })
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Request failed'
        return res.status(500).json({ error: message })
    }
}

export default handler
