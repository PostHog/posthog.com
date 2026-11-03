const crypto = require('node:crypto')

// Receives the hosting provider's log drain and captures every line as a `$http_log` event.
// The event shape matches the PostHog "logs" source webhook template, which can only keep
// the first line of each batch.

const CAPTURE_URL = 'https://us.i.posthog.com/batch/'
const SELF_PATH = '/api/http-log-drain'
const MAX_MESSAGE_LENGTH = 262144
const EVENTS_PER_REQUEST = 500

function isValidLog(log) {
    return log !== null && typeof log === 'object' && !Array.isArray(log) && !!log.id && !!log.deploymentId
}

function parseLogs(body) {
    if (body === null || body === undefined) {
        return []
    }
    if (typeof body === 'object' && !Buffer.isBuffer(body)) {
        return (Array.isArray(body) ? body : [body]).filter(isValidLog)
    }
    const text = body.toString('utf8').trim()
    if (!text) {
        return []
    }
    const chunks = text.includes('\n') ? text.split('\n') : [text]
    const logs = []
    for (const chunk of chunks) {
        const line = chunk.trim()
        if (!line) {
            continue
        }
        let parsed
        try {
            parsed = JSON.parse(line)
        } catch {
            continue
        }
        logs.push(...(Array.isArray(parsed) ? parsed : [parsed]).filter(isValidLog))
    }
    return logs
}

function pathnameOf(path) {
    const queryIndex = path.indexOf('?')
    return queryIndex === -1 ? path : path.slice(0, queryIndex)
}

function queryParamsOf(path) {
    const queryIndex = path.indexOf('?')
    if (queryIndex === -1) {
        return {}
    }
    const params = {}
    for (const pair of path.slice(queryIndex + 1).split('&')) {
        const separator = pair.indexOf('=')
        if (separator === -1) {
            continue
        }
        const value = pair.slice(separator + 1)
        if (!value) {
            continue
        }
        try {
            params[pair.slice(0, separator)] = decodeURIComponent(value)
        } catch {
            params[pair.slice(0, separator)] = value
        }
    }
    return params
}

function shortHash(input) {
    return crypto.createHash('sha256').update(input).digest('base64').slice(0, 22)
}

// A redelivered batch produces the same event UUIDs, so retries do not double count.
function eventUuid(logId) {
    const bytes = crypto.createHash('sha256').update(`http_log:${logId}`).digest().subarray(0, 16)
    bytes[6] = (bytes[6] & 0x0f) | 0x50
    bytes[8] = (bytes[8] & 0x3f) | 0x80
    const hex = bytes.toString('hex')
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

function isSelfLog(log) {
    const proxy = log.proxy || {}
    return pathnameOf(proxy.path || log.path || '').startsWith(SELF_PATH)
}

function toEvent(log, salt) {
    const proxy = log.proxy || {}
    const host = proxy.host ?? log.host ?? ''
    const clientIp = proxy.clientIp ?? ''
    const userAgent = (Array.isArray(proxy.userAgent) ? proxy.userAgent[0] : proxy.userAgent) ?? ''
    const scheme = proxy.scheme ?? 'https'
    const path = proxy.path ?? log.path ?? ''
    const query = queryParamsOf(path)
    const message = log.message

    const properties = {
        $process_person_profile: false,
        $distinct_id_strategy: 'fixed_salt',
        $current_url: `${scheme}://${host}${path}`,
        $host: host,
        $pathname: pathnameOf(path),
        $referrer: proxy.referer,
        $ip: clientIp,
        $raw_user_agent: userAgent,

        utm_source: query.utm_source,
        utm_medium: query.utm_medium,
        utm_campaign: query.utm_campaign,
        utm_term: query.utm_term,
        utm_content: query.utm_content,

        vercel_log_id: log.id,
        deployment_id: log.deploymentId,
        project_id: log.projectId,
        project_name: log.projectName,
        source: log.source,
        environment: log.environment,
        level: log.level,
        type: log.type,
        message: typeof message === 'string' ? message.slice(0, MAX_MESSAGE_LENGTH) : message,
        message_truncated: typeof message === 'string' && message.length > MAX_MESSAGE_LENGTH,
        vercel_timestamp_ms: log.timestamp,

        host: log.host,
        path: log.path,
        entrypoint: log.entrypoint,
        status_code: log.statusCode,
        request_id: log.requestId,
        execution_region: log.executionRegion,
        invocation_id: log.invocationId,
        instance_id: log.instanceId,

        build_id: log.buildId,
        branch: log.branch,
        destination: log.destination,
        edge_type: log.edgeType,
        trace_id: log.traceId ?? log['trace.id'],
        span_id: log.spanId ?? log['span.id'],
        ja3_digest: log.ja3Digest,
        ja4_digest: log.ja4Digest,

        proxy_timestamp_ms: proxy.timestamp,
        proxy_method: proxy.method,
        proxy_host: proxy.host,
        proxy_path: proxy.path,
        proxy_region: proxy.region,
        proxy_referer: proxy.referer,
        proxy_status_code: proxy.statusCode,
        proxy_scheme: proxy.scheme,
        proxy_response_byte_size: proxy.responseByteSize,
        proxy_cache_id: proxy.cacheId,
        proxy_path_type: proxy.pathType,
        proxy_path_type_variant: proxy.pathTypeVariant,
        proxy_vercel_id: proxy.vercelId,
        proxy_vercel_cache: proxy.vercelCache,
        proxy_lambda_region: proxy.lambdaRegion,
        proxy_waf_action: proxy.wafAction,
        proxy_waf_rule_id: proxy.wafRuleId,
        proxy_client_ip: proxy.clientIp,
        proxy_user_agent: proxy.userAgent,
    }

    const event = {
        event: '$http_log',
        distinct_id: `http_log_${shortHash(`${salt}:${clientIp}:${host}:${userAgent}`)}`,
        properties,
        uuid: eventUuid(log.id),
    }
    if (Number.isFinite(log.timestamp)) {
        event.timestamp = new Date(log.timestamp).toISOString()
    }
    return event
}

function isAuthorized(header, expected) {
    if (!header || !expected) {
        return false
    }
    const given = Buffer.from(header)
    const wanted = Buffer.from(expected)
    return given.length === wanted.length && crypto.timingSafeEqual(given, wanted)
}

async function readBody(req) {
    if (req.body !== undefined) {
        return req.body
    }
    const chunks = []
    for await (const chunk of req) {
        chunks.push(chunk)
    }
    return Buffer.concat(chunks)
}

async function capture(events, token) {
    for (let start = 0; start < events.length; start += EVENTS_PER_REQUEST) {
        const response = await fetch(CAPTURE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ api_key: token, batch: events.slice(start, start + EVENTS_PER_REQUEST) }),
        })
        if (!response.ok) {
            throw new Error(`capture returned ${response.status}`)
        }
    }
}

async function handler(req, res) {
    // The drain checks the endpoint with this header when it is created.
    if (req.method === 'GET' || req.method === 'HEAD') {
        if (process.env.HTTP_LOG_DRAIN_VERIFY) {
            res.setHeader('x-vercel-verify', process.env.HTTP_LOG_DRAIN_VERIFY)
        }
        return res.status(200).end()
    }
    if (req.method !== 'POST') {
        return res.status(405).end()
    }

    const { HTTP_LOG_DRAIN_AUTH, HTTP_LOG_DRAIN_SALT, GATSBY_POSTHOG_API_KEY } = process.env
    if (!HTTP_LOG_DRAIN_AUTH || !GATSBY_POSTHOG_API_KEY) {
        console.error('http-log-drain: missing configuration')
        return res.status(500).end()
    }
    if (!isAuthorized(req.headers.authorization, HTTP_LOG_DRAIN_AUTH)) {
        return res.status(401).end()
    }

    let logs
    try {
        logs = parseLogs(await readBody(req))
    } catch {
        return res.status(400).json({ error: 'Unreadable body' })
    }
    // Delivering to this function logs a request line of its own. Capturing it would feed every
    // delivery back into the next one.
    const events = logs.filter((log) => !isSelfLog(log)).map((log) => toEvent(log, HTTP_LOG_DRAIN_SALT ?? ''))

    try {
        await capture(events, GATSBY_POSTHOG_API_KEY)
    } catch (error) {
        console.error('http-log-drain: capture failed', error.message)
        // A non-2xx makes the drain retry; the stable event UUIDs keep the retry from double counting.
        return res.status(502).end()
    }
    return res.status(200).json({ captured: events.length })
}

module.exports = handler
module.exports.parseLogs = parseLogs
module.exports.toEvent = toEvent
module.exports.isSelfLog = isSelfLog
module.exports.isAuthorized = isAuthorized
