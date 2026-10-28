const rules = require('../../.cache/vercel-redirects.json')
const { createRedirectMatcher } = require('./matcher')
const { redirectBrowserNavigation } = require('./adapters')

const findRedirect = createRedirectMatcher(rules)
let isNavigationWrapped = false

exports.onPreRouteUpdate = () => {
    if (isNavigationWrapped) return
    isNavigationWrapped = true

    const navigate = window.___navigate
    window.___navigate = (to, options) => {
        if (typeof to === 'string') {
            const location = new URL(to, window.location.href)
            if (
                location.origin === window.location.origin &&
                redirectBrowserNavigation(findRedirect, location, (destination) =>
                    options?.replace ? window.location.replace(destination) : window.location.assign(destination)
                )
            ) {
                return
            }
        }

        return navigate(to, options)
    }
}

exports.onRouteUpdate = ({ location }) =>
    redirectBrowserNavigation(findRedirect, location, (destination) => window.location.replace(destination))
