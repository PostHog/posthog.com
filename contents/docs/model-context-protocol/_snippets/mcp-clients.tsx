import React from 'react'
import List from 'components/List'

const MCPClients = () => {
    const codeEditors = [
        {
            label: 'Claude Code',
            url: '/docs/model-context-protocol/claude-code',
            icon: 'IconTerminal',
        },
        {
            label: 'Claude Desktop',
            url: '/docs/model-context-protocol/claude-desktop',
            icon: 'IconApps',
        },
        {
            label: 'Codex',
            url: '/docs/model-context-protocol/codex',
            icon: 'IconTerminal',
        },
        {
            label: 'Cursor',
            url: '/docs/model-context-protocol/cursor',
            icon: 'IconCode',
        },
        {
            label: 'VS Code',
            url: '/docs/model-context-protocol/vscode',
            icon: 'IconCode',
        },
        {
            label: 'Windsurf',
            url: '/docs/model-context-protocol/windsurf',
            icon: 'IconCode',
        },
        {
            label: 'Zed',
            url: '/docs/model-context-protocol/zed',
            icon: 'IconCode',
        },
    ]

    const platforms = [
        {
            label: 'Lovable',
            url: '/docs/integrations/lovable',
            icon: 'IconApps',
        },
        {
            label: 'Replit',
            url: '/docs/integrations/replit',
            icon: 'IconApps',
        },
        {
            label: 'v0',
            url: '/docs/integrations/v0',
            icon: 'IconApps',
        },
    ]

    return (
        <>
            <h3>Code editors</h3>
            <List className="grid gap-4 grid-cols-2 @md:grid-cols-3 not-prose" items={codeEditors} />
            <h3>Platforms</h3>
            <List className="grid gap-4 grid-cols-2 @md:grid-cols-3 not-prose" items={platforms} />
        </>
    )
}

export default MCPClients
