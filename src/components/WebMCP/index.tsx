import { useEffect, useRef } from 'react'
import type { MutableRefObject } from 'react'
import { navigate } from 'gatsby'
import { useAppActions } from '../../context/App'
import type { ChatParams } from '../../context/App'
import { useAgentSkills } from 'hooks/skills'
import type { AgentSkill } from 'hooks/skills'
import { algoliaIndexName, algoliaSearchClient } from 'lib/algoliaSearch'
import { getMarkdownUrl } from 'components/MarkdownActions'
import { buildWizardCommand } from 'components/PlatformInstall/buildCommand'
import { MARKDOWN_CONTENT_PATHS, MCP_SERVER_URL, isMarkdownContentPath } from '../../constants'

/**
 * Registers WebMCP tools on every page so a browser agent (Gemini in Chrome, and others as they
 * adopt the standard) can search, read, and navigate posthog.com through typed calls instead of
 * scraping the DOM. Renders nothing. See README.md for the tool list and how to test.
 *
 * Spec: https://webmachinelearning.github.io/webmcp/
 */

// Minimal typings for the parts of the spec this file uses. `document.modelContext` only exists in
// browsers that ship WebMCP, so it is optional here and every use is guarded.
type ToolResult = { content: { type: 'text'; text: string }[]; isError?: boolean }

type ToolInput = Record<string, unknown>

interface WebMCPTool {
    name: string
    description: string
    inputSchema: Record<string, unknown>
    annotations?: { readOnlyHint?: boolean; consequentialHint?: boolean }
    execute: (input: ToolInput, options?: { signal: AbortSignal }) => Promise<ToolResult>
}

interface ModelContext {
    registerTool: (tool: WebMCPTool, options?: { signal?: AbortSignal }) => Promise<void>
}

declare global {
    interface Document {
        modelContext?: ModelContext
    }
}

/** Live values the tools read at call time. Tools register once; the page state keeps changing. */
type ToolDeps = {
    openNewChat: (params: ChatParams) => void
    skills: AgentSkill[]
}

// Canonical SKILL.md files live in the monorepo, not on this site. raw.githubusercontent.com sends
// `Access-Control-Allow-Origin: *`, so the browser can fetch them directly.
const SKILL_RAW_BASE = 'https://raw.githubusercontent.com/PostHog/posthog/master'

const NO_INPUT_SCHEMA = { type: 'object', properties: {} }

const textResult = (text: string, isError = false): ToolResult => ({
    content: [{ type: 'text', text }],
    ...(isError ? { isError: true } : {}),
})

/** Accepts a path or a full URL. Returns null for anything that is not on this site. */
const resolveSitePath = (input: unknown): URL | null => {
    if (typeof input !== 'string' || input.trim() === '') return null
    try {
        const url = new URL(input.trim(), window.location.origin)
        return url.origin === window.location.origin ? url : null
    } catch {
        return null
    }
}

type SearchHit = { title?: string; slug?: string; fields?: { slug?: string }; type?: string; excerpt?: string }

const skillsByProduct = (skills: AgentSkill[]): string => {
    const counts = new Map<string, number>()
    for (const skill of skills) counts.set(skill.product, (counts.get(skill.product) ?? 0) + 1)
    const lines = Array.from(counts.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([product, count]) => `- ${product} (${count} ${count === 1 ? 'skill' : 'skills'})`)
    return `Skills are grouped by product. Call read_skill with "product" to list one group, or with "name" to read one skill.\n\n${lines.join(
        '\n'
    )}`
}

function buildTools(deps: MutableRefObject<ToolDeps>): WebMCPTool[] {
    const origin = () => window.location.origin

    return [
        {
            name: 'search_docs',
            description:
                'Search posthog.com. Returns up to 8 matching pages as JSON with title, url, type, and excerpt. Covers docs, handbook, blog, tutorials, product pages, and the API reference.',
            inputSchema: {
                type: 'object',
                properties: {
                    query: { type: 'string', description: 'Search terms.' },
                    type: {
                        type: 'string',
                        description:
                            'Optional. Restrict results to one content type, for example docs, handbook, blog, or tutorial.',
                    },
                },
                required: ['query'],
            },
            annotations: { readOnlyHint: true },
            execute: async ({ query, type }) => {
                if (typeof query !== 'string' || query.trim() === '') return textResult('query is required.', true)
                const { hits } = await algoliaSearchClient.initIndex(algoliaIndexName).search<SearchHit>(query.trim(), {
                    hitsPerPage: 8,
                    ...(typeof type === 'string' && type.trim() ? { filters: `type:${type.trim()}` } : {}),
                })
                if (hits.length === 0) return textResult(`No results for "${query}".`)
                const results = hits.map((hit) => ({
                    title: hit.title,
                    url: `${origin()}${hit.fields?.slug || `/${hit.slug}`}`,
                    type: hit.type,
                    excerpt: hit.excerpt,
                }))
                return textResult(JSON.stringify(results, null, 2))
            },
        },
        {
            name: 'read_page',
            description: `Read a posthog.com page as Markdown. Pass the page path, for example /docs/feature-flags. Omit path to read the page that is open now. Markdown exists for pages under: ${MARKDOWN_CONTENT_PATHS.join(
                ', '
            )}.`,
            inputSchema: {
                type: 'object',
                properties: { path: { type: 'string', description: 'Page path or full posthog.com URL.' } },
            },
            annotations: { readOnlyHint: true },
            execute: async ({ path }) => {
                const url = path === undefined || path === '' ? new URL(window.location.href) : resolveSitePath(path)
                if (!url) return textResult('path must be a posthog.com path, for example /docs/feature-flags.', true)
                const pathname = url.pathname.replace(/\/$/, '')
                if (!isMarkdownContentPath(pathname)) {
                    return textResult(
                        `${
                            pathname || '/'
                        } has no Markdown version. Markdown exists for pages under: ${MARKDOWN_CONTENT_PATHS.join(
                            ', '
                        )}.`,
                        true
                    )
                }
                const response = await fetch(getMarkdownUrl(pathname))
                if (!response.ok)
                    return textResult(`${pathname} has no Markdown version (HTTP ${response.status}).`, true)
                return textResult(await response.text())
            },
        },
        {
            name: 'get_site_overview',
            description:
                'Get a short Markdown overview of the PostHog platform: its products, tools, and how they fit together, with links. Start here to orient before searching.',
            inputSchema: NO_INPUT_SCHEMA,
            annotations: { readOnlyHint: true },
            execute: async () => {
                const response = await fetch('/platform.md')
                if (!response.ok) {
                    return textResult(
                        `The overview is not available (HTTP ${
                            response.status
                        }). The full index of Markdown pages is at ${origin()}/llms.txt.`,
                        true
                    )
                }
                return textResult(await response.text())
            },
        },
        {
            name: 'read_skill',
            description:
                'List and read PostHog agent skills (SKILL.md files that teach an agent to do a job with PostHog). Call with no arguments to list products. Pass "product" to list the skills of one product. Pass "name" to read one skill in full.',
            inputSchema: {
                type: 'object',
                properties: {
                    name: { type: 'string', description: 'Exact skill name, as listed.' },
                    product: { type: 'string', description: 'Product folder name, as listed.' },
                },
            },
            annotations: { readOnlyHint: true },
            execute: async ({ name, product }) => {
                const skills = deps.current.skills
                if (skills.length === 0) {
                    return textResult(`No skills are indexed on this site. Browse them at ${origin()}/skills.`, true)
                }
                if (typeof name === 'string' && name.trim()) {
                    const skill = skills.find((candidate) => candidate.name === name.trim())
                    if (!skill) return textResult(`No skill is named "${name}". ${skillsByProduct(skills)}`, true)
                    const response = await fetch(`${SKILL_RAW_BASE}/${skill.sourcePath}/SKILL.md`)
                    if (!response.ok)
                        return textResult(`Could not fetch ${skill.name} (HTTP ${response.status}).`, true)
                    return textResult(await response.text())
                }
                if (typeof product === 'string' && product.trim()) {
                    const matches = skills.filter((candidate) => candidate.product === product.trim())
                    if (matches.length === 0)
                        return textResult(`No product is named "${product}". ${skillsByProduct(skills)}`, true)
                    return textResult(matches.map((skill) => `## ${skill.name}\n${skill.description}`).join('\n\n'))
                }
                return textResult(skillsByProduct(skills))
            },
        },
        {
            name: 'navigate_page',
            description:
                'Open a posthog.com page in this tab. Pass a path, for example /docs/session-replay. Paths on other sites are refused.',
            inputSchema: {
                type: 'object',
                properties: { path: { type: 'string', description: 'Page path or full posthog.com URL.' } },
                required: ['path'],
            },
            execute: async ({ path }) => {
                const url = resolveSitePath(path)
                if (!url) return textResult('path must be a posthog.com path, for example /docs/session-replay.', true)
                navigate(`${url.pathname}${url.search}${url.hash}`)
                return textResult(`Opened ${url.pathname}.`)
            },
        },
        {
            name: 'ask_max',
            description:
                'Ask PostHog AI (Max), the assistant on posthog.com, a question about PostHog. Opens the chat panel on the page and sends the question. The answer appears in the chat panel for the user to read. This tool does not return the answer.',
            inputSchema: {
                type: 'object',
                properties: { question: { type: 'string', description: 'The question, in plain language.' } },
                required: ['question'],
            },
            execute: async ({ question }) => {
                if (typeof question !== 'string' || question.trim() === '')
                    return textResult('question is required.', true)
                deps.current.openNewChat({
                    path: `ask-max-${window.location.pathname}`,
                    initialQuestion: question.trim(),
                    context: [{ type: 'page', value: { path: window.location.pathname, label: document.title } }],
                })
                return textResult(
                    'Opened PostHog AI on the page and sent the question. The answer appears in the chat panel for the user to read.'
                )
            },
        },
        {
            name: 'get_mcp_connection_info',
            description:
                'Explain how to connect an MCP (Model Context Protocol) client, such as Claude Code, Cursor, or Codex, to the hosted PostHog MCP server. Returns the server URL, the authentication method, and the setup command.',
            inputSchema: NO_INPUT_SCHEMA,
            annotations: { readOnlyHint: true },
            execute: async () =>
                textResult(
                    [
                        'PostHog runs a hosted MCP (Model Context Protocol) server. An MCP client that connects to it can query analytics, manage feature flags, debug errors, and more, from plain-text prompts.',
                        '',
                        `Server URL (streamable HTTP): ${MCP_SERVER_URL}`,
                        'Authentication: OAuth. The client opens a browser window to sign in with a PostHog account. The auth server routes to the correct data region (US or EU).',
                        '',
                        'Fastest setup: run this command on the developer machine. It installs the server into PostHog Desktop, Cursor, Claude Code, Claude Desktop, Codex, VS Code, or Zed:',
                        `  ${buildWizardCommand({ subcommand: 'mcp add' }).copyCommand}`,
                        '',
                        `Setup guides for each client, and the list of MCP tools: ${origin()}/docs/model-context-protocol`,
                    ].join('\n')
                ),
        },
        {
            name: 'get_install_instructions',
            description:
                'Explain how to install PostHog in a codebase. Returns the PostHog wizard command that the developer runs locally, and what the wizard does.',
            inputSchema: NO_INPUT_SCHEMA,
            annotations: { readOnlyHint: true },
            execute: async () =>
                textResult(
                    [
                        'To add PostHog to a project, run the PostHog wizard on the developer machine, in the root directory of the project:',
                        `  ${buildWizardCommand({}).copyCommand}`,
                        '',
                        'The wizard is an agentic CLI. It analyzes the codebase, installs and configures the correct SDK, adds custom events, and creates dashboards. It asks the developer to log in or sign up in the browser, so no API key is needed first.',
                        '',
                        'Run it in a terminal. It cannot run inside this browser. It needs Node.js.',
                        '',
                        `About the wizard and the supported frameworks: ${origin()}/wizard`,
                        `Manual installation for every SDK: ${origin()}/docs/getting-started/install`,
                    ].join('\n')
                ),
        },
    ]
}

/** Wraps a tool so every call is a PostHog event, and a thrown error becomes an error result. */
function withTelemetry(tool: WebMCPTool): WebMCPTool {
    return {
        ...tool,
        execute: async (input, options) => {
            const started = performance.now()
            const capture = (success: boolean) =>
                window.posthog?.capture('webmcp tool called', {
                    tool: tool.name,
                    success,
                    duration_ms: Math.round(performance.now() - started),
                })
            try {
                const result = await tool.execute(input, options)
                capture(!result.isError)
                return result
            } catch (error) {
                capture(false)
                return textResult(
                    `${tool.name} failed: ${error instanceof Error ? error.message : String(error)}`,
                    true
                )
            }
        },
    }
}

export default function WebMCP(): null {
    const { openNewChat } = useAppActions()
    const skills = useAgentSkills()
    const deps = useRef<ToolDeps>({ openNewChat, skills })

    useEffect(() => {
        deps.current = { openNewChat, skills }
    }, [openNewChat, skills])

    useEffect(() => {
        const modelContext = document.modelContext
        if (!modelContext?.registerTool) return

        // Aborting the signal unregisters the tools, per spec, so unmounting cleans up.
        const controller = new AbortController()
        const tools = buildTools(deps).map(withTelemetry)
        Promise.all(tools.map((tool) => modelContext.registerTool(tool, { signal: controller.signal })))
            .then(() => window.posthog?.capture('webmcp tools registered', { tools: tools.map((tool) => tool.name) }))
            .catch((error) => console.warn('WebMCP: could not register tools', error))
        return () => controller.abort()
    }, [])

    return null
}
