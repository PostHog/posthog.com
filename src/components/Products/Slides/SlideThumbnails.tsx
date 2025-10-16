import React, { useEffect, useRef, useState, useContext } from 'react'
import ScalableSlide from 'components/Presentation/ScalableSlide'
import { useWindow } from '../../../context/Window'
import { useApp } from '../../../context/App'
import { getIsMobile } from 'components/Presentation'
import { PresentationModeContext } from '../../RadixUI/Tabs'
import slugify from 'slugify'

interface Slide {
    name: string
    content: React.ReactNode
    mobileContent?: React.ReactNode
    thumbnailContent?: React.ReactNode
    rawContent?: React.ReactNode
}

interface SlideThumbProps {
    slide: Slide
    index: number
    isActive: boolean
    slideId?: string
    onClick?: () => void
}

// Component for individual slide thumbnail with proper scaling
const SlideThumb = ({ slide, index, isActive, slideId, onClick }: SlideThumbProps) => {
    const { siteSettings } = useApp()
    const { appWindow } = useWindow()
    const presentationContext = useContext(PresentationModeContext)
    const [isMobile, setIsMobile] = useState<boolean>(getIsMobile(siteSettings, appWindow))
    const [isPortraitMode, setIsPortraitMode] = useState<boolean>(false)
    const slideRef = useRef<HTMLDivElement>(null)
    const [hasScrolledToHash, setHasScrolledToHash] = useState<boolean>(false)
    useEffect(() => {
        if (isActive && isMobile && slideRef.current) {
            const scrollElement = slideRef.current?.closest('[data-radix-scroll-area-viewport]') as HTMLElement
            if (!scrollElement) return

            scrollElement.scrollTo({
                left: slideRef.current.offsetLeft - 16,
                behavior: 'smooth',
            })
        }
    }, [isActive])

    useEffect(() => {
        const handleResize = () => {
            const mobile = getIsMobile(siteSettings, appWindow)
            setIsMobile(mobile)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [appWindow, siteSettings])

    // Determine if we should use portrait orientation for thumbnails
    useEffect(() => {
        const checkPortraitMode = () => {
            // Case 1: Full screen presentation mode with viewport < 768px
            if (presentationContext.isPresenting && presentationContext.isPortrait) {
                setIsPortraitMode(true)
                return
            }

            // Case 2: Edit mode - check if container is below @2xl (672px)
            // We need to check the actual container width, not just the app window
            if (!presentationContext.isPresenting) {
                // For edit mode, we check the app window width (which represents the container)
                const containerWidth =
                    typeof window !== 'undefined' && siteSettings.experience === 'boring'
                        ? window.innerWidth
                        : appWindow?.size?.width

                // Below @2xl (672px) should show portrait thumbnails
                setIsPortraitMode(containerWidth ? containerWidth < 896 : false)
                return
            }

            // Default to landscape
            setIsPortraitMode(false)
        }

        checkPortraitMode()

        // Also listen for window resize to update portrait mode
        const handleResize = () => {
            checkPortraitMode()
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [presentationContext, appWindow, siteSettings])

    useEffect(() => {
        const hash = appWindow?.element?.props?.location?.hash?.slice(1)
        if (
            !hasScrolledToHash &&
            hash &&
            slugify(slide?.name?.toLowerCase(), { lower: true }) === slugify(hash?.toLowerCase(), { lower: true })
        ) {
            const selector = slideId ? `[data-slide-id="${slideId}"][data-slide="${index}"]` : `[data-slide="${index}"]`
            const slideElement = document.querySelector(selector)
            slideElement?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            setHasScrolledToHash(true)
        }
    }, [slide, appWindow])

    return (
        <div
            ref={slideRef}
            data-scheme="primary"
            className="group cursor-pointer"
            onClick={() => {
                // Scroll to slide container (includes title and content)
                const selector = slideId
                    ? `[data-slide-id="${slideId}"][data-slide="${index}"]`
                    : `[data-slide="${index}"]`
                const slideElement = document.querySelector(selector)
                slideElement?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                onClick?.()
            }}
        >
            <div
                className={`${
                    isPortraitMode ? 'aspect-[9/16]' : 'aspect-video'
                } bg-primary border rounded overflow-hidden relative ${
                    isActive ? 'border-blue outline outline-blue' : 'border-primary group-hover:border-primary'
                }`}
            >
                <ScalableSlide
                    mode="thumbnail"
                    baseWidth={isPortraitMode ? 720 : 1280}
                    baseHeight={isPortraitMode ? 1280 : 720}
                >
                    {slide.rawContent}
                </ScalableSlide>
                {/* Transparent overlay to capture clicks and prevent interaction with thumbnail content */}
                <div className="absolute inset-0 z-10" />
            </div>
            <div className={`text-xs text-secondary mt-1 text-center ${isActive ? 'font-bold' : 'font-medium'}`}>
                {slide.name}
            </div>
        </div>
    )
}

interface SlideThumbnailsProps {
    slides: Slide[]
    activeSlideIndex: number
    slideId?: string
    onClick?: () => void
}

// Component for rendering slide thumbnails
export default function SlideThumbnails({ slides, activeSlideIndex, slideId, onClick }: SlideThumbnailsProps) {
    const { siteSettings } = useApp()
    const { appWindow } = useWindow()
    const presentationContext = useContext(PresentationModeContext)
    const [isPortraitMode, setIsPortraitMode] = useState<boolean>(false)

    // Determine if we should use portrait orientation for thumbnails layout
    useEffect(() => {
        const checkPortraitMode = () => {
            // Case 1: Full screen presentation mode with viewport < 768px
            if (presentationContext.isPresenting && presentationContext.isPortrait) {
                setIsPortraitMode(true)
                return
            }

            // Case 2: Edit mode - check if container is below @2xl (672px)
            if (!presentationContext.isPresenting) {
                const containerWidth =
                    typeof window !== 'undefined' && siteSettings.experience === 'boring'
                        ? window.innerWidth
                        : appWindow?.size?.width

                // Below @2xl (672px) should show portrait thumbnails
                setIsPortraitMode(containerWidth ? containerWidth < 672 : false)
                return
            }

            // Default to landscape
            setIsPortraitMode(false)
        }

        checkPortraitMode()

        const handleResize = () => {
            checkPortraitMode()
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [presentationContext, appWindow, siteSettings])

    return (
        <div className="space-y-3 p-1">
            <h3 className="text-sm text-center font-semibold text-secondary mb-3 @2xl:block hidden">Slides</h3>
            <div className="flex @2xl:grid gap-2">
                {slides.map((slide, index) => (
                    <div key={index} className={`flex-shrink-0 @2xl:w-full ${isPortraitMode ? 'w-32' : 'w-48'}`}>
                        <SlideThumb
                            key={index}
                            slide={slide}
                            index={index}
                            isActive={index === activeSlideIndex}
                            slideId={slideId}
                            onClick={onClick}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
