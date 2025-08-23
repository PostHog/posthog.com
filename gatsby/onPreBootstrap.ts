import { GatsbyNode } from 'gatsby'
import fetch from 'node-fetch'
import path from 'path'
import fs from 'fs'

import { fetchAndProcessMCPTools, writeMCPToolsToFile } from './utils/fetchMCPTools'

export const PAGEVIEW_CACHE_KEY = 'onPreBootstrap@@posthog-pageviews'
export const MCP_TOOLS_CACHE_KEY = 'onPreBootstrap@@mcp-tools'

export const onPreBootstrap: GatsbyNode['onPreBootstrap'] = async ({ cache }) => {
    // Copy hedgehog mode assets to public folder
    const source = path.resolve('node_modules/@posthog/hedgehog-mode/assets')
    const hedgehogModeDir = path.resolve(__dirname, '../public/hedgehog-mode')
    fs.cpSync(source, hedgehogModeDir, { recursive: true })

    // Fetch and process MCP tool definitions
    const mcpToolsData = await fetchAndProcessMCPTools()
    writeMCPToolsToFile(mcpToolsData)

    // Cache the data if successful
    if (!mcpToolsData.error && mcpToolsData.categories) {
        await cache.set(MCP_TOOLS_CACHE_KEY, mcpToolsData.categories)
    }

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
