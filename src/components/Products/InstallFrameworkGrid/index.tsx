import React, { useMemo, useState } from 'react'
import Link from 'components/Link'
import Input from 'components/OSForm/input'
import { TAXONOMY, type InstallItem } from '../../../constants/installation-taxonomy'
import installFrameworkGridJson from '@data/content-install-framework-grid.json'
import type { InstallFrameworkGridData } from '~/data-layer/queries/content'

const { libraryLogos, productInstallUrls: installUrls } = installFrameworkGridJson as InstallFrameworkGridData
const productInstallUrls = new Set(installUrls)

/**
 * Shared framework picker driven by the install `TAXONOMY` (single source of
 * truth). Used by the product page Installation section and the docs Install
 * page so the framework list is never duplicated.
 *
 * Tiles resolve their URL by preferring a product-specific install guide at
 * `/docs/{productSlug}/installation/{slug}` (looked up from MDX at build time),
 * falling back to the generic `/docs/libraries/{librarySlug}`.
 */

interface InstallFrameworkGridProps {
    /** TAXONOMY category ids to show (e.g. `['web', 'mobile', 'no-code']`). Omit for all. */
    categories?: string[]
    /** Prefer `/docs/{productSlug}/installation/{slug}` guides when they exist. */
    productSlug?: string
    /** Show the search input. */
    searchable?: boolean
    className?: string
}

const sortByName = (a: InstallItem, b: InstallItem) => a.name.localeCompare(b.name)

const subheading = 'text-[11px] font-semibold text-secondary m-0 mb-1'
const tileGrid = 'grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-x-4 gap-y-1 p-0 m-0'

const InstallFrameworkGrid = ({
    categories,
    productSlug,
    searchable = true,
    className = '',
}: InstallFrameworkGridProps): JSX.Element | null => {
    const [query, setQuery] = useState('')
    const isSearching = query.trim().length > 0
    const lowerQuery = query.trim().toLowerCase()

    const resolveUrl = (item: InstallItem): string => {
        if (productSlug) {
            const candidate = `/docs/${productSlug}/installation/${item.slug}`
            if (productInstallUrls.has(candidate)) return candidate
        }
        return `/docs/libraries/${item.librarySlug}`
    }

    const visibleCategories = useMemo(
        () => (categories ? TAXONOMY.filter((c) => categories.includes(c.id)) : TAXONOMY),
        [categories]
    )

    const renderTile = (item: InstallItem, keyPrefix: string) => {
        const url = resolveUrl(item)
        const logo = libraryLogos[item.librarySlug]
        return (
            <li key={`${keyPrefix}-${item.slug}`} className="m-0 list-none break-inside-avoid">
                <Link
                    to={url}
                    className="group flex items-center gap-2 py-1.5 px-1 rounded hover:bg-accent text-primary no-underline"
                >
                    {logo ? (
                        <img src={logo} alt="" className="w-5 h-5 object-contain shrink-0" />
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
        <div className={className}>
            {searchable && (
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
            )}

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
    )
}

export default InstallFrameworkGrid
