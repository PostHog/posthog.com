import crypto from 'crypto'

import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import { COOKIES, COOKIE_MAX_AGE, PROVISIONING_SCOPES, config } from '../../lib/wizard-drop/config'
import { clearCookie, parseCookies, setCookie, sign, verify } from '../../lib/wizard-drop/cookies'
import { parseBody } from '../../lib/wizard-drop/http'
import { generatePkcePair } from '../../lib/wizard-drop/pkce'
import {
    GrantExpiredError,
    ProvisioningClient,
    RateLimitedError,
    getProvisioningClient,
} from '../../lib/wizard-drop/provisioning'
import type { AccountRequestResponse, ProvisionApiResponse, TokenResponse } from '../../lib/wizard-drop/types'
import type { GrantCookie } from './session'

export type ResumeCookie = {
    code_verifier: string
    grant_id: string
    installation_id: string
    repository: string
    branch?: string
}

/** Sanity check only; the provisioning API is the authoritative email validator. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Phase C of the drop (RFC "End-to-end flow"): one confirm click provisions the account and
 * starts the wizard run via the bundled `configuration.wizard` block on account_requests.
 *
 * Response semantics mirror the RFC's error-handling table:
 * - `requires_auth`: existing PostHog account — the browser must complete login + consent; the
 *   PKCE verifier and repo selection are parked in the signed `resume` cookie for oauth-callback.
 * - `degraded`: the account was created but no wizard run exists (bundled block failed AND the
 *   granular retry failed). Never an `error` — "sign up manually" would be wrong advice here.
 * - `error`: nothing was created; the UI can safely offer manual signup.
 */
const handler = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    res.setHeader('Cache-Control', 'no-store')
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }
    const respond = (body: ProvisionApiResponse, status = 200) => res.status(status).json(body)

    if (!config.stateSecret) {
        return respond({ status: 'error', code: 'provisioning_failed' })
    }
    const grant = verify<GrantCookie>(parseCookies(req)[COOKIES.grant], COOKIE_MAX_AGE.grant)
    if (!grant) {
        return respond({ status: 'error', code: 'grant_expired' })
    }

    const body = parseBody(req.body)
    // installation_id is an opaque GitHub id kept as a string end-to-end (see types.ts); coerce a
    // stray number defensively but never parse it into one.
    const installationId =
        typeof body.installation_id === 'string'
            ? body.installation_id
            : typeof body.installation_id === 'number'
            ? String(body.installation_id)
            : ''
    const repository = typeof body.repository === 'string' ? body.repository : ''
    const branch = typeof body.branch === 'string' && body.branch ? body.branch : undefined
    // Email is collected inline in the drop UI (defaulted from GitHub) and always sent explicitly,
    // so it comes from the browser rather than the grant — the grant's copy may be absent.
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    if (!installationId || !repository || !EMAIL_RE.test(email)) {
        return res.status(400).json({ error: 'installation_id, repository, and a valid email are required' })
    }

    const client = getProvisioningClient()
    const pkce = generatePkcePair()

    let account: AccountRequestResponse
    try {
        account = await client.createAccountRequest({
            id: crypto.randomUUID(),
            email,
            name: grant.gh_login,
            scopes: PROVISIONING_SCOPES,
            code_challenge: pkce.challenge,
            code_challenge_method: 'S256',
            configuration: {
                region: 'US',
                organization_name: grant.gh_login,
                wizard: { grant_id: grant.grant_id, installation_id: installationId, repository, branch },
            },
            orchestrator: { type: 'posthog_website' },
            client_id: config.clientId,
        })
    } catch (error) {
        if (error instanceof GrantExpiredError) {
            clearCookie(res, COOKIES.grant)
            return respond({ status: 'error', code: 'grant_expired' })
        }
        if (error instanceof RateLimitedError) {
            return respond({ status: 'error', code: 'rate_limited', retry_after: error.retryAfter }, 429)
        }
        console.error('wizard drop: account_requests failed', error)
        return respond({ status: 'error', code: 'provisioning_failed' })
    }

    if (account.type === 'requires_auth') {
        setCookie(
            res,
            COOKIES.resume,
            sign({
                code_verifier: pkce.verifier,
                grant_id: grant.grant_id,
                installation_id: installationId,
                repository,
                branch,
            }),
            COOKIE_MAX_AGE.resume
        )
        return respond({ status: 'requires_auth', url: account.requires_auth.url })
    }

    // From here on the account exists — every outcome is success or degraded, never error.
    if (account.wizard && 'task_id' in account.wizard) {
        await completeProvisioningTail(client, account.oauth.code, pkce.verifier)
        clearCookie(res, COOKIES.grant)
        return respond({ status: 'success', task_id: account.wizard.task_id, run_id: account.wizard.run_id })
    }

    try {
        const run = await retryWizardGranularly(client, account.oauth.code, pkce.verifier, {
            grant_id: grant.grant_id,
            installation_id: installationId,
            repository,
            branch,
        })
        clearCookie(res, COOKIES.grant)
        return respond({ status: 'success', task_id: run.task_id, run_id: run.run_id })
    } catch (error) {
        console.error('wizard drop: granular retry failed, responding degraded', error)
        clearCookie(res, COOKIES.grant)
        return respond({ status: 'degraded' })
    }
}

/** Non-fatal tail after a bundled success: durable partner↔team link via a resource create. */
async function completeProvisioningTail(client: ProvisioningClient, code: string, verifier: string): Promise<void> {
    try {
        const token = await client.exchangeToken({ code, code_verifier: verifier })
        await client.createResource(token.access_token, { service_id: 'free' })
    } catch (error) {
        console.error('wizard drop: non-fatal provisioning tail failed', error)
    }
}

/** The bundled wizard block failed after bootstrap — retry via the granular resource actions. */
async function retryWizardGranularly(
    client: ProvisioningClient,
    code: string,
    verifier: string,
    wizard: Omit<ResumeCookie, 'code_verifier'>
): Promise<{ task_id: string; run_id: string }> {
    const token: TokenResponse = await client.exchangeToken({ code, code_verifier: verifier })
    const teamId = token.account?.available_teams?.[0]?.id
    if (!teamId) {
        throw new Error('No team available on the provisioning token')
    }
    await client.createGithubIntegration(token.access_token, teamId, {
        grant_id: wizard.grant_id,
        installation_id: wizard.installation_id,
    })
    const run = await client.createWizardRun(token.access_token, teamId, {
        repository: wizard.repository,
        branch: wizard.branch,
    })
    try {
        await client.createResource(token.access_token, { service_id: 'free' })
    } catch (error) {
        console.error('wizard drop: non-fatal resource create failed', error)
    }
    return run
}

export default handler
