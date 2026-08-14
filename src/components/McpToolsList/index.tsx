import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'components/Link'

type McpTool = {
    name: string
    title: string
    summary: string
    feature: string
}

type Family = {
    title: string
    description: string
    /** Tool name prefixes or exact names. First matching family wins, so order matters. */
    match: string[]
}

const SCHEMA_SOURCE = 'https://github.com/PostHog/posthog/blob/master/services/mcp/schema/tool-definitions-all.json'

// Families for AI Observability (feature "llm_analytics"). Tools matching no family
// land in an "Other" bucket so new tool groups surface instead of silently disappearing.
const AIO_FAMILIES: Family[] = [
    { title: 'Traces', description: 'Find traces and read a single trace end to end', match: ['query-llm-'] },
    {
        title: 'Costs',
        description: 'Project-wide and per-user LLM spend',
        match: ['get-llm-total-costs-for-project', 'llma-personal-spend'],
    },
    {
        title: 'Evaluations',
        description: 'Create, run, and manage evaluations, reports, and directories',
        match: ['llma-evaluation-'],
    },
    { title: 'Datasets', description: 'Curate datasets and dataset items', match: ['llma-dataset-'] },
    { title: 'Review queues', description: 'Human review queues and their items', match: ['llma-review-queue-'] },
    {
        title: 'Clustering',
        description: 'Configure clustering jobs and read their results',
        match: ['llma-clustering-'],
    },
    { title: 'Prompts', description: 'Manage prompts and prompt labels', match: ['llma-prompt-'] },
    { title: 'Trace reviews', description: 'Structured reviews attached to traces', match: ['llma-trace-review-'] },
    {
        title: 'Score definitions',
        description: 'Define and version custom scores',
        match: ['llma-score-definition-'],
    },
    { title: 'Taggers', description: 'Auto-tag generations with Hog-based taggers', match: ['llma-tagger-'] },
    { title: 'Provider keys', description: 'LLM provider keys used by evaluations', match: ['llma-provider-key-'] },
    {
        title: 'Custom parsers',
        description: 'Parser recipes for custom LLM event formats',
        match: ['llma-parser-'],
    },
    { title: 'Summarization', description: 'AI trace summarization', match: ['llma-summarization-'] },
]

const allMcpToolsQuery = graphql`
    query {
        allMcpTool {
            nodes {
                name
                title
                summary
                feature
            }
        }
    }
`

type McpToolsListProps = {
    /** Feature tag in the MCP schema to list tools for, e.g. "llm_analytics" */
    feature: string
    /** Family grouping config. Defaults to the AI Observability families. */
    families?: Family[]
}

export default function McpToolsList({ feature, families = AIO_FAMILIES }: McpToolsListProps): JSX.Element {
    const data = useStaticQuery(allMcpToolsQuery)
    const tools = ((data?.allMcpTool?.nodes ?? []) as McpTool[])
        .filter((tool) => tool.feature === feature)
        .sort((a, b) => a.name.localeCompare(b.name))

    if (tools.length === 0) {
        // Builds without network access source no tools – point at the schema instead of rendering nothing
        return (
            <p>
                Browse the tool definitions in the{' '}
                <Link to={SCHEMA_SOURCE} external>
                    PostHog repo
                </Link>
                .
            </p>
        )
    }

    const buckets = families.map((family) => ({ ...family, tools: [] as McpTool[] }))
    const other = { title: 'Other', description: '', match: [] as string[], tools: [] as McpTool[] }
    tools.forEach((tool) => {
        const bucket = buckets.find((b) => b.match.some((m) => tool.name === m || tool.name.startsWith(m)))
        ;(bucket || other).tools.push(tool)
    })

    return (
        <div className="grid gap-4 mb-6">
            {[...buckets, other]
                .filter((bucket) => bucket.tools.length > 0)
                .map((bucket) => (
                    <div key={bucket.title}>
                        <p className="!mb-1.5 font-semibold">
                            {bucket.title}
                            {bucket.description && (
                                <span className="font-normal text-muted"> – {bucket.description}</span>
                            )}
                        </p>
                        <ul className="list-none !p-0 !m-0 flex flex-wrap gap-1.5">
                            {bucket.tools.map((tool) => (
                                <li
                                    key={tool.name}
                                    title={tool.summary || tool.title}
                                    className="!m-0 font-code text-xs border border-primary rounded-sm px-1.5 py-0.5 text-muted"
                                >
                                    {tool.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
        </div>
    )
}
