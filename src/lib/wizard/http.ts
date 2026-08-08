/**
 * Tiny request/response helpers shared by the wizard Gatsby Functions.
 * Typed against a minimal structural interface so they work with both `gatsby develop`'s
 * Express response and Vercel's Node response.
 */
import { WIZARD_PAGE } from './config'

type ResLike = {
    setHeader(name: string, value: string | string[]): unknown
    status(code: number): { send(body: string): unknown }
}

export function redirect(res: ResLike, url: string): void {
    res.setHeader('Location', url)
    res.setHeader('Cache-Control', 'no-store')
    res.status(302).send('Redirecting…')
}

/** Redirects back to /wizard with an error code the WizardProvisioning component knows how to render. */
export function redirectWithError(res: ResLike, code: string): void {
    redirect(res, `${WIZARD_PAGE}?wizard=error&code=${encodeURIComponent(code)}`)
}

export function redirectWithStatus(res: ResLike, status: 'connected' | 'done' | 'degraded'): void {
    redirect(res, `${WIZARD_PAGE}?wizard=${status}`)
}

/** Gatsby delivers JSON bodies parsed or raw depending on how the client sent them. */
export function parseBody(body: unknown): Record<string, unknown> {
    if (typeof body === 'string') {
        try {
            return JSON.parse(body)
        } catch {
            return {}
        }
    }
    return body && typeof body === 'object' ? (body as Record<string, unknown>) : {}
}
