import React, { useState } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { createSlideConfig, SlidesTemplate } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import { IconLightBulb, IconMegaphone, IconTerminal } from '@posthog/icons'
import Cards from 'components/Cards'
import { PostHogAIExampleCards } from 'components/Cards/data'
import ScrollArea from 'components/RadixUI/ScrollArea'
import CustomRoadmapSlide from 'components/AI/CustomRoadmapSlide'
import CustomPersonasSlide from 'components/AI/CustomPersonasSlide'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import ASCIISlide from 'components/AI/ASCIISlide'
import Tooltip from 'components/RadixUI/Tooltip'
import { useWindow } from '../../context/Window'
import TerminalView from 'components/AI/TerminalView'
const PRODUCT_HANDLE = 'posthog_ai'

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
    const { view } = useWindow()
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
            'answers',
            'posthog-on-posthog',
        ],
        custom: [
            {
                slug: 'roadmap',
                name: 'Roadmap',
                component: CustomRoadmapSlide,
            },
            {
                slug: 'you',
                name: 'PostHog AI for you',
                component: CustomPersonasSlide,
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
        order: ['overview', 'features', 'demo', 'videos', 'you', 'roadmap', 'pricing', 'getting-started'],
        templates: {
            overview: 'max',
            features: 'ai',
            answers: 'demo',
        },
        content: {
            answersDescription: 'What can PostHog AI do?',
        },
    })

    const mergedData = {
        ...data,
        ...contentData,
    }

    return view === 'developer' ? (
        <TerminalView />
    ) : (
        <SlidesTemplate productHandle={PRODUCT_HANDLE} data={mergedData} slideConfig={slides} />
    )
}
