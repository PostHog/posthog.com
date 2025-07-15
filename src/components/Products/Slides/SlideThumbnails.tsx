import React from 'react'
import ScalableSlide from 'components/Presentation/ScalableSlide'

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
    isMobileView: boolean
}

// Component for individual slide thumbnail with proper scaling
const SlideThumb = ({ slide, index, isActive, slideId, isMobileView }: SlideThumbProps) => {
    return (
        <div
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
                className={`${
                    isMobileView ? 'aspect-[9/16]' : 'aspect-video'
                } bg-primary border rounded-sm overflow-hidden relative ${
                    isActive ? 'border-blue outline outline-blue' : 'border-primary group-hover:border-primary'
                }`}
            >
                <ScalableSlide
                    mode="thumbnail"
                    baseWidth={isMobileView ? 720 : 1280}
                    baseHeight={isMobileView ? 1280 : 720}
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
    isMobileView: boolean
}

// Component for rendering slide thumbnails
export default function SlideThumbnails({ slides, activeSlideIndex, slideId, isMobileView }: SlideThumbnailsProps) {
    return (
        <div className="space-y-3 p-1">
            <h3 className="text-sm text-center font-semibold text-secondary mb-3">Slides</h3>
            {slides.map((slide, index) => (
                <SlideThumb
                    key={index}
                    slide={slide}
                    index={index}
                    isActive={index === activeSlideIndex}
                    slideId={slideId}
                    isMobileView={isMobileView}
                />
            ))}
        </div>
    )
}
