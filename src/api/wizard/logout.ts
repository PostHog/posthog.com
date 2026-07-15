import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import { COOKIES } from '../../lib/wizard/config'
import { clearCookie } from '../../lib/wizard/cookies'

/** Clears every provisioning cookie — powers the "start over / use a different GitHub account" action. */
const handler = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }
    clearCookie(res, COOKIES.state)
    clearCookie(res, COOKIES.grant)
    clearCookie(res, COOKIES.resume)
    return res.status(200).json({ ok: true })
}

export default handler
