#!/usr/bin/env node
/**
 * Generate the RSA key pair backing posthog.com's CIMD client identity.
 *
 *   node bin/generate-cimd-key.mjs <kid>
 *
 * Only the private key is stored, as CIMD_CLIENT_PRIVATE_KEY. The public half is derived from it
 * and served at /api/oauth/jwks, so there is nothing to commit.
 *
 * Check what is already deployed before generating anything:
 *
 *   curl -s https://posthog.com/api/oauth/jwks | jq '.keys[] | {kid, kty, alg}'   # published keys
 *   vercel env ls                                                                # which vars are set
 *   vercel env pull .env.local                                                   # their values
 *
 * To tell whether a private key you hold is one of the published ones, compare the modulus:
 *
 *   node -e "const c=require('crypto');console.log(c.createPublicKey(process.env.CIMD_CLIENT_PRIVATE_KEY).export({format:'jwk'}).n)"
 *
 * To rotate without an outage:
 *
 *   1. Generate a new key with a new kid.
 *   2. Move the current CIMD_CLIENT_PRIVATE_KEY / _KEY_ID to the _PREVIOUS_ vars and set the new
 *      one as current. Both stay published, so cached copies of the old set keep working.
 *   3. After an hour (PostHog's JWKS cache TTL), drop the previous key.
 */
import crypto from 'crypto'

// Required rather than defaulted: a defaulted kid gets published as the label for a key nobody
// chose it for.
const kid = process.argv[2]
if (!kid) {
    console.error('Usage: node bin/generate-cimd-key.mjs <kid>')
    console.error('The kid is an opaque version label for the key, for example "sig-2026-07" or "sig-2".')
    console.error('')
    console.error('To see the keys currently published, and pick a kid that does not collide with them:')
    console.error("  curl -s https://posthog.com/api/oauth/jwks | jq '.keys[] | {kid, kty, alg}'")
    console.error('To see which CIMD_* vars are set in each environment:')
    console.error('  vercel env ls')
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
