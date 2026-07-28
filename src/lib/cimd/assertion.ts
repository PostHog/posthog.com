import crypto from 'crypto'

import { cimdConfig } from './config'
import { getKeyId, getPrivateKey } from './keys'

export const CLIENT_ASSERTION_TYPE_JWT_BEARER = 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer'

/**
 * Lifetime of each assertion. PostHog caps this at 300s and requires `iat`, so anything short
 * is fine; 60s leaves room for clock skew without widening the replay window.
 */
const LIFETIME_SECONDS = 60

const base64url = (value: Record<string, unknown>): string => Buffer.from(JSON.stringify(value)).toString('base64url')

/**
 * Build a single-use `private_key_jwt` assertion (RFC 7523 section 2.2).
 *
 * `iss` and `sub` are both our `client_id`, which is what RFC 7523 section 3 requires for client
 * authentication and what PostHog checks. `jti` is single-use on PostHog's side, so a fresh
 * assertion is required per request: reusing one gets the second call rejected as a replay.
 */
export function createClientAssertion(audience: string): string {
    const now = Math.floor(Date.now() / 1000)
    const header = { alg: 'RS256', typ: 'JWT', kid: getKeyId() }
    const claims = {
        iss: cimdConfig.clientId,
        sub: cimdConfig.clientId,
        aud: audience,
        jti: crypto.randomUUID(),
        iat: now,
        exp: now + LIFETIME_SECONDS,
    }

    const signingInput = `${base64url(header)}.${base64url(claims)}`
    const signature = crypto.sign('RSA-SHA256', Buffer.from(signingInput), getPrivateKey())
    return `${signingInput}.${signature.toString('base64url')}`
}
