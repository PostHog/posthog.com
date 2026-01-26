import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Track, YTPlayer } from './types'
import Switch from './Switch'
import TapeButton from './TapeButton'
import CassetteTape from './CassetteTape'
import SEO from 'components/seo'
import { useUser } from 'hooks/useUser'
import { IconCheck, IconNotebook, IconPencil, IconPlus, IconVideoCamera } from '@posthog/icons'
import { CassetteLabelBackground } from '../../data/cassetteBackgrounds'
import MixtapeEditor from './MixtapeEditor'
import { useApp } from '../../context/App'
import { useToast } from '../../context/Toast'
import Mixtapes from './Mixtapes'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { navigate } from 'gatsby'
import { motion } from 'framer-motion'
import DanceMode from 'components/DanceMode'
import { useWindow } from '../../context/Window'
import { extractVideoId } from './utils'

const getRandomWaveformBars = () => Array.from({ length: 60 }, () => Math.random() * 80 + 20)

interface TapePlayerProps {
    id?: string
}

export default function TapePlayer({ id }: TapePlayerProps): JSX.Element {
    const { getJwt, user, isModerator } = useUser()
    const { appWindow } = useWindow()
    const { addWindow, windows, closeWindow, updateWindow } = useApp()
    const { addToast } = useToast()
    const [isPoweredOn, setIsPoweredOn] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isSpinningFast, setIsSpinningFast] = useState(false)
    const [danceMode, setDanceMode] = useState(false)
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [rotation, setRotation] = useState(0)
    const [copied, setCopied] = useState(false)
    const [waveformBars, setWaveformBars] = useState<number[]>(() => getRandomWaveformBars())
    const animationRef = useRef<number>()
    const waveformRef = useRef<number>()
    const playerRef = useRef<YTPlayer | null>(null)
    const playerReadyRef = useRef(false)
    const [isPlayerReady, setIsPlayerReady] = useState(false)
    const [pendingPlayerAction, setPendingPlayerAction] = useState<'play' | 'pause' | null>(null)
    const insertAudioRef = useRef<HTMLAudioElement | null>(null)
    const clickAudioRef = useRef<HTMLAudioElement | null>(null)
    const switchAudioRef = useRef<HTMLAudioElement | null>(null)
    const rewindAudioRef = useRef<HTMLAudioElement | null>(null)
    const [mixtapeSongs, setMixtapeSongs] = useState<Track[]>([])
    const [metadata, setMetadata] = useState<{
        cassetteColor?: string
        labelColor?: string
        labelBackground?: CassetteLabelBackground
    }>()
    const [mixtapeId, setMixtapeId] = useState<number | null>(null)
    const [creators, setCreators] = useState<Array<{ id: number }>>([])
    const [showTrackList, setShowTrackList] = useState(false)
    const [fetchingMixtape, setFetchingMixtape] = useState(true)
    const [rewinding, setRewinding] = useState(false)
    const [fastForwarding, setFastForwarding] = useState(false)
    const [mixtapeDrawerOpen, setMixtapeDrawerOpen] = useState(true)
    const [mixtapeTitle, setMixtapeTitle] = useState<string>()
    const [showVideo, setShowVideo] = useState(false)

    const fetchMixtapeSongs = async (mixtapeId: number) => {
        setMixtapeId(mixtapeId)
        if (!mixtapeId) {
            setFetchingMixtape(false)
            return
        }
        setFetchingMixtape(true)
        try {
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
            if (!response.ok) {
                throw new Error(`Failed to fetch mixtape: ${response.status}`)
            }
            const { data } = await response.json()
            const tracks = data.attributes.tracks.map((track: { id: string; title: string; youtubeUrl: string }) => ({
                id: track.id,
                title: track.title,
                youtubeUrl: track.youtubeUrl,
            }))
            setMixtapeSongs(tracks)
            setMetadata(data.attributes.metadata)
            setCreators(data.attributes.creator?.data)
            setMixtapeTitle(data.attributes.title)
        } catch (error) {
            console.error(error)
            addToast({
                error: true,
                description: 'Unable to load mixtape. Please try again.',
            })
            setMixtapeSongs([])
            setMetadata(undefined)
            setCreators([])
        } finally {
            setFetchingMixtape(false)
        }
    }

    useEffect(() => {
        if (!id) {
            setFetchingMixtape(false)
            return
        }
        fetchMixtapeSongs(Number(id))
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

    useEffect(() => {
        const danceModeWindow = windows.find((window) => window.key === 'fm/dance-mode')
        if (!danceModeWindow) {
            setDanceMode(false)
        }
    }, [windows])

    useEffect(() => {
        setCurrentSongIndex((prev) => {
            if (mixtapeSongs.length === 0) {
                return 0
            }

            return prev >= mixtapeSongs.length ? 0 : prev
        })
    }, [mixtapeSongs.length])

    useEffect(() => {
        if (!playerRef.current || !pendingPlayerAction || !playerReadyRef.current) {
            return
        }

        if (pendingPlayerAction === 'play') {
            playerRef.current.playVideo()
        } else {
            playerRef.current.pauseVideo()
        }

        setPendingPlayerAction(null)
    }, [pendingPlayerAction, isPlayerReady])

    const playRewindSound = useCallback(() => {
        if (!rewindAudioRef.current) {
            return Promise.resolve()
        }

        return new Promise<void>((resolve) => {
            const audio = rewindAudioRef.current
            if (!audio) {
                resolve()
                return
            }

            const cleanup = () => {
                audio.removeEventListener('timeupdate', handleTimeUpdate)
                audio.removeEventListener('ended', handleEnded)
            }

            const handleResolve = () => {
                cleanup()
                resolve()
            }

            const handleTimeUpdate = () => {
                if (!audio.duration) {
                    return
                }
                if (audio.currentTime / audio.duration >= 0.5) {
                    handleResolve()
                }
            }

            const handleEnded = () => {
                handleResolve()
            }

            audio.addEventListener('timeupdate', handleTimeUpdate)
            audio.addEventListener('ended', handleEnded)
            audio.currentTime = 0
            audio.play().catch(() => null)
        })
    }, [])

    const playInsertSound = useCallback(() => {
        if (!insertAudioRef.current) {
            return
        }
        insertAudioRef.current.currentTime = 0
        insertAudioRef.current.play().catch(() => null)
    }, [])

    useEffect(() => {
        if (typeof Audio === 'undefined') {
            return
        }

        const sounds: Array<{ ref: React.MutableRefObject<HTMLAudioElement | null>; src: string }> = [
            { ref: rewindAudioRef, src: '/sounds/rewind.mp3' },
            { ref: insertAudioRef, src: '/sounds/insert.mp3' },
            { ref: clickAudioRef, src: '/sounds/click.mp3' },
            { ref: switchAudioRef, src: '/sounds/switch.mp3' },
        ]

        sounds.forEach(({ ref, src }) => {
            ref.current = new Audio(src)
        })

        return () => {
            sounds.forEach(({ ref }) => {
                if (ref.current) {
                    ref.current.pause()
                    ref.current = null
                }
            })
        }
    }, [])

    useEffect(() => {
        return () => {
            if (playerRef.current) {
                try {
                    playerRef.current.pauseVideo()
                    playerRef.current.stopVideo()
                } catch {
                    // Noop
                }
                playerRef.current.destroy?.()
                playerRef.current = null
            }
            playerReadyRef.current = false
        }
    }, [])

    const playClickSound = useCallback(() => {
        if (!clickAudioRef.current) {
            return
        }
        clickAudioRef.current.currentTime = 0
        clickAudioRef.current.play().catch(() => null)
    }, [])

    const playSwitchSound = useCallback(() => {
        if (!switchAudioRef.current) {
            return
        }
        switchAudioRef.current.currentTime = 0
        switchAudioRef.current.play().catch(() => null)
    }, [])

    const initializePlayer = useCallback(() => {
        if (typeof window === 'undefined' || !window.YT || playerRef.current || mixtapeSongs.length <= 0) return

        playerReadyRef.current = false
        setIsPlayerReady(false)

        playerRef.current = new window.YT.Player('youtube-player', {
            height: '100%',
            width: '100%',
            videoId: extractVideoId(mixtapeSongs[0].youtubeUrl),
            host: 'https://www.youtube-nocookie.com',
            playerVars: {
                autoplay: 1,
                controls: 1,
                disablekb: 1,
                fs: 0,
                modestbranding: 1,
                rel: 0,
                playsinline: 1,
            },
            events: {
                onReady: () => {
                    playerReadyRef.current = true
                    setIsPlayerReady(true)
                },
                onStateChange: (event: { data: number }) => {
                    // Update playing state based on YouTube player state
                    if (event.data === window.YT.PlayerState.PLAYING) {
                        setIsPlaying(true)
                    } else if (event.data === window.YT.PlayerState.PAUSED) {
                        setIsPlaying(false)
                    } else if (event.data === window.YT.PlayerState.ENDED) {
                        setIsPlaying(false)
                        // Auto-advance to next track
                        setCurrentSongIndex((prev) => {
                            const nextIndex = prev === mixtapeSongs.length - 1 ? 0 : prev + 1
                            return nextIndex
                        })
                    }
                },
            },
        })
    }, [mixtapeSongs])

    // Handle song changes and mixtape changes
    useEffect(() => {
        const song = mixtapeSongs[currentSongIndex]
        if (playerRef.current && playerReadyRef.current && mixtapeSongs.length > 0 && song) {
            playerRef.current.loadVideoById(extractVideoId(song.youtubeUrl))
            if (isPlaying) {
                playerRef.current.playVideo()
            }
        }
    }, [currentSongIndex, mixtapeSongs])

    // Animate the tape reels when playing or fast-spinning
    useEffect(() => {
        if ((isPlaying || isSpinningFast) && isPoweredOn) {
            const animate = () => {
                setRotation((prev) => (prev + (isSpinningFast ? 16 : 2)) % 360)
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
    }, [isPlaying, isSpinningFast, isPoweredOn])

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
        if (!isPoweredOn || !playerRef.current) {
            return
        }

        playClickSound()

        if (!playerReadyRef.current) {
            setPendingPlayerAction('play')
            return
        }

        playerRef.current.playVideo()
    }

    const handlePause = () => {
        if (!playerRef.current) {
            return
        }

        playClickSound()

        if (!playerReadyRef.current) {
            setPendingPlayerAction('pause')
            return
        }

        playerRef.current.pauseVideo()
    }

    const changeTrack = async (direction: 1 | -1) => {
        if (!isPoweredOn || !playerRef.current || !playerReadyRef.current || mixtapeSongs.length === 0) {
            return
        }
        if (direction === -1) {
            setRewinding(true)
        } else {
            setFastForwarding(true)
        }
        setIsSpinningFast(true)
        const wasPlaying = isPlaying
        playerRef.current.pauseVideo()
        try {
            await playRewindSound()
        } finally {
            setIsSpinningFast(false)
            setRewinding(false)
            setFastForwarding(false)
        }
        setCurrentSongIndex((prev) => {
            if (direction === -1) {
                return prev === 0 ? mixtapeSongs.length - 1 : prev - 1
            }
            return prev === mixtapeSongs.length - 1 ? 0 : prev + 1
        })
        if (wasPlaying) {
            setTimeout(() => {
                playerRef.current?.playVideo()
            }, 100)
        }
    }

    const handlePrev = () => {
        void changeTrack(-1)
    }

    const handleSkip = () => {
        void changeTrack(1)
    }

    const handleEject = () => {
        if (isPoweredOn) {
            setIsPlaying(false)
            setCreators([])
            setPendingPlayerAction(null)
            playerRef.current?.stopVideo()
            setMixtapeSongs([])
            if (mixtapeSongs.length > 0) {
                playInsertSound()
            }
        }
    }

    const handleShare = async () => {
        if (!isPoweredOn || typeof window === 'undefined' || typeof navigator === 'undefined') {
            return
        }
        playClickSound()
        const mixtapeUrl = `${window.location.origin}/fm?mixtape=${mixtapeId}`
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(mixtapeUrl)
            }
            setCopied(true)
            setTimeout(() => {
                setCopied(false)
            }, 3000)
            addToast({
                description: 'Link copied to clipboard',
            })
        } catch (error) {
            addToast({
                error: true,
                description: 'Unable to copy link. Please try again.',
            })
        }
    }

    const handleEdit = () => {
        playClickSound()
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
                ) as Parameters<typeof addWindow>[0]
            )
        }
    }

    const handleMixtapeLibraryClick = () => {
        playClickSound()
        setMixtapeDrawerOpen((prev) => !prev)
    }

    const handleNewMixtapeClick = () => {
        playClickSound()
        navigate(`/fm/mixtapes/new`, { state: { newWindow: true } })
    }

    const handlePowerToggle = () => {
        playSwitchSound()
        setPendingPlayerAction(null)
        setIsPoweredOn((prev) => {
            if (prev) {
                if (playerRef.current && playerReadyRef.current) {
                    playerRef.current.pauseVideo()
                }
                setIsPlaying(false)
            }
            return !prev
        })
    }

    const handleDanceModeToggle = () => {
        playSwitchSound()
        const danceModeWindow = windows.find((window) => window.key === 'fm/dance-mode')
        if (danceMode) {
            if (danceModeWindow) {
                closeWindow(danceModeWindow)
            }
        } else {
            if (!danceModeWindow) {
                addWindow(
                    (
                        <DanceMode key={`fm/dance-mode`} location={{ pathname: `fm/dance-mode` }} newWindow />
                    ) as Parameters<typeof addWindow>[0]
                )
            }
        }
        setDanceMode((prev) => !prev)
    }

    const handleToggleTrackList = () => {
        playClickSound()
        if (!isPoweredOn) {
            return
        }
        setShowTrackList((prev) => !prev)
    }

    const handleToggleVideo = () => {
        playClickSound()
        if (!isPoweredOn) {
            return
        }
        setShowVideo((prev) => !prev)
    }

    useEffect(() => {
        if (appWindow) {
            updateWindow(appWindow, {
                size: {
                    width: mixtapeDrawerOpen ? 1100 : 650,
                },
            })
        }
    }, [mixtapeDrawerOpen])

    const handleMixtapePlay = (id: number) => {
        navigate(`/fm?mixtape=${id}`)
    }

    const handleTrackClick = ({ mixtapeId, trackIndex }: { mixtapeId: number; trackIndex: number }) => {
        setCurrentSongIndex(trackIndex)
        fetchMixtapeSongs(mixtapeId)
    }

    const currentSong = mixtapeSongs[currentSongIndex]

    return (
        <div data-scheme="secondary" className="size-full bg-[#e4e3d8] dark:bg-primary">
            <SEO title={`${currentSong?.title ? `${currentSong?.title} - ` : ''}♫ PostHog FM`} />
            <div className="flex items-start h-full">
                <div className="w-[650px] flex-shrink-0 border-r border-primary">
                    <div className="flex items-start">
                        <div className="p-4 w-full sticky top-0">
                            {/* Waveform */}
                            <div
                                className={`mb-4 h-20 flex items-end justify-between gap-[2px] border-2 border-primary dark:bg-primary p-2 rounded transition-colors ${
                                    isPoweredOn ? 'bg-white' : ''
                                }`}
                            >
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
                                    <Switch label="Power" isOn={isPoweredOn} onToggle={handlePowerToggle} />
                                    {creators?.some((creator) => creator.id === user?.profile?.id) && (
                                        <div className="w-full aspect-square mt-auto">
                                            <TapeButton
                                                label="Edit"
                                                icon={<IconPencil className="size-5" />}
                                                onClick={handleEdit}
                                                disabled={!isPoweredOn}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Flippable Cassette tape */}
                                <div className="flex-1 relative h-full">
                                    <div className="border-2 border-primary shadow-inner aspect-[100/63] rounded-[0.5rem] bg-accent w-full h-auto absolute inset-0" />

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
                                        transition={{ type: 'tween' }}
                                        onAnimationStart={() => {
                                            playInsertSound()
                                        }}
                                        onAnimationComplete={() => {
                                            if (!fetchingMixtape && mixtapeSongs.length <= 0) {
                                                setTimeout(() => {
                                                    navigate(`/fm`)
                                                }, 300)
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
                                                        rotation={rotation}
                                                        cassetteColor={metadata?.cassetteColor}
                                                        labelColor={metadata?.labelColor}
                                                        labelBackground={metadata?.labelBackground}
                                                    />
                                                    <div
                                                        className={`absolute inset-0 z-10 overflow-hidden rounded-[0.5rem] ${
                                                            showVideo && !showTrackList
                                                                ? 'pointer-events-auto'
                                                                : 'pointer-events-none'
                                                        }`}
                                                    >
                                                        <motion.div
                                                            className="size-full bg-primary overflow-hidden"
                                                            initial={{ translateY: '100%' }}
                                                            animate={{
                                                                translateY: showVideo ? '0%' : '100%',
                                                            }}
                                                            transition={{ type: 'tween' }}
                                                        >
                                                            <div className="size-full flex items-center justify-center">
                                                                <div
                                                                    id="youtube-player"
                                                                    className="w-full aspect-video"
                                                                />
                                                            </div>
                                                        </motion.div>
                                                    </div>
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
                                                        className="w-full h-full border-2 border-primary shadow-inner aspect-[100/63] rounded-[0.5rem] overflow-hidden flex flex-col"
                                                        style={{
                                                            backgroundColor: metadata?.cassetteColor || '#e8e8e8',
                                                        }}
                                                    >
                                                        {/* Notebook paper style */}
                                                        <div
                                                            className="relative bg-[#fffef0] flex flex-col"
                                                            style={{
                                                                backgroundImage: `
                                                        repeating-linear-gradient(
                                                            transparent,
                                                            transparent 47px,
                                                            #94a9cf 47px,
                                                            #94a9cf 48px
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
                                                            <div className="pl-[54px] pr-2 py-2">
                                                                <h3 className="text-2xl font-bold text-primary line-clamp-1">
                                                                    {mixtapeTitle}
                                                                </h3>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className="h-full w-full relative bg-[#fffef0] min-h-0"
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
                                                            <ScrollArea>
                                                                <div className="pl-[54px] pr-2 h-full">
                                                                    <div
                                                                        className="text-[13px] font-mono text-primary"
                                                                        style={{
                                                                            lineHeight: '28px',
                                                                        }}
                                                                    >
                                                                        {mixtapeSongs.map((song, index) => (
                                                                            <button
                                                                                key={song.id}
                                                                                className={`cursor-pointer !text-accent-dark transition-colors w-full text-left ${
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
                                                                                {index + 1}. {song.title}
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </ScrollArea>
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
                                        onToggle={handleDanceModeToggle}
                                        disabled={!isPoweredOn || !mixtapeSongs.length}
                                    />
                                    {/* Track list and Video buttons */}
                                    {mixtapeSongs.length > 0 && (
                                        <div className="w-full flex flex-col gap-1 mt-auto">
                                            <div className="w-full aspect-square">
                                                <TapeButton
                                                    label="Track list"
                                                    icon={<IconNotebook className="size-5" />}
                                                    onClick={handleToggleTrackList}
                                                    disabled={!isPoweredOn}
                                                    isPressed={showTrackList}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Control buttons */}
                            <div className="gap-2 grid grid-cols-6 h-20 w-full">
                                <TapeButton
                                    label="Eject"
                                    icon="⏏"
                                    onClick={handleEject}
                                    disabled={!isPoweredOn || !mixtapeSongs.length}
                                />
                                <TapeButton
                                    label="Prev"
                                    icon="◁◁"
                                    onClick={handlePrev}
                                    disabled={!isPoweredOn || !mixtapeSongs.length || rewinding}
                                    isPressed={rewinding}
                                />
                                <TapeButton
                                    label="Play"
                                    icon="▷"
                                    onClick={handlePlay}
                                    disabled={
                                        !isPoweredOn ||
                                        isPlaying ||
                                        !mixtapeSongs.length ||
                                        pendingPlayerAction === 'play'
                                    }
                                    isPressed={isPlaying || pendingPlayerAction === 'play'}
                                />
                                <TapeButton
                                    label="Pause"
                                    icon="||"
                                    onClick={handlePause}
                                    disabled={!isPoweredOn || !isPlaying || !mixtapeSongs.length}
                                />
                                <TapeButton
                                    label="Skip"
                                    icon="▷▷"
                                    onClick={handleSkip}
                                    disabled={!isPoweredOn || !mixtapeSongs.length || fastForwarding}
                                    isPressed={fastForwarding}
                                />
                                <TapeButton
                                    label="Video"
                                    icon={<IconVideoCamera className="size-6" />}
                                    onClick={handleToggleVideo}
                                    disabled={!isPoweredOn || !mixtapeSongs.length}
                                    isPressed={showVideo}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-3 border-t border-primary flex items-center space-x-3">
                        <div className="w-[90px] h-[80px]">
                            <TapeButton
                                icon={
                                    <div className="w-[70px]">
                                        <CassetteTape minimal />
                                    </div>
                                }
                                label="Mixtape library"
                                onClick={handleMixtapeLibraryClick}
                                isPressed={mixtapeDrawerOpen}
                            />
                        </div>
                        {isModerator && (
                            <div className="w-[90px] h-[80px]">
                                <TapeButton
                                    icon={<IconPlus className="size-6" />}
                                    label="Create mixtape"
                                    onClick={handleNewMixtapeClick}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full w-[450px] h-full">
                    <Mixtapes onPlay={handleMixtapePlay} onTrackClick={handleTrackClick} />
                </div>
            </div>
        </div>
    )
}
