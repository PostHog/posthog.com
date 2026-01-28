import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import OSTable from 'components/OSTable'
import Link from 'components/Link'
import { Select } from 'components/RadixUI/Select'
import dayjs from 'dayjs'

interface MdxTemplate {
    id: string
    fields: {
        slug: string
    }
    frontmatter: {
        thumbnail?: {
            publicURL: string
        }
        title: string
        subtitle?: string
        badge?: string
        price?: string
        filters?: {
            type?: string[]
            maintainer?: string
        }
    }
}

interface WorkflowTemplate {
    templateId: string
    name: string
    description: string
    image_url: string
    created_at: string
    fields: {
        slug: string
    }
    created_by: {
        first_name: string
        last_name: string
    } | null
}

interface UnifiedTemplate {
    id: string
    name: string
    description: string
    type: 'dashboard' | 'survey' | 'workflow'
    image_url?: string
    url: string
    badge?: string
    author?: string
}

const Title = ({ template }: { template: UnifiedTemplate }) => {
    return (
        <div className="flex items-center gap-2">
            <Link to={template.url} state={{ newWindow: true }}>
                {template.name}
            </Link>
            {template.badge && (
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-yellow/20 text-yellow dark:bg-yellow/30 dark:text-yellow">
                    {template.badge}
                </span>
            )}
        </div>
    )
}

export default function TemplatesLibrary(): JSX.Element {
    const [searchQuery, setSearchQuery] = useState('')
    const data = useStaticQuery(graphql`
        query TemplatesLibraryQuery {
            mdxTemplates: allMdx(filter: { fields: { slug: { regex: "/^/templates/(?!.*/docs).*/" } } }) {
                nodes {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        thumbnail {
                            publicURL
                        }
                        title
                        subtitle
                        badge
                        price
                        filters {
                            type
                            maintainer
                        }
                    }
                }
            }
            workflowTemplates: allPostHogWorkflowTemplate {
                nodes {
                    templateId
                    fields {
                        slug
                    }
                    name
                    description
                    image_url
                    created_at
                    created_by {
                        first_name
                        last_name
                    }
                }
            }
        }
    `)

    // Convert MDX templates to unified format
    const mdxTemplates: UnifiedTemplate[] = (data.mdxTemplates?.nodes || []).map((t: MdxTemplate) => {
        const types = t.frontmatter.filters?.type || []
        const type = types[0]

        return {
            id: t.id,
            name: t.frontmatter.title,
            description: t.frontmatter.subtitle || '',
            type,
            image_url: t.frontmatter.thumbnail?.publicURL,
            url: t.fields.slug,
            badge: t.frontmatter.badge,
            author: t.frontmatter.filters?.maintainer,
        }
    })

    // Convert workflow templates to unified format
    const workflowTemplates: UnifiedTemplate[] = (data.workflowTemplates?.nodes || []).map((t: WorkflowTemplate) => {
        // Check if created within last 30 days
        const isNew = t.created_at ? dayjs(t.created_at).isAfter(dayjs().subtract(30, 'day')) : false

        return {
            id: t.templateId,
            name: t.name,
            description: t.description || '',
            type: 'workflow' as const,
            image_url: t.image_url,
            url: `/templates/workflow/${t.fields.slug}`,
            badge: isNew ? 'New' : undefined,
            author: t.created_by
                ? `${t.created_by.first_name || ''} ${t.created_by.last_name || ''}`.trim()
                : undefined,
        }
    })

    // Combine all templates
    const allTemplates: UnifiedTemplate[] = [...mdxTemplates, ...workflowTemplates]

    // Define table columns
    const columns = [
        { name: '', width: '48px', align: 'center' as const },
        { name: 'Name', width: 'minmax(200px, 1.5fr)', align: 'left' as const },
        { name: 'Description', width: 'minmax(200px, 2fr)', align: 'left' as const },
        { name: 'Type', width: '120px', align: 'center' as const },
    ]

    // Parse URL query parameters on initial load
    const getInitialFilterValues = () => {
        if (typeof window === 'undefined') return { type: null }

        const params = new URLSearchParams(window.location.search)
        const type = params.get('type')

        const validType = type && ['dashboard', 'survey', 'workflow'].includes(type) ? type : null

        return { type: validType }
    }

    const initialFilters = getInitialFilterValues()

    // State for managing filters
    const [typeFilter, setTypeFilter] = useState<string | null>(initialFilters.type)

    // Update URL when filters change
    useEffect(() => {
        if (typeof window === 'undefined') return

        const params = new URLSearchParams()

        if (typeFilter) {
            params.set('type', typeFilter)
        }

        const queryString = params.toString()
        const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname

        if (newUrl !== window.location.pathname + window.location.search) {
            navigate(newUrl, { replace: true })
        }
    }, [typeFilter])

    // Apply filters
    const filteredByType = typeFilter ? allTemplates.filter((t) => t.type === typeFilter) : allTemplates

    // Apply search
    const filteredTemplates = searchQuery
        ? filteredByType.filter((template) => {
              const searchLower = searchQuery.toLowerCase()
              return (
                  template.name?.toLowerCase().includes(searchLower) ||
                  template.description?.toLowerCase().includes(searchLower) ||
                  template.type?.toLowerCase().includes(searchLower)
              )
          })
        : filteredByType

    // Sort templates alphabetically by name
    const sortedTemplates = [...filteredTemplates].sort((a, b) => a.name.localeCompare(b.name))

    // Create table rows
    const rows = sortedTemplates.map((template) => ({
        cells: [
            {
                content: template.image_url ? (
                    <img src={template.image_url} alt={template.name} className="w-8 h-8 object-cover rounded" />
                ) : null,
            },
            {
                content: <Title template={template} />,
            },
            {
                content: <span className="text-sm line-clamp-2">{template.description}</span>,
                className: 'text-sm',
            },
            {
                content: <span className="capitalize text-sm">{template.type}</span>,
            },
        ],
    }))

    return (
        <>
            {/* Filter controls */}
            <div className="flex flex-wrap gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Search templates..."
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
                                { value: 'dashboard', label: 'Dashboard' },
                                { value: 'survey', label: 'Survey' },
                                { value: 'workflow', label: 'Workflow' },
                            ],
                        },
                    ]}
                    placeholder="Type"
                    ariaLabel="Filter by type"
                    value={typeFilter || 'all'}
                    onValueChange={(value) => setTypeFilter(value === 'all' ? null : value)}
                    dataScheme="primary"
                />
            </div>

            <OSTable columns={columns} rows={rows} editable={false} width="full" />

            {sortedTemplates.length === 0 && (
                <p className="text-center text-muted py-8">
                    {searchQuery ? 'No templates match your search.' : 'No templates found.'}
                </p>
            )}
        </>
    )
}
