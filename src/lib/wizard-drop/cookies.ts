/**
 * Signed-cookie helpers for the wizard drop Gatsby Functions.
 *
 * Format: `base64url(JSON payload) + "." + base64url(HMAC-SHA256(payload, WIZARD_DROP_STATE_SECRET))`.
 * Every payload gets an `iat` (unix seconds) stamped at signing time; `verify` enforces a max age.
 * Nothing sensitive beyond the opaque grant id ever goes in a cookie, so signing (not encryption)
 * is sufficient.
 *
 * SameSite=Lax is safe for all legs of the flow: the two cross-site returns (github.com OAuth
 * callback and the us.posthog.com consent callback) are top-level GET navigations, which Lax
 * permits.
 */
import crypto from 'crypto'

import { COOKIE_PATH, config } from './config'

type ReqLike = { headers: { cookie?: string } }
type ResLike = {
    getHeader(name: string): unknown
    setHeader(name: string, value: string | string[]): unknown
}

const secret = (): string => {
    if (!config.stateSecret) {
        throw new Error('WIZARD_DROP_STATE_SECRET is not configured')
    }
    return config.stateSecret
}

const hmac = (body: string): Buffer => crypto.createHmac('sha256', secret()).update(body).digest()

export function sign(payload: Record<string, unknown>): string {
    const body = Buffer.from(JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000) })).toString('base64url')
    return `${body}.${hmac(body).toString('base64url')}`
}

/** Returns the payload, or null on any failure (bad format, bad signature, expired). Never throws. */
export function verify<T extends Record<string, unknown>>(
    value: string | undefined,
    maxAgeSeconds: number
): (T & { iat: number }) | null {
    if (!value) return null
    const [body, sig] = value.split('.')
    if (!body || !sig) return null
    const expected = hmac(body)
    let given: Buffer
    try {
        given = Buffer.from(sig, 'base64url')
    } catch {
        return null
    }
    if (given.length !== expected.length || !crypto.timingSafeEqual(given, expected)) return null
    try {
        const payload = JSON.parse(Buffer.from(body, 'base64url').toString())
        if (typeof payload?.iat !== 'number' || Math.floor(Date.now() / 1000) - payload.iat > maxAgeSeconds) {
            return null
        }
        return payload
    } catch {
        return null
    }
}

export function parseCookies(req: ReqLike): Record<string, string> {
    const header = req.headers.cookie
    if (!header) return {}
    const cookies: Record<string, string> = {}
    for (const part of header.split(';')) {
        const eq = part.indexOf('=')
        if (eq === -1) continue
        cookies[part.slice(0, eq).trim()] = part.slice(eq + 1).trim()
    }
    return cookies
}

function appendSetCookie(res: ResLike, cookie: string): void {
    const existing = res.getHeader('Set-Cookie')
    const values = Array.isArray(existing) ? existing.map(String) : existing ? [String(existing)] : []
    res.setHeader('Set-Cookie', [...values, cookie])
}

function attributes(maxAgeSeconds: number): string {
    const secure = config.siteUrl.startsWith('https://') ? '; Secure' : ''
    return `; Path=${COOKIE_PATH}; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}${secure}`
}

/** Values are base64url tokens from `sign()` — already cookie-safe, stored unencoded. */
export function setCookie(res: ResLike, name: string, value: string, maxAgeSeconds: number): void {
    appendSetCookie(res, `${name}=${value}${attributes(maxAgeSeconds)}`)
}

export function clearCookie(res: ResLike, name: string): void {
    appendSetCookie(res, `${name}=${attributes(0)}`)
}
