import React from 'react'
import { HedgehogCursorHog, HedgehogEinstein } from '@posthog/brand/hoggies'
import { Logo } from '@posthog/brand/logo'
import '@posthog/twig-components/lab.css'
import { IconBook, IconPlay, IconTerminal } from '@posthog/icons'
import { SingleCodeBlock } from 'components/CodeBlock'
import OSButton from 'components/OSButton'
import { IconClaudeCode, LogomarkCodex } from 'components/OSIcons'
import { TWIG_URL } from '../../constants'
import { volumeById } from '../../constants/pocketGuides'
import usePocketGuideCounts from '../../hooks/usePocketGuideCounts'
import Cover from './Cover'
import type { LearnLandingProps } from './LearnPage'

const AGENT_TEACHING_PROMPT = `Teach me PostHog Product Analytics using my own product and PostHog project.

Inspect its existing PostHog instrumentation, then create a custom learning path based on its real events, properties, funnels, and gaps. Teach one concept at a time and give me small, safe exercises.

Use the PostHog Product Analytics docs at https://posthog.com/docs/product-analytics.md as the source of truth.

Don’t change the project unless I explicitly ask. If you can’t access the project, tell me what context you need.`

const codexPromptUrl = (prompt: string): string => `codex://new?prompt=${encodeURIComponent(prompt)}`
const claudeCodePromptUrl = (prompt: string): string => `claude-cli://open?q=${encodeURIComponent(prompt)}`

/** A home for three learning experiences; the story uses the existing book reader. */
export default function ProductAnalyticsLearnLanding({ productName, pocketGuideUrl }: LearnLandingProps): JSX.Element {
    const volume = volumeById('product-analytics')
    const counts = usePocketGuideCounts()

    return (
        <div className="not-prose mx-auto max-w-5xl pb-8 text-primary">
            <section
                id="overview"
                className="grid scroll-mt-20 items-center gap-4 @lg/reader-content:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] @2xl/reader-content:gap-8"
            >
                <div>
                    <p className="mb-3 mt-0 text-sm font-semibold text-secondary">PostHog Learn</p>
                    <h1 className="m-0 text-3xl font-bold @xl/reader-content:text-4xl">{productName}</h1>
                    <p className="mb-0 mt-5 text-lg leading-relaxed">
                        Learn what to track, what your data means, and how to answer questions about your product.
                    </p>
                </div>
                <div
                    className="relative isolate mx-auto w-56 max-w-full @lg/reader-content:w-full @lg/reader-content:max-w-[320px]"
                    aria-hidden="true"
                >
                    <div className="pointer-events-none absolute inset-8 -z-10 rounded-full bg-blue/10 blur-2xl" />
                    <HedgehogEinstein className="h-auto w-full drop-shadow-lg" />
                </div>
            </section>

            <section
                id="agent-teacher"
                className="mt-8 scroll-mt-20 border-t border-primary pt-6 @2xl/reader-content:mt-10 @2xl/reader-content:pt-8"
            >
                <div className="mb-5 flex items-start gap-3">
                    <IconTerminal className="mt-1 size-6 shrink-0 text-purple" />
                    <h2 className="m-0 text-2xl font-bold">Have your agent teach you</h2>
                </div>
                <div className="grid items-start gap-6 @2xl/reader-content:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
                    <div>
                        <p className="mt-0 mb-3 text-lg font-semibold leading-relaxed">
                            Learn with examples from your own product and data.
                        </p>
                        <p className="m-0 leading-relaxed text-secondary">
                            Open your coding agent in your project and send this prompt. It will use your existing data
                            to teach one concept at a time, with small exercises you can try.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-3">
                            <OSButton
                                type="button"
                                variant="primary"
                                size="md"
                                icon={<IconClaudeCode className="[&_path]:!fill-current" />}
                                onClick={() => window.location.assign(claudeCodePromptUrl(AGENT_TEACHING_PROMPT))}
                            >
                                Open in Claude Code
                            </OSButton>
                            <OSButton
                                type="button"
                                variant="primary"
                                size="md"
                                icon={<LogomarkCodex className="[&_path]:!fill-current" />}
                                onClick={() => window.location.assign(codexPromptUrl(AGENT_TEACHING_PROMPT))}
                            >
                                Open in Codex
                            </OSButton>
                        </div>
                    </div>
                    <div className="min-w-0 [&_.min-w-fit]:min-w-0 [&_.whitespace-pre]:whitespace-pre-wrap [&_.whitespace-pre]:break-words">
                        <SingleCodeBlock
                            language="text"
                            label={<></>}
                            showLabel
                            showCopy
                            showLineNumbers={false}
                            showAskAI={false}
                        >
                            {AGENT_TEACHING_PROMPT}
                        </SingleCodeBlock>
                    </div>
                </div>
            </section>

            <section
                id="learn-through-story"
                className="mt-8 scroll-mt-20 border-t border-primary pt-6 @2xl/reader-content:mt-10 @2xl/reader-content:pt-8"
            >
                <div className="grid items-start gap-6 @lg/reader-content:grid-cols-2 @2xl/reader-content:gap-8">
                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <IconBook className="size-6 shrink-0 text-blue" />
                            <h2 className="m-0 text-2xl font-bold">Learn through a story</h2>
                        </div>
                        <p className="mt-0 mb-3 text-lg font-semibold leading-relaxed">
                            Follow engineers as they build a product.
                        </p>
                        <p className="mt-0 mb-5 leading-relaxed text-secondary">
                            Follow their journey from shipping features to discovering how people use them. See how they
                            decide what to track and use that data to answer questions about their product.
                        </p>
                        <OSButton asLink to={pocketGuideUrl} variant="primary" size="md">
                            Start reading
                        </OSButton>
                    </div>
                    {volume && (
                        <div className="relative isolate mx-auto w-full max-w-[210px] @2xl/reader-content:max-w-[230px]">
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-blue/10 blur-2xl"
                            />
                            <Cover
                                volume={volume}
                                count={counts[volume.id] ?? 0}
                                placement="product_docs"
                                to={pocketGuideUrl}
                            />
                        </div>
                    )}
                </div>
            </section>

            <section
                id="learn-by-doing"
                className="mt-8 scroll-mt-20 border-t border-primary pt-6 @2xl/reader-content:mt-10 @2xl/reader-content:pt-8"
            >
                <div className="grid items-start gap-6 @lg/reader-content:grid-cols-2 @2xl/reader-content:gap-8">
                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <IconPlay className="size-6 shrink-0 text-orange" />
                            <h2 className="m-0 text-2xl font-bold">Learn by doing</h2>
                        </div>
                        <h3 className="mt-0 mb-3 text-lg font-semibold leading-relaxed">
                            Explore a fully instrumented product.
                        </h3>
                        <p className="mt-0 mb-5 leading-relaxed text-secondary">
                            Twig is a working product with PostHog already instrumented in it. Click around and see the
                            data your actions create, then use its embedded Playground to tinker.
                        </p>
                        <OSButton asLink to={TWIG_URL} external hideExternalIcon variant="primary" size="md">
                            Explore Twig
                        </OSButton>
                    </div>
                    <figure
                        className="vac-app relative isolate m-0 w-full max-w-[360px] justify-self-center pb-12 pr-6"
                        role="img"
                        aria-label="PostHog Playground preview: stay_filter_selected with destination_type set to Coast, with Cursor Hog in front."
                    >
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-6 -z-10 rounded-full bg-blue/10 blur-2xl"
                        />
                        <div className="vac-developer-theme overflow-hidden border shadow-lg" aria-hidden="true">
                            <div className="vac-dock-header border-b">
                                <h3 className="!m-0 flex items-center gap-2 !text-base">
                                    <Logo layout="logomark" size={20} />
                                    PostHog Playground
                                </h3>
                            </div>
                            <div className="p-5 pb-12">
                                <div className="vac-lab-output">
                                    <h4 className="m-0 text-sm">Event #1</h4>
                                    <span className="vac-inspect-name font-code">stay_filter_selected</span>
                                    <dl className="m-0 border-t border-primary pt-3">
                                        <dt className="font-code text-xs">destination_type</dt>
                                        <dd className="ml-0 mt-2 font-code text-base">&quot;Coast&quot;</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <HedgehogCursorHog
                            className="pointer-events-none absolute bottom-0 right-0 h-auto w-36 [&_path[d='M0_0h1000v1000H0z']]:hidden @2xl/reader-content:w-40"
                            aria-hidden="true"
                        />
                    </figure>
                </div>
            </section>
        </div>
    )
}
