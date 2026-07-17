import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import SEO from 'components/seo'
import Explorer from 'components/Explorer'
import OSButton from 'components/OSButton'
import Slider from 'components/RadixUI/Slider'
import {
    IconChevronLeft,
    IconChevronRight,
    IconPlay,
    IconPause,
    IconRewindPlay,
    IconExternal,
    IconRefresh,
} from '@posthog/icons'

interface Snapshot {
    timestamp: string
    iso: string
    label: string
    url: string
}

// How long each snapshot lingers when auto-playing the timeline (ms).
const PLAY_INTERVAL = 3000

function useSnapshots() {
    const [snapshots, setSnapshots] = useState<Snapshot[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false
        async function load() {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch('/api/wayback-snapshots?path=')
                if (!res.ok) {
                    const data = await res.json().catch(() => ({}))
                    throw new Error(data.error || res.statusText)
                }
                const data = await res.json()
                if (!cancelled) setSnapshots(data.snapshots ?? [])
            } catch (err) {
                if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load the archive')
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        load()
        return () => {
            cancelled = true
        }
    }, [])

    return { snapshots, loading, error }
}

export default function TimeMachine(): JSX.Element {
    const { snapshots, loading, error } = useSnapshots()
    const [index, setIndex] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [frameLoading, setFrameLoading] = useState(true)

    const count = snapshots?.length ?? 0
    const current = snapshots && count > 0 ? snapshots[Math.min(index, count - 1)] : null

    // Start on the most recent snapshot once the archive loads.
    useEffect(() => {
        if (count > 0) setIndex(count - 1)
    }, [count])

    // Reset the loading overlay whenever we jump to a new snapshot.
    useEffect(() => {
        setFrameLoading(true)
    }, [current?.url])

    // Auto-advance through history, stopping at the present.
    useEffect(() => {
        if (!playing || count === 0) return
        if (index >= count - 1) {
            setPlaying(false)
            return
        }
        const timer = setTimeout(() => setIndex((i) => Math.min(i + 1, count - 1)), PLAY_INTERVAL)
        return () => clearTimeout(timer)
    }, [playing, index, count])

    const goTo = useCallback(
        (next: number) => {
            if (count === 0) return
            setPlaying(false)
            setIndex(Math.max(0, Math.min(next, count - 1)))
        },
        [count]
    )

    // One tick label per year, positioned along the slider.
    const yearTicks = useMemo(() => {
        if (!snapshots) return []
        const ticks: { year: string; percent: number }[] = []
        const seen = new Set<string>()
        snapshots.forEach((snap, i) => {
            const year = snap.timestamp.slice(0, 4)
            if (seen.has(year)) return
            seen.add(year)
            ticks.push({ year, percent: count > 1 ? (i / (count - 1)) * 100 : 0 })
        })
        return ticks
    }, [snapshots, count])

    const atStart = index <= 0
    const atEnd = index >= count - 1

    return (
        <>
            <SEO
                title="Time Machine - PostHog"
                description="Travel back through the history of posthog.com. Watch products, pricing, and design evolve — powered by the Internet Archive's Wayback Machine."
                image={`/images/og/default.png`}
            />
            <Explorer
                template="generic"
                slug="time-machine"
                showTitle={false}
                showAddressBar={false}
                headerBarOptions={[]}
                fullScreen
            >
                <div className="@container h-full flex flex-col bg-primary text-primary">
                    {/* Time machine console */}
                    <div
                        data-scheme="secondary"
                        className="bg-primary border-b border-primary px-3 py-2.5 flex flex-col gap-2.5"
                    >
                        <div className="flex items-center gap-3 flex-wrap">
                            <div className="flex items-center gap-2 shrink-0">
                                <IconRewindPlay className="size-5 text-red" />
                                <span className="font-semibold text-[15px]">Time Machine</span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0 rounded bg-accent border border-primary px-2 py-1 text-sm">
                                <span className="text-muted">posthog.com</span>
                                <span className="text-muted">·</span>
                                <span className="font-semibold tabular-nums">
                                    {current ? current.label : loading ? 'Loading archive…' : '—'}
                                </span>
                            </div>
                            <div className="flex-1" />
                            <div className="flex items-center gap-1 shrink-0">
                                <OSButton
                                    size="sm"
                                    icon={<IconChevronLeft />}
                                    tooltip="Older snapshot"
                                    disabled={atStart || count === 0}
                                    onClick={() => goTo(index - 1)}
                                />
                                <OSButton
                                    size="sm"
                                    icon={playing ? <IconPause /> : <IconPlay />}
                                    tooltip={playing ? 'Pause' : 'Play through history'}
                                    disabled={count === 0}
                                    onClick={() => {
                                        if (atEnd) {
                                            setIndex(0)
                                            setPlaying(true)
                                        } else {
                                            setPlaying((p) => !p)
                                        }
                                    }}
                                />
                                <OSButton
                                    size="sm"
                                    icon={<IconChevronRight />}
                                    tooltip="Newer snapshot"
                                    disabled={atEnd || count === 0}
                                    onClick={() => goTo(index + 1)}
                                />
                                {current && (
                                    <OSButton
                                        size="sm"
                                        icon={<IconExternal />}
                                        tooltip="Open this snapshot on archive.org"
                                        asLink
                                        external
                                        hideExternalIcon
                                        to={current.url.replace('if_/', '/')}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Timeline slider */}
                        {count > 0 && (
                            <div className="px-1 pt-0.5 pb-3.5 relative">
                                <Slider
                                    label="Timeline"
                                    min={0}
                                    max={count - 1}
                                    step={1}
                                    defaultValue={count - 1}
                                    value={[Math.min(index, count - 1)]}
                                    onValueChange={(v) => goTo(v[0])}
                                />
                                <div className="absolute inset-x-1 -bottom-0.5 h-3 pointer-events-none">
                                    {yearTicks.map((tick) => (
                                        <span
                                            key={tick.year}
                                            className="absolute -translate-x-1/2 text-[10px] text-muted tabular-nums"
                                            style={{ left: `${tick.percent}%` }}
                                        >
                                            {tick.year}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Snapshot viewport */}
                    <div className="relative flex-1 min-h-0 bg-accent">
                        {loading && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted">
                                <IconRefresh className="size-6 animate-spin" />
                                <p className="text-sm m-0">Rewinding the archive…</p>
                            </div>
                        )}

                        {!loading && error && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
                                <p className="font-semibold m-0">Couldn't reach the archive</p>
                                <p className="text-sm text-muted m-0 max-w-md">{error}</p>
                            </div>
                        )}

                        {!loading && !error && count === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center text-muted text-sm">
                                No archived snapshots found.
                            </div>
                        )}

                        {!loading && !error && current && (
                            <>
                                {frameLoading && (
                                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-accent text-muted">
                                        <IconRefresh className="size-6 animate-spin" />
                                        <p className="text-sm m-0">Loading {current.label}…</p>
                                    </div>
                                )}
                                <iframe
                                    key={current.url}
                                    src={current.url}
                                    title={`posthog.com in ${current.label}`}
                                    className="w-full h-full border-0 bg-white"
                                    referrerPolicy="no-referrer"
                                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                                    onLoad={() => setFrameLoading(false)}
                                />
                            </>
                        )}
                    </div>

                    {/* Footer hint */}
                    <div
                        data-scheme="secondary"
                        className="bg-primary border-t border-primary px-3 py-1.5 text-[11px] text-muted flex items-center gap-1.5 flex-wrap"
                    >
                        <span>
                            Drag the timeline to travel through {count > 0 ? `${count} ` : ''}archived snapshots of
                            posthog.com.
                        </span>
                        <span className="hidden @lg:inline">Some older pages may render imperfectly.</span>
                        <span className="flex-1" />
                        <a
                            href="https://web.archive.org/web/*/posthog.com"
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold flex items-center gap-1"
                        >
                            Internet Archive <IconExternal className="size-3" />
                        </a>
                    </div>
                </div>
            </Explorer>
        </>
    )
}
