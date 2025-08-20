import fetch from 'node-fetch'
import path from 'path'
import fs from 'fs'

const MCP_TOOLS_URL = 'https://raw.githubusercontent.com/PostHog/mcp/refs/heads/main/schema/tool-definitions.json'

interface MCPTool {
    category?: string
    description: string
}

interface ToolCategory {
    name: string
    tools: Array<{
        name: string
        description: string
    }>
}

export async function fetchAndProcessMCPTools(): Promise<{
    categories: ToolCategory[] | null
    error: boolean
}> {
    try {
        const response = await fetch(MCP_TOOLS_URL)

        if (response.status !== 200) {
            throw new Error(`Failed to fetch MCP tools: ${response.status}`)
        }

        const mcpTools = (await response.json()) as Record<string, MCPTool>

        // Process the tools into categories
        const toolCategories: Record<string, Array<{ name: string; description: string }>> = {}

        Object.entries(mcpTools).forEach(([toolName, toolDef]) => {
            const category = toolDef.category || 'Uncategorized'
            if (!toolCategories[category]) {
                toolCategories[category] = []
            }
            toolCategories[category].push({
                name: toolName,
                description: toolDef.description,
            })
        })

        // Sort tools within each category alphabetically
        Object.values(toolCategories).forEach((tools) => {
            tools.sort((a, b) => a.name.localeCompare(b.name))
        })

        // Convert to array format and sort categories
        const categoriesArray = Object.entries(toolCategories)
            .map(([name, tools]) => ({ name, tools }))
            .sort((a, b) => a.name.localeCompare(b.name))

        return {
            categories: categoriesArray,
            error: false,
        }
    } catch (error) {
        console.error('Error fetching MCP tools:', error)
        return {
            categories: null,
            error: true,
        }
    }
}

export function writeMCPToolsToFile(data: { categories: ToolCategory[] | null; error: boolean }): void {
    const mcpToolsPath = path.resolve(__dirname, '../../src/data/mcp-tools.json')
    fs.mkdirSync(path.dirname(mcpToolsPath), { recursive: true })
    fs.writeFileSync(mcpToolsPath, JSON.stringify(data, null, 2))
}
