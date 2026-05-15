/**
 * Preflight check: given a URL, return whether the target site permits being
 * embedded in an iframe from posthog.com. Used by the Link component to decide
 * whether to enable the "Open in new PostHog window" option for external links.
 *
 * Vercel: this file. Cloudflare PR previews: `functions/api/check-iframe.js` (shared logic in `lib/`).
 */

import { runIframePreflight } from '../lib/iframe-preflight.js'

const handler = async (req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600')
    const result = await runIframePreflight(req.query?.url)
    return res.status(result.status).json(result.json)
}

export default handler
