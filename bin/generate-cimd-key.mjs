#!/usr/bin/env node
/**
 * Generate the RSA key pair backing posthog.com's CIMD client identity.
 *
 * Only the private key is stored, as the `CIMD_CLIENT_PRIVATE_KEY` env var. The public half is
 * derived from it and served at /api/oauth/jwks, so there is nothing to commit and no second
 * copy to keep in sync.
 *
 * Usage:
 *   node bin/generate-cimd-key.mjs <kid>
 *
 * The kid is an opaque version label, and only matters for telling two keys apart during a
 * rotation. To rotate without an outage:
 *
 *   1. Generate a new key with a new kid.
 *   2. Move the current CIMD_CLIENT_PRIVATE_KEY / _KEY_ID to
 *      CIMD_CLIENT_PREVIOUS_PRIVATE_KEY / CIMD_CLIENT_PREVIOUS_KEY_ID, and set the new one as
 *      current. Both are then published, so anything holding a cached copy of the old JWK Set
 *      keeps working while the new key propagates.
 *   3. After an hour (PostHog's JWKS cache TTL), drop the previous key.
 */
import crypto from 'crypto'

// Required rather than defaulted: the kid is the label this key is published under, and picking
// it deliberately is what lets you tell two keys apart when you rotate.
const kid = process.argv[2]
if (!kid) {
    console.error('Usage: node bin/generate-cimd-key.mjs <kid>')
    console.error('The kid is an opaque version label for the key, for example "sig-2026-07" or "sig-2".')
    process.exit(1)
}

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
})

const jwk = crypto.createPublicKey(publicKey).export({ format: 'jwk' })

process.stdout.write(`CIMD_CLIENT_KEY_ID=${kid}\n\n`)
process.stdout.write('Set CIMD_CLIENT_PRIVATE_KEY to the following, newlines included:\n\n')
process.stdout.write(`${privateKey}\n`)
process.stdout.write('The derived public JWK (served automatically, shown only so you can eyeball it):\n')
process.stdout.write(`${JSON.stringify({ ...jwk, kid, use: 'sig', alg: 'RS256' }, null, 2)}\n`)
