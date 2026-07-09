import crypto from 'crypto'

/**
 * RFC 7636 PKCE pair. The provisioning API requires S256 with a 43-128 char base64url
 * challenge; 32 random bytes → a 43-char verifier, and the challenge is base64url(SHA-256).
 */
export function generatePkcePair(): { verifier: string; challenge: string } {
    const verifier = crypto.randomBytes(32).toString('base64url')
    const challenge = crypto.createHash('sha256').update(verifier).digest('base64url')
    return { verifier, challenge }
}

export function generateNonce(): string {
    return crypto.randomBytes(16).toString('base64url')
}
