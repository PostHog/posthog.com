import React, { useState, useMemo } from 'react'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import OSButton from 'components/OSButton'
import * as Icons from '@posthog/icons'
import Fuse from 'fuse.js'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import useIntegrations, {
    POSTHOG_PRODUCT_COLORS,
    POSTHOG_CDN_ICONS,
    ALL_CATEGORIES,
    ALL_TYPES,
    INTEGRATION_TYPES,
    type Integration,
} from 'hooks/useIntegrations'

const CDN_BASE = 'https://us.posthog.com'

// --- Icon helpers ---

function getIconSrc(integration: Integration): string | null {
    if (integration.iconUrl) return integration.iconUrl
    const cdnPath = POSTHOG_CDN_ICONS[integration.name]
    if (cdnPath) return cdnPath.startsWith('http') ? cdnPath : `${CDN_BASE}${cdnPath}`
    if (integration.domain) return `https://logo.clearbit.com/${integration.domain}`
    return null
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
        to={`/integrations/${integration.slug}`}
        className="block p-5 rounded-md border border-transparent hover:border-border hover:bg-accent focus:outline-none group !transition-none"
    >
        <div className="flex items-start gap-3.5">
            <div className="flex-shrink-0 mt-0.5">
                <IntegrationLogo integration={integration} size="lg" />
            </div>
            <div className="min-w-0 flex-1">
                <div className="font-semibold text-base text-primary leading-snug">{integration.name}</div>
                <div className="text-[15px] text-secondary mt-1 line-clamp-2 leading-relaxed">
                    {integration.useCase}
                </div>
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

// --- Integration category sidebar (shown in left panel) ---

const CategorySidebar = ({
    selectedCategory,
    onSelect,
    counts,
    categoryList,
}: {
    selectedCategory: string
    onSelect: (cat: string) => void
    counts: Record<string, number>
    categoryList: string[]
}) => {
    const allCats = [ALL_CATEGORIES, ...categoryList]
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
                    size="md"
                    width="full"
                    asLink
                    to="https://posthog.com/partnerships"
                    state={{ newWindow: true }}
                >
                    <span className="whitespace-nowrap">Integrate with PostHog</span>
                </OSButton>
            </div>
        </div>
    )
}

// --- Sort options ---

type SortOrder = 'popular' | 'az' | 'za'

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
    { value: 'popular', label: 'Most popular' },
    { value: 'az', label: 'A → Z' },
    { value: 'za', label: 'Z → A' },
]

// --- Main page ---

export default function IntegrationsPage(): JSX.Element {
    const { integrations, categories } = useIntegrations()

    const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORIES)
    const [selectedType, setSelectedType] = useState<string>(ALL_TYPES)

    const [searchQuery, setSearchQuery] = useState('')
    const [sortOrder, setSortOrder] = useState<SortOrder>('popular')

    const fuse = useMemo(
        () =>
            new Fuse(integrations, {
                keys: ['name', 'useCase', 'categories', 'posthogProducts'],
                threshold: 0.35,
            }),
        [integrations]
    )

    const baseFiltered = useMemo(() => {
        return searchQuery.trim() ? fuse.search(searchQuery.trim()).map((r) => r.item) : [...integrations]
    }, [searchQuery, fuse, integrations])

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
                const scoreA = a.posthogProducts.length + a.categories.length + a.integrationTypes.length
                const scoreB = b.posthogProducts.length + b.categories.length + b.integrationTypes.length
                return scoreB - scoreA || a.name.localeCompare(b.name)
            }
            return a.name.localeCompare(b.name)
        })
        return results
    }, [baseFiltered, selectedCategory, selectedType, sortOrder])

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {}
        for (const integration of baseFiltered) {
            for (const cat of integration.categories) {
                counts[cat] = (counts[cat] ?? 0) + 1
            }
        }
        return counts
    }, [baseFiltered])

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

    return (
        <>
            <SEO
                title="Integrations – PostHog"
                description="Connect PostHog to 100+ tools. Send data to your data warehouse, CRM, marketing tools, and more."
            />
            <ReaderView
                title="Integrations"
                hideTitle={true}
                leftSidebar={
                    <CategorySidebar
                        selectedCategory={selectedCategory}
                        onSelect={setSelectedCategory}
                        counts={categoryCounts}
                        categoryList={categories}
                    />
                }
                hideRightSidebar={true}
                padding={false}
                contentMaxWidthClass="max-w-none"
                {...({
                    header: (
                        <>
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/builders_af3e2a0c0a.png"
                                alt="PostHog integrations"
                                className="mt-4 px-4"
                                imgClassName="max-w-[542px] w-full mx-auto"
                            />
                            <h2 className="text-xl @md/reader-content-container:text-2xl font-bold mx-4 mt-1 mb-1 text-center">
                                Connect PostHog to everything
                            </h2>
                            <p className="text-sm text-secondary text-center mx-4 mb-6">
                                {integrations.length}+ integrations across CDP, data warehouse, feature flags, and more.
                            </p>
                        </>
                    ),
                } as { header?: React.ReactNode })}
            >
                <div className="not-prose">
                    {/* Toolbar */}
                    <div className="border-b border-primary px-3 pt-2 pb-1 space-y-1">
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

                        <div
                            className="flex items-center gap-1.5 overflow-x-auto min-w-0 w-full"
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
                                        className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded transition-colors focus:outline-none border ${
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
                                                className={`tabular-nums text-xs ${
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
                    </div>

                    {/* Card grid */}
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
                            <div className="grid grid-cols-1 @lg/reader-content:grid-cols-2 @3xl/reader-content:grid-cols-3 gap-1">
                                {filtered.map((integration) => (
                                    <IntegrationCard key={integration.name} integration={integration} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
