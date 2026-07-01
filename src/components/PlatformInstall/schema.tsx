import React from 'react'
import {
    IconClaudeCode,
    LogomarkCodex,
    LogomarkCursor,
    LogomarkLovable,
    LogomarkReplit,
    LogomarkV0,
    LogomarkVSCode,
    LogomarkWindsurf,
    LogomarkZed,
} from 'components/OSIcons/Icons'
import Link from 'components/Link'
import WizardFrameworksTeaser from 'components/WizardFrameworksTeaser'
import { IconArrowUpRight } from '@posthog/icons'
import { buildWizardCommand } from './buildCommand'

export type InstallMethod = {
    label: string
    /** Description / instructions shown before the command */
    helper?: React.ReactNode
    command?: string
    /** Clipboard override for `command` (display shows `command`, copy writes this). */
    copyCommand?: string
    /**
     * Indent the command snippet so it lines up with the text of a numbered
     * list above (used when the command is a continuation of a list step).
     */
    indentCommand?: boolean
    /** Tip / follow-up shown after the command (e.g. "then run `/mcp`") */
    note?: React.ReactNode
    button?: { label: string; href: string; external?: boolean; icon?: React.ReactNode }
    /** Escape hatch for arbitrary instructions */
    content?: React.ReactNode
}

export type PlatformOption = {
    id: string
    label: string
    methods?: InstallMethod[]
    subOptions?: PlatformOption[]
    /** Escape hatch when a platform doesn't fit the methods/subOptions shape */
    content?: React.ReactNode
}

export type Platform = PlatformOption & {
    icon: React.ReactNode
    group: 'editors' | 'platforms'
}

export type InstallSchema = {
    title: string
    /** Optional (?) tooltip shown next to the title */
    titleTooltip?: React.ReactNode
    /** Header link on the right (replaces the old hardcoded "Learn more") */
    secondaryAction?: { label: string; to: string; state?: Record<string, unknown>; icon?: React.ReactNode }
    defaultCommand: string
    /** Clipboard override for `defaultCommand` (display shows `defaultCommand`, copy writes this). */
    defaultCopyCommand?: string
    /** Append `--region <cloud>` (from the user's region) after the command, matching WizardCommand. */
    appendRegion?: boolean
    /** Line shown below the command, e.g. "Supports Next.js, React, Python, and 21 more" */
    supports?: React.ReactNode
    platforms: Platform[]
}

const iconClass = 'size-4'

const MCP_URL = 'https://mcp.posthog.com/mcp'
// Displayed clean (`npx @posthog/wizard mcp add`); copied with `-y` and `@latest` pinned but hidden
// from view, matching the inline command.
const { displayCommand: wizardCommand, copyCommand: wizardCommandCopy } = buildWizardCommand({
    subcommand: 'mcp add',
})

// Deep-link install URLs ported from src/components/Products/MCPInstall.tsx
const cursorConfig = btoa(JSON.stringify({ url: MCP_URL }))
const vscodeConfig = encodeURIComponent(JSON.stringify({ type: 'http', url: MCP_URL }))
const cursorDeepLink = `cursor://anysphere.cursor-deeplink/mcp/install?name=posthog&config=${cursorConfig}`
const vscodeDeepLink = `vscode:mcp/install?name=posthog&config=${vscodeConfig}`
const vscodeInsidersDeepLink = `vscode-insiders:mcp/install?name=posthog&config=${vscodeConfig}`
const replitDeepLink =
    'https://replit.com/integrations?mcp=eyJkaXNwbGF5TmFtZSI6IlBvc3RIb2ciLCJiYXNlVXJsIjoiaHR0cHM6Ly9tY3AucG9zdGhvZy5jb20vbWNwIn0='

const inlineCode = (children: React.ReactNode) => <code className="!bg-transparent !p-0 !border-0">{children}</code>

// Shown below the command. Defined per-schema so each flow can customize it.
const supportsFrameworks = <WizardFrameworksTeaser />

const buttonRow = (buttons: { label: string; href: string; icon?: React.ReactNode }[]) => (
    <div className="flex flex-wrap items-center gap-1">
        {buttons.map(({ label, href, icon }) => (
            <Link
                key={label}
                to={href}
                externalNoIcon
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded border border-b-2 border-primary hover:border-input bg-primary text-primary text-sm font-semibold !no-underline"
            >
                {icon ? <span className="inline-flex items-center justify-center shrink-0 size-4">{icon}</span> : null}
                {label}
            </Link>
        ))}
    </div>
)

const claudeCodeMethods: InstallMethod[] = [
    {
        label: 'PostHog Wizard',
        helper: <>The PostHog Wizard installs the MCP server directly into Claude Code.</>,
        command: wizardCommand,
        copyCommand: wizardCommandCopy,
    },
    {
        label: 'Claude Code plugin',
        command: 'claude plugin install posthog',
        note: <>then run {inlineCode('/mcp')}</>,
    },
    {
        label: 'Manual setup',
        helper: (
            <>
                Run the following in your shell. The next time you run Claude Code it will have access to the PostHog
                MCP.
            </>
        ),
        command: 'claude mcp add --transport http posthog https://mcp.posthog.com/mcp -s user',
    },
]

const claudeDesktopMethods: InstallMethod[] = [
    {
        label: 'PostHog connector',
        content: (
            <div className="space-y-2 text-sm font-normal">
                <p className="m-0">
                    You can install the PostHog MCP directly into Claude Desktop using the{' '}
                    <Link to="https://claude.ai/directory/connectors/posthog" external>
                        PostHog connector
                    </Link>
                    .
                </p>
                <ol className="pl-5 m-0 space-y-1">
                    <li className="list-decimal">
                        Visit the{' '}
                        <Link to="https://claude.ai/directory/connectors/posthog" external>
                            PostHog connector
                        </Link>{' '}
                        page in the Claude connector directory.
                    </li>
                    <li className="list-decimal">
                        Click <strong>Connect</strong> to add the connector to your Claude Desktop.
                    </li>
                    <li className="list-decimal">When prompted, sign in to PostHog to finish authentication.</li>
                </ol>
            </div>
        ),
    },
]

const cursorMethods: InstallMethod[] = [
    {
        label: 'One-click install',
        helper: <>Deep-link to Cursor with the PostHog MCP pre-configured.</>,
        button: {
            label: 'Add to Cursor',
            href: cursorDeepLink,
            external: true,
            icon: <LogomarkCursor className="size-4" />,
        },
    },
    {
        label: 'Cursor plugin',
        helper: <>Install the PostHog plugin from the Cursor Marketplace.</>,
        button: {
            label: 'Open in Cursor Marketplace',
            href: 'https://cursor.com/marketplace/posthog',
            external: true,
            icon: <LogomarkCursor className="size-4" />,
        },
    },
    {
        label: 'Server URL',
        helper: <>For manual MCP configurations in any tool.</>,
        command: MCP_URL,
    },
    {
        label: 'PostHog Wizard',
        helper: <>The PostHog Wizard installs the MCP server directly into Cursor.</>,
        command: wizardCommand,
        copyCommand: wizardCommandCopy,
    },
    {
        label: 'Manual setup',
        helper: (
            <ol className="pl-4 m-0 space-y-0.5">
                <li className="list-decimal">Open Cursor and go to Settings &rsaquo; Tools & Integrations</li>
                <li className="list-decimal">Click {inlineCode('New MCP Server')}</li>
                <li className="list-decimal">Update {inlineCode('mcp.json')} with:</li>
            </ol>
        ),
        indentCommand: true,
        command: `{
  "mcpServers": {
    "posthog": {
      "url": "${MCP_URL}"
    }
  }
}`,
    },
]

const vscodeMethods: InstallMethod[] = [
    {
        label: 'One-click install',
        helper: <>Deep-link to VS Code with the PostHog MCP pre-configured.</>,
        content: buttonRow([
            {
                label: 'Add to VS Code',
                href: vscodeDeepLink,
                icon: <LogomarkVSCode className="size-4" />,
            },
            {
                label: 'VS Code Insiders',
                href: vscodeInsidersDeepLink,
                icon: <LogomarkVSCode className="size-4" />,
            },
        ]),
    },
    {
        label: 'Server URL',
        helper: <>For manual MCP configurations in any tool.</>,
        command: MCP_URL,
    },
    {
        label: 'PostHog Wizard',
        helper: <>The PostHog Wizard installs the MCP server directly into VS Code.</>,
        command: wizardCommand,
        copyCommand: wizardCommandCopy,
    },
    {
        label: 'Manual setup',
        helper: (
            <ol className="pl-4 m-0 space-y-0.5">
                <li className="list-decimal">
                    In VS Code, run {inlineCode('MCP: Open User Configuration')} from the command palette
                </li>
                <li className="list-decimal">Update {inlineCode('mcp.json')} with:</li>
            </ol>
        ),
        indentCommand: true,
        command: `{
  "servers": {
    "posthog": {
      "type": "http",
      "url": "${MCP_URL}"
    }
  }
}`,
    },
]

const windsurfMethods: InstallMethod[] = [
    {
        label: 'PostHog Wizard',
        helper: <>The PostHog Wizard installs the MCP server directly into Windsurf.</>,
        command: wizardCommand,
        copyCommand: wizardCommandCopy,
    },
    {
        label: 'Manual setup',
        helper: (
            <ol className="pl-4 m-0 space-y-0.5">
                <li className="list-decimal">Open Windsurf and go to Settings &rsaquo; Cascade &rsaquo; MCP Servers</li>
                <li className="list-decimal">Click {inlineCode('Manage MCP Servers')}</li>
                <li className="list-decimal">Click {inlineCode('View raw config')}</li>
                <li className="list-decimal">Update {inlineCode('mcp_config.json')} with:</li>
            </ol>
        ),
        indentCommand: true,
        command: `{
  "mcpServers": {
    "posthog": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote@latest",
        "https://mcp.posthog.com/sse"
      ]
    }
  }
}`,
    },
]

const codexMethods: InstallMethod[] = [
    {
        label: 'PostHog Wizard',
        helper: <>The PostHog Wizard installs the MCP server directly into Codex.</>,
        command: wizardCommand,
        copyCommand: wizardCommandCopy,
    },
    {
        label: 'Codex plugin',
        helper: <>Install PostHog as a Codex plugin from the marketplace.</>,
        command: 'codex plugin marketplace add PostHog/ai-plugin',
        note: (
            <>
                Run {inlineCode('codex')} in your terminal, then {inlineCode('/plugins')}, select PostHog and install.
            </>
        ),
    },
    {
        label: 'Manual setup',
        helper: <>Run in your shell. Codex supports native OAuth and prompts you to log in on first use.</>,
        command: `codex mcp add posthog --url ${MCP_URL}`,
    },
]

const zedMethods: InstallMethod[] = [
    {
        label: 'PostHog Wizard',
        helper: <>The PostHog Wizard installs the MCP server directly into Zed.</>,
        command: wizardCommand,
        copyCommand: wizardCommandCopy,
    },
    {
        label: 'Manual setup',
        helper: <>Open Zed and update {inlineCode('settings.json')} with:</>,
        command: `{
  "context_servers": {
    "posthog": {
      "enabled": true,
      "url": "${MCP_URL}"
    }
  }
}`,
    },
]

const lovableMethods: InstallMethod[] = [
    {
        label: 'Lovable connector',
        helper: (
            <>
                Custom MCP servers require a paid Lovable plan. The PostHog MCP server is added through Lovable's
                connector settings.
            </>
        ),
        content: (
            <ol className="pl-4 m-0 space-y-0.5 text-xs text-secondary">
                <li className="list-decimal">
                    Open Lovable and go to Settings &rsaquo; Connectors &rsaquo; Personal connectors
                </li>
                <li className="list-decimal">Click {inlineCode('New MCP server')}</li>
                <li className="list-decimal">
                    Enter the name {inlineCode('PostHog')} and URL {inlineCode(MCP_URL)}
                </li>
                <li className="list-decimal">Under Authentication, select {inlineCode('OAuth')}</li>
                <li className="list-decimal">Click {inlineCode('Add & authorize')}, then log in to PostHog</li>
            </ol>
        ),
    },
    {
        label: 'Server URL',
        command: MCP_URL,
    },
]

const replitMethods: InstallMethod[] = [
    {
        label: 'One-click install',
        helper: <>Add the PostHog MCP to your Replit Agent.</>,
        button: {
            label: 'Add PostHog to Replit',
            href: replitDeepLink,
            external: true,
            icon: <LogomarkReplit className="size-4" />,
        },
        note: <>You'll be prompted to log in to PostHog to authorize access.</>,
    },
]

const v0Methods: InstallMethod[] = [
    {
        label: 'v0 MCP',
        helper: <>Add the PostHog MCP through v0's MCP settings.</>,
        content: (
            <ol className="pl-4 m-0 space-y-0.5 text-xs text-secondary">
                <li className="list-decimal">In a v0 chat, click the {inlineCode('+')} button in the bottom left</li>
                <li className="list-decimal">
                    Click {inlineCode('MCPs')}, then {inlineCode('Add MCP')}
                </li>
                <li className="list-decimal">Select {inlineCode('Custom MCP')}</li>
                <li className="list-decimal">
                    Enter the name {inlineCode('PostHog')} and URL {inlineCode(MCP_URL)}
                </li>
                <li className="list-decimal">
                    Under Authentication select {inlineCode('OAuth')}, then click {inlineCode('Add')} and authorize
                </li>
            </ol>
        ),
    },
    {
        label: 'Server URL',
        command: MCP_URL,
    },
]

// Shared by both flows for now. Either schema can swap in its own array to diverge.
const installPlatforms: Platform[] = [
    {
        id: 'claude',
        label: 'Claude',
        group: 'editors',
        icon: <IconClaudeCode className={iconClass} />,
        subOptions: [
            {
                id: 'claude_code',
                label: 'Claude Code',
                methods: claudeCodeMethods,
            },
            {
                id: 'claude_desktop',
                label: 'Claude Desktop',
                methods: claudeDesktopMethods,
            },
        ],
    },
    {
        id: 'cursor',
        label: 'Cursor',
        group: 'editors',
        icon: <LogomarkCursor className={iconClass} />,
        methods: cursorMethods,
    },
    {
        id: 'vscode',
        label: 'VS Code',
        group: 'editors',
        icon: <LogomarkVSCode className={iconClass} />,
        methods: vscodeMethods,
    },
    {
        id: 'windsurf',
        label: 'Windsurf',
        group: 'editors',
        icon: <LogomarkWindsurf className={iconClass} />,
        methods: windsurfMethods,
    },
    {
        id: 'codex',
        label: 'Codex',
        group: 'editors',
        icon: <LogomarkCodex className={iconClass} />,
        methods: codexMethods,
    },
    {
        id: 'zed',
        label: 'Zed',
        group: 'editors',
        icon: <LogomarkZed className={iconClass} />,
        methods: zedMethods,
    },
    {
        id: 'lovable',
        label: 'Lovable',
        group: 'platforms',
        icon: <LogomarkLovable className={iconClass} />,
        methods: lovableMethods,
    },
    {
        id: 'replit',
        label: 'Replit',
        group: 'platforms',
        icon: <LogomarkReplit className={iconClass} />,
        methods: replitMethods,
    },
    {
        id: 'v0',
        label: 'v0',
        group: 'platforms',
        icon: <LogomarkV0 className={iconClass} />,
        methods: v0Methods,
    },
]

export const mcpInstallSchema: InstallSchema = {
    title: 'Install the PostHog MCP',
    secondaryAction: { label: 'Learn more', to: '/docs/model-context-protocol', state: { newWindow: true } },
    defaultCommand: wizardCommand,
    defaultCopyCommand: wizardCommandCopy,
    supports: supportsFrameworks,
    platforms: installPlatforms,
}

export const wizardInstallSchema: InstallSchema = {
    title: 'Get started',
    titleTooltip: (
        <>
            <p>
                PostHog Wizard is an agentic CLI tool that installs and configures PostHog for you – the way an expert
                would.
            </p>
            <p>
                It starts by analyzing your codebase, then it automagically sets up the right tools, custom events, and
                dashboards for your product.
            </p>
            <div className="inline-flex items-center gap-1">
                <Link to="/wizard" state={{ newWindow: true }} className="group underline font-semibold">
                    Learn more{' '}
                    <IconArrowUpRight className="size-4 inline-block text-secondary group-hover:text-primary" />
                </Link>
            </div>
        </>
    ),
    secondaryAction: {
        label: 'Sign up via web',
        to: 'https://app.posthog.com/signup',
        state: { newWindow: true, initialTab: 'signup' },
        icon: <IconArrowUpRight className="size-4 text-secondary" />,
    },
    // Display shows a clean command; the copy adds `-y` (auto-confirm) and `@latest` (freshness).
    // `self-driving` is intentionally NOT baked in here — it's opt-in via PlatformInstall's `selfDriving` prop.
    // The user's cloud region (`--region eu|us`) is appended automatically via `appendRegion`.
    defaultCommand: 'npx @posthog/wizard',
    defaultCopyCommand: 'npx -y @posthog/wizard@latest',
    appendRegion: true,
    supports: supportsFrameworks,
    // Secondary install-methods row hidden for now on the homepage. Restore by
    // uncommenting installPlatforms (or swap in a custom array to diverge from MCP).
    platforms: [],
    // platforms: installPlatforms,
}
