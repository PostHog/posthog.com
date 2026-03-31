import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { IconSparkles } from '@posthog/icons'
import Link from 'components/Link'
import Tooltip from 'components/RadixUI/Tooltip'
import { getLogo } from 'constants/logos'
import usePlatformList from 'hooks/docs/usePlatformList'
import useProduct from 'hooks/useProduct'
import CloudinaryImage from 'components/CloudinaryImage'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

const pickedSourceSlugs = [
    'postgres',
    'snowflake',
    'salesforce',
    'stripe',
    'zendesk',
    'google-ads',
    'hubspot',
    'bigquery',
    'redshift',
    'mysql',
    'github',
    'mongodb',
]

const batchExportItems = [
    { label: 'BigQuery', url: '/docs/cdp/batch-exports/bigquery', logoKey: 'bigquery' },
    { label: 'Snowflake', url: '/docs/cdp/batch-exports/snowflake', logoKey: 'snowflake' },
    { label: 'Amazon S3', url: '/docs/cdp/batch-exports/s3', logoKey: 's3' },
    { label: 'PostgreSQL', url: '/docs/cdp/batch-exports/postgres', logoKey: 'postgres' },
    { label: 'Redshift', url: '/docs/cdp/batch-exports/redshift', logoKey: 'redshift' },
]

const pickedDestinationSlugs = ['zapier', 'hubspot', 'salesforce', 'intercom', 'customerio', 'zendesk', 'webhook']

const getIconUrl = (iconUrl: string) => (iconUrl?.startsWith('http') ? iconUrl : `https://us.posthog.com${iconUrl}`)

const manageQueryHandles = ['data_modeling', 'sql_editor', 'cdp', 'data_warehouse', 'bi'] as const

const analyticsHandles = [
    'web_analytics',
    'product_analytics',
    'revenue_analytics',
    'trends',
    'funnels',
    'user_paths',
    'lifecycle',
    'llm_traces',
    'llm_generations',
    'llm_evals',
    'session_replay',
    'heatmaps',
] as const

const debugHandles = ['error_tracking', 'logs', 'session_replay', 'profiles'] as const

const rolloutGroups = [
    {
        title: 'Feature development',
        handles: ['feature_flags', 'experiments', 'no_code_ab_testing', 'early_access'] as const,
    },
    {
        title: 'Data APIs & automation',
        handles: ['endpoints', 'webhooks', 'workflows_emails'] as const,
    },
    {
        title: 'Feedback & training',
        handles: ['surveys', 'product_tours', 'support', 'user_interviews'] as const,
    },
] as const

const ProductItem = ({ product }: { product: any }) => {
    if (!product) return null
    const { Icon, color, name, slug } = product
    return (
        <Link
            to={`/${slug}`}
            state={{ newWindow: true }}
            className="flex items-center gap-1.5 text-primary no-underline hover:underline text-sm !font-medium"
        >
            {Icon && <Icon className={`size-4 text-${color}`} />}
            <span>{name}</span>
        </Link>
    )
}

export const OnePlaceSlide = () => {
    const allProducts = useProduct() as any[]
    const platforms = usePlatformList('docs/data-warehouse/sources', 'as a source')
    const sourceCount = platforms.length + 1

    const { allDestinations } = useStaticQuery(graphql`
        query HeroDestinationData {
            allDestinations: allPostHogPipeline(
                filter: { type: { eq: "destination" }, status: { ne: "coming_soon" } }
            ) {
                totalCount
                nodes {
                    slug
                    name
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
    const destinationCount = allDestinations?.totalCount || 0

    const pickedSources = pickedSourceSlugs
        .map((slug) => platforms.find((p: any) => p.url.endsWith(`/${slug}`)))
        .filter(Boolean)

    const pickedDestinations = pickedDestinationSlugs
        .map((slug) => allDestinations?.nodes?.find((n: any) => n.slug === slug))
        .filter(Boolean)
        .map((n: any) => ({
            label: n.name,
            url: n.mdx?.fields?.slug || `/docs/cdp/destinations/${n.slug}`,
            image: getIconUrl(n.icon_url),
        }))

    const exportDestinations = [...batchExportItems, ...pickedDestinations]

    const manageProducts = manageQueryHandles.map((h) => allProducts.find((p: any) => p.handle === h))
    return (
        <div className="rounded p-4 flex flex-col h-full">
            <div className="mb-6">
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/data_warehouse_2c3928e9ad.png"
                    className="@lg:float-right @lg:ml-8 mb-4 @lg:mb-0 w-60"
                />
                <h2 className="mt-0 mb-2">Build better products with better data</h2>
                <p className="text-secondary text-[15px]">
                    Not your mama's data integrations. Third party data is imported into PostHog's CDP and warehouse and
                    lives as a first-class citizen. This means you can query third party data <em>and</em> product usage
                    data, leading to more informed decisions.
                </p>
            </div>

            <div className="grid grid-cols-1 @lg:grid-cols-2 @2xl:grid-cols-3 gap-8 @2xl:gap-6 @3xl:gap-8 flex-1">
                {/* Data sources & import */}
                <div className="flex flex-col gap-3 order-1">
                    <div className="@lg:text-center text-secondary text-sm border-b border-secondary pb-1">
                        Data sources &amp; import
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 @lg:justify-center">
                        {pickedSources.map((source: any, i: number) => {
                            const fromEnd = pickedSources.length - 1 - i
                            const fadeSteps = [0.2, 0.2, 0.35, 0.35, 0.5, 0.5, 0.65, 0.65, 0.8, 0.8]
                            const opacity = fromEnd < fadeSteps.length ? fadeSteps[fromEnd] : 1
                            return (
                                <Link
                                    key={source.url}
                                    to={source.url}
                                    state={{ newWindow: true }}
                                    className="flex items-center gap-1.5 text-primary no-underline hover:underline text-sm !font-medium"
                                    style={opacity < 1 ? { opacity } : undefined}
                                >
                                    {source.image && (
                                        <img src={source.image} alt={source.label} className="size-4 object-contain" />
                                    )}
                                    <span>{source.label}</span>
                                </Link>
                            )
                        })}
                    </div>
                    <div className="@lg:text-center mt-auto leading-tight">
                        <Link
                            to="/docs/data-warehouse/sources"
                            state={{ newWindow: true }}
                            className="text-sm font-semibold"
                        >
                            Explore data sources
                        </Link>{' '}
                        <span className="text-secondary text-xs inline-flex items-center justify-center bg-accent rounded-full px-1.5 py-0.5">
                            {sourceCount}
                        </span>
                    </div>
                </div>

                {/* Reverse ETL & export */}
                <div className="flex flex-col gap-3 order-3 @lg:order-2 @2xl:order-3">
                    <div className="@lg:text-center text-secondary text-sm border-b border-secondary pb-1">
                        Reverse ETL &amp; export
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 @lg:justify-center">
                        {exportDestinations.map((dest: any, i: number) => {
                            const fromEnd = exportDestinations.length - 1 - i
                            const fadeSteps = [0.2, 0.2, 0.35, 0.35, 0.5, 0.5, 0.65, 0.65, 0.8, 0.8]
                            const opacity = fromEnd < fadeSteps.length ? fadeSteps[fromEnd] : 1
                            const iconSrc = (dest.logoKey ? getLogo(dest.logoKey) : dest.image) || ''
                            return (
                                <Link
                                    key={dest.label}
                                    to={dest.url}
                                    state={{ newWindow: true }}
                                    className="flex items-center gap-1.5 text-primary no-underline hover:underline text-sm !font-medium"
                                    style={opacity < 1 ? { opacity } : undefined}
                                >
                                    <img src={iconSrc} alt={dest.label} className="size-4 object-contain" />
                                    <span>{dest.label}</span>
                                </Link>
                            )
                        })}
                    </div>
                    <div className="@lg:text-center mt-auto leading-tight">
                        <Link
                            to="/data-stack/integrations-library?type=destination"
                            state={{ newWindow: true }}
                            className="text-sm font-semibold"
                        >
                            Explore destinations
                        </Link>{' '}
                        <span className="text-secondary text-xs inline-flex items-center justify-center bg-accent rounded-full px-1.5 py-0.5">
                            {destinationCount}
                        </span>
                    </div>
                </div>

                {/* Manage & query — last in DOM, but visually middle at @2xl+ */}
                <div className="flex flex-col gap-3 order-2 @lg:order-3 @2xl:order-2 @lg:col-span-2 @2xl:col-span-1">
                    <div className="@lg:text-center text-secondary text-sm border-b border-secondary pb-1">
                        Manage &amp; query
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-2 @lg:justify-center @lg:max-w-xs @lg:mx-auto @xl:max-w-none">
                        {manageProducts.map(
                            (product: any) => product && <ProductItem key={product.handle} product={product} />
                        )}
                    </div>
                    <div className="@lg:text-center mt-auto leading-tight">
                        <Link to="/data-stack" state={{ newWindow: true }} className="text-sm font-semibold">
                            Data stack README
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

const statusDotColor: Record<string, string> = {
    beta: 'bg-yellow',
    alpha: 'bg-orange',
    WIP: 'bg-red',
}

const statusTooltipLabel: Record<string, string> = {
    beta: 'Beta',
    alpha: 'Alpha',
    WIP: 'On the roadmap',
    coming_soon: 'On the roadmap',
    stable: 'Stable',
}

const ProductStatusLink = ({ product, className = '' }: { product: any; className?: string }) => {
    if (!product) return null
    const { Icon, color, name, slug, status } = product

    const content = (
        <>
            {Icon && <Icon className={`size-4 text-${color}`} />}
            <span>{name}</span>
            {status && (
                <Tooltip
                    delay={0}
                    trigger={
                        <span
                            className={`inline-block size-2 shrink-0 rounded-full relative -top-px -ml-px ${
                                statusDotColor[status] || 'bg-muted'
                            }`}
                        />
                    }
                >
                    <span>{statusTooltipLabel[status] || status}</span>
                </Tooltip>
            )}
        </>
    )

    if (status === 'WIP' || !slug) {
        return (
            <span
                className={`inline-flex items-center gap-1.5 text-primary text-sm whitespace-nowrap relative top-0.5 ${className}`}
            >
                {content}
            </span>
        )
    }

    return (
        <Link
            to={`/${slug}`}
            state={{ newWindow: true }}
            className={`flex items-center gap-1.5 text-primary no-underline hover:underline text-sm !font-medium whitespace-nowrap relative top-0.5 ${className}`}
        >
            {content}
        </Link>
    )
}

/*
 * ArcProducts slot positions
 *
 * Each entry maps a product handle to [x%, y%] at three @container breakpoints.
 * Coordinates are percentages of the overlay container:
 *   x: 0 = left edge, 50 = center, 100 = right edge
 *   y: 0 = top edge, 50 = middle, 100 = bottom edge
 * Items are centered on their point via translate(-50%, -50%).
 *
 * Breakpoints match Tailwind @container sizes:
 *   @xl  (≥ 36rem / 576px)
 *   @2xl (≥ 42rem / 672px)
 *   @3xl (≥ 48rem / 768px)
 *
 * Below @xl, products render as a simple 2-column grid above the image.
 */
const productSlots: { handle: string; '@xl': [number, number]; '@2xl': [number, number]; '@3xl': [number, number] }[] =
    [
        { handle: 'web_analytics', '@xl': [28, 4], '@2xl': [26, 6], '@3xl': [24, 6] },
        { handle: 'product_analytics', '@xl': [18, 22], '@2xl': [16, 22], '@3xl': [14, 22] },
        { handle: 'revenue_analytics', '@xl': [72, 4], '@2xl': [72, 6], '@3xl': [74, 6] },
        { handle: 'session_replay', '@xl': [10, 36], '@2xl': [10, 38], '@3xl': [10, 40] },
        { handle: 'funnels', '@xl': [7, 6], '@2xl': [5, 59], '@3xl': [6, 60] },
        { handle: 'heatmaps', '@xl': [76, 22], '@2xl': [78, 22], '@3xl': [80, 22] },
        { handle: 'trends', '@xl': [86, 36], '@2xl': [88, 36], '@3xl': [90, 36] },
        { handle: 'lifecycle', '@xl': [6, 84], '@2xl': [6, 78], '@3xl': [10, 78] },
        { handle: 'user_paths', '@xl': [12, 96], '@2xl': [8, 96], '@3xl': [6, 96] },
        { handle: 'llm_evals', '@xl': [94, 16], '@2xl': [95, 56], '@3xl': [90, 56] },
        { handle: 'llm_traces', '@xl': [94, 82], '@2xl': [92, 74], '@3xl': [86, 74] },
        { handle: 'llm_generations', '@xl': [90, 94], '@2xl': [88, 90], '@3xl': [90, 90] },
    ]

const ArcProducts = ({ products }: { products: any[] }) => {
    const productMap = Object.fromEntries(products.map((p: any) => [p.handle, p]))

    const renderSlots = (breakpoint: '@xl' | '@2xl' | '@3xl') =>
        productSlots.map(({ handle, ...pos }, i) => {
            const product = productMap[handle]
            if (!product) return null
            const [x, y] = pos[breakpoint]
            const duration = 4 + (i % 5) * 0.9
            const delay = -(i * 1.1)
            return (
                <div
                    key={handle}
                    className="absolute whitespace-nowrap animate-[scattered-float_ease-in-out_infinite]"
                    style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)',
                        animationDuration: `${duration}s`,
                        animationDelay: `${delay}s`,
                    }}
                >
                    <ProductStatusLink product={product} />
                </div>
            )
        })

    return (
        <>
            {/* Below @xl: simple 2-column grid */}
            <div className="z-10 @xl:hidden grid grid-cols-2 gap-x-4 gap-y-1 mb-2">
                {productSlots.map(({ handle }) => {
                    const product = productMap[handle]
                    if (!product) return null
                    return <ProductStatusLink key={handle} product={product} />
                })}
            </div>
            {/* @xl to @2xl */}
            <div className="absolute inset-0 z-10 pointer-events-none [&_a]:pointer-events-auto hidden @xl:block @2xl:hidden">
                {renderSlots('@xl')}
            </div>
            {/* @2xl to @3xl */}
            <div className="absolute inset-0 z-10 pointer-events-none [&_a]:pointer-events-auto hidden @2xl:block @3xl:hidden">
                {renderSlots('@2xl')}
            </div>
            {/* @3xl+ */}
            <div className="absolute inset-0 z-10 pointer-events-none [&_a]:pointer-events-auto hidden @3xl:block">
                {renderSlots('@3xl')}
            </div>
        </>
    )
}

export const UnderstandUsageSlide = () => {
    const allProducts = useProduct() as any[]
    const products = analyticsHandles.map((h) => allProducts.find((p: any) => p.handle === h)).filter(Boolean)

    return (
        <div className="rounded p-4 relative h-full flex flex-col bg-[#F3F4F0] dark:bg-[#131316]">
            <h2 className="my-0">Understand what users are doing</h2>
            <div className="grid grid-cols-1 @lg:grid-cols-2 gap-x-8 gap-y-4 mb-2">
                <div>
                    <p className="text-secondary text-sm">
                        Measure engagement, track conversion, and understand usage patterns &mdash; whether it's by
                        person, company, or AI feature.
                    </p>
                </div>
                <div>
                    <p className="text-secondary text-sm">
                        Work smarter with <IconSparkles className="size-4 text-purple inline-block" />{' '}
                        <Link to="/ai" state={{ newWindow: true }} className="font-semibold">
                            PostHog AI
                        </Link>{' '}
                        to get direct answers to questions about your data.
                    </p>
                </div>
            </div>

            <div className="relative mt-auto flex-1 min-h-[160px]">
                <ArcProducts products={products} />
                <div className="text-center max-w-[496px] mx-auto relative">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog_ai_light_8daa46cb81.png"
                        className="dark:hidden"
                    />
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog_ai_dark_512e216c3a.png"
                        className="hidden dark:block"
                    />
                </div>
            </div>
        </div>
    )
}

export const DebugFixSlide = () => {
    const allProducts = useProduct() as any[]
    const products = debugHandles.map((h) => allProducts.find((p: any) => p.handle === h))

    return (
        <div className="rounded pt-4 px-4 bg-primary">
            <h2 className="mt-0 mb-2">Triage issues, fix them automatically</h2>
            <p className="text-secondary text-sm">
                Use PostHog's debugging tools to quickly find issues and the get context to fix them.
            </p>
            <div className="bg-yellow/10 rounded px-3 border border-yellow mb-4">
                <p className="text-secondary text-sm my-3">
                    <strong>New:</strong>{' '}
                    <Link to="/code" state={{ newWindow: true }} className="font-semibold">
                        PostHog Code
                    </Link>{' '}
                    proactively finds bugs, fixes them, and creates pull requests automatically.
                </p>
            </div>
            <div className="grid grid-cols-1 @sm:grid-cols-2 @2xl:grid-cols-4 gap-x-1">
                {products.map((product: any) => {
                    if (!product) return null
                    return (
                        <div key={product.handle} className="rounded p-2">
                            <ProductStatusLink product={product} className="top-0" />
                            <p className="text-secondary text-[13px] mt-1 ml-[calc(16px+.375rem)] mb-0 leading-snug">
                                {product.shortDescription || product.description}
                            </p>
                        </div>
                    )
                })}
            </div>

            <div className="@xl:hidden -mx-4 leading-[0]">
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/debug_mobile_light_ea5c6b2c8b.png"
                    className="w-full dark:hidden"
                />
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/debug_mobile_dark_b2dd35e12d.png"
                    className="hidden w-full dark:block"
                />
            </div>
            <div className="hidden @xl:block -mx-4 -mt-4 leading-[0]">
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/debug_desktop_light_fd5d72221c.png"
                    className="w-full dark:hidden"
                />
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/debug_desktop_dark_471e9d86d6.png"
                    className="hidden w-full dark:block"
                />
            </div>
        </div>
    )
}

export const TestRolloutSlide = () => {
    const allProducts = useProduct() as any[]
    const productByHandle = Object.fromEntries(allProducts.map((product: any) => [product.handle, product]))
    const groupedProducts = rolloutGroups.map((group) => ({
        ...group,
        products: group.handles.map((handle) => productByHandle[handle]).filter(Boolean),
    }))

    return (
        <div className="rounded p-4 pb-6">
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/lazy_a2afd552f7.png"
                className="@lg:float-right @lg:ml-4 mb-4 @lg:mb-0 w-48"
            />
            <h2 className="mt-0">Ship features safely & get feedback</h2>
            <p className="text-secondary text-sm">
                Now that you know what's happening, you can make informed decisions about what to build.
            </p>
            <p className="text-secondary text-sm">
                PostHog helps you roll out features to specific users or groups, then test and validate ideas before you
                roll them out to everyone.
            </p>
            <p className="text-secondary text-sm">
                Use{' '}
                <Link to="/code" state={{ newWindow: true }} className="font-semibold">
                    PostHog Code
                </Link>{' '}
                for AI product development that writes code based on product data.
            </p>

            <div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-3 gap-6 clear-both pt-2">
                {groupedProducts.map((group, index) => {
                    const isFirstGroup = index === 0
                    return (
                        <div
                            key={group.title}
                            className={`flex flex-col gap-3 ${isFirstGroup ? '@sm:col-span-2 @xl:col-span-1' : ''}`}
                        >
                            <div className="text-secondary text-sm border-b border-secondary pb-1">{group.title}</div>
                            <div
                                className={
                                    isFirstGroup
                                        ? 'grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-1 gap-x-6 gap-y-1.5'
                                        : 'flex flex-col gap-1.5'
                                }
                            >
                                {group.products.map((product: any) => (
                                    <ProductStatusLink key={product.handle} product={product} />
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
