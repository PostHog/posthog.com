import crypto from 'crypto'
import fs from 'fs'
import os from 'os'
import path from 'path'

const CACHE_DIR = path.join(os.tmpdir(), 'posthog-com-dev-fetch-cache')
const MAX_AGE_MS = 24 * 60 * 60 * 1000

type CachedResponse = {
    status: number
    headers: Record<string, string>
    body: string
}

const isCacheable = (input: unknown, init?: RequestInit): input is string | URL =>
    (typeof input === 'string' || input instanceof URL) && (init?.method ?? 'GET').toUpperCase() === 'GET'

const cacheFileFor = (url: string, init?: RequestInit): string => {
    const key = crypto
        .createHash('sha1')
        .update(JSON.stringify([url, [...new Headers(init?.headers)]]))
        .digest('hex')
    return path.join(CACHE_DIR, `${key}.json`)
}

const readFresh = (file: string): CachedResponse | null => {
    try {
        if (Date.now() - fs.statSync(file).mtimeMs > MAX_AGE_MS) return null
        return JSON.parse(fs.readFileSync(file, 'utf-8'))
    } catch {
        return null
    }
}

const toResponse = ({ status, headers, body }: CachedResponse): Response =>
    new Response(Buffer.from(body, 'base64'), { status, headers })

export function cacheFetchResponsesInDevelopment(): void {
    if (process.env.NODE_ENV !== 'development') return

    fs.mkdirSync(CACHE_DIR, { recursive: true })
    const networkFetch = globalThis.fetch

    globalThis.fetch = async (input, init) => {
        if (!isCacheable(input, init)) return networkFetch(input, init)

        const file = cacheFileFor(String(input), init)
        const cached = process.env.GATSBY_FRESH_SOURCE_DATA !== 'true' && readFresh(file)
        if (cached) return toResponse(cached)

        const response = await networkFetch(input, init)
        if (!response.ok) return response

        const entry: CachedResponse = {
            status: response.status,
            headers: Object.fromEntries(response.headers),
            body: Buffer.from(await response.arrayBuffer()).toString('base64'),
        }
        fs.writeFileSync(file, JSON.stringify(entry))
        return toResponse(entry)
    }
}
