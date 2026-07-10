/**
 * Env + constants for the wizard drop flow. All env vars are server-only (read inside Gatsby
 * Functions) and deliberately NOT `GATSBY_`-prefixed so they can never be inlined into the
 * client bundle.
 */

const mock = process.env.WIZARD_DROP_MOCK === '1'

export const config = {
    /** HMAC key for signed cookies + the OAuth `state` param. Required outside mock mode. */
    stateSecret: process.env.WIZARD_DROP_STATE_SECRET || (mock ? 'wizard-drop-mock-insecure-secret' : undefined),
    /** PostHog app host serving the agentic provisioning API. Drop v1 is US-only. */
    posthogApiHost: process.env.WIZARD_DROP_POSTHOG_API_HOST || 'https://us.posthog.com',
    /** CIMD client id — must byte-for-byte equal the URL of static/.well-known/wizard-drop-client.json. */
    clientId: process.env.WIZARD_DROP_CLIENT_ID || 'https://posthog.com/.well-known/wizard-drop-client.json',
    /** Base URL used to build redirect URIs back to this site. */
    siteUrl: process.env.WIZARD_DROP_SITE_URL || 'http://localhost:8001',
    /** GitHub App OAuth client id (public value, but server-held to keep it out of the bundle). */
    githubClientId: process.env.WIZARD_DROP_GITHUB_APP_CLIENT_ID,
    /** GitHub App slug, for the "install the app" URL. */
    githubAppSlug: process.env.WIZARD_DROP_GITHUB_APP_SLUG,
    /** Mock mode: swaps the provisioning client for an in-memory fake and skips github.com. */
    mock,
}

/** Only supported provisioning API version; sent as the `API-Version` header on every call. */
export const API_VERSION = '0.1d'

/**
 * Scopes requested on account_requests → the scope of the minted partner token.
 *
 * The drop's team-scoped resource actions (`github_integration`, `wizard_runs`) and the
 * `resources` create authorize by team-scoping (`team_id in scoped_teams`) + CIMD partner auth,
 * NOT by OAuth scopes — so nothing in the flow enforces a specific scope. We still request a
 * minimal read set for least privilege (the alternative, sending `[]`, defaults the token to the
 * broad `StripeIntegration.SCOPES`, including writes it never uses). Both entries are unprivileged
 * and grantable. Must stay in sync with `com.posthog.scopes` in the CIMD document (the app's scope
 * ceiling) — a mismatch either fails token minting (`invalid_scope`) or over-grants.
 */
export const PROVISIONING_SCOPES: string[] = ['organization:read', 'project:read']

export const COOKIES = {
    /** CSRF nonce for the GitHub OAuth leg. */
    state: 'ph_wizard_state',
    /** Opaque GitHub grant handle + display identity. */
    grant: 'ph_wizard_grant',
    /** PKCE verifier + repo selection, parked across the existing-user consent detour. */
    resume: 'ph_wizard_resume',
} as const

/** Scoped so the cookies never ride along on page/asset requests. */
export const COOKIE_PATH = '/api/wizard'

export const COOKIE_MAX_AGE = {
    state: 600,
    /** Matches the server-side grant store TTL (~60 min). */
    grant: 3600,
    resume: 3600,
} as const

/** Where all error/done redirects land; the WizardDrop component parses `?drop=` + `?code=`. */
export const WIZARD_PAGE = '/wizard'
