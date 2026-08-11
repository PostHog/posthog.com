const handler = async (req, res) => {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET')
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const { getPostHogDesktopPricing, PRICING_CACHE_CONTROL } = await import('../src/lib/posthogDesktopPricing.ts')
        res.setHeader('Cache-Control', PRICING_CACHE_CONTROL)
        return res.status(200).json(await getPostHogDesktopPricing())
    } catch (error) {
        console.error('Error fetching PostHog Desktop pricing:', error)
        return res.status(502).json({ error: 'Failed to fetch PostHog Desktop pricing' })
    }
}

module.exports = handler
