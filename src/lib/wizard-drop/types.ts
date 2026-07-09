/**
 * TypeScript contract for the wizard "drop" flow.
 *
 * Upstream (PostHog app) shapes come from two sources:
 * 1. Existing agentic provisioning endpoints (`account_requests`, `oauth/token`, `resources`) —
 *    transcribed from `ee/api/agentic_provisioning/views.py` in the monorepo.
 * 2. Net-new endpoints defined by the RFC (`wizard-drop-rfc.md` at the repo root) that the
 *    monorepo has not shipped yet: GitHub grants and the `configuration.wizard` block.
 *    Those shapes are this repo's best guess at the contract — reconcile them in
 *    `provisioning.ts` (the single parsing point) once the backend lands.
 */

export type ProvisioningError = { code: string; message: string }

/** `configuration.wizard` result attached to an account_requests response (net-new). */
export type WizardResult = { task_id: string; run_id: string } | { error: ProvisioningError }

export interface AccountRequestBody {
    /** Correlation id, echoed back in the response. */
    id: string
    email: string
    name: string
    scopes: string[]
    /** 43-128 char base64url; S256 of the PKCE verifier. Always required for CIMD/PKCE partners. */
    code_challenge: string
    code_challenge_method: 'S256'
    configuration: {
        region: 'US'
        organization_name: string
        /** Net-new bundled link + run block (RFC Phase C step 5). */
        wizard: {
            grant_id: string
            installation_id: number
            repository: string
            branch?: string
        }
    }
    orchestrator: { type: string }
    /** CIMD auth: the client metadata document URL, byte-for-byte. */
    client_id: string
}

/**
 * account_requests uses a `type`-discriminated envelope. The `registering` variant arrives with
 * HTTP 202 on the very first request for an unregistered CIMD client and is retried inside the
 * provisioning client, so callers only ever see the other variants (errors become thrown
 * ProvisioningRequestError / RateLimitedError / GrantExpiredError).
 */
export type AccountRequestResponse =
    | { id: string; type: 'oauth'; oauth: { code: string }; wizard?: WizardResult }
    | { id: string; type: 'requires_auth'; requires_auth: { url: string }; wizard?: WizardResult }

export interface TokenResponse {
    token_type: string
    access_token: string
    refresh_token: string
    expires_in: number
    account?: { id: string; available_teams?: Array<{ id: number; name?: string }> }
}

/** resources endpoints use a `status`-discriminated envelope (distinct from account_requests). */
export type ResourceCreateResponse = {
    status: 'complete'
    id: number
    service_id?: string
    complete: { access_configuration: { api_key: string; host: string } }
}

// ---- Net-new endpoints (RFC contract; not shipped in the monorepo yet) ----

export type GithubGrant = { grant_id: string; gh_login: string; email: string }

export type GrantRepository = { full_name: string; default_branch?: string }

export type GrantRepositoriesResponse =
    | { installed: true; installation_id: number; repositories: GrantRepository[] }
    | { installed: false }

export type WizardRunResponse = { task_id: string; run_id: string }

// ---- Browser <-> Gatsby function shapes ----

export type SessionResponse = { connected: boolean; gh_login?: string; email?: string }

export type ReposApiResponse =
    | { installed: true; installation_id: number; repositories: GrantRepository[] }
    | { installed: false; install_url: string }
    | { error: 'not_connected' | 'grant_expired' | 'fetch_failed' }

export type ProvisionApiResponse =
    | { status: 'success'; task_id: string; run_id: string }
    /** Account exists but the wizard run could not be created — never show "sign up" for this. */
    | { status: 'degraded' }
    /** Existing PostHog account: browser must navigate to `url` for login + consent. */
    | { status: 'requires_auth'; url: string }
    | { status: 'error'; code: 'grant_expired' | 'rate_limited' | 'provisioning_failed'; retry_after?: number }
