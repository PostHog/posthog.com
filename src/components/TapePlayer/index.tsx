import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Track, YTPlayer } from './types'
import Switch from './Switch'
import TapeButton from './TapeButton'
import CassetteTape from './CassetteTape'
import SEO from 'components/seo'
import { useUser } from 'hooks/useUser'
import { IconNotebook, IconPencil, IconPlus } from '@posthog/icons'
import { CassetteLabelBackground } from '../../data/cassetteBackgrounds'
import MixtapeEditor from './MixtapeEditor'
import { useApp } from '../../context/App'
import Mixtapes from './Mixtapes'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { navigate } from 'gatsby'
import { motion } from 'framer-motion'

const getRandomWaveformBars = () => Array.from({ length: 60 }, () => Math.random() * 80 + 20)

interface TapePlayerProps {
    id?: string
}

export default function TapePlayer({ id }: TapePlayerProps): JSX.Element {
    const { getJwt, user } = useUser()
    const { addWindow } = useApp()
    const [isPoweredOn, setIsPoweredOn] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)
    const [danceMode, setDanceMode] = useState(false)
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [rotation, setRotation] = useState(0)
    const [waveformBars, setWaveformBars] = useState<number[]>(() => getRandomWaveformBars())
    const animationRef = useRef<number>()
    const waveformRef = useRef<number>()
    const playerRef = useRef<YTPlayer | null>(null)
    const playerReadyRef = useRef(false)
    const [mixtapeSongs, setMixtapeSongs] = useState<Track[]>([])
    const [metadata, setMetadata] = useState<{
        cassetteColor?: string
        labelColor?: string
        labelBackground?: CassetteLabelBackground
    }>()
    const [mixtapeId, setMixtapeId] = useState<string | null>(null)
    const [creators, setCreators] = useState<Array<{ id: number }>>([])
    const [showTrackList, setShowTrackList] = useState(false)

    const extractVideoId = (url: string): string => {
        // Handle various YouTube URL formats
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
            /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
        ]

        for (const pattern of patterns) {
            const match = url.match(pattern)
            if (match) return match[1]
        }

        return url // Return as-is if no pattern matches
    }

    const fetchMixtapeSongs = async (mixtapeId: string) => {
        setMixtapeId(mixtapeId)
        if (!mixtapeId) return
        const jwt = await getJwt()
        const response = await fetch(
            `${process.env.GATSBY_SQUEAK_API_HOST}/api/mixtapes/${mixtapeId}?populate=*`,
            jwt
                ? {
                      headers: {
                          Authorization: `Bearer ${jwt}`,
                      },
                  }
                : undefined
        )
        const { data } = await response.json()
        const tracks = data.attributes.tracks.map(
            (track: { id: string; artist: string; title: string; youtubeUrl: string }) => ({
                id: track.id,
                artist: track.artist,
                title: track.title,
                youtubeUrl: track.youtubeUrl,
            })
        )
        setMixtapeSongs(tracks)
        setMetadata(data.attributes.metadata)
        setCreators(data.attributes.creator?.data)
    }

    useEffect(() => {
        if (!id) return
        fetchMixtapeSongs(id)
    }, [id])

    useEffect(() => {
        if (mixtapeSongs.length > 0 && !playerRef.current) {
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
        }
    }, [mixtapeSongs])

    const initializePlayer = useCallback(() => {
        if (typeof window === 'undefined' || !window.YT || playerRef.current || mixtapeSongs.length <= 0) return

        playerRef.current = new window.YT.Player('youtube-player', {
            height: '0',
            width: '0',
            videoId: extractVideoId(mixtapeSongs[0].youtubeUrl),
            host: 'https://www.youtube-nocookie.com',
            playerVars: {
                autoplay: 1,
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
    }, [mixtapeSongs])

    // Handle song changes and mixtape changes
    useEffect(() => {
        if (playerRef.current && playerReadyRef.current && mixtapeSongs.length > 0) {
            playerRef.current.loadVideoById(extractVideoId(mixtapeSongs[currentSongIndex].youtubeUrl))
            if (isPlaying) {
                playerRef.current.playVideo()
            }
        }
    }, [currentSongIndex, mixtapeSongs])

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
            setCurrentSongIndex((prev) => (prev === 0 ? mixtapeSongs.length - 1 : prev - 1))
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
            setCurrentSongIndex((prev) => (prev === mixtapeSongs.length - 1 ? 0 : prev + 1))
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
            setIsPlaying(false)
            setCreators([])
            playerRef.current?.stopVideo()
            setMixtapeSongs([])
        }
    }

    const handleShare = () => {
        if (isPoweredOn && navigator.share) {
            const videoId = extractVideoId(mixtapeSongs[currentSongIndex].youtubeUrl)
            navigator.share({
                title: mixtapeSongs[currentSongIndex].title,
                text: `Check out ${mixtapeSongs[currentSongIndex].title} by ${mixtapeSongs[currentSongIndex].artist}`,
                url: `https://www.youtube.com/watch?v=${videoId}`,
            })
        }
    }

    const handleEdit = () => {
        if (mixtapeId) {
            addWindow(
                (
                    <MixtapeEditor
                        id={mixtapeId}
                        key={`/fm/mixtapes/edit/:id`}
                        location={{ pathname: `/fm/mixtapes/edit/${mixtapeId}` }}
                        newWindow
                        onSubmit={() => {
                            fetchMixtapeSongs(mixtapeId)
                        }}
                    />
                ) as any
            )
        }
    }

    const handleMixtapeLibraryClick = () => {
        addWindow(<Mixtapes key={`fm/mixtapes`} location={{ pathname: `fm/mixtapes` }} newWindow />)
    }

    const handleNewMixtapeClick = () => {
        navigate(`/fm/mixtapes/new`, { state: { newWindow: true } })
    }

    const currentSong = mixtapeSongs[currentSongIndex]

    return (
        <ScrollArea>
            <div data-scheme="secondary" className="w-full bg-[#e4e3d8] dark:bg-primary">
                <SEO
                    title={`${
                        currentSong?.title && currentSong?.artist
                            ? `${currentSong?.title} by ${currentSong?.artist} - `
                            : ''
                    }♫ PostHog FM`}
                />
                <div className="flex items-start">
                    <div className="p-4 w-[700px] sticky top-0">
                        {/* Hidden YouTube player */}
                        <div id="youtube-player" className="hidden" />

                        {/* Waveform */}
                        <div className="mb-4 h-20 flex items-end justify-between gap-[2px] border-2 border-primary bg-white dark:bg-primary p-2 rounded">
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
                            <div className="flex flex-col items-center gap-2">
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
                            </div>

                            {/* Flippable Cassette tape */}
                            <div className="flex-1 relative">
                                <div className="border-2 border-primary shadow-inner aspect-[100/63] rounded-[0.5rem] bg-accent w-full h-full absolute inset-0" />
                                <motion.div
                                    initial={{ opacity: 0, translateY: '-100%' }}
                                    animate={{
                                        opacity: mixtapeSongs.length > 0 ? 1 : 0,
                                        translateY: mixtapeSongs.length > 0 ? '0%' : '-100%',
                                    }}
                                    exit={{
                                        opacity: mixtapeSongs.length > 0 ? 0 : 1,
                                        translateY: mixtapeSongs.length > 0 ? '-100%' : '0%',
                                    }}
                                    transition={{ duration: 0.5 }}
                                    onAnimationComplete={() => {
                                        if (mixtapeSongs.length <= 0) {
                                            navigate(`/fm`)
                                        }
                                    }}
                                >
                                    <div className="perspective-1000">
                                        <div
                                            className="relative w-full transition-transform duration-700 preserve-3d"
                                            style={{
                                                transformStyle: 'preserve-3d',
                                                transform: showTrackList ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                            }}
                                        >
                                            {/* Front - Cassette */}
                                            <div
                                                className="w-full backface-hidden"
                                                style={{ backfaceVisibility: 'hidden' }}
                                            >
                                                <CassetteTape
                                                    title={currentSong?.title}
                                                    artist={currentSong?.artist}
                                                    rotation={rotation}
                                                    cassetteColor={metadata?.cassetteColor}
                                                    labelColor={metadata?.labelColor}
                                                    labelBackground={metadata?.labelBackground}
                                                />
                                            </div>

                                            {/* Back - Track list */}
                                            <div
                                                className="absolute inset-0 w-full backface-hidden"
                                                style={{
                                                    backfaceVisibility: 'hidden',
                                                    transform: 'rotateY(180deg)',
                                                }}
                                            >
                                                <div
                                                    className="w-full h-full border-2 border-primary shadow-inner aspect-[100/63] rounded overflow-hidden"
                                                    style={{
                                                        backgroundColor: metadata?.cassetteColor || '#e8e8e8',
                                                    }}
                                                >
                                                    {/* Notebook paper style */}
                                                    <div
                                                        className="h-full w-full relative bg-[#fffef0]"
                                                        style={{
                                                            backgroundImage: `
                                                        repeating-linear-gradient(
                                                            transparent,
                                                            transparent 27px,
                                                            #94a9cf 27px,
                                                            #94a9cf 28px
                                                        ),
                                                        linear-gradient(
                                                            90deg,
                                                            transparent 0,
                                                            transparent 45px,
                                                            #ef9a9a 45px,
                                                            #ef9a9a 47px,
                                                            transparent 47px
                                                        )
                                                    `,
                                                        }}
                                                    >
                                                        <div className="pl-[54px] pr-2 h-full overflow-y-auto">
                                                            <div
                                                                className="text-[13px] font-mono text-primary"
                                                                style={{
                                                                    lineHeight: '28px',
                                                                    paddingTop: '28px',
                                                                }}
                                                            >
                                                                {mixtapeSongs.map((song, index) => (
                                                                    <div
                                                                        key={song.id}
                                                                        className={`cursor-pointer !text-accent-dark transition-colors ${
                                                                            index === currentSongIndex
                                                                                ? 'font-bold'
                                                                                : ''
                                                                        }`}
                                                                        onClick={() => {
                                                                            if (isPoweredOn) {
                                                                                setCurrentSongIndex(index)
                                                                                if (
                                                                                    playerRef.current &&
                                                                                    playerReadyRef.current
                                                                                ) {
                                                                                    playerRef.current.playVideo()
                                                                                }
                                                                            }
                                                                        }}
                                                                    >
                                                                        {index + 1}. {song.artist} - {song.title}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                            <div className="flex flex-col items-center gap-2">
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
                                {/* Track list button */}
                                {mixtapeSongs.length > 0 && (
                                    <div className="w-full aspect-square mt-auto">
                                        <TapeButton
                                            label="Track list"
                                            icon={<IconNotebook className="size-5" />}
                                            onClick={() => setShowTrackList(!showTrackList)}
                                            disabled={!isPoweredOn}
                                            isPressed={showTrackList}
                                        />
                                    </div>
                                )}
                                {creators?.some((creator) => creator.id === user?.profile?.id) && (
                                    <div className="w-full aspect-square">
                                        <TapeButton
                                            label="Edit"
                                            icon={<IconPencil className="size-5" />}
                                            onClick={handleEdit}
                                            disabled={!isPoweredOn}
                                        />
                                    </div>
                                )}
                            </div>
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
                            <TapeButton
                                label="Pause"
                                icon="||"
                                onClick={handlePause}
                                disabled={!isPoweredOn || !isPlaying}
                            />
                            <TapeButton label="Skip" icon="▷▷" onClick={handleSkip} disabled={!isPoweredOn} />
                            <TapeButton label="Share" icon="↗" onClick={handleShare} disabled={!isPoweredOn} />
                        </div>
                    </div>
                </div>
                <div className="p-3 mt-4 border-t border-primary flex items-center space-x-3">
                    <div className="w-[90px] h-[80px]">
                        <TapeButton
                            icon={
                                <div className="w-[70px]">
                                    <CassetteTape teeth={false} spindle={false} />
                                </div>
                            }
                            label="Mixtape library"
                            onClick={handleMixtapeLibraryClick}
                        />
                    </div>
                    <div className="w-[90px] h-[80px]">
                        <TapeButton
                            icon={<IconPlus className="size-5" />}
                            label="Create mixtape"
                            onClick={handleNewMixtapeClick}
                        />
                    </div>
                </div>
            </div>
        </ScrollArea>
    )
}
