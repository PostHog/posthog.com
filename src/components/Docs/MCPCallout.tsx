import React from 'react'
import mcpRestMapping from '../../data/mcp-rest-mapping.json'
import mcpToolsData from '../../data/mcp-tools.json'

interface ToolByName {
    summary: string
    description?: string
    category?: string
    required_scopes?: string[]
}

interface MCPToolsData {
    byName?: Record<string, ToolByName> | null
    error?: boolean
}

interface MCPCalloutProps {
    operationId: string
}

const MCPCallout: React.FC<MCPCalloutProps> = ({ operationId }) => {
    const mapping = mcpRestMapping as Record<string, string[]>
    const toolNames = mapping[operationId]
    if (!toolNames || toolNames.length === 0) {
        return null
    }

    const { byName } = mcpToolsData as MCPToolsData
    const matched = toolNames
        .map((name) => ({ name, info: byName?.[name] }))
        .filter((t): t is { name: string; info: ToolByName } => Boolean(t.info))

    if (matched.length === 0) {
        return null
    }

    return (
        <blockquote className="p-4 mb-4 rounded bg-accent border-l-4 border-yellow not-prose">
            <p className="text-sm font-semibold mb-2">
                Also available via the <a href="/docs/model-context-protocol">PostHog MCP server</a>:
            </p>
            <ul className="m-0 p-0 list-none space-y-1">
                {matched.map(({ name, info }) => (
                    <li key={name} className="text-sm">
                        <code>{name}</code>
                        {info.summary ? <> — {info.summary}</> : null}
                    </li>
                ))}
            </ul>
        </blockquote>
    )
}

export default MCPCallout
