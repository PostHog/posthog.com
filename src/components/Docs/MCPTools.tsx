import React from 'react'
import mcpToolsData from '../../data/mcp-tools.json'

interface Tool {
    name: string
    summary: string
}

interface ToolCategory {
    name: string
    tools: Tool[]
}

const MCPTools: React.FC = () => {
    const { categories: toolCategories, error } = mcpToolsData as {
        categories: ToolCategory[] | null
        error: boolean
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
                <p className="text-red-800 dark:text-red-200">
                    Tools unavailable. Please view the repo{' '}
                    <a
                        href="https://github.com/PostHog/posthog/tree/master/services/mcp"
                        className="underline font-semibold"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://github.com/PostHog/posthog/tree/master/services/mcp
                    </a>{' '}
                    to see tools.
                </p>
            </div>
        )
    }

    if (!toolCategories || toolCategories.length === 0) {
        return (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded">
                <p className="text-gray-600 dark:text-gray-400">Loading tools...</p>
            </div>
        )
    }

    return (
        <>
            {toolCategories.map((category) => (
                <div key={category.name} className="mb-8">
                    <h3>{category.name}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Tool</th>
                                <th>Purpose</th>
                            </tr>
                        </thead>
                        <tbody>
                            {category.tools.map((tool) => (
                                <tr key={tool.name}>
                                    <td>
                                        <code>{tool.name}</code>
                                    </td>
                                    <td>{tool.summary}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </>
    )
}

export default MCPTools
