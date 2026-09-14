import { graphql, useStaticQuery } from 'gatsby'
import React, { useRef } from 'react'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import useProduct from 'hooks/useProduct'
import { PricingTiers } from 'components/Pricing/Plans'
import { allProductsData } from 'components/Pricing/Pricing'
import { buildProductMenuTabs, ProductSwitcher, type ProductNavItem } from 'components/Products/ReaderViewProduct'

const productMenu: ProductNavItem[] = [
    { slug: 'overview', name: 'Overview' },
    { slug: 'use-cases', name: 'Example use cases' },
    { slug: 'pricing', name: 'Pricing' },
    { slug: 'getting-started', name: 'Get started' },
]

export default function GroupAnalytics() {
    // Get product data from useProduct hook
    const groupAnalyticsProduct = useProduct({ handle: 'group_analytics' }) as any
    const sectionsRef = useRef<HTMLDivElement>(null)

    // Get billing data from GraphQL
    const {
        allProductData: {
            nodes: [{ products: billingProducts }],
        },
    } = useStaticQuery(allProductsData)

    // Find the group analytics addon in billing products
    const productAddons = billingProducts.flatMap((product: any) => product.addons || [])
    const groupAnalyticsAddon = productAddons.find(
        (addon: any) =>
            addon.name === 'Group Analytics' ||
            addon.type === 'group_analytics' ||
            addon.name?.toLowerCase().includes('group') ||
            addon.type?.toLowerCase().includes('group')
    )

    if (!groupAnalyticsProduct) {
        return <div>Product not found</div>
    }

    const { overview, features, Icon, color } = groupAnalyticsProduct
    const productData = { ...groupAnalyticsProduct, productMenu }
    const menuTabs = buildProductMenuTabs({ productData, contentRef: sectionsRef, activeSurface: 'product' })
    const plan = groupAnalyticsAddon?.plans?.[groupAnalyticsAddon.plans.length - 1]
    const freeAllocation = plan?.tiers?.find((tier: any) => tier.unit_amount_usd === '0')?.up_to

    return (
        <>
            <SEO
                title={overview?.title || 'Group Analytics'}
                description={overview?.description || 'Analyze multi-seat accounts and other groups'}
                image="/images/og/default.png"
            />
            <ReaderView
                title={overview?.title || 'Group Analytics'}
                hideTitle
                proseSize="lg"
                showQuestions={false}
                menuTabs={menuTabs}
                productSelect={<ProductSwitcher activeHandle={groupAnalyticsProduct.handle} />}
            >
                <div ref={sectionsRef} className="space-y-8">
                    <section id="overview" className="scroll-mt-20">
                        {Icon && (
                            <div className={`size-8 my-4 text-${color}`}>
                                <Icon />
                            </div>
                        )}
                        <h1 className="">{overview?.title}</h1>
                        <div className="border-l-4 border-primary pl-4 mt-4">
                            Group Analytics is an <strong>add-on</strong> that enables you to analyze multi-seat
                            accounts and other groups.
                        </div>
                        <p className="">{overview?.description}</p>
                    </section>

                    {features && features.length > 0 && (
                        <section id="use-cases" className="scroll-mt-20">
                            <h2>Example use cases</h2>
                            <div className="space-y-6">
                                {features.map((feature: any, index: number) => (
                                    <div key={index}>
                                        <h3 className="text-xl font-semibold mb-2">
                                            {feature.headline || feature.title}
                                        </h3>
                                        <div
                                            className="[&>p]:mb-0"
                                            dangerouslySetInnerHTML={{ __html: feature.description }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <section id="pricing" className="scroll-mt-20">
                        <h2>Pricing</h2>
                        {groupAnalyticsAddon && (
                            <>
                                <div className="flex flex-col space-y-2">
                                    {plan?.flat_rate ? (
                                        <div className="flex items-baseline">
                                            <strong className="text-xl">
                                                ${plan.unit_amount_usd.replace('.00', '')}
                                            </strong>
                                            <span className="text-sm opacity-60 ml-1">/mo</span>
                                        </div>
                                    ) : (
                                        <div>
                                            <span className="text-sm opacity-70">Pricing starts at </span>
                                            <strong>
                                                $
                                                {
                                                    plan?.tiers?.find((tier: any) => tier.unit_amount_usd !== '0')
                                                        ?.unit_amount_usd
                                                }
                                            </strong>
                                            <span className="text-sm opacity-70">/{groupAnalyticsAddon.unit}</span>
                                        </div>
                                    )}

                                    {freeAllocation && (
                                        <p className="text-green text-sm font-medium">
                                            First{' '}
                                            <strong className="text-green">{freeAllocation?.toLocaleString()}</strong>{' '}
                                            {groupAnalyticsAddon.unit}s/mo free
                                        </p>
                                    )}
                                </div>

                                {!plan?.flat_rate && groupAnalyticsAddon.plans && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Pricing breakdown</h3>
                                        <div className="max-w-[400px] divide-y divide-primary">
                                            <PricingTiers
                                                plans={groupAnalyticsAddon.plans}
                                                type={groupAnalyticsAddon.type}
                                                unit={groupAnalyticsAddon.unit}
                                            />
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </section>
                    {groupAnalyticsAddon && (
                        <section id="getting-started" className="scroll-mt-20">
                            <h2>Get started</h2>
                            <p>Subscribe to add-ons after signing up.</p>
                        </section>
                    )}
                </div>
            </ReaderView>
        </>
    )
}

export const query = graphql`
    {
        mdx(fields: { slug: { eq: "/group-analytics" } }) {
            body
            frontmatter {
                title
            }
        }
    }
`
