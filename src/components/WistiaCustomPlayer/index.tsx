import React, { useEffect, useRef, useState, useCallback } from 'react'
import { IconPlayFilled, IconPauseFilled, IconExpand45 } from '@posthog/icons'
import {
    IconVolumeMuted,
    IconVolumeFull,
    IconPopout,
    IconClosedCaptions,
    IconClosedCaptionsFilled,
} from 'components/OSIcons'
import { Select } from 'components/RadixUI/Select'
import Input from 'components/OSForm/input'
import OSButton from 'components/OSButton'

interface WistiaCustomPlayerProps {
    mediaId: string
    aspectRatio?: number
    className?: string
    autoPlay?: boolean
    muted?: boolean
    onMaximize?: () => void
    onPopOut?: (currentTime: number) => void
    subtitle?: string
    isPreview?: boolean // For thumbnail mode
    startTime?: number // Start playback at specific time
    onTimeUpdate?: (time: number) => void // Callback for time updates
}

declare global {
    interface Window {
        Wistia?: any
        _wq?: any[]
    }
}

const WistiaCustomPlayer = React.forwardRef<any, WistiaCustomPlayerProps>(
    (
        {
            mediaId,
            aspectRatio = 1.7777777777777777,
            className = '',
            autoPlay = false,
            muted = false,
            onMaximize,
            onPopOut,
            subtitle,
            isPreview = false,
            startTime = 0,
            onTimeUpdate,
        },
        ref
    ) => {
        const containerRef = useRef<HTMLDivElement>(null)
        const playerRef = useRef<any>(null)
        const [isPlaying, setIsPlaying] = useState(autoPlay)
        const [currentTime, setCurrentTime] = useState(0)
        const [duration, setDuration] = useState(0)
        const [volume, setVolume] = useState(muted ? 0 : 1)
        const [isMuted, setIsMuted] = useState(muted)
        const [showCaptions, setShowCaptions] = useState(true)
        const [captionText, setCaptionText] = useState('')
        const [playbackRate, setPlaybackRate] = useState(1)
        const [captions, setCaptions] = useState<any[]>([])
        const [isDragging, setIsDragging] = useState(false)
        const seekBarRef = useRef<HTMLDivElement>(null)
        const [selectedQuality, setSelectedQuality] = useState('Auto')
        const [chapters, setChapters] = useState<Array<{ time: number; title: string }>>([])
        const [showCaptionSearch, setShowCaptionSearch] = useState(false)
        const [captionSearchQuery, setCaptionSearchQuery] = useState('')
        const [isReady, setIsReady] = useState(false)

        // Store initial props in refs to use them without causing re-renders
        const autoPlayRef = useRef(autoPlay)
        const mutedRef = useRef(muted)

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

            // Skip if player already exists
            if (playerRef.current) {
                console.log('Player already initialized, skipping')
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
                        autoPlay: autoPlayRef.current,
                        muted: mutedRef.current,
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
                        captionsOn: false, // Disable native captions
                        captionsDefault: false,
                    },
                    onReady: (video: any) => {
                        playerRef.current = video

                        // Expose player instance to parent via ref
                        if (ref && typeof ref !== 'function') {
                            const playerAPI = {
                                pause: () => {
                                    console.log('Pause called on player')
                                    if (playerRef.current && playerRef.current.pause) {
                                        playerRef.current.pause()
                                    } else if (video && video.pause) {
                                        video.pause()
                                    }
                                },
                                play: () => {
                                    if (playerRef.current && playerRef.current.play) {
                                        playerRef.current.play()
                                    } else if (video && video.play) {
                                        video.play()
                                    }
                                },
                                time: () => {
                                    if (playerRef.current && playerRef.current.time) {
                                        return playerRef.current.time()
                                    } else if (video && video.time) {
                                        return video.time()
                                    }
                                    return 0
                                },
                                currentTime: 0,
                            }
                            ref.current = playerAPI
                        }

                        setIsReady(true)
                        setDuration(video.duration())

                        // Handle captions - wait for plugin to be ready
                        const setupCaptions = () => {
                            const captionsPlugin = video.plugin?.captions

                            if (!captionsPlugin) {
                                console.log('Captions plugin not available yet')
                                return false
                            }

                            // Disable native captions overlay
                            captionsPlugin.disable()

                            // Wait for captions to be ready
                            const checkCaptions = () => {
                                try {
                                    // Method 1: Get from plugin's captions array
                                    const availableCaptions = captionsPlugin.getAvailableCaptions?.()
                                    console.log('Available captions:', availableCaptions)

                                    if (availableCaptions && availableCaptions.length > 0) {
                                        const firstLang = availableCaptions[0]
                                        console.log('Using caption language:', firstLang)

                                        // Try to get the caption data
                                        const captionData = captionsPlugin.captionData?.(firstLang.language || 0)
                                        if (captionData && captionData.length > 0) {
                                            console.log('Loaded', captionData.length, 'caption entries')
                                            setCaptions(captionData)
                                            return true
                                        }
                                    }

                                    // Method 2: Direct access to captions array
                                    if (captionsPlugin.captions && Array.isArray(captionsPlugin.captions)) {
                                        console.log(
                                            'Found captions array:',
                                            captionsPlugin.captions.length,
                                            'languages'
                                        )

                                        if (captionsPlugin.captions.length > 0) {
                                            const firstCaptions = captionsPlugin.captions[0]
                                            if (firstCaptions.hash && firstCaptions.hash.length > 0) {
                                                console.log(
                                                    'Loaded',
                                                    firstCaptions.hash.length,
                                                    'caption entries from hash'
                                                )
                                                setCaptions(firstCaptions.hash)
                                                return true
                                            }
                                            // Try lines property
                                            if (firstCaptions.lines && firstCaptions.lines.length > 0) {
                                                console.log(
                                                    'Loaded',
                                                    firstCaptions.lines.length,
                                                    'caption entries from lines'
                                                )
                                                setCaptions(firstCaptions.lines)
                                                return true
                                            }
                                        }
                                    }

                                    // Method 3: Access internal data
                                    const internalCaptions = video._impl?.data?.media?.captions
                                    if (internalCaptions && internalCaptions.length > 0) {
                                        console.log('Found internal captions:', internalCaptions)
                                        const firstInternal = internalCaptions[0]

                                        // Check if it has a text field (full transcript)
                                        if (firstInternal.text && typeof firstInternal.text === 'string') {
                                            console.log('Found text-only captions, need to fetch VTT')
                                            // This means we need to fetch the VTT file
                                            // The text field is just a full transcript
                                            // We should let the fetch method handle this
                                            return false
                                        }

                                        if (firstInternal.hash && Array.isArray(firstInternal.hash)) {
                                            console.log('Found caption hash with', firstInternal.hash.length, 'entries')
                                            setCaptions(firstInternal.hash)
                                            return true
                                        }
                                    }

                                    console.log('Captions not ready yet, will retry...')
                                    return false
                                } catch (e) {
                                    console.log('Error accessing captions:', e)
                                    return false
                                }
                            }

                            // Try immediately
                            if (!checkCaptions()) {
                                // Retry multiple times
                                let retries = 0
                                const retryInterval = setInterval(() => {
                                    retries++
                                    if (checkCaptions() || retries > 10) {
                                        clearInterval(retryInterval)
                                    }
                                }, 500)
                            }

                            return true
                        }

                        // Start caption setup
                        setupCaptions()

                        // Also listen for caption-related events
                        video.bind('captionsloaded', () => {
                            console.log('Captions loaded event fired')
                            setupCaptions()
                        })

                        video.bind('captionchange', (captionData: any) => {
                            console.log('Caption change event:', captionData)
                            if (captionData && captionData.caption) {
                                setCaptionText(captionData.caption)
                            }
                        })

                        // Fallback: Try to fetch captions from Wistia API
                        const fetchCaptionsFromAPI = async () => {
                            try {
                                // Get video data to find caption URLs
                                const videoData = video.data || video._impl?.data
                                console.log('Video data for captions:', videoData)

                                // Build the VTT URL from media ID if we have captions
                                if (videoData?.media?.captions && videoData.media.captions.length > 0) {
                                    const caption = videoData.media.captions[0]

                                    // Construct VTT URL - Wistia uses a standard pattern
                                    let vttUrl = null

                                    // Try to get URL from caption object
                                    if (caption.url) {
                                        vttUrl = caption.url
                                    } else if (videoData.media.hashedId || mediaId) {
                                        // Construct URL from media ID
                                        const vidId = videoData.media.hashedId || mediaId
                                        vttUrl = `https://fast.wistia.net/embed/captions/${vidId}.vtt?language=${
                                            caption.language || 'eng'
                                        }`
                                    }

                                    if (vttUrl) {
                                        console.log('Fetching captions from URL:', vttUrl)
                                        const response = await fetch(vttUrl)

                                        if (response.ok) {
                                            const vttText = await response.text()
                                            console.log('Fetched VTT captions:', vttText.substring(0, 200))

                                            // Parse VTT format
                                            const parsedCaptions = parseVTT(vttText)
                                            if (parsedCaptions.length > 0) {
                                                console.log('Parsed', parsedCaptions.length, 'caption entries from VTT')
                                                setCaptions(parsedCaptions)
                                                return
                                            }
                                        } else {
                                            console.log('Failed to fetch VTT, status:', response.status)
                                        }
                                    }
                                }

                                // Alternative: Check for captions in other locations
                                const captionSources = [videoData?.captions, video.captions, video._captions].filter(
                                    Boolean
                                )

                                for (const source of captionSources) {
                                    if (Array.isArray(source) && source.length > 0) {
                                        const captionUrl = source[0].url || source[0].vtt_url
                                        if (captionUrl) {
                                            console.log('Fetching captions from alternate URL:', captionUrl)
                                            const response = await fetch(captionUrl)
                                            if (response.ok) {
                                                const vttText = await response.text()
                                                console.log('Fetched VTT captions:', vttText.substring(0, 200))

                                                // Parse VTT format
                                                const parsedCaptions = parseVTT(vttText)
                                                if (parsedCaptions.length > 0) {
                                                    console.log(
                                                        'Parsed',
                                                        parsedCaptions.length,
                                                        'caption entries from VTT'
                                                    )
                                                    setCaptions(parsedCaptions)
                                                    return
                                                }
                                            }
                                        }
                                    }
                                }
                            } catch (error) {
                                console.log('Error fetching captions from API:', error)
                            }
                        }

                        // Parse VTT format helper
                        const parseVTT = (vttText: string) => {
                            const lines = vttText.split('\n')
                            const captions: any[] = []
                            let currentCaption: any = {}

                            for (let i = 0; i < lines.length; i++) {
                                const line = lines[i].trim()

                                // Skip WEBVTT header and empty lines
                                if (line === 'WEBVTT' || line === '') continue

                                // Check if it's a timestamp line
                                if (line.includes('-->')) {
                                    const [start, end] = line.split('-->').map((t) => {
                                        const parts = t.trim().split(':')
                                        if (parts.length === 3) {
                                            const [h, m, s] = parts
                                            return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s)
                                        } else if (parts.length === 2) {
                                            const [m, s] = parts
                                            return parseInt(m) * 60 + parseFloat(s)
                                        }
                                        return 0
                                    })
                                    currentCaption = { start, end, text: '' }
                                } else if (currentCaption.start !== undefined) {
                                    // This is caption text
                                    if (currentCaption.text) {
                                        currentCaption.text += ' '
                                    }
                                    currentCaption.text += line

                                    // Check if next line is empty or a new timestamp
                                    if (
                                        i + 1 >= lines.length ||
                                        lines[i + 1].trim() === '' ||
                                        lines[i + 1].includes('-->')
                                    ) {
                                        if (currentCaption.text) {
                                            captions.push({ ...currentCaption })
                                        }
                                        currentCaption = {}
                                    }
                                }
                            }

                            return captions
                        }

                        // Try API fetch after a delay
                        setTimeout(fetchCaptionsFromAPI, 1000)

                        // Set start time if provided
                        if (startTime > 0) {
                            video.time(startTime)
                        }

                        // Bind event listeners
                        video.bind('play', () => setIsPlaying(true))
                        video.bind('pause', () => setIsPlaying(false))
                        video.bind('end', () => setIsPlaying(false))
                        video.bind('timechange', (t: number) => {
                            setCurrentTime(t)

                            // Update ref with current time
                            if (ref && typeof ref !== 'function' && ref.current) {
                                ref.current.currentTime = t
                            }

                            // Call time update callback if provided
                            if (onTimeUpdate) {
                                onTimeUpdate(t)
                            }

                            // Update caption text will be done when captions state updates
                        })
                        video.bind('volumechange', (v: number) => {
                            setVolume(v)
                            setIsMuted(v === 0)
                        })

                        // Set initial states using refs
                        if (autoPlayRef.current) {
                            video.play()
                        }
                        if (mutedRef.current) {
                            video.volume(0)
                        }
                    },
                })

                cleanup = () => {
                    // Don't cleanup the player - let it persist
                    // This prevents re-initialization on tab focus changes
                    console.log('Cleanup called but player will persist')
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
        }, [mediaId]) // Only re-init if mediaId changes

        // Update caption text based on current time
        useEffect(() => {
            if (captions.length > 0 && showCaptions) {
                const currentCaption = captions.find((caption: any) => {
                    // Handle different caption formats
                    const start = caption.start || caption.startTime || 0
                    const end = caption.end || caption.endTime || start + (caption.duration || 0)
                    const inRange = currentTime >= start && currentTime <= end

                    // Debug first few captions
                    if (captions.indexOf(caption) < 3) {
                        console.log(
                            `Caption ${captions.indexOf(
                                caption
                            )}: start=${start}, end=${end}, currentTime=${currentTime}, inRange=${inRange}`
                        )
                    }

                    return inRange
                })

                if (currentCaption) {
                    const text = currentCaption.text || currentCaption.caption || ''
                    console.log('Setting caption text:', text)
                    setCaptionText(text)
                } else {
                    setCaptionText('')
                }
            } else if (!showCaptions) {
                setCaptionText('')
            } else if (captions.length === 0 && showCaptions) {
                console.log('No captions loaded yet, showCaptions is', showCaptions)
            }
        }, [currentTime, captions, showCaptions])

        const handlePlayPause = useCallback(() => {
            if (playerRef.current && isReady) {
                if (isPlaying) {
                    playerRef.current.pause()
                } else {
                    playerRef.current.play()
                }
            }
        }, [isPlaying, isReady])

        const handleSeekBarClick = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                if (!seekBarRef.current || !playerRef.current || !isReady) return

                const rect = seekBarRef.current.getBoundingClientRect()
                const x = e.clientX - rect.left
                const percentage = Math.max(0, Math.min(1, x / rect.width))
                const time = percentage * duration

                playerRef.current.time(time)
            },
            [duration, isReady]
        )

        const handleSeekStart = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                setIsDragging(true)
                handleSeekBarClick(e)
            },
            [handleSeekBarClick]
        )

        const handleSeekMove = useCallback(
            (e: MouseEvent) => {
                if (!isDragging || !seekBarRef.current || !playerRef.current || !isReady) return

                const rect = seekBarRef.current.getBoundingClientRect()
                const x = e.clientX - rect.left
                const percentage = Math.max(0, Math.min(1, x / rect.width))
                const time = percentage * duration

                playerRef.current.time(time)
            },
            [isDragging, duration, isReady]
        )

        const handleSeekEnd = useCallback(() => {
            setIsDragging(false)
        }, [])

        // Add mouse event listeners for drag
        useEffect(() => {
            if (isDragging) {
                document.addEventListener('mousemove', handleSeekMove)
                document.addEventListener('mouseup', handleSeekEnd)
                return () => {
                    document.removeEventListener('mousemove', handleSeekMove)
                    document.removeEventListener('mouseup', handleSeekEnd)
                }
            }
        }, [isDragging, handleSeekMove, handleSeekEnd])

        const handleVolumeChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const vol = parseFloat(e.target.value)
                setVolume(vol)
                if (playerRef.current && isReady) {
                    playerRef.current.volume(vol)
                }
                setIsMuted(vol === 0)
            },
            [isReady]
        )

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

        const handlePlaybackRateChange = useCallback(
            (rate: string) => {
                const rateNum = parseFloat(rate)
                setPlaybackRate(rateNum)
                if (playerRef.current && isReady) {
                    playerRef.current.playbackRate(rateNum)
                }
            },
            [isReady]
        )

        const handleChapterSelect = useCallback(
            (chapterTime: string) => {
                const time = parseFloat(chapterTime)
                if (playerRef.current && isReady) {
                    playerRef.current.time(time)
                }
            },
            [isReady]
        )

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

        const chapterGroups =
            chapters.length > 0
                ? [
                      {
                          label: 'Chapters',
                          items: chapters.map((ch) => ({
                              value: ch.time.toString(),
                              label: ch.title,
                          })),
                      },
                  ]
                : []

        // If in preview mode, show a static thumbnail
        if (isPreview) {
            return (
                <div className={`flex flex-col overflow-hidden ${className}`}>
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
                                    <IconPlayFilled className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-dark p-3">
                        <div className="text-center text-white/60 text-xs">Video Player Preview</div>
                    </div>
                </div>
            )
        }

        return (
            <div className={`flex flex-col ${className}`}>
                {/* Video container */}
                <div className="relative bg-black" style={{ paddingTop: `${(1 / aspectRatio) * 100}%` }}>
                    <div className="absolute inset-0">
                        {/* Wistia player container */}
                        <div ref={containerRef} className="w-full h-full" />

                        {/* Custom seek bar overlay at bottom of video */}
                        <div
                            ref={seekBarRef}
                            className="absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-full cursor-pointer group"
                            onMouseDown={handleSeekStart}
                            onClick={handleSeekBarClick}
                        >
                            <div
                                className="absolute top-0 left-0 h-full bg-yellow pointer-events-none"
                                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                            >
                                {/* Playhead */}
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg pointer-events-none" />
                            </div>
                        </div>

                        {/* Top controls */}
                        <div className="absolute top-2 right-2 flex gap-2">
                            {/* Volume controls */}
                            <div className="flex items-center gap-1 bg-black/50 rounded px-2 py-1">
                                <OSButton
                                    onClick={handleMuteToggle}
                                    variant="default"
                                    size="lg"
                                    icon={isMuted ? <IconVolumeMuted /> : <IconVolumeFull />}
                                    className="!text-white hover:text-yellow transition-colors p-1"
                                    tooltip={isMuted ? 'Unmute' : 'Mute'}
                                />
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
                <div className="pt-2">
                    {/* Play button and time display */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 shrink-0 basis-60">
                            <span className="!text-white text-sm font-mono">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                        </div>

                        <div className="flex-1 flex justify-center">
                            <OSButton
                                onClick={handlePlayPause}
                                variant="default"
                                size="md"
                                icon={isPlaying ? <IconPauseFilled /> : <IconPlayFilled />}
                                className="bg-white text-secondary rounded-full w-8 h-8"
                                zoomHover="lg"
                                // tooltip={isPlaying ? 'Pause' : 'Play'}
                            />
                        </div>

                        {/* Right controls */}
                        <div className="flex items-center justify-end gap-2 shrink-0 basis-60">
                            {/* Chapters */}
                            {chapterGroups.length > 0 && (
                                <Select
                                    onValueChange={handleChapterSelect}
                                    value=""
                                    groups={chapterGroups}
                                    placeholder="Chapters"
                                    className="!text-white bg-black/50"
                                    dataScheme="tertiary"
                                />
                            )}

                            {/* Quality selector */}
                            {/*                             
                            <OSButton variant="default" size="lg" className="!text-white px-2 py-1 text-xs font-medium">
                                {selectedQuality}
                            </OSButton> 
                            */}

                            {/* Playback speed */}
                            <OSButton
                                onClick={() => {
                                    const rates = ['0.5', '0.75', '1', '1.25', '1.5', '2']
                                    const currentIndex = rates.indexOf(playbackRate.toString())
                                    const nextIndex = (currentIndex + 1) % rates.length
                                    handlePlaybackRateChange(rates[nextIndex])
                                }}
                                variant="default"
                                size="lg"
                                className="!text-white px-2 py-1 text-xs font-medium"
                            >
                                {playbackRate}x
                            </OSButton>

                            {/* Captions toggle */}
                            <OSButton
                                onClick={handleCaptionToggle}
                                variant="default"
                                size="lg"
                                icon={showCaptions ? <IconClosedCaptionsFilled /> : <IconClosedCaptions />}
                                className="!text-white p-1.5"
                                tooltip={showCaptions ? 'Hide captions' : 'Show captions'}
                            />

                            {/* Caption search */}
                            {/* 
                            <Tooltip
                                trigger={
                                    <button
                                        onClick={() => setShowCaptionSearch(!showCaptionSearch)}
                                        className={`p-1.5 transition-colors ${showCaptionSearch ? 'text-yellow' : 'text-white'
                                            }`}
                                    >
                                        <IconSearch className="w-4 h-4" />
                                    </button>
                                }
                            >
                                Search captions
                            </Tooltip>
                             */}

                            {/* Pop out */}
                            {/*                             
                            {onPopOut && (
                                <OSButton
                                    onClick={handlePopOut}
                                    variant="default"
                                    size="lg"
                                    icon={<IconPopout />}
                                    className="!text-white p-1.5"
                                    tooltip="Pop out to new window"
                                />
                            )} 
                             */}

                            {/* Maximize */}
                            {onMaximize && (
                                <OSButton
                                    onClick={onMaximize}
                                    variant="default"
                                    size="lg"
                                    icon={<IconExpand45 />}
                                    className="!text-white p-1.5"
                                    tooltip="Maximize"
                                />
                            )}
                        </div>
                    </div>

                    {/* Caption display area */}
                    {showCaptions && !showCaptionSearch && (
                        <div className="text-center text-white text-sm pt-4 px-4 min-h-[32px] flex items-center justify-center">
                            {captionText ? (
                                <p className="text-2xl font-medium">{captionText}</p>
                            ) : (
                                <p className="!text-white/30 text-xs italic">
                                    {captions.length > 0 ? '' : 'No captions available'}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Caption search */}
                    {showCaptionSearch && (
                        <div className="mt-2">
                            <Input
                                label="Search captions"
                                placeholder="Search in transcript..."
                                value={captionSearchQuery}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setCaptionSearchQuery(e.target.value)
                                }
                                showLabel={false}
                                size="lg"
                                showClearButton
                                onClear={() => setCaptionSearchQuery('')}
                                className="text-primary"
                            />
                        </div>
                    )}

                    {/* Remove static subtitle - captions will be shown above */}
                </div>
            </div>
        )
    }
)

WistiaCustomPlayer.displayName = 'WistiaCustomPlayer'

export default WistiaCustomPlayer
