/**
 * TypeScript contract for the wizard provisioning flow.
 *
 * Upstream (PostHog app) shapes are transcribed from `ee/api/agentic_provisioning/` in the
 * monorepo. The GitHub grant store and the `configuration.wizard` block are the newest parts of
 * that API, so they are the ones most worth re-checking; all parsing lives in `provisioning.ts`
 * (the single parsing point), and `components/WizardProvisioning/README.md` holds the
 * reconciliation checklist and the open coordination items.
 */

export type ProvisioningError = { code: string; message: string }

/** `configuration.wizard` result attached to an account_requests response. */
export type WizardResult = { task_id: string; run_id: string } | { error: ProvisioningError }

export interface AccountRequestBody {
    /** Correlation id, echoed back in the response. */
    id: string
    email: string
    name: string
    scopes: string[]
    /** 43-128 char base64url; S256 of the PKCE verifier. Required for every client, public or not. */
    code_challenge: string
    code_challenge_method: 'S256'
    configuration: {
        /** Narrowed to the one region this flow serves. */
        region: 'US'
        organization_name: string
        /** Bundled block: links the GitHub install to the new team and starts the wizard run. */
        wizard: {
            grant_id: string
            // GitHub installation id, carried as a string end-to-end: the upstream repositories
            // listing emits it as a string and the wizard block / github_integration action both
            // coerce with `str(...)`, so we never treat it as a number.
            installation_id: string
            repository: string
        }
    }
    /** Our CIMD client id: the client metadata document URL, byte-for-byte. */
    client_id: string
}

/**
 * account_requests uses a `type`-discriminated envelope. Errors become thrown
 * ProvisioningRequestError / RateLimitedError / GrantExpiredError, so callers only ever see the
 * two success variants. An unregistered client gets a 401 naming the registration endpoint, which
 * the provisioning client handles by registering once and retrying.
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
    complete: { access_configuration: { api_key: string; host: string } }
}

// ---- Net-new endpoints (GitHub grant store; reconciled against the monorepo) ----

// `email` is null when GitHub reports no verified email — still a fully usable grant (the
// provisioning flow collects the address inline). It is NOT the App-permission-refusal case, which is a 502
// `email_unavailable` handled as a terminal misconfiguration error.
export type GithubGrant = { grant_id: string; gh_login: string; email: string | null; expires_in?: number }

/**
 * One repo the grant can open a PR against. `installation_id` is carried per-repo because a user
 * can have the App installed on several accounts (orgs + personal) — the upstream listing returns
 * a flat `repositories` array where each entry names its own installation, and the wizard block /
 * github_integration action both need the installation that owns the *selected* repo.
 */
export type GrantRepository = {
    full_name: string
    /** GitHub installation id as a string — the upstream listing emits it as a string. */
    installation_id: string
    private?: boolean
}

/**
 * Normalized in `provisioning.ts` from the upstream
 * `{gh_login, installations: [...], repositories: [...]}` shape. `installed: false` means no
 * installation exists yet (empty `installations`); `installed: true` with an empty `repositories`
 * is a real state (installation granted zero repos) handled as the `no_repos` terminal error.
 * The list can be truncated (upstream caps at 300 repos/installation), so it is never treated as
 * exhaustive.
 */
export type GrantRepositoriesResponse = { installed: true; repositories: GrantRepository[] } | { installed: false }

export type WizardRunResponse = { task_id: string; run_id: string }

// ---- Browser <-> Gatsby function shapes ----

export type SessionResponse = { connected: boolean; gh_login?: string; email?: string }

export type ReposApiResponse =
    | { installed: true; repositories: GrantRepository[] }
    | { installed: false; install_url: string }
    | { error: 'not_connected' | 'grant_expired' | 'fetch_failed' }

export type ProvisionApiResponse =
    | { status: 'success'; task_id: string; run_id: string }
    /** Account exists but the wizard run could not be created — never show "sign up" for this. */
    | { status: 'degraded' }
    /** Existing PostHog account: browser must navigate to `url` for login + consent. */
    | { status: 'requires_auth'; url: string }
    | { status: 'error'; code: 'grant_expired' | 'rate_limited' | 'provisioning_failed'; retry_after?: number }
