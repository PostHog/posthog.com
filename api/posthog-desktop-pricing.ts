import { getPostHogDesktopPricing, PRICING_CACHE_CONTROL } from '../src/lib/posthogDesktopPricing'

interface VercelRequest {
    method?: string
}

interface VercelResponse {
    setHeader(name: string, value: string): void
    status(statusCode: number): VercelResponse
    json(body: unknown): void
}

const handler = async (req: VercelRequest, res: VercelResponse): Promise<void> => {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET')
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        res.setHeader('Cache-Control', PRICING_CACHE_CONTROL)
        return res.status(200).json(await getPostHogDesktopPricing())
    } catch (error) {
        console.error('Error fetching PostHog Desktop pricing:', error)
        return res.status(502).json({ error: 'Failed to fetch PostHog Desktop pricing' })
    }
}

export default handler
