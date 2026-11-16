import React, { useState } from 'react'
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
import { Select } from 'components/RadixUI/Select'
import ZoomHover from 'components/ZoomHover'

export const formatTime = (seconds: number): string =>
    `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60)
        .toString()
        .padStart(2, '0')}`

const roundButton =
    'rounded-full border-2 border-primary bg-primary flex justify-center items-center text-secondary hover:text-primary'
const barButton = 'text-sm font-semibold text-right dark:text-white'

const PLAYBACK_RATES = ['0.5', '1', '1.5', '2']
/** Seconds that an arrow key moves the scrubber. */
const KEY_STEP = 5

export interface MediaControlsProps {
    /** Seconds. */
    currentTime: number
    /** Seconds. 0 until the player knows it. */
    duration: number
    isPlaying: boolean
    /** 0–100. */
    volume: number
    isMuted: boolean
    playbackRate: number
    /** Seek to a time in seconds. Called on release of the scrubber, on each keyboard step, and for ±10 seconds. */
    onSeek: (time: number) => void
    onTogglePlay: () => void
    onToggleMute: () => void
    /** 0–100. */
    onVolumeChange: (volume: number) => void
    onPlaybackRateChange: (rate: number) => void
    onFullscreen: () => void
    /** Shows a captions toggle. Omit it for players without captions. */
    captions?: { on: boolean; onToggle: () => void }
}

/**
 * The scrub bar and control bar for the site's video players (`MediaPlayer` and Learn TV). The player owns playback
 * and passes its state and callbacks. Every control is a native button or range input with a label, so it works with
 * the keyboard and with screen readers. Place it inside an `@container` element: narrow players hide the volume
 * slider and the speed menu.
 */
export default function MediaControls({
    currentTime,
    duration,
    isPlaying,
    volume,
    isMuted,
    playbackRate,
    onSeek,
    onTogglePlay,
    onToggleMute,
    onVolumeChange,
    onPlaybackRateChange,
    onFullscreen,
    captions,
}: MediaControlsProps): JSX.Element {
    // While the pointer drags the scrubber, show the drag position and seek only on release.
    const [isScrubbing, setIsScrubbing] = useState(false)
    const [scrubTime, setScrubTime] = useState(0)
    const shownTime = isScrubbing ? scrubTime : currentTime

    const startScrub = () => {
        setIsScrubbing(true)
        setScrubTime(currentTime)
    }
    const endScrub = (event: React.SyntheticEvent<HTMLInputElement>) => {
        onSeek(Number(event.currentTarget.value))
        setIsScrubbing(false)
    }

    return (
        <>
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
                        onMouseDown={startScrub}
                        onTouchStart={startScrub}
                        onChange={(e) => {
                            const time = Number(e.target.value)
                            setScrubTime(time)
                            // Keyboard changes have no mouseup, so seek right away.
                            if (!isScrubbing) onSeek(time)
                        }}
                        onKeyDown={(e) => {
                            // The 0.1 s step is for smooth dragging. Keys jump like other video players.
                            const target = {
                                ArrowLeft: currentTime - KEY_STEP,
                                ArrowDown: currentTime - KEY_STEP,
                                ArrowRight: currentTime + KEY_STEP,
                                ArrowUp: currentTime + KEY_STEP,
                                Home: 0,
                                End: duration,
                            }[e.key]
                            if (target === undefined) return
                            e.preventDefault()
                            onSeek(Math.max(0, Math.min(target, duration || target)))
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
                    <button onClick={onToggleMute} className={barButton} aria-label={isMuted ? 'Unmute' : 'Mute'}>
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
                        onChange={(e) => onVolumeChange(Number(e.target.value))}
                        className="hidden @md:block w-24 volume-slider"
                        style={{ accentColor: 'currentColor' }}
                    />
                </div>
                <div className="flex-1 min-w-0 flex flex-row gap-1 @md:gap-2 items-center justify-center">
                    <ZoomHover size="md">
                        <button
                            onClick={() => onSeek(currentTime - 10)}
                            className={`size-10 ${roundButton}`}
                            aria-label="Back 10 seconds"
                        >
                            <IconFastForward className="size-6 scale-x-[-1]" />
                        </button>
                    </ZoomHover>
                    <ZoomHover size="md">
                        <button
                            onClick={onTogglePlay}
                            className={`size-12 ${roundButton}`}
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                            {isPlaying ? <IconPauseFilled className="size-8" /> : <IconPlayFilled className="size-8" />}
                        </button>
                    </ZoomHover>
                    <ZoomHover size="md">
                        <button
                            onClick={() => onSeek(currentTime + 10)}
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
                            onValueChange={(value) => onPlaybackRateChange(parseFloat(value))}
                            groups={[
                                {
                                    label: 'Playback Speed',
                                    items: PLAYBACK_RATES.map((rate) => ({ value: rate, label: `${rate}x` })),
                                },
                            ]}
                            className={barButton}
                        />
                    </div>
                    {captions && (
                        <button
                            onClick={captions.onToggle}
                            className={barButton}
                            aria-label="Captions"
                            aria-pressed={captions.on}
                            title={captions.on ? 'Hide captions' : 'Show captions'}
                        >
                            {captions.on ? (
                                <IconClosedCaptionsFilled className="size-6" />
                            ) : (
                                <IconClosedCaptions className="size-6" />
                            )}
                        </button>
                    )}
                    <button onClick={onFullscreen} className={barButton} aria-label="Full screen">
                        <IconFullScreen className="size-5" />
                    </button>
                </div>
            </div>
        </>
    )
}
