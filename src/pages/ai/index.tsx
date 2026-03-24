import React, { useEffect, useState } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { createSlideConfig, SlidesTemplate } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import { IconLightBulb, IconMegaphone, IconTerminal } from '@posthog/icons'
import Cards from 'components/Cards'
import { PostHogAIExampleCards } from 'components/Cards/data'
import ScrollArea from 'components/RadixUI/ScrollArea'
import CustomRoadmapSlide from 'components/AI/CustomRoadmapSlide'
import CustomPersonasSlide from 'components/AI/CustomPersonasSlide'
import CustomCapabilitiesSlide from 'components/AI/CustomCapabilitiesSlide'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import ASCIISlide from 'components/AI/ASCIISlide'
import Tooltip from 'components/RadixUI/Tooltip'
import { useWindow } from '../../context/Window'
import TerminalView from 'components/AI/TerminalView'
import usePostHog from 'hooks/usePostHog'
import Demos from 'components/Home/Test'
const PRODUCT_HANDLE = 'posthog_ai'

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
                <Cards data={PostHogAIExampleCards} />
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
    const posthog = usePostHog()
    const { view, setHasDeveloperMode, setView } = useWindow()
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
                slug: 'demos',
                name: 'Demos',
                component: Demos,
            },
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
                slug: 'try-it',
                name: 'Try it',
                component: CustomDemoSlide,
            },
            {
                slug: 'capabilities',
                name: 'Advanced modes',
                component: CustomCapabilitiesSlide,
            },
            // {
            //     slug: 'manifesto',
            //     name: 'AI manifesto',
            //     component: CustomManifestoSlide,
            // },
        ],
        order: [
            'overview',
            'features',
            'demos',
            'try-it',
            'capabilities',
            'videos',
            'you',
            'roadmap',
            'pricing',
            'getting-started',
        ],
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

    useEffect(() => {
        setHasDeveloperMode(true)
        const mode = posthog?.getFeatureFlag?.('mode-selection-test')
        setView(mode === 'developer' ? 'developer' : 'marketing')
    }, [])

    return view === 'developer' ? (
        <TerminalView />
    ) : (
        <SlidesTemplate productHandle={PRODUCT_HANDLE} data={mergedData} slideConfig={slides} />
    )
}
