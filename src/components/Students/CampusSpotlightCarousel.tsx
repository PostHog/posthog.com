import React, { useState, useEffect } from 'react'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { cn } from '../../utils'

const AUTOPLAY_MS = 5000

const PHOTOS = [
    {
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/ucd_0_da36c8b7ef.jpeg',
        alt: 'UC Davis students at a PostHog event',
    },
    {
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/ucd_1_c842b31c89.png',
        alt: 'UC Davis students at a PostHog event',
    },
    {
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/ucd_2_08264c97eb.JPG',
        alt: 'UC Davis students at a PostHog event',
    },
    {
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/ucd_3_cdb463452a.JPG',
        alt: 'UC Davis students at a PostHog event',
    },
]

// Container queries, not media queries, since this lives in the resizable ReaderView window.
const aspectClasses = 'aspect-[4/3] @xl/reader-content:aspect-[16/9] @3xl/reader-content:aspect-[21/9]'

export default function CampusSpotlightCarousel(): JSX.Element {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [paused, setPaused] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: { perView: 1 },
        slideChanged: (slider) => setCurrentSlide(slider.track.details.rel),
        created: () => setLoaded(true),
    })

    // Self-contained interval so container-query resizes can't stall autoplay. Pauses on hover.
    useEffect(() => {
        if (!loaded || paused) return
        const id = setInterval(() => instanceRef.current?.next(), AUTOPLAY_MS)
        return () => clearInterval(id)
    }, [loaded, paused, instanceRef])

    return (
        <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div ref={sliderRef} className="keen-slider overflow-hidden rounded-2xl shadow-2xl">
                {PHOTOS.map((photo) => (
                    <div key={photo.image} className={cn('keen-slider__slide relative', aspectClasses)}>
                        <img
                            src={photo.image}
                            alt={photo.alt}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {loaded && instanceRef.current && (
                <>
                    <button
                        type="button"
                        aria-label="Previous photo"
                        onClick={() => instanceRef.current?.prev()}
                        className="hidden @md/reader-content:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 size-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
                    >
                        <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        aria-label="Next photo"
                        onClick={() => instanceRef.current?.next()}
                        className="hidden @md/reader-content:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 size-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
                    >
                        <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
                        </svg>
                    </button>

                    <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2 z-10">
                        {PHOTOS.map((_, idx) => (
                            <button
                                key={idx}
                                type="button"
                                aria-label={`Go to photo ${idx + 1}`}
                                onClick={() => instanceRef.current?.moveToIdx(idx)}
                                className={cn(
                                    'h-2 rounded-full transition-all duration-300',
                                    currentSlide === idx ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                                )}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
