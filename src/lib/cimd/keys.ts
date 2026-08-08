import crypto from 'crypto'

import { cimdConfig } from './config'

/**
 * The signing key, loaded from env. Cached because parsing a PEM per request is wasteful and
 * the key never changes within a process.
 */
let cachedPrivateKey: crypto.KeyObject | null = null

/** Both halves are required: a key with no `kid` cannot be published or selected. */
export function hasSigningKey(): boolean {
    return Boolean(cimdConfig.privateKeyPem && cimdConfig.keyId)
}

export function getKeyId(): string {
    if (!cimdConfig.keyId) {
        throw new Error('CIMD_CLIENT_KEY_ID is not configured, so posthog.com cannot label its signing key')
    }
    return cimdConfig.keyId
}

export function getPrivateKey(): crypto.KeyObject {
    if (cachedPrivateKey) return cachedPrivateKey
    if (!cimdConfig.privateKeyPem) {
        throw new Error('CIMD_CLIENT_PRIVATE_KEY is not configured, so posthog.com cannot sign client assertions')
    }
    // A PEM whose newlines were escaped somewhere in transit (a shell variable, a JSON config, a
    // CI secret flattened to one line) fails to decode with an opaque OpenSSL error. Repairing it
    // is safe, since a real PEM never contains a literal backslash.
    const pem = cimdConfig.privateKeyPem.includes('\\n')
        ? cimdConfig.privateKeyPem.replace(/\\n/g, '\n')
        : cimdConfig.privateKeyPem

    try {
        cachedPrivateKey = crypto.createPrivateKey(pem)
    } catch (error) {
        throw new Error(
            `CIMD_CLIENT_PRIVATE_KEY could not be parsed as a PEM private key. Check it was stored as a real multi-line value, beginning with "-----BEGIN PRIVATE KEY-----". Underlying error: ${
                (error as Error).message
            }`
        )
    }
    return cachedPrivateKey
}

function publicJwk(privateKeyPem: string, kid: string): Record<string, unknown> {
    const jwk = crypto.createPublicKey(crypto.createPrivateKey(privateKeyPem)).export({ format: 'jwk' }) as Record<
        string,
        unknown
    >
    return { ...jwk, kid, use: 'sig', alg: 'RS256' }
}

/**
 * The JWK Set we publish at our `jwks_uri`, derived from the private keys rather than stored
 * separately. Deriving it means a published key can never drift from the key we sign with, which
 * is the failure mode that makes `private_key_jwt` setups mysteriously stop working.
 *
 * The previous key is included when configured, so a rotation has an overlap window instead of
 * an outage: verifiers holding a cached copy of the old set keep working while the new key
 * propagates.
 */
export function getPublicJwks(): { keys: Record<string, unknown>[] } {
    // Via getPrivateKey so a missing key raises the same clear error as signing does.
    const current = crypto.createPublicKey(getPrivateKey()).export({ format: 'jwk' }) as Record<string, unknown>
    const keys = [{ ...current, kid: getKeyId(), use: 'sig', alg: 'RS256' }]

    if (cimdConfig.previousPrivateKeyPem && cimdConfig.previousKeyId) {
        keys.push(publicJwk(cimdConfig.previousPrivateKeyPem, cimdConfig.previousKeyId))
    }

    return { keys }
}
