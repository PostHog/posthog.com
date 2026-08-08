import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import { COOKIES, COOKIE_MAX_AGE, config } from '../../lib/wizard/config'
import { setCookie, sign } from '../../lib/wizard/cookies'
import { redirect, redirectWithError } from '../../lib/wizard/http'
import { generateNonce } from '../../lib/wizard/pkce'

/**
 * Starts the GitHub OAuth leg: mints a signed CSRF `state`, double-submits it as an httpOnly
 * cookie, and sends the browser to GitHub's authorize screen (no `scope` param — this is a
 * GitHub App, permissions come from the App itself). Mock mode skips github.com and loops
 * straight back to our callback.
 */
const handler = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    try {
        if (!config.stateSecret || (!config.mock && !config.githubClientId)) {
            console.error('wizard provisioning: github-start missing configuration')
            return redirectWithError(res, 'github_auth')
        }
        const state = sign({ nonce: generateNonce() })
        setCookie(res, COOKIES.state, state, COOKIE_MAX_AGE.state)

        const redirectUri = `${config.siteUrl}/api/wizard/github/callback`
        if (config.mock) {
            return redirect(res, `${redirectUri}?code=mock&state=${encodeURIComponent(state)}`)
        }
        const authorizeUrl =
            `https://github.com/login/oauth/authorize` +
            `?client_id=${encodeURIComponent(config.githubClientId as string)}` +
            `&redirect_uri=${encodeURIComponent(redirectUri)}` +
            `&state=${encodeURIComponent(state)}`
        return redirect(res, authorizeUrl)
    } catch (error) {
        console.error('wizard provisioning: github-start failed', error)
        return redirectWithError(res, 'github_auth')
    }
}

export default handler
