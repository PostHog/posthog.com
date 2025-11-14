import { useWindow } from '../../context/Window'
import { useApp } from '../../context/App'
import React, { useState, useEffect, useRef } from 'react'
import { songs } from './songs'
import { YTPlayer } from './types'
import Switch from './Switch'
import TapeButton from './TapeButton'
import CassetteTape from './CassetteTape'

export default function TapePlayer(): JSX.Element {
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()
    const [isPoweredOn, setIsPoweredOn] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)
    const [danceMode, setDanceMode] = useState(false)
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [rotation, setRotation] = useState(0)
    const [waveformBars, setWaveformBars] = useState<number[]>(
        Array.from({ length: 60 }, () => Math.random() * 80 + 20)
    )
    const animationRef = useRef<number>()
    const waveformRef = useRef<number>()
    const playerRef = useRef<YTPlayer | null>(null)
    const playerReadyRef = useRef(false)

    // Load YouTube iframe API
    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, '♫ PostHog.fm')
        }
        if (typeof window === 'undefined') return

        // Check if API is already loaded
        if (window.YT && window.YT.Player) {
            initializePlayer()
            return
        }

        // Load the API
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        const firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

        // Set up callback
        window.onYouTubeIframeAPIReady = initializePlayer
    }, [])

    const initializePlayer = () => {
        if (typeof window === 'undefined' || !window.YT || playerRef.current) return

        playerRef.current = new window.YT.Player('youtube-player', {
            height: '0',
            width: '0',
            videoId: songs[0].videoId,
            host: 'https://www.youtube-nocookie.com',
            playerVars: {
                autoplay: 0,
                controls: 0,
                disablekb: 1,
                fs: 0,
                modestbranding: 1,
                rel: 0,
            },
            events: {
                onReady: () => {
                    playerReadyRef.current = true
                },
                onStateChange: (event: { data: number }) => {
                    // Update playing state based on YouTube player state
                    if (event.data === window.YT.PlayerState.PLAYING) {
                        setIsPlaying(true)
                    } else if (
                        event.data === window.YT.PlayerState.PAUSED ||
                        event.data === window.YT.PlayerState.ENDED
                    ) {
                        setIsPlaying(false)
                    }
                },
            },
        })
    }

    // Handle song changes
    useEffect(() => {
        if (playerRef.current && playerReadyRef.current) {
            playerRef.current.loadVideoById(songs[currentSongIndex].videoId)
            if (isPlaying) {
                playerRef.current.playVideo()
            }
        }
    }, [currentSongIndex])

    // Animate the tape reels when playing
    useEffect(() => {
        if (isPlaying && isPoweredOn) {
            const animate = () => {
                setRotation((prev) => (prev + 2) % 360)
                animationRef.current = requestAnimationFrame(animate)
            }
            animationRef.current = requestAnimationFrame(animate)
        } else {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [isPlaying, isPoweredOn])

    // Animate the waveform when playing
    useEffect(() => {
        if (isPlaying && isPoweredOn) {
            let lastUpdate = Date.now()
            const animateWaveform = () => {
                const now = Date.now()
                // Update every ~80ms for smooth animation
                if (now - lastUpdate > 80) {
                    setWaveformBars((prev) => {
                        // Randomly update each bar's height
                        return prev.map(() => Math.random() * 80 + 20)
                    })
                    lastUpdate = now
                }
                waveformRef.current = requestAnimationFrame(animateWaveform)
            }
            waveformRef.current = requestAnimationFrame(animateWaveform)
        } else {
            if (waveformRef.current) {
                cancelAnimationFrame(waveformRef.current)
            }
        }
        return () => {
            if (waveformRef.current) {
                cancelAnimationFrame(waveformRef.current)
            }
        }
    }, [isPlaying, isPoweredOn])

    const handlePlay = () => {
        if (isPoweredOn && playerRef.current && playerReadyRef.current) {
            playerRef.current.playVideo()
        }
    }

    const handlePause = () => {
        if (playerRef.current && playerReadyRef.current) {
            playerRef.current.pauseVideo()
        }
    }

    const handlePrev = () => {
        if (isPoweredOn) {
            const wasPlaying = isPlaying
            setCurrentSongIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1))
            if (wasPlaying && playerRef.current && playerReadyRef.current) {
                setTimeout(() => {
                    if (playerRef.current) {
                        playerRef.current.playVideo()
                    }
                }, 100)
            }
        }
    }

    const handleSkip = () => {
        if (isPoweredOn) {
            const wasPlaying = isPlaying
            setCurrentSongIndex((prev) => (prev === songs.length - 1 ? 0 : prev + 1))
            if (wasPlaying && playerRef.current && playerReadyRef.current) {
                setTimeout(() => {
                    if (playerRef.current) {
                        playerRef.current.playVideo()
                    }
                }, 100)
            }
        }
    }

    const handleEject = () => {
        if (isPoweredOn) {
            if (playerRef.current && playerReadyRef.current) {
                playerRef.current.stopVideo()
            }
            setIsPlaying(false)
            setCurrentSongIndex(0)
        }
    }

    const handleShare = () => {
        if (isPoweredOn && navigator.share) {
            navigator.share({
                title: songs[currentSongIndex].title,
                text: `Check out ${songs[currentSongIndex].title} by ${songs[currentSongIndex].artist}`,
                url: `https://www.youtube.com/watch?v=${songs[currentSongIndex].videoId}`,
            })
        }
    }

    const currentSong = songs[currentSongIndex]

    return (
        <div data-scheme="secondary" className="w-full bg-primary">
            <div className="p-4">
                {/* Hidden YouTube player */}
                <div id="youtube-player" className="hidden" />

                {/* Waveform */}
                <div className="mb-4 h-20 flex items-end justify-between gap-[2px] border-2 border-primary bg-primary p-2 rounded">
                    {waveformBars.map((height, i) => (
                        <div
                            key={i}
                            className="flex-1 bg-secondary border-l border-r border-primary transition-all duration-100"
                            style={{
                                height: isPlaying && isPoweredOn ? `${height}%` : '10%',
                                opacity: isPoweredOn ? (isPlaying ? 1 : 0.4) : 0.2,
                            }}
                        />
                    ))}
                </div>

                {/* Main player area */}
                <div className="flex items-stretch gap-3 mb-4">
                    {/* Power button */}
                    <Switch
                        label="Power"
                        isOn={isPoweredOn}
                        onToggle={() => {
                            setIsPoweredOn(!isPoweredOn)
                            if (isPoweredOn) {
                                // Pause the music when turning off
                                if (playerRef.current && playerReadyRef.current) {
                                    playerRef.current.pauseVideo()
                                }
                                setIsPlaying(false)
                            }
                        }}
                    />

                    {/* Cassette tape */}
                    <CassetteTape title={currentSong.title} artist={currentSong.artist} rotation={rotation} />

                    {/* Dance mode switch */}
                    <Switch
                        label={
                            <>
                                Dance <br />
                                mode
                            </>
                        }
                        isOn={danceMode}
                        onToggle={() => setDanceMode(!danceMode)}
                        disabled={!isPoweredOn}
                    />
                </div>

                {/* Control buttons */}
                <div className="gap-2 grid grid-cols-6 h-20">
                    <TapeButton label="Eject" icon="⏏" onClick={handleEject} disabled={!isPoweredOn} />
                    <TapeButton label="Prev" icon="◁◁" onClick={handlePrev} disabled={!isPoweredOn} />
                    <TapeButton
                        label="Play"
                        icon="▷"
                        onClick={handlePlay}
                        disabled={!isPoweredOn || isPlaying}
                        isPressed={isPlaying}
                    />
                    <TapeButton label="Pause" icon="||" onClick={handlePause} disabled={!isPoweredOn || !isPlaying} />
                    <TapeButton label="Skip" icon="▷▷" onClick={handleSkip} disabled={!isPoweredOn} />
                    <TapeButton label="Share" icon="↗" onClick={handleShare} disabled={!isPoweredOn} />
                </div>
            </div>
        </div>
    )
}
