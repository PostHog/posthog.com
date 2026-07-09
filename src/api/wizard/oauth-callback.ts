import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import { COOKIES, COOKIE_MAX_AGE } from '../../lib/wizard-drop/config'
import { clearCookie, parseCookies, verify } from '../../lib/wizard-drop/cookies'
import { redirectWithDrop, redirectWithError } from '../../lib/wizard-drop/http'
import { GrantExpiredError, getProvisioningClient } from '../../lib/wizard-drop/provisioning'
import type { ResumeCookie } from './provision'

/**
 * Existing-user resume leg: the provisioning API sent the visitor through PostHog login +
 * consent, and the consent flow delivered an OAuth code here (this URL is the CIMD document's
 * registered redirect_uri). The PKCE verifier parked in the signed httpOnly `resume` cookie is
 * both the token-exchange proof and the CSRF binding — only the browser that initiated the
 * provision step can complete it. The account already exists on this path, so failures after
 * the token exchange degrade rather than error.
 */
const handler = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    const resume = verify<ResumeCookie>(parseCookies(req)[COOKIES.resume], COOKIE_MAX_AGE.resume)
    if (!resume) {
        return redirectWithError(res, 'resume_expired')
    }

    const code = typeof req.query.code === 'string' ? req.query.code : undefined
    if (!code) {
        // User denied or abandoned the consent screen — nothing was changed on their account.
        clearCookie(res, COOKIES.resume)
        return redirectWithError(res, 'consent_denied')
    }

    const client = getProvisioningClient()
    let accessToken: string
    let teamId: number | undefined
    try {
        const token = await client.exchangeToken({ code, code_verifier: resume.code_verifier })
        accessToken = token.access_token
        // The consent flow scoped the token to the team the user picked.
        teamId = token.account?.available_teams?.[0]?.id
        if (!teamId) throw new Error('No team available on the provisioning token')
    } catch (error) {
        console.error('wizard drop: consent token exchange failed', error)
        clearCookie(res, COOKIES.resume)
        return redirectWithError(res, 'consent_failed')
    }

    clearCookie(res, COOKIES.resume)
    clearCookie(res, COOKIES.grant)
    try {
        await client.createGithubIntegration(accessToken, teamId, {
            grant_id: resume.grant_id,
            installation_id: resume.installation_id,
        })
    } catch (error) {
        if (error instanceof GrantExpiredError) {
            return redirectWithError(res, 'grant_expired')
        }
        console.error('wizard drop: github integration failed after consent', error)
        return redirectWithDrop(res, 'degraded')
    }

    try {
        await client.createWizardRun(accessToken, teamId, {
            repository: resume.repository,
            branch: resume.branch,
        })
    } catch (error) {
        console.error('wizard drop: wizard run failed after consent', error)
        return redirectWithDrop(res, 'degraded')
    }

    try {
        await client.createResource(accessToken, { service_id: 'free' })
    } catch (error) {
        console.error('wizard drop: non-fatal resource create failed', error)
    }
    return redirectWithDrop(res, 'done')
}

export default handler
