import React, { useEffect, useRef, useState, useCallback } from 'react'
import {
    IconPlay,
    IconPause,
    IconExpand,
    IconExternal,
    IconX,  // Placeholder - using X for muted volume
    IconBell,  // Placeholder - using Bell for Volume
    IconChat,  // Placeholder - using Chat for Subtitles
    IconSearch,
} from '@posthog/icons'
import { Select } from 'components/RadixUI/Select'
import Input from 'components/OSForm/input'
import Tooltip from 'components/RadixUI/Tooltip'

interface WistiaCustomPlayerProps {
    mediaId: string
    aspectRatio?: number
    className?: string
    autoPlay?: boolean
    muted?: boolean
    onMaximize?: () => void
    onPopOut?: (currentTime: number) => void
    subtitle?: string
    isPreview?: boolean  // For thumbnail mode
}

declare global {
    interface Window {
        Wistia?: any
        _wq?: any[]
    }
}

export default function WistiaCustomPlayer({
    mediaId,
    aspectRatio = 1.7777777777777777,
    className = '',
    autoPlay = false,
    muted = false,
    onMaximize,
    onPopOut,
    subtitle,
    isPreview = false,
}: WistiaCustomPlayerProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const playerRef = useRef<any>(null)
    const [isPlaying, setIsPlaying] = useState(autoPlay)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(muted ? 0 : 1)
    const [isMuted, setIsMuted] = useState(muted)
    const [showCaptions, setShowCaptions] = useState(true)
    const [captionText] = useState('')
    const [playbackRate, setPlaybackRate] = useState(1)
    const [selectedQuality, setSelectedQuality] = useState('Auto')
    const [chapters, setChapters] = useState<Array<{ time: number; title: string }>>([])
    const [showCaptionSearch, setShowCaptionSearch] = useState(false)
    const [captionSearchQuery, setCaptionSearchQuery] = useState('')
    const [isReady, setIsReady] = useState(false)

    // Load Wistia scripts and initialize player
    useEffect(() => {
        // Don't initialize actual player in preview mode
        if (isPreview) return

        if (typeof window === 'undefined' || !containerRef.current) return

        // Check if we're inside a small container (likely a thumbnail)
        const rect = containerRef.current.getBoundingClientRect()
        if (rect.width < 300 || rect.height < 200) {
            console.log('Skipping video initialization - detected thumbnail size', rect.width, rect.height)
            return
        }

        let cleanup: (() => void) | undefined

        const initializePlayer = () => {
            // Create embedded player div
            const embedDiv = document.createElement('div')
            embedDiv.className = `wistia_embed wistia_async_${mediaId} videoFoam=true`
            embedDiv.style.width = '100%'
            embedDiv.style.height = '100%'

            // Clear container and add embed
            if (containerRef.current) {
                containerRef.current.innerHTML = ''
                containerRef.current.appendChild(embedDiv)
            }

            // Initialize with Wistia queue
            window._wq = window._wq || []
            window._wq.push({
                id: mediaId,
                options: {
                    autoPlay: autoPlay,
                    muted: muted,
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
                },
                onReady: (video: any) => {
                    playerRef.current = video
                    setIsReady(true)
                    setDuration(video.duration())

                    // Bind event listeners
                    video.bind('play', () => setIsPlaying(true))
                    video.bind('pause', () => setIsPlaying(false))
                    video.bind('end', () => setIsPlaying(false))
                    video.bind('timechange', (t: number) => setCurrentTime(t))
                    video.bind('volumechange', (v: number) => {
                        setVolume(v)
                        setIsMuted(v === 0)
                    })

                    // Set initial states
                    if (autoPlay) {
                        video.play()
                    }
                    if (muted) {
                        video.volume(0)
                    }
                }
            })

            cleanup = () => {
                if (playerRef.current) {
                    try {
                        playerRef.current.remove()
                    } catch (e) {}
                    playerRef.current = null
                }
            }
        }

        // Load Wistia script if not already loaded
        if (!window.Wistia) {
            const script = document.createElement('script')
            script.src = 'https://fast.wistia.com/assets/external/E-v1.js'
            script.async = true
            script.onload = initializePlayer
            document.head.appendChild(script)
        } else {
            initializePlayer()
        }

        return () => {
            if (cleanup) cleanup()
        }
    }, [mediaId, autoPlay, muted, isPreview])

    const handlePlayPause = useCallback(() => {
        if (playerRef.current && isReady) {
            if (isPlaying) {
                playerRef.current.pause()
            } else {
                playerRef.current.play()
            }
        }
    }, [isPlaying, isReady])

    const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value)
        if (playerRef.current && isReady) {
            playerRef.current.time(time)
        }
    }, [isReady])

    const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const vol = parseFloat(e.target.value)
        setVolume(vol)
        if (playerRef.current && isReady) {
            playerRef.current.volume(vol)
        }
        setIsMuted(vol === 0)
    }, [isReady])

    const handleMuteToggle = useCallback(() => {
        if (playerRef.current && isReady) {
            if (isMuted) {
                const newVolume = volume > 0 ? volume : 1
                setVolume(newVolume)
                setIsMuted(false)
                playerRef.current.volume(newVolume)
            } else {
                setVolume(0)
                setIsMuted(true)
                playerRef.current.volume(0)
            }
        }
    }, [isMuted, volume, isReady])

    const handlePlaybackRateChange = useCallback((rate: string) => {
        const rateNum = parseFloat(rate)
        setPlaybackRate(rateNum)
        if (playerRef.current && isReady) {
            playerRef.current.playbackRate(rateNum)
        }
    }, [isReady])

    const handleChapterSelect = useCallback((chapterTime: string) => {
        const time = parseFloat(chapterTime)
        if (playerRef.current && isReady) {
            playerRef.current.time(time)
        }
    }, [isReady])

    const handleCaptionToggle = useCallback(() => {
        setShowCaptions(!showCaptions)
        // Note: Wistia captions API might need different implementation
    }, [showCaptions])

    const handlePopOut = useCallback(() => {
        if (onPopOut) {
            onPopOut(currentTime)
        }
    }, [onPopOut, currentTime])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }


    const chapterGroups = chapters.length > 0
        ? [{ label: 'Chapters', items: chapters.map(ch => ({
            value: ch.time.toString(),
            label: ch.title,
        }))}]
        : []

    // If in preview mode, show a static thumbnail
    if (isPreview) {
        return (
            <div className={`flex flex-col bg-black rounded-lg overflow-hidden ${className}`}>
                <div className="relative bg-black" style={{ paddingTop: `${(1 / aspectRatio) * 100}%` }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Wistia thumbnail */}
                        <img
                            src={`https://fast.wistia.com/oembed?url=https://home.wistia.com/medias/${mediaId}&format=json&width=640&height=360`}
                            alt="Video thumbnail"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                // Fallback to a placeholder if thumbnail fails to load
                                e.currentTarget.src = `https://embedwistia-a.akamaihd.net/deliveries/${mediaId}/thumbnail.jpg?width=640`
                            }}
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="bg-black/50 rounded-full p-4">
                                <IconPlay className="w-8 h-8 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-dark p-3">
                    <div className="text-center text-white/60 text-xs">
                        Video Player Preview
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`flex flex-col bg-black rounded-lg overflow-hidden ${className}`}>
            {/* Video container */}
            <div className="relative bg-black" style={{ paddingTop: `${(1 / aspectRatio) * 100}%` }}>
                <div className="absolute inset-0">
                    {/* Wistia player container */}
                    <div ref={containerRef} className="w-full h-full" />

                    {/* Custom seek bar overlay at bottom of video */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray/30 cursor-pointer group">
                        <input
                            type="range"
                            min="0"
                            max={duration}
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full h-full opacity-0 cursor-pointer"
                        />
                        <div
                            className="absolute top-0 left-0 h-full bg-yellow transition-all pointer-events-none"
                            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                        />
                    </div>

                    {/* Top controls */}
                    <div className="absolute top-2 right-2 flex gap-2">
                        {/* Volume controls */}
                        <div className="flex items-center gap-1 bg-black/50 rounded px-2 py-1">
                            <button
                                onClick={handleMuteToggle}
                                className="text-white hover:text-yellow transition-colors p-1"
                                aria-label={isMuted ? 'Unmute' : 'Mute'}
                            >
                                {isMuted ? <IconX className="w-4 h-4" /> : <IconBell className="w-4 h-4" />}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="w-20 h-1 appearance-none bg-gray/50 rounded cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom controls below video */}
            <div className="bg-gray-dark p-3">
                {/* Play button and time display */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handlePlayPause}
                            className="bg-yellow text-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-yellow/80 transition-colors"
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                            {isPlaying ? <IconPause className="w-4 h-4" /> : <IconPlay className="w-4 h-4 ml-0.5" />}
                        </button>
                        <span className="text-white text-sm font-mono">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>

                    {/* Right controls */}
                    <div className="flex items-center gap-2">
                        {/* Chapters */}
                        {chapterGroups.length > 0 && (
                            <Select
                                onValueChange={handleChapterSelect}
                                value=""
                                groups={chapterGroups}
                                placeholder="Chapters"
                                className="text-white bg-black/50"
                                dataScheme="tertiary"
                            />
                        )}

                        {/* Quality selector */}
                        <button className="text-white/70 hover:text-white px-2 py-1 text-xs font-medium">
                            {selectedQuality}
                        </button>

                        {/* Playback speed */}
                        <button
                            onClick={() => {
                                const rates = ['0.5', '0.75', '1', '1.25', '1.5', '2']
                                const currentIndex = rates.indexOf(playbackRate.toString())
                                const nextIndex = (currentIndex + 1) % rates.length
                                handlePlaybackRateChange(rates[nextIndex])
                            }}
                            className="text-white/70 hover:text-white px-2 py-1 text-xs font-medium"
                        >
                            {playbackRate}x
                        </button>

                        {/* Captions toggle */}
                        <Tooltip trigger={
                            <button
                                onClick={handleCaptionToggle}
                                className={`p-1.5 transition-colors ${
                                    showCaptions ? 'text-yellow' : 'text-white/70 hover:text-white'
                                }`}
                            >
                                <IconChat className="w-4 h-4" />
                            </button>
                        }>
                            {showCaptions ? 'Hide captions' : 'Show captions'}
                        </Tooltip>

                        {/* Caption search */}
                        <Tooltip trigger={
                            <button
                                onClick={() => setShowCaptionSearch(!showCaptionSearch)}
                                className={`p-1.5 transition-colors ${
                                    showCaptionSearch ? 'text-yellow' : 'text-white/70 hover:text-white'
                                }`}
                            >
                                <IconSearch className="w-4 h-4" />
                            </button>
                        }>
                            Search captions
                        </Tooltip>

                        {/* Maximize */}
                        {onMaximize && (
                            <Tooltip trigger={
                                <button
                                    onClick={onMaximize}
                                    className="text-white/70 hover:text-white p-1.5"
                                >
                                    <IconExpand className="w-4 h-4" />
                                </button>
                            }>
                                Maximize
                            </Tooltip>
                        )}

                        {/* Pop out */}
                        {onPopOut && (
                            <Tooltip trigger={
                                <button
                                    onClick={handlePopOut}
                                    className="text-white/70 hover:text-white p-1.5"
                                >
                                    <IconExternal className="w-4 h-4" />
                                </button>
                            }>
                                Pop out to new window
                            </Tooltip>
                        )}
                    </div>
                </div>

                {/* Caption display area */}
                {showCaptions && !showCaptionSearch && captionText && (
                    <div className="text-center text-white text-sm mt-2 px-4">
                        <p className="bg-black/50 inline-block px-3 py-1 rounded">{captionText}</p>
                    </div>
                )}

                {/* Caption search */}
                {showCaptionSearch && (
                    <div className="mt-2">
                        <Input
                            label="Search captions"
                            placeholder="Search in transcript..."
                            value={captionSearchQuery}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCaptionSearchQuery(e.target.value)}
                            showLabel={false}
                            size="sm"
                            showClearButton
                            onClear={() => setCaptionSearchQuery('')}
                            className="bg-gray/50 border-gray text-white placeholder-white/50"
                        />
                    </div>
                )}

                {/* Subtitle below player */}
                {subtitle && (
                    <div className="text-center text-white/60 text-xs mt-2">
                        {subtitle}
                    </div>
                )}
            </div>
        </div>
    )
}