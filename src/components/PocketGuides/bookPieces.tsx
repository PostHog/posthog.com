import React from 'react'

import usePostHog from '../../hooks/usePostHog'

import Link from 'components/Link'
import { SingleCodeBlock } from 'components/CodeBlock'
import { InlineCode } from 'components/InlineCode'
import EnableScout from 'components/SelfDrivingInbox/EnableScout'
import { productSource } from 'components/SelfDrivingInbox/sources'

import { useEntry, useTemplate } from './bookContext'
import { learnChapterPath, normalizeUrl, volumeIdFromUrl } from './bookModel'
import { volumeArt } from './volumeArt'

/** Inline cue to a figure, color only – bold read larger than the surrounding text. */
export function SeeFig({ n }: { n: number }): JSX.Element {
    return <span className="whitespace-nowrap text-orange">Fig.&nbsp;{n}</span>
}

/** Introductory text uses the same prose styling as docs. */
export function Eyebrow({ children }: { children: React.ReactNode }): JSX.Element {
    return <p>{children}</p>
}

/** The volume's specimen drawing, on the pages that open a book. */
export function Frontispiece(): JSX.Element | null {
    const Art = volumeArt(volumeIdFromUrl(useEntry()?.entry.url ?? ''))
    if (!Art) {
        return null
    }
    return (
        <div aria-hidden="true" className="mb-[1.2em] mt-[2em] flex justify-center @lg:justify-start">
            {/* Em-based cap: the specimen scales with the reader's Aa control like everything else. */}
            <Art className="h-auto w-full max-w-[14em]" />
        </div>
    )
}

/** The signal sources this scout reads, from the use case's `watches` frontmatter. */
export function Watches(): JSX.Element | null {
    const watches = useTemplate()?.watches
    if (!watches || watches.length === 0) {
        return null
    }
    return (
        <ul className="mb-[0.8em] mt-0 list-none space-y-3 p-0">
            {watches.map((source) => {
                const { Icon, token, docs } = productSource(source.name)
                return (
                    <li key={source.name} className="flex items-start gap-2">
                        <Icon className={`mt-0.5 size-5 shrink-0 text-${token}`} aria-hidden="true" />
                        <div>
                            <p className="m-0 text-[1em] font-bold text-primary">
                                {docs ? (
                                    <Link to={docs} state={{ newWindow: true }} className="underline">
                                        {source.name}
                                    </Link>
                                ) : (
                                    source.name
                                )}
                            </p>
                            <p className="m-0 text-[1em] leading-snug text-secondary">{source.detail}</p>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

/** The one-click CTA. The book's only real button – nothing else should compete with it. */
export function Enable(): JSX.Element | null {
    const template = useTemplate()
    if (!template) {
        return null
    }
    return <EnableScout scout={template.scout} requires={template.requires} templateTitle={template.templateTitle} />
}

/** A print footnote: short rule, small type, at the foot of the text column. */
export function SeeAlso({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        // Bottom margin keeps the rule off the folio border.
        <aside className="mb-2 mt-12 text-[0.85em] leading-relaxed text-secondary [&_a]:underline [&_p]:m-0">
            <span aria-hidden="true" className="mb-2.5 block w-24 border-t border-primary" />
            {children}
        </aside>
    )
}

/** A prose link, counted like a CTA – some chapters answer with a link, not a button. */
function BookLink({ href, ...props }: any): JSX.Element {
    const posthog = usePostHog()
    const book = useEntry()
    const entry = book?.entry

    // A link to another chapter of this book: inside the Learn tab it turns the page there,
    // rather than sending the reader out to the standalone reader in a new window.
    const basePath = book?.basePath
    const chapter = basePath ? book?.pages.find((page) => page.url === normalizeUrl(href ?? '')) : undefined
    const chapterPath = basePath && chapter ? learnChapterPath(basePath, chapter) : undefined

    const trackLinkClick = () =>
        posthog?.capture('pocket_guide_interaction', {
            kind: 'guide_link_click',
            href,
            guide: entry?.url,
            placement: 'prose',
        })

    return chapterPath ? (
        <Link to={chapterPath} className="underline" onClick={trackLinkClick} {...props} />
    ) : (
        <Link to={href} state={{ newWindow: true }} className="underline" onClick={trackLinkClick} {...props} />
    )
}

/** The parent reader supplies docs prose styles; only book-specific behavior is mapped here. */
export const proseComponents = {
    // Fenced code. MDX v1 sends the block through `code` and inline spans through `inlineCode`.
    pre: ({ children }: any) => <>{children}</>,
    code: ({ className, children }: any) => (
        <div className="my-[0.8em] [&_.min-w-fit]:min-w-0 [&_.whitespace-pre]:whitespace-pre-wrap [&_.whitespace-pre]:break-words">
            <SingleCodeBlock
                language={String(className ?? '').replace('language-', '') || 'text'}
                showCopy
                showAskAI={false}
            >
                {String(children).replace(/\n$/, '')}
            </SingleCodeBlock>
        </div>
    ),
    inlineCode: InlineCode,
    a: (props: any) => <BookLink {...props} />,
}
