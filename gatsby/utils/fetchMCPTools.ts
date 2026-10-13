import path from 'path'
import fs from 'fs'

const MCP_SCHEMA_BASE_URL = 'https://raw.githubusercontent.com/PostHog/posthog'

// Generated in the main repo by services/mcp/scripts/generate-exec-docs.ts from the same
// templates the MCP server serves to agents at runtime.
const MCP_EXEC_COMMANDS_URL =
    'https://raw.githubusercontent.com/PostHog/posthog/refs/heads/master/services/mcp/schema/exec-command-reference.md'

const MAX_DESCRIPTION_LENGTH = 300

function truncateDescription(text: string): string {
    if (text.length <= MAX_DESCRIPTION_LENGTH) return text
    return text.slice(0, MAX_DESCRIPTION_LENGTH - 1).trimEnd() + '…'
}

export interface MCPTool {
    title?: string
    category?: string
    feature?: string
    summary: string
    description?: string
    required_scopes?: string[]
}

interface ToolCategoryTool {
    name: string
    summary: string
    description: string
}

// `feature` is the upstream YAML slug (e.g. "replay") and is exposed alongside the
// human-readable `name` so consumers can pick whichever fits their use case.
// Note: `feature` is NOT globally unique across categories — the upstream JSON has
// at least one collision (Insights & analytics + Query wrappers both share
// `feature: "insights"`). Use `name` when you need a unique key.
interface ToolCategory {
    name: string
    feature?: string
    tools: ToolCategoryTool[]
}

interface ToolByName {
    summary: string
    description?: string
    category?: string
    required_scopes?: string[]
}

export interface MCPToolsData {
    categories: ToolCategory[] | null
    byName: Record<string, ToolByName> | null
    execCommands: string | null
    error: boolean
}

async function fetchJson<T>(url: string): Promise<T> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)
    try {
        const response = await fetch(url, { signal: controller.signal as any })
        if (response.status !== 200) {
            throw new Error(`Failed to fetch ${url}: ${response.status}`)
        }
        return (await response.json()) as T
    } finally {
        clearTimeout(timeoutId)
    }
}

// PostHog/posthog keeps the hand-written and the generated tool definitions in two files and
// merges them at runtime: generated entries overwrite hand-written ones with the same name
// (same rule as services/mcp/src/tools/toolDefinitions.ts). Throws if either fetch fails.
export async function fetchMCPToolDefinitions(branch: string = 'master'): Promise<Record<string, MCPTool>> {
    const schemaUrl = `${MCP_SCHEMA_BASE_URL}/${branch}/services/mcp/schema`
    const [handwritten, generated] = await Promise.all([
        fetchJson<Record<string, MCPTool>>(`${schemaUrl}/tool-definitions.json`),
        fetchJson<Record<string, MCPTool>>(`${schemaUrl}/generated-tool-definitions.json`),
    ])
    return { ...handwritten, ...generated }
}

async function fetchExecCommandsMarkdown(): Promise<string | null> {
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 15000)
        const response = await fetch(MCP_EXEC_COMMANDS_URL, { signal: controller.signal as any })
        clearTimeout(timeoutId)

        if (response.status !== 200) {
            throw new Error(`Failed to fetch MCP exec command reference: ${response.status}`)
        }

        const markdown = await response.text()
        // The fragment opens with an HTML provenance comment, which react-markdown renders as
        // literal text. Take the document from its first heading rather than stripping the
        // comment: slicing can't reintroduce the sequence the way a replace can.
        const bodyStart = markdown.indexOf('## ')
        return bodyStart === -1 ? markdown : markdown.slice(bodyStart)
    } catch (error) {
        console.error('Error fetching MCP exec command reference:', error)
        return null
    }
}

export async function fetchAndProcessMCPTools(): Promise<MCPToolsData> {
    const execCommands = await fetchExecCommandsMarkdown()
    try {
        const mcpTools = await fetchMCPToolDefinitions()

        const toolCategories: Record<string, { feature?: string; tools: ToolCategoryTool[] }> = {}
        const byName: Record<string, ToolByName> = {}

        Object.entries(mcpTools).forEach(([toolName, toolDef]) => {
            const category = toolDef.category || 'Uncategorized'
            if (!toolCategories[category]) {
                toolCategories[category] = { feature: toolDef.feature, tools: [] }
            }
            toolCategories[category].tools.push({
                name: toolName,
                summary: toolDef.summary,
                description: truncateDescription(toolDef.description ?? ''),
            })
            byName[toolName] = {
                summary: toolDef.summary,
                description: toolDef.description,
                category: toolDef.category,
                required_scopes: toolDef.required_scopes,
            }
        })

        Object.values(toolCategories).forEach(({ tools }) => {
            tools.sort((a, b) => a.name.localeCompare(b.name))
        })

        const categoriesArray = Object.entries(toolCategories)
            .map(([name, { feature, tools }]) => ({ name, feature, tools }))
            .sort((a, b) => a.name.localeCompare(b.name))

        return {
            categories: categoriesArray,
            byName,
            execCommands,
            error: false,
        }
    } catch (error) {
        console.error('Error fetching MCP tools:', error)
        return {
            categories: null,
            byName: null,
            execCommands,
            error: true,
        }
    }
}

export function writeMCPToolsToFile(data: MCPToolsData): void {
    const mcpToolsPath = path.resolve(__dirname, '../../src/data/mcp-tools.json')
    fs.mkdirSync(path.dirname(mcpToolsPath), { recursive: true })
    fs.writeFileSync(mcpToolsPath, JSON.stringify(data, null, 2))
}
