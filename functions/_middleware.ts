import rules from '../.cache/vercel-redirects.json'
import { createRedirectMatcher } from '../plugins/gatsby-plugin-vercel-redirects/matcher'
import { createCloudflarePagesMiddleware } from '../plugins/gatsby-plugin-vercel-redirects/adapters'

export const onRequest = createCloudflarePagesMiddleware(createRedirectMatcher(rules))
