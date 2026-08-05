import React, { createContext, useContext } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import { IconCheckCircle, IconCompass, IconGraph, IconPullRequest } from '@posthog/icons'

import CustomSelfDrivingLoop from 'components/CustomSelfDrivingLoop'
import Link from 'components/Link'
import EnableScout from 'components/SelfDrivingInbox/EnableScout'
import ScoutFile from 'components/SelfDrivingInbox/ScoutFile'
import Term from 'components/SelfDrivingInbox/terms'
import { productSource } from 'components/SelfDrivingInbox/sources'
import { InboxTemplate } from 'components/SelfDrivingInbox/types'

import Divergence, { DivergenceSeries } from './Divergence'
import Figure from './Figure'
import FlagLedger, { FlagLedgerRow } from './FlagLedger'
import LeakFunnel, { LeakFunnelProps } from './LeakFunnel'
import InboxFigure from './InboxFigure'
import ReportAnatomy, { AnatomyHint } from './ReportAnatomy'
import ReportDetailAnatomy from './ReportDetailAnatomy'
import { BookPageEntry } from './bookModel'

/** The page's own data, so a figure can render this use case's report without prop drilling. */
interface BookEntry {
    entry: BookPageEntry
    pages: BookPageEntry[]
    /** Which way the reader turned to get here, so each page can flip on its own. */
    turn?: 'forward' | 'backward'
}
const EntryContext = createContext<BookEntry | null>(null)
export const EntryProvider = EntryContext.Provider

function useEntry(): BookEntry | null {
    return useContext(EntryContext)
}

function useTemplate(): InboxTemplate | undefined {
    return useEntry()?.entry.template
}

/** One page of the spread: only the moving leaf flips, hinged at the gutter side. */
function PageColumn({ side, children }: { side: 'left' | 'right'; children: React.ReactNode }): JSX.Element {
    const reducedMotion = useReducedMotion()
    const turn = useEntry()?.turn ?? 'forward'
    const moving = (turn === 'forward') === (side === 'right')
    const animate = moving && !reducedMotion

    return (
        <motion.div
            // The right page resets the counter that numbers its h2s.
            className={`min-w-0 flex-1 px-5 py-6 @4xl:px-11 ${side === 'right' ? '[counter-reset:book-section]' : ''}`}
            style={{ transformOrigin: side === 'right' ? 'left center' : 'right center' }}
            initial={animate ? { rotateY: side === 'right' ? -75 : 75, opacity: 0.2 } : false}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    )
}

/** The left page: the figures, in the order the sections opposite cite them. */
const LeftPage = ({ children }: { children: React.ReactNode }) => <PageColumn side="left">{children}</PageColumn>

/** The right page: the reading. Title, intro, then the sections. */
const RightPage = ({ children }: { children: React.ReactNode }) => <PageColumn side="right">{children}</PageColumn>

/** Deep-walk an element tree collecting the figure numbers its <SeeFig> cues cite. */
function collectCitedFigures(node: React.ReactNode, found: Set<number>): void {
    React.Children.forEach(node as React.ReactNode[], (child) => {
        if (!React.isValidElement(child)) {
            return
        }
        const props = child.props as { mdxType?: string; n?: number; children?: React.ReactNode }
        if (props.mdxType === 'SeeFig' && typeof props.n === 'number') {
            found.add(props.n)
        }
        if (props.children) {
            collectCitedFigures(props.children, found)
        }
    })
}

/**
 * The single-page read: as the MDX `wrapper` it re-orders the compiled LeftPage/RightPage trees
 * (matched by `mdxType` and `n`) so each figure follows the first block citing it.
 */
function SinglePageWrapper({ children }: { children: React.ReactNode }): JSX.Element {
    // Non-figure left-page content (the front matter's title block) leads the column.
    const preface: React.ReactNode[] = []
    const figures = new Map<number, React.ReactNode>()
    let prose: React.ReactNode[] = []

    React.Children.forEach(children as React.ReactNode[], (page) => {
        if (!React.isValidElement(page)) {
            return
        }
        const type = (page.props as { mdxType?: string }).mdxType
        if (type === 'LeftPage') {
            React.Children.forEach(
                (page.props as { children?: React.ReactNode }).children as React.ReactNode[],
                (child) => {
                    if (!React.isValidElement(child)) {
                        return
                    }
                    const props = child.props as { mdxType?: string; n?: number }
                    if (typeof props.n === 'number' && (props.mdxType ?? '').endsWith('Figure')) {
                        figures.set(props.n, child)
                    } else {
                        preface.push(child)
                    }
                }
            )
        } else if (type === 'RightPage') {
            prose = React.Children.toArray((page.props as { children?: React.ReactNode }).children)
        } else {
            // Anything authored outside the two pages still renders, after the prose.
            prose.push(page)
        }
    })

    const emitted = new Set<number>()
    const stream: React.ReactNode[] = [...preface]
    for (const block of prose) {
        stream.push(block)
        const cited = new Set<number>()
        collectCitedFigures(block, cited)
        for (const n of [...cited].sort((a, b) => a - b)) {
            if (!emitted.has(n) && figures.has(n)) {
                emitted.add(n)
                stream.push(figures.get(n))
            }
        }
    }
    // Never-cited figures still print, at the end.
    for (const [n, figure] of [...figures.entries()].sort(([a], [b]) => a - b)) {
        if (!emitted.has(n)) {
            stream.push(figure)
        }
    }

    return (
        // No hover on touch: markers and the hover hint are hidden in the single-page read.
        <div className="px-5 py-6 [counter-reset:book-section] [&_.anatomy-hint]:hidden [&_.anatomy-marker]:hidden">
            {React.Children.toArray(stream)}
        </div>
    )
}

/** The loop, drawn. Wording from /docs/self-driving/self-improving-loop. */
const LOOP_STAGES = [
    { label: 'Signal', icon: IconCompass, color: '#FFA81C', description: 'Something worth knowing, with its evidence' },
    { label: 'Report', icon: IconGraph, color: '#F54E00', description: 'Related signals grouped into one problem' },
    {
        label: 'Pull request',
        icon: IconPullRequest,
        color: '#A737D2',
        description: 'An agent writes the fix; you review and merge',
    },
    { label: 'Measured', icon: IconCheckCircle, color: '#47C861', description: 'PostHog checks whether it worked' },
]

/** Inline cue to a figure, color only – bold read larger than the surrounding text. */
function SeeFig({ n }: { n: number }): JSX.Element {
    return <span className="whitespace-nowrap text-orange">Fig.&nbsp;{n}</span>
}

/** The small line above a title page's heading. */
function Eyebrow({ children }: { children: React.ReactNode }): JSX.Element {
    return <p className="mb-1 text-[0.8em] font-bold uppercase tracking-wide text-secondary">{children}</p>
}

interface FigProps {
    n: number
    caption: string
    legend?: React.ReactNode
    children?: React.ReactNode
}

/** `<Fig n={1} caption="…">` – any exhibit. The numbered frame and caption come from here. */
function Fig({ n, caption, legend, children }: FigProps): JSX.Element {
    return (
        <Figure number={n} caption={caption} legend={legend ? <span className="mt-1 block">{legend}</span> : undefined}>
            {children}
        </Figure>
    )
}

/** This use case's report, as it lands in the inbox. */
function ReportFigure({
    n = 1,
    caption,
    legend,
}: {
    n?: number
    caption: string
    legend?: string
}): JSX.Element | null {
    const template = useTemplate()
    if (!template) {
        return null
    }
    return (
        <Fig n={n} caption={caption} legend={legend}>
            <InboxFigure template={template} />
        </Fig>
    )
}

/** This use case's scout, as the file an agent follows. */
function ScoutFigure({ n = 2, caption }: { n?: number; caption: string }): JSX.Element | null {
    const template = useTemplate()
    if (!template?.scout?.raw) {
        return null
    }
    return (
        <Fig n={n} caption={caption}>
            <ScoutFile scout={template.scout} />
        </Fig>
    )
}

/** This use case's report card, annotated part by part. The parts are the same every time. */
function AnatomyFigure({
    n = 1,
    caption,
    legend,
    priority,
    status,
    actionability,
    headline,
}: {
    n?: number
    caption: string
    legend?: string
    priority?: string
    status?: string
    actionability?: string
    headline?: string
}): JSX.Element | null {
    const template = useTemplate()
    if (!template) {
        return null
    }
    return (
        <Fig n={n} caption={caption} legend={legend ?? <AnatomyHint />}>
            <ReportAnatomy
                report={template.report}
                priority={priority}
                status={status}
                actionability={actionability}
                headline={headline}
            />
        </Fig>
    )
}

/** The report opened – what clicking Review shows, in miniature and annotated. */
function DetailFigure({
    n = 1,
    caption,
    legend,
    priority,
    status,
    actionability,
}: {
    n?: number
    caption: string
    legend?: string
    priority?: string
    status?: string
    actionability?: string
}): JSX.Element | null {
    const template = useTemplate()
    if (!template) {
        return null
    }
    return (
        <Fig n={n} caption={caption} legend={legend ?? <AnatomyHint />}>
            <ReportDetailAnatomy
                report={template.report}
                watches={template.watches}
                priority={priority}
                status={status}
                actionability={actionability}
            />
        </Fig>
    )
}

/** The scout's worklist, drawn: one row per flag it walked. Flag debt's hero. */
function LedgerFigure({
    n = 1,
    caption,
    legend,
    rows,
}: {
    n?: number
    caption: string
    legend?: string
    rows: FlagLedgerRow[]
}): JSX.Element {
    return (
        <Fig n={n} caption={caption} legend={legend}>
            <FlagLedger rows={rows} />
        </Fig>
    )
}

/** The leak, drawn: who started, who finished, and the filled gap between. */
function LeakFigure({
    n = 1,
    caption,
    legend,
    ...leak
}: LeakFunnelProps & {
    n?: number
    caption: string
    legend?: string
}): JSX.Element {
    return (
        <Fig n={n} caption={caption} legend={legend}>
            <LeakFunnel {...leak} />
        </Fig>
    )
}

/** The discriminator, drawn: what moved, against what held steady. */
function DivergenceFigure({
    n = 1,
    caption,
    legend,
    series,
    markerAt,
    markerLabel,
}: {
    n?: number
    caption: string
    legend?: string
    series: DivergenceSeries[]
    markerAt?: number
    markerLabel?: string
}): JSX.Element {
    return (
        <Fig n={n} caption={caption} legend={legend}>
            <Divergence series={series} markerAt={markerAt} markerLabel={markerLabel} />
        </Fig>
    )
}

function LoopFigure({ n = 1, caption }: { n?: number; caption: string }): JSX.Element {
    return (
        <Fig n={n} caption={caption}>
            <CustomSelfDrivingLoop stages={LOOP_STAGES} loop />
        </Fig>
    )
}

/** The signal sources this scout reads, from the use case's `watches` frontmatter. */
function Watches(): JSX.Element | null {
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
function Enable(): JSX.Element | null {
    const template = useTemplate()
    if (!template) {
        return null
    }
    return <EnableScout scout={template.scout} requires={template.requires} templateTitle={template.templateTitle} />
}

/** The contents list, built from the book itself. */
function Contents(): JSX.Element | null {
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
                        <Link to={page.url} className="min-w-0 text-[1em] text-primary hover:underline">
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
function SeeAlso({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        // Bottom margin keeps the rule off the folio border.
        <aside className="mb-2 mt-12 text-[0.85em] leading-relaxed text-secondary [&_a]:underline [&_p]:m-0">
            <span aria-hidden="true" className="mb-2.5 block w-24 border-t border-primary" />
            {children}
        </aside>
    )
}

/** Prose defaults. The page container is `not-prose`, so every tag is styled here. */
export const bookMdxComponents = {
    LeftPage,
    SeeFig,
    RightPage,
    Eyebrow,
    Fig,
    ReportFigure,
    AnatomyFigure,
    DetailFigure,
    DivergenceFigure,
    LedgerFigure,
    LeakFigure,
    ScoutFigure,
    LoopFigure,
    Watches,
    Enable,
    Contents,
    SeeAlso,
    Term,
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
}

/** The vocabulary plus the single-page wrapper that interleaves figures into the prose. */
export const singleModeComponents = {
    ...bookMdxComponents,
    wrapper: SinglePageWrapper,
}
