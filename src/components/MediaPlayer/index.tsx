import MediaControls from 'components/MediaControls'
import OSButton from 'components/OSButton'
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
// Add types for YouTube and Wistia APIs to avoid TS errors
declare global {
    interface Window {
        YT: any
        onYouTubeIframeAPIReady: (() => void) | null
        Wistia: any
        _wq: any[]
    }
}

interface MediaPlayerProps {
    videoId: string
    source?: 'youtube' | 'wistia'
    startTime?: number
    borderRadius?: boolean
    /** Wistia only. Shows the captions uploaded to the Wistia media, on by default, with a CC toggle. */
    captions?: boolean
    /** Called with the playback position in seconds, for example to follow along in a transcript. */
    onTimeUpdate?: (seconds: number) => void
}

/** Control the player from outside, for example to play from a transcript line. */
export interface MediaPlayerHandle {
    /** Seek to a time in seconds and play. */
    playFrom: (seconds: number) => void
}

/** Turns the captions of a Wistia video on or off. Returns false if the captions plugin is not ready yet. */
function setWistiaCaptions(video: any, on: boolean): boolean {
    const plugin = video?.plugin?.captions
    if (!plugin) return false
    if (on) plugin.show?.() ?? plugin.enable?.()
    else plugin.hide?.() ?? plugin.disable?.()
    return true
}

const MediaPlayer = React.forwardRef<MediaPlayerHandle, MediaPlayerProps>(function MediaPlayer(
    { videoId, source = 'youtube', startTime = 0, borderRadius = true, captions = false, onTimeUpdate },
    ref
) {
    const [playerState, setPlayerState] = useState({
        isPlaying: true,
        player: null as any,
        volume: 100,
        isMuted: false,
        currentTime: 0,
        duration: 0,
        playbackRate: 1,
    })
    const [isSeeking, setIsSeeking] = useState(false)
    const [captionsOn, setCaptionsOn] = useState(captions)
    // The player script did not load. Retry adds the script again.
    const [loadFailed, setLoadFailed] = useState(false)
    const [reloadKey, setReloadKey] = useState(0)
    const seekSuppressTimeout = useRef<NodeJS.Timeout | null>(null)
    const containerRef = React.useRef<HTMLDivElement>(null)

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null
        if (playerState.player && playerState.isPlaying && !isSeeking) {
            interval = setInterval(() => {
                let currentTime = 0
                if (source === 'youtube') {
                    currentTime = playerState.player.getCurrentTime()
                } else if (source === 'wistia') {
                    currentTime = playerState.player.time()
                }
                setPlayerState((prev) => ({ ...prev, currentTime }))
            }, 250)
        }
        return () => {
            if (interval) clearInterval(interval)
        }
    }, [playerState.player, playerState.isPlaying, isSeeking, source])

    useEffect(() => {
        if (source === 'youtube') {
            // YouTube player initialization
            window.onYouTubeIframeAPIReady = () => {
                const player = new window.YT.Player(`video-player-iframe-${videoId}`, {
                    host: 'https://www.youtube-nocookie.com',
                    videoId,
                    playerVars: {
                        autoplay: 1,
                        controls: 0,
                        modestbranding: 1,
                        rel: 0,
                        start: startTime,
                        iv_load_policy: 3,
                        fs: 1,
                    },
                    height: undefined,
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
                tag.onerror = () => {
                    tag.remove()
                    setLoadFailed(true)
                }
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
        } else if (source === 'wistia') {
            // Wistia player initialization
            if (typeof window === 'undefined' || !containerRef.current) return

            const initializeWistiaPlayer = () => {
                const embedDiv = document.createElement('div')
                embedDiv.className = `wistia_embed wistia_async_${videoId} videoFoam=true`
                embedDiv.id = `video-player-iframe-${videoId}`
                embedDiv.style.width = '100%'
                embedDiv.style.height = '100%'

                if (containerRef.current) {
                    containerRef.current.innerHTML = ''
                    containerRef.current.appendChild(embedDiv)
                }

                window._wq = window._wq || []
                window._wq.push({
                    id: videoId,
                    options: {
                        autoPlay: true,
                        muted: false,
                        controlsVisibleOnLoad: false,
                        playButton: false,
                        playbar: false,
                        volumeControl: false,
                        fullscreenButton: false,
                        settingsControl: false,
                        qualityControl: false,
                        smallPlayButton: false,
                        bigPlayButton: false,
                        playerColor: '000000',
                        ...(borderRadius ? {} : { playerBorderRadius: 0, roundedPlayer: 0 }),
                        ...(captions ? { plugin: { 'captions-v1': { onByDefault: true } } } : {}),
                    },
                    onReady: (video: any) => {
                        if (!borderRadius) {
                            video.setPlayerBorderRadius?.(0)
                            video.setRoundedPlayer?.(0)
                        }

                        setPlayerState((prev: any) => ({
                            ...prev,
                            player: video,
                            duration: video.duration(),
                            currentTime: startTime,
                            volume: video.volume() * 100,
                            isMuted: video.volume() === 0,
                        }))

                        if (startTime > 0) {
                            video.time(startTime)
                        }

                        video.play()

                        video.bind('play', () => setPlayerState((prev: any) => ({ ...prev, isPlaying: true })))
                        video.bind('pause', () => setPlayerState((prev: any) => ({ ...prev, isPlaying: false })))
                        video.bind('end', () => setPlayerState((prev: any) => ({ ...prev, isPlaying: false })))
                        video.bind('timechange', (t: number) => {
                            setPlayerState((prev: any) => ({ ...prev, currentTime: t }))
                        })
                        video.bind('volumechange', (v: number) => {
                            setPlayerState((prev: any) => ({
                                ...prev,
                                volume: v * 100,
                                isMuted: v === 0,
                            }))
                        })
                    },
                })
            }

            if (!window.Wistia) {
                const script = document.createElement('script')
                script.src = 'https://fast.wistia.com/assets/external/E-v1.js'
                script.async = true
                script.onload = initializeWistiaPlayer
                script.onerror = () => {
                    script.remove()
                    setLoadFailed(true)
                }
                document.head.appendChild(script)
            } else {
                initializeWistiaPlayer()
            }
        }
    }, [videoId, source, startTime, borderRadius, reloadKey])

    const handlePlayPause = () => {
        if (playerState.player) {
            if (source === 'youtube') {
                if (playerState.isPlaying) {
                    playerState.player.pauseVideo()
                } else {
                    playerState.player.playVideo()
                }
            } else if (source === 'wistia') {
                if (playerState.isPlaying) {
                    playerState.player.pause()
                } else {
                    playerState.player.play()
                }
            }
        }
    }

    const performSeek = (newTime: number) => {
        if (!playerState.player) return

        const clamped = Math.max(0, Math.min(newTime, playerState.duration || newTime))

        setIsSeeking(true)
        if (source === 'youtube') {
            playerState.player.seekTo(clamped, true)
        } else if (source === 'wistia') {
            playerState.player.time(clamped)
        }
        setPlayerState((prev) => ({ ...prev, currentTime: clamped }))

        if (seekSuppressTimeout.current) clearTimeout(seekSuppressTimeout.current)

        seekSuppressTimeout.current = setTimeout(() => setIsSeeking(false), 400)
    }

    const handleVolumeChange = (volume: number) => {
        if (playerState.player) {
            if (source === 'youtube') {
                playerState.player.setVolume(volume)
                // YouTube keeps its mute state when the volume changes, so a muted player stays silent.
                if (volume > 0 && (playerState.isMuted || playerState.player.isMuted?.())) playerState.player.unMute()
            } else if (source === 'wistia') {
                playerState.player.volume(volume / 100)
            }
            setPlayerState((prev: any) => ({
                ...prev,
                volume,
                isMuted: volume === 0,
            }))
        }
    }

    const toggleMute = () => {
        if (playerState.player) {
            if (source === 'youtube') {
                if (playerState.isMuted) {
                    playerState.player.unMute()
                } else {
                    playerState.player.mute()
                }
            } else if (source === 'wistia') {
                if (playerState.isMuted) {
                    playerState.player.volume(playerState.volume / 100 || 1)
                } else {
                    playerState.player.volume(0)
                }
            }
            setPlayerState((prev: any) => ({
                ...prev,
                isMuted: !prev.isMuted,
            }))
        }
    }

    const toggleFullscreen = () => {
        if (source === 'wistia' && playerState.player?.requestFullscreen) {
            if (playerState.player.inFullscreen?.()) {
                playerState.player.cancelFullscreen()
            } else {
                playerState.player.requestFullscreen()
            }
            return
        }

        const iframe = document.getElementById(`video-player-iframe-${videoId}`) as any
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
            if (source === 'youtube') {
                playerState.player.setPlaybackRate(rate)
            } else if (source === 'wistia') {
                playerState.player.playbackRate(rate)
            }
            setPlayerState((prev: any) => ({
                ...prev,
                playbackRate: rate,
            }))
        }
    }

    // Report the position to the page, for example a transcript.
    const onTimeUpdateRef = useRef(onTimeUpdate)
    onTimeUpdateRef.current = onTimeUpdate
    useEffect(() => {
        onTimeUpdateRef.current?.(playerState.currentTime)
    }, [playerState.currentTime])

    useImperativeHandle(ref, () => ({
        playFrom: (seconds: number) => {
            performSeek(seconds)
            if (source === 'youtube') playerState.player?.playVideo?.()
            else playerState.player?.play?.()
        },
    }))

    const toggleCaptions = () => setCaptionsOn((on) => !on)

    // Apply the CC choice to the Wistia player. The captions plugin can load after the player is ready, and the viewer
    // can press CC before either, so retry for a short time until the plugin takes it.
    useEffect(() => {
        if (!captions || source !== 'wistia' || !playerState.player) return
        if (setWistiaCaptions(playerState.player, captionsOn)) return
        let tries = 0
        const interval = setInterval(() => {
            if (setWistiaCaptions(playerState.player, captionsOn) || ++tries >= 20) clearInterval(interval)
        }, 250)
        return () => clearInterval(interval)
    }, [captions, source, playerState.player, captionsOn])

    const retryLoad = () => {
        setLoadFailed(false)
        setReloadKey((key) => key + 1)
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
                        <div className="relative flex-1 flex flex-col justify-center items-center bg-primary mb-2">
                            {source === 'youtube' ? (
                                <div id={`video-player-iframe-${videoId}`} className="rounded w-full aspect-video" />
                            ) : (
                                <div
                                    ref={containerRef}
                                    className={`w-full aspect-video ${borderRadius ? 'rounded' : 'rounded-none'}`}
                                />
                            )}
                            {loadFailed && (
                                <div
                                    role="alert"
                                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/80 p-4 text-center"
                                >
                                    <p className="m-0 text-sm font-semibold text-white">The video didn't load.</p>
                                    <OSButton variant="primary" size="md" onClick={retryLoad}>
                                        Try again
                                    </OSButton>
                                </div>
                            )}
                        </div>

                        <MediaControls
                            currentTime={playerState.currentTime}
                            duration={playerState.duration}
                            isPlaying={playerState.isPlaying}
                            volume={playerState.volume}
                            isMuted={playerState.isMuted}
                            playbackRate={playerState.playbackRate}
                            onSeek={performSeek}
                            onTogglePlay={handlePlayPause}
                            onToggleMute={toggleMute}
                            onVolumeChange={handleVolumeChange}
                            onPlaybackRateChange={handlePlaybackRateChange}
                            onFullscreen={toggleFullscreen}
                            captions={
                                captions && source === 'wistia'
                                    ? { on: captionsOn, onToggle: toggleCaptions }
                                    : undefined
                            }
                        />
                    </section>
                </main>
            </div>
        </div>
    )
})

export default MediaPlayer
