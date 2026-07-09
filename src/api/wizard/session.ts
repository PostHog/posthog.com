import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import { COOKIES, COOKIE_MAX_AGE, config } from '../../lib/wizard-drop/config'
import { parseCookies, verify } from '../../lib/wizard-drop/cookies'
import type { SessionResponse } from '../../lib/wizard-drop/types'

export type GrantCookie = { grant_id: string; gh_login: string; email: string }

/**
 * Tells the WizardDrop component whether the visitor has a live GitHub grant. The grant cookie
 * is httpOnly (scoped to /api/wizard), so this endpoint is the only way the page learns the
 * connected state.
 */
const handler = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    res.setHeader('Cache-Control', 'no-store')
    if (!config.stateSecret) {
        const disconnected: SessionResponse = { connected: false }
        return res.status(200).json(disconnected)
    }
    const grant = verify<GrantCookie>(parseCookies(req)[COOKIES.grant], COOKIE_MAX_AGE.grant)
    const body: SessionResponse = grant
        ? { connected: true, gh_login: grant.gh_login, email: grant.email }
        : { connected: false }
    return res.status(200).json(body)
}

export default handler
