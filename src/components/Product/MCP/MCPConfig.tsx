import React from 'react'
import { MdxCodeBlock } from '../../CodeBlock'

type ConfigVariant = 'cursor' | 'claude-desktop' | 'windsurf' | 'vscode' | 'claude-code' | 'zed'

interface MCPConfigSnippetProps {
    variant?: ConfigVariant
}

// Native HTTP config for clients that support it (Cursor, VS Code, Zed)
const MCP_SERVER_CONFIG_NATIVE = {
    url: 'https://mcp.posthog.com/mcp',
}

// mcp-remote config for clients without native HTTP support (Claude Desktop, Windsurf)
const MCP_SERVER_CONFIG_LEGACY = {
    command: 'npx',
    args: ['-y', 'mcp-remote@latest', 'https://mcp.posthog.com/sse'],
}

const EDITOR_CONFIGS = {
    cursor: {
        language: 'json',
        content: () => JSON.stringify({ mcpServers: { posthog: MCP_SERVER_CONFIG_NATIVE } }, null, 2),
    },
    'claude-desktop': {
        language: 'json',
        content: () => JSON.stringify({ mcpServers: { posthog: MCP_SERVER_CONFIG_LEGACY } }, null, 2),
    },
    windsurf: {
        language: 'json',
        content: () => JSON.stringify({ mcpServers: { posthog: MCP_SERVER_CONFIG_LEGACY } }, null, 2),
    },
    vscode: {
        language: 'json',
        content: () => JSON.stringify({ servers: { posthog: { type: 'http', ...MCP_SERVER_CONFIG_NATIVE } } }, null, 2),
    },
    'claude-code': {
        language: 'bash',
        content: () => `claude mcp add --transport http posthog https://mcp.posthog.com/mcp -s user`,
    },
    zed: {
        language: 'json',
        content: () =>
            JSON.stringify({ context_servers: { posthog: { enabled: true, ...MCP_SERVER_CONFIG_NATIVE } } }, null, 2),
    },
} as const

const createMdxCodeBlock = (language: string, content: string) => ({
    props: {
        mdxType: 'pre' as const,
        children: {
            key: null,
            props: {
                className: `language-${language}`,
                mdxType: 'code' as const,
                children: content,
            },
        },
    },
})

export const MCPConfigSnippet: React.FC<MCPConfigSnippetProps> = ({ variant = 'cursor' }) => {
    const config = EDITOR_CONFIGS[variant]
    return <MdxCodeBlock>{createMdxCodeBlock(config.language, config.content())}</MdxCodeBlock>
}

export default MCPConfigSnippet
