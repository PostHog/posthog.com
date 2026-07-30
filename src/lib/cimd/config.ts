/** Server-only. Deliberately not `GATSBY_`-prefixed: a private key must never reach the bundle. */

export const cimdConfig = {
    privateKeyPem: process.env.CIMD_CLIENT_PRIVATE_KEY,
    /** No default: it is the label the key is published under, so it has to be chosen. */
    keyId: process.env.CIMD_CLIENT_KEY_ID,
    /** Set during a rotation so both keys stay published while caches hold the old set. */
    previousPrivateKeyPem: process.env.CIMD_CLIENT_PREVIOUS_PRIVATE_KEY,
    previousKeyId: process.env.CIMD_CLIENT_PREVIOUS_KEY_ID,
    /** Must byte-for-byte equal the URL serving the CIMD document. */
    clientId: process.env.CIMD_CLIENT_ID || 'https://posthog.com/.well-known/posthog.com.json',
}
