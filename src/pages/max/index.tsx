import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { createSlideConfig, SlidesTemplate } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import { useRoadmaps } from 'hooks/useRoadmaps'
import { useUser } from 'hooks/useUser'
import { VoteBox } from 'components/Roadmap'
import Markdown from 'components/Squeak/components/Markdown'
import { IconCheck } from '@posthog/icons'

const PRODUCT_HANDLE = 'max_ai'

interface RoadmapItem {
    id: string
    attributes: {
        title: string
        description: string
        projectedCompletion?: string
        complete?: boolean
        likes: {
            data: Array<{ id: string }>
        }
    }
}

const CustomRoadmapSlide = () => {
    const { user } = useUser()
    const { roadmaps, isLoading } = useRoadmaps({
        params: {
            filters: {
                $or: [
                    {
                        teams: {
                            name: {
                                $eq: 'Max AI',
                            },
                        },
                    },
                ],
            },
        },
    })

    if (isLoading) {
        return (
            <div data-scheme="primary" className="flex items-center justify-center h-full bg-primary">
                <div className="text-primary">Loading roadmap...</div>
            </div>
        )
    }

    const underConsideration = roadmaps.filter(
        (roadmap: RoadmapItem) => !roadmap.attributes.projectedCompletion && !roadmap.attributes.complete
    )
    const inProgress = roadmaps.filter(
        (roadmap: RoadmapItem) => roadmap.attributes.projectedCompletion && !roadmap.attributes.complete
    )
    const shipped = roadmaps.filter((roadmap: RoadmapItem) => roadmap.attributes.complete)

    return (
        <div data-scheme="primary" className="h-full bg-primary text-primary p-4 @md:p-8 overflow-auto">
            <h2 className="text-3xl @md:text-4xl font-bold mb-6 text-center">Roadmap</h2>

            <div className="grid @lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
                {/* Under Consideration */}
                <div className="border border-primary rounded overflow-hidden">
                    <h3 className="text-sm @md:text-base text-center bg-accent px-4 py-2 mb-0 font-semibold">
                        Under consideration
                    </h3>
                    <div className="divide-y divide-primary overflow-y-auto">
                        {underConsideration.slice(0, 3).map((roadmap: RoadmapItem) => (
                            <div key={roadmap.id} className="p-3">
                                <div className="flex gap-2">
                                    <div className="shrink-0">
                                        <div className="bg-[#F5E2B2] rounded px-2 py-1 text-xs font-semibold">
                                            {roadmap.attributes.likes.data.length}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold mb-1 leading-tight truncate">
                                            {roadmap.attributes.title}
                                        </h4>
                                        <div className="text-xs line-clamp-2">
                                            <Markdown>{roadmap.attributes.description}</Markdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* In Progress */}
                <div className="border border-primary rounded overflow-hidden">
                    <h3 className="text-sm @md:text-base text-center bg-orange text-white px-4 py-2 mb-0 font-semibold">
                        In progress
                    </h3>
                    <div className="divide-y divide-primary overflow-y-auto">
                        {inProgress.slice(0, 3).map((roadmap: RoadmapItem) => (
                            <div key={roadmap.id} className="p-3">
                                <div className="flex gap-2">
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold mb-1 leading-tight truncate">
                                            {roadmap.attributes.title}
                                        </h4>
                                        <div className="text-xs line-clamp-2">
                                            <Markdown>{roadmap.attributes.description}</Markdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Shipped */}
                <div className="border border-primary rounded overflow-hidden">
                    <h3 className="text-sm @md:text-base text-center bg-green px-4 py-2 mb-0 font-semibold text-white">
                        Shipped
                    </h3>
                    <div className="divide-y divide-primary overflow-y-auto">
                        {shipped.slice(0, 3).map((roadmap: RoadmapItem) => (
                            <div key={roadmap.id} className="p-3">
                                <div className="flex gap-2">
                                    <div className="shrink-0">
                                        <IconCheck className="w-4 h-4 text-green" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold mb-1 leading-tight">
                                            {roadmap.attributes.title}
                                        </h4>
                                        <div className="text-xs line-clamp-2">
                                            <Markdown>{roadmap.attributes.description}</Markdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="text-center mt-6">
                <p className="text-sm text-secondary">
                    Have opinions about what we should build next?{' '}
                    <Link to="/roadmap" className="text-primary underline" state={{ newWindow: true }}>
                        Vote on our roadmap.
                    </Link>
                </p>
            </div>
        </div>
    )
}

const CustomPricingSlide = () => {
    return (
        <div
            data-scheme="primary"
            className="flex flex-col p-12 justify-start @2xl:justify-center items-center h-full bg-primary text-primary"
        >
            <h2 className="text-4xl font-bold mb-8">Pricing</h2>

            <div className="bg-accent border border-primary max-w-xl mx-auto rounded p-8 text-center">
                <div className="text-2xl font-bold mb-4">Max is free during beta.</div>
                <p className="text-xl">
                    Eventually we may charge a nominal, flat monthly fee – we're thinking something like ~$15/mo.
                </p>
            </div>
        </div>
    )
}

export default function MaxAI(): JSX.Element {
    const contentData = useContentData()
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

    // Configure slides with custom ProductOS Benefits slide
    const slides = createSlideConfig({
        exclude: ['customers', 'features', 'ai', 'comparison-summary', 'feature-comparison', 'docs', 'pairs-with'],
        custom: [
            {
                slug: 'roadmap',
                name: 'Roadmap',
                component: CustomRoadmapSlide,
            },
        ],
        order: ['overview', 'roadmap', 'features', 'pricing', 'answers', 'getting-started'],
        templates: {
            overview: 'max',
            features: 'columns',
            answers: 'demo',
        },
        content: {
            answersDescription: 'What can Max do?',
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

    const mergedData = {
        ...data,
        ...contentData,
    }

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={mergedData} slideConfig={slides} />
}
