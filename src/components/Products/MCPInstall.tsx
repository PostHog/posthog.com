import React from 'react'
import Link from 'components/Link'
import PlatformInstall from 'components/PlatformInstall'

export default function MCPInstall() {
    return (
        <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm font-semibold mb-2 opacity-70">Install the MCP server</p>
            <PlatformInstall variant="inline" command="mcp add" slim />
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
