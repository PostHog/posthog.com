import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

const ENDPOINT_URL = 'https://us.posthog.com/api/environments/2/endpoints/self_driving_merged_prs/run'
const EDGE_CACHE = 'public, s-maxage=900, stale-while-revalidate=3600'
const FAILURE_CACHE = 'public, s-maxage=60'
const ENDPOINT_TIMEOUT_MS = 8000

export interface SelfDrivingPullRequest {
    repository: string
    number: number
    title: string | null
    url: string
    mergedAt: string
}

export interface SelfDrivingFeed {
    pullRequests: SelfDrivingPullRequest[]
    mergedLast7Days: number | null
}

const EMPTY_FEED: SelfDrivingFeed = { pullRequests: [], mergedLast7Days: null }

const toFeed = ({ columns = [], results = [] }: { columns?: string[]; results?: unknown[][] }): SelfDrivingFeed => {
    const read = (row: unknown[], column: string) => row[columns.indexOf(column)]
    const pullRequests = results
        .map((row) => ({
            repository: String(read(row, 'repository')),
            number: Number(read(row, 'number')),
            title: (read(row, 'title') as string | null) ?? null,
            url: String(read(row, 'url')),
            mergedAt: new Date(String(read(row, 'merged_at'))).toISOString(),
        }))
        .sort((a, b) => Date.parse(b.mergedAt) - Date.parse(a.mergedAt))
    const mergedLast7Days = results.length > 0 ? Number(read(results[0], 'merged_last_7d')) : null
    return { pullRequests, mergedLast7Days }
}

const handler = async (_req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    const apiKey = process.env.POSTHOG_APP_API_KEY
    if (!apiKey) {
        res.setHeader('Cache-Control', FAILURE_CACHE)
        return res.status(503).json(EMPTY_FEED)
    }

    try {
        const response = await fetch(ENDPOINT_URL, {
            method: 'POST',
            headers: { Authorization: `Bearer ${apiKey}` },
            signal: AbortSignal.timeout(ENDPOINT_TIMEOUT_MS),
        })
        if (!response.ok) {
            throw new Error(`self_driving_merged_prs returned ${response.status}`)
        }
        res.setHeader('Cache-Control', EDGE_CACHE)
        return res.status(200).json(toFeed(await response.json()))
    } catch (error) {
        console.error('Failed to load self-driving pull requests:', error)
        res.setHeader('Cache-Control', FAILURE_CACHE)
        return res.status(502).json(EMPTY_FEED)
    }
}

export default handler
