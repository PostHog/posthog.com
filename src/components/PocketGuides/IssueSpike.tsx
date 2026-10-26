import React from 'react'

import AnatomyFrame from './AnatomyFrame'
import { FigureMarker } from './FigureMarker'

// Occurrences per 5-minute window over the last hour. The last window is about 12 times the
// baseline of the windows before it, and above the default minimum threshold of 500.
const windowVolume = [52, 61, 58, 66, 49, 63, 57, 70, 55, 62, 59, 720]

/** One issue's occurrences per 5-minute window, ending in the window that spikes. */
export default function IssueSpike(): JSX.Element {
    const max = Math.max(...windowVolume)

    return (
        <AnatomyFrame className="rounded border border-primary bg-accent p-3 dark:bg-accent-dark @md:p-4">
            <div className="flex items-start justify-between gap-3 border-b border-primary pb-3">
                <div className="min-w-0">
                    <p className="m-0 truncate text-[0.85em] font-bold leading-snug text-primary">
                        Checkout confirm fails
                    </p>
                    <p className="m-0 mt-0.5 text-[0.7em] leading-snug text-secondary">
                        Occurrences over the last hour
                    </p>
                </div>
                <span className="shrink-0 rounded border border-orange px-1.5 py-0.5 text-[0.65em] font-bold leading-none text-orange">
                    Spiking
                </span>
            </div>

            <div className="mt-3 rounded border border-primary bg-primary p-3">
                <div className="mb-2 flex items-center justify-between gap-2 text-[0.65em] leading-snug text-secondary">
                    <span>Per 5 minutes</span>
                    <span>Baseline: about 60</span>
                </div>
                <div className="relative h-28 border-b border-primary px-1 pt-7">
                    <span className="pointer-events-none absolute inset-x-0 bottom-[6%] border-t border-dashed border-primary opacity-50" />
                    <span className="absolute right-1 top-1 flex items-center gap-1 text-[0.7em] font-bold leading-none text-orange">
                        720
                        <FigureMarker
                            n={1}
                            label="The spike"
                            gloss="The latest 5-minute window has about 12 times this issue's baseline from the past hour."
                            visibility="always"
                        />
                    </span>
                    <div className="flex h-full items-end gap-1">
                        {windowVolume.map((value, index) => {
                            const isSpike = index === windowVolume.length - 1
                            return (
                                <div key={index} className="flex h-full min-w-0 flex-1 items-end justify-center">
                                    <div
                                        className={`w-full rounded-t ${isSpike ? 'bg-orange' : 'bg-gray opacity-50'}`}
                                        style={{ height: `${(value / max) * 100}%` }}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="mt-1 flex justify-between text-[0.6em] leading-none text-secondary">
                    <span>1 hour ago</span>
                    <span>Now</span>
                </div>
            </div>

            <div className="mt-3 flex items-start gap-2 rounded border border-orange bg-primary px-2.5 py-2 text-[0.7em] leading-snug text-primary">
                <span className="font-bold text-orange">Alert</span>
                <span className="min-w-0 flex-1">720 occurrences in 5 minutes, against a baseline of about 60</span>
                <FigureMarker
                    n={2}
                    label="Why this alerts"
                    gloss="The window is above the minimum threshold and more than the multiplier times the baseline. You set both in spike detection settings."
                    visibility="always"
                />
            </div>
        </AnatomyFrame>
    )
}
