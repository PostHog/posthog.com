import React from 'react'
import List from 'components/List'
import usePlatformList from 'hooks/docs/usePlatformList'

const MCPInstallationPlatforms = () => {
    const platforms = usePlatformList('docs/mcp-analytics/installation', 'MCP Analytics installation')

    return <List className="grid gap-4 grid-cols-2 @md:grid-cols-4 not-prose" items={platforms} />
}

export default MCPInstallationPlatforms
