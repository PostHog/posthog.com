import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { SlidesTemplate, createSlideConfig } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import ScrollArea from 'components/RadixUI/ScrollArea'

const PRODUCT_HANDLE = 'workflows_emails'

const FeatureValue = ({ value }: { value: string | boolean | null }) => {
    if (value === null || value === undefined) {
        return null
    }
    if (typeof value === 'boolean') {
        return <span className={`text-2xl ${value ? 'text-green' : 'text-red'}`}>{value ? '✓' : '✗'}</span>
    }
    return <span className="text-primary">{value}</span>
}

const CustomPricingSlide = () => {
    const volumeDiscounts = [
        { range: 'First 10k /mo', price: 'Free', isFree: true },
        { range: '10k-50k', price: '$0.005', unit: '/message', isFree: false },
        { range: '50k-100k', price: '$0.003', unit: '/message', isFree: false },
        { range: '100k-1M', price: '$0.0015', unit: '/message', isFree: false },
        { range: '1M-10M', price: '$0.001', unit: '/message', isFree: false },
        { range: '10M+', price: '$0.0005', unit: '/message', isFree: false },
    ]

    const planFeatures = [
        {
            name: 'Messages (email, SMS, push, or CDP events)',
            freeValue: '10,000/mo',
            paidValue: 'Unlimited',
        },
        {
            name: 'Channels included',
            freeValue: 'Email, SMS, Push, CDP',
            paidValue: 'Email, SMS, Push, CDP',
        },
        { name: 'Volume discounts', freeValue: false, paidValue: true },
        { name: 'API & builder access', freeValue: true, paidValue: true },
        { name: 'Advanced triggers & logic', freeValue: true, paidValue: true },
        { name: 'Logs & metrics', freeValue: true, paidValue: true },
    ]

    return (
        <div className="h-full flex flex-col @2xl:flex-row text-primary">
            {/* Left side - Pricing */}
            <div className="p-12 bg-tan dark:bg-dark @2xl:w-2/5 flex flex-col justify-between border-b border-primary @2xl:border-b-0">
                <div>
                    <h2 className="text-4xl font-bold text-primary mb-6">Pricing</h2>

                    <div className="mb-8">
                        <p className="text-lg mb-1">Monthly free tier</p>
                        <p className="text-2xl mb-4">
                            <span className="font-bold text-green">10,000</span> per channel/mo
                        </p>

                        <p className="text-lg mb-1">Then starts at</p>
                        <p className="text-xl mb-0">
                            <span className="font-bold text-primary">$0.005</span>/message for Email
                        </p>
                        <p className="text-xl mb-0">
                            <span className="font-bold text-primary">$0.02</span>/message for SMS
                        </p>
                        <p className="text-xl mb-0">
                            <span className="font-bold text-primary">$0.0015</span>/message for Push
                        </p>
                        <p className="text-xl mb-4">
                            <span className="font-bold text-primary">$0.00075</span>/event for CDP destinations
                        </p>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-primary mb-4 border-b border-primary pb-2">
                        Volume discounts
                    </h3>
                    <div className="space-y-2 text-sm">
                        {volumeDiscounts.map((tier, index) => (
                            <div key={index} className="flex justify-between text-lg">
                                <span className="text-secondary">{tier.range}</span>
                                <span className={`${tier.isFree ? 'text-green font-bold' : 'text-primary'}`}>
                                    {tier.isFree ? (
                                        'Free'
                                    ) : (
                                        <>
                                            <strong>{tier.price}</strong>
                                            <span className="text-secondary">{tier.unit}</span>
                                        </>
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                    <p className="text-secondary text-sm mt-4 italic">
                        (Rates vary slightly by channel – SMS, Push, and CDP destinations follow similar discounts.)
                    </p>
                </div>
            </div>

            {/* Right side - Plans */}
            <div className="bg-primary @2xl:flex-1 border-l border-primary h-full">
                <ScrollArea className="min-h-0 h-full p-12">
                    <h2 className="text-4xl font-bold text-primary mb-12">Plans</h2>

                    {/* Comparison rows */}
                    <div className="grid grid-cols-3 gap-y-4 pb-4">
                        <div className="border-b border-primary"></div>
                        <div className="border-b border-primary">
                            <strong>Free</strong>
                            <p className="text-secondary">No credit card required*</p>
                        </div>
                        <div className="border-b border-primary">
                            <strong>Paid</strong>
                            <p className="text-secondary">Starts at $0/month</p>
                        </div>

                        {/* Plan features */}
                        {planFeatures.map((feature, index) => (
                            <React.Fragment key={index}>
                                <h4 className="text-lg font-semibold text-primary mb-0 pr-2 flex items-center">
                                    {feature.name}
                                </h4>
                                <div>
                                    <FeatureValue value={feature.freeValue} />
                                </div>
                                <div>
                                    <FeatureValue value={feature.paidValue} />
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

export default function Workflows(): JSX.Element {
    const contentData = useContentData()

    // Combined GraphQL query for both tutorial data and product data
    const data = useStaticQuery(graphql`
        query {
            allMdx(filter: { fields: { slug: { regex: "/^/tutorials/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    rawBody
                    frontmatter {
                        title
                        description
                    }
                }
            }
            allProductData {
                nodes {
                    products {
                        name
                        type
                        unit
                        addons {
                            name
                            type
                            unit
                            plans {
                                name
                                plan_key
                                included_if
                                features {
                                    key
                                    name
                                    description
                                    limit
                                    note
                                }
                            }
                        }
                        plans {
                            name
                            plan_key
                            free_allocation
                            included_if
                            features {
                                key
                                name
                                description
                                limit
                                note
                            }
                            tiers {
                                unit_amount_usd
                                up_to
                            }
                        }
                    }
                }
            }
        }
    `)

    // Merge content data with product data
    const mergedData = {
        ...data,
        ...contentData,
    }

    // Create slide configuration with custom templates
    const slides = createSlideConfig({
        templates: {
            overview: 'stacked',
        },
        exclude: ['answers', 'posthog-on-posthog'],
        content: {
            answersDescription: '',
            answersHeadline: '',
        },
        order: ['overview', 'features', 'comparison'],
        custom: [
            {
                slug: 'pricing',
                name: 'Pricing',
                component: CustomPricingSlide,
            },
        ],
    })

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={mergedData} slideConfig={slides} />
}
