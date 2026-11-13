import React from 'react'
import List from 'components/List'
import WizardCommand from 'components/WizardCommand'
import usePlatformList from 'hooks/docs/usePlatformList'

/**
 * Install body for the MCP Analytics product page. MCP Analytics has its own SDK per server language,
 * so the shared framework grid (web/mobile/backend libraries) would link to the wrong guides. This
 * reuses the same platform list as /docs/mcp-analytics/installation.
 */
const MCPAnalyticsInstall = (): JSX.Element => {
    const platforms = usePlatformList('docs/mcp-analytics/installation', 'MCP Analytics installation')

    return (
        <div className="space-y-6">
            <WizardCommand command="mcp-analytics" />
            <List className="grid gap-4 grid-cols-2 @md:grid-cols-4 not-prose" items={platforms} />
        </div>
    )
}

export default MCPAnalyticsInstall
