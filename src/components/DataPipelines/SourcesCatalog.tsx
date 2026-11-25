import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import groupBy from 'lodash.groupby'
import Link from 'components/Link'
import { getSourceDocsPath } from 'lib/sourceDocs'

const DOCS_URL = '/docs/data-pipelines/sources'
const PREVIEW_LOGO_COUNT = 3

const GUIDE_SLUGS = ['stripe', 'postgres', 'hubspot', 'supabase', 'google-sheets']

type SourceNode = {
    name: string
    slug: string
    category?: string | null
    featured?: boolean | null
    icon_url?: string | null
    mdx?: { fields?: { slug?: string | null } | null } | null
}

const sourceCount = (count: number): string => `${count.toLocaleString('en-US')} ${count === 1 ? 'source' : 'sources'}`

const previewLogos = (sources: SourceNode[]): SourceNode[] =>
    [...sources]
        .filter((source) => source.icon_url)
        .sort((a, b) => {
            const aGuide = GUIDE_SLUGS.indexOf(a.slug)
            const bGuide = GUIDE_SLUGS.indexOf(b.slug)
            if (aGuide !== bGuide) {
                if (aGuide === -1) return 1
                if (bGuide === -1) return -1
                return aGuide - bGuide
            }
            if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1
            return a.name.localeCompare(b.name)
        })
        .slice(0, PREVIEW_LOGO_COUNT)

const headingClass = 'm-0 text-2xl font-bold text-primary @2xl/reader-content:text-3xl'
const introClass = 'mb-0 mt-3 max-w-prose text-lg text-secondary'

export default function SourcesCatalog(): JSX.Element {
    const { allPostHogSource } = useStaticQuery(graphql`
        query SourcesCatalog {
            allPostHogSource(filter: { unreleased: { ne: true } }, sort: { fields: name, order: ASC }) {
                nodes {
                    name
                    slug
                    category
                    featured
                    icon_url
                    mdx {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)

    const sources: SourceNode[] = allPostHogSource.nodes
    const bySlug = new Map(sources.map((source) => [source.slug, source]))
    const guides = GUIDE_SLUGS.map((slug) => bySlug.get(slug)).filter((source): source is SourceNode => Boolean(source))
    const groups = Object.entries(
        groupBy(
            sources.filter((source): source is SourceNode & { category: string } => Boolean(source.category)),
            'category'
        )
    ).sort(([a], [b]) => a.localeCompare(b))
    return (
        <>
            <section className="not-prose">
                <h2 className={headingClass}>Guides for our most connected sources</h2>
                <p className={introClass}>How to connect them, what gets synced, and how the sync stays current.</p>
                <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-x-4 gap-y-3 p-0 @md/reader-content:grid-cols-2 @3xl/reader-content:grid-cols-3 @5xl/reader-content:grid-cols-5">
                    {guides.map((source) => (
                        <li key={source.slug}>
                            <Link
                                to={getSourceDocsPath(source)}
                                state={{ newWindow: true }}
                                wrapperClassName="block leading-none"
                                className="group flex items-center gap-2.5 text-inherit no-underline"
                            >
                                <span className="flex size-12 shrink-0 items-center justify-center rounded-md border border-primary bg-white p-2.5 shadow-sm transition-transform duration-200 ease-out motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:scale-105 motion-safe:group-active:scale-100">
                                    {source.icon_url && (
                                        <img src={source.icon_url} alt="" className="size-full object-contain" />
                                    )}
                                </span>
                                <span className="flex min-w-0 flex-col gap-1">
                                    <span className="text-sm font-bold leading-[1.15] text-primary">{source.name}</span>
                                    {source.category && (
                                        <span className="text-xs leading-[1.15] text-secondary">{source.category}</span>
                                    )}
                                    <span className="text-xs font-semibold leading-[1.15] text-red group-hover:underline group-focus-visible:underline dark:text-yellow">
                                        Read guide →
                                    </span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
            <section className="not-prose">
                <div className="flex flex-col gap-3 @2xl/reader-content:flex-row @2xl/reader-content:items-end @2xl/reader-content:justify-between">
                    <div className="min-w-0 w-full">
                        <h2 className={headingClass}>Browse by category</h2>
                        <span className="flex items-end justify-between gap-2 flex-wrap">
                            <p className={introClass}>
                                1,400+ sources across every part of your stack. The full list lives in the docs.
                            </p>
                            <Link
                                to={DOCS_URL}
                                state={{ newWindow: true }}
                                className="shrink-0 text-base font-bold text-primary underline"
                            >
                                All sources in the docs →
                            </Link>
                        </span>
                    </div>
                </div>
                <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-x-10 p-0 @xl/reader-content:grid-cols-3">
                    {groups.map(([category, categorySources]) => (
                        <li
                            key={category}
                            className="border-b border-primary last:border-b-0 @xl/reader-content:[&:nth-last-child(-n+3)]:border-b-0"
                        >
                            <Link
                                to={`${DOCS_URL}#managed-sources`}
                                state={{ newWindow: true, category }}
                                wrapperClassName="block leading-none"
                                className="group flex items-center justify-between gap-4 py-3 text-inherit no-underline"
                            >
                                <div className="min-w-0">
                                    <p className="m-0 truncate text-base font-bold leading-tight text-primary group-hover:underline">
                                        {category}
                                    </p>
                                    <p className="m-0 mt-1.5 text-sm leading-none text-secondary">
                                        {sourceCount(categorySources.length)}
                                    </p>
                                </div>
                                <div className="flex shrink-0 items-center -space-x-2">
                                    {previewLogos(categorySources).map((source, index) => (
                                        <span
                                            key={source.slug}
                                            style={{ zIndex: index + 1 }}
                                            className="relative flex size-8 shrink-0 items-center justify-center rounded-md border border-primary bg-white p-1.5 shadow-sm"
                                        >
                                            <img
                                                src={source.icon_url || undefined}
                                                alt=""
                                                className="size-full object-contain"
                                            />
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}
