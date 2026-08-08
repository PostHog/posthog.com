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
     * `kid` for the signing key. Opaque, and only meaningful as a version label: it is how a
     * verifier picks the right key out of a JWK Set holding more than one, which is what makes
     * rotation possible. Not an identifier for us, since `client_id` already is that.
     *
     * Deliberately no default. A defaulted kid gets published as the label for a key nobody chose
     * it for, and the whole point of the value is telling two keys apart during a rotation.
     */
    keyId: process.env.CIMD_CLIENT_KEY_ID,
    /**
     * Optional previous key, kept published through a rotation. PostHog caches a JWK Set for an
     * hour, so a swap that publishes only the new key leaves anything holding the old cached copy
     * unable to verify us until it expires. Publishing both for one overlap window avoids that.
     * Remove once the old key is out of every cache.
     */
    previousPrivateKeyPem: process.env.CIMD_CLIENT_PREVIOUS_PRIVATE_KEY,
    previousKeyId: process.env.CIMD_CLIENT_PREVIOUS_KEY_ID,
    /**
     * Our `client_id`, which must byte-for-byte equal the URL serving the CIMD document.
     */
    clientId: process.env.CIMD_CLIENT_ID || 'https://posthog.com/.well-known/posthog.com.json',
}
