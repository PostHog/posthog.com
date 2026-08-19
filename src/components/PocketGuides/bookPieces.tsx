import React from 'react'

import Link from 'components/Link'
import { SingleCodeBlock } from 'components/CodeBlock'
import EnableScout from 'components/SelfDrivingInbox/EnableScout'
import { productSource } from 'components/SelfDrivingInbox/sources'

import { useEntry, useTemplate } from './bookContext'

/** Inline cue to a figure, color only – bold read larger than the surrounding text. */
export function SeeFig({ n }: { n: number }): JSX.Element {
    return <span className="whitespace-nowrap text-orange">Fig.&nbsp;{n}</span>
}

/** The small line above a title page's heading. */
export function Eyebrow({ children }: { children: React.ReactNode }): JSX.Element {
    return <p className="mb-1 text-[0.8em] font-bold uppercase tracking-wide text-secondary">{children}</p>
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

/** The contents list, built from the book itself. */
export function Contents(): JSX.Element | null {
    const book = useEntry()
    if (!book) {
        return null
    }
    return (
        <ul className="m-0 list-none space-y-3 p-0">
            {book.pages
                .filter((page) => !page.isFrontMatter)
                .map((page) => (
                    <li key={page.url} className="flex items-baseline gap-2">
                        {/* min-w-0 rides the wrapper, not the <a>: Link puts its <a> inside a span, and
                            that span is the flex item. On the <a> a long title can't shrink and pushes
                            the row past the viewport. */}
                        <Link
                            to={page.url}
                            wrapperClassName="min-w-0"
                            className="text-[1em] text-primary hover:underline"
                        >
                            {page.title}
                        </Link>
                        {/* The dotted leader, so the row reads as a ToC line. */}
                        <span
                            aria-hidden="true"
                            className="min-w-6 flex-1 border-b border-dotted border-primary opacity-50"
                        />
                        <span className="shrink-0 text-[0.9em] tabular-nums text-secondary">
                            {String(page.page).padStart(2, '0')}
                        </span>
                    </li>
                ))}
        </ul>
    )
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

// Borrows .article-content, overriding its red 'unstyled' alarm color and its fixed font
// sizes – the book's type is em-based so the Aa control can scale everything together.
const NATIVE_CONTENT =
    'article-content !text-secondary [&_li]:![font-size:1em] [&_p]:![font-size:1em] [&_li]:!leading-relaxed [&_p]:!leading-relaxed [&_li]:![list-style-type:revert] [&_ul]:![list-style-type:revert] [&_ol]:![list-style-type:revert] [&_ul]:[padding-left:revert] [&_ol]:[padding-left:revert]'

/** Prose defaults. The page container is `not-prose`, so every tag is styled here. */
export const proseComponents = {
    // Em-based sizes AND margins: the reading-size control scales type and rhythm together.
    // Margins add rather than collapse – the page column is a flex column.
    h1: (props: any) => (
        <h1 className="mb-[0.5em] mt-0 text-[1.7em] font-bold leading-tight text-primary @4xl:text-[2em]" {...props} />
    ),
    // Numbered like steps via CSS counter, so authors never write the numbers by hand.
    h2: (props: any) => (
        <h2
            className="mb-[0.4em] mt-[1.2em] text-[0.8em] font-bold uppercase tracking-wide text-primary [counter-increment:book-section] before:mr-2 before:tabular-nums before:text-orange before:content-[counter(book-section,decimal-leading-zero)]"
            {...props}
        />
    ),
    h3: (props: any) => <h3 className="mb-[0.3em] mt-[0.65em] text-[1em] font-bold text-primary" {...props} />,
    p: (props: any) => <p className="mb-[0.8em] text-[1em] leading-relaxed text-secondary last:mb-0" {...props} />,
    // Lists and tables borrow the site's native docs styling (.article-content in global.css),
    // wrapped per element because the class also styles headings/paragraphs, which the book owns.
    ul: (props: any) => (
        <div className={NATIVE_CONTENT}>
            <ul {...props} />
        </div>
    ),
    ol: (props: any) => (
        <div className={NATIVE_CONTENT}>
            <ol {...props} />
        </div>
    ),
    // Cells get primary directly – the wrapper's secondary is for prose, and table text is data.
    table: (props: any) => (
        <div className={`${NATIVE_CONTENT} my-[0.8em] overflow-x-auto [&_td]:text-primary [&_th]:text-primary`}>
            <table {...props} />
        </div>
    ),
    strong: (props: any) => <strong className="font-bold text-primary" {...props} />,
    // Fenced code. MDX v1 sends the block through `code` and inline spans through `inlineCode`,
    // so `pre` only has to get out of the way – a div inside it would be invalid nesting.
    // Without this a fence renders unstyled and runs past the page column.
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
    // text-primary, not inherited: the chips sit on a tinted background inside secondary-colored
    // prose, and the small mono face can't afford the double contrast loss.
    inlineCode: (props: any) => (
        <code
            className="rounded border border-primary bg-accent px-1 py-0.5 text-[0.85em] text-primary dark:bg-accent-dark"
            {...props}
        />
    ),
    a: ({ href, ...props }: any) => <Link to={href} state={{ newWindow: true }} className="underline" {...props} />,
    hr: () => <span aria-hidden="true" className="my-6 block w-16 border-t border-primary" />,
}
