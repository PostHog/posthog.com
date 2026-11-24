/**
 * Sends one PostHog event per /docs request the middleware handles, recording what the client asked for
 * and what it was served. The Vercel log drain in PostHog Logs stays the complete record. These
 * events carry the request headers the drain leaves out, and `vercel_request_id` joins each one to
 * its lines in Logs.
 *
 * Off unless MIDDLEWARE_CAPTURE_ENABLED is "true". MIDDLEWARE_CAPTURE_SAMPLE_RATE (0 to 1, default
 * 1) keeps a share of requests chosen from the request id, so retries of one request agree. The
 * event uuid comes from the same id, so a resent event replaces the first instead of adding to it.
 *
 * The send runs after the response through `waitUntil` and never throws into the request.
 */

const CAPTURE_EVENT = 'middleware_request'

const DEFAULT_HOST = 'https://us.i.posthog.com'
// The website's public project token, the same one the browser SDK ships with.
const DEFAULT_TOKEN = 'sTMFPsFhdP1Ssg'
// Fixed so that a request id always maps to the same event uuid.
const UUID_NAMESPACE = '3b9c78a8-39be-49bf-950e-04a247c76119'
const SEND_ATTEMPTS = 2
const SEND_TIMEOUT_MS = 3000
// The user agent of the middleware's own `fetch` for a page's `.md` sibling.
const SUBREQUEST_USER_AGENT = 'Vercel Edge Functions'
// Only the docs to start with. The middleware's matcher covers more paths than this.
const CAPTURE_PATHS = /^\/docs(\/|$)/

export type Negotiation = 'not_requested' | 'served' | 'no_sibling' | 'markdown_url'
export type MarkdownReason = 'accept' | 'agent_fetcher'

export interface NegotiationResult {
    response: Response | undefined
    negotiation: Negotiation
    reason?: MarkdownReason
    markdownFetchMs?: number
}

type WaitUntil = (promise: Promise<unknown>) => void

interface CaptureConfig {
    sampleRate: number
    token: string
    host: string
}

type AgentCategory = 'ai_assistant' | 'ai_search' | 'ai_crawler' | 'bot' | 'http_client' | 'no_user_agent' | 'regular'

// The agents seen most on posthog.com. The full list is in PostHog's bot definitions: run
// getTrafficType($raw_user_agent, $ip) on these events for the classification Logs uses.
// Order matters: Claude-User sends "claude-code/" in its user agent too.
const AGENTS: [RegExp, string, AgentCategory][] = [
    [/Claude-User/i, 'Claude User', 'ai_assistant'],
    [/claude-code\//i, 'Claude Code', 'ai_assistant'],
    [/ChatGPT-User/i, 'ChatGPT', 'ai_assistant'],
    [/Perplexity-User/i, 'Perplexity User', 'ai_assistant'],
    [/MistralAI-User/i, 'Mistral AI', 'ai_assistant'],
    [/meta-externalfetcher/i, 'Meta Fetcher', 'ai_assistant'],
    [/GoogleAgent-URLContext/i, 'Gemini URL Context', 'ai_assistant'],
    [/^Cursor\/[0-9.]+ \(/, 'Cursor', 'ai_assistant'],
    [/OAI-SearchBot/i, 'OpenAI Search', 'ai_search'],
    [/Claude-SearchBot/i, 'Claude Search', 'ai_search'],
    [/PerplexityBot/i, 'Perplexity', 'ai_search'],
    [/Applebot/i, 'Applebot', 'ai_search'],
    [/GPTBot/i, 'GPTBot', 'ai_crawler'],
    [/ClaudeBot/i, 'Claude', 'ai_crawler'],
    [/meta-externalagent/i, 'Meta AI', 'ai_crawler'],
    [/Amazonbot/i, 'Amazon', 'ai_crawler'],
    [/Bytespider/i, 'ByteDance', 'ai_crawler'],
    [/CCBot/i, 'Common Crawl', 'ai_crawler'],
    [/PetalBot/i, 'Petal', 'ai_crawler'],
    [/PostHog-BusinessKnowledge/i, 'PostHog BusinessKnowledge', 'ai_crawler'],
]
const GENERIC_BOT = /bot\b|crawl|spider|slurp/i
const HTTP_CLIENT =
    /^(curl|wget|python-requests|python-urllib|python-httpx|aiohttp|axios|node-fetch|node|undici|go-http-client|okhttp|java\/|ruby|deno|bun)\b/i

function classifyAgent(userAgent: string): { name?: string; category: AgentCategory } {
    if (!userAgent) return { category: 'no_user_agent' }
    for (const [pattern, name, category] of AGENTS) {
        if (pattern.test(userAgent)) return { name, category }
    }
    if (GENERIC_BOT.test(userAgent)) return { category: 'bot' }
    if (HTTP_CLIENT.test(userAgent)) return { category: 'http_client' }
    return { category: 'regular' }
}

// Bundlers for edge code may only substitute `process.env.NAME` written out in full, so each
// variable is named here.
function readConfig(): CaptureConfig | undefined {
    if (typeof process === 'undefined' || process.env.MIDDLEWARE_CAPTURE_ENABLED !== 'true') return undefined
    const rate = Number(process.env.MIDDLEWARE_CAPTURE_SAMPLE_RATE || '1')
    return {
        sampleRate: Number.isFinite(rate) ? Math.min(Math.max(rate, 0), 1) : 0,
        token: process.env.MIDDLEWARE_CAPTURE_TOKEN || DEFAULT_TOKEN,
        host: (process.env.MIDDLEWARE_CAPTURE_HOST || DEFAULT_HOST).replace(/\/$/, ''),
    }
}

export function captureRequest(request: Request, result: NegotiationResult, waitUntil?: WaitUntil): void {
    try {
        const config = readConfig()
        if (!config || config.sampleRate === 0) return
        if (request.headers.get('user-agent') === SUBREQUEST_USER_AGENT) return
        if (!CAPTURE_PATHS.test(new URL(request.url).pathname)) return

        const timestamp = new Date().toISOString()
        const pending = capture(request, result, config, timestamp).catch(() => undefined)
        waitUntil?.(pending)
    } catch {
        // Recording a request must never affect the response.
    }
}

async function capture(request: Request, result: NegotiationResult, config: CaptureConfig, timestamp: string) {
    const headers = request.headers
    const requestId = vercelRequestId(headers.get('x-vercel-id'))
    const uuid = requestId ? await uuidV5(`posthog.com-middleware:${requestId}`) : crypto.randomUUID()
    if (config.sampleRate < 1 && parseInt(uuid.slice(0, 8), 16) / 2 ** 32 >= config.sampleRate) return

    const url = new URL(request.url)
    const userAgent = headers.get('user-agent') || ''
    const ip = headers.get('x-real-ip') || headers.get('x-forwarded-for')?.split(',')[0].trim() || ''
    const agent = classifyAgent(userAgent)
    const servedMarkdown = result.response !== undefined || result.negotiation === 'markdown_url'

    const event = {
        api_key: config.token,
        event: CAPTURE_EVENT,
        uuid,
        timestamp,
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
            served_format: servedMarkdown ? 'markdown' : 'html',
            negotiation: result.negotiation,
            markdown_reason: result.reason,
            markdown_fetch_ms: result.markdownFetchMs,
            accept: headers.get('accept') || '',
            // Browsers send Sec-Fetch-*; most HTTP clients do not, even with a browser user agent.
            sec_fetch_site: headers.get('sec-fetch-site') || undefined,
            sec_fetch_mode: headers.get('sec-fetch-mode') || undefined,
            signature_agent: headers.get('signature-agent') || undefined,
            has_http_signature: headers.has('signature') && headers.has('signature-input'),
            agent_name: agent.name,
            agent_category: agent.category,
            vercel_request_id: requestId,
            vercel_env: process.env.VERCEL_ENV,
            vercel_deployment_id: process.env.VERCEL_DEPLOYMENT_ID,
            sample_rate: config.sampleRate,
        },
    }
    await send(event, config, requestId)
}

async function send(event: object, config: CaptureConfig, requestId: string | undefined) {
    const body = JSON.stringify(event)
    let failure = ''
    for (let attempt = 1; attempt <= SEND_ATTEMPTS; attempt++) {
        try {
            const response = await fetch(`${config.host}/i/v0/e/`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body,
                signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
            })
            if (response.ok) return
            failure = `status ${response.status}`
            if (response.status < 500 && response.status !== 429) break
        } catch (error) {
            failure = error instanceof Error ? error.name : 'unknown'
        }
    }
    // Lands in Logs as an edge line with this request's id, which is how lost events get counted.
    console.error(JSON.stringify({ middleware_capture: 'failed', reason: failure, vercel_request_id: requestId }))
}

// x-vercel-id is the request id behind one or more region prefixes, as in "fra1::iad1::<id>".
// The last part matches `vercel.request.id` on the request's lines in Logs.
function vercelRequestId(header: string | null): string | undefined {
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
