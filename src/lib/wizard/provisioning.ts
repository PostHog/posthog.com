/**
 * Typed client for the PostHog agentic provisioning API.
 *
 * posthog.com authenticates as a confidential CIMD client using `private_key_jwt`: each
 * partner-authenticated call carries a freshly signed assertion (see `src/lib/cimd`). The GitHub
 * grant endpoints require this, because they exchange GitHub OAuth codes and read back account
 * metadata, and a `client_id` anyone can send proves nothing. PKCE is still generated and still
 * proves the token exchange; the assertion is an additional factor, not a replacement.
 *
 * ALL parsing of upstream responses lives in this file on purpose: the GitHub-grant endpoints,
 * the `configuration.wizard` block, and the `github_integration`/`wizard_runs` resource actions
 * are net-new, so this is the single file to reconcile with the monorepo
 * contract (see `components/WizardProvisioning/README.md` for the reconciliation checklist).
 * `getProvisioningClient()` returns the in-memory mock when `WIZARD_PROVISIONING_MOCK=1`.
 */
import { CLIENT_ASSERTION_TYPE_JWT_BEARER, createClientAssertion } from '../cimd'
import { config } from './config'
import type {
    AccountRequestBody,
    AccountRequestResponse,
    GithubGrant,
    GrantRepositoriesResponse,
    GrantRepository,
    ResourceCreateResponse,
    TokenResponse,
    WizardRunResponse,
} from './types'

export class ProvisioningRequestError extends Error {
    constructor(public code: string, message: string, public httpStatus?: number) {
        super(message)
        this.name = 'ProvisioningRequestError'
    }
}

/** The server-side GitHub grant is gone (expired, consumed, or unknown) — restart Phase A. */
export class GrantExpiredError extends Error {
    constructor(message = 'GitHub grant expired') {
        super(message)
        this.name = 'GrantExpiredError'
    }
}

export class RateLimitedError extends Error {
    constructor(public retryAfter?: number) {
        super('Rate limited by the provisioning API')
        this.name = 'RateLimitedError'
    }
}

export interface ProvisioningClient {
    createGithubGrant(input: { code: string; redirect_uri: string }): Promise<GithubGrant>
    getGrantRepositories(grantId: string): Promise<GrantRepositoriesResponse>
    createAccountRequest(body: AccountRequestBody): Promise<AccountRequestResponse>
    exchangeToken(input: { code: string; code_verifier: string }): Promise<TokenResponse>
    createResource(bearer: string, body: { service_id: 'free' }): Promise<ResourceCreateResponse>
    createGithubIntegration(
        bearer: string,
        teamId: number,
        body: { grant_id: string; installation_id: string }
    ): Promise<void>
    createWizardRun(
        bearer: string,
        teamId: number,
        body: { repository: string; branch?: string }
    ): Promise<WizardRunResponse>
}

type UpstreamResult = { status: number; headers: Headers; json: any }

/**
 * Assertions are addressed to the token endpoint. PostHog accepts either its own origin or that
 * path as the audience on every endpoint, so one value works for all of them.
 */
const ASSERTION_AUDIENCE_PATH = '/api/agentic/oauth/token'

/** Registration is explicit: every other endpoint refuses an unregistered client and names this. */
const CLIENT_REGISTRATION_PATH = '/api/agentic/provisioning/client_registration'

/**
 * A client that has never been registered gets a 401 naming the registration endpoint. Self-heal
 * once rather than requiring a deploy step, then give up so a genuinely misconfigured client
 * fails loudly instead of looping.
 */
const MAX_REGISTRATION_ATTEMPTS = 2

function looksUnregistered(status: number, json: any): boolean {
    if (status !== 401) return false
    const message = typeof json?.error?.message === 'string' ? json.error.message : ''
    return message.includes('client_registration')
}

async function request(
    method: 'GET' | 'POST',
    path: string,
    { body, bearer, authenticate }: { body?: Record<string, unknown>; bearer?: string; authenticate?: boolean } = {}
): Promise<UpstreamResult> {
    for (let attempt = 0; ; attempt++) {
        // Minted per attempt on purpose: PostHog treats an assertion's `jti` as single-use, so a
        // retry that reused one would be rejected as a replay.
        const result = await sendOnce(method, path, { body, bearer, authenticate })
        if (attempt + 1 >= MAX_REGISTRATION_ATTEMPTS || !looksUnregistered(result.status, result.json)) {
            return result
        }
        const registered = await sendOnce('POST', CLIENT_REGISTRATION_PATH, {
            body: { client_id: config.clientId },
        })
        if (registered.status < 200 || registered.status >= 300) {
            // Surface the registration failure rather than the downstream 401: its `checks` array
            // says which part of our own setup is wrong.
            return registered
        }
    }
}

async function sendOnce(
    method: 'GET' | 'POST',
    path: string,
    { body, bearer, authenticate }: { body?: Record<string, unknown>; bearer?: string; authenticate?: boolean }
): Promise<UpstreamResult> {
    const headers: Record<string, string> = {}
    if (bearer) headers['Authorization'] = `Bearer ${bearer}`

    let url = `${config.posthogApiHost}${path}`
    let payload = body

    if (authenticate) {
        const assertion = createClientAssertion(`${config.posthogApiHost}${ASSERTION_AUDIENCE_PATH}`)
        if (method === 'GET') {
            // A GET has no body to carry the assertion, so it rides the query string. Safe enough
            // here: an assertion is single-use and expires in a minute, so one that reaches a log
            // is already spent.
            const separator = url.includes('?') ? '&' : '?'
            url += `${separator}${new URLSearchParams({
                client_assertion: assertion,
                client_assertion_type: CLIENT_ASSERTION_TYPE_JWT_BEARER,
            }).toString()}`
        } else {
            payload = {
                ...body,
                client_assertion: assertion,
                client_assertion_type: CLIENT_ASSERTION_TYPE_JWT_BEARER,
            }
        }
    }

    if (payload) headers['Content-Type'] = 'application/json'

    const response = await fetch(url, {
        method,
        headers,
        body: payload ? JSON.stringify(payload) : undefined,
    })
    let json: any = null
    try {
        json = await response.json()
    } catch {
        // Non-JSON body (e.g. gateway error page); callers treat null as an upstream failure.
    }
    return { status: response.status, headers: response.headers, json }
}

function throwIfRateLimited({ status, headers, json }: UpstreamResult): void {
    if (status === 429) {
        const header = headers.get('Retry-After')
        throw new RateLimitedError(header ? Number(header) : undefined)
    }
    if (json?.error?.code === 'rate_limited') {
        throw new RateLimitedError()
    }
}

/**
 * Grant-not-found discrimination is a contract guess (the grant store is net-new): treat
 * 404/410 on grant-bearing calls, or any error code mentioning the grant, as an expired grant.
 */
function isGrantError(status: number, json: any): boolean {
    if (status === 404 || status === 410) return true
    const code = json?.error?.code
    return typeof code === 'string' && code.includes('grant')
}

function errorCode(json: any, fallback: string): string {
    return json?.error?.code || json?.error || fallback
}

function errorMessage(json: any, fallback: string): string {
    return json?.error?.message || json?.error_description || fallback
}

const realClient: ProvisioningClient = {
    async createGithubGrant({ code, redirect_uri }) {
        const result = await request('POST', '/api/agentic/provisioning/github/grants', {
            body: { code, redirect_uri, client_id: config.clientId },
            authenticate: true,
        })
        throwIfRateLimited(result)
        const { status, json } = result
        if (status >= 200 && status < 300 && json?.grant_id) {
            // The POST fetches /user/emails server-side and returns the verified email here — we
            // never fetch it ourselves. `email` is null when GitHub has no verified email (still a
            // usable grant; the provisioning flow collects one inline). `expires_in` (grant store TTL, 3600s) is
            // surfaced so the cookie mirror can track the authoritative server-side expiry.
            return {
                grant_id: json.grant_id,
                gh_login: json.gh_login,
                email: typeof json.email === 'string' ? json.email : null,
                expires_in: typeof json.expires_in === 'number' ? json.expires_in : undefined,
            }
        }
        throw new ProvisioningRequestError(
            errorCode(json, 'grant_exchange_failed'),
            errorMessage(json, 'Failed to exchange the GitHub OAuth code'),
            status
        )
    },

    async getGrantRepositories(grantId) {
        const result = await request(
            'GET',
            `/api/agentic/provisioning/github/grants/${encodeURIComponent(
                grantId
            )}/repositories?client_id=${encodeURIComponent(config.clientId)}`,
            { authenticate: true }
        )
        throwIfRateLimited(result)
        const { status, json } = result
        if (isGrantError(status, json)) throw new GrantExpiredError()
        // Upstream shape: {gh_login, installations: [{id, account_login, repository_selection}],
        // repositories: [{installation_id, full_name, default_branch, private}]}. No `installed`
        // flag — the App is installed iff `installations` is non-empty. Each repo carries its own
        // installation_id (a user may have installed on several accounts), so we normalize to a
        // flat list keyed per-repo and let the picker choose which installation the run targets.
        // installation_id arrives as a string from GitHub; we keep it as one (never parse to a
        // number) and only require it to be present.
        if (status >= 200 && status < 300 && Array.isArray(json?.installations)) {
            if (json.installations.length === 0) {
                return { installed: false }
            }
            const repositories: GrantRepository[] = (Array.isArray(json.repositories) ? json.repositories : [])
                .filter(
                    (repo: any) =>
                        repo?.full_name &&
                        (typeof repo.installation_id === 'string' || typeof repo.installation_id === 'number') &&
                        String(repo.installation_id).length > 0
                )
                .map((repo: any) => ({
                    full_name: repo.full_name,
                    default_branch: repo.default_branch,
                    installation_id: String(repo.installation_id),
                    private: repo.private,
                }))
            return { installed: true, repositories }
        }
        throw new ProvisioningRequestError(
            errorCode(json, 'repositories_failed'),
            errorMessage(json, 'Failed to list repositories for the grant'),
            status
        )
    },

    async createAccountRequest(body) {
        const result = await request('POST', '/api/agentic/provisioning/account_requests', {
            body: { ...body, client_id: config.clientId },
            authenticate: true,
        })
        throwIfRateLimited(result)
        const { status, json } = result
        if (status >= 200 && status < 300 && (json?.type === 'oauth' || json?.type === 'requires_auth')) {
            return json as AccountRequestResponse
        }
        if (isGrantError(status, json)) throw new GrantExpiredError()
        throw new ProvisioningRequestError(
            errorCode(json, 'account_request_failed'),
            errorMessage(json, 'Account provisioning failed'),
            status
        )
    },

    async exchangeToken({ code, code_verifier }) {
        const result = await request('POST', '/api/agentic/oauth/token', {
            body: { grant_type: 'authorization_code', code, code_verifier, client_id: config.clientId },
            authenticate: true,
        })
        throwIfRateLimited(result)
        const { status, json } = result
        if (status >= 200 && status < 300 && json?.access_token) {
            return json as TokenResponse
        }
        // The token endpoint uses OAuth-style errors ({error, error_description}).
        throw new ProvisioningRequestError(
            errorCode(json, 'token_exchange_failed'),
            errorMessage(json, 'Token exchange failed'),
            status
        )
    },

    async createResource(bearer, body) {
        const result = await request('POST', '/api/agentic/provisioning/resources', { body, bearer })
        throwIfRateLimited(result)
        const { status, json } = result
        if (status >= 200 && status < 300 && json?.status === 'complete') {
            return json as ResourceCreateResponse
        }
        throw new ProvisioningRequestError(
            errorCode(json, 'resource_create_failed'),
            errorMessage(json, 'Resource creation failed'),
            status
        )
    },

    async createGithubIntegration(bearer, teamId, body) {
        const result = await request('POST', `/api/agentic/provisioning/resources/${teamId}/github_integration`, {
            body,
            bearer,
        })
        throwIfRateLimited(result)
        const { status, json } = result
        if (isGrantError(status, json)) throw new GrantExpiredError()
        if (status >= 200 && status < 300 && json?.status !== 'error') {
            return
        }
        throw new ProvisioningRequestError(
            errorCode(json, 'github_integration_failed'),
            errorMessage(json, 'Failed to attach the GitHub integration'),
            status
        )
    },

    async createWizardRun(bearer, teamId, body) {
        const result = await request('POST', `/api/agentic/provisioning/resources/${teamId}/wizard_runs`, {
            body,
            bearer,
        })
        throwIfRateLimited(result)
        const { status, json } = result
        // The resource action wraps the run under `wizard_run` in a `{status:"complete", id,
        // wizard_run:{task_id, run_id, status}}` envelope; also accept a `complete` envelope or a
        // flat body defensively.
        const payload = json?.wizard_run ?? json?.complete ?? json
        if (status >= 200 && status < 300 && payload?.task_id && payload?.run_id) {
            return { task_id: payload.task_id, run_id: payload.run_id }
        }
        throw new ProvisioningRequestError(
            errorCode(json, 'wizard_run_failed'),
            errorMessage(json, 'Failed to create the wizard run'),
            status
        )
    },
}

export function getProvisioningClient(): ProvisioningClient {
    if (config.mock) {
        // Lazy-required so the mock module (and its in-memory state) never loads in production.
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return require('./mock').mockClient
    }
    return realClient
}
