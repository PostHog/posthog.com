import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { createSlideConfig, SlidesTemplate } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import OSTable from 'components/OSTable'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import ScrollArea from 'components/RadixUI/ScrollArea'

const PRODUCT_HANDLE = 'cdp'

// Sources data from the old Pipelines component
const sources = [
    {
        id: 'source-stripe',
        name: 'Stripe',
        description: 'Payment processing platform',
        icon_url: '/static/services/stripe.png',
        category: ['Custom'],
        status: 'live',
        type: 'source',
    },
    {
        id: 'source-hubspot',
        name: 'Hubspot',
        description: 'CRM platform',
        icon_url: '/static/services/hubspot.png',
        category: ['CRM'],
        status: 'live',
        type: 'source',
    },
    {
        id: 'source-postgres',
        name: 'Postgres',
        description: 'Open source relational database',
        icon_url: '/static/services/postgres.png',
        category: ['Custom'],
        status: 'live',
        type: 'source',
    },
    {
        id: 'source-mysql',
        name: 'MySQL',
        description: 'Popular open-source database',
        icon_url: '/static/services/mysql.png',
        category: ['Custom'],
        status: 'live',
        type: 'source',
    },
    {
        id: 'source-mssql',
        name: 'MSSQL',
        description: 'Microsoft SQL Server',
        icon_url: '/static/services/sql-azure.png',
        category: ['Custom'],
        status: 'live',
        type: 'source',
    },
    {
        id: 'source-zendesk',
        name: 'Zendesk',
        description: 'Customer service software',
        icon_url: '/static/services/zendesk.png',
        category: ['Customer Success'],
        status: 'live',
        type: 'source',
    },
    {
        id: 'source-snowflake',
        name: 'Snowflake',
        description: 'Cloud data platform',
        icon_url: '/static/services/snowflake.png',
        category: ['Analytics'],
        status: 'live',
        type: 'source',
    },
    {
        id: 'source-salesforce',
        name: 'Salesforce',
        description: 'Customer relationship management',
        icon_url: '/static/services/salesforce.png',
        category: ['CRM'],
        status: 'live',
        type: 'source',
    },
    {
        id: 'source-vitally',
        name: 'Vitally',
        description: 'Customer success platform',
        icon_url: '/static/services/vitally.png',
        category: ['Customer Success'],
        status: 'live',
        type: 'source',
    },
    {
        id: 'source-bigquery',
        name: 'BigQuery',
        description: 'Google Cloud data warehouse',
        icon_url: '/static/services/bigquery.png',
        category: ['Analytics'],
        status: 'live',
        type: 'source',
    },
]

const getIconUrl = (iconUrl: string) => {
    return iconUrl?.startsWith('http') ? iconUrl : `https://us.posthog.com${iconUrl}`
}

export default function CDP(): JSX.Element {
    const contentData = useContentData()
    const [filteredPipelines, setFilteredPipelines] = useState<any>(null)
    const data = useStaticQuery(graphql`
        query {
            allMdx(filter: { fields: { slug: { regex: "/^/tutorials/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    rawBody
                    frontmatter {
                        title
                        description
                    }
                }
            }
            allProductData {
                nodes {
                    products {
                        name
                        type
                        unit
                        addons {
                            name
                            type
                            unit
                            plans {
                                name
                                plan_key
                                included_if
                                features {
                                    key
                                    name
                                    description
                                    limit
                                    note
                                }
                            }
                        }
                        plans {
                            name
                            plan_key
                            free_allocation
                            included_if
                            features {
                                key
                                name
                                description
                                limit
                                note
                            }
                            tiers {
                                unit_amount_usd
                                up_to
                            }
                        }
                    }
                }
            }
            destinations: allPostHogPipeline(filter: { type: { eq: "destination" } }) {
                nodes {
                    id
                    slug
                    name
                    category
                    description
                    icon_url
                    type
                    status
                }
            }
            transformations: allPostHogPipeline(filter: { type: { eq: "transformation" } }) {
                nodes {
                    id
                    slug
                    name
                    category
                    description
                    icon_url
                    type
                    status
                }
            }
        }
    `)

    // Combine all pipelines data - ensure consistent structure and type field
    const allPipelines = [
        ...sources.map((s) => ({
            ...s,
            // Explicitly set status to 'live' unless it's 'coming_soon'
            status: s.status === 'coming_soon' ? 'coming_soon' : 'live',
            type: s.type || 'source',
        })),
        ...(data.destinations?.nodes || []).map((d: any) => ({
            ...d,
            // Explicitly set status to 'live' unless it's 'coming_soon'
            status: d.status === 'coming_soon' ? 'coming_soon' : 'live',
            type: 'destination', // Ensure type is set correctly
        })),
        ...(data.transformations?.nodes || []).map((t: any) => ({
            ...t,
            // Explicitly set status to 'live' unless it's 'coming_soon'
            status: t.status === 'coming_soon' ? 'coming_soon' : 'live',
            type: 'transformation', // Ensure type is set correctly
        })),
    ]

    // Get unique categories
    const allCategories = Array.from(
        new Set(allPipelines.filter((p) => p.category && p.category.length > 0).flatMap((p) => p.category))
    ).sort()

    // Define table columns
    const columns = [
        { name: 'Name', width: 'minmax(150px, 1fr)' },
        { name: 'Description', width: 'minmax(200px, 2fr)' },
        { name: 'Status', width: '100px', align: 'center' as const },
        { name: 'Type', width: '120px', align: 'center' as const },
        { name: 'Category', width: 'minmax(100px, 1fr)' },
    ]

    // Use filtered pipelines if available, otherwise use all
    const pipelinesToDisplay = filteredPipelines || allPipelines

    // Sort pipelines alphabetically by name
    const sortedPipelines = [...pipelinesToDisplay].sort((a, b) => a.name.localeCompare(b.name))

    // Create table rows
    const rows = sortedPipelines.map((pipeline: any) => ({
        cells: [
            {
                content: (
                    <div className="flex items-center space-x-2">
                        <img
                            src={getIconUrl(pipeline.icon_url)}
                            alt={pipeline.name}
                            className="w-6 h-6 object-contain flex-shrink-0"
                        />
                        <span>{pipeline.name}</span>
                    </div>
                ),
            },
            { content: pipeline.description, className: 'text-sm' },
            {
                content: (
                    <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                            pipeline.status === 'coming_soon'
                                ? 'bg-blue/10 text-blue dark:text-white dark:bg-blue/50 border border-blue'
                                : 'bg-green/10 text-green dark:text-white dark:bg-green/50 border border-green'
                        }`}
                    >
                        {pipeline.status === 'coming_soon' ? 'Roadmap' : 'Live'}
                    </span>
                ),
            },
            {
                content: (
                    <span className="text-xs font-medium px-2 py-1 rounded bg-accent border border-input capitalize">
                        {pipeline.type}
                    </span>
                ),
            },
            { content: pipeline.category?.join(', ') || '', className: 'text-sm' },
        ],
    }))

    // Optional: Customize slides
    // See /components/Products/Slides/README.md for more details
    const slides = createSlideConfig({
        // exclude: ['comparison-summary'],
        // order: ['overview', 'pricing', 'features'],
        templates: {
            overview: 'columns', // Use the horizontal split layout
        },
    })

    // Merge content data with product data

    const mergedData = {
        ...data,

        ...contentData,
    }

    return (
        <>
            <SEO
                title="CDP sources & destinations"
                description="Get all your data into PostHog with 60+ sources & destinations"
                image={`images/og/cdp.jpg`}
            />
            <Editor
                title="cdp"
                type="mdx"
                slug="/cdp"
                availableFilters={[
                    {
                        label: 'type',
                        options: [
                            { label: 'Any', value: null },
                            { label: 'Source', value: 'source' },
                            { label: 'Destination', value: 'destination' },
                            { label: 'Transformation', value: 'transformation' },
                        ],
                        filter: (obj, value) => obj['type'] === value,
                        operator: 'equals',
                    },
                    {
                        label: 'status',
                        options: [
                            { label: 'Any', value: null },
                            { label: 'Live', value: 'live' },
                            { label: 'Roadmap', value: 'coming_soon' },
                        ],
                        filter: (obj, value) => obj['status'] === value,
                        operator: 'equals',
                    },
                    {
                        label: 'category',
                        options: [
                            { label: 'Any', value: null },
                            ...allCategories.map((cat) => ({
                                label: cat,
                                value: cat,
                            })),
                        ],
                        filter: (obj, value) => obj['category']?.includes(value),
                        operator: 'includes',
                    },
                ]}
                dataToFilter={allPipelines}
                onFilterChange={(data) => setFilteredPipelines(data)}
            >
                <ScrollArea>
                    <h2 className="text-2xl font-bold mb-4">
                        Ingest, transform, and send data between hundreds of tools
                    </h2>
                    <p>
                        PostHog's customer data platform (CDP) makes it easy to import data from a warehouse, sync with
                        event data, and export to other products in your stack.
                    </p>
                    <OSTable columns={columns} rows={rows} editable={false} />
                </ScrollArea>
            </Editor>
        </>
    )
}
