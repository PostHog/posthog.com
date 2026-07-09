/**
 * Typed client for the PostHog agentic provisioning API (CIMD/PKCE partner auth — the
 * `client_id` is our CIMD document URL, no secret; PKCE proof happens at token exchange).
 *
 * ALL parsing of upstream responses lives in this file on purpose: the GitHub-grant endpoints,
 * the `configuration.wizard` block, and the `github_integration`/`wizard_runs` resource actions
 * are net-new per `wizard-drop-rfc.md` and have not shipped in the monorepo yet, so this is the
 * single file to reconcile when they land. `getProvisioningClient()` returns the in-memory mock
 * when `WIZARD_DROP_MOCK=1`.
 */
import { API_VERSION, config } from './config'
import type {
    AccountRequestBody,
    AccountRequestResponse,
    GithubGrant,
    GrantRepositoriesResponse,
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
        body: { grant_id: string; installation_id: number }
    ): Promise<void>
    createWizardRun(
        bearer: string,
        teamId: number,
        body: { repository: string; branch?: string }
    ): Promise<WizardRunResponse>
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

type UpstreamResult = { status: number; headers: Headers; json: any }

/**
 * The first-ever request from an unregistered CIMD client returns
 * `202 {type:'registering', retry_after}` while PostHog fetches our metadata document in the
 * background. Retry a couple of times within the function's time budget, then give up.
 */
const MAX_REGISTERING_RETRIES = 2

async function request(
    method: 'GET' | 'POST',
    path: string,
    { body, bearer }: { body?: Record<string, unknown>; bearer?: string } = {}
): Promise<UpstreamResult> {
    const headers: Record<string, string> = { 'API-Version': API_VERSION }
    if (body) headers['Content-Type'] = 'application/json'
    if (bearer) headers['Authorization'] = `Bearer ${bearer}`

    for (let attempt = 0; ; attempt++) {
        const response = await fetch(`${config.posthogApiHost}${path}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        })
        let json: any = null
        try {
            json = await response.json()
        } catch {
            // Non-JSON body (e.g. gateway error page); callers treat null as an upstream failure.
        }
        if (response.status === 202 && json?.type === 'registering' && attempt < MAX_REGISTERING_RETRIES) {
            await sleep(Math.min(Number(json.retry_after) || 5, 5) * 1000)
            continue
        }
        return { status: response.status, headers: response.headers, json }
    }
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
        })
        throwIfRateLimited(result)
        const { status, json } = result
        if (status >= 200 && status < 300 && json?.grant_id) {
            return { grant_id: json.grant_id, gh_login: json.gh_login, email: json.email }
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
            )}/repositories?client_id=${encodeURIComponent(config.clientId)}`
        )
        throwIfRateLimited(result)
        const { status, json } = result
        if (isGrantError(status, json)) throw new GrantExpiredError()
        if (status >= 200 && status < 300 && typeof json?.installed === 'boolean') {
            return json.installed
                ? { installed: true, installation_id: json.installation_id, repositories: json.repositories ?? [] }
                : { installed: false }
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
        // Accept either a flat body or a resource-action `complete` envelope.
        const payload = json?.complete ?? json
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
