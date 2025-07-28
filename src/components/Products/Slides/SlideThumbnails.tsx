import React, { useEffect, useRef, useState } from 'react'
import ScalableSlide from 'components/Presentation/ScalableSlide'
import { useWindow } from '../../../context/Window'
import { useApp } from '../../../context/App'
import { getIsMobile } from 'components/Presentation'

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
}

// Component for individual slide thumbnail with proper scaling
const SlideThumb = ({ slide, index, isActive, slideId }: SlideThumbProps) => {
    const { siteSettings } = useApp()
    const { appWindow } = useWindow()
    const [isMobile, setIsMobile] = useState<boolean>(getIsMobile(siteSettings, appWindow))
    const slideRef = useRef<HTMLDivElement>(null)
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
            }}
        >
            <div
                className={`aspect-video bg-primary border rounded-sm overflow-hidden relative ${
                    isActive ? 'border-blue outline outline-blue' : 'border-primary group-hover:border-primary'
                }`}
            >
                <ScalableSlide mode="thumbnail" baseWidth={1280} baseHeight={720}>
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
}

// Component for rendering slide thumbnails
export default function SlideThumbnails({ slides, activeSlideIndex, slideId }: SlideThumbnailsProps) {
    return (
        <div className="space-y-3 p-1">
            <h3 className="text-sm text-center font-semibold text-secondary mb-3 @2xl:block hidden">Slides</h3>
            <div className="flex @2xl:grid gap-2">
                {slides.map((slide, index) => (
                    <div key={index} className="flex-shrink-0 @2xl:w-full w-48">
                        <SlideThumb
                            key={index}
                            slide={slide}
                            index={index}
                            isActive={index === activeSlideIndex}
                            slideId={slideId}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
