import React from 'react'
import ScalableSlide from 'components/Presentation/ScalableSlide'

interface Slide {
    name: string
    content: React.ReactNode
    thumbnailContent?: React.ReactNode
    rawContent?: React.ReactNode
}

interface SlideThumbProps {
    slide: Slide
    index: number
    isActive: boolean
}

// Component for individual slide thumbnail with proper scaling
const SlideThumb = ({ slide, index, isActive }: SlideThumbProps) => {
    return (
        <div
            data-scheme="primary"
            className="group cursor-pointer"
            onClick={() => {
                // Scroll to slide container (includes title and content)
                const slideElement = document.querySelector(`[data-slide="${index}"]`)
                slideElement?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
        >
            <div
                className={`aspect-video bg-primary border rounded-sm overflow-hidden relative ${
                    isActive ? 'border-blue outline outline-blue' : 'border-primary group-hover:border-primary'
                }`}
            >
                <ScalableSlide mode="thumbnail" baseWidth={1280} baseHeight={720}>
                    {slide.thumbnailContent || slide.rawContent || slide.content}
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
}

// Component for rendering slide thumbnails
export default function SlideThumbnails({ slides, activeSlideIndex }: SlideThumbnailsProps) {
    return (
        <div className="space-y-3 p-1">
            <h3 className="text-sm text-center font-semibold text-secondary mb-3">Slides</h3>
            {slides.map((slide, index) => (
                <SlideThumb key={index} slide={slide} index={index} isActive={index === activeSlideIndex} />
            ))}
        </div>
    )
}
