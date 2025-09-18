import React, { useState, useCallback, useEffect, useRef } from 'react'
import WistiaCustomPlayer from 'components/WistiaCustomPlayer'
import { useApp } from '../../../context/App'
import { IconChevronDown } from '@posthog/icons'

interface PostHogOnPostHogSlideProps {
    productData: {
        videos: {
            overview: {
                youtube: string
                wistia: string
            }
        }
        postHogOnPostHog: {
            title: string
            description?: string
            benefits?: {
                title: string
                description: string
            }[]
        }
    }
}

// Video player window component
const VideoPlayerWindow = ({ productData, startTime = 0 }: any) => {
    return (
        <div className="h-full w-full bg-black">
            <WistiaCustomPlayer mediaId={productData.videos?.overview?.wistia} autoPlay={true} startTime={startTime} />
        </div>
    )
}

export default function PostHogOnPostHogSlide({ productData }: PostHogOnPostHogSlideProps) {
    const { addWindow } = useApp()
    const [isMaximized, setIsMaximized] = useState(false)
    const [isThumbnail, setIsThumbnail] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const mainPlayerRef = useRef<any>(null)

    // Detect if we're rendered inside a thumbnail context
    useEffect(() => {
        const checkThumbnailMode = () => {
            // Get the root element of this component using the ID we set
            const rootElement = document.getElementById(`posthog-slide-${productData.videos?.overview?.wistia}`)

            if (rootElement) {
                const rect = rootElement.getBoundingClientRect()

                // Thumbnails are typically much smaller than full slides
                // Landscape thumbnails: ~192px wide, Portrait: ~128px wide
                // Full slides are typically > 600px wide
                if (rect.width > 0 && rect.width < 250) {
                    console.log(`PostHogOnPostHogSlide: Detected thumbnail mode (width: ${rect.width}px)`)
                    setIsThumbnail(true)
                    return true
                }
            }
            return false
        }

        // Check immediately
        if (!checkThumbnailMode()) {
            // If not detected immediately, check again after layout
            const timer1 = setTimeout(checkThumbnailMode, 50)
            const timer2 = setTimeout(checkThumbnailMode, 150)

            return () => {
                clearTimeout(timer1)
                clearTimeout(timer2)
            }
        }
    }, [productData.videos?.overview?.wistia])

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
            // Store the current time before pausing
            const timeToStart = videoTime || currentTime

            // Pause immediately - the ref should be ready
            if (mainPlayerRef.current && typeof mainPlayerRef.current.pause === 'function') {
                console.log('Pausing main video at time:', timeToStart)
                mainPlayerRef.current.pause()
            } else {
                console.log('Warning: Could not pause video immediately', mainPlayerRef.current)
                // Try again after a short delay
                setTimeout(() => {
                    if (mainPlayerRef.current && typeof mainPlayerRef.current.pause === 'function') {
                        console.log('Pausing main video (delayed) at time:', timeToStart)
                        mainPlayerRef.current.pause()
                    }
                }, 250)
            }

            // Create a new app window with the video player
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
                    productData={productData}
                    startTime={timeToStart}
                />
            ) as any
            addWindow(windowElement)
        },
        [productData, addWindow, currentTime]
    )

    // If we're in thumbnail mode, show a static preview
    if (isThumbnail) {
        return (
            <div className="h-full flex flex-col bg-black text-white">
                {/* Header with "Demo" text */}
                <div className="text-center py-6">
                    <h1 className="text-5xl font-serif italic text-white/90">Demo</h1>
                </div>

                {/* Main content area */}
                <div className="flex-grow flex gap-8 px-8 pb-8">
                    {/* Static thumbnail on the left */}
                    <div className="flex-1 flex flex-col">
                        <div className="relative bg-gray-dark rounded-lg overflow-hidden">
                            <div className="aspect-video bg-black flex items-center justify-center">
                                <div className="text-white/40">Video Player</div>
                            </div>
                        </div>
                    </div>

                    {/* Benefits list on the right */}
                    <div className="w-80">
                        <h2 className="text-xl font-medium mb-6">
                            {productData.postHogOnPostHog?.title || 'How PostHog uses PostHog'}
                        </h2>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full relative" id={`posthog-slide-${productData.videos?.overview?.wistia}`}>
            {/* Regular content */}
            <div className="h-full bg-gradient-to-b from-[#08080A] to-[#737385] text-white">
                <div className="mb-4 pt-8 px-8">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 239 72" className="h-16 mx-auto">
                        <path
                            fill="#fff"
                            d="M222.154 29.936c-2.816 0-6.272 1.408-10.624 5.76-4.608 4.736-7.04 12.672-7.04 18.432 0 5.888 1.536 9.088 6.016 9.088 8.064 0 17.664-11.648 17.664-25.984 0-5.248-2.176-7.296-6.016-7.296Zm15.872 2.304c0 7.552-3.968 16.768-13.312 25.984-7.936 7.808-18.816 12.672-24.704 12.672-4.864 0-6.272-3.456-6.272-7.936 0-8.448 4.48-18.432 10.624-24.576 8.96-8.96 19.584-14.208 27.008-14.208 4.864 0 6.656 3.328 6.656 8.064ZM175.682 49.264c3.072-9.344 3.584-11.008 3.584-12.8 0-1.152-.64-1.536-1.664-1.536-1.92 0-8.576 4.224-14.976 10.368-5.504 5.376-8.576 12.544-9.984 17.792-2.944 3.2-9.856 5.76-11.648 5.76 5.632-17.536 8.192-26.88 8.192-31.104 0-1.92-.512-2.816-1.536-2.816-1.28 0-4.992 1.664-9.6 6.272-6.272 6.272-10.24 12.928-13.184 20.992-4.224 3.84-10.496 6.784-12.288 6.784 5.76-16.896 8.448-28.416 9.088-37.376 2.048-2.56 9.088-6.912 11.776-6.912 0 2.944-1.408 12.544-3.84 21.376 9.344-9.472 22.272-20.224 30.08-20.224 1.28 0 1.792 1.28 1.792 2.688 0 3.328-.512 6.4-3.712 17.536 6.144-6.144 25.856-21.12 32.384-21.12 2.176 0 2.432.512 2.432 2.048 0 2.176-1.792 6.4-4.992 14.976-2.048 5.376-3.84 12.672-3.84 14.592 0 2.048.384 3.84 2.048 4.48-3.968 4.864-11.264 8.96-14.976 8.96 0-3.584 1.408-10.24 4.864-20.736ZM86.027 47.344c-.512 1.92-1.024 4.992-1.024 7.808 0 2.176.512 4.352 1.536 5.376 1.152 1.28 2.944 1.792 5.248 1.792 4.736 0 11.776-4.48 19.456-12.16 0 .896 0 3.072-.256 3.84-7.808 7.808-21.76 16.384-31.232 16.384-2.56 0-4.992-2.304-4.992-7.808 0-10.624 3.84-20.736 10.752-27.52 8.32-8.32 18.688-11.264 23.424-11.264 3.328 0 4.864 1.792 4.864 3.328 0 2.816-1.792 5.888-3.584 7.552-6.4 6.4-15.616 11.008-24.192 12.672Zm16.128-9.472c1.28-1.28 2.304-3.456 2.304-4.864 0-2.432-1.408-4.096-4.608-4.096-1.664 0-4.48.896-6.4 2.688-3.072 3.072-5.376 7.936-6.656 12.288 2.176 0 11.648-2.304 15.36-6.016ZM.954 70.64c1.792-9.856 12.032-38.016 19.456-53.12 3.456-2.688 9.984-4.608 13.184-4.608-3.072 5.504-6.912 14.208-10.496 23.424-3.84 9.984-6.912 18.304-8.32 25.472-.256 1.536.64 1.92 2.688 2.56 1.92.64 4.864 1.024 8.064 1.024 23.168 0 37.632-17.664 37.632-35.968 0-6.144-2.688-10.624-6.784-13.824-7.424-5.632-19.584-7.296-30.208-7.168-4.992 0-13.568.384-17.408.768.512-1.408 6.528-6.272 10.112-7.808 3.456-.384 8.064-.64 12.8-.64 27.264 0 43.008 8.704 43.008 24.832 0 22.272-26.368 45.952-63.232 45.952-3.328 0-8.576-.256-10.496-.896Z"
                        />
                    </svg>

                    <h2 className="sr-only">Demo</h2>
                </div>

                {/* Main content area */}
                <div className="flex-grow flex gap-8 px-8 pb-8">
                    {/* Video player on the left */}
                    <div className={`flex-1 flex flex-col ${isMaximized ? 'fixed inset-0 z-50 p-16 pt-20' : ''}`}>
                        <WistiaCustomPlayer
                            mediaId={productData.videos?.overview?.wistia}
                            onMaximize={handleMaximize}
                            onPopOut={handlePopOut}
                            ref={mainPlayerRef}
                            onTimeUpdate={setCurrentTime}
                            className={isMaximized ? 'h-full' : ''}
                        />

                        {/* Answers section below video */}
                        {!isMaximized && (
                            <div className="mt-6 text-center">
                                <button className="text-white/60 hover:text-white text-sm transition-colors">
                                    Answers
                                </button>
                                <p className="text-xs text-white/40 mt-1">No presenter notes for this slide.</p>
                            </div>
                        )}
                    </div>

                    {/* Benefits list on the right */}
                    <div className="w-80">
                        <h2 className="text-xl font-medium mb-6">{productData.postHogOnPostHog?.title}</h2>
                        <ul className="space-y-4">
                            {productData.postHogOnPostHog?.benefits?.map((benefit) => (
                                <li key={benefit.title} className="flex items-start">
                                    <span className="text-yellow mr-3 mt-1">•</span>
                                    <div>
                                        <strong className="font-medium">{benefit.title}</strong>
                                        <span className="text-white/70 ml-1">{benefit.description}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Maximized overlay - just shows controls and background */}
            {isMaximized && (
                <>
                    <div className="absolute inset-0 z-40 bg-black" />
                    <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-[60]">
                        <button
                            onClick={handleMaximize}
                            className="text-white/70 hover:text-white p-2 bg-black/50 rounded"
                            aria-label="Exit fullscreen"
                        >
                            <IconChevronDown className="w-6 h-6 rotate-180" />
                        </button>
                        <div className="text-white/60 text-sm bg-black/50 px-3 py-1 rounded">
                            Press ESC to exit fullscreen
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
