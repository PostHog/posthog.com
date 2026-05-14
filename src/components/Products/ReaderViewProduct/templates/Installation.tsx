import React, { useMemo, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'components/Link'
import Input from 'components/OSForm/input'
import { getLogo } from '../../../../constants/logos'
import { TAXONOMY, type InstallItem } from '../../../../constants/installation-taxonomy'
import { docsMenu } from '../../../../navs'
import type { SectionComponentProps } from '../types'

/**
 * Taxonomy lives in `constants/installation-taxonomy.ts` (wizard flags, docs lists).
 *
 * Per-product hooks pick which category `id`s to render via
 * `productData.installation.categories`. Tiles resolve their URL by checking
 * the corresponding `{productSlug}/installation/{slug}` node in `docsMenu`,
 * falling back to `/docs/libraries/{librarySlug}` when no product-specific
 * install guide exists.
 */

type LibraryNode = {
    fields: { slug: string }
    frontmatter: {
        title?: string
        platformLogo?: string
        icon?: { publicURL?: string } | null
    }
}

/**
 * Walks `docsMenu` collecting every nav URL that starts with the given prefix.
 * Used to determine which product-specific install guides exist for a product
 * so we can prefer them over the generic library docs.
 */
const collectUrls = (node: any, prefix: string): Set<string> => {
    const out = new Set<string>()
    const visit = (n: any) => {
        if (!n) return
        if (n.url && typeof n.url === 'string' && n.url.startsWith(prefix)) out.add(n.url)
        if (Array.isArray(n.children)) n.children.forEach(visit)
    }
    visit(node)
    return out
}

const sortByName = (a: InstallItem, b: InstallItem) => a.name.localeCompare(b.name)

const subheading = 'text-[11px] font-semibold text-secondary m-0 mb-1'
const tileGrid = 'columns-1 @md:columns-2 @2xl:columns-3 @4xl:columns-4 gap-x-4 p-0 m-0 gap-y-1'

const Installation = ({ id, productData }: SectionComponentProps) => {
    const installation = productData?.installation
    const productSlug: string | undefined = installation?.productSlug || productData?.slug
    const enabledCategories: string[] | undefined = installation?.categories

    const [query, setQuery] = useState('')
    const isSearching = query.trim().length > 0
    const lowerQuery = query.trim().toLowerCase()

    const data = useStaticQuery<{ libraries: { nodes: LibraryNode[] } }>(graphql`
        query InstallationLibrariesQuery {
            libraries: allMdx(filter: { fields: { slug: { regex: "/^/docs/libraries/[^/]+$/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        platformLogo
                        icon {
                            publicURL
                        }
                    }
                }
            }
        }
    `)

    const libraryMeta = useMemo(() => {
        const map = new Map<string, { logo?: string; title?: string }>()
        data?.libraries?.nodes?.forEach((node) => {
            const match = node.fields.slug.match(/^\/docs\/libraries\/([^/]+)/)
            if (!match) return
            const slug = match[1]
            const fm = node.frontmatter || {}
            const logo = fm.platformLogo ? getLogo(fm.platformLogo) : fm.icon?.publicURL
            map.set(slug, { logo, title: fm.title })
        })
        return map
    }, [data])

    const productInstallUrls = useMemo(
        () => (productSlug ? collectUrls(docsMenu, `/docs/${productSlug}/installation/`) : new Set<string>()),
        [productSlug]
    )

    const resolveUrl = (item: InstallItem): string => {
        if (productSlug) {
            const candidate = `/docs/${productSlug}/installation/${item.slug}`
            if (productInstallUrls.has(candidate)) return candidate
        }
        return `/docs/libraries/${item.librarySlug}`
    }

    const visibleCategories = useMemo(
        () => (enabledCategories ? TAXONOMY.filter((c) => enabledCategories.includes(c.id)) : TAXONOMY),
        [enabledCategories]
    )

    if (!installation) return null

    const heading = installation.headline || installation.title || 'Install'
    const description: React.ReactNode | undefined = installation.description

    const renderTile = (item: InstallItem, keyPrefix: string) => {
        const url = resolveUrl(item)
        const meta = libraryMeta.get(item.librarySlug)
        return (
            <li key={`${keyPrefix}-${item.slug}`} className="m-0 list-none break-inside-avoid">
                <Link
                    to={url}
                    state={{ newWindow: true }}
                    className="group flex items-center gap-2 py-1.5 px-1 rounded hover:bg-accent text-primary no-underline"
                >
                    {meta?.logo ? (
                        <img src={meta.logo} alt="" className="w-5 h-5 object-contain shrink-0" />
                    ) : (
                        <span className="w-5 h-5 shrink-0 inline-block rounded bg-accent" aria-hidden />
                    )}
                    <span className="text-sm leading-tight truncate">{item.name}</span>
                </Link>
            </li>
        )
    }

    const noResults =
        isSearching && visibleCategories.every((c) => c.items.every((i) => !i.name.toLowerCase().includes(lowerQuery)))

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="mb-3">{heading}</h2>
            {description && <p className="text-base text-secondary mb-4">{description}</p>}

            <div className="@container bg-primary rounded shadow-2xl p-4 @2xl/reader-content:p-8 @4xl/reader-content:p-10">
                <div className="mb-6 max-w-md">
                    <Input
                        label="Search install methods"
                        name="installation-search"
                        showLabel={false}
                        direction="column"
                        placeholder="Search frameworks, languages, integrations..."
                        value={query}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                        showClearButton
                        onClear={() => setQuery('')}
                    />
                </div>

                <div className="space-y-8">
                    {visibleCategories.map((category) => {
                        const sortedAll = [...category.items].sort(sortByName)
                        const popular = sortedAll.filter((i) => i.popular)
                        const filtered = isSearching
                            ? sortedAll.filter((i) => i.name.toLowerCase().includes(lowerQuery))
                            : sortedAll

                        if (isSearching && filtered.length === 0) return null

                        const showSplit = !isSearching && category.splitPopular && popular.length > 0

                        return (
                            <div key={category.id}>
                                <h3 className="text-base font-bold text-primary mb-3 border-b border-primary pb-1">
                                    {category.title}
                                </h3>

                                {showSplit && (
                                    <div className="mb-4">
                                        <h4 className={subheading}>Popular</h4>
                                        <ul className={tileGrid}>{popular.map((item) => renderTile(item, 'pop'))}</ul>
                                    </div>
                                )}

                                {showSplit && <h4 className={subheading}>All</h4>}
                                <ul className={tileGrid}>{filtered.map((item) => renderTile(item, 'all'))}</ul>
                            </div>
                        )
                    })}

                    {noResults && (
                        <p className="text-sm text-secondary italic m-0">No install methods match your search.</p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Installation
