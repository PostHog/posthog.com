import React, { useEffect, useRef } from 'react'
import type { TranscriptLine } from './wistiaCaptions'

const formatTime = (seconds: number): string =>
    `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60)
        .toString()
        .padStart(2, '0')}`

interface TranscriptProps {
    /** Every caption cue, by start time. */
    lines: TranscriptLine[]
    /** The cues on screen now. Overlapping cues can both be active. */
    activeIds: string[]
    /** Seek to a time and play. */
    playFrom: (seconds: number) => void
    /** The .vtt file, for the download link. */
    captionsUrl: string
    /** The captions could not load. */
    failed?: boolean
    /** Sets the height of the scrolling list. */
    listClassName?: string
}

/**
 * A video transcript from its caption cues. Each line is a button that plays from that line. The box keeps the current
 * line in view, without scrolling the page.
 */
export default function Transcript({
    lines,
    activeIds,
    playFrom,
    captionsUrl,
    failed = false,
    listClassName = 'max-h-56',
}: TranscriptProps): JSX.Element {
    const listRef = useRef<HTMLOListElement>(null)
    const headingId = `transcript-${captionsUrl.replace(/\W+/g, '-')}`

    useEffect(() => {
        const list = listRef.current
        const active = list?.querySelector<HTMLElement>('[aria-current="true"]')
        if (!list || !active) return
        // The list is `relative`, so it is the line's offset parent: offsetTop is already inside the list.
        const top = active.offsetTop
        if (top < list.scrollTop || top + active.offsetHeight > list.scrollTop + list.clientHeight) {
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            list.scrollTo({ top: top - 8, behavior: reduceMotion ? 'auto' : 'smooth' })
        }
    }, [activeIds])

    return (
        <section className="min-w-0" aria-labelledby={headingId}>
            <div className="flex items-center justify-between gap-2">
                <h2 id={headingId} className="m-0 text-[13px] font-bold text-primary">
                    Transcript
                </h2>
                <a href={captionsUrl} download className="text-xs text-secondary hover:text-primary">
                    Download captions (.vtt)
                </a>
            </div>
            {lines.length === 0 ? (
                <p className="m-0 mt-2 rounded-md border border-primary bg-light dark:bg-dark px-3 py-2 text-sm text-secondary">
                    {failed ? "The transcript didn't load." : 'Loading transcript…'}
                </p>
            ) : (
                <ol
                    ref={listRef}
                    className={`relative m-0 mt-2 p-0 list-none overflow-y-auto rounded-md border border-primary bg-light dark:bg-dark ${listClassName}`}
                >
                    {lines.map((line) => {
                        const active = activeIds.includes(line.id)
                        return (
                            <li key={line.id} className="border-b border-primary last:border-b-0">
                                <button
                                    onClick={() => playFrom(line.start)}
                                    aria-current={active ? 'true' : undefined}
                                    className={`flex w-full gap-2.5 px-3 py-2 text-left text-sm border-l-[3px] hover:bg-accent focus-visible:bg-accent ${
                                        active
                                            ? 'border-brand-yellow bg-brand-yellow-lighter dark:bg-brand-yellow/20'
                                            : 'border-transparent'
                                    }`}
                                >
                                    <span className="w-10 shrink-0 text-secondary tabular-nums">
                                        {formatTime(line.start)}
                                    </span>
                                    <span className="flex-1 min-w-0 leading-[21px] text-primary">{line.text}</span>
                                </button>
                            </li>
                        )
                    })}
                </ol>
            )}
        </section>
    )
}
