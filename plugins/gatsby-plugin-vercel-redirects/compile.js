const { getTransformedRoutes } = require('@vercel/routing-utils')

exports.compileRedirects = (redirects) => {
    for (const redirect of redirects) {
        for (const condition of [...(redirect.has || []), ...(redirect.missing || [])]) {
            if (condition.type !== 'query') {
                throw new Error(`Unsupported redirect condition: ${condition.type} in ${redirect.source}`)
            }
            if (condition.value !== undefined && typeof condition.value !== 'string') {
                throw new Error(`Unsupported redirect condition value in ${redirect.source}`)
            }
        }
    }

    const { routes, error } = getTransformedRoutes({ redirects: structuredClone(redirects) })
    if (error) throw new Error(error.message)
    return routes || []
}
