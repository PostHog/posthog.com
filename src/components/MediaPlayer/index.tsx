import { IconFastForward, IconPauseFilled, IconPlayFilled } from '@posthog/icons'
import { IconFullScreen, IconPlayhead, IconVolumeFull, IconVolumeHalf, IconVolumeMuted } from 'components/OSIcons/Icons'
import { Select } from 'components/RadixUI/Select'
import ZoomHover from 'components/ZoomHover'
import React, { useEffect, useRef, useState } from 'react'

// Add types for YouTube API to avoid TS errors
declare global {
    interface Window {
        YT: any
        onYouTubeIframeAPIReady: (() => void) | null
    }
}

interface MediaPlayerProps {
    videoId: string
}

export default function MediaPlayer({ videoId }: MediaPlayerProps) {
    const [playerState, setPlayerState] = useState({
        isPlaying: true,
        player: null as any,
        volume: 100,
        isMuted: false,
        currentTime: 0,
        duration: 0,
        playbackRate: 1,
    })
    const [isScrubbing, setIsScrubbing] = useState(false)
    const [scrubTime, setScrubTime] = useState(0)
    const [isSeeking, setIsSeeking] = useState(false)
    const seekSuppressTimeout = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null
        if (playerState.player && playerState.isPlaying && !isScrubbing && !isSeeking) {
            interval = setInterval(() => {
                const currentTime = playerState.player.getCurrentTime()
                setPlayerState((prev) => ({ ...prev, currentTime }))
            }, 250)
        }
        return () => {
            if (interval) clearInterval(interval)
        }
    }, [playerState.player, playerState.isPlaying, isScrubbing, isSeeking])

    useEffect(() => {
        window.onYouTubeIframeAPIReady = () => {
            const player = new window.YT.Player('youtube-player-demo', {
                host: 'https://www.youtube-nocookie.com',
                videoId,
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    modestbranding: 1,
                    rel: 0,
                },
                events: {
                    onStateChange: (event: any) => {
                        setPlayerState((prev: any) => ({
                            ...prev,
                            isPlaying: event.data === window.YT.PlayerState.PLAYING,
                        }))
                    },
                    onReady: (event: any) => {
                        setPlayerState((prev: any) => ({
                            ...prev,
                            player: event.target,
                            duration: event.target.getDuration(),
                            currentTime: event.target.getCurrentTime(),
                        }))
                        event.target.playVideo()
                    },
                    onPlaybackRateChange: (event: any) => {
                        setPlayerState((prev: any) => ({
                            ...prev,
                            playbackRate: event.target.getPlaybackRate(),
                        }))
                    },
                },
            })
        }
        if (!window.YT) {
            const tag = document.createElement('script')
            tag.src = 'https://www.youtube.com/iframe_api'
            const firstScriptTag = document.getElementsByTagName('script')[0]
            if (firstScriptTag && firstScriptTag.parentNode) {
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
            } else {
                document.body.appendChild(tag)
            }
        } else if (window.YT && window.YT.Player) {
            window.onYouTubeIframeAPIReady()
        }
        return () => {
            window.onYouTubeIframeAPIReady = null
        }
    }, [])

    const handlePlayPause = () => {
        if (playerState.player) {
            if (playerState.isPlaying) {
                playerState.player.pauseVideo()
            } else {
                playerState.player.playVideo()
            }
        }
    }

    const performSeek = (newTime: number) => {
        if (!playerState.player) return

        const clamped = Math.max(0, Math.min(newTime, playerState.duration || newTime))

        setIsSeeking(true)
        playerState.player.seekTo(clamped, true)
        setPlayerState((prev) => ({ ...prev, currentTime: clamped }))

        if (seekSuppressTimeout.current) clearTimeout(seekSuppressTimeout.current)

        seekSuppressTimeout.current = setTimeout(() => setIsSeeking(false), 400)
    }

    const handleSeek = (seconds: number) => {
        if (!playerState.player) return
        const currentTime = playerState.player.getCurrentTime()
        performSeek(currentTime + seconds)
    }

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const volume = Number(event.target.value)
        if (playerState.player) {
            playerState.player.setVolume(volume)
            setPlayerState((prev: any) => ({
                ...prev,
                volume,
                isMuted: volume === 0,
            }))
        }
    }

    const toggleMute = () => {
        if (playerState.player) {
            if (playerState.isMuted) {
                playerState.player.unMute()
            } else {
                playerState.player.mute()
            }
            setPlayerState((prev: any) => ({
                ...prev,
                isMuted: !prev.isMuted,
            }))
        }
    }

    const toggleFullscreen = () => {
        const iframe = document.getElementById('youtube-player-demo') as any
        if (iframe?.requestFullscreen) {
            iframe.requestFullscreen()
        } else if (iframe?.mozRequestFullScreen) {
            iframe.mozRequestFullScreen()
        } else if (iframe?.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen()
        } else if (iframe?.msRequestFullscreen) {
            iframe.msRequestFullscreen()
        }
    }

    const handlePlaybackRateChange = (rate: number) => {
        if (playerState.player) {
            playerState.player.setPlaybackRate(rate)
            setPlayerState((prev: any) => ({
                ...prev,
                playbackRate: rate,
            }))
        }
    }

    // Scrubbing handlers
    const handleScrubStart = () => {
        setIsScrubbing(true)
        setScrubTime(playerState.currentTime)
    }
    const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
        setScrubTime(Number(e.target.value))
    }
    const handleScrubEndMouse = (e: React.MouseEvent<HTMLInputElement>) => {
        const newTime = Number((e.target as HTMLInputElement).value)
        setScrubTime(newTime)
        performSeek(newTime)
        setIsScrubbing(false)
    }
    const handleScrubEndTouch = (e: React.TouchEvent<HTMLInputElement>) => {
        const newTime = Number((e.target as HTMLInputElement).value)
        setScrubTime(newTime)
        performSeek(newTime)
        setIsScrubbing(false)
    }

    useEffect(() => {
        return () => {
            if (!seekSuppressTimeout.current) return

            clearTimeout(seekSuppressTimeout.current)
        }
    }, [])

    return (
        <div className="@container w-full h-full flex flex-col min-h-1">
            <div data-scheme="secondary" className={`flex flex-grow min-h-0`}>
                <main
                    data-app="MediaPlayer"
                    data-scheme="primary"
                    className="@container flex-1 bg-primary relative h-full"
                >
                    <section className="bg-accent px-2 pb-2">
                        {/* Main video area */}
                        <div className="flex-1 flex flex-col justify-center items-center bg-primary mb-2">
                            <div id="youtube-player-demo" className="rounded w-full aspect-video" />
                        </div>

                        {/* Scrubbing bar */}
                        <div className="w-full px-2 py-1 bg-[#EFF7DE] border border-primary rounded-sm flex items-center gap-2">
                            <span className="text-sm font-semibold text-right dark:text-yellow w-24">
                                {Math.floor((isScrubbing ? scrubTime : playerState.currentTime) / 60)}:
                                {Math.floor((isScrubbing ? scrubTime : playerState.currentTime) % 60)
                                    .toString()
                                    .padStart(2, '0')}{' '}
                                / {Math.floor(playerState.duration / 60)}:
                                {Math.floor(playerState.duration % 60)
                                    .toString()
                                    .padStart(2, '0')}
                            </span>
                            <div className="relative w-full flex-1">
                                <input
                                    type="range"
                                    min={0}
                                    max={playerState.duration || 0}
                                    value={isScrubbing ? scrubTime : playerState.currentTime}
                                    onMouseDown={handleScrubStart}
                                    onTouchStart={handleScrubStart}
                                    onChange={handleScrub}
                                    onMouseUp={handleScrubEndMouse}
                                    onTouchEnd={handleScrubEndTouch}
                                    className={`quicktime-scrubber`}
                                    step={0.1}
                                />
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
                                    style={{
                                        left: `calc(${
                                            ((isScrubbing ? scrubTime : playerState.currentTime) /
                                                playerState.duration) *
                                            100
                                        }% + 5.5px)`,
                                    }}
                                >
                                    <IconPlayhead className="w-[11px] h-[15px]" />
                                </div>
                            </div>
                        </div>

                        {/* Control bar */}
                        <div className="grid grid-cols-12 px-4 py-2 bg-accent border-t border-primary gap-2">
                            <div className="col-span-3 flex flex-row gap-2 items-center">
                                <button
                                    onClick={toggleMute}
                                    className="text-sm font-semibold text-right dark:text-yellow"
                                >
                                    {playerState.isMuted ? (
                                        <IconVolumeMuted className="size-6" />
                                    ) : playerState.volume > 50 ? (
                                        <IconVolumeFull className="size-6" />
                                    ) : (
                                        <IconVolumeHalf className="size-6" />
                                    )}
                                </button>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={playerState.volume}
                                    onChange={handleVolumeChange}
                                    className="w-24 volume-slider"
                                    style={{
                                        accentColor: 'currentColor',
                                    }}
                                />
                            </div>
                            <div className="col-span-6 flex flex-row gap-2 items-center justify-center">
                                <ZoomHover size="md">
                                    <button
                                        onClick={() => handleSeek(-10)}
                                        className="size-10 rounded-full border-2 border-primary bg-primary flex justify-center items-center text-secondary hover:text-primary"
                                    >
                                        <IconFastForward className="size-6 scale-x-[-1]" />
                                    </button>
                                </ZoomHover>
                                <ZoomHover size="md">
                                    <button
                                        onClick={handlePlayPause}
                                        className="size-12 rounded-full border-2 border-primary bg-primary flex items-center text-secondary hover:text-primary justify-center"
                                    >
                                        {playerState.isPlaying ? (
                                            <IconPauseFilled className="size-8" />
                                        ) : (
                                            <IconPlayFilled className="size-8" />
                                        )}
                                    </button>
                                </ZoomHover>
                                <ZoomHover size="md">
                                    <button
                                        onClick={() => handleSeek(10)}
                                        className="size-10 rounded-full border-2 border-primary bg-primary flex justify-center items-center text-secondary hover:text-primary"
                                    >
                                        <IconFastForward className="size-6" />
                                    </button>
                                </ZoomHover>
                            </div>
                            <div className="col-span-3 flex flex-row gap-2 justify-end items-center">
                                <Select
                                    value={playerState.playbackRate.toString()}
                                    onValueChange={(value) => handlePlaybackRateChange(parseFloat(value))}
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
                                    className="text-sm font-semibold text-right dark:text-yellow"
                                />
                                <button
                                    onClick={toggleFullscreen}
                                    className="text-sm font-semibold text-right dark:text-yellow"
                                >
                                    <IconFullScreen className="size-5" />
                                </button>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}
