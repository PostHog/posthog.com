/**
 * Sends one PostHog event per /docs request the middleware handles, recording what the client asked for
 * and what it was served. The Vercel log drain in PostHog Logs stays the complete record. These
 * events carry the request headers the drain leaves out, and `vercel_request_id` joins each one to
 * its lines in Logs.
 *
 * Off unless MIDDLEWARE_CAPTURE_ENABLED is "true" and GATSBY_POSTHOG_API_KEY is set.
 * MIDDLEWARE_CAPTURE_SAMPLE_RATE (0 to 1, default 1) keeps a share of requests chosen from the
 * request id. The event uuid comes from the same id, so a resent event replaces the first instead
 * of adding to it.
 *
 * The send runs after the response through `waitUntil` and never throws into the request.
 */

const CAPTURE_EVENT = 'docs_request'
const CAPTURE_URL = 'https://us.i.posthog.com/i/v0/e/'
const UUID_NAMESPACE = '3b9c78a8-39be-49bf-950e-04a247c76119'
const SEND_ATTEMPTS = 2
const SEND_TIMEOUT_MS = 3000
const RETRY_BASE_DELAY_MS = 250
// Set by the middleware on its own fetch of a page's `.md` sibling, which passes through the
// middleware again and would otherwise be recorded as a second request.
export const SUBREQUEST_HEADER = 'x-posthog-middleware-subrequest'
// The matcher in middleware.ts covers more prefixes; only /docs requests are recorded.
const CAPTURE_PATHS = /^\/docs(\/|$)/

type Negotiation = 'not_requested' | 'served' | 'no_sibling' | 'markdown_url'

export interface NegotiationResult {
    response: Response | undefined
    negotiation: Negotiation
    reason?: 'accept' | 'agent_fetcher'
}

interface WaitUntilContext {
    waitUntil(promise: Promise<unknown>): void
}

interface CaptureConfig {
    sampleRate: number
    token: string
}

// Bundlers for edge code may only substitute `process.env.NAME` written out in full, so each
// variable is named here. The middleware sees only the Vercel project's variables: .env.production
// is read by Gatsby, so GATSBY_POSTHOG_API_KEY must also be set in Vercel or nothing is sent.
function readConfig(): CaptureConfig | undefined {
    const token = process.env.GATSBY_POSTHOG_API_KEY
    if (process.env.MIDDLEWARE_CAPTURE_ENABLED !== 'true' || !token) return undefined
    const rate = Number(process.env.MIDDLEWARE_CAPTURE_SAMPLE_RATE || '1')
    return { sampleRate: Number.isFinite(rate) ? Math.min(Math.max(rate, 0), 1) : 0, token }
}

export function captureRequest(request: Request, result: NegotiationResult, context?: WaitUntilContext): void {
    try {
        const config = readConfig()
        if (!config || config.sampleRate === 0) return
        if (request.headers.has(SUBREQUEST_HEADER)) return
        const url = new URL(request.url)
        if (!CAPTURE_PATHS.test(url.pathname)) return

        context?.waitUntil(capture(request, url, result, config).catch(() => undefined))
    } catch {
        // Recording a request must never affect the response.
    }
}

async function capture(request: Request, url: URL, result: NegotiationResult, config: CaptureConfig): Promise<void> {
    // Taken before the first await, so it is the time of the request rather than of the send.
    const timestamp = new Date().toISOString()
    const headers = request.headers
    const vercelId = headers.get('x-vercel-id') || undefined
    const requestId = vercelRequestId(vercelId)
    const uuid = requestId ? await uuidV5(`posthog.com-middleware:${requestId}`) : crypto.randomUUID()
    if (config.sampleRate < 1 && parseInt(uuid.slice(0, 8), 16) / 2 ** 32 >= config.sampleRate) return

    const userAgent = headers.get('user-agent') || ''
    const ip = headers.get('x-real-ip') || headers.get('x-forwarded-for')?.split(',')[0].trim() || ''

    const event = {
        api_key: config.token,
        event: CAPTURE_EVENT,
        uuid,
        timestamp,
        // One id per client, so unique-visitor counts work without person profiles.
        distinct_id: `mw_${(await sha256Hex(`${ip}:${userAgent}`)).slice(0, 32)}`,
        properties: {
            $process_person_profile: false,
            $lib: 'posthog.com-middleware',
            $current_url: url.href,
            $host: url.host,
            $pathname: url.pathname,
            $referrer: headers.get('referer') || undefined,
            $raw_user_agent: userAgent,
            $ip: ip || undefined,
            method: request.method,
            negotiation: result.negotiation,
            markdown_reason: result.reason,
            accept: headers.get('accept') || undefined,
            sec_fetch_site: headers.get('sec-fetch-site') || undefined,
            sec_fetch_mode: headers.get('sec-fetch-mode') || undefined,
            signature_agent: headers.get('signature-agent') || undefined,
            signature_input: headers.get('signature-input') || undefined,
            vercel_id: vercelId,
            vercel_request_id: requestId,
            vercel_env: process.env.VERCEL_ENV,
            vercel_deployment_id: process.env.VERCEL_DEPLOYMENT_ID,
            sample_rate: config.sampleRate,
        },
    }
    await send(event, requestId)
}

// One retry after a server or network error. A 429 is not retried: resending inside the throttle
// window only adds load, and `waitUntil` has no time to wait the window out.
async function send(event: Record<string, unknown>, requestId: string | undefined): Promise<void> {
    const body = JSON.stringify(event)
    let failure = ''
    for (let attempt = 1; attempt <= SEND_ATTEMPTS; attempt++) {
        if (attempt > 1) {
            // Jittered, so the retries of many requests failing at once spread out.
            await new Promise((resolve) => setTimeout(resolve, RETRY_BASE_DELAY_MS * (1 + Math.random())))
        }
        try {
            const response = await fetch(CAPTURE_URL, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body,
                signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
            })
            if (response.ok) return
            failure = `status ${response.status}`
            if (response.status < 500) break
        } catch (error) {
            failure = error instanceof Error ? error.name : 'unknown'
        }
    }
    // Lands in Logs as an edge line with this request's id, which is how lost events get counted.
    console.error(JSON.stringify({ middleware_capture: 'failed', reason: failure, vercel_request_id: requestId }))
}

// x-vercel-id is the request id behind one or more region prefixes, as in "fra1::iad1::<id>".
// The last part matches `vercel.request.id` on the request's lines in Logs.
function vercelRequestId(header: string | undefined): string | undefined {
    return header?.split('::').pop() || undefined
}

async function uuidV5(name: string): Promise<string> {
    const namespace = hexToBytes(UUID_NAMESPACE.replace(/-/g, ''))
    const nameBytes = new TextEncoder().encode(name)
    const data = new Uint8Array(namespace.length + nameBytes.length)
    data.set(namespace)
    data.set(nameBytes, namespace.length)
    const bytes = new Uint8Array(await crypto.subtle.digest('SHA-1', data)).slice(0, 16)
    bytes[6] = (bytes[6] & 0x0f) | 0x50
    bytes[8] = (bytes[8] & 0x3f) | 0x80
    const hex = bytesToHex(bytes)
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

async function sha256Hex(value: string): Promise<string> {
    return bytesToHex(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))))
}

function hexToBytes(hex: string): Uint8Array {
    return Uint8Array.from(hex.match(/../g) ?? [], (pair) => parseInt(pair, 16))
}

function bytesToHex(bytes: Uint8Array): string {
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}
