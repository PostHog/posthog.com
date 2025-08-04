import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { createSlideConfig, SlidesTemplate } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import Link from 'components/Link'
import { IconRewindPlay, IconToggle, IconTrends, IconUser } from '@posthog/icons'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

const PRODUCT_HANDLE = 'error_tracking'

export const Subfeature = ({
    title,
    description,
    className = '',
    icon,
    color,
}: {
    title: string
    description: string
    className?: string
    icon: React.ReactNode
    color: string
}): JSX.Element => {
    return (
        <li className={`bg-primary rounded p-4 sm:p-6 sm:pb-8  ${className}`}>
            {icon && (
                <span className={`inline-block w-10 h-10 mb-4 ${color ? 'text-' + color : 'opacity-50'}`}>{icon}</span>
            )}
            <h3 className="text-2xl mb-2">{title}</h3>
            <p className="text-lg" dangerouslySetInnerHTML={{ __html: description }} />
        </li>
    )
}

const subfeatures = [
    {
        title: 'Session replay',
        description:
            'Watch session recordings of users who caused exceptions for more context about how to reproduce an issue.',
        icon: <IconRewindPlay />,
        color: 'yellow',
    },
    {
        title: 'Product analytics',
        description:
            'Graph your <code>$exception</code> events, use filters and breakdowns to determine where errors happen and what to prioritize.',
        icon: <IconTrends />,
        color: 'blue',
    },
    {
        title: 'Feature flags',
        description: 'Test fixes by rolling out code changes only to affected users.',
        icon: <IconToggle />,
        color: 'seagreen',
    },
    {
        title: 'User profiles',
        description:
            'See all <code>$exception</code> events for specific users in their event history log and find which feature flags were enabled at the time an error occurred.',
        icon: <IconUser />,
        color: 'purple',
    },
]

// Custom ProductOS Benefits slide
const ProductOSBenefitsSlide = () => {
    return (
        <div
            data-scheme="primary"
            className="flex flex-col justify-center items-center h-full bg-primary text-primary px-8"
        >
            <h2 className="text-5xl text-center text-balance">
                All the features you'd expect, but{' '}
                <span className="text-red dark:text-yellow">10x better in the PostHog ecosystem</span>
            </h2>
            <p className="mt-4 text-xl text-center">
                Sure you can use error tracking solo, but it's better with other PostHog products.
            </p>

            <div className="mt-12">
                <ul
                    data-scheme="secondary"
                    className={`grid @lg:grid-cols-2 @2xl:grid-cols-4 gap-4 @2xl:gap-8 list-none p-0`}
                >
                    {subfeatures.map((subfeature, index) => (
                        <Subfeature key={index} {...subfeature} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default function ErrorTracking(): JSX.Element {
    const contentData = useContentData()
    const data = useStaticQuery(graphql`
        query {
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

    // Configure slides with custom ProductOS Benefits slide
    const slides = createSlideConfig({
        custom: [
            {
                slug: 'product-os-benefits',
                name: 'Product OS Benefits',
                component: ProductOSBenefitsSlide,
            },
        ],
        order: [
            'overview',
            'customers',
            'product-os-benefits',
            'features',
            'pricing',
            'answers',
            'comparison-summary',
            'feature-comparison',
            'docs',
            'pairs-with',
            'getting-started',
        ],
        templates: {
            overview: 'stacked', // Use the horizontal split layout
        },
        content: {
            answersDescription: 'Track and resolve errors and exceptions in your application',
        },
    })

    const mergedData = {
        ...data,
        ...contentData,
    }

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={mergedData} slideConfig={slides} />
}
