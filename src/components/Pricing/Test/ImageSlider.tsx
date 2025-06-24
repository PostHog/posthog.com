import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { ZoomImage } from 'components/ZoomImage'

interface Image {
    src: string
    thumb?: string
    alt: string
}

interface ImageSliderProps {
    images: Image[]
    showDisclaimer?: boolean
    className?: string
    id: string
}

const Slide = ({
    className = '',
    onClick,
    id,
    src,
    alt,
    index,
    setActiveIndex,
    isThumbnail = false,
    sliderId,
}: {
    className?: string
    onClick?: () => void
    id: string
    src: string
    alt: string
    index?: number
    setActiveIndex?: (index: number) => void
    isThumbnail?: boolean
    sliderId: string
}) => {
    const handleClick = () => onClick?.()
    const [ref, inView] = useInView({ threshold: 0.9 })

    useEffect(() => {
        if (!setActiveIndex || index === undefined) return
        if (inView) {
            setActiveIndex(index)
        }
    }, [inView])

    const content = <img src={src} alt={alt} className="w-full h-full object-contain" />

    return (
        <button
            ref={ref}
            id={`${sliderId}-${id}`}
            onClick={handleClick}
            className={`bg-accent flex items-center justify-center flex-grow flex-shrink-0 snap-center ${className}`}
        >
            {isThumbnail ? content : <ZoomImage>{content}</ZoomImage>}
        </button>
    )
}

export default function ImageSlider({ images, className, showDisclaimer = false, id }: ImageSliderProps): JSX.Element {
    const [activeIndex, setActiveIndex] = useState<number>(0)

    const handleClick = (index: number) => {
        const el = document.getElementById(`${id}-pricing-slider-slide-${index}`)
        el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }

    const textOptions = [
        'Artist depiction only. PostHog is cloud-based software and not installed by CD.',
        "You can't put us in a box. (No really, you can't actually buy PostHog on CD. It's web-based cloud software.)",
        "PostHog doesn't really come on a physical CD. (If you don't know what a CD is, please ask your parents.)",
        'Obviously this is cloud software, not an actual CD, silly goose.',
        'Picture of CD is for illustrative purposes only, not for medicinal consumption.',
        'Certified 100% organic bytes. May contain heavy metals. Do not eat. (Also not really installed by CD.)',
        'Not really installed by CD. But does comes with free docs.',
    ]

    const [disclaimer, setDisclaimer] = useState('')

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * textOptions.length)
        setDisclaimer(textOptions[randomIndex])
    }, []) // Empty dependency array means this effect runs once on mount

    return (
        <>
            <div className="relative flex flex-nowrap snap-x snap-mandatory overflow-y-hidden overflow-x-auto rounded border border-primary">
                {images.map((image, index) => (
                    <>
                        <Slide
                            key={index}
                            className="w-full cursor-auto"
                            id={`pricing-slider-slide-${index}`}
                            src={image.src}
                            alt={image.alt}
                            index={index}
                            setActiveIndex={setActiveIndex}
                            sliderId={id}
                        />
                        {showDisclaimer && index === 0 && (
                            <div className="absolute bottom-2 md:bottom-1 xl:bottom-2 left-2 right-2 text-primary text-xs leading-tight opacity-60">
                                *{disclaimer}
                            </div>
                        )}
                    </>
                ))}
            </div>
            {images.length > 1 && (
                <div className="flex flex-nowrap md:grid grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 overflow-x-auto md:[overflow:unset] -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory my-2 gap-2">
                    {images.map((image, index) => (
                        <Slide
                            key={index}
                            className={`w-1/5 md:w-auto p-1 border border-light hover:border-input dark:hover:border-border-dark rounded relative transition-all hover:scale-[1.01] hover:top-[-.5px] active:scale-[.98] active:top-[.5px] ${
                                index === activeIndex ? 'active' : 'opacity-70 hover:opacity-100'
                            }`}
                            id={`pricing-slider-nav-${index}`}
                            onClick={() => handleClick(index)}
                            src={image.thumb || image.src}
                            alt={image.alt}
                            isThumbnail={true}
                            sliderId={id}
                        />
                    ))}
                </div>
            )}
        </>
    )
}
