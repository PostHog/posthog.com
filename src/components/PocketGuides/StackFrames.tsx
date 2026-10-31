import React, { useState } from 'react'

import { IconBox, IconEllipsis, IconWarning } from '@posthog/icons'

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

interface StackFrame {
    /** The function, as the trace names it. */
    fn: string
    /** Where it came from: a bundle path when unresolved, a repository path when resolved. */
    source: string
    /** Your code rather than a dependency. Drawn heavier, because these are the ones you act on. */
    inApp?: boolean
    /** One of the frames PostHog built the fingerprint from. Draws the app's fingerprint icon. */
    fingerprinted?: boolean
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

/** The app's fingerprint icon (`IconFingerprint` in lemon-ui), on frames that set the issue's fingerprint. */
function FingerprintIcon(): JSX.Element {
    return (
        <Tooltip
            delay={0}
            side="bottom"
            contentClassName="max-w-64 px-3 py-2 text-left leading-normal"
            trigger={
                <span className="inline-flex cursor-help items-center text-secondary hover:text-red">
                    <svg viewBox="1 1 23 23" fill="none" className="size-[1.3em]" aria-label="Fingerprinted frame">
                        <path
                            d="M13.1427 20.9999C10.8077 19.5438 9.25254 16.9522 9.25254 13.9968C9.25254 12.4783 10.4833 11.2476 12.0008 11.2476C13.5184 11.2476 14.7491 12.4783 14.7491 13.9968C14.7491 15.5153 15.9798 16.746 17.4974 16.746C19.0149 16.746 20.2457 15.5153 20.2457 13.9968C20.2457 9.44139 16.5544 5.74922 12.0017 5.74922C7.44907 5.74922 3.75781 9.44139 3.75781 13.9968C3.75781 15.0122 3.87145 16.001 4.08038 16.954M8.49027 20.2989C7.23938 18.5138 6.50351 16.3419 6.50351 13.9968C6.50351 10.9599 8.96405 8.49844 11.9992 8.49844C15.0343 8.49844 17.4948 10.9599 17.4948 13.9968M17.7927 19.4806C17.6937 19.4861 17.5966 19.4953 17.4967 19.4953C14.4616 19.4953 12.0011 17.0338 12.0011 13.9969M19.6734 6.47682C17.7993 4.34802 15.0593 3 12.0004 3C8.94141 3 6.20138 4.34802 4.32734 6.47682"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            }
        >
            <span className="text-[0.75rem] leading-snug text-primary">Fingerprinted by this frame</span>
        </Tooltip>
    )
}

/** The app's vendor icon, on frames from a dependency rather than the app's own code. */
function VendorIcon(): JSX.Element {
    return (
        <Tooltip
            delay={0}
            side="bottom"
            trigger={
                <span className="inline-flex cursor-help items-center text-secondary">
                    <IconBox className="size-[1.2em]" />
                </span>
            }
        >
            <span className="text-[0.75rem] text-primary">Vendor frame</span>
        </Tooltip>
    )
}

export default function StackFrames({ type, message, frames }: StackFramesProps): JSX.Element {
    // One open frame at a time. The app allows several; the figure only ever needs to show one.
    const [openFrame, setOpenFrame] = useState<number | null>(null)

    return (
        <div className="@container group/anatomy overflow-hidden rounded border border-primary bg-primary">
            <div className="border-b border-primary px-3 py-2">
                <p className="m-0 flex items-center gap-1.5 text-[0.95em] font-bold leading-tight text-primary">
                    {type}
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
                                    <span className="font-medium text-primary">{frame.fn}</span>
                                    <span
                                        className={`min-w-0 truncate font-light ${
                                            frame.unresolved ? 'italic text-secondary/70' : 'text-secondary'
                                        }`}
                                    >
                                        {frame.source}
                                    </span>
                                </button>
                                <span className="flex shrink-0 items-center gap-1.5 text-secondary/70">
                                    {frame.marker && (
                                        <FigureMarker
                                            n={frame.marker.n}
                                            label={frame.marker.label}
                                            gloss={frame.marker.gloss}
                                        />
                                    )}
                                    {frame.fingerprinted && <FingerprintIcon />}
                                    {frame.unresolved && <UnresolvedWarning />}
                                    {!frame.inApp && !frame.unresolved && <VendorIcon />}
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
