import { useWindow } from '../../context/Window'
import { useApp } from '../../context/App'
import React, { useState, useEffect, useRef } from 'react'

const songs = [
    {
        title: 'Hey',
        artist: 'The Pixies',
        videoId: 'tVCUAXOBF7w',
    },
    {
        title: 'Where Is My Mind?',
        artist: 'The Pixies',
        videoId: 'N3oCS85HvpY',
    },
    {
        title: 'Come as You Are',
        artist: 'Nirvana',
        videoId: 'vabnZ9-ex7o',
    },
    {
        title: 'Everlong',
        artist: 'Foo Fighters',
        videoId: 'eBG7P-K-r1Y',
    },
    {
        title: 'Just Like Heaven',
        artist: 'The Cure',
        videoId: 'n3nPiBai66M',
    },
    {
        title: 'There Is a Light That Never Goes Out',
        artist: 'The Smiths',
        videoId: 'siO6dkqidc4',
    },
    {
        title: 'Under the Bridge',
        artist: 'Red Hot Chili Peppers',
        videoId: 'lwlogyj7nFE',
    },
    {
        title: '1979',
        artist: 'The Smashing Pumpkins',
        videoId: '4aeETEoNfOg',
    },
]

// YouTube API types
interface YTPlayer {
    playVideo: () => void
    pauseVideo: () => void
    stopVideo: () => void
    loadVideoById: (videoId: string) => void
}

interface YTPlayerConfig {
    height: string
    width: string
    videoId: string
    host: string
    playerVars: {
        autoplay: number
        controls: number
        disablekb: number
        fs: number
        modestbranding: number
        rel: number
    }
    events: {
        onReady: () => void
        onStateChange: (event: { data: number }) => void
    }
}

interface YTPlayerConstructor {
    new (elementId: string, config: YTPlayerConfig): YTPlayer
}

interface YTNamespace {
    Player: YTPlayerConstructor
    PlayerState: {
        PLAYING: number
        PAUSED: number
        ENDED: number
    }
}

// Extend Window interface for YouTube API
declare global {
    interface Window {
        YT: YTNamespace | any
        onYouTubeIframeAPIReady: (() => void) | null
    }
}

interface SwitchProps {
    label: string | JSX.Element
    isOn: boolean
    onToggle: () => void
    disabled?: boolean
}

function Switch({ label, isOn, onToggle, disabled = false }: SwitchProps): JSX.Element {
    return (
        <div className="flex flex-col items-center">
            <div className="text-[10px] font-bold text-primary uppercase tracking-wider text-center leading-tight mb-2 h-[25px]">
                {label}
            </div>
            <div className="relative w-16 h-32 border-2 border-primary bg-primary rounded shadow-inner p-2">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary z-10">
                    ON
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary z-10">
                    OFF
                </div>

                {/* Switch cutout */}
                <button
                    onClick={() => !disabled && onToggle()}
                    disabled={disabled}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-16 bg-accent/40 border-2 border-primary/70 rounded-sm disabled:opacity-50"
                >
                    <div
                        className={`absolute left-0 w-full h-[calc(50%-4px)] bg-[#b6b7af]/70 border border-[#b6b7af] dark:bg-[#4a4e5c]/70 dark:border-[#4a4e5c] w-[calc(100%+4px)] left-[-2px] rounded-[2px] ${
                            isOn && !disabled
                                ? 'top-[8px] rounded-br-none rounded-bl-none'
                                : 'bottom-[8px] rounded-tr-none rounded-tl-none'
                        }`}
                    />

                    {/* Toggle bar that slides */}
                    <div
                        className={`absolute left-0 w-full h-[8px] bg-primary border border-[#b6b7af] dark:border-[#4a4e5c] w-[calc(100%+4px)] left-[-2px] rounded-[2px] ${
                            isOn && !disabled ? 'top-[4px]' : 'bottom-[4px]'
                        }`}
                    />
                </button>
            </div>
        </div>
    )
}

interface TapeButtonProps {
    label: string
    icon: string
    onClick: () => void
    disabled?: boolean
    isPressed?: boolean
}

function TapeButton({ label, icon, onClick, disabled = false, isPressed = false }: TapeButtonProps): JSX.Element {
    return (
        <button onClick={onClick} disabled={disabled} className="flex flex-col items-center gap-1 disabled:opacity-30">
            <div className="relative w-[87px] h-16 bg-accent border-2 border-primary rounded top-[2px]">
                <div
                    className={`absolute inset-0 border-2 flex items-center justify-center ${
                        disabled
                            ? 'translate-y- border-primary'
                            : isPressed
                            ? 'translate-y-0 rounded-none bg-accent/70 border-primary'
                            : '-translate-y-1 active:translate-y-0 active:rounded-none rounded bg-primary active:bg-accent/70 border-primary/80 active:border-primary'
                    }`}
                >
                    <div className="text-xl font-bold text-secondary opacity-80">{icon}</div>
                </div>
            </div>
            <div className="text-[9px] font-bold text-secondary uppercase tracking-wide">{label}</div>
        </button>
    )
}

interface ReelProps {
    rotation: number
}

function Reel({ rotation }: ReelProps): JSX.Element {
    return (
        <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-2 border-primary rounded-full bg-accent shadow-inner" />
            <div
                className="absolute inset-1 border-2 border-primary rounded-full bg-primary flex items-center justify-center"
                style={{ transform: `rotate(${rotation}deg)` }}
            >
                {/* Spindle with 4 teeth */}
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 border-2 border-primary rounded-full bg-accent" />
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-5 bg-primary border-2 border-primary border-t-0 rounded-[2px]" />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-5 bg-primary border-2 border-primary border-b-0 rounded-[2px]" />
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-5 h-3 bg-primary border-2 border-primary border-l-0 rounded-[2px]" />
                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-5 h-3 bg-primary border-2 border-primary border-r-0 rounded-[2px]" />
                </div>
            </div>
        </div>
    )
}

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
        <div data-scheme="secondary" className="w-full p-6 bg-primary">
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
                        if (isPoweredOn) setIsPlaying(false)
                    }}
                />

                {/* Cassette tape */}
                <div className="flex-1 border-2 border-primary bg-accent shadow-inner aspect-[100/63] rounded">
                    <div className="border-2 border-primary bg-primary m-4 p-4 h-[78%] flex flex-col rounded">
                        {/* Tape label */}
                        <div className="bg-accent border-2 border-primary p-3 mb-5 text-center min-h-[56px] flex flex-col justify-center rounded">
                            <div className="font-bold text-sm text-primary truncate">{currentSong.title}</div>
                            <div className="text-xs text-secondary truncate">{currentSong.artist}</div>
                        </div>

                        {/* Tape reels */}
                        <div className="flex items-center justify-around gap-4 my-auto">
                            <Reel rotation={rotation} />
                            <Reel rotation={-rotation} />
                        </div>
                    </div>
                </div>

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
            <div className="flex items-start justify-center gap-2">
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
    )
}
