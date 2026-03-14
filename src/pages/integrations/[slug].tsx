import React, { useState, useMemo } from 'react'
import { PageProps, navigate, graphql, useStaticQuery } from 'gatsby'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSButton from 'components/OSButton'
import Link from 'components/Link'
import * as Icons from '@posthog/icons'
import {
    integrations,
    integrationSlug,
    POSTHOG_PRODUCT_COLORS,
    POSTHOG_CDN_ICONS,
    DOCS_URL_OVERRIDES,
    type Integration,
} from './data'

const CDN_BASE = 'https://us.posthog.com'

// --- Shared helpers (duplicated from index.tsx to keep pages independent) ---

const INTEGRATION_TYPE_COLORS: Record<string, string> = {
    'Realtime Destination': 'yellow',
    'Via Workflows': 'seagreen',
    Native: 'salmon',
    MCP: 'blue',
    'API-based': 'orange',
    Source: 'purple',
}

function getIconSrc(integration: Integration): string | null {
    const cdnPath = POSTHOG_CDN_ICONS[integration.name]
    if (cdnPath) return cdnPath.startsWith('http') ? cdnPath : `${CDN_BASE}${cdnPath}`
    return `https://logo.clearbit.com/${integration.domain}`
}

function getDocsUrl(integration: Integration): string {
    const override = DOCS_URL_OVERRIDES[integration.name]
    if (override) return override
    const { posthogProducts } = integration
    if (posthogProducts.includes('Error Tracking')) return '/docs/error-tracking/integrations'
    if (posthogProducts.includes('LLM Analytics')) return '/docs/llm-analytics'
    if (posthogProducts.includes('Feature Flags') || posthogProducts.includes('Experiments'))
        return '/docs/feature-flags'
    if (posthogProducts.includes('Data Warehouse')) return '/docs/data-warehouse/sources'
    if (posthogProducts.includes('CDP')) return '/docs/cdp/destinations'
    if (posthogProducts.includes('Workflows')) return '/docs/workflows'
    if (posthogProducts.includes('Product Analytics')) return '/docs/product-analytics'
    return '/docs'
}

// --- Logo component ---

const IntegrationLogo = ({ integration, size = 'xl' }: { integration: Integration; size?: 'lg' | 'xl' | '2xl' }) => {
    const [errored, setErrored] = useState(false)
    const sizeClass = size === '2xl' ? 'size-20' : size === 'xl' ? 'size-16' : 'size-10'
    const textSize = size === '2xl' ? 'text-4xl' : size === 'xl' ? 'text-3xl' : 'text-lg'
    const src = getIconSrc(integration)

    if (!src || errored) {
        return (
            <div
                className={`${sizeClass} rounded-2xl flex items-center justify-center bg-accent border border-border text-secondary font-bold flex-shrink-0 ${textSize}`}
            >
                {integration.name.charAt(0).toUpperCase()}
            </div>
        )
    }
    return (
        <img
            src={src}
            alt={`${integration.name} logo`}
            className={`${sizeClass} object-contain flex-shrink-0 rounded-2xl`}
            onError={() => setErrored(true)}
        />
    )
}

// --- Single combined static query for both docs and blog/tutorial content ---

interface ContentNode {
    fields: { slug: string }
    frontmatter: {
        title: string
        date: string
        tags: string[] | null
        category: string | null
        authors: Array<{
            name: string
            handle: string
            profile: { avatar: { url: string } | null } | null
        }> | null
    }
}

interface DocNode {
    fields: { slug: string }
    frontmatter: { title: string }
}

function useIntegrationPageData() {
    return useStaticQuery(graphql`
        query IntegrationDetailPageQuery {
            blogAndTutorials: allMdx(
                filter: {
                    isFuture: { ne: true }
                    frontmatter: { date: { ne: null } }
                    fields: { slug: { regex: "/^/(blog|tutorials)/" } }
                }
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 2000
            ) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date(formatString: "MMM D, YYYY")
                        tags
                        category
                        authors: authorData {
                            name
                            handle
                            profile {
                                avatar {
                                    url
                                }
                            }
                        }
                    }
                }
            }
            docs: allMdx(filter: { fields: { slug: { regex: "/^/docs/" } } }, limit: 5000) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    `)
}

// --- Related content table ---

function RelatedContentSection({ integration }: { integration: Integration }) {
    const data = useIntegrationPageData()

    const items = useMemo(() => {
        const lower = integration.name.toLowerCase()
        return (data.blogAndTutorials.nodes as ContentNode[]).filter((node) =>
            node.frontmatter.title?.toLowerCase().includes(lower)
        )
    }, [data, integration.name])

    if (items.length === 0) return null

    return (
        <div className="mt-10">
            <h2 className="text-base font-semibold text-primary mb-4">Related content</h2>
            <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border bg-accent/50">
                            <th className="text-left text-xs font-semibold text-muted uppercase tracking-wider px-4 py-2.5 w-28">
                                Date
                            </th>
                            <th className="text-left text-xs font-semibold text-muted uppercase tracking-wider px-4 py-2.5">
                                Title
                            </th>
                            <th className="text-left text-xs font-semibold text-muted uppercase tracking-wider px-4 py-2.5 hidden @sm:table-cell w-40">
                                Tags
                            </th>
                            <th className="text-left text-xs font-semibold text-muted uppercase tracking-wider px-4 py-2.5 hidden @md:table-cell w-36">
                                Author(s)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, idx) => {
                            const isLast = idx === items.length - 1
                            const tags = item.frontmatter.tags ?? []
                            const authors = item.frontmatter.authors ?? []
                            const contentType = item.fields.slug.startsWith('/tutorials/') ? 'tutorials' : 'blog'
                            return (
                                <tr
                                    key={item.fields.slug}
                                    className={`group hover:bg-accent/40 transition-colors ${
                                        isLast ? '' : 'border-b border-border'
                                    }`}
                                >
                                    <td className="px-4 py-3 text-muted text-xs whitespace-nowrap align-top">
                                        {item.frontmatter.date}
                                    </td>
                                    <td className="px-4 py-3 align-top">
                                        <Link
                                            to={item.fields.slug}
                                            state={{ newWindow: true }}
                                            className="font-medium text-primary hover:text-yellow transition-colors leading-snug line-clamp-2"
                                        >
                                            {item.frontmatter.title}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3 align-top hidden @sm:table-cell">
                                        <div className="flex flex-wrap gap-1">
                                            {tags.slice(0, 3).map((tag) => (
                                                <Link
                                                    key={tag}
                                                    to={`/${contentType}/tags/${tag
                                                        .toLowerCase()
                                                        .replace(/\s+/g, '-')}`}
                                                    state={{ newWindow: true }}
                                                    className="text-xs text-blue hover:underline"
                                                >
                                                    {tag}
                                                </Link>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 align-top hidden @md:table-cell">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                            {authors.map((author) => (
                                                <div key={author.handle} className="flex items-center gap-1.5">
                                                    {author.profile?.avatar?.url ? (
                                                        <img
                                                            src={author.profile.avatar.url}
                                                            alt={author.name}
                                                            className="size-5 rounded-full flex-shrink-0 object-cover"
                                                        />
                                                    ) : (
                                                        <div className="size-5 rounded-full bg-accent border border-border flex items-center justify-center text-[10px] font-bold text-muted flex-shrink-0">
                                                            {author.name.charAt(0)}
                                                        </div>
                                                    )}
                                                    <span className="text-xs text-secondary">{author.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

// --- Documentation section ---

function DocumentationSection({ integration }: { integration: Integration }) {
    const data = useIntegrationPageData()

    const items = useMemo(() => {
        const name = integration.name.toLowerCase()
        const token = name.replace(/[^a-z0-9]/g, '')
        return (data.docs.nodes as DocNode[]).filter((node) => {
            const slug = node.fields.slug?.toLowerCase() ?? ''
            if (slug.includes('/_snippets/') || slug.includes('/_media/')) return false
            const title = node.frontmatter.title?.toLowerCase() ?? ''
            return title.includes(name) || slug.includes(token)
        })
    }, [data, integration.name])

    if (items.length === 0) return null

    return (
        <div className="mt-10">
            <h2 className="text-base font-semibold text-primary mb-4">Documentation</h2>
            <div className="grid @sm:grid-cols-2 gap-3">
                {items.map((item) => (
                    <Link
                        key={item.fields.slug}
                        to={item.fields.slug}
                        state={{ newWindow: true }}
                        className="flex items-center gap-3 p-3.5 rounded-lg border border-border bg-accent/30 hover:bg-accent hover:border-border transition-colors group no-underline"
                    >
                        <div className="size-9 rounded-md bg-green/10 border border-green/20 flex items-center justify-center flex-shrink-0">
                            <Icons.IconBook className="size-4.5 text-green" />
                        </div>
                        <span className="text-sm font-medium text-primary group-hover:text-primary leading-snug line-clamp-2">
                            {item.frontmatter.title}
                        </span>
                        <Icons.IconArrowRight className="size-4 text-muted ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                ))}
            </div>
        </div>
    )
}

// --- Page ---

export default function IntegrationDetailPage({ params }: PageProps) {
    const { slug } = params
    const integration = integrations.find((i) => integrationSlug(i.name) === slug)
    const docsUrl = integration ? getDocsUrl(integration) : '/docs'

    return (
        <>
            <SEO
                title={integration ? `${integration.name} – PostHog Integrations` : 'Integration not found'}
                description={integration?.useCase}
            />
            <Explorer
                template="generic"
                slug={`integrations/${slug}`}
                title={integration?.name ?? 'Integration'}
                showTitle={false}
                headerBarOptions={['showBack', 'showForward', 'showSearch']}
                padding={false}
                fullScreen={true}
            >
                <div className="@container h-full overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="max-w-2xl mx-auto px-6 py-10">
                            {!integration ? (
                                <div className="text-center py-20">
                                    <p className="text-lg text-muted mb-4">Integration not found.</p>
                                    <OSButton variant="secondary" size="sm" asLink to="/integrations">
                                        Back to integrations
                                    </OSButton>
                                </div>
                            ) : (
                                <>
                                    {/* Back link */}
                                    <button
                                        onClick={() => navigate('/integrations')}
                                        className="flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors mb-8 group"
                                    >
                                        <Icons.IconChevronLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
                                        All integrations
                                    </button>

                                    {/* Header */}
                                    <div className="flex items-start gap-5 mb-8">
                                        <IntegrationLogo integration={integration} size="xl" />
                                        <div className="flex-1 min-w-0">
                                            <h1 className="text-3xl font-bold text-primary m-0 leading-tight">
                                                {integration.name}
                                            </h1>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-base text-secondary leading-relaxed mb-8">
                                        {integration.useCase}
                                    </p>

                                    {/* CTA */}
                                    <OSButton
                                        variant="primary"
                                        size="lg"
                                        asLink
                                        to={docsUrl}
                                        state={{ newWindow: true }}
                                        icon={<Icons.IconBook className="size-5" />}
                                        className="mb-10"
                                    >
                                        Installation guide
                                    </OSButton>

                                    {/* Meta grid */}
                                    <div className="border-t border-primary pt-8 grid @md:grid-cols-2 gap-6">
                                        {integration.categories.length > 0 && (
                                            <div>
                                                <div className="text-xs font-semibold text-muted uppercase tracking-widest mb-2">
                                                    Category
                                                </div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {integration.categories.map((c) => (
                                                        <button
                                                            key={c}
                                                            onClick={() =>
                                                                navigate(
                                                                    `/integrations?category=${encodeURIComponent(c)}`
                                                                )
                                                            }
                                                            className="text-sm px-2.5 py-1 rounded-md bg-accent text-secondary border border-border hover:text-primary hover:border-border transition-colors"
                                                        >
                                                            {c}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <div className="text-xs font-semibold text-muted uppercase tracking-widest mb-2">
                                                PostHog products
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {integration.posthogProducts.map((p) => {
                                                    const color = POSTHOG_PRODUCT_COLORS[p] || 'blue'
                                                    return (
                                                        <span
                                                            key={p}
                                                            className={`text-sm px-2.5 py-1 rounded-md bg-${color}/10 text-${color} font-medium`}
                                                        >
                                                            {p}
                                                        </span>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        {integration.integrationTypes.length > 0 && (
                                            <div>
                                                <div className="text-xs font-semibold text-muted uppercase tracking-widest mb-2">
                                                    Integration type
                                                </div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {integration.integrationTypes.map((t) => {
                                                        const color = INTEGRATION_TYPE_COLORS[t] || 'muted'
                                                        return (
                                                            <span
                                                                key={t}
                                                                className={`text-sm px-2.5 py-1 rounded-md bg-${color}/10 text-${color} border border-${color}/20 font-medium`}
                                                            >
                                                                {t}
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Documentation */}
                                    <DocumentationSection integration={integration} />

                                    {/* Related content */}
                                    <RelatedContentSection integration={integration} />
                                </>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </Explorer>
        </>
    )
}
