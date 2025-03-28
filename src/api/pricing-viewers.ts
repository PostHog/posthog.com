import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import fetch from 'node-fetch'

const handler = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    try {
        const response = await fetch('https://app.posthog.com/api/projects/2/query/', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.POSTHOG_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: {
                    kind: 'HogQLQuery',
                    query: `
                        SELECT 
                            count(distinct distinct_id) as active_viewers
                        FROM events 
                        WHERE 
                            event = '$pageview'
                            AND properties['$current_url'] LIKE '%/pricing%'
                            AND timestamp >= now() - interval 5 minute
                    `,
                },
            }),
        })

        const data = await response.json()
        const count = data.results[0][0] || 1

        res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate')
        return res.status(200).json({ count })
    } catch (err) {
        console.log(err)
        return res.status(500)
    }
}

export default handler
