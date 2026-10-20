import React from 'react'
import { HedgehogEinstein } from '@posthog/brand/hoggies'
import { IconBook } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { PRODUCT_SURFACE_H1 } from 'components/Products/ReaderViewProduct'
import { volumeById } from '../../constants/pocketGuides'
import usePocketGuideCounts from '../../hooks/usePocketGuideCounts'
import Cover from './Cover'
import { openPocketGuide } from './bookOpening'
import { learnChapterPath, useBookPages } from './bookModel'
import type { LearnLandingProps } from './LearnPage'

interface LearnLandingContent {
    /** Hero line under the product name. Defaults to the page description. */
    intro?: string
    /** Bold line in the story section. */
    storyLead?: string
    /** Story section text. Defaults to the volume's shelf description. */
    storyText?: string
    /** Extra hub sections, such as the agent and playground previews. */
    children?: React.ReactNode
}

/** A Learn hub overview: the product, then its pocket guide. Hubs add their own sections as children. */
export default function LearnLanding({
    productName,
    description,
    storyUrl,
    volumeId,
    intro = description,
    storyLead,
    storyText,
    children,
}: LearnLandingProps & LearnLandingContent): JSX.Element {
    const volume = volumeById(volumeId)
    const counts = usePocketGuideCounts()
    const coverRef = React.useRef<HTMLDivElement>(null)
    const firstChapter = useBookPages(volumeId).find((page) => !page.isFrontMatter)
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
                            />
                        </div>
                    )}
                </div>
            </section>

            {children}
        </div>
    )
}
