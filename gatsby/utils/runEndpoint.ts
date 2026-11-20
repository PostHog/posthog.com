const ENDPOINTS_URL = 'https://us.posthog.com/api/environments/2/endpoints'

export type EndpointRow = Record<string, unknown>

export async function runEndpoint(name: string, apiKey: string, limit: number): Promise<EndpointRow[]> {
    const response = await fetch(`${ENDPOINTS_URL}/${name}/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ limit }),
    })
    if (response.status !== 200) throw new Error(`${name} returned ${response.status}`)
    const body: { columns?: string[]; results?: unknown[][]; hasMore?: boolean } = await response.json()
    if (body.hasMore) throw new Error(`${name} returned more than ${limit} rows`)
    const columns = body.columns ?? []
    return (body.results ?? []).map((row) => Object.fromEntries(columns.map((column, index) => [column, row[index]])))
}
