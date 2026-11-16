import React, { useEffect, useRef } from 'react'
import { formatTime, type PlayerState } from './Player'

/**
 * The transcript for a `LearnTVPlayer`. It lists the player's caption cues as buttons that play from that line, and
 * keeps the current line in view inside its own box, without scrolling the page.
 */
export default function Transcript({
    lines,
    activeIds,
    playFrom,
    captionsUrl,
    listClassName = 'max-h-56',
}: PlayerState & {
    /** The .vtt file, for the download link. */
    captionsUrl: string
    /** Sets the height of the scrolling list. */
    listClassName?: string
}): JSX.Element {
    const listRef = useRef<HTMLOListElement>(null)
    const headingId = `transcript-${captionsUrl.replace(/\W+/g, '-')}`

    useEffect(() => {
        const list = listRef.current
        const active = list?.querySelector<HTMLElement>('[aria-current="true"]')
        if (!list || !active) return
        const top = active.offsetTop - list.offsetTop
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
                <p className="m-0 mt-2 rounded-md border border-primary bg-white dark:bg-dark px-3 py-2 text-sm text-secondary">
                    Loading transcript…
                </p>
            ) : (
                <ol
                    ref={listRef}
                    className={`relative m-0 mt-2 p-0 list-none overflow-y-auto rounded-md border border-primary bg-white dark:bg-dark ${listClassName}`}
                >
                    {lines.map((line) => {
                        const active = activeIds.includes(line.id)
                        return (
                            <li key={line.id} className="border-b border-primary last:border-b-0">
                                <button
                                    onClick={() => playFrom(line.start)}
                                    aria-current={active ? 'true' : undefined}
                                    className={`flex w-full gap-2.5 px-3 py-2 text-left text-sm border-l-[3px] hover:bg-accent focus-visible:bg-accent ${
                                        active ? 'border-yellow bg-yellow/20' : 'border-transparent'
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
