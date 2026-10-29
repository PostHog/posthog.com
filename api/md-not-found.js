module.exports = (req, res) => {
    const requestedPath = req.query.path || ''
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400')
    res.end(`404: no markdown version of /${requestedPath}\n\nIndex of markdown pages: https://posthog.com/llms.txt\n`)
}
