import React, { useEffect, useRef, useState } from 'react'
import { IconPauseFilled, IconPlayFilled } from '@posthog/icons'
import OSButton from 'components/OSButton'
import usePostHog from 'hooks/usePostHog'
import { IconFullScreen, IconVolumeFull, IconVolumeMuted } from 'components/OSIcons/Icons'
import { Select } from 'components/RadixUI/Select'
import { renderFrame } from './engine'
import PlayOverlay from './PlayOverlay'
import ChapterCard from './ChapterCard'
import { CHAPTERS, INITIAL_STATE, Player, SPEEDS, chapterAt, formatTime } from './player'
import type { PlayerState, Speed } from './player'
import { FPS, FRAMES } from './timeline'

const SEEK_SECONDS = 5
const VIDEO = {
    video_source: 'canvas',
    video_id: 'mcp-analytics-8-bit-tale',
    video_title: 'MCP analytics: an 8-bit tale',
}

export default function Video({ className }: { className: string }): JSX.Element {
    const root = useRef<HTMLDivElement>(null)
    const canvas = useRef<HTMLCanvasElement>(null)
    const previewCanvas = useRef<HTMLCanvasElement>(null)
    const player = useRef<Player>()
    const clickTimer = useRef<ReturnType<typeof setTimeout>>()
    const [state, setState] = useState<PlayerState>(INITIAL_STATE)
    const [fullscreen, setFullscreen] = useState(false)
    const [hover, setHover] = useState<{ frame: number; left: number } | null>(null)
    const { frame, status, speed, muted } = state

    useEffect(() => {
        if (!canvas.current) return
        const p = new Player(canvas.current, setState)
        player.current = p
        return () => p.destroy()
    }, [])

    const posthog = usePostHog()
    const played = useRef(false)
    const chaptersReached = useRef(new Set<number>())
    const chapterIndex = CHAPTERS.indexOf(chapterAt(frame))

    useEffect(() => {
        if (status === 'ended') posthog?.capture('Completed video', VIDEO)
        if (status !== 'playing' || played.current) return
        played.current = true
        posthog?.capture('Played video', VIDEO)
    }, [status])

    useEffect(() => {
        if (status !== 'playing' || chaptersReached.current.has(chapterIndex)) return
        chaptersReached.current.add(chapterIndex)
        posthog?.capture('Video chapter reached', {
            ...VIDEO,
            chapter_index: chapterIndex,
            chapter_name: CHAPTERS[chapterIndex].name,
        })
    }, [status, chapterIndex])

    useEffect(() => {
        const sync = (): void => setFullscreen(document.fullscreenElement === root.current)
        document.addEventListener('fullscreenchange', sync)
        return () => document.removeEventListener('fullscreenchange', sync)
    }, [])

    useEffect(() => {
        if (hover && previewCanvas.current) renderFrame(hover.frame, previewCanvas.current)
    }, [hover?.frame])

    useEffect(() => () => clearTimeout(clickTimer.current), [])

    const toggleFullscreen = (): void => {
        if (!document.fullscreenEnabled) return
        if (document.fullscreenElement) void document.exitFullscreen()
        else root.current?.requestFullscreen().catch(() => undefined)
    }

    // One click toggles play; a double click goes fullscreen instead, so the single click waits to see if a second follows.
    const onCanvasClick = (): void => {
        clearTimeout(clickTimer.current)
        clickTimer.current = setTimeout(() => player.current?.toggle(), 250)
    }
    const onCanvasDoubleClick = (): void => {
        clearTimeout(clickTimer.current)
        toggleFullscreen()
    }

    const onScrubberMove = (e: React.MouseEvent<HTMLDivElement>): void => {
        const { left, width } = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - left
        setHover({
            frame: Math.round(Math.max(0, Math.min(1, x / width)) * (FRAMES - 1)),
            left: Math.max(128, Math.min(width - 128, x)),
        })
    }

    // Handled in the bubble phase, and only for events from inside the player, but not the open speed menu, which keeps its own keys.
    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        const p = player.current
        if (
            !p ||
            e.defaultPrevented ||
            e.metaKey ||
            e.ctrlKey ||
            e.altKey ||
            !e.currentTarget.contains(e.target as Node) ||
            (e.target as HTMLElement).closest('[role="listbox"]')
        )
            return
        const onButton = (e.target as HTMLElement).tagName === 'BUTTON'
        if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
            p.seek(p.state.frame + (e.code === 'ArrowRight' ? 1 : -1) * SEEK_SECONDS * FPS)
        } else if (e.code === 'Space' && !onButton) p.toggle()
        else if (e.code === 'KeyF') toggleFullscreen()
        else if (e.code === 'Comma' || e.code === 'Period') p.step(e.code === 'Period' ? 1 : -1)
        else return
        e.preventDefault()
    }

    return (
        <div
            ref={root}
            tabIndex={0}
            onKeyDown={onKeyDown}
            className={`@container flex flex-col rounded border border-primary bg-primary text-primary outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red ${className}`}
        >
            <div className={`relative bg-black ${fullscreen ? 'min-h-0 flex-1' : 'aspect-video'}`}>
                <canvas
                    ref={canvas}
                    width={1920}
                    height={1080}
                    onClick={onCanvasClick}
                    onDoubleClick={onCanvasDoubleClick}
                    role="img"
                    aria-label="MCP analytics: an 8-bit tale, an animated video"
                    className="size-full cursor-pointer object-contain [image-rendering:pixelated]"
                />
                {status !== 'playing' && <PlayOverlay />}
            </div>
            <div className="flex flex-col gap-2 p-2">
                <div>
                    <div className="relative" onMouseMove={onScrubberMove} onMouseLeave={() => setHover(null)}>
                        {hover && (
                            <div
                                className="pointer-events-none absolute bottom-full z-10 mb-2 -translate-x-1/2 border-2 border-primary bg-primary p-1"
                                style={{ left: hover.left }}
                            >
                                <canvas
                                    ref={previewCanvas}
                                    width={640}
                                    height={360}
                                    className="block w-64 [image-rendering:pixelated]"
                                />
                                <div className="whitespace-nowrap pt-1 text-xs">
                                    {formatTime(hover.frame)} · {chapterAt(hover.frame).name}
                                </div>
                            </div>
                        )}
                        <input
                            type="range"
                            aria-label="Seek"
                            aria-valuetext={formatTime(frame)}
                            min={0}
                            max={FRAMES - 1}
                            step={1}
                            value={frame}
                            onChange={(e) => player.current?.seek(Number(e.target.value))}
                            className="block w-full accent-red"
                        />
                    </div>
                    <div className="relative h-2">
                        {CHAPTERS.slice(1).map((c) => (
                            <div
                                key={c.start}
                                className="absolute top-0 h-2 w-0.5 bg-border"
                                style={{ left: `${(c.start / (FRAMES - 1)) * 100}%` }}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <OSButton
                        variant="primary"
                        size="md"
                        icon={status === 'playing' ? <IconPauseFilled /> : <IconPlayFilled />}
                        onClick={() => player.current?.toggle()}
                    >
                        {status === 'playing' ? 'Pause' : status === 'loading' ? 'Loading…' : 'Play'}
                    </OSButton>
                    <span className="text-sm tabular-nums text-secondary">
                        {formatTime(frame)} / {formatTime(FRAMES)}
                    </span>
                    <div className="ml-auto flex items-center gap-1">
                        <Select
                            ariaLabel="Playback speed"
                            value={String(speed)}
                            onValueChange={(v) => player.current?.setSpeed(Number(v) as Speed)}
                            groups={[
                                {
                                    label: 'Playback speed',
                                    items: SPEEDS.map((s) => ({ value: String(s), label: `${s}x` })),
                                },
                            ]}
                            className="text-sm"
                            portalContainer={fullscreen ? root.current : undefined}
                        />
                        <OSButton
                            size="md"
                            aria-label={muted ? 'Unmute' : 'Mute'}
                            tooltip={muted ? 'Unmute' : 'Mute'}
                            icon={muted ? <IconVolumeMuted /> : <IconVolumeFull />}
                            onClick={() => player.current?.setMuted(!muted)}
                        />
                        {document.fullscreenEnabled && (
                            <OSButton
                                size="md"
                                aria-label="Fullscreen"
                                tooltip="Fullscreen (F)"
                                icon={<IconFullScreen />}
                                onClick={toggleFullscreen}
                            />
                        )}
                    </div>
                </div>
                {!fullscreen && (
                    <div className="grid grid-cols-2 gap-2 @md:grid-cols-4 @2xl:grid-cols-7">
                        {CHAPTERS.map((c, i) => (
                            <ChapterCard
                                key={c.start}
                                chapter={c}
                                active={i === chapterIndex}
                                progress={Math.round(
                                    Math.max(0, Math.min(1, (frame - c.start) / (c.end - c.start))) * 100
                                )}
                                onSelect={(start) => player.current?.seek(start)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
