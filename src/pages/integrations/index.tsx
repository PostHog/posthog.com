import React, { useState, useMemo, useCallback } from 'react'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSButton from 'components/OSButton'
import * as Icons from '@posthog/icons'
import Fuse from 'fuse.js'
import Link from 'components/Link'
import {
    integrations,
    integrationSlug,
    INTEGRATION_CATEGORIES,
    INTEGRATION_TYPES,
    POSTHOG_PRODUCTS,
    POSTHOG_PRODUCT_COLORS,
    POSTHOG_CDN_ICONS,
    ALL_CATEGORIES,
    ALL_PRODUCTS,
    ALL_TYPES,
    type Integration,
} from './data'

const CDN_BASE = 'https://us.posthog.com'

// Trending integrations — shown as feature cards after the second row
const TRENDING_INTEGRATIONS: string[] = ['Vercel', 'OneSignal', 'Stripe']

// --- Icon helpers ---

function getIconSrc(integration: Integration): string | null {
    const cdnPath = POSTHOG_CDN_ICONS[integration.name]
    if (cdnPath) return cdnPath.startsWith('http') ? cdnPath : `${CDN_BASE}${cdnPath}`
    // Clearbit fallback for integrations not in the PostHog CDN map
    return `https://logo.clearbit.com/${integration.domain}`
}

const IntegrationLogo = ({ integration, size = 'md' }: { integration: Integration; size?: 'sm' | 'md' | 'lg' }) => {
    const [errored, setErrored] = useState(false)
    const sizeClass = size === 'sm' ? 'size-5' : size === 'lg' ? 'size-10' : 'size-7'
    const textSize = size === 'sm' ? 'text-2xs' : size === 'lg' ? 'text-lg' : 'text-xs'
    const src = getIconSrc(integration)

    if (!src || errored) {
        return (
            <div
                className={`${sizeClass} rounded flex items-center justify-center bg-accent border border-border text-secondary font-bold flex-shrink-0 ${textSize}`}
            >
                {integration.name.charAt(0).toUpperCase()}
            </div>
        )
    }

    return (
        <img
            src={src}
            alt={`${integration.name} logo`}
            className={`${sizeClass} object-contain flex-shrink-0 rounded`}
            onError={() => setErrored(true)}
        />
    )
}

// --- Integration type badge ---

const INTEGRATION_TYPE_COLORS: Record<string, string> = {
    'Realtime Destination': 'yellow',
    'Via Workflows': 'seagreen',
    Native: 'salmon',
    MCP: 'blue',
    'API-based': 'orange',
    Source: 'purple',
}

// --- Product badge ---

const ProductBadge = ({ product }: { product: string }) => {
    const color = POSTHOG_PRODUCT_COLORS[product] || 'blue'
    return (
        <span
            className={`inline-block text-2xs font-semibold uppercase tracking-wide px-1 py-px rounded-sm bg-${color}/15 text-${color} leading-snug whitespace-nowrap`}
        >
            {product}
        </span>
    )
}

// --- Integration card ---

const IntegrationCard = ({ integration }: { integration: Integration }) => (
    <Link
        to={`/integrations/${integrationSlug(integration.name)}`}
        className="block p-4 rounded-md border border-transparent hover:border-border hover:bg-accent transition-colors focus:outline-none group"
    >
        <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
                <IntegrationLogo integration={integration} size="lg" />
            </div>
            <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm text-primary leading-snug">{integration.name}</div>
                <div className="text-xs text-secondary mt-1 line-clamp-2 leading-relaxed">{integration.useCase}</div>
                {integration.posthogProducts.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                        {integration.posthogProducts.map((p) => (
                            <ProductBadge key={p} product={p} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    </Link>
)

// --- Product icons map (used in toolbar tabs) ---

const PRODUCT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    [ALL_PRODUCTS]: Icons.IconApps,
    CDP: Icons.IconBolt,
    'Data Warehouse': Icons.IconDatabaseBolt,
    'Error Tracking': Icons.IconBug,
    Experiments: Icons.IconFlask,
    'Feature Flags': Icons.IconToggle,
    'LLM Analytics': Icons.IconAI,
    'Product Analytics': Icons.IconGraph,
    Workflows: Icons.IconListTreeConnected,
}

// --- PostHog product horizontal tabs (shown below search) ---

const ProductTabs = ({
    selectedProduct,
    onSelect,
    counts,
}: {
    selectedProduct: string
    onSelect: (product: string) => void
    counts: Record<string, number>
}) => {
    const allProducts = [ALL_PRODUCTS, ...POSTHOG_PRODUCTS]
    const total = Object.values(counts).reduce((a, b) => a + b, 0)

    return (
        <div className="flex gap-1 overflow-x-auto py-1 min-w-0 w-full" style={{ scrollbarWidth: 'none' }}>
            {allProducts.map((product) => {
                const count = product === ALL_PRODUCTS ? total : counts[product] ?? 0
                const color = POSTHOG_PRODUCT_COLORS[product]
                const isActive = selectedProduct === product
                const ProductIcon = PRODUCT_ICONS[product]
                return (
                    <button
                        key={product}
                        onClick={() => onSelect(product)}
                        className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium rounded transition-colors focus:outline-none border ${
                            isActive && color
                                ? `bg-${color}/10 border-${color}/25 text-primary`
                                : isActive
                                ? 'bg-accent border-border text-primary font-semibold'
                                : 'border-transparent text-secondary hover:bg-accent hover:text-primary'
                        }`}
                    >
                        {ProductIcon && (
                            <ProductIcon
                                className={`flex-shrink-0 size-3.5 ${
                                    isActive && color ? `text-${color}` : isActive ? 'text-primary' : 'text-muted'
                                }`}
                            />
                        )}
                        <span>{product}</span>
                        <span className={`tabular-nums text-xs ${isActive ? 'opacity-60' : 'text-muted'}`}>
                            {count}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}

// --- Integration category sidebar (shown in left panel) ---

const CategorySidebar = ({
    selectedCategory,
    onSelect,
    counts,
}: {
    selectedCategory: string
    onSelect: (cat: string) => void
    counts: Record<string, number>
}) => {
    const allCats = [ALL_CATEGORIES, ...INTEGRATION_CATEGORIES]
    const total = Object.values(counts).reduce((a, b) => a + b, 0)

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 py-2">
                <div className="px-3 py-1 text-xs font-semibold text-muted uppercase tracking-wide">Categories</div>
                <div className="mt-1 space-y-px">
                    {allCats.map((cat) => {
                        const count = cat === ALL_CATEGORIES ? total : counts[cat] ?? 0
                        const isActive = selectedCategory === cat
                        return (
                            <div key={cat}>
                                <button
                                    onClick={() => onSelect(cat)}
                                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded transition-colors text-left ${
                                        isActive
                                            ? 'bg-accent text-primary font-semibold'
                                            : 'text-secondary hover:bg-accent hover:text-primary'
                                    }`}
                                >
                                    <span className="truncate leading-snug">{cat}</span>
                                    <span
                                        className={`text-xs tabular-nums ml-2 flex-shrink-0 ${
                                            isActive ? 'text-secondary' : 'text-muted'
                                        }`}
                                    >
                                        {count}
                                    </span>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Partnerships CTA */}
            <div className="px-3 pb-4 pt-2 border-t border-primary">
                <p className="text-xs text-muted mb-2 leading-snug">
                    Don't see your tool? Build a native integration with PostHog.
                </p>
                <OSButton
                    variant="secondary"
                    size="sm"
                    width="full"
                    asLink
                    to="https://posthog.com/partnerships"
                    state={{ newWindow: true }}
                    icon={<Icons.IconPlug className="size-4" />}
                >
                    I want to integrate with PostHog
                </OSButton>
            </div>
        </div>
    )
}

// --- Sort options ---

type SortOrder = 'popular' | 'newest' | 'oldest' | 'az' | 'za'

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
    { value: 'popular', label: 'Most popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'az', label: 'A → Z' },
    { value: 'za', label: 'Z → A' },
]

// --- Main page ---

export default function IntegrationsPage(): JSX.Element {
    const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORIES)
    const [selectedProduct, setSelectedProduct] = useState<string>(ALL_PRODUCTS)
    const [selectedType, setSelectedType] = useState<string>(ALL_TYPES)

    const [searchQuery, setSearchQuery] = useState('')
    const [sortOrder, setSortOrder] = useState<SortOrder>('popular')

    const fuse = useMemo(
        () =>
            new Fuse(integrations, {
                keys: ['name', 'useCase', 'categories', 'posthogProducts'],
                threshold: 0.35,
            }),
        []
    )

    const baseFiltered = useMemo(() => {
        let results = searchQuery.trim() ? fuse.search(searchQuery.trim()).map((r) => r.item) : [...integrations]
        if (selectedProduct !== ALL_PRODUCTS) {
            results = results.filter((i) => i.posthogProducts.includes(selectedProduct))
        }
        return results
    }, [searchQuery, selectedProduct, fuse])

    const filtered = useMemo(() => {
        let results = [...baseFiltered]
        if (selectedCategory !== ALL_CATEGORIES) {
            results = results.filter((i) => i.categories.includes(selectedCategory))
        }
        if (selectedType !== ALL_TYPES) {
            results = results.filter((i) => i.integrationTypes.includes(selectedType))
        }
        results.sort((a, b) => {
            if (sortOrder === 'az') return a.name.localeCompare(b.name)
            if (sortOrder === 'za') return b.name.localeCompare(a.name)
            if (sortOrder === 'popular') {
                // Proxy: breadth of an integration (more products + categories = more popular)
                const scoreA = a.posthogProducts.length + a.categories.length + a.integrationTypes.length
                const scoreB = b.posthogProducts.length + b.categories.length + b.integrationTypes.length
                return scoreB - scoreA || a.name.localeCompare(b.name)
            }
            const idxA = integrations.indexOf(a)
            const idxB = integrations.indexOf(b)
            return sortOrder === 'newest' ? idxB - idxA : idxA - idxB
        })
        return results
    }, [baseFiltered, selectedCategory, selectedType, sortOrder])

    // Category counts — based on search+product filter (ignores the category filter itself)
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {}
        for (const integration of baseFiltered) {
            for (const cat of integration.categories) {
                counts[cat] = (counts[cat] ?? 0) + 1
            }
        }
        return counts
    }, [baseFiltered])

    // Product counts — based on search+category filter (ignores the product filter itself)
    const productCounts = useMemo(() => {
        let base = searchQuery.trim() ? fuse.search(searchQuery.trim()).map((r) => r.item) : [...integrations]
        if (selectedCategory !== ALL_CATEGORIES) {
            base = base.filter((i) => i.categories.includes(selectedCategory))
        }
        const counts: Record<string, number> = {}
        for (const integration of base) {
            for (const p of integration.posthogProducts) {
                counts[p] = (counts[p] ?? 0) + 1
            }
        }
        return counts
    }, [searchQuery, selectedCategory, fuse])

    // Type counts — based on search+product+category filters (ignores the type filter itself)
    const typeCounts = useMemo(() => {
        const counts: Record<string, number> = {}
        for (const integration of baseFiltered) {
            if (selectedCategory !== ALL_CATEGORIES && !integration.categories.includes(selectedCategory)) continue
            for (const t of integration.integrationTypes) {
                counts[t] = (counts[t] ?? 0) + 1
            }
        }
        return counts
    }, [baseFiltered, selectedCategory])

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query)
    }, [])

    return (
        <>
            <SEO
                title="Integrations – PostHog"
                description="Connect PostHog to 100+ tools. Send data to your data warehouse, CRM, marketing tools, and more."
            />
            <Explorer
                template="generic"
                slug="integrations"
                title="Integrations"
                showTitle={false}
                headerBarOptions={['showBack', 'showForward', 'showSearch']}
                onSearch={handleSearch}
                padding={false}
                fullScreen={true}
                leftSidebarContent={
                    <CategorySidebar
                        selectedCategory={selectedCategory}
                        onSelect={setSelectedCategory}
                        counts={categoryCounts}
                    />
                }
            >
                <div className="@container flex flex-col h-full overflow-hidden">
                    {/* Hero */}
                    <div className="flex-shrink-0 p-3 border-b border-primary">
                        <div data-scheme="dark" className="relative rounded-xl overflow-hidden bg-accent">
                            {/* Subtle gradient tint */}
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-seagreen/10 via-transparent to-blue/5 pointer-events-none"
                                aria-hidden
                            />

                            <div className="relative flex items-stretch min-h-[180px] @xl:min-h-[200px]">
                                {/* Left: text + CTA */}
                                <div className="flex-1 min-w-0 flex flex-col justify-center px-6 py-7 @xl:px-8 @xl:py-8 z-10">
                                    <p className="text-xs font-semibold text-muted m-0 mb-2 tracking-wide">
                                        Getting started
                                    </p>
                                    <h1 className="text-2xl @md:text-3xl @xl:text-4xl font-bold text-primary m-0 leading-tight">
                                        Connect PostHog
                                        <br />
                                        to everything
                                    </h1>
                                    <p className="text-sm text-secondary mt-2.5 mb-0 leading-relaxed max-w-[280px] @xl:max-w-xs">
                                        {integrations.length}+ integrations across CDP, data warehouse, feature flags,
                                        and more.
                                    </p>
                                    <div className="mt-5">
                                        <OSButton
                                            variant="primary"
                                            size="md"
                                            onClick={() => {
                                                const el = document.querySelector<HTMLInputElement>(
                                                    'input[placeholder="Search integrations…"]'
                                                )
                                                el?.focus()
                                            }}
                                        >
                                            Browse integrations
                                        </OSButton>
                                    </div>
                                </div>

                                {/* Right: illustration */}
                                <div
                                    className="hidden @md:flex flex-shrink-0 items-end justify-end self-stretch select-none"
                                    style={{ width: 240 }}
                                    aria-hidden
                                >
                                    <img
                                        src="/images/integrations-wizard.png"
                                        alt=""
                                        className="h-full w-full object-contain object-bottom drop-shadow-xl"
                                        style={{ maxHeight: 220 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Toolbar */}
                    <div className="flex-shrink-0 border-b border-primary px-3 pt-2 pb-1 space-y-1">
                        {/* Row 1: search + sort + count */}
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1 min-w-0">
                                <Icons.IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder="Search integrations…"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-8 pr-3 py-1.5 text-sm rounded border border-input bg-primary text-primary placeholder:text-muted focus:outline-none focus:border-blue"
                                />
                            </div>
                            <div className="flex-shrink-0 relative flex items-center">
                                <Icons.IconSort className="absolute left-2 top-1/2 -translate-y-1/2 size-3.5 text-muted pointer-events-none" />
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                                    className="pl-7 pr-6 py-1.5 text-xs font-medium rounded border border-input bg-primary text-secondary hover:bg-accent hover:text-primary transition-colors appearance-none cursor-pointer focus:outline-none focus:border-blue"
                                >
                                    {SORT_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                                <Icons.IconChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 size-3 text-muted pointer-events-none" />
                            </div>
                            <span className="flex-shrink-0 text-xs text-muted tabular-nums whitespace-nowrap">
                                {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                            </span>
                        </div>

                        {/* Row 2: Integration type pills — full width, scrollable */}
                        <div
                            className="flex items-center gap-1 overflow-x-auto min-w-0 w-full"
                            style={{ scrollbarWidth: 'none' }}
                        >
                            {[ALL_TYPES, ...INTEGRATION_TYPES].map((type) => {
                                const isActive = selectedType === type
                                const color = INTEGRATION_TYPE_COLORS[type]
                                const count =
                                    type === ALL_TYPES
                                        ? Object.values(typeCounts).reduce((a, b) => a + b, 0)
                                        : typeCounts[type] ?? 0
                                return (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedType(type)}
                                        className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded transition-colors focus:outline-none border ${
                                            isActive && color
                                                ? `bg-${color}/15 border-${color}/30 text-${color}`
                                                : isActive
                                                ? 'bg-accent border-border text-primary font-semibold'
                                                : 'border-transparent text-secondary hover:bg-accent hover:text-primary'
                                        }`}
                                    >
                                        {type}
                                        {count > 0 && (
                                            <span
                                                className={`tabular-nums text-2xs ${
                                                    isActive ? 'opacity-70' : 'text-muted'
                                                }`}
                                            >
                                                {count}
                                            </span>
                                        )}
                                    </button>
                                )
                            })}
                        </div>

                        {/* Row 3: PostHog product tabs — full width, scrollable */}
                        <ProductTabs
                            selectedProduct={selectedProduct}
                            onSelect={setSelectedProduct}
                            counts={productCounts}
                        />
                    </div>

                    {/* Card grid */}
                    <ScrollArea className="flex-1">
                        <div className="p-2 space-y-2">
                            {filtered.length === 0 ? (
                                <div className="text-center py-12 text-muted text-sm">
                                    No integrations match{' '}
                                    {searchQuery ? (
                                        <strong className="text-primary">"{searchQuery}"</strong>
                                    ) : (
                                        'the selected filters'
                                    )}
                                </div>
                            ) : (
                                (() => {
                                    // Show trending section after the first 6 cards only when unfiltered
                                    const showTrending =
                                        selectedCategory === ALL_CATEGORIES &&
                                        selectedProduct === ALL_PRODUCTS &&
                                        selectedType === ALL_TYPES &&
                                        !searchQuery &&
                                        filtered.length > 6

                                    const firstBatch = showTrending ? filtered.slice(0, 6) : filtered
                                    const restBatch = showTrending ? filtered.slice(6) : []

                                    const cardGrid = (items: typeof filtered) => (
                                        <div className="grid grid-cols-1 @lg:grid-cols-2 @3xl:grid-cols-3 gap-1">
                                            {items.map((integration) => (
                                                <IntegrationCard key={integration.name} integration={integration} />
                                            ))}
                                        </div>
                                    )

                                    return (
                                        <>
                                            {cardGrid(firstBatch)}

                                            {showTrending && (
                                                <div className="rounded-lg border border-seagreen/30 bg-seagreen/5 p-3">
                                                    <div className="flex items-center gap-2 mb-2.5">
                                                        <Icons.IconTrending className="size-4 text-seagreen" />
                                                        <span className="text-sm font-semibold text-primary">
                                                            Trending now
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-1 @lg:grid-cols-3 gap-1">
                                                        {TRENDING_INTEGRATIONS.map((name) => {
                                                            const integration = integrations.find(
                                                                (i) => i.name === name
                                                            )
                                                            if (!integration) return null
                                                            return (
                                                                <IntegrationCard key={name} integration={integration} />
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            {restBatch.length > 0 && cardGrid(restBatch)}
                                        </>
                                    )
                                })()
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </Explorer>
        </>
    )
}
