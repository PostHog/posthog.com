import React from 'react'

import ReportCard from 'components/SelfDrivingInbox/ReportCard'
import { InboxTemplate } from 'components/SelfDrivingInbox/types'

/** Numbered dot for the annotations – the legend under the figure explains each one. */
function Marker({ number, className }: { number: number; className: string }): JSX.Element {
    return (
        <span
            aria-hidden="true"
            className={`pointer-events-none absolute z-10 flex size-5 items-center justify-center rounded-full bg-orange text-[11px] font-bold text-white shadow-md ${className}`}
        >
            {number}
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
        <div className="overflow-hidden rounded border border-primary bg-primary">
            <header className="flex items-center gap-2 border-b border-light px-4 py-2 dark:border-dark">
                <p className="m-0 text-sm font-bold text-primary">Inbox</p>
                {/* One unread – the same count chip the app shows. */}
                <span className="flex size-5 items-center justify-center rounded-full bg-orange text-[11px] font-bold text-white">
                    1
                </span>
            </header>

            <div className="relative p-4">
                <Marker number={1} className="right-2 top-2" />
                <ReportCard report={template.report} variant="page" />
                <Marker number={2} className="bottom-2 right-2" />
            </div>

            <footer className="relative border-t border-light px-4 py-2 dark:border-dark">
                <Marker number={3} className="right-2 top-1.5" />
                <p className="m-0 text-sm text-secondary">
                    Runs {schedule}. Every earlier run this week wrote nothing.
                </p>
            </footer>
        </div>
    )
}
