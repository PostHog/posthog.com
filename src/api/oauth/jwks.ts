import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import { getPublicJwks, hasSigningKey } from '../../lib/cimd'

/**
 * `GET /api/oauth/jwks` — the `jwks_uri` named by `static/.well-known/posthog.com.json`. Public,
 * and a function rather than a static file so the published key is derived from the signing key in
 * env instead of being a second copy that can drift.
 *
 * The 10-minute max-age does not shorten a rotation: PostHog caches a JWK Set for an hour on its
 * own side whatever we send, which is why both keys stay published for that hour.
 */
export default function handler(_req: GatsbyFunctionRequest, res: GatsbyFunctionResponse): void {
    if (!hasSigningKey()) {
        // Better a clear 503 than an empty key set, which would look like a valid document
        // advertising no keys and fail verification with a far less obvious message.
        res.status(503).json({ error: 'No signing key is configured for this environment' })
        return
    }

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 'public, max-age=600')
    res.status(200).send(JSON.stringify(getPublicJwks()))
}
