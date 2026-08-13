import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import Markdown from 'components/Markdown'
import { productSource } from 'components/SelfDrivingInbox/sources'
import { SelfDrivingReport, WatchedSource } from 'components/SelfDrivingInbox/types'

import { FigureMarker } from './FigureMarker'

/** The report opened – the app's detail view in miniature, annotated like the card anatomy. */

export interface ReportDetailAnatomyProps {
    report: SelfDrivingReport
    /** The scout's signal sources double as the report's evidence list. */
    watches?: WatchedSource[]
    priority?: string
    status?: string
    actionability?: string
}

/** The app's DetailSection, in miniature: bold label, thin rule to the edge, optional meta. */
function Section({
    label,
    meta,
    children,
}: {
    label: string
    meta?: React.ReactNode
    children: React.ReactNode
}): JSX.Element {
    return (
        <div>
            <div className="flex items-baseline gap-2">
                <span className="shrink-0 text-[0.7em] font-bold uppercase tracking-wide text-primary">{label}</span>
                <span aria-hidden="true" className="min-w-4 flex-1 border-t border-primary opacity-40" />
                {meta && <span className="shrink-0 text-[0.7em] leading-none text-secondary">{meta}</span>}
            </div>
            <div className="mt-2">{children}</div>
        </div>
    )
}

const chipClasses = 'inline-flex select-none items-center rounded-sm px-1 py-0.5 text-[0.65em] font-medium leading-none'

export default function ReportDetailAnatomy({
    report,
    watches = [],
    priority = 'P1',
    status = 'Ready',
    actionability = 'Actionable',
}: ReportDetailAnatomyProps): JSX.Element {
    const reducedMotion = useReducedMotion()
    const animate = !reducedMotion

    return (
        <div className="group/anatomy relative @container">
            <motion.div
                className="rounded border border-primary bg-primary px-4 py-3.5"
                initial={animate ? { opacity: 0, y: 6 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            >
                {/* 1 · Header: the card's claim again, now wearing its actions. */}
                <div className="flex flex-col gap-2 border-b border-primary pb-3 @md:flex-row @md:items-start @md:justify-between">
                    <div className="flex min-w-0 items-start gap-2">
                        <span className="mt-px inline-flex size-[1.6em] shrink-0 select-none items-center justify-center rounded-sm border border-orange bg-orange/10 text-[0.65em] font-semibold tabular-nums text-orange">
                            {priority}
                        </span>
                        <span className="min-w-0">
                            <span className="block text-[0.9em] font-bold leading-snug text-primary">
                                {report.title}{' '}
                                <FigureMarker
                                    n={1}
                                    label="The header"
                                    gloss="the same claim as the card, plus the report's status and its actions"
                                />
                            </span>
                            <span className="mt-1 flex flex-wrap items-center gap-2 text-[0.7em] leading-none text-secondary">
                                <span
                                    className={`${chipClasses} border border-primary bg-accent text-secondary dark:bg-accent-dark`}
                                >
                                    {status}
                                </span>
                                <span
                                    className={`${chipClasses} bg-green/10 text-green dark:bg-green/30 dark:text-white`}
                                >
                                    {actionability}
                                </span>
                                <span>{report.source}</span>
                                {report.receivedAgo && <span>· {report.receivedAgo} ago</span>}
                            </span>
                        </span>
                    </div>
                    {/* 2 · The one action that costs money, and it's still just a proposal. */}
                    <span className="flex shrink-0 items-center gap-2">
                        <span className="select-none rounded border border-primary px-2 py-1 text-[0.7em] font-semibold leading-none text-secondary">
                            Archive
                        </span>
                        <span className="select-none rounded border border-orange bg-orange px-2 py-1 text-[0.7em] font-semibold leading-none text-white">
                            Create PR
                        </span>
                        <FigureMarker
                            n={2}
                            label="Create PR"
                            gloss="sends the report to an agent, which writes the fix and opens a pull request for you to review"
                        />
                    </span>
                </div>

                <div className="flex flex-col gap-4 pt-3">
                    {/* 3 · Summary: the evidence in full, the part the card clamps to two lines. */}
                    <Section
                        label="Summary"
                        meta={
                            <FigureMarker
                                n={3}
                                label="Summary"
                                gloss="everything the scout found: what changed, the numbers behind it, and why the harmless explanations don't hold"
                            />
                        }
                    >
                        <Markdown className="text-[0.8em] leading-relaxed text-secondary [&>p]:mb-2 [&>p:last-child]:mb-0">
                            {report.body}
                        </Markdown>
                        {report.affected && (
                            <p className="m-0 mt-2 text-[0.75em] font-semibold text-primary">{report.affected}</p>
                        )}
                        {report.suggestedAction && (
                            <div className="mt-2 flex items-start gap-1.5">
                                <Markdown className="min-w-0 text-[0.8em] leading-relaxed text-secondary [&>p]:m-0">
                                    {`**Suggested fix:** ${report.suggestedAction}`}
                                </Markdown>
                                <FigureMarker
                                    n={4}
                                    label="Suggested fix"
                                    gloss="the change the agent proposes – if you create a PR, this becomes the pull request"
                                />
                            </div>
                        )}
                    </Section>

                    {/* 5 · Evidence: the raw signals, one mini-card per source. */}
                    {watches.length > 0 && (
                        <Section
                            label="Evidence"
                            meta={
                                <span className="inline-flex items-center gap-1.5">
                                    {watches.length} sources
                                    <FigureMarker
                                        n={5}
                                        label="Evidence"
                                        gloss="the data sources the scout read to build this report"
                                    />
                                </span>
                            }
                        >
                            <div className="grid gap-2 @md:grid-cols-2">
                                {watches.map((source) => {
                                    const { Icon, token } = productSource(source.name)
                                    return (
                                        <div
                                            key={source.name}
                                            className="flex items-start gap-2 rounded border border-primary bg-accent p-2 dark:bg-accent-dark"
                                        >
                                            <Icon
                                                className={`mt-px size-[1.1em] shrink-0 text-${token}`}
                                                aria-hidden="true"
                                            />
                                            <span className="min-w-0">
                                                <span className="block text-[0.7em] font-bold leading-snug text-primary">
                                                    {source.name}
                                                </span>
                                                <span className="block text-[0.7em] leading-snug text-secondary">
                                                    {source.detail}
                                                </span>
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </Section>
                    )}
                </div>
            </motion.div>
        </div>
    )
}
