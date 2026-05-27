import fetch from 'node-fetch'
import path from 'path'
import fs from 'fs'

const MCP_TOOLS_URL =
    'https://raw.githubusercontent.com/PostHog/posthog/refs/heads/master/services/mcp/schema/tool-definitions-all.json'

interface MCPTool {
    category?: string
    summary: string
    description?: string
    required_scopes?: string[]
}

interface ToolCategory {
    name: string
    tools: Array<{
        name: string
        summary: string
    }>
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
        const response = await fetch(MCP_TOOLS_URL)

        if (response.status !== 200) {
            throw new Error(`Failed to fetch MCP tools: ${response.status}`)
        }

        const mcpTools = (await response.json()) as Record<string, MCPTool>

        // Process the tools into categories
        const toolCategories: Record<string, Array<{ name: string; summary: string }>> = {}
        const byName: Record<string, ToolByName> = {}

        Object.entries(mcpTools).forEach(([toolName, toolDef]) => {
            const category = toolDef.category || 'Uncategorized'
            if (!toolCategories[category]) {
                toolCategories[category] = []
            }
            toolCategories[category].push({
                name: toolName,
                summary: toolDef.summary,
            })
            byName[toolName] = {
                summary: toolDef.summary,
                description: toolDef.description,
                category: toolDef.category,
                required_scopes: toolDef.required_scopes,
            }
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
