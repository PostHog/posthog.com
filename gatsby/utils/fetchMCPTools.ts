import path from 'path'
import fs from 'fs'

const MCP_TOOLS_URL =
    'https://raw.githubusercontent.com/PostHog/posthog/refs/heads/master/services/mcp/schema/tool-definitions-all.json'

const MAX_DESCRIPTION_LENGTH = 300

function truncateDescription(text: string): string {
    if (text.length <= MAX_DESCRIPTION_LENGTH) return text
    return text.slice(0, MAX_DESCRIPTION_LENGTH - 1).trimEnd() + '…'
}

interface MCPTool {
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
    error: boolean
}

export async function fetchAndProcessMCPTools(): Promise<MCPToolsData> {
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 15000)
        const response = await fetch(MCP_TOOLS_URL, { signal: controller.signal as any })
        clearTimeout(timeoutId)

        if (response.status !== 200) {
            throw new Error(`Failed to fetch MCP tools: ${response.status}`)
        }

        const mcpTools = (await response.json()) as Record<string, MCPTool>

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
            error: false,
        }
    } catch (error) {
        console.error('Error fetching MCP tools:', error)
        return {
            categories: null,
            byName: null,
            error: true,
        }
    }
}

export function writeMCPToolsToFile(data: MCPToolsData): void {
    const mcpToolsPath = path.resolve(__dirname, '../../src/data/mcp-tools.json')
    fs.mkdirSync(path.dirname(mcpToolsPath), { recursive: true })
    fs.writeFileSync(mcpToolsPath, JSON.stringify(data, null, 2))
}
