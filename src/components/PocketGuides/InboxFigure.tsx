import React from 'react'

import ReportCard from 'components/SelfDrivingInbox/ReportCard'
import { InboxTemplate } from 'components/SelfDrivingInbox/types'

import { FigureMarker } from './FigureMarker'

/** Anchors a marker over `ReportCard`, which is shared with the app and so stays untouched. */
function AnchoredMarker({
    className,
    ...marker
}: {
    className: string
    n: number
    label: string
    gloss: string
}): JSX.Element {
    return (
        <span className={`absolute z-10 ${className}`}>
            <FigureMarker {...marker} />
        </span>
    )
}

interface InboxFigureProps {
    /** The use case this figure teaches. Only its own report appears – this is not navigation. */
    template: InboxTemplate
}

/** One use case's inbox moment: a single report card plus the run history, as in the app. */
export default function InboxFigure({ template }: InboxFigureProps): JSX.Element {
    const schedule = (template.scout?.schedule || 'Daily').toLowerCase()

    return (
        <div className="group/anatomy overflow-hidden rounded border border-primary bg-primary">
            <header className="flex items-center gap-2 border-b border-light px-4 py-2 dark:border-dark">
                <p className="m-0 text-sm font-bold text-primary">Inbox</p>
                {/* Words, not a chip: a numbered circle here reads as a second marker. */}
                <span className="text-sm text-secondary">1 unread</span>
            </header>

            <div className="relative p-4">
                <AnchoredMarker
                    className="right-2 top-2"
                    n={1}
                    label="Who found it"
                    gloss="The scout that wrote this report, and when it landed in your inbox."
                />
                <ReportCard report={template.report} variant="page" />
                <AnchoredMarker
                    className="bottom-2 right-2"
                    n={2}
                    label="Suggested action"
                    gloss="What the agent proposes doing about it. One click turns this into a pull request you review."
                />
            </div>

            <footer className="relative border-t border-light px-4 py-2 dark:border-dark">
                <AnchoredMarker
                    className="right-2 top-1.5"
                    n={3}
                    label="The quiet runs"
                    gloss="Most runs write nothing at all. A report is the exception, which is what makes it worth reading."
                />
                <p className="m-0 text-sm text-secondary">
                    Runs {schedule}. Every earlier run this week wrote nothing.
                </p>
            </footer>
        </div>
    )
}
