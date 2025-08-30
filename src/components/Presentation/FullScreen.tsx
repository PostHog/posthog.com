import React, { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { IconX } from '@posthog/icons'
import ScalableSlide from './ScalableSlide'
import { PresentationModeContext } from '../RadixUI/Tabs'

interface PresentationModeProps {
    slides: Array<{
        name: string
        content: React.ReactNode
        rawContent?: React.ReactNode
        thumbnailContent?: React.ReactNode
    }>
    onExit: () => void
    initialSlideIndex?: number
}

// Full-screen presentation component
const PresentationMode = ({ slides, onExit, initialSlideIndex = 0 }: PresentationModeProps) => {
    const [currentSlide, setCurrentSlide] = useState(initialSlideIndex)
    const [showControls, setShowControls] = useState(true)
    const [isPortrait, setIsPortrait] = useState(false)
    const mouseTimerRef = useRef<NodeJS.Timeout | null>(null)

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, [slides.length])

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }, [slides.length])

    const handleMouseMove = useCallback(() => {
        setShowControls(true)
        if (mouseTimerRef.current) {
            clearTimeout(mouseTimerRef.current)
        }
        mouseTimerRef.current = setTimeout(() => {
            setShowControls(false)
        }, 3000)
    }, [])

    // Check viewport width to determine if we should use portrait mode
    const checkOrientation = useCallback(() => {
        if (typeof window !== 'undefined') {
            setIsPortrait(window.innerHeight > window.innerWidth)
        }
    }, [])

    // Calculate appropriate dimensions based on orientation
    const slideConfig = {
        aspectRatio: isPortrait ? 'aspect-[9/16]' : 'aspect-video',
        baseWidth: isPortrait ? 720 : 1280,
        baseHeight: isPortrait ? 1280 : 720,
        thumbnailWidth: isPortrait ? 'w-12' : 'w-20',
        thumbnailHeight: isPortrait ? 'h-20' : 'h-12',
        thumbnailAspectRatio: isPortrait ? 'aspect-[9/16]' : 'aspect-video',
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ':
                    event.preventDefault()
                    nextSlide()
                    break
                case 'ArrowLeft':
                case 'ArrowUp':
                    event.preventDefault()
                    prevSlide()
                    break
                case 'Escape':
                    event.preventDefault()
                    onExit()
                    break
                case 'Home':
                    event.preventDefault()
                    setCurrentSlide(0)
                    break
                case 'End':
                    event.preventDefault()
                    setCurrentSlide(slides.length - 1)
                    break
            }
        }

        // Check orientation on mount and window resize
        checkOrientation()

        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('resize', checkOrientation)

        // Initial timer for hiding controls
        const initialTimer = setTimeout(() => {
            setShowControls(false)
        }, 3000)

        // Prevent scrolling on the body when in presentation mode
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', checkOrientation)
            if (mouseTimerRef.current) {
                clearTimeout(mouseTimerRef.current)
            }
            clearTimeout(initialTimer)
            // Restore body scrolling
            document.body.style.overflow = ''
        }
    }, [nextSlide, prevSlide, onExit, handleMouseMove, checkOrientation])

    const currentSlideData = slides[currentSlide]
    // Use rawContent for presentation to avoid double-scaling, fallback to content
    const slideContent = currentSlideData?.rawContent || currentSlideData?.content

    const presentationContent = (
        <div data-scheme="secondary" className="fixed inset-0 bg-primary z-[9999] flex items-center justify-center">
            {/* Exit button */}
            <div
                className={`absolute top-4 right-4 z-10 transition-opacity duration-300 ${
                    showControls ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <button
                    onClick={onExit}
                    className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
                >
                    <IconX className="size-6" />
                </button>
            </div>

            {/* Slide counter */}
            <div
                className={`absolute top-4 left-4 z-10 transition-opacity duration-300 ${
                    showControls ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <div className="bg-black/50 text-white px-3 py-2 rounded-lg text-sm font-medium">
                    {currentSlide + 1} / {slides.length}
                </div>
            </div>

            {/* Navigation arrows */}
            <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-opacity duration-300 ${
                    showControls ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="bg-black/50 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-full p-3 transition-colors"
                >
                    <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            <div
                className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 transition-opacity duration-300 ${
                    showControls ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <button
                    onClick={nextSlide}
                    disabled={currentSlide === slides.length - 1}
                    className="bg-black/50 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-full p-3 transition-colors"
                >
                    <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Current slide */}
            <div className="w-full h-full flex items-center justify-center p-4 bg-accent">
                <div className={`@container ${slideConfig.aspectRatio} max-w-full max-h-full w-full overflow-hidden`}>
                    <ScalableSlide
                        mode="presentation"
                        baseWidth={slideConfig.baseWidth}
                        baseHeight={slideConfig.baseHeight}
                    >
                        <PresentationModeContext.Provider value={{ isPresenting: true, isPortrait }}>
                            {slideContent}
                        </PresentationModeContext.Provider>
                    </ScalableSlide>
                </div>
            </div>

            {/* Slide thumbnails at bottom */}
            <div
                className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-300 ${
                    showControls ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <div className="flex space-x-3 bg-black/50 p-3 rounded-lg">
                    {slides.map((slide, index) => {
                        const thumbnailContent = slide.thumbnailContent || slide.rawContent || slide.content
                        console.log(`🖼️ FullScreen thumbnail ${index}:`, {
                            slideName: slide.name,
                            hasThumbnailContent: !!slide.thumbnailContent,
                            hasRawContent: !!slide.rawContent,
                            hasContent: !!slide.content,
                            contentType: typeof thumbnailContent,
                            isReactElement: React.isValidElement(thumbnailContent),
                        })

                        return (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`group cursor-pointer ${
                                    index === currentSlide ? 'ring-2 ring-white' : 'hover:ring-1 hover:ring-white/50'
                                } rounded`}
                                title={slide.name}
                            >
                                <div
                                    className={`${slideConfig.thumbnailWidth} ${slideConfig.thumbnailHeight} ${slideConfig.thumbnailAspectRatio} bg-primary border border-white/20 group-hover:border-white/40 rounded overflow-hidden relative`}
                                >
                                    <ScalableSlide
                                        mode="thumbnail"
                                        baseWidth={slideConfig.baseWidth}
                                        baseHeight={slideConfig.baseHeight}
                                    >
                                        <PresentationModeContext.Provider value={{ isPresenting: true, isPortrait }}>
                                            {thumbnailContent}
                                        </PresentationModeContext.Provider>
                                    </ScalableSlide>
                                    {/* Transparent overlay to capture clicks and prevent interaction with thumbnail content */}
                                    <div className="absolute inset-0 z-10" />
                                    {/* Debug info overlay */}
                                    <div className="absolute top-0 right-0 bg-red-500 text-white text-[8px] px-1 opacity-50 z-20">
                                        {index}
                                    </div>
                                </div>
                                <div
                                    className={`text-xs text-white/80 mt-1 text-center font-medium truncate ${slideConfig.thumbnailWidth}`}
                                >
                                    {slide.name}
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )

    // Use portal to render outside of the current component tree
    return typeof document !== 'undefined' ? createPortal(presentationContent, document.body) : null
}

export default PresentationMode
