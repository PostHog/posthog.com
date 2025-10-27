import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { createSlideConfig, SlidesTemplate } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import { useRoadmaps } from 'hooks/useRoadmaps'
import Markdown from 'components/Squeak/components/Markdown'
import { IconCheck, IconLightBulb } from '@posthog/icons'
import Cards from 'components/Cards'
import { PostHogAIExampleCards } from 'components/Cards/data'
import ScrollArea from 'components/RadixUI/ScrollArea'

const PRODUCT_HANDLE = 'posthog_ai'

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

const CustomManifestoSlide = () => {
    return (
        <div
            data-scheme="primary"
            className="flex flex-col p-12 justify-start @2xl:justify-center items-center h-full bg-primary text-primary"
        >
            <h2 className="text-4xl font-bold mb-8">Manifesto</h2>
            <p>
                <Link to="/ai" state={{ newWindow: true }}>
                    PostHog AI
                </Link>{' '}
                is our product assistant that helps you build context, assemble insights, find areas for product
                improvement, and even create pull requests after writing code (alpha).
            </p>

            <p>PostHog AI is free to use during beta. (After that, we may charge a nominal flat monthly fee.)</p>

            <h2>Why don’t I just ask ChatGPT instead?</h2>

            <p>
                PostHog AI has a nuanced understanding of your customers - it has access to errors, replays, event data,
                and everything in your data warehouse. You can ask ChatGPT questions based on data from one product at a
                time, but that’s like trying to understand a painting when you can only see the color blue - you may get
                a rough idea, but it’s hardly the Mona Lisa.
            </p>

            <h2>More than chatting with your data...</h2>

            <p>
                PostHog AI can read and write. He can find, watch sessions, explain and summarize replays for you. He
                can create insights, write and edit SQL, conduct multi-step deep research, and more. The goal is to
                generate a rich understanding of your customers’ broad range of data.
            </p>

            <h2>Product autonomy</h2>

            <p>
                The goal long term is to help every developer to ship a product autonomously. There are many steps to
                get there, many of which we are still to take, but we believe the technology today exists to make very
                meaningful progress.
            </p>

            <p>
                Right now, you can meaningfully detect issues and understand user behavior to inform what you ship. As
                we give PostHog AI access to more tools, he’ll get smarter, more accurate, and more intelligent.
            </p>

            <p>
                Very shortly you’ll be able to detect and generate PRs for fixing UX issues and errors, before you even
                wake up for the day. We’re working on the ability to generate ideas for what to work on, and to convert
                these into pull requests agentically. Stay tuned.
            </p>
        </div>
    )
}

const CustomRoadmapSlide = () => {
    const { roadmaps, isLoading } = useRoadmaps({
        params: {
            filters: {
                $or: [
                    {
                        teams: {
                            name: {
                                $eq: 'PostHog AI',
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
                <div className="text-2xl font-bold mb-4">PostHog AI is free during beta.</div>
                <p className="text-xl">
                    Eventually we'll charge usage-based pricing and will offer a generous monthly free tier, as we do
                    with all of our paid products.
                </p>
            </div>
        </div>
    )
}

const CustomDemoSlide = () => {
    return (
        <div
            data-scheme="primary"
            className="flex flex-col justify-start @2xl:justify-center items-center h-full bg-primary text-primary"
        >
            <h2 className="text-7xl @2xl:text-5xl pt-12 px-4">Chat with your data</h2>
            <p className="text-4xl @2xl:text-2xl pt-4 px-4 leading-normal text-center text-balance pb-16 @2xl:pb-0">
                Still building insights manually? Ew. Let PostHog AI help.
            </p>

            <ScrollArea className="min-h-0 w-full h-full @2xl:-mt-4">
                <Cards data={PostHogAIExampleCards} buttons={false} />
            </ScrollArea>

            <div className="flex gap-2 justify-center absolute bottom-4 left-0 right-0 scale-125 @2xl:scale-100">
                <IconLightBulb className="size-10 opacity-50" />
                <div className="flex flex-col text-xl">
                    <strong>Signed into PostHog?</strong>
                    <p>Click any question to get PostHog AI started.</p>
                </div>
            </div>
        </div>
    )
}

export default function PostHogAI(): JSX.Element {
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
        exclude: [
            'customers',
            'ai',
            'comparison-summary',
            'feature-comparison',
            'docs',
            'pairs-with',
            'posthog-on-posthog',
            'answers',
        ],
        custom: [
            {
                slug: 'roadmap',
                name: 'Roadmap',
                component: CustomRoadmapSlide,
            },
            {
                slug: 'demo',
                name: 'Demo',
                component: CustomDemoSlide,
            },
            // {
            //     slug: 'manifesto',
            //     name: 'AI manifesto',
            //     component: CustomManifestoSlide,
            // },
        ],
        order: ['overview', 'features', 'demo', 'roadmap', 'pricing', 'getting-started'],
        templates: {
            overview: 'max',
            features: 'ai',
            answers: 'demo',
        },
        content: {
            answersDescription: 'What can PostHog AI do?',
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
