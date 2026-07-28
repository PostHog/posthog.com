#!/usr/bin/env node
/**
 * Generate the RSA keypair backing posthog.com's CIMD client identity.
 *
 * Only the private key is stored, as the `CIMD_CLIENT_PRIVATE_KEY` env var. The public half is
 * derived from it and served at /api/oauth/jwks, so there is nothing to commit and no second
 * copy to keep in sync.
 *
 * Usage:
 *   node bin/generate-cimd-key.mjs [kid]
 *
 * To rotate: run this with a new kid, add the new key to the env, and let the old one age out of
 * PostHog's JWKS cache (1 hour) before removing it.
 */
import crypto from 'crypto'

const kid = process.argv[2] || `posthog-com-${new Date().toISOString().slice(0, 10)}`

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
