import { GatsbyNode } from 'gatsby'
import fetch from 'node-fetch'

export const PAGEVIEW_CACHE_KEY = 'onPreBootstrap@@posthog-pageviews'

export const onPreBootstrap: GatsbyNode['onPreBootstrap'] = async ({ cache }) => {
    if (process.env.POSTHOG_APP_API_KEY && !(await cache.get(PAGEVIEW_CACHE_KEY))) {
        const pageViews: Record<string, number> = {}

        const params = new URLSearchParams({
            events: `[{"id":"$pageview","name":"$pageview","type":"events","order":0,"properties":[{"key":"$host","type":"event","value":["posthog.com"],"operator":"exact"}]}]`,
            date_from: '-30d',
            breakdown: '$pathname',
            filter_test_accounts: 'false',
            breakdown_normalize_url: 'true',
            breakdown_limit: '2000',
            offset: '0',
        })

        const res = await fetch(`https://app.posthog.com/api/projects/2/insights/trend?${params.toString()}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.POSTHOG_APP_API_KEY}`,
            },
        })

        if (res.status !== 200) {
            console.error('Something went wrong when fetching pageview stats')
            return
        }

        const data = await res.json()

        data.result.forEach((result) => {
            pageViews[result.breakdown_value] = result.count
        })

        await cache.set(PAGEVIEW_CACHE_KEY, pageViews)
    }
}
