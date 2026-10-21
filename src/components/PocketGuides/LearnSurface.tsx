import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { graphql, useStaticQuery } from 'gatsby'
import { BookOpen } from 'lucide-react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import { useAppWindows } from '../../context/App'
import { useWindow } from '../../context/Window'

import { pocketGuideDestination, volumeById, type PocketGuideVolume } from '../../constants/pocketGuides'
import usePocketGuideCounts from '../../hooks/usePocketGuideCounts'
import Cover from './Cover'
import { openPocketGuide } from './bookOpening'
import { EntryProvider, bookMdxComponents } from './bookComponents'
import { useEntry } from './bookContext'
import { learnChapterPath, learnChapterSlug, normalizeUrl, useBookPages } from './bookModel'
import { isReaderWindowActive } from './learnTracking'

interface LearnBodyNode {
    body: string
    fields: { slug: string }
}

/** Every guide body by url; `useStaticQuery` takes no variables, so read the whole shelf. */
function useBookBodies(): Map<string, string> {
    const data = useStaticQuery(graphql`
        query PocketGuideLearnBodiesQuery {
            pages: allMdx(filter: { fields: { slug: { regex: "/^/learn/[^/]+/pocket-guide/" } } }) {
                nodes {
                    body
                    fields {
                        slug
                    }
                }
            }
        }
    `)
    return React.useMemo(() => {
        const map = new Map<string, string>()
        ;(data?.pages?.nodes ?? []).forEach((node: LearnBodyNode) => {
            if (node?.fields?.slug) {
                map.set(normalizeUrl(pocketGuideDestination(node.fields.slug)), node.body)
            }
        })
        return map
    }, [data])
}

interface IntroContextValue {
    coverVolume?: PocketGuideVolume
    firstChapterPath?: string
    count: number
    coverRef: React.RefObject<HTMLDivElement>
    chaptersList: React.ReactNode
}

const IntroContext = React.createContext<IntroContextValue | null>(null)

// Defined once, outside the render. New component functions on every render would remount the
// intro and reset the chapter list's scroll position.

/** `align="center"` lines the button up under a centered cover. */
function StartReading({ align }: { align?: 'center' }): JSX.Element | null {
    const intro = React.useContext(IntroContext)
    if (!intro?.coverVolume || !intro.firstChapterPath) return null
    return (
        <div className={`not-prose my-6 ${align === 'center' ? 'flex justify-center' : ''}`}>
            <OSButton asLink to={intro.firstChapterPath} variant="primary" size="md">
                Start reading <span aria-hidden="true">→</span>
            </OSButton>
        </div>
    )
}

function PocketGuideCover({ size = 'medium' }: { size?: 'small' | 'medium' }): JSX.Element | null {
    const intro = React.useContext(IntroContext)
    if (!intro?.coverVolume || !intro.firstChapterPath) return null
    return (
        <div
            ref={intro.coverRef}
            className={`not-prose mx-auto mb-6 w-full ${size === 'small' ? 'max-w-[180px]' : 'max-w-[210px]'}`}
        >
            <Cover
                volume={intro.coverVolume}
                count={intro.count}
                placement="product_docs"
                to={intro.firstChapterPath}
            />
        </div>
    )
}

/** Cover and Start reading on the left, the chapter list on the right; stacks when narrow. */
function CoverWithChapters({ size }: { size?: 'small' | 'medium' }): JSX.Element {
    const intro = React.useContext(IntroContext)
    return (
        <div className="not-prose my-6 grid gap-6 @lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <div className="[&>div:last-child]:mb-0">
                <PocketGuideCover size={size} />
                <StartReading align="center" />
            </div>
            {/* Out of flow when side by side, so the cover and button alone set the row height. */}
            <div className="relative">
                <div className="@lg:absolute @lg:inset-0">{intro?.chaptersList}</div>
            </div>
        </div>
    )
}

/**
 * A chapter's `#` heading, with "Chapter 01" above it in the intro eyebrow's style. The number sits
 * outside the h1, so the heading and the page title stay the chapter's own title.
 */
function ChapterHeading(props: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element {
    const chapter = useEntry()?.entry.page
    return (
        <>
            {chapter ? (
                <p className="not-prose m-0 mb-[7.5px] flex items-center gap-1.5 text-[15px] font-normal leading-[36px] text-primary">
                    <BookOpen className="size-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    Chapter {String(chapter).padStart(2, '0')}
                </p>
            ) : null}
            <h1 {...props} />
        </>
    )
}

const components = { ...bookMdxComponents, h1: ChapterHeading, StartReading, PocketGuideCover, CoverWithChapters }

interface LearnSurfaceProps {
    volumeId: string
    /** Empty or unknown falls back to the front matter. */
    chapter?: string
    /** This surface's route root, so in-page links stay in the Learn tab. */
    basePath: string
}

/** Count a chapter only after ten visible seconds and reaching its end. */
function ChapterEngagement({ volume, chapter }: { volume: string; chapter: string }): JSX.Element {
    const endRef = React.useRef<HTMLDivElement>(null)
    const { windows } = useAppWindows()
    const { appWindow } = useWindow()
    const readerIsActive = isReaderWindowActive(windows, appWindow?.key)
    const readerIsActiveRef = React.useRef(readerIsActive)
    React.useEffect(() => {
        readerIsActiveRef.current = readerIsActive
    }, [readerIsActive])

    React.useEffect(() => {
        const end = endRef.current
        if (!end || !window.IntersectionObserver) return

        let visibleSeconds = 0
        let reachedEnd = false
        let captured = false
        const captureIfEngaged = () => {
            const posthog = window.posthog
            if (
                captured ||
                !posthog ||
                document.visibilityState !== 'visible' ||
                !readerIsActiveRef.current ||
                visibleSeconds < 10 ||
                !reachedEnd
            )
                return
            posthog.capture('learn_chapter_engaged', {
                volume,
                chapter,
                threshold: '10_visible_seconds_and_end_reached',
            })
            captured = true
        }

        const scrollViewport = end.closest('[data-radix-scroll-area-viewport]') as HTMLElement | null
        const root = scrollViewport && scrollViewport.scrollHeight > scrollViewport.clientHeight ? scrollViewport : null
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    reachedEnd = true
                    captureIfEngaged()
                }
            },
            { root }
        )
        observer.observe(end)

        const timer = window.setInterval(() => {
            if (document.visibilityState === 'visible' && readerIsActiveRef.current) visibleSeconds += 1
            captureIfEngaged()
            if (captured) window.clearInterval(timer)
        }, 1000)

        return () => {
            observer.disconnect()
            window.clearInterval(timer)
        }
    }, [volume, chapter])

    return <div ref={endRef} className="h-px" aria-hidden="true" />
}

/** One chapter of a volume, rendered in the docs reader. */
export default function LearnSurface({ volumeId, chapter, basePath }: LearnSurfaceProps): JSX.Element | null {
    const pages = useBookPages(volumeId)
    const bodies = useBookBodies()
    const counts = usePocketGuideCounts()
    const coverRef = React.useRef<HTMLDivElement>(null)

    const entry = React.useMemo(() => {
        if (pages.length === 0) {
            return undefined
        }
        // A wrong url costs a click, not a dead end.
        return (chapter && pages.find((p) => learnChapterSlug(p) === chapter)) || pages[0]
    }, [pages, chapter])

    const body = entry && bodies.get(normalizeUrl(entry.url))
    if (!entry || !body) {
        return null
    }

    const coverVolume = entry.isFrontMatter ? volumeById(volumeId) : undefined
    const chapters = pages.filter((page) => !page.isFrontMatter)
    const firstChapter = chapters[0]
    const firstChapterPath = firstChapter ? learnChapterPath(basePath, firstChapter) : undefined
    const chapterPaths = new Set(chapters.map((page) => learnChapterPath(basePath, page)))
    // Any chapter link opens the book, then lands on that chapter.
    const openBook = (event: React.MouseEvent<HTMLDivElement>) => {
        const href = (event.target as Element).closest('a')?.getAttribute('href')?.replace(/\/$/, '')
        if (!href || !chapterPaths.has(href)) return
        const cover = coverRef.current?.querySelector<HTMLElement>('[data-pocket-guide-cover]') ?? null
        void openPocketGuide(event, cover, href)
    }

    const chaptersList =
        coverVolume && chapters.length > 0 ? (
            <nav
                aria-label={`${coverVolume.title} pocket guide chapters`}
                className="not-prose flex h-full flex-col rounded-sm border border-primary/70 bg-primary p-4 @sm:p-5"
            >
                <h2 className="mb-3 text-xl font-bold text-primary">Chapters</h2>
                {/* Beside the cover the box is capped at the cover's height, so a long list scrolls. */}
                <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto overscroll-contain">
                    <ol className="m-0 list-none p-0">
                        {chapters.map((page, index) => (
                            <li key={page.url}>
                                <Link
                                    to={learnChapterPath(basePath, page)}
                                    className="group flex items-baseline gap-2 py-1.5 text-base font-normal text-secondary no-underline transition-colors hover:text-primary"
                                >
                                    <span className="min-w-0 underline-offset-4 group-hover:underline">
                                        {page.shortTitle}
                                    </span>
                                    <span
                                        aria-hidden="true"
                                        className="min-w-4 flex-1 border-b-2 border-dotted border-current opacity-40"
                                    />
                                    <span aria-hidden="true" className="shrink-0 text-sm tabular-nums opacity-70">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ol>
                </div>
            </nav>
        ) : null
    // A body that places the chapters next to its cover skips the list after the body.
    const chaptersInline = body.includes('CoverWithChapters')

    const intro: IntroContextValue = {
        coverVolume,
        firstChapterPath,
        count: counts[volumeId] ?? 0,
        coverRef,
        chaptersList,
    }

    return (
        // ReaderView supplies the docs prose styles and padding for this surface.
        // Introductions end on the setup wizard; the padding keeps it off the window's bottom edge.
        <div
            className={`@container [&>div]:!p-0 ${entry.isFrontMatter ? 'pb-12' : ''}`}
            onClickCapture={entry.isFrontMatter ? openBook : undefined}
        >
            <EntryProvider value={{ entry, pages, basePath }}>
                <IntroContext.Provider value={intro}>
                    <MDXProvider components={components}>
                        <MDXRenderer>{body}</MDXRenderer>
                    </MDXProvider>
                </IntroContext.Provider>
            </EntryProvider>
            {!chaptersInline && chaptersList && <div className="mt-8">{chaptersList}</div>}
            <ChapterEngagement
                key={entry.url}
                volume={volumeId}
                chapter={entry.isFrontMatter ? 'introduction' : learnChapterSlug(entry)}
            />
        </div>
    )
}
