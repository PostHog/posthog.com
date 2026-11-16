import React, { useCallback, useEffect, useRef, useState } from 'react'
import { IconFastForward, IconPauseFilled, IconPlayFilled } from '@posthog/icons'
import {
    IconClosedCaptions,
    IconClosedCaptionsFilled,
    IconFullScreen,
    IconPlayhead,
    IconVolumeFull,
    IconVolumeHalf,
    IconVolumeMuted,
} from 'components/OSIcons/Icons'
import OSButton from 'components/OSButton'
import { Select } from 'components/RadixUI/Select'
import ZoomHover from 'components/ZoomHover'
import type { LearnVideo } from './videos'
import './learnTV.css'

export interface TranscriptLine {
    id: string
    start: number
    text: string
}

/** What the player shares with the screen around it, so a transcript can follow the captions. */
export interface PlayerState {
    /** Every caption cue, by start time. */
    lines: TranscriptLine[]
    /** The cues on screen now. Overlapping cues can both be active. */
    activeIds: string[]
    /** Seek to a time and play. */
    playFrom: (time: number) => void
}

export const formatTime = (seconds: number): string =>
    `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60)
        .toString()
        .padStart(2, '0')}`

const roundButton =
    'rounded-full border-2 border-primary bg-primary flex justify-center items-center text-secondary hover:text-primary'
const barButton = 'text-sm font-semibold text-right dark:text-white'

/**
 * The Learn TV player: a Cloudinary MP4 with a WebVTT captions track and the MediaPlayer control bar. Both the
 * Learn TV window and product Learn hubs use it. `children` gets the caption cues, so a transcript matches the
 * captions exactly.
 */
export default function LearnTVPlayer({
    video,
    children,
}: {
    video: LearnVideo
    children?: (state: PlayerState) => React.ReactNode
}): JSX.Element {
    const videoRef = useRef<HTMLVideoElement>(null)
    const trackRef = useRef<HTMLTrackElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(100)
    const [isMuted, setIsMuted] = useState(false)
    const [playbackRate, setPlaybackRate] = useState(1)
    const [isScrubbing, setIsScrubbing] = useState(false)
    const [scrubTime, setScrubTime] = useState(0)
    // On by default, the same as the site's other captioned player (WistiaCustomPlayer).
    const [captionsOn, setCaptionsOn] = useState(true)
    const [lines, setLines] = useState<TranscriptLine[]>([])
    const [activeIds, setActiveIds] = useState<string[]>([])
    // The MP4 failed to load (network or decode error). Play does nothing until a retry reloads the source.
    const [loadError, setLoadError] = useState(false)

    // Read the cues from the captions track. "hidden" still loads cues and fires cuechange, so a transcript
    // keeps following along when captions are off.
    useEffect(() => {
        const trackElement = trackRef.current
        const textTrack = trackElement?.track
        if (!trackElement || !textTrack) return
        textTrack.mode = captionsOn ? 'showing' : 'hidden'

        const readCues = () => {
            const cues = Array.from(textTrack.cues ?? []) as VTTCue[]
            setLines(
                cues
                    .map((cue, index) => ({
                        id: cue.id || String(index),
                        start: cue.startTime,
                        text: cue.text.replace(/\s*\n\s*/g, ' '),
                    }))
                    .sort((a, b) => a.start - b.start)
            )
        }
        const readActive = () => {
            const cues = Array.from(textTrack.activeCues ?? []) as VTTCue[]
            const all = Array.from(textTrack.cues ?? [])
            setActiveIds(cues.map((cue) => cue.id || String(all.indexOf(cue))))
        }

        if (trackElement.readyState === 2 && textTrack.cues?.length) readCues()
        trackElement.addEventListener('load', readCues)
        textTrack.addEventListener('cuechange', readActive)
        return () => {
            trackElement.removeEventListener('load', readCues)
            textTrack.removeEventListener('cuechange', readActive)
        }
    }, [captionsOn])

    const seek = useCallback((time: number) => {
        const el = videoRef.current
        if (!el) return
        el.currentTime = Math.max(0, Math.min(time, el.duration || time))
        setCurrentTime(el.currentTime)
    }, [])

    const togglePlay = () => {
        const el = videoRef.current
        if (!el) return
        if (el.paused) void el.play().catch(() => setIsPlaying(false))
        else el.pause()
    }

    // load() refetches the source, which play() alone does not do after a fatal error.
    const retry = () => {
        const el = videoRef.current
        if (!el) return
        setLoadError(false)
        el.load()
        void el.play().catch(() => setIsPlaying(false))
    }

    const playFrom = useCallback(
        (time: number) => {
            seek(time)
            void videoRef.current?.play().catch(() => setIsPlaying(false))
        },
        [seek]
    )

    const toggleMute = () => {
        const el = videoRef.current
        if (!el) return
        el.muted = !el.muted
        if (!el.muted && el.volume === 0) el.volume = 1
    }

    const toggleFullscreen = () => {
        const el = videoRef.current as any
        if (!el) return
        if (document.fullscreenElement) void document.exitFullscreen()
        else if (el.requestFullscreen) void el.requestFullscreen()
        else el.webkitEnterFullscreen?.()
    }

    const shownTime = isScrubbing ? scrubTime : currentTime
    const endScrub = (event: React.SyntheticEvent<HTMLInputElement>) => {
        seek(Number(event.currentTarget.value))
        setIsScrubbing(false)
    }

    return (
        <>
            {/* The same layout and controls as components/MediaPlayer */}
            <section className="@container bg-accent px-2 pb-2" aria-label={`Video: ${video.title}`}>
                <div className="relative flex-1 flex flex-col justify-center items-center bg-primary mb-2">
                    <video
                        ref={videoRef}
                        src={video.src}
                        poster={video.poster}
                        preload="metadata"
                        playsInline
                        aria-label={`${video.title}, a video from the ${video.series} series`}
                        className="learn-tv-video w-full aspect-video bg-black cursor-pointer"
                        onClick={togglePlay}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onEnded={() => setIsPlaying(false)}
                        onLoadedMetadata={(e) => {
                            setLoadError(false)
                            setDuration(e.currentTarget.duration)
                        }}
                        onError={() => {
                            setLoadError(true)
                            setIsPlaying(false)
                        }}
                        onTimeUpdate={(e) => !isScrubbing && setCurrentTime(e.currentTarget.currentTime)}
                        onRateChange={(e) => setPlaybackRate(e.currentTarget.playbackRate)}
                        onVolumeChange={(e) => {
                            setVolume(Math.round(e.currentTarget.volume * 100))
                            setIsMuted(e.currentTarget.muted || e.currentTarget.volume === 0)
                        }}
                    >
                        <track
                            ref={trackRef}
                            kind="captions"
                            srcLang="en"
                            label="English"
                            src={video.captions}
                            default
                        />
                        <a href={video.src}>Download video: {video.title}</a>
                    </video>
                    {loadError && (
                        <div
                            role="alert"
                            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/80 p-4 text-center"
                        >
                            <p className="m-0 text-sm font-semibold text-white">The video didn't load.</p>
                            <OSButton variant="primary" size="md" onClick={retry}>
                                Try again
                            </OSButton>
                        </div>
                    )}
                </div>

                {/* Scrubbing bar */}
                <div className="w-full px-2 py-1 bg-primary border border-primary rounded-sm flex items-center gap-2">
                    <span className="text-sm font-semibold text-right dark:text-white w-24 shrink-0">
                        {formatTime(shownTime)} / {formatTime(duration)}
                    </span>
                    <div className="relative w-full flex-1">
                        <input
                            type="range"
                            min={0}
                            max={duration || 0}
                            step={0.1}
                            value={shownTime}
                            aria-label="Seek"
                            aria-valuetext={`${formatTime(shownTime)} of ${formatTime(duration)}`}
                            onMouseDown={() => {
                                setIsScrubbing(true)
                                setScrubTime(currentTime)
                            }}
                            onTouchStart={() => {
                                setIsScrubbing(true)
                                setScrubTime(currentTime)
                            }}
                            onChange={(e) => {
                                const time = Number(e.target.value)
                                setScrubTime(time)
                                // Keyboard changes have no mouseup, so seek right away.
                                if (!isScrubbing) seek(time)
                            }}
                            onMouseUp={endScrub}
                            onTouchEnd={endScrub}
                            className="quicktime-scrubber"
                        />
                        <div
                            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            style={{ left: `${duration ? (shownTime / duration) * 100 : 0}%` }}
                        >
                            <IconPlayhead className="w-[11px] h-[15px] shrink-0" />
                        </div>
                    </div>
                </div>

                {/* Control bar */}
                <div className="flex items-center px-2 @md:px-4 py-2 bg-accent border-t border-primary gap-1 @md:gap-2">
                    <div className="flex flex-row gap-1 @md:gap-2 items-center shrink-0">
                        <button onClick={toggleMute} className={barButton} aria-label={isMuted ? 'Unmute' : 'Mute'}>
                            {isMuted ? (
                                <IconVolumeMuted className="size-6" />
                            ) : volume > 50 ? (
                                <IconVolumeFull className="size-6" />
                            ) : (
                                <IconVolumeHalf className="size-6" />
                            )}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={isMuted ? 0 : volume}
                            aria-label="Volume"
                            onChange={(e) => {
                                const el = videoRef.current
                                if (!el) return
                                el.volume = Number(e.target.value) / 100
                                el.muted = el.volume === 0
                            }}
                            className="hidden @md:block w-24 volume-slider"
                            style={{ accentColor: 'currentColor' }}
                        />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-row gap-1 @md:gap-2 items-center justify-center">
                        <ZoomHover size="md">
                            <button
                                onClick={() => seek(currentTime - 10)}
                                className={`size-10 ${roundButton}`}
                                aria-label="Back 10 seconds"
                            >
                                <IconFastForward className="size-6 scale-x-[-1]" />
                            </button>
                        </ZoomHover>
                        <ZoomHover size="md">
                            <button
                                onClick={togglePlay}
                                className={`size-12 ${roundButton}`}
                                aria-label={isPlaying ? 'Pause' : 'Play'}
                            >
                                {isPlaying ? (
                                    <IconPauseFilled className="size-8" />
                                ) : (
                                    <IconPlayFilled className="size-8" />
                                )}
                            </button>
                        </ZoomHover>
                        <ZoomHover size="md">
                            <button
                                onClick={() => seek(currentTime + 10)}
                                className={`size-10 ${roundButton}`}
                                aria-label="Forward 10 seconds"
                            >
                                <IconFastForward className="size-6" />
                            </button>
                        </ZoomHover>
                    </div>
                    <div className="flex flex-row gap-1 @md:gap-2 justify-end items-center shrink-0">
                        <div className="hidden @md:block">
                            <Select
                                value={playbackRate.toString()}
                                onValueChange={(value) => {
                                    if (videoRef.current) videoRef.current.playbackRate = parseFloat(value)
                                }}
                                groups={[
                                    {
                                        label: 'Playback Speed',
                                        items: [
                                            { value: '0.5', label: '0.5x' },
                                            { value: '1', label: '1x' },
                                            { value: '1.5', label: '1.5x' },
                                            { value: '2', label: '2x' },
                                        ],
                                    },
                                ]}
                                className={barButton}
                            />
                        </div>
                        <button
                            onClick={() => setCaptionsOn((on) => !on)}
                            className={barButton}
                            aria-label="Captions"
                            aria-pressed={captionsOn}
                            title={captionsOn ? 'Hide captions' : 'Show captions'}
                        >
                            {captionsOn ? (
                                <IconClosedCaptionsFilled className="size-6" />
                            ) : (
                                <IconClosedCaptions className="size-6" />
                            )}
                        </button>
                        <button onClick={toggleFullscreen} className={barButton} aria-label="Full screen">
                            <IconFullScreen className="size-5" />
                        </button>
                    </div>
                </div>
            </section>
            {children?.({ lines, activeIds, playFrom })}
        </>
    )
}
