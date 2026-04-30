import React from 'react'
import { SingleCodeBlock } from 'components/CodeBlock'
import Link from 'components/Link'

export default function MCPInstall() {
    return (
        <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm font-semibold mb-2 opacity-70">Install the MCP server</p>
            <div className="[&_.code-block]:mb-0 [&_.code-block]:mt-0 [&_.pb-2]:pb-0">
                <SingleCodeBlock language="bash" showAskAI={false}>
                    npx @posthog/wizard mcp add
                </SingleCodeBlock>
            </div>
            <p className="text-sm opacity-60 mt-2">
                The recommended way to install is with the AI wizard. See the{' '}
                <Link to="/docs/model-context-protocol" className="underline">
                    MCP server docs
                </Link>{' '}
                for full setup instructions.
            </p>
        </div>
    )
}
