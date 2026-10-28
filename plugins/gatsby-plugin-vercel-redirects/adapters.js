exports.createDevelopmentMiddleware = (findRedirect) => (req, res, next) => {
    const redirect = findRedirect(new URL(req.originalUrl, 'http://localhost'))
    if (!redirect) return next()

    res.statusCode = redirect.status
    res.setHeader('Location', redirect.location)
    res.end()
}

exports.createCloudflarePagesMiddleware = (findRedirect) => (context) => {
    const redirect = findRedirect(new URL(context.request.url))
    return redirect
        ? new Response(null, { status: redirect.status, headers: { Location: redirect.location } })
        : context.next()
}

exports.redirectBrowserNavigation = (findRedirect, location, replace) => {
    const redirect = findRedirect(new URL(`${location.pathname}${location.search}`, location.href))
    if (redirect) replace(`${redirect.location}${redirect.location.includes('#') ? '' : location.hash}`)
}
