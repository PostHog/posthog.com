import React from 'react'

import { HedgehogCursorHog, HedgehogReading, HedgehogRoboHog } from '@posthog/brand/hoggies'
import { IconArrowRight, IconBook, IconCopy, IconPlay, IconTerminal } from '@posthog/icons'

import Card from 'components/Card'
import { SingleCodeBlock } from 'components/CodeBlock'
import OSButton from 'components/OSButton'
import { IconClaudeCode, IconOpenAI } from 'components/OSIcons'
import { useToast } from '../../context/Toast'
import type { LearnLandingProps } from './LearnPage'

const AGENT_TEACHING_PROMPT = `Teach me PostHog Product Analytics using my own product and PostHog project.

Inspect its existing PostHog instrumentation, then create a custom learning path based on its real events, properties, funnels, and gaps. Teach one concept at a time and give me small, safe exercises.

Use the PostHog Product Analytics docs at https://posthog.com/docs/product-analytics.md as the source of truth.

Don’t change the project unless I explicitly ask. If you can’t access the project, tell me what context you need.`

const chatGPTPromptUrl = (prompt: string): string => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`
const claudePromptUrl = (prompt: string): string => `claude://claude.ai/new?q=${encodeURIComponent(prompt)}`

/** Product Analytics-only landing. Keeping the artwork here avoids loading it on every Learn page. */
export default function ProductAnalyticsLearnLanding({
    productName,
    description,
    pocketGuideUrl,
    interactiveLearningUrl,
}: LearnLandingProps): JSX.Element {
    const { addToast } = useToast()

    const copyPrompt = (description: string) => {
        navigator.clipboard?.writeText(AGENT_TEACHING_PROMPT)
        addToast({ description })
    }

    return (
        <section className="mx-auto flex w-full max-w-6xl flex-col pb-8 @xl/reader-content:pb-12">
            <div className="max-w-2xl">
                <h1 className="m-0 text-3xl font-bold tracking-tight @xl/reader-content:text-4xl">
                    Learn {productName}
                </h1>
                <p className="mb-0 mt-3 text-base text-secondary @xl/reader-content:text-lg">
                    Choose your path: follow a story, explore in a playground, or have your agent teach you.
                </p>
            </div>

            <div className="not-prose mt-8 grid gap-6 @xl/reader-content:grid-cols-2">
                <Card
                    hoverEffect={false}
                    className="flex h-full flex-col border border-primary bg-primary text-primary no-underline dark:border-dark dark:bg-accent-dark @2xl/reader-content:flex-row"
                >
                    <div
                        key="preview"
                        className="flex h-40 shrink-0 items-center justify-center border-b border-primary bg-accent p-4 dark:border-dark dark:bg-accent-dark @xl/reader-content:h-28 @2xl/reader-content:h-auto @2xl/reader-content:min-h-56 @2xl/reader-content:w-36 @2xl/reader-content:border-b-0 @2xl/reader-content:border-r @5xl/reader-content:w-44"
                    >
                        <HedgehogReading
                            aria-hidden="true"
                            className="h-auto w-28 max-h-full max-w-full @2xl/reader-content:w-32 @5xl/reader-content:w-36"
                        />
                    </div>
                    <div key="content" className="flex min-w-0 flex-1 flex-col p-5">
                        <div className="flex items-start gap-2 @2xl/reader-content:min-h-14">
                            <IconBook className="mt-1 size-5 shrink-0 text-blue" />
                            <h2 className="m-0 text-xl font-bold">Learn through a story</h2>
                        </div>
                        <p className="mb-5 mt-2 pl-7 text-base text-secondary">{description}</p>
                        <div className="mt-auto pl-7">
                            <OSButton
                                asLink
                                to={pocketGuideUrl}
                                variant="primary"
                                size="md"
                                icon={<IconArrowRight />}
                                iconPosition="right"
                            >
                                Start reading
                            </OSButton>
                        </div>
                    </div>
                </Card>

                <Card
                    hoverEffect={false}
                    className="flex h-full flex-col border border-primary bg-primary text-primary no-underline dark:border-dark dark:bg-accent-dark @2xl/reader-content:flex-row"
                >
                    <div
                        key="preview"
                        className="flex h-40 shrink-0 items-center justify-center border-b border-primary bg-accent p-4 dark:border-dark dark:bg-accent-dark @xl/reader-content:h-28 @2xl/reader-content:h-auto @2xl/reader-content:min-h-56 @2xl/reader-content:w-36 @2xl/reader-content:border-b-0 @2xl/reader-content:border-r @5xl/reader-content:w-44"
                    >
                        <HedgehogCursorHog
                            aria-hidden="true"
                            className="h-auto w-28 max-h-full max-w-full @2xl/reader-content:w-32 @5xl/reader-content:w-36 [&>path:first-child]:hidden"
                        />
                    </div>
                    <div key="content" className="flex min-w-0 flex-1 flex-col p-5">
                        <div className="flex items-start gap-2 @2xl/reader-content:min-h-14">
                            <IconPlay className="mt-1 size-5 shrink-0 text-orange" />
                            <h2 className="m-0 text-xl font-bold">Learn by doing</h2>
                        </div>
                        <p className="mb-5 mt-2 pl-7 text-base text-secondary">
                            Explore a product, inspect its PostHog instrumentation, and test and break things.
                        </p>
                        <div className="mt-auto pl-7">
                            <OSButton asLink to={interactiveLearningUrl} external variant="primary" size="md">
                                Explore Twig
                            </OSButton>
                        </div>
                    </div>
                </Card>

                <Card
                    hoverEffect={false}
                    className="flex h-full flex-col border border-primary bg-primary text-primary no-underline dark:border-dark dark:bg-accent-dark @xl/reader-content:col-span-2"
                >
                    <div key="intro" id="agent-teacher" className="flex flex-col @xl/reader-content:flex-row">
                        <div className="flex h-48 shrink-0 items-center justify-center border-b border-primary bg-accent p-4 dark:border-dark dark:bg-accent-dark @xl/reader-content:h-auto @xl/reader-content:min-h-56 @xl/reader-content:w-36 @xl/reader-content:border-b-0 @xl/reader-content:border-r @5xl/reader-content:w-44">
                            <HedgehogRoboHog
                                aria-hidden="true"
                                className="h-auto w-28 max-h-full max-w-full @2xl/reader-content:w-32 @5xl/reader-content:w-36"
                            />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col justify-center p-5">
                            <div className="flex items-center gap-2">
                                <IconTerminal className="size-5 shrink-0 text-purple" />
                                <h2 className="m-0 text-xl font-bold">Have your agent teach you</h2>
                            </div>
                            <p className="mb-0 mt-2 pl-7 text-base text-secondary">
                                Create a custom Product Analytics guide using your own product and PostHog project.
                            </p>
                        </div>
                    </div>
                    <div key="prompt" className="border-t border-primary p-5 dark:border-dark">
                        <div className="[&_.code-block]:m-0 [&_.min-w-fit]:min-w-0 [&_.whitespace-pre]:whitespace-pre-wrap [&_.whitespace-pre]:break-words">
                            <SingleCodeBlock language="text" label="Agent prompt" showLabel showCopy showAskAI={false}>
                                {AGENT_TEACHING_PROMPT}
                            </SingleCodeBlock>
                        </div>
                        <div className="mt-5 flex flex-wrap items-center gap-2">
                            <OSButton
                                type="button"
                                variant="primary"
                                size="md"
                                icon={<IconCopy />}
                                onClick={() => copyPrompt('Prompt copied to clipboard')}
                            >
                                Copy prompt
                            </OSButton>
                            <OSButton
                                type="button"
                                variant="secondary"
                                size="md"
                                icon={<IconClaudeCode className="[&_path]:!fill-current" />}
                                onClick={() => window.location.assign(claudePromptUrl(AGENT_TEACHING_PROMPT))}
                            >
                                Open in Claude Desktop
                            </OSButton>
                            <OSButton
                                type="button"
                                variant="secondary"
                                size="md"
                                icon={<IconOpenAI />}
                                onClick={() => {
                                    window.open(
                                        chatGPTPromptUrl(AGENT_TEACHING_PROMPT),
                                        '_blank',
                                        'noopener,noreferrer'
                                    )
                                }}
                            >
                                Open in ChatGPT
                            </OSButton>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
