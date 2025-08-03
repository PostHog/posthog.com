import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { ZoomImage } from 'components/ZoomImage'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

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

    if (isThumbnail) {
        return (
            <button
                ref={ref}
                id={`${sliderId}-${id}`}
                onClick={handleClick}
                className={`bg-accent flex items-center justify-center flex-grow flex-shrink-0 snap-center ${className}`}
            >
                {content}
            </button>
        )
    }

    return (
        <div
            ref={ref}
            id={`${sliderId}-${id}`}
            className={`bg-accent flex items-center justify-center flex-grow flex-shrink-0 snap-center ${className}`}
        >
            <ZoomImage>{content}</ZoomImage>
        </div>
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
                    <React.Fragment key={`${image.src}-${index}`}>
                        <Slide
                            className="w-full cursor-auto"
                            id={`pricing-slider-slide-${index}`}
                            src={image.src}
                            alt={image.alt}
                            index={index}
                            setActiveIndex={setActiveIndex}
                            sliderId={id}
                        />
                        {showDisclaimer && index === 0 && (
                            <div className="absolute bottom-2 @4xl:bottom-1 @5xl:bottom-2 left-2 right-2 text-primary text-xs leading-tight opacity-60">
                                *{disclaimer}
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
            {images.length > 1 && (
                <div className="-mx-4 @xl:mx-0">
                    <ScrollArea className="!h-auto">
                        <div className="flex flex-nowrap @xl:grid grid-cols-4 @3xl:flex @4xl:grid @4xl:grid-cols-4 @7xl:grid-cols-5 @xl:[overflow:unset] px-4 @xl:px-0 snap-x snap-mandatory my-2 gap-2">
                            {images.map((image, index) => (
                                <Slide
                                    key={`${index}-${image.src}`}
                                    className={`w-1/5 @xl:w-auto @3xl:w-1/4 @4xl:w-auto p-1 border border-light hover:border-input dark:hover:border-primary-dark rounded relative transition-all hover:scale-[1.01] hover:top-[-.5px] active:scale-[.98] active:top-[.5px] ${
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
                    </ScrollArea>
                </div>
            )}
        </>
    )
}
