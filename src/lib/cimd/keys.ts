import crypto from 'crypto'

import { cimdConfig } from './config'

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

/**
 * Shared by every caller so the newline repair applies to all of them: a PEM flattened to one line
 * somewhere in transit fails to decode with an opaque OpenSSL error, and repairing it is safe
 * since a real PEM never contains a literal backslash.
 */
function parsePrivateKey(pem: string, envVar: string): crypto.KeyObject {
    const repaired = pem.includes('\\n') ? pem.replace(/\\n/g, '\n') : pem
    try {
        return crypto.createPrivateKey(repaired)
    } catch (error) {
        throw new Error(
            `${envVar} could not be parsed as a PEM private key. Check it was stored as a real multi-line value, beginning with "-----BEGIN PRIVATE KEY-----". Underlying error: ${
                (error as Error).message
            }`
        )
    }
}

export function getPrivateKey(): crypto.KeyObject {
    if (cachedPrivateKey) return cachedPrivateKey
    if (!cimdConfig.privateKeyPem) {
        throw new Error('CIMD_CLIENT_PRIVATE_KEY is not configured, so posthog.com cannot sign client assertions')
    }
    cachedPrivateKey = parsePrivateKey(cimdConfig.privateKeyPem, 'CIMD_CLIENT_PRIVATE_KEY')
    return cachedPrivateKey
}

function publicJwk(key: crypto.KeyObject, kid: string): Record<string, unknown> {
    const jwk = crypto.createPublicKey(key).export({ format: 'jwk' }) as Record<string, unknown>
    return { ...jwk, kid, use: 'sig', alg: 'RS256' }
}

/**
 * The JWK Set we publish at our `jwks_uri`, derived from the private keys rather than stored
 * separately so a published key can never drift from the key we sign with. The previous key is
 * included when configured, giving a rotation an overlap window instead of an outage.
 */
export function getPublicJwks(): { keys: Record<string, unknown>[] } {
    const keys = [publicJwk(getPrivateKey(), getKeyId())]

    if (cimdConfig.previousPrivateKeyPem && cimdConfig.previousKeyId) {
        // Degrading the overlap window beats 500ing the whole set, which would fail every
        // assertion once PostHog's cached copy expired.
        try {
            keys.push(
                publicJwk(
                    parsePrivateKey(cimdConfig.previousPrivateKeyPem, 'CIMD_CLIENT_PREVIOUS_PRIVATE_KEY'),
                    cimdConfig.previousKeyId
                )
            )
        } catch (error) {
            console.error('cimd: previous signing key is set but unusable, serving the current key only', error)
        }
    }

    return { keys }
}
