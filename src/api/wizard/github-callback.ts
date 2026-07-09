import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import { COOKIES, COOKIE_MAX_AGE, config } from '../../lib/wizard-drop/config'
import { clearCookie, parseCookies, setCookie, sign, verify } from '../../lib/wizard-drop/cookies'
import { redirectWithDrop, redirectWithError } from '../../lib/wizard-drop/http'
import { getProvisioningClient } from '../../lib/wizard-drop/provisioning'

/**
 * GitHub OAuth return leg. Verifies the CSRF state (signature + double-submit against the
 * cookie), exchanges the code for a server-side GitHub grant (tokens never reach this repo —
 * we only get an opaque grant id + display identity), then parks the grant in a signed cookie
 * and bounces back to /wizard.
 */
const handler = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    try {
        clearCookie(res, COOKIES.state)

        if (req.query.error) {
            // User clicked "Cancel" on GitHub's authorize screen.
            return redirectWithError(res, 'github_denied')
        }

        const code = typeof req.query.code === 'string' ? req.query.code : undefined
        const stateParam = typeof req.query.state === 'string' ? req.query.state : undefined
        const stateFromParam = verify<{ nonce: string }>(stateParam, COOKIE_MAX_AGE.state)
        const stateFromCookie = verify<{ nonce: string }>(parseCookies(req)[COOKIES.state], COOKIE_MAX_AGE.state)
        if (!code || !stateFromParam || !stateFromCookie || stateFromParam.nonce !== stateFromCookie.nonce) {
            return redirectWithError(res, 'github_auth')
        }

        const grant = await getProvisioningClient().createGithubGrant({
            code,
            redirect_uri: `${config.siteUrl}/api/wizard/github-callback`,
        })
        setCookie(
            res,
            COOKIES.grant,
            sign({ grant_id: grant.grant_id, gh_login: grant.gh_login, email: grant.email }),
            COOKIE_MAX_AGE.grant
        )
        return redirectWithDrop(res, 'connected')
    } catch (error) {
        console.error('wizard drop: github-callback failed', error)
        return redirectWithError(res, 'grant_exchange')
    }
}

export default handler
