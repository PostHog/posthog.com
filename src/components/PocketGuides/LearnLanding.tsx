import React from 'react'
import { HedgehogEinstein, HedgehogRobot } from '@posthog/brand/hoggies'
import { IconBook, IconPlay, IconTerminal } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { PRODUCT_SURFACE_H1 } from 'components/Products/ReaderViewProduct'
import { TWIG_URL } from '../../constants'
import { volumeById } from '../../constants/pocketGuides'
import usePocketGuideCounts from '../../hooks/usePocketGuideCounts'
import usePostHog from '../../hooks/usePostHog'
import Cover from './Cover'
import { openPocketGuide } from './bookOpening'
import { learnChapterPath, useBookPages } from './bookModel'
import { handOffToTwig } from './learnTracking'
import type { LearnLandingProps } from './LearnPage'

/** Short agent preview for the Learn overview. */
function AgentTeachingPreview({ to, onSelect }: { to: string; onSelect: () => void }): JSX.Element {
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
                    <OSButton asLink to={to} onClick={onSelect} variant="primary" size="md">
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

interface LearnLandingPlayground {
    /** A Twig view for the preview. */
    figure: React.ReactNode
    caption?: string
}

/** Short Twig preview for the Learn overview. */
function LearnByDoingPreview({
    figure,
    caption,
    onExploreTwig,
}: LearnLandingPlayground & { onExploreTwig: (event: React.MouseEvent) => void }): JSX.Element {
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
                <OSButton
                    asLink
                    to={TWIG_URL}
                    external
                    hideExternalIcon
                    variant="primary"
                    size="md"
                    onClick={onExploreTwig}
                >
                    Explore Twig
                </OSButton>
            </div>
            <div className="min-w-0">
                {figure}
                {caption && <p className="mt-2 mb-0 text-sm text-secondary">{caption}</p>}
            </div>
        </div>
    )
}

interface LearnLandingContent {
    /** Hero line under the product name. Defaults to the page description. */
    intro?: string
    /** Bold line in the story section. */
    storyLead?: string
    /** Story section text. Defaults to the volume's shelf description. */
    storyText?: string
    /** Shows the Learn by doing preview, which links to Twig. */
    playground?: LearnLandingPlayground
}

/** A Learn hub overview: the product, its pocket guide, and the agent and Twig previews when the hub has them. */
export default function LearnLanding({
    productName,
    description,
    storyUrl,
    learnUrl,
    volumeId,
    intro = description,
    storyLead,
    storyText,
    playground,
}: LearnLandingProps & LearnLandingContent): JSX.Element {
    const volume = volumeById(volumeId)
    const counts = usePocketGuideCounts()
    const coverRef = React.useRef<HTMLDivElement>(null)
    const posthog = usePostHog()
    // Records the choice to open a resource, not what happens inside it.
    const selectResource = (resource: string, option: string) =>
        posthog?.capture('learn_resource_selected', { volume: volumeId, resource, option })
    const firstChapter = useBookPages(volumeId).find((page) => !page.isFrontMatter)
    const readUrl = firstChapter ? learnChapterPath(storyUrl, firstChapter) : storyUrl
    // Start reading skips the introduction and opens the book on the first chapter.
    const startReading = (event: React.MouseEvent) => {
        selectResource('story', 'start_reading')
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
                    <p className="mb-0 mt-5 text-lg leading-relaxed">{intro}</p>
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
                        {storyLead && <p className="mt-0 mb-3 text-lg font-semibold leading-relaxed">{storyLead}</p>}
                        <p className="mt-0 mb-5 leading-relaxed text-secondary">{storyText ?? volume?.description}</p>
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
                                to={readUrl}
                                onOpen={() => selectResource('story', 'cover')}
                            />
                        </div>
                    )}
                </div>
            </section>

            {volume?.learnHub?.pages?.includes('agent-prompts-and-mcp') && (
                <section
                    id="agent-teacher"
                    className="mt-8 scroll-mt-20 border-t border-primary pt-6 @2xl/reader-content:mt-10 @2xl/reader-content:pt-8"
                >
                    <AgentTeachingPreview
                        to={`${learnUrl}/agent-prompts-and-mcp`}
                        onSelect={() => selectResource('agent_teacher', 'browse_prompts')}
                    />
                </section>
            )}

            {playground && (
                <section
                    id="live-playground"
                    className="mt-8 scroll-mt-20 border-t border-primary pt-6 @2xl/reader-content:mt-10 @2xl/reader-content:pt-8"
                >
                    <LearnByDoingPreview
                        {...playground}
                        onExploreTwig={(event) => {
                            selectResource('twig', 'explore_twig')
                            // Read the live SDK: it may load after this page renders.
                            handOffToTwig(event, window.posthog, TWIG_URL, volumeId)
                        }}
                    />
                </section>
            )}
        </div>
    )
}
