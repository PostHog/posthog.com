import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { graphql, useStaticQuery } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import usePostHog from 'hooks/usePostHog'

import { EntryProvider, bookMdxComponents } from './bookComponents'
import { learnChapterSlug, normalizeUrl, useBookPages } from './bookModel'

interface LearnBodyNode {
    body: string
    fields: { slug: string }
}

/** Every guide body by url; `useStaticQuery` takes no variables, so read the whole shelf. */
function useBookBodies(): Map<string, string> {
    const data = useStaticQuery(graphql`
        query PocketGuideLearnBodiesQuery {
            pages: allMdx(filter: { fields: { slug: { regex: "/^/pocket-guides//" } } }) {
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
                map.set(normalizeUrl(node.fields.slug), node.body)
            }
        })
        return map
    }, [data])
}

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
    const posthog = usePostHog()

    React.useEffect(() => {
        const end = endRef.current
        if (!end || !window.IntersectionObserver) return

        let visibleSeconds = 0
        let reachedEnd = false
        let captured = false
        const captureIfEngaged = () => {
            if (captured || !posthog || visibleSeconds < 10 || !reachedEnd) return
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
            if (document.visibilityState === 'visible') visibleSeconds += 1
            captureIfEngaged()
            if (captured) window.clearInterval(timer)
        }, 1000)

        return () => {
            observer.disconnect()
            window.clearInterval(timer)
        }
    }, [volume, chapter, posthog])

    return <div ref={endRef} className="h-px" aria-hidden="true" />
}

/** One chapter of a volume, rendered in the docs reader. */
export default function LearnSurface({ volumeId, chapter, basePath }: LearnSurfaceProps): JSX.Element | null {
    const pages = useBookPages(volumeId)
    const bodies = useBookBodies()

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

    return (
        // ReaderView supplies the docs prose styles and padding for this surface.
        <div className="@container [&>div]:!p-0">
            <EntryProvider value={{ entry, pages, basePath }}>
                <MDXProvider components={bookMdxComponents}>
                    <MDXRenderer>{body}</MDXRenderer>
                </MDXProvider>
            </EntryProvider>
            <ChapterEngagement
                key={entry.url}
                volume={volumeId}
                chapter={entry.isFrontMatter ? 'introduction' : learnChapterSlug(entry)}
            />
        </div>
    )
}
