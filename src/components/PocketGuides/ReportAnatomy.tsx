import React from 'react'

import { IconInfo } from '@posthog/icons'

import { SelfDrivingReport } from 'components/SelfDrivingInbox/types'

import AnatomyFrame from './AnatomyFrame'
import { FigureMarker } from './FigureMarker'

/**
 * The app's inbox card in miniature, annotated: markers fade in on figure hover (`group/anatomy`)
 * and open a gloss. The evidence stays one click deeper, as in the app.
 */

export interface ReportAnatomyProps {
    report: SelfDrivingReport
    /** The agent's own triage, P0–P4. */
    priority?: string
    /** Where the report stands, e.g. "Ready". */
    status?: string
    /** Whether an agent can act on it, e.g. "Actionable". */
    actionability?: string
    /** The card's two-line summary. */
    headline?: string
}

/** The standing invitation, set as a quiet second caption line. */
export function AnatomyHint(): JSX.Element {
    return (
        <span className="anatomy-hint inline-flex items-baseline gap-1 italic text-secondary">
            <IconInfo className="size-3.5 shrink-0 self-center" aria-hidden="true" />
            Hover over the figure to learn about each element.
        </span>
    )
}

const chipClasses = 'inline-flex select-none items-center rounded-sm px-1 py-0.5 text-[0.65em] font-medium leading-none'

export default function ReportAnatomy({
    report,
    priority = 'P1',
    status = 'Ready',
    actionability = 'Actionable',
    headline,
}: ReportAnatomyProps): JSX.Element {
    const summary = headline ?? `${report.body.split('. ')[0]}.`

    return (
        // The card. Dashed border, as in the app before a PR exists.
        <AnatomyFrame className="rounded border border-dashed border-primary bg-primary px-4 py-3">
            <div className="flex flex-col gap-2.5 @md:flex-row @md:items-stretch @md:gap-3">
                <div className="flex min-w-0 flex-1 items-start gap-2.5">
                    {/* 1 · Priority */}
                    <span className="flex shrink-0 flex-col items-center gap-1.5">
                        <span className="inline-flex size-[1.6em] select-none items-center justify-center rounded-sm border border-orange bg-orange/10 text-[0.65em] font-semibold tabular-nums text-orange">
                            {priority}
                        </span>
                        <FigureMarker
                            n={1}
                            label="Priority"
                            gloss="how urgent the scout thinks this is, from P0 to P4"
                        />
                    </span>

                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                        {/* 2 · The claim */}
                        <span className="text-[0.85em] font-semibold leading-snug text-primary">
                            {report.title}{' '}
                            <FigureMarker n={2} label="The claim" gloss="what the scout found, in one sentence" />
                        </span>
                        {/* 3 · What it saw */}
                        <span className="flex items-start gap-1.5">
                            <span className="line-clamp-2 min-w-0 text-[0.75em] leading-snug text-secondary">
                                {summary}
                            </span>
                            <FigureMarker
                                n={3}
                                label="What it saw"
                                gloss="a short preview of the evidence, the full version is inside the report"
                            />
                        </span>
                        {/* 4 + 5 · Meta row */}
                        <span className="mt-0.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.7em] leading-none text-secondary">
                            <span className="inline-flex items-center gap-1.5">
                                {report.source}
                                <FigureMarker
                                    n={4}
                                    label="Who filed it"
                                    gloss="which scout wrote this report, and when it arrived"
                                />
                            </span>
                            <span className="inline-flex items-center gap-1.5">
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
                                <FigureMarker
                                    n={5}
                                    label="Where it stands"
                                    gloss='"Ready" means ready to review; "Actionable" means an agent can fix it, but no PR is open'
                                />
                            </span>
                            {report.receivedAgo && <span className="ml-auto">{report.receivedAgo} ago</span>}
                        </span>
                    </span>
                </div>

                {/* 6 · Actions. Styled like the app's, but this is a diagram – not live buttons. */}
                <span className="flex items-center gap-2 border-t border-primary pt-2.5 @md:border-l @md:border-t-0 @md:pl-3 @md:pt-0">
                    <span className="select-none rounded border border-primary px-2 py-1 text-[0.7em] font-semibold leading-none text-secondary">
                        Archive
                    </span>
                    <span className="select-none rounded border border-orange bg-orange px-2 py-1 text-[0.7em] font-semibold leading-none text-white">
                        Review
                    </span>
                    <FigureMarker
                        n={6}
                        label="Your move"
                        gloss="open the report, or archive it if it's not worth acting on"
                    />
                </span>
            </div>
        </AnatomyFrame>
    )
}
