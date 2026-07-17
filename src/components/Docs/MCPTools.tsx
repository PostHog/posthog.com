import React from 'react'
import mcpToolsData from '../../data/mcp-tools.json'

interface Tool {
    name: string
    summary: string
    description: string
}

interface ToolCategory {
    name: string
    feature?: string
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
            {toolCategories.map((category) => {
                const toolCount = category.tools.length
                return (
                    <details key={category.name} className="mb-2">
                        <summary>
                            <strong>{category.name}</strong> ({toolCount} {toolCount === 1 ? 'tool' : 'tools'})
                        </summary>
                        <div className="not-prose px-3 pt-2 pb-1">
                            <dl className="m-0 grid grid-cols-[minmax(0,auto)_1fr] gap-x-4">
                                {category.tools.map((tool, idx) => (
                                    <React.Fragment key={tool.name}>
                                        <dt className={`py-1.5 ${idx > 0 ? 'border-t border-primary' : ''}`}>
                                            <code className="text-[13px] whitespace-nowrap">{tool.name}</code>
                                        </dt>
                                        <dd
                                            className={`py-1.5 m-0 text-[14px] opacity-80 ${
                                                idx > 0 ? 'border-t border-primary' : ''
                                            }`}
                                        >
                                            {tool.summary}
                                        </dd>
                                    </React.Fragment>
                                ))}
                            </dl>
                        </div>
                    </details>
                )
            })}
        </>
    )
}

export default MCPTools
