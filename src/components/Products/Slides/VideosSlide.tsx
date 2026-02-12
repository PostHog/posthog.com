import React, { useState, useCallback, useEffect, useRef } from 'react'
import WistiaCustomPlayer from 'components/WistiaCustomPlayer'
import { useApp } from '../../../context/App'
import { IconCollapse45, IconCopy, IconArrowRightDown } from '@posthog/icons'
import { useWistiaThumbnail } from '../../../hooks/useWistiaThumbnail'
import CloudinaryImage from 'components/CloudinaryImage'
import SmallTeam from 'components/SmallTeam'
import { useToast } from '../../../context/Toast'
import OSButton from 'components/OSButton'
import { Link } from 'gatsby'

interface VideoChapter {
    title: string
    time: number
    copyable?: boolean
}

interface Video {
    title: string
    author?: string
    wistia: string
    chapters?: VideoChapter[]
}

interface VideosSlideProps {
    productData?: {
        videos?: Record<string, Video>
    }
    videoKeys?: string[]
    title?: string
}

// Video player window component
const VideoPlayerWindow = ({ video, startTime = 0 }: any) => {
    return (
        <div className="h-full w-full bg-black">
            <WistiaCustomPlayer theme="dark" mediaId={video.wistia} autoPlay={true} startTime={startTime} />
        </div>
    )
}

export default function VideosSlide({
    productData,
    videoKeys,
    title = 'How PostHog uses PostHog AI',
}: VideosSlideProps) {
    const { addWindow } = useApp()
    const { addToast } = useToast()
    const [selectedVideoKey, setSelectedVideoKey] = useState<string | null>(null)
    const [isMaximized, setIsMaximized] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const mainPlayerRef = useRef<any>(null)

    // Get videos array from productData
    const videos = productData?.videos || {}

    // Use provided videoKeys or all videos
    const displayVideoKeys = videoKeys || Object.keys(videos)

    // Example of custom video list (commented out):
    // const displayVideoKeys = ['investigating_web_traffic', 'another_video']

    const selectedVideo = selectedVideoKey ? videos[selectedVideoKey] : null
    const currentIndex = selectedVideoKey ? displayVideoKeys.indexOf(selectedVideoKey) : -1
    const hasNext = currentIndex < displayVideoKeys.length - 1
    const hasPrev = currentIndex > 0

    const handleMaximize = useCallback(() => {
        setIsMaximized(!isMaximized)
    }, [isMaximized])

    // Add ESC key handler for maximize
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMaximized) {
                setIsMaximized(false)
            }
        }

        if (isMaximized) {
            window.addEventListener('keydown', handleEsc)
            return () => window.removeEventListener('keydown', handleEsc)
        }
    }, [isMaximized])

    const handlePopOut = useCallback(
        (videoTime: number) => {
            const timeToStart = videoTime || currentTime

            if (mainPlayerRef.current && typeof mainPlayerRef.current.pause === 'function') {
                mainPlayerRef.current.pause()
            }

            const windowElement = (
                <VideoPlayerWindow
                    key="wistia-video-popout"
                    newWindow={true}
                    location={{ pathname: 'wistia-video-popout' }}
                    pageContext={{}}
                    data={{}}
                    params={{}}
                    path="wistia-video-popout"
                    minimal={false}
                    video={selectedVideo}
                    startTime={timeToStart}
                />
            ) as any
            addWindow(windowElement)
        },
        [selectedVideo, addWindow, currentTime]
    )

    const handleVideoClick = (key: string) => {
        setSelectedVideoKey(key)
        setCurrentTime(0)
    }

    const handleBack = () => {
        setSelectedVideoKey(null)
    }

    const handleNext = () => {
        if (hasNext) {
            setSelectedVideoKey(displayVideoKeys[currentIndex + 1])
            setCurrentTime(0)
        }
    }

    const handlePrev = () => {
        if (hasPrev) {
            setSelectedVideoKey(displayVideoKeys[currentIndex - 1])
            setCurrentTime(0)
        }
    }

    const handleChapterClick = (time: number) => {
        if (!mainPlayerRef.current) return

        // Seek to the specified time
        if (typeof mainPlayerRef.current.time === 'function') {
            mainPlayerRef.current.time(time)
        }

        // Auto-play after seeking
        if (typeof mainPlayerRef.current.play === 'function') {
            mainPlayerRef.current.play()
        }
    }

    const handleCopyChapter = (title: string) => {
        navigator.clipboard.writeText(title)
        addToast({
            description: 'Copied to clipboard',
            duration: 2000,
        })
    }

    // Index view
    if (!selectedVideoKey) {
        return (
            <div
                data-scheme="primary"
                className="h-full bg-gradient-to-b from-[#08080A] to-[#737385] text-white overflow-auto"
            >
                <div className="p-8 @2xl:p-12">
                    <h2 className="text-4xl @2xl:text-5xl font-bold text-center mb-8 @2xl:mb-12">{title}</h2>

                    <div className="grid grid-cols-1 @md:grid-cols-2 @2xl:grid-cols-3 gap-6 @2xl:gap-8 items-start">
                        {displayVideoKeys.map((key) => {
                            const video = videos[key]
                            return <VideoCard key={key} video={video} onClick={() => handleVideoClick(key)} />
                        })}
                    </div>
                </div>
            </div>
        )
    }

    // Detail view
    return (
        <div className="h-full relative" id={`video-slide-${selectedVideo?.wistia}`}>
            <div className="h-full bg-gradient-to-b from-[#08080A] to-[#737385] text-white flex flex-col">
                {/* Header with navigation */}
                <div className="flex items-center justify-between p-4 @2xl:p-6">
                    <OSButton
                        variant="default"
                        size="md"
                        onClick={handlePrev}
                        disabled={!hasPrev}
                        className="!text-white/80 hover:!text-white/100 disabled:!opacity-30"
                    >
                        ← Previous
                    </OSButton>

                    <div className="flex-1 flex flex-col items-center gap-1">
                        <OSButton
                            variant="default"
                            size="md"
                            onClick={handleBack}
                            className=" !text-white/80 hover:!text-white/100"
                            icon={<IconArrowRightDown className="rotate-180" />}
                            iconPosition="left"
                        >
                            {title}:
                        </OSButton>
                        <div>
                            <h2 className="text-3xl font-bold text-center">{selectedVideo?.title}</h2>
                        </div>
                    </div>

                    <OSButton
                        variant="default"
                        size="md"
                        onClick={handleNext}
                        disabled={!hasNext}
                        className="!text-white/80 hover:!text-white/100 disabled:!opacity-30"
                    >
                        Next →
                    </OSButton>
                </div>

                {/* Main content area */}
                <div className="flex-grow flex flex-col @2xl:flex-row gap-8 px-8 pb-8">
                    {/* Video player on the left */}
                    <div className={`@2xl:flex-1 flex flex-col ${isMaximized ? 'fixed inset-0 z-50 p-16 pt-20' : ''}`}>
                        <WistiaCustomPlayer
                            key={selectedVideo?.wistia}
                            theme="dark"
                            mediaId={selectedVideo?.wistia || ''}
                            onMaximize={handleMaximize}
                            onPopOut={handlePopOut}
                            ref={mainPlayerRef}
                            onTimeUpdate={setCurrentTime}
                            className={isMaximized ? 'h-full' : ''}
                        />
                    </div>

                    {/* Sidebar with chapters and author info */}
                    <div className="@2xl:w-96 flex flex-col gap-6 overflow-auto">
                        <div>
                            {selectedVideo?.chapters && selectedVideo.chapters.length > 0 && (
                                <div className="">
                                    <h4 className="text-lg text-white/60 font-normal mb-3">
                                        Jump to a prompt in this video
                                    </h4>
                                    <ul className="space-y-2">
                                        {selectedVideo.chapters.map((chapter, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start gap-2 text-base @2xl:text-lg group"
                                            >
                                                <button
                                                    onClick={() => handleChapterClick(chapter.time)}
                                                    className="flex-1 text-left hover:text-yellow flex items-start gap-2"
                                                >
                                                    <span className="inline-block pt-1 font-mono text-sm opacity-70 shrink-0 pr-2">
                                                        {formatTime(chapter.time)}
                                                    </span>
                                                    <span
                                                        className={`flex-1 ${
                                                            chapter.copyable
                                                                ? 'before:content-["“"] after:content-["”"]'
                                                                : ''
                                                        }`}
                                                    >
                                                        {chapter.title}
                                                    </span>
                                                </button>
                                                {chapter.copyable && (
                                                    <OSButton
                                                        variant="default"
                                                        hover="border"
                                                        size="xs"
                                                        onClick={() => handleCopyChapter(chapter.title)}
                                                        className="!text-white opacity-50 group-hover:opacity-100"
                                                        aria-label="Copy prompt"
                                                        tooltip="Copy prompt"
                                                        tooltipDelay={0}
                                                    >
                                                        <IconCopy className="size-5" />
                                                    </OSButton>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {selectedVideo?.author && (
                            <div className="mt-auto">
                                <fieldset>
                                    <legend className="bg-transparent text-base">In this video</legend>
                                    <AuthorInfo name={selectedVideo.author} />
                                </fieldset>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Maximized overlay */}
            {isMaximized && (
                <>
                    <div className="absolute inset-0 z-40 bg-black" />
                    <div className="absolute top-0 left-0 right-0 flex justify-end items-center p-4 z-[60]">
                        <div className="text-white/60 text-sm bg-black/50 px-3 py-1 rounded">ESC or</div>
                        <button
                            onClick={handleMaximize}
                            className="text-white bg-black/50 rounded"
                            aria-label="Exit fullscreen"
                        >
                            <IconCollapse45 className="w-6 h-6 rotate-180" />
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

// Video card component for index view
function VideoCard({ video, onClick }: { video: Video; onClick: () => void }) {
    const { thumbnailUrl, isLoading } = useWistiaThumbnail(video.wistia)

    return (
        <button
            onClick={onClick}
            className="group relative rounded overflow-hidden hover:ring-2 hover:ring-yellow h-full flex flex-col"
        >
            <div className="aspect-video bg-black flex items-center justify-center relative">
                {isLoading ? (
                    <div className="text-white/40">Loading...</div>
                ) : thumbnailUrl ? (
                    <>
                        <img src={thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-white/40">Video player</div>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-lg @2xl:text-xl font-semibold text-center">{video.title}</h3>
            </div>
        </button>
    )
}

// Component to fetch and display author's team and pineapple preference
function AuthorInfo({ name }: { name: string }) {
    const { graphql, useStaticQuery } = require('gatsby')

    const {
        profiles: { nodes },
    } = useStaticQuery(graphql`
        {
            profiles: allSqueakProfile {
                nodes {
                    firstName
                    lastName
                    squeakId
                    avatar {
                        formats {
                            thumbnail {
                                url
                            }
                        }
                    }
                    color
                    pineappleOnPizza
                    teams {
                        data {
                            attributes {
                                slug
                            }
                        }
                    }
                }
            }
        }
    `)

    const person = nodes.find(
        ({ firstName, lastName }: { firstName: string; lastName: string }) =>
            `${firstName} ${lastName}`.toLowerCase() === name.toLowerCase()
    )

    if (!person) return null

    const teamSlug = person.teams?.data?.[0]?.attributes?.slug
    const avatarUrl = person.avatar?.formats?.thumbnail?.url
    const fullName = `${person.firstName} ${person.lastName}`
    const color = person.color || 'red'

    return (
        <div>
            <div className="flex items-start gap-3">
                {avatarUrl ? (
                    <Link to={`/community/profiles/${person.squeakId}`} state={{ newWindow: true }}>
                        <CloudinaryImage
                            src={avatarUrl as `https://res.cloudinary.com/${string}`}
                            alt={fullName}
                            className={`size-16 rounded-full overflow-hidden border-2 border-${color} p-[1.5px]`}
                            imgClassName={`object-cover rounded-full bg-${color}`}
                            width={80}
                        />
                    </Link>
                ) : (
                    <Link to={`/community/profiles/${person.squeakId}`} state={{ newWindow: true }}>
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/pages-content/images/hog-9.png"
                            alt={fullName}
                            className={`size-16 rounded-full overflow-hidden border-2 border-${color} p-[1.5px]`}
                            imgClassName={`object-cover rounded-full bg-${color}`}
                            width={80}
                        />
                    </Link>
                )}
                <div className="text-left">
                    <div className="text-2xl font-semibold">
                        <Link
                            to={`/community/profiles/${person.squeakId}`}
                            state={{ newWindow: true }}
                            className="hover:underline"
                        >
                            {fullName}
                        </Link>
                    </div>
                    {teamSlug && (
                        <div className="text-secondary">
                            <SmallTeam
                                slug={teamSlug}
                                inline
                                className="!text-white [&_span]:!text-lg [&_span]:no-underline [&_span]:hover:underline"
                            />
                        </div>
                    )}
                    {person.pineappleOnPizza !== null && person.pineappleOnPizza !== undefined && (
                        <p className="italic opacity-75 mt-1 mb-0">
                            {person.pineappleOnPizza === true && 'Believes pineapple belongs on pizza'}
                            {person.pineappleOnPizza === false && 'Does not believe pineapple belongs on pizza'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

// Helper function to format time in seconds to MM:SS
function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
}
