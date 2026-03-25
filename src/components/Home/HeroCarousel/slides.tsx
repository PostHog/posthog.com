import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { IconShare, IconSparkles } from '@posthog/icons'
import Link from 'components/Link'
import { getLogo } from 'constants/logos'
import usePlatformList from 'hooks/docs/usePlatformList'
import useProduct from 'hooks/useProduct'
import CloudinaryImage from 'components/CloudinaryImage'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

const dataSources = [
    { key: 'postgres', label: 'Postgres', url: '/docs/data-warehouse/sources/postgres' },
    { key: 'snowflake', label: 'Snowflake', url: '/docs/data-warehouse/sources/snowflake' },
    { key: 'salesforce', label: 'Salesforce', url: '/docs/data-warehouse/sources/salesforce' },
    { key: 'stripe', label: 'Stripe', url: '/docs/data-warehouse/sources/stripe' },
    { key: 'zendesk', label: 'Zendesk', url: '/docs/data-warehouse/sources/zendesk' },
] as const

const manageQueryHandles = ['data_modeling', 'cdp', 'data_warehouse', 'bi', 'sql_editor'] as const
const dataExportHandles = ['data_out'] as const

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

const debugHandles = ['session_replay', 'heatmaps', 'error_tracking', 'logs', 'profiles', 'surveys', 'support'] as const

const featureDevHandles = [
    'feature_flags',
    'experiments',
    'no_code_ab_testing',
    'early_access',
    'endpoints',
    'product_tours',
    'webhooks',
    'workflows_emails',
    'posthog_code',
] as const

const ProductItem = ({ product }: { product: any }) => {
    if (!product) return null
    const { Icon, color, name, slug } = product
    return (
        <Link
            to={`/${slug}`}
            state={{ newWindow: true }}
            className="flex items-center gap-1.5 text-primary no-underline hover:underline text-sm"
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

    const { destinations } = useStaticQuery(graphql`
        query HeroDestinationCount {
            destinations: allPostHogPipeline(filter: { type: { eq: "destination" } }) {
                totalCount
            }
        }
    `)
    const destinationCount = destinations?.totalCount || 0

    const manageProducts = manageQueryHandles.map((h) => allProducts.find((p: any) => p.handle === h))
    const exportProducts = dataExportHandles.map((h) => allProducts.find((p: any) => p.handle === h))

    return (
        <div className="rounded p-4 flex flex-col h-full">
            <div>
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/data_warehouse_2c3928e9ad.png"
                    className="@lg:float-right @lg:ml-4 mb-4 @lg:mb-0 w-60"
                />
                <h2 className="mt-0">Build better products with better data</h2>
                <p className="text-secondary text-sm">
                    These aren't integrations. Third party data is imported into PostHog's CDP and warehouse and lives
                    as a first-class citizen. This means you can query third party data <em>and</em> product usage data
                    together, leading to more informed decisions.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-4 flex-1">
                {/* Data sources & import */}
                <div className="flex flex-col gap-3">
                    <div className="@lg:text-center text-secondary text-sm border-b border-secondary pb-1">
                        Data sources &amp; import
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-2 @lg:justify-center">
                        {dataSources.map(({ key, label, url }) => (
                            <Link
                                key={key}
                                to={url}
                                state={{ newWindow: true }}
                                className="flex items-center gap-1.5 text-primary no-underline hover:underline text-sm"
                            >
                                <img src={getLogo(key)} alt={label} className="size-4 object-contain" />
                                <span>{label}</span>
                            </Link>
                        ))}
                    </div>
                    <div className="@lg:text-center mt-auto leading-tight">
                        <Link
                            to="/docs/data-warehouse/sources"
                            state={{ newWindow: true }}
                            className="text-sm font-semibold"
                        >
                            Explore {sourceCount} data sources
                        </Link>
                    </div>
                </div>

                {/* Manage & query */}
                <div className="flex flex-col gap-3">
                    <div className="@lg:text-center text-secondary text-sm border-b border-secondary pb-1">
                        Manage &amp; query
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-2 @lg:justify-center">
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

                {/* Data export */}
                <div className="flex flex-col gap-3">
                    <div className="@lg:text-center text-secondary text-sm border-b border-secondary pb-1">
                        Data export
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-2 @lg:justify-center">
                        {exportProducts.map(
                            (product: any) => product && <ProductItem key={product.handle} product={product} />
                        )}
                        <Link
                            to="/docs/cdp/batch-exports"
                            state={{ newWindow: true }}
                            className="flex items-center gap-1.5 text-primary no-underline hover:underline text-sm"
                        >
                            <IconShare className="size-4 text-purple" />
                            <span>Batch exports</span>
                        </Link>
                    </div>
                    <div className="@lg:text-center mt-auto leading-tight">
                        <Link
                            to="/data-stack/integrations-library?type=destination"
                            state={{ newWindow: true }}
                            className="text-sm font-semibold"
                        >
                            Explore {destinationCount} destinations
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

const ScatteredProduct = ({ product, className = '' }: { product: any; className?: string }) => {
    if (!product) return null
    const { Icon, color, name, slug, status } = product
    return (
        <Link
            to={`/${slug}`}
            state={{ newWindow: true }}
            className={`flex items-center gap-1.5 text-primary no-underline hover:underline text-sm whitespace-nowrap ${className}`}
        >
            {Icon && <Icon className={`size-4 text-${color}`} />}
            <span>{name}</span>
            {status && <span className={`size-1.5 shrink-0 rounded-full ${statusDotColor[status] || 'bg-muted'}`} />}
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
        { handle: 'web_analytics', '@xl': [14, 10], '@2xl': [12, 14], '@3xl': [24, 6] },
        { handle: 'product_analytics', '@xl': [42, 2], '@2xl': [30, 4], '@3xl': [14, 22] },
        { handle: 'revenue_analytics', '@xl': [72, 2], '@2xl': [70, 4], '@3xl': [74, 6] },
        { handle: 'session_replay', '@xl': [26, 24], '@2xl': [24, 28], '@3xl': [10, 40] },
        { handle: 'funnels', '@xl': [26, 24], '@2xl': [24, 28], '@3xl': [6, 60] },
        { handle: 'heatmaps', '@xl': [76, 24], '@2xl': [76, 28], '@3xl': [80, 22] },
        { handle: 'trends', '@xl': [76, 24], '@2xl': [76, 28], '@3xl': [90, 36] },
        { handle: 'lifecycle', '@xl': [4, 30], '@2xl': [4, 42], '@3xl': [10, 78] },
        { handle: 'user_paths', '@xl': [6, 54], '@2xl': [8, 62], '@3xl': [6, 96] },
        { handle: 'llm_evals', '@xl': [92, 10], '@2xl': [88, 14], '@3xl': [90, 56] },
        { handle: 'llm_traces', '@xl': [96, 30], '@2xl': [96, 30], '@3xl': [86, 74] },
        { handle: 'llm_generations', '@xl': [94, 54], '@2xl': [92, 58], '@3xl': [90, 90] },
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
                    <ScatteredProduct product={product} />
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
                    return <ScatteredProduct key={handle} product={product} />
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
            <DebugContainerQuery />
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
        <div className="rounded p-4">
            <div className="grid grid-cols-1 @lg:grid-cols-[1fr_auto] gap-x-8 gap-y-4">
                <div>
                    <h2 className="mt-0">Diagnose what went wrong</h2>
                    <p className="text-secondary text-sm">
                        Slice and dice data with a variety of tools that help you explore in different ways.
                    </p>
                    <p className="text-secondary text-sm">
                        You can also see what users are doing in your product and pinpoint when things go wrong.
                    </p>
                </div>
                <div>
                    <p className="text-secondary text-xs font-semibold mb-2 @lg:mt-9">Debugging &amp; analysis</p>
                    <div className="flex flex-col gap-1.5">
                        {products.map(
                            (product: any) => product && <ScatteredProduct key={product.handle} product={product} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const TestRolloutSlide = () => {
    const allProducts = useProduct() as any[]
    const products = featureDevHandles.map((h) => allProducts.find((p: any) => p.handle === h))

    return (
        <div className="rounded p-4">
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/lazy_a2afd552f7.png"
                className="@lg:float-right @lg:ml-4 mb-4 @lg:mb-0 w-48"
            />
            <h2 className="mt-0">Build</h2>
            <p className="text-secondary text-sm">
                Now that you know what's happening, you can make informed decisions about what to build.
            </p>
            <p className="text-secondary text-sm">
                PostHog helps you build features safely, then test and validate ideas before you roll them out to
                everyone.
            </p>
            <p className="text-secondary text-sm">
                Use{' '}
                <Link to="/posthog-code" state={{ newWindow: true }} className="font-semibold">
                    PostHog Code
                </Link>{' '}
                for AI product development that writes code based on product data.
            </p>

            <div className="grid grid-cols-2 @lg:grid-cols-3 gap-x-6 gap-y-2 clear-both pt-2">
                {products.map((product: any) => product && <ScatteredProduct key={product.handle} product={product} />)}
            </div>
        </div>
    )
}
