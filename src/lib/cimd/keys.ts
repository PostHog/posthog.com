import crypto from 'crypto'

import { cimdConfig } from './config'

/**
 * The signing key, loaded from env. Cached because parsing a PEM per request is wasteful and
 * the key never changes within a process.
 */
let cachedPrivateKey: crypto.KeyObject | null = null

export function hasSigningKey(): boolean {
    return Boolean(cimdConfig.privateKeyPem)
}

export function getPrivateKey(): crypto.KeyObject {
    if (cachedPrivateKey) return cachedPrivateKey
    if (!cimdConfig.privateKeyPem) {
        throw new Error('CIMD_CLIENT_PRIVATE_KEY is not configured, so posthog.com cannot sign client assertions')
    }
    cachedPrivateKey = crypto.createPrivateKey(cimdConfig.privateKeyPem)
    return cachedPrivateKey
}

/**
 * The JWK Set we publish at our `jwks_uri`, derived from the private key rather than stored
 * separately. Deriving it means the published key can never drift from the signing key, which
 * is the failure mode that makes `private_key_jwt` setups mysteriously stop working.
 */
export function getPublicJwks(): { keys: Record<string, unknown>[] } {
    const jwk = crypto.createPublicKey(getPrivateKey()).export({ format: 'jwk' }) as Record<string, unknown>
    return {
        keys: [{ ...jwk, kid: cimdConfig.keyId, use: 'sig', alg: 'RS256' }],
    }
}
