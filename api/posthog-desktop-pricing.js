const MODELS_URL = 'https://gateway.us.posthog.com/posthog_code/v1/models'
const COMPUTE_URL = 'https://us.posthog.com/api/code/sandbox-pricing/'

const fetchJson = async (url) => {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`${url} returned ${response.status}`)
    }
    return response.json()
}

const handler = async (req, res) => {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET')
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const [models, compute] = await Promise.all([
            fetchJson(MODELS_URL),
            fetchJson(COMPUTE_URL).catch(() => ({ current: null })),
        ])
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
        return res.status(200).json({
            models: models.data.filter((model) => model.pricing),
            compute: compute.current,
        })
    } catch (error) {
        console.error('Error fetching PostHog Desktop pricing:', error)
        return res.status(502).json({ error: 'Failed to fetch PostHog Desktop pricing' })
    }
}

module.exports = handler
