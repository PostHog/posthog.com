/**
 * posthog.com's identity as an OAuth client of PostHog.
 *
 * posthog.com is a CIMD client (draft-ietf-oauth-client-id-metadata-document): its `client_id`
 * IS the https URL of `static/.well-known/posthog.com.json`, so control of this domain is what
 * establishes who it is. There is no registration ceremony and therefore no way for PostHog to
 * hand us a client secret.
 *
 * To authenticate as a confidential client we hold a private key and sign a short-lived
 * assertion per request (RFC 7523 `private_key_jwt`). PostHog verifies it against the public
 * key we publish at our `jwks_uri`. Nothing secret is ever transmitted, and key rotation is
 * unilateral: publish a new key, switch the signing `kid`, drop the old one.
 *
 * This module is deliberately not wizard-specific. The wizard is the first consumer, but the
 * key and the CIMD document identify posthog.com as a whole to every PostHog API that accepts
 * a client assertion.
 */
export { getPublicJwks, hasSigningKey } from './keys'
export { createClientAssertion, CLIENT_ASSERTION_TYPE_JWT_BEARER } from './assertion'
export { cimdConfig } from './config'
