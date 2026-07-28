/**
 * Env for posthog.com's CIMD client identity. Server-only, so deliberately not
 * `GATSBY_`-prefixed: a private key must never be inlined into the client bundle.
 */

export const cimdConfig = {
    /**
     * PEM-encoded RSA private key used to sign client assertions. Generate with
     * `node bin/generate-cimd-key.mjs` and paste the PEM into the Vercel env, newlines and all.
     */
    privateKeyPem: process.env.CIMD_CLIENT_PRIVATE_KEY,
    /**
     * `kid` published alongside the public key. Assertions carry it in their header so PostHog
     * picks the right key when more than one is published during a rotation.
     */
    keyId: process.env.CIMD_CLIENT_KEY_ID || 'posthog-com-1',
    /**
     * Our `client_id`, which must byte-for-byte equal the URL serving the CIMD document.
     */
    clientId: process.env.CIMD_CLIENT_ID || 'https://posthog.com/.well-known/posthog.com.json',
}
