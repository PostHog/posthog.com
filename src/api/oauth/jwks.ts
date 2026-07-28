import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import { getPublicJwks, hasSigningKey } from '../../lib/cimd'

/**
 * `GET /api/oauth/jwks` — the JWK Set backing posthog.com's CIMD client identity, referenced as
 * `jwks_uri` from `static/.well-known/posthog.com.json`.
 *
 * Served from a function rather than a static file so the published key is derived from the
 * signing key in env. A static file would be a second copy to keep in sync, and the two silently
 * disagreeing is exactly what breaks assertion verification.
 *
 * Public by design: this is the public half of the key pair, and clients have to be able to fetch
 * it unauthenticated. PostHog caches it for an hour, so this is not a hot path.
 */
export default function handler(_req: GatsbyFunctionRequest, res: GatsbyFunctionResponse): void {
    if (!hasSigningKey()) {
        // Better a clear 503 than an empty key set, which would look like a valid document
        // advertising no keys and fail verification with a far less obvious message.
        res.status(503).json({ error: 'No signing key is configured for this environment' })
        return
    }

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.status(200).send(JSON.stringify(getPublicJwks()))
}
