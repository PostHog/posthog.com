import { getPostHogDesktopPricing, PRICING_CACHE_CONTROL } from '../../src/lib/posthogDesktopPricing'

export const onRequestGet = async (): Promise<Response> => {
    try {
        return Response.json(await getPostHogDesktopPricing(), {
            headers: { 'Cache-Control': PRICING_CACHE_CONTROL },
        })
    } catch (error) {
        console.error('Error fetching PostHog Desktop pricing:', error)
        return Response.json({ error: 'Failed to fetch PostHog Desktop pricing' }, { status: 502 })
    }
}
