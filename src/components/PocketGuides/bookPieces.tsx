import React from 'react'

import Link from 'components/Link'
import EnableScout from 'components/SelfDrivingInbox/EnableScout'
import { productSource } from 'components/SelfDrivingInbox/sources'

import { useEntry, useTemplate } from './bookContext'
import { BookPageEntry } from './bookModel'

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

/** One page's row: a link, a dotted leader, and its folio number. */
function ContentsRow({ page }: { page: BookPageEntry }): JSX.Element {
    return (
        <li className="flex items-baseline gap-2">
            <Link to={page.url} className="min-w-0 text-[1em] text-primary hover:underline">
                {page.title}
            </Link>
            {/* The dotted leader, so the row reads as a ToC line. */}
            <span aria-hidden="true" className="min-w-6 flex-1 border-b border-dotted border-primary opacity-50" />
            <span className="shrink-0 text-[0.9em] tabular-nums text-secondary">
                {String(page.page).padStart(2, '0')}
            </span>
        </li>
    )
}

/**
 * The contents list, built from the book itself. Groups into named sections when pages declare
 * a `section` in frontmatter (consecutive by reading order); a book where no page does prints
 * the same single flat list as before.
 */
export function Contents(): JSX.Element | null {
    const book = useEntry()
    if (!book) {
        return null
    }
    const pages = book.pages.filter((page) => !page.isFrontMatter)

    if (pages.every((page) => !page.section)) {
        return (
            <ul className="m-0 list-none space-y-3 p-0">
                {pages.map((page) => (
                    <ContentsRow key={page.url} page={page} />
                ))}
            </ul>
        )
    }

    // Group consecutive pages sharing a section – reading order already sorted them.
    const groups: { section?: string; pages: BookPageEntry[] }[] = []
    for (const page of pages) {
        const current = groups[groups.length - 1]
        if (current && current.section === page.section) {
            current.pages.push(page)
        } else {
            groups.push({ section: page.section, pages: [page] })
        }
    }

    return (
        <div className="space-y-6">
            {groups.map((group, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={group.section ?? i}>
                    {group.section && (
                        <p className="m-0 mb-2 text-[0.8em] font-bold uppercase tracking-wide text-secondary">
                            {group.section}
                        </p>
                    )}
                    <ul className="m-0 list-none space-y-3 p-0">
                        {group.pages.map((page) => (
                            <ContentsRow key={page.url} page={page} />
                        ))}
                    </ul>
                </div>
            ))}
        </div>
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
    ul: (props: any) => (
        <ul className="mb-[0.8em] mt-0 list-disc space-y-1 pl-5 text-[1em] text-secondary" {...props} />
    ),
    ol: (props: any) => (
        <ol className="mb-[0.8em] mt-0 list-decimal space-y-1 pl-5 text-[1em] text-secondary" {...props} />
    ),
    li: (props: any) => <li className="leading-relaxed" {...props} />,
    strong: (props: any) => <strong className="font-bold text-primary" {...props} />,
    inlineCode: (props: any) => (
        <code
            className="rounded border border-primary bg-accent px-1 py-0.5 text-[0.85em] dark:bg-accent-dark"
            {...props}
        />
    ),
    a: ({ href, ...props }: any) => <Link to={href} state={{ newWindow: true }} className="underline" {...props} />,
    hr: () => <span aria-hidden="true" className="my-6 block w-16 border-t border-primary" />,
    // A worked-example table inside a <Fig> – illustrative rows, not live data.
    table: (props: any) => <table className="w-full border-collapse text-left text-[0.85em]" {...props} />,
    thead: (props: any) => <thead className="border-b border-primary" {...props} />,
    th: (props: any) => (
        <th
            className="py-1.5 pr-3 text-[0.85em] font-bold uppercase tracking-wide text-secondary last:pr-0"
            {...props}
        />
    ),
    td: (props: any) => <td className="border-b border-primary/30 py-1.5 pr-3 text-primary last:pr-0" {...props} />,
}
