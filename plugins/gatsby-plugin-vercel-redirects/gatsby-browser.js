const rules = require('../../.cache/vercel-redirects.json')
const { createRedirectMatcher } = require('./matcher')
const { redirectBrowserNavigation } = require('./adapters')

const findRedirect = createRedirectMatcher(rules)

exports.onRouteUpdate = ({ location }) =>
    redirectBrowserNavigation(findRedirect, location, (destination) => window.location.replace(destination))
