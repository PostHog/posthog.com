import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { createSlideConfig, SlidesTemplate } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import { IconLightBulb } from '@posthog/icons'
import Cards from 'components/Cards'
import { PostHogAIExampleCards } from 'components/Cards/data'
import ScrollArea from 'components/RadixUI/ScrollArea'
import CustomRoadmapSlide from 'components/AI/CustomRoadmapSlide'
import CustomPersonasSlide from 'components/AI/CustomPersonasSlide'

const PRODUCT_HANDLE = 'posthog_ai'

interface ASCIIBoxProps {
    title: string
    lines: string[]
    width?: number
}

const ASCIIBox = ({ title, lines, width = 44 }: ASCIIBoxProps) => {
    const topBorder = '+' + '='.repeat(width) + '+'
    const bottomBorder = topBorder
    const paddedTitle = '|' + title.padStart(Math.floor((width + title.length) / 2)).padEnd(width) + '|'

    return (
        <>
            <div style={{ color: '#F1A82C' }}>{topBorder}</div>
            <div style={{ color: '#F1A82C' }}>{paddedTitle}</div>
            <div style={{ color: '#F1A82C' }}>{topBorder}</div>
            {lines.map((line, idx) => (
                <div key={idx} style={{ color: 'rgba(238, 239, 233, 0.9)' }}>
                    | {line.padEnd(width - 2)} |
                </div>
            ))}
            <div style={{ color: '#F1A82C' }}>{bottomBorder}</div>
        </>
    )
}

interface ASCIIBoxRowProps {
    children: React.ReactNode
}

const ASCIIBoxRow = ({ children }: ASCIIBoxRowProps) => {
    const childArray = React.Children.toArray(children)
    return (
        <div style={{ display: 'flex', gap: '1ch' }}>
            {childArray.map((child, idx) => (
                <div key={idx}>{child}</div>
            ))}
        </div>
    )
}

const ASCII_HEADER = `    Welcome to
███████╗  ██████╗  ███████╗ ████████╗ ██╗  ██╗  ██████╗   ██████╗      █████╗  ██╗
██╔══██║ ██╔═══██╗ ██╔════╝ ╚══██╔══╝ ██║  ██║ ██╔═══██╗ ██╔════╝     ██╔══██╗ ██║
██████╔╝ ██║   ██║ ███████╗    ██║    ███████║ ██║   ██║ ██║  ███╗    ███████║ ██║
██╔═══╝  ██║   ██║ ╚════██║    ██║    ██╔══██║ ██║   ██║ ██║   ██║    ██╔══██║ ██║
██║      ╚██████╔╝ ███████║    ██║    ██║  ██║ ╚██████╔╝ ╚██████╔╝    ██║  ██║ ██║
╚═╝       ╚═════╝  ╚══════╝    ╚═╝    ╚═╝  ╚═╝  ╚═════╝   ╚═════╝     ╚═╝  ╚═╝ ╚═╝
                 The product analyst agent.`

const CustomOverviewSlide = () => {
    return (
        <div
            data-scheme="primary"
            style={{
                backgroundColor: '#151515',
                color: 'rgba(238, 239, 233, 0.9)',
                fontFamily: 'Monaco, Menlo, "Courier New", monospace',
                fontSize: '13px',
                height: '100%',
                overflow: 'auto',
                padding: '20px',
                lineHeight: '1.4',
            }}
        >
            <ScrollArea className="h-full">
                <pre style={{ margin: 0, whiteSpace: 'pre', overflowX: 'auto' }}>
                    {ASCII_HEADER.split('\n').map((line, lineIdx) => {
                        // "Welcome to" line
                        if (line.includes('Welcome to')) {
                            return (
                                <div key={lineIdx} style={{ color: 'rgba(238, 239, 233, 0.7)' }}>
                                    {line}
                                </div>
                            )
                        }
                        // Large ASCII art header (lines with block characters)
                        if (
                            line.includes('█') ||
                            line.includes('╗') ||
                            line.includes('╔') ||
                            line.includes('║') ||
                            line.includes('═') ||
                            line.includes('╚') ||
                            line.includes('╝')
                        ) {
                            // Color mapping: P=Blue, O=Red, S=Yellow, T=Blue, H=Red, O=Yellow, G=Blue, A=White, I=White
                            const colors = [
                                '#1D4AFF',
                                '#F54E00',
                                '#F1A82C',
                                '#1D4AFF',
                                '#F54E00',
                                '#F1A82C',
                                '#1D4AFF',
                                '#EEEFE9',
                                '#EEEFE9',
                            ]
                            // Start column indexes for each letter based on ASCII positions
                            const letterStarts = [0, 9, 19, 28, 38, 47, 57, 70, 79] // P, O, S, T, H, O, G, A, I

                            return (
                                <div key={lineIdx} style={{ display: 'flex' }}>
                                    {line.split('').map((char, charIdx) => {
                                        // Find which letter this character belongs to
                                        let colorIdx = 0
                                        for (let i = letterStarts.length - 1; i >= 0; i--) {
                                            if (charIdx >= letterStarts[i]) {
                                                colorIdx = i
                                                break
                                            }
                                        }
                                        return (
                                            <span key={charIdx} style={{ color: colors[colorIdx] }}>
                                                {char}
                                            </span>
                                        )
                                    })}
                                </div>
                            )
                        }
                        // Description lines right after ASCII art
                        if (line.includes('Your product analyst')) {
                            return (
                                <div key={lineIdx} style={{ color: 'rgba(238, 239, 233, 0.8)' }}>
                                    {line}
                                </div>
                            )
                        }
                        return (
                            <div key={lineIdx} style={{ color: 'rgba(238, 239, 233, 0.9)' }}>
                                {line}
                            </div>
                        )
                    })}
                </pre>

                <pre style={{ margin: '20px 0 0 0', whiteSpace: 'pre', overflowX: 'auto' }}>
                    <ASCIIBoxRow>
                        <ASCIIBox
                            title="WHY NOT JUST ASK CHATGPT INSTEAD?"
                            lines={[
                                'PostHog AI is an agent with native access',
                                'to your product data:',
                                '',
                                '  • Events, persons, sessions, groups',
                                '  • Actions, cohorts, properties',
                                '  • Data warehouse schema',
                                '  • Session replays and errors',
                                '',
                                'It understands your data taxonomy and',
                                'reasons about complex queries.',
                            ]}
                        />
                        <ASCIIBox
                            title="MORE THAN CHATTING WITH YOUR DATA"
                            lines={[
                                'Not just a chatbot - PostHog AI gets',
                                'things done in PostHog for you:',
                                '',
                                '  • Create insights and dashboards',
                                '  • Write and edit PostHog SQL queries',
                                '  • Filter recordings or errors',
                                '  • Create feature flags and experiments',
                                '  • Add data pipeline functions with Hog',
                                '  • Start surveys',
                            ]}
                        />
                    </ASCIIBoxRow>

                    <ASCIIBoxRow>
                        <ASCIIBox
                            title="PRODUCT AUTONOMY"
                            width={84}
                            lines={[
                                'Goal: Help every developer ship a product autonomously.',
                                'Now: Analyze your data, answer product questions, and automate PostHog workflows.',
                                'Soon: Detect and generate PRs for fixing UX issues and errors before you wake up.',
                                'Generate ideas for what to work on and convert them into PRs.',
                            ]}
                        />
                    </ASCIIBoxRow>
                </pre>

                <div style={{ marginTop: '20px', color: 'rgba(238, 239, 233, 0.7)' }}>
                    <div>
                        GETTING STARTED: Open PostHog AI in your project and ask it to analyze data or build something
                    </div>
                    <div style={{ marginTop: '8px' }}>
                        EXAMPLES: "Show me users who churned" | "Create a funnel for signup" | "Make a survey"
                    </div>
                    <div style={{ marginTop: '8px' }}>
                        NEXT UP: See other slides → or{' '}
                        <Link to="https://app.posthog.com/ai" className="underline">
                            open PostHog AI now ↗
                        </Link>
                    </div>
                </div>
            </ScrollArea>
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
            'answers',
            'posthog-on-posthog',
        ],
        custom: [
            {
                slug: 'overview',
                name: 'Overview',
                component: CustomOverviewSlide,
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

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={mergedData} slideConfig={slides} />
}
