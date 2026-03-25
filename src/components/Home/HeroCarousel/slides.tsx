import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { IconShare } from '@posthog/icons'
import Link from 'components/Link'
import { getLogo } from 'constants/logos'
import usePlatformList from 'hooks/docs/usePlatformList'
import useProduct from 'hooks/useProduct'
import CloudinaryImage from 'components/CloudinaryImage'

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
        <div>
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/data_warehouse_2c3928e9ad.png"
                className="@lg:float-right @lg:ml-4 mb-4 @lg:mb-0 w-60"
            />
            <h2 className="mt-0">Build better products with better data</h2>
            <p className="text-secondary text-sm">
                These aren't integrations. Third party data is imported into PostHog's CDP and warehouse and lives as a
                first-class citizen. This means you can query third party data <em>and</em> product usage data together,
                leading to more informed decisions.
            </p>

            <div className="grid grid-cols-3 gap-4">
                {/* Data sources & import */}
                <div className="flex flex-col gap-3">
                    <div className="text-center text-secondary text-sm font-semibold">Data sources &amp; import</div>
                    <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center">
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
                    <div className="text-center mt-auto">
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
                    <div className="text-center text-secondary text-sm font-semibold">Manage &amp; query</div>
                    <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center">
                        {manageProducts.map(
                            (product: any) => product && <ProductItem key={product.handle} product={product} />
                        )}
                    </div>
                    <div className="text-center mt-auto">
                        <Link to="/data-stack" state={{ newWindow: true }} className="text-sm font-semibold">
                            Data stack README
                        </Link>
                    </div>
                </div>

                {/* Data export */}
                <div className="flex flex-col gap-3">
                    <div className="text-center text-secondary text-sm font-semibold">Data export</div>
                    <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center">
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
                    <div className="text-center mt-auto">
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

export const UnderstandUsageSlide = () => {
    const allProducts = useProduct() as any[]
    const products = analyticsHandles.map((h) => allProducts.find((p: any) => p.handle === h))

    return (
        <div className="relative">
            <div className="grid grid-cols-1 @lg:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                <div>
                    <h2 className="mt-0">Understand what users are doing</h2>
                    <p className="text-secondary text-sm">
                        Measure engagement, track conversion, and understand usage patterns &mdash; whether it's by
                        person, company, or AI feature.
                    </p>
                </div>
                <div>
                    <p className="text-secondary text-sm @lg:mt-9">
                        Work smarter with PostHog AI ✨ to get direct answers to questions about your data.
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-around">
                {products.map((product: any) => product && <ScatteredProduct key={product.handle} product={product} />)}
            </div>
        </div>
    )
}

export const DebugFixSlide = () => {
    const allProducts = useProduct() as any[]
    const products = debugHandles.map((h) => allProducts.find((p: any) => p.handle === h))

    return (
        <div>
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
        <div>
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
