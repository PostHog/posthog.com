/** Server-only. Deliberately not `GATSBY_`-prefixed, so none of this reaches the client bundle. */

import { cimdConfig } from '../cimd/config'

const mock = process.env.WIZARD_PROVISIONING_MOCK === '1'

export const config = {
    stateSecret:
        process.env.WIZARD_PROVISIONING_STATE_SECRET || (mock ? 'wizard-provisioning-mock-insecure-secret' : undefined),
    posthogApiHost: process.env.WIZARD_PROVISIONING_POSTHOG_API_HOST || 'https://us.posthog.com',
    /** Shared with `src/lib/cimd` so it cannot drift from the id assertions are signed with. */
    clientId: cimdConfig.clientId,
    siteUrl: process.env.WIZARD_PROVISIONING_SITE_URL || 'http://localhost:8001',
    githubClientId: process.env.WIZARD_PROVISIONING_GITHUB_APP_CLIENT_ID,
    githubAppSlug: process.env.WIZARD_PROVISIONING_GITHUB_APP_SLUG,
    mock,
}

/**
 * Nothing in the flow enforces a scope (the resource actions authorize by team-scoping + partner
 * auth), so this is least privilege only. Must stay in sync with `com.posthog.scopes` in the CIMD
 * document: a mismatch either fails token minting or over-grants.
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
    /** Matches the server-side grant store TTL. */
    grant: 3600,
    resume: 3600,
} as const

export const WIZARD_PAGE = '/wizard'
