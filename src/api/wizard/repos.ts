import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import { COOKIES, COOKIE_MAX_AGE, config } from '../../lib/wizard/config'
import { clearCookie, parseCookies, verify } from '../../lib/wizard/cookies'
import { GrantExpiredError, getProvisioningClient } from '../../lib/wizard/provisioning'
import type { ReposApiResponse } from '../../lib/wizard/types'
import type { GrantCookie } from './session'

/**
 * Lists the repositories the visitor's GitHub App installation grants. The GitHub API call
 * happens upstream (the grant store holds the tokens) — this function only carries the opaque
 * grant id. `installed: false` means the App isn't installed yet; the UI opens `install_url`
 * and polls this endpoint until an installation appears.
 */
const handler = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    res.setHeader('Cache-Control', 'no-store')
    const respond = (body: ReposApiResponse) => res.status(200).json(body)

    if (!config.stateSecret) {
        return respond({ error: 'not_connected' })
    }
    const grant = verify<GrantCookie>(parseCookies(req)[COOKIES.grant], COOKIE_MAX_AGE.grant)
    if (!grant) {
        return respond({ error: 'not_connected' })
    }

    if (config.mock && req.query.mock_expire === '1') {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('../../lib/wizard/mock').forceExpireGrant(grant.grant_id)
    }

    try {
        const result = await getProvisioningClient().getGrantRepositories(grant.grant_id)
        if (!result.installed) {
            return respond({
                installed: false,
                install_url: config.githubAppSlug
                    ? `https://github.com/apps/${config.githubAppSlug}/installations/new`
                    : `${config.siteUrl}/wizard#mock-install`,
            })
        }
        return respond({
            installed: true,
            repositories: result.repositories,
        })
    } catch (error) {
        if (error instanceof GrantExpiredError) {
            clearCookie(res, COOKIES.grant)
            return respond({ error: 'grant_expired' })
        }
        console.error('wizard provisioning: repos failed', error)
        return respond({ error: 'fetch_failed' })
    }
}

export default handler
