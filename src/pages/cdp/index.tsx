import React, { useMemo, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { createSlideConfig, SlidesTemplate } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import OSTable from 'components/OSTable'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import Link from 'components/Link'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import { Select } from 'components/RadixUI/Select'
import OSButton from 'components/OSButton'
import { IconFilter } from '@posthog/icons'

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

const Title = ({ pipeline }: { pipeline: any }) => {
    const url =
        pipeline.status !== 'coming_soon' &&
        (pipeline.mdx?.fields?.slug || `/docs/cdp/${pipeline.type}s/${pipeline.slug}`)

    return (
        <div className="flex items-center space-x-2">
            <img
                src={getIconUrl(pipeline.icon_url)}
                alt={pipeline.name}
                className="w-6 h-6 object-contain flex-shrink-0"
            />
            {url ? (
                <Link to={url} state={{ newWindow: true }}>
                    {pipeline.name}
                </Link>
            ) : (
                <span className="leading-tight">{pipeline.name}</span>
            )}
        </div>
    )
}

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

export default function CDP(): JSX.Element {
    const contentData = useContentData()
    const [searchQuery, setSearchQuery] = useState('')
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
        { name: 'Name', width: 'minmax(170px, 1fr)', align: 'left' as const },
        { name: 'Description', width: 'minmax(200px, 2fr)', align: 'left' as const },
        { name: 'Category', width: 'minmax(100px, 1fr)', align: 'left' as const },
        { name: 'Type', width: '120px', align: 'center' as const },
        { name: 'Status', width: '100px', align: 'center' as const },
    ]

    // State for managing filters
    const [typeFilter, setTypeFilter] = useState<string | null>(null)
    const [statusFilter, setStatusFilter] = useState<string | null>(null)
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null)

    // Apply all filters
    const filteredByType = typeFilter ? allPipelines.filter((p) => p.type === typeFilter) : allPipelines
    const filteredByStatus = statusFilter ? filteredByType.filter((p) => p.status === statusFilter) : filteredByType
    const filteredByCategory = categoryFilter
        ? filteredByStatus.filter((p) => p.category?.includes(categoryFilter))
        : filteredByStatus

    // Final filtered pipelines
    const finalFilteredPipelines = searchQuery
        ? filteredByCategory.filter((pipeline) => {
              const searchLower = searchQuery.toLowerCase()
              return (
                  pipeline.name?.toLowerCase().includes(searchLower) ||
                  pipeline.description?.toLowerCase().includes(searchLower) ||
                  pipeline.category?.some((cat: string) => cat.toLowerCase().includes(searchLower)) ||
                  pipeline.type?.toLowerCase().includes(searchLower)
              )
          })
        : filteredByCategory

    // Sort pipelines alphabetically by name
    const sortedPipelines = [...finalFilteredPipelines].sort((a, b) => a.name.localeCompare(b.name))

    // Update rows to use the final filtered pipelines
    const filteredRows = sortedPipelines.map((pipeline: any) => ({
        cells: [
            {
                content: <Title pipeline={pipeline} />,
            },
            { content: pipeline.description, className: 'text-sm' },
            { content: pipeline.category?.join(', ') || '', className: 'text-sm' },
            {
                content: <span className="capitalize text-sm">{pipeline.type}</span>,
            },
            {
                content: (
                    <span
                        className={`font-medium text-sm ${
                            pipeline.status === 'coming_soon' ? 'text-blue' : 'text-green'
                        }`}
                    >
                        {pipeline.status === 'coming_soon' ? 'Roadmap' : 'Live'}
                    </span>
                ),
            },
        ],
    }))

    return (
        <>
            <SEO
                title="CDP sources & destinations"
                description="Get all your data into PostHog with 60+ sources & destinations"
                image={`images/og/cdp.jpg`}
            />
            <ReaderView leftSidebar={<LeftSidebarContent />}>
                <h2 className="text-2xl font-bold my-4">Ingest, transform, and send data between hundreds of tools</h2>

                <img
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/w_800,c_limit,q_auto,f_auto/pipelines_e52c3f0e53.png"
                    className="not-prose @lg:float-right @lg:max-w-[250px] @xl:max-w-[300px] @lg:ml-4"
                />
                <p>
                    PostHog's customer data infrastructure (or you can call it our CDP or customer data platform) makes
                    it easy to import data from a warehouse, sync with event data, and export to other products.
                </p>
                <p>
                    Any event or action in PostHog can update user records or trigger workflows in other products in
                    your stack.
                </p>

                {/* Inline filter controls */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Search integrations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-3 py-1.5 border border-primary rounded bg-primary text-primary placeholder:text-muted flex-1 min-w-[200px]"
                    />
                    <Select
                        groups={[
                            {
                                label: null,
                                items: [
                                    { value: 'all', label: 'All types' },
                                    { value: 'source', label: 'Source' },
                                    { value: 'destination', label: 'Destination' },
                                    { value: 'transformation', label: 'Transformation' },
                                ],
                            },
                        ]}
                        placeholder="Type"
                        ariaLabel="Filter by type"
                        value={typeFilter || 'all'}
                        onValueChange={(value) => setTypeFilter(value === 'all' ? null : value)}
                        dataScheme="primary"
                    />
                    <Select
                        groups={[
                            {
                                label: null,
                                items: [
                                    { value: 'all', label: 'All statuses' },
                                    { value: 'live', label: 'Live' },
                                    { value: 'coming_soon', label: 'Roadmap' },
                                ],
                            },
                        ]}
                        placeholder="Status"
                        ariaLabel="Filter by status"
                        value={statusFilter || 'all'}
                        onValueChange={(value) => setStatusFilter(value === 'all' ? null : value)}
                        dataScheme="primary"
                    />
                    <Select
                        groups={[
                            {
                                label: null,
                                items: [
                                    { value: 'all', label: 'All categories' },
                                    ...allCategories.map((cat) => ({
                                        value: cat,
                                        label: cat,
                                    })),
                                ],
                            },
                        ]}
                        placeholder="Category"
                        ariaLabel="Filter by category"
                        value={categoryFilter || 'all'}
                        onValueChange={(value) => setCategoryFilter(value === 'all' ? null : value)}
                        dataScheme="primary"
                    />
                </div>

                <OSTable columns={columns} rows={filteredRows} editable={false} />
            </ReaderView>
        </>
    )
}
