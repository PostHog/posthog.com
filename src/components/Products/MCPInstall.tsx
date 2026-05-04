import React from 'react'
import { SingleCodeBlock } from 'components/CodeBlock'
import Link from 'components/Link'

const MCP_URL = 'https://mcp.posthog.com/mcp'

const vscodeConfig = encodeURIComponent(JSON.stringify({ type: 'http', url: MCP_URL }))
const cursorConfig = btoa(JSON.stringify({ url: MCP_URL }))

const IDE_BUTTONS = [
    { label: 'VS Code', href: `vscode:mcp/install?name=posthog&config=${vscodeConfig}` },
    { label: 'VS Code Insiders', href: `vscode-insiders:mcp/install?name=posthog&config=${vscodeConfig}` },
    { label: 'Cursor', href: `cursor://anysphere.cursor-deeplink/mcp/install?name=posthog&config=${cursorConfig}` },
]

export default function MCPInstall() {
    return (
        <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm font-semibold mb-2 opacity-70">Install the MCP server</p>
            <div className="[&_.code-block]:mb-0 [&_.code-block]:mt-0 [&_.pb-2]:pb-0">
                <SingleCodeBlock language="bash" showAskAI={false}>
                    npx @posthog/wizard mcp add
                </SingleCodeBlock>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-xs opacity-50">Or install in:</span>
                {IDE_BUTTONS.map(({ label, href }) => (
                    <a
                        key={label}
                        href={href}
                        className="text-xs px-2 py-0.5 rounded border border-border opacity-70 hover:opacity-100 transition-opacity"
                    >
                        {label}
                    </a>
                ))}
            </div>
            <p className="text-sm opacity-60 mt-2">
                See the{' '}
                <Link to="/docs/model-context-protocol" className="underline">
                    MCP server docs
                </Link>{' '}
                for full setup instructions.
            </p>
        </div>
    )
}
