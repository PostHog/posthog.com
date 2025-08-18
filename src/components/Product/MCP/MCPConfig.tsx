import React from 'react'
import { MdxCodeBlock } from '../../CodeBlock'

type ConfigVariant = 'cursor' | 'claude-desktop' | 'windsurf' | 'vscode' | 'claude-code' | 'zed'

interface MCPConfigSnippetProps {
    variant?: ConfigVariant
}

const MCP_SERVER_CONFIG = {
    command: 'npx',
    args: [
        '-y',
        'mcp-remote@latest',
        'https://mcp.posthog.com/sse',
        '--header',
        'Authorization:${POSTHOG_AUTH_HEADER}',
    ],
    env: {
        POSTHOG_AUTH_HEADER: 'Bearer {INSERT_YOUR_PERSONAL_API_KEY_HERE} // HIGHLIGHT',
    },
}

const createConfig = (wrapper: string) => JSON.stringify({ [wrapper]: { posthog: MCP_SERVER_CONFIG } }, null, 2)

const mcpServersConfig = { language: 'json', content: () => createConfig('mcpServers') }

const EDITOR_CONFIGS = {
    cursor: mcpServersConfig,
    'claude-desktop': mcpServersConfig,
    windsurf: mcpServersConfig,
    vscode: { language: 'json', content: () => createConfig('servers') },
    'claude-code': {
        language: 'bash',
        content: () => `claude mcp add-json posthog -s user '${JSON.stringify(MCP_SERVER_CONFIG, null, 2)}'`,
    },
    zed: { language: 'json', content: () => createConfig('context_servers') },
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
