import React from 'react'
import { HedgehogEinstein, HedgehogRobot } from '@posthog/brand/hoggies'
import { IconBook, IconPlay, IconTerminal } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { PRODUCT_SURFACE_H1 } from 'components/Products/ReaderViewProduct'
import { TWIG_URL } from '../../constants'
import { volumeById } from '../../constants/pocketGuides'
import usePocketGuideCounts from '../../hooks/usePocketGuideCounts'
import Cover from './Cover'
import { openPocketGuide } from './bookOpening'
import { learnChapterPath, useBookPages } from './bookModel'
import TwigBrowseFigure from './TwigBrowseFigure'
import type { LearnLandingProps } from './LearnPage'

/** Short agent preview for the Learn overview. */
function AgentTeachingPreview(): JSX.Element {
    return (
        <div className="not-prose grid min-w-0 items-center gap-6 @lg/reader-content:grid-cols-2">
            <div>
                <div className="mb-5 flex items-start gap-3">
                    <IconTerminal className="mt-1 size-6 shrink-0 text-purple" />
                    <h2 className="m-0 text-2xl font-bold">Learn with your agent</h2>
                </div>
                <p className="mt-0 mb-3 text-lg font-semibold leading-relaxed">
                    Learn with examples from your own product and data.
                </p>
                <p className="m-0 leading-relaxed text-secondary">
                    Have your coding agent build a learning path from your existing instrumentation and data.
                </p>
                <div className="mt-5">
                    <OSButton asLink to="/learn/product-analytics/agent-prompts-and-mcp" variant="primary" size="md">
                        Browse prompts
                    </OSButton>
                </div>
            </div>
            <div className="mx-auto w-full max-w-[220px]" aria-hidden="true">
                <HedgehogRobot className="h-auto w-full" />
            </div>
        </div>
    )
}

/** Short Twig preview for the Learn overview. */
function LearnByDoingPreview(): JSX.Element {
    return (
        <div className="not-prose grid min-w-0 items-start gap-6 @2xl/reader-content:grid-cols-2 @2xl/reader-content:gap-8">
            <div>
                <div className="mb-5 flex items-center gap-3">
                    <IconPlay className="size-6 shrink-0 text-orange" />
                    <h2 className="m-0 text-2xl font-bold">Learn by doing</h2>
                </div>
                <h3 className="mt-0 mb-3 text-lg font-semibold leading-relaxed">
                    Explore a fully instrumented product.
                </h3>
                <p className="mt-0 mb-5 leading-relaxed text-secondary">
                    Twig is a real website with a live playground for learning PostHog and exploring real code.
                </p>
                <OSButton asLink to={TWIG_URL} external hideExternalIcon variant="primary" size="md">
                    Explore Twig
                </OSButton>
            </div>
            <div className="min-w-0">
                <TwigBrowseFigure id="overview-twig-preview" />
                <p className="mt-2 mb-0 text-sm text-secondary">Try the destination filters to explore Twig’s stays.</p>
            </div>
        </div>
    )
}

/** A home for three learning experiences; the story continues in embedded Learn chapters. */
export default function ProductAnalyticsLearnLanding({ productName, storyUrl }: LearnLandingProps): JSX.Element {
    const volume = volumeById('product-analytics')
    const counts = usePocketGuideCounts()
    const coverRef = React.useRef<HTMLDivElement>(null)
    const firstChapter = useBookPages('product-analytics').find((page) => !page.isFrontMatter)
    const readUrl = firstChapter ? learnChapterPath(storyUrl, firstChapter) : storyUrl
    // Start reading skips the introduction and opens the book on the first chapter.
    const startReading = (event: React.MouseEvent) => {
        const cover = coverRef.current?.querySelector<HTMLElement>('[data-pocket-guide-cover]') ?? null
        void openPocketGuide(event, cover, readUrl)
    }

    return (
        <div className="not-prose mx-auto max-w-5xl pb-8 text-primary">
            <section
                id="overview"
                className="grid scroll-mt-20 items-center gap-4 @lg/reader-content:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] @2xl/reader-content:gap-8"
            >
                <div>
                    <h1 className={`m-0 ${PRODUCT_SURFACE_H1}`}>{productName}</h1>
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
                            Read how engineers decide what to track and use that data to answer questions about their
                            product.
                        </p>
                        <OSButton asLink to={readUrl} onClick={startReading} variant="primary" size="md">
                            Start reading
                        </OSButton>
                    </div>
                    {volume && (
                        <div
                            ref={coverRef}
                            className="relative isolate mx-auto w-full max-w-[160px] @2xl/reader-content:max-w-[180px]"
                        >
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-blue/10 blur-2xl"
                            />
                            <Cover
                                volume={volume}
                                count={counts[volume.id] ?? 0}
                                placement="product_docs"
                                to={storyUrl}
                            />
                        </div>
                    )}
                </div>
            </section>

            <section
                id="agent-teacher"
                className="mt-8 scroll-mt-20 border-t border-primary pt-6 @2xl/reader-content:mt-10 @2xl/reader-content:pt-8"
            >
                <AgentTeachingPreview />
            </section>

            <section
                id="live-playground"
                className="mt-8 scroll-mt-20 border-t border-primary pt-6 @2xl/reader-content:mt-10 @2xl/reader-content:pt-8"
            >
                <LearnByDoingPreview />
            </section>
        </div>
    )
}
