import React, { useState } from 'react'

import { IconEllipsis, IconWarning } from '@posthog/icons'

import Tooltip from 'components/RadixUI/Tooltip'

import { FigureMarker } from './FigureMarker'

/**
 * A stack trace as the issue page draws it, in the two states a reader has to tell apart: frames
 * PostHog mapped back to your source, and frames it could not.
 *
 * Unresolved frames are the whole argument for uploading source maps – they name a column in a
 * bundle, they leave the fingerprint nothing of yours to group on, and they are what a reader sees
 * before setting any of this up. The app says so in a tooltip on the warning icon, so this does too.
 *
 * Deliberately not a working stack trace viewer: one open frame at a time, no keyboard handling
 * beyond what a `<button>` gives for free, and code context only on the frames that carry it.
 */

export interface StackFrame {
    /** The function, as the trace names it. */
    fn: string
    /** Where it came from: a bundle path when unresolved, a repository path when resolved. */
    source: string
    /** Your code rather than a dependency. Drawn heavier, because these are the ones you act on. */
    inApp?: boolean
    /** PostHog could not map this frame back to source. Draws the warning and its tooltip. */
    unresolved?: boolean
    /** Source around the failing line, shown when the frame is opened. First line is `startLine`. */
    context?: { startLine: number; failingLine: number; lines: string[] }
    /** Annotates this frame with a hoverable number. */
    marker?: { n: number; label: string; gloss: string }
}

export interface StackFramesProps {
    /** The exception type, set as the trace's heading. */
    type: string
    /** The exception message, under the type. */
    message: string
    /** Innermost frame first, the way the issue page prints it. */
    frames: StackFrame[]
    /** Annotates the panel with a hoverable number. */
    marker?: { n: number; label: string; gloss: string }
}

/** What the app puts behind the warning icon, quoted so the figure teaches the same words. */
function UnresolvedWarning(): JSX.Element {
    return (
        <Tooltip
            delay={0}
            side="bottom"
            contentClassName="max-w-64 select-text px-3 py-2 text-left leading-normal"
            trigger={
                <span className="inline-flex cursor-help items-center text-secondary">
                    <IconWarning className="size-[1.2em]" />
                </span>
            }
        >
            <p className="m-0 text-[0.75rem] font-bold uppercase tracking-wide text-secondary">Unresolved frame</p>
            <p className="m-0 mt-1 text-[0.8125rem] leading-snug text-primary">
                Upload your symbol sets to improve issue grouping, see unminified source code and get release
                information.
            </p>
        </Tooltip>
    )
}

export default function StackFrames({ type, message, frames, marker }: StackFramesProps): JSX.Element {
    // One open frame at a time. The app allows several; the figure only ever needs to show one.
    const [openFrame, setOpenFrame] = useState<number | null>(null)

    return (
        <div className="@container group/anatomy overflow-hidden rounded border border-primary bg-primary">
            <div className="border-b border-primary px-3 py-2">
                <p className="m-0 flex items-center gap-1.5 text-[0.95em] font-bold leading-tight text-primary">
                    {type}
                    {marker && <FigureMarker n={marker.n} label={marker.label} gloss={marker.gloss} />}
                </p>
                <p className="m-0 mt-0.5 text-[0.8em] leading-snug text-secondary">{message}</p>
            </div>

            <ul className="m-0 list-none divide-y divide-primary p-0">
                {frames.map((frame, index) => {
                    const isOpen = openFrame === index
                    return (
                        // Frame names repeat inside one trace (React calls the same helper twice),
                        // so the index disambiguates. Safe: rows are static and never reorder.
                        <li key={`${frame.fn}-${index}`}>
                            <div className="flex items-center gap-2 px-3 font-code text-[0.72em] leading-relaxed">
                                <button
                                    type="button"
                                    // Only frames carrying source have anything to open, which is
                                    // also true in the app – an unresolved frame has nothing to show.
                                    disabled={!frame.context}
                                    onClick={() => setOpenFrame(isOpen ? null : index)}
                                    className="flex min-w-0 flex-1 items-baseline gap-2 py-1 text-left disabled:cursor-default"
                                >
                                    <span className={frame.inApp ? 'font-bold text-primary' : 'text-secondary'}>
                                        {frame.fn}
                                    </span>
                                    <span className="min-w-0 truncate text-secondary/70">{frame.source}</span>
                                </button>
                                <span className="flex shrink-0 items-center gap-1.5 text-secondary/70">
                                    {frame.marker && (
                                        <FigureMarker
                                            n={frame.marker.n}
                                            label={frame.marker.label}
                                            gloss={frame.marker.gloss}
                                        />
                                    )}
                                    {frame.unresolved && <UnresolvedWarning />}
                                    <IconEllipsis className="size-[1.2em]" aria-hidden="true" />
                                </span>
                            </div>

                            {isOpen && frame.context && (
                                <div className="overflow-x-auto border-t border-primary bg-accent px-3 py-2 dark:bg-accent-dark">
                                    {frame.context.lines.map((line, offset) => {
                                        const lineNumber = frame.context!.startLine + offset
                                        const failing = lineNumber === frame.context!.failingLine
                                        return (
                                            <div
                                                key={lineNumber}
                                                className={`flex gap-3 font-code text-[0.7em] leading-relaxed ${
                                                    failing ? 'bg-red/10' : ''
                                                }`}
                                            >
                                                <span className="shrink-0 tabular-nums text-secondary/60">
                                                    {lineNumber}
                                                </span>
                                                <span className="whitespace-pre text-primary">{line}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
