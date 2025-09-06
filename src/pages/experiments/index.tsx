import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { createSlideConfig, SlidesTemplate } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import { Accordion } from 'components/RadixUI/Accordion'

// Product configuration - change this to adapt for different products
const PRODUCT_HANDLE = 'experiments'

// Statistical methods data
const statisticalMethods = [
    {
        id: 'bayesian',
        name: 'Bayesian',
        subtitle: "Popular with tech companies, check results anytime",
        color: 'purple',
        bulletColor: 'purple',
        whatItTells: [
            {
                term: 'Win probability',
                description: 'Direct probability that variant A beats B'
            },
            {
                term: 'Credible intervals',
                description: 'Range where true value lies with 95% probability'
            }
        ],
        advantages: [
            'Check results anytime without statistical penalties',
            'Get direct probability statements about which variant wins',
            'Make confident decisions earlier with accumulating evidence',
            'Intuitive interpretation: "Variant A has 85% chance of being better"'
        ],
        bestFor: [
            'Continuous monitoring and optimization',
            'Teams wanting flexible experiment duration',
            'Modern experimentation practices'
        ],
        supportedMetrics: [
            'Funnel metrics (conversion rates)',
            'Count-based trends (event totals)',
            'Value-based trends (revenue, time)'
        ]
    },
    {
        id: 'frequentist',
        name: 'Frequentist',
        subtitle: 'Classical academic approach, fixed analysis',
        color: 'blue',
        bulletColor: 'blue',
        whatItTells: [
            {
                term: 'P-value',
                description: 'Probability of seeing these results if no real difference exists'
            },
            {
                term: 'Confidence intervals',
                description: 'Range of plausible values for true effect'
            }
        ],
        advantages: [
            'Widely understood by academic and data science communities',
            'Matches industry-standard A/B testing tools',
            'Simpler method with fewer parametric assumptions',
            "Uses robust Welch's t-test for unequal variances"
        ],
        bestFor: [
            'Teams familiar with p-values and confidence intervals',
            'Matching internal data science standards',
            'Academic research and publication'
        ],
        supportedMetrics: [
            'Funnel metrics (conversion rates)',
            'Mean metrics (revenue, session duration)',
            'Includes outlier handling for mean metrics'
        ]
    }
]

const mobileTriggerClasses = 'flex items-center gap-2 px-4 py-2 text-2xl font-bold'
const mobileCellClasses = 'py-2 px-4 grid gap-4'

const legendClasses = 'text-center flex-shrink-0 px-4 border-x border-b border-primary py-2 bg-accent font-bold'
const cellClasses = 'py-2 border-b border-primary px-4'

// Custom statistical methods comparison slide
const StatisticalMethodsSlide = () => {
    return (
        <div
            data-scheme="primary"
            className="flex flex-col pt-12 @2xl:pt-0 @2xl:justify-center h-full bg-primary text-primary px-8"
        >
            <div className="max-w-7xl w-full mx-auto">
                <div className="text-center mb-6">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Bayesian vs. Frequentist</h2>
                    <p className="text-xl text-secondary">Whether you're scrappy or super smart, we've got a statistical method for you.</p>
                </div>

                {/* Mobile layout: Interactive accordion comparison (portrait 9:16) */}
                <div className="@2xl:hidden">
                    {/* Method headers */}
                    <div className="grid divide-y divide-primary">
                        <div className="text-center py-8">
                            <h3 className="text-3xl font-bold text-purple mb-2">Bayesian</h3>
                            <p className="text-xl text-secondary">{statisticalMethods[0].subtitle}</p>
                        </div>
                        <div className="text-center py-8">
                            <h3 className="text-3xl font-bold text-blue mb-2">Frequentist</h3>
                            <p className="text-xl text-secondary">{statisticalMethods[1].subtitle}</p>
                        </div>
                    </div>

                    {/* Accordion comparison */}
                    <Accordion
                        items={[
                            {
                                value: 'what-it-tells-you',
                                trigger: (
                                    <div className={mobileTriggerClasses}>
                                        What it tells you
                                    </div>
                                ),
                                content: (
                                    <div className={mobileCellClasses}>
                                        <div>
                                            <h4 className="text-2xl font-semibold text-purple mb-3">Bayesian</h4>
                                            <ul className="space-y-2 text-2xl">
                                                {statisticalMethods[0].whatItTells.map((item, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <span className="text-purple mr-2">•</span>
                                                        <span><strong>{item.term}:</strong> {item.description}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-semibold text-blue mb-3">Frequentist</h4>
                                            <ul className="space-y-2 text-2xl">
                                                {statisticalMethods[1].whatItTells.map((item, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <span className="text-blue mr-2">•</span>
                                                        <span><strong>{item.term}:</strong> {item.description}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )
                            },
                            {
                                value: 'key-advantages',
                                trigger: (
                                    <div className={mobileTriggerClasses}>
                                        Key advantages
                                    </div>
                                ),
                                content: (
                                    <div className={mobileCellClasses}>
                                        <div>
                                            <h4 className="text-2xl font-semibold text-purple mb-3">Bayesian</h4>
                                            <ul className="space-y-2 text-2xl">
                                                {statisticalMethods[0].advantages.map((advantage, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <span className="text-green mr-2">✓</span>
                                                        <span>{advantage}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-semibold text-blue mb-3">Frequentist</h4>
                                            <ul className="space-y-2 text-2xl">
                                                {statisticalMethods[1].advantages.map((advantage, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <span className="text-green mr-2">✓</span>
                                                        <span>{advantage}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )
                            },
                            {
                                value: 'best-for',
                                trigger: (
                                    <div className={mobileTriggerClasses}>
                                        Best for
                                    </div>
                                ),
                                content: (
                                    <div className={mobileCellClasses}>
                                        <div>
                                            <h4 className="text-2xl font-semibold text-purple mb-3">Bayesian</h4>
                                            <ul className="space-y-2 text-2xl">
                                                {statisticalMethods[0].bestFor.map((item, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <span className="text-purple mr-2">•</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-semibold text-blue mb-3">Frequentist</h4>
                                            <ul className="space-y-2 text-2xl">
                                                {statisticalMethods[1].bestFor.map((item, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <span className="text-blue mr-2">•</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )
                            },
                            {
                                value: 'supported-metrics',
                                trigger: (
                                    <div className={mobileTriggerClasses}>
                                        Supported metrics
                                    </div>
                                ),
                                content: (
                                    <div className={mobileCellClasses}>
                                        <div>
                                            <h4 className="text-2xl font-semibold text-purple mb-3">Bayesian</h4>
                                            <ul className="space-y-2 text-2xl">
                                                {statisticalMethods[0].supportedMetrics.map((metric, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <span className="text-purple mr-2">•</span>
                                                        <span>{metric}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-semibold text-blue mb-3">Frequentist</h4>
                                            <ul className="space-y-2 text-2xl">
                                                {statisticalMethods[1].supportedMetrics.map((metric, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <span className="text-blue mr-2">•</span>
                                                        <span>{metric}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )
                            }
                        ]}
                        defaultValue="what-it-tells-you"
                        className="bg-accent"
                    />
                </div>

                {/* Desktop landscape layout: 3 columns (landscape 16:9) */}
                <div className="hidden @2xl:block">
                    <div className="grid grid-cols-[1fr_auto_1fr]">
                        {/* Headers */}
                        <div className="text-center border-b border-primary">
                            <h3 className="text-3xl font-bold text-purple mb-2">Bayesian</h3>
                            <p className="text-base text-secondary">Popular with tech companies, check results anytime</p>
                        </div>
                        <div className="border-b border-primary">&nbsp;</div>
                        <div className="text-center border-b border-primary">
                            <h3 className="text-3xl font-bold text-blue mb-2">Frequentist</h3>
                            <p className="text-base text-secondary">Classical academic approach, fixed analysis</p>
                        </div>

                        {/* What it tells you */}
                        <div className={cellClasses}>
                            <ul className="space-y-1">
                                {statisticalMethods[0].whatItTells.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-purple mr-2">•</span>
                                        <span><strong>{item.term}:</strong> {item.description}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={legendClasses}>
                            What it tells you
                        </div>
                        <div className={cellClasses}>
                            <ul className="space-y-1">
                                {statisticalMethods[1].whatItTells.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-blue mr-2">•</span>
                                        <span><strong>{item.term}:</strong> {item.description}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Key advantages */}
                        <div className={cellClasses}>
                            <ul className="space-y-1">
                                {statisticalMethods[0].advantages.map((advantage, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-green mr-2">✓</span>
                                        <span>{advantage}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={legendClasses}>
                            Key advantages
                        </div>
                        <div className={cellClasses}>
                            <ul className="space-y-1">
                                {statisticalMethods[1].advantages.map((advantage, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-green mr-2">✓</span>
                                        <span>{advantage}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Best for */}
                        <div className={cellClasses}>
                            <ul className="space-y-1">
                                {statisticalMethods[0].bestFor.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-purple mr-2">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={legendClasses}>
                            Best for
                        </div>
                        <div className={cellClasses}>
                            <ul className="space-y-1">
                                {statisticalMethods[1].bestFor.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-blue mr-2">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Supported metrics */}
                        <div className={`${cellClasses} border-b-0`}>
                            <ul className="space-y-1">
                                {statisticalMethods[0].supportedMetrics.map((metric, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-purple mr-2">•</span>
                                        <span>{metric}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={`${legendClasses} border-b-0`}>
                            Supported metrics
                        </div>
                        <div className={`${cellClasses} border-b-0`}>
                            <ul className="space-y-1">
                                {statisticalMethods[1].supportedMetrics.map((metric, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-blue mr-2">•</span>
                                        <span>{metric}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Custom pricing component for web analytics
const CustomPricingSlide = () => {
    return (
        <div
            data-scheme="primary"
            className="flex flex-col pt-12 @2xl:pt-0 @2xl:justify-center items-center h-full bg-primary text-primary px-8"
        >
            <div className="max-w-4xl w-full text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Usage-based pricing</h2>

                <div className="bg-accent border border-primary rounded p-8 text-left max-w-3xl mx-auto">
                    <p className="text-lg mb-6">
                        Experiments is currently bundled with{' '}
                        <Link to="/feature-flags" className="underline font-medium" state={{ newWindow: true }}>
                            Feature Flags
                        </Link>{' '}
                        and shares volume limits.
                    </p>

                    <ul className="space-y-4 mb-6 text-lg">
                        <li className="flex items-start">
                            <span className="text-red mr-2">•</span>
                            <div>
                                <strong>First 1 million requests every month:</strong> Free (get access to both
                                products)
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red mr-2">•</span>
                            <div>
                                <strong>After 1 million requests/mo:</strong> Usage is billed through Feature Flags
                                requests. Get access to Experiments at no additional cost.
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default function Experiments(): JSX.Element {
    // Get content data from multiple directories
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

    // Optional: Customize slides
    // See /components/Products/Slides/README.md for more details
    const slides = createSlideConfig({
        exclude: ['answers'],
        custom: [
            {
                slug: 'statistical-methods',
                name: 'Statistical methods',
                component: StatisticalMethodsSlide,
            }
        ],
        order: ['overview', 'customers', 'features', 'statistical-methods', 'pricing', 'comparison-summary', 'feature-comparison', 'docs', 'pairs-with', 'getting-started'],
        templates: {
            overview: 'stacked', // Use the horizontal split layout
        },
    })

    // Override the pricing slide with our custom component
    const pricingSlideIndex = slides.slides.findIndex((slide) => slide.slug === 'pricing')
    if (pricingSlideIndex !== -1) {
        slides.slides[pricingSlideIndex] = {
            ...slides.slides[pricingSlideIndex],
            component: CustomPricingSlide,
        }
    }

    // Merge content data with product data
    const mergedData = {
        ...data,
        ...contentData,
    }

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={mergedData} slideConfig={slides} />
}
