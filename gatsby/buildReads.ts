import { createHash } from 'node:crypto'
import { setTimeout as delay } from 'node:timers/promises'
import pLimit from 'p-limit'

type ReadOptions = {
    headers?: HeadersInit
    signal?: AbortSignal
    timeoutMs?: number
    attemptTimeoutMs?: number
}

type ReadRequest = ReadOptions & { method: 'GET' | 'POST'; body?: string }
type ReadState = {
    limits: Map<string, ReturnType<typeof pLimit>>
    pending: Map<string, Promise<ArrayBuffer>>
}

const stateKey = Symbol.for('posthog.buildReads')
const scope = globalThis as typeof globalThis & { [stateKey]?: ReadState }
const state = (scope[stateKey] ??= { limits: new Map(), pending: new Map() })
const retryStatuses = new Set([408, 429, 500, 502, 503, 504])
const retryCodes = new Set([
    'ECONNRESET',
    'ECONNREFUSED',
    'EPIPE',
    'ETIMEDOUT',
    'EAI_AGAIN',
    'ENETUNREACH',
    'EHOSTUNREACH',
    'UND_ERR_CONNECT_TIMEOUT',
    'UND_ERR_HEADERS_TIMEOUT',
    'UND_ERR_BODY_TIMEOUT',
    'UND_ERR_SOCKET',
])

class HttpReadError extends Error {
    readonly status: number
    readonly retryAfterMs: number

    constructor(status: number, retryAfterMs: number) {
        super(`HTTP ${status}`)
        this.status = status
        this.retryAfterMs = retryAfterMs
    }
}

const requestLabel = (url: URL) => `${url.origin}${url.pathname}`

function networkCode(error: unknown): string | undefined {
    if (!error || typeof error !== 'object') return undefined
    const value = error as { code?: string; cause?: unknown; errors?: unknown[] }
    if (value.code && retryCodes.has(value.code)) return value.code
    return networkCode(value.cause) || value.errors?.map(networkCode).find(Boolean)
}

function retryAfter(value: string | null): number {
    if (!value) return 0
    const seconds = Number(value)
    const milliseconds = Number.isFinite(seconds) ? seconds * 1000 : Date.parse(value) - Date.now()
    return Number.isFinite(milliseconds) ? Math.max(0, milliseconds) : 0
}

function withCancellation<T>(promise: Promise<T>, signal: AbortSignal): Promise<T> {
    return new Promise((resolve, reject) => {
        const abort = () => reject(signal.reason)
        if (signal.aborted) return abort()
        signal.addEventListener('abort', abort, { once: true })
        promise.then(resolve, reject).finally(() => signal.removeEventListener('abort', abort))
    })
}

async function download(url: URL, options: ReadRequest): Promise<ArrayBuffer> {
    const started = Date.now()
    const deadline = AbortSignal.timeout(options.timeoutMs ?? 30000)
    const signal = options.signal ? AbortSignal.any([options.signal, deadline]) : deadline
    let limit = state.limits.get(url.origin)
    if (!limit) {
        limit = pLimit(4)
        state.limits.set(url.origin, limit)
    }

    for (let attempt = 1; ; attempt++) {
        let attemptSignal: AbortSignal | undefined
        try {
            signal.throwIfAborted()
            return await withCancellation(
                limit(async () => {
                    signal.throwIfAborted()
                    attemptSignal = AbortSignal.any([signal, AbortSignal.timeout(options.attemptTimeoutMs ?? 10000)])
                    const response = await fetch(url, {
                        method: options.method,
                        headers: options.headers,
                        body: options.body,
                        signal: attemptSignal,
                    })
                    if (!response.ok) {
                        const error = new HttpReadError(
                            response.status,
                            retryAfter(response.headers.get('retry-after'))
                        )
                        await response.body?.cancel().catch(() => undefined)
                        throw error
                    }
                    return response.arrayBuffer()
                }),
                signal
            )
        } catch (error) {
            if (options.signal?.aborted) throw options.signal.reason
            const reason =
                error instanceof HttpReadError
                    ? `HTTP ${error.status}`
                    : networkCode(error) || (attemptSignal?.aborted ? 'attempt timeout' : 'request failed')
            const canRetry =
                error instanceof HttpReadError
                    ? retryStatuses.has(error.status)
                    : !!networkCode(error) || !!attemptSignal?.aborted
            const elapsed = Date.now() - started
            if (signal.aborted || !canRetry || attempt === 3) {
                throw new Error(
                    `Build read failed: ${options.method} ${requestLabel(
                        url
                    )} after ${attempt} attempt(s), ${elapsed}ms (${reason})`,
                    { cause: error }
                )
            }
            const wait = Math.max(
                Math.round(Math.random() * 500 * 2 ** (attempt - 1)),
                error instanceof HttpReadError ? error.retryAfterMs : 0
            )
            console.warn(
                `[build-read] ${options.method} ${requestLabel(
                    url
                )}: ${reason}; retry ${attempt}/2 after ${wait}ms (${elapsed}ms elapsed)`
            )
            try {
                await delay(wait, undefined, { signal })
            } catch (error) {
                if (options.signal?.aborted) throw options.signal.reason
                throw new Error(`Build read deadline exceeded: ${options.method} ${requestLabel(url)}`, {
                    cause: error,
                })
            }
        }
    }
}

function read(url: string | URL, options: ReadRequest): Promise<ArrayBuffer> {
    const target = new URL(url)
    if (options.signal) return download(target, options)
    const headers = [...new Headers(options.headers)].sort(([a], [b]) => a.localeCompare(b))
    const key = createHash('sha256')
        .update(
            JSON.stringify([
                target.href,
                options.method,
                headers,
                options.body,
                options.timeoutMs,
                options.attemptTimeoutMs,
            ])
        )
        .digest('hex')
    const existing = state.pending.get(key)
    if (existing) return existing
    const pending = download(target, options)
    state.pending.set(key, pending)
    const clear = () => state.pending.delete(key)
    pending.then(clear, clear)
    return pending
}

async function json<T>(url: string | URL, options: ReadRequest): Promise<T> {
    const bytes = await read(url, options)
    try {
        return JSON.parse(Buffer.from(bytes).toString('utf8'))
    } catch {
        throw new Error(`Build read returned invalid JSON: ${requestLabel(new URL(url))}`)
    }
}

export function readJson<T>(url: string | URL, options: ReadOptions = {}): Promise<T> {
    return json(url, { ...options, method: 'GET' })
}

export function queryJson<T>(url: string | URL, query: unknown, options: ReadOptions = {}): Promise<T> {
    const headers = new Headers(options.headers)
    headers.set('content-type', 'application/json')
    return json(url, { ...options, headers, method: 'POST', body: JSON.stringify(query) })
}

export async function readBytes(url: string | URL, options: ReadOptions = {}): Promise<Uint8Array> {
    return new Uint8Array(await read(url, { ...options, method: 'GET' })).slice()
}
