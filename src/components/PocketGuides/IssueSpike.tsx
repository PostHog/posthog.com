import React from 'react'

import AnatomyFrame from './AnatomyFrame'
import { FigureMarker } from './FigureMarker'

const dailyVolume = [3, 2, 4, 3, 2, 3, 18]

/** One issue's normal volume beside the day it becomes an anomaly. */
export default function IssueSpike(): JSX.Element {
    const max = Math.max(...dailyVolume)

    return (
        <AnatomyFrame className="rounded border border-primary bg-accent p-3 dark:bg-accent-dark @md:p-4">
            <div className="flex items-start justify-between gap-3 border-b border-primary pb-3">
                <div className="min-w-0">
                    <p className="m-0 truncate text-[0.85em] font-bold leading-snug text-primary">
                        Checkout confirm fails
                    </p>
                    <p className="m-0 mt-0.5 text-[0.7em] leading-snug text-secondary">
                        Issue volume over the last 7 days
                    </p>
                </div>
                <span className="shrink-0 rounded border border-orange px-1.5 py-0.5 text-[0.65em] font-bold leading-none text-orange">
                    Spiking
                </span>
            </div>

            <div className="mt-3 rounded border border-primary bg-primary p-3">
                <div className="mb-2 flex items-center justify-between gap-2 text-[0.65em] leading-snug text-secondary">
                    <span>Occurrences</span>
                    <span>Usual volume: 2-4/day</span>
                </div>
                <div className="relative h-28 border-b border-primary px-1 pt-7">
                    <span className="pointer-events-none absolute inset-x-0 bottom-[22%] border-t border-dashed border-primary opacity-50" />
                    <span className="absolute right-1 top-1 flex items-center gap-1 text-[0.7em] font-bold leading-none text-orange">
                        18
                        <FigureMarker
                            n={1}
                            label="The spike"
                            gloss="Today is far above this issue's own usual volume of two to four occurrences a day."
                            visibility="always"
                        />
                    </span>
                    <div className="flex h-full items-end gap-2">
                        {dailyVolume.map((value, index) => {
                            const isSpike = index === dailyVolume.length - 1
                            return (
                                <div key={index} className="flex h-full min-w-0 flex-1 items-end justify-center">
                                    <div
                                        className={`w-full rounded-t ${
                                            isSpike ? 'bg-orange' : 'bg-secondary opacity-50'
                                        }`}
                                        style={{ height: `${(value / max) * 100}%` }}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="mt-1 flex justify-between text-[0.6em] leading-none text-secondary">
                    <span>6 days ago</span>
                    <span>Today</span>
                </div>
            </div>

            <div className="mt-3 flex items-start gap-2 rounded border border-orange bg-primary px-2.5 py-2 text-[0.7em] leading-snug text-primary">
                <span className="font-bold text-orange">Alert</span>
                <span className="min-w-0 flex-1">18 occurrences today, versus a usual volume of 2-4</span>
                <FigureMarker
                    n={2}
                    label="Why this alerts"
                    gloss="Spike detection compares this issue with itself, so normal changes in overall traffic do not trigger it."
                    visibility="always"
                />
            </div>
        </AnatomyFrame>
    )
}
