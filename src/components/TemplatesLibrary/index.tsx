import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import Link from 'components/Link'
import { IconSearch } from '@posthog/icons'
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
    tags: string[]
    image_url?: string
    url: string
    badge?: string
    author?: string
}

const templateTags: Record<string, string[]> = {
    'AARRR pirate metrics': ['Analytics', 'Product'],
    'Advertising dashboard': ['Marketing', 'Analytics'],
    'Announce a new feature': ['Marketing', 'Product'],
    'B2B metrics template': ['Analytics', 'Product'],
    'B2C metrics template': ['Analytics', 'Product'],
    'CSP Violation Reports': ['Engineering', 'Ops'],
    'Customer churn rate (CCR) survey': ['Surveys & Feedback', 'Customer Success'],
    'Customer effort score (CES) survey': ['Surveys & Feedback', 'Customer Success'],
    'Customer satisfaction (CSAT) survey': ['Surveys & Feedback', 'Product'],
    'Growth analytics dashboard': ['Analytics', 'Marketing'],
    'Hubspot starter report template': ['Sales', 'Marketing'],
    'Landing page report': ['Marketing', 'Analytics'],
    'LLM metrics template': ['AI', 'Engineering'],
    'Mobile crash-free rates': ['Engineering', 'Product'],
    'Mobile dashboard': ['Engineering', 'Product'],
    'Net promoter score (NPS) survey': ['Surveys & Feedback', 'Product'],
    'Onboarding started but not completed': ['Customer Success', 'Product'],
    'Open feedback': ['Surveys & Feedback', 'Product'],
    'PostHog billable usage': ['Billing & Revenue', 'Ops'],
    'Product analytics dashboard': ['Analytics', 'Product'],
    'Product health metrics': ['Product', 'Analytics'],
    'Product-market fit (PMF) survey': ['Surveys & Feedback', 'Product'],
    'Real time analytics dashboard': ['Analytics', 'Ops'],
    'Stripe starter report template': ['Billing & Revenue', 'Sales'],
    'Trial started → upgrade nudge': ['Sales', 'Billing & Revenue'],
    'User interview': ['Surveys & Feedback', 'Product'],
    'User research': ['Surveys & Feedback', 'Analytics'],
    'User retention template': ['Analytics', 'Product'],
    'Website traffic dashboard': ['Marketing', 'Analytics'],
    'Welcome Email Sequence': ['Marketing', 'Customer Success'],
    'Zendesk starter report template': ['Support', 'Customer Success'],
}

const categories = [
    'Marketing',
    'Sales',
    'Product',
    'Support',
    'Customer Success',
    'Ops',
    'Engineering',
    'Analytics',
    'Billing & Revenue',
    'Surveys & Feedback',
    'AI',
]

const categoryColors: Record<string, string> = {
    Marketing: 'bg-yellow/15 text-yellow',
    Sales: 'bg-blue/15 text-blue',
    Product: 'bg-purple/15 text-purple',
    Support: 'bg-seagreen/15 text-seagreen',
    'Customer Success': 'bg-green/15 text-green',
    Ops: 'bg-orange/15 text-orange',
    Engineering: 'bg-red/15 text-red',
    Analytics: 'bg-blue/15 text-blue',
    'Billing & Revenue': 'bg-orange/15 text-orange',
    'Surveys & Feedback': 'bg-green/15 text-green',
    AI: 'bg-purple/15 text-purple',
    Other: 'bg-light-yellow/15 text-light-yellow',
}

function getTagsForTemplate(name: string): string[] {
    return templateTags[name] || ['Other']
}

function TemplateCard({ template }: { template: UnifiedTemplate }) {
    const primaryTag = template.tags[0] || 'Other'

    return (
        <Link
            to={template.url}
            state={{ newWindow: true }}
            className="group flex flex-col rounded-lg border border-primary bg-primary p-4 hover:border-yellow transition-colors no-underline"
        >
            <div className="flex items-start justify-between gap-2 mb-3">
                {template.image_url ? (
                    <img src={template.image_url} alt="" className="w-10 h-10 rounded object-cover shrink-0" />
                ) : (
                    <div className="w-10 h-10 rounded bg-accent shrink-0" />
                )}
                <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                        categoryColors[primaryTag] || categoryColors.Other
                    }`}
                >
                    {primaryTag}
                </span>
            </div>

            <h3 className="text-[15px] font-semibold text-primary leading-snug mb-0 group-hover:text-yellow transition-colors">
                {template.name}
            </h3>

            {template.badge && (
                <span className="inline-block text-xs font-semibold px-1.5 py-0.5 rounded bg-yellow/20 text-yellow mt-1 w-fit">
                    {template.badge}
                </span>
            )}
        </Link>
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

    const mdxTemplates: UnifiedTemplate[] = (data.mdxTemplates?.nodes || []).map((t: MdxTemplate) => {
        const types = t.frontmatter.filters?.type || []
        const type = types[0]

        return {
            id: t.id,
            name: t.frontmatter.title,
            description: t.frontmatter.subtitle || '',
            type,
            tags: getTagsForTemplate(t.frontmatter.title),
            image_url: t.frontmatter.thumbnail?.publicURL,
            url: t.fields.slug,
            badge: t.frontmatter.badge,
            author: t.frontmatter.filters?.maintainer,
        }
    })

    const workflowTemplates: UnifiedTemplate[] = (data.workflowTemplates?.nodes || []).map((t: WorkflowTemplate) => {
        const isNew = t.created_at ? dayjs(t.created_at).isAfter(dayjs().subtract(30, 'day')) : false

        return {
            id: t.templateId,
            name: t.name,
            description: t.description || '',
            type: 'workflow' as const,
            tags: getTagsForTemplate(t.name),
            image_url: t.image_url,
            url: `/templates/workflow/${t.fields.slug}`,
            badge: isNew ? 'New' : undefined,
            author: t.created_by
                ? `${t.created_by.first_name || ''} ${t.created_by.last_name || ''}`.trim()
                : undefined,
        }
    })

    const allTemplates: UnifiedTemplate[] = [...mdxTemplates, ...workflowTemplates]

    const getInitialFilterValues = () => {
        if (typeof window === 'undefined') return { category: null }

        const params = new URLSearchParams(window.location.search)
        const category = params.get('category')

        const validCategory = category && categories.includes(category) ? category : null

        return { category: validCategory }
    }

    const initialFilters = getInitialFilterValues()

    const [categoryFilter, setCategoryFilter] = useState<string | null>(initialFilters.category)

    useEffect(() => {
        if (typeof window === 'undefined') return

        const params = new URLSearchParams()

        if (categoryFilter) {
            params.set('category', categoryFilter)
        }

        const queryString = params.toString()
        const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname

        if (newUrl !== window.location.pathname + window.location.search) {
            navigate(newUrl, { replace: true })
        }
    }, [categoryFilter])

    const filteredByCategory = categoryFilter
        ? allTemplates.filter((t) => t.tags.includes(categoryFilter))
        : allTemplates

    const filteredTemplates = searchQuery
        ? filteredByCategory.filter((template) => {
              const searchLower = searchQuery.toLowerCase()
              return (
                  template.name?.toLowerCase().includes(searchLower) ||
                  template.description?.toLowerCase().includes(searchLower) ||
                  template.tags.some((tag) => tag.toLowerCase().includes(searchLower))
              )
          })
        : filteredByCategory

    const sortedTemplates = [...filteredTemplates].sort((a, b) => a.name.localeCompare(b.name))

    return (
        <div className="@container">
            {/* Hero */}
            <div className="text-center mb-8">
                <h1 className="text-4xl @xl:text-5xl font-bold text-primary mb-3">
                    {allTemplates.length.toLocaleString()} Templates
                </h1>
                <p className="text-secondary max-w-lg mx-auto mb-6">
                    Discover ready-made workflows to understand your users better. Built by product engineers, for
                    product engineers.
                </p>

                <div className="relative max-w-xl mx-auto mb-6">
                    <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                        type="text"
                        placeholder="Search workflows, use cases, products, etc."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-primary rounded-lg bg-primary text-primary placeholder:text-muted"
                    />
                </div>

                <p className="text-sm text-muted">
                    <span className="text-yellow font-semibold">{allTemplates.length.toLocaleString()}</span> templates
                    created by the community
                </p>
            </div>

            {/* Filters + count */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-primary mb-3">
                    {sortedTemplates.length.toLocaleString()} {sortedTemplates.length === 1 ? 'Template' : 'Templates'}
                </h2>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setCategoryFilter(null)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                            categoryFilter === null
                                ? 'bg-yellow text-white border-yellow'
                                : 'bg-primary text-primary border-primary hover:border-yellow'
                        }`}
                    >
                        All Templates
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                                categoryFilter === cat
                                    ? 'bg-yellow text-white border-yellow'
                                    : 'bg-primary text-primary border-primary hover:border-yellow'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Card grid */}
            <div className="grid grid-cols-1 @md:grid-cols-2 @2xl:grid-cols-3 gap-4">
                {sortedTemplates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                ))}
            </div>

            {sortedTemplates.length === 0 && (
                <p className="text-center text-muted py-8">
                    {searchQuery ? 'No templates match your search.' : 'No templates found.'}
                </p>
            )}
        </div>
    )
}
