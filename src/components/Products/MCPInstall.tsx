import React from 'react'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import PlatformInstall from 'components/PlatformInstall'

const MCP_URL = 'https://mcp.posthog.com/mcp'

const vscodeConfig = encodeURIComponent(JSON.stringify({ type: 'http', url: MCP_URL }))
const cursorConfig = btoa(JSON.stringify({ url: MCP_URL }))

const IDE_BUTTONS = [
    { label: 'VS Code', href: `vscode:mcp/install?name=posthog&config=${vscodeConfig}` },
    { label: 'VS Code Insiders', href: `vscode-insiders:mcp/install?name=posthog&config=${vscodeConfig}` },
    { label: 'Cursor', href: `cursor://anysphere.cursor-deeplink/mcp/install?name=posthog&config=${cursorConfig}` },
]

interface MCPInstallProps {
    /**
     * Render the row of one-click "Install in <editor>" buttons under the
     * install code block. Defaults to `true`. Set to `false` for surfaces
     * that only want the install command + docs link.
     */
    showIDEButtons?: boolean
}

export default function MCPInstall({ showIDEButtons = true }: MCPInstallProps) {
    return (
        <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm font-semibold mb-2 opacity-70">Install the MCP server</p>
            <PlatformInstall variant="inline" command="mcp add" slim />
            {showIDEButtons ? (
                <div className="mt-3">
                    <p className="text-xs font-semibold opacity-60 m-0 mb-1.5">Or install directly in your editor:</p>
                    <div className="flex flex-wrap items-center gap-1">
                        {IDE_BUTTONS.map(({ label, href }) => (
                            <OSButton key={label} asLink external hideExternalIcon to={href} size="sm">
                                {label}
                            </OSButton>
                        ))}
                    </div>
                </div>
            ) : null}
            <p className="text-sm opacity-60 mt-3">
                See the{' '}
                <Link to="/docs/model-context-protocol" className="underline">
                    MCP server docs
                </Link>{' '}
                for full setup instructions.
            </p>
        </div>
    )
}
