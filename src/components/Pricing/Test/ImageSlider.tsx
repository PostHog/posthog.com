import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const images = [
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/product_os_df65018ac1.png',
        thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/product_os_thumb_8a0a4b86c7.png',
        alt: 'PostHog 3000',
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/product_analytics_091434830d.png',
        thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/product_analytics_thumb_0e75317413.png',
        alt: 'Product analytics',
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/web_analytics_d744f3a91b.png',
        thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/web_analytics_thumb_6af44e8607.png',
        alt: 'Web analytics',
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/session_replay_40fdbb06e4.png',
        thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/session_replay_thumb_6334319e64.png',
        alt: 'Session replay',
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/feature_flags_3c90797dd6.png',
        thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/feature_flags_thumb_b4bc2d6df1.png',
        alt: 'Feature flags',
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/ab_testing_0c3f4b82f8.png',
        thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/ab_testing_thumb_8729e68844.png',
        alt: 'Experiments',
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/surveys_224b1c8aaa.png',
        thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/surveys_thumb_1ed78c7676.png',
        alt: 'Surveys',
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/data_warehouse_3303d90bcc.png',
        thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/data_warehouse_thumb_0fc6126f10.png',
        alt: 'Data warehouse',
    },
]

const Slide = ({
    className = '',
    onClick,
    id,
    src,
    alt,
    index,
    setActiveIndex,
}: {
    className?: string
    onClick?: () => void
    id: string
    src: string
    alt: string
    index?: number
    setActiveIndex?: (index: number) => void
}) => {
    const handleClick = () => onClick?.()
    const [ref, inView] = useInView({ threshold: 0.9 })

    useEffect(() => {
        if (!setActiveIndex || index === undefined) return
        if (inView) {
            setActiveIndex(index)
        }
    }, [inView])

    return (
        <button
            ref={ref}
            id={id}
            onClick={handleClick}
            className={`aspect-square bg-accent dark:bg-accent-dark flex items-center justify-center flex-grow flex-shrink-0 snap-center ${className}`}
        >
            <img src={src} alt={alt} />
        </button>
    )
}

export default function ImageSlider(): JSX.Element {
    const [activeIndex, setActiveIndex] = useState<number>(0) // Step 1

    const handleClick = (id: number) => {
        const el = document.getElementById(`pricing-slider-slide-${id}`)
        el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }

    const textOptions = [
        'Artist depiction only. PostHog is cloud-based software and not installed by CD.',
        "You can’t put us in a box. (No really, you can’t actually buy PostHog on CD. It's web-based cloud software.)",
        'PostHog doesn’t really come on a physical CD. (If you don’t know what a CD is, please ask your parents.)',
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
            <div className="relative flex flex-nowrap snap-x snap-mandatory overflow-y-hidden overflow-x-auto rounded border border-light dark:border-dark">
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
                        />
                        {index === 0 && (
                            <div className="absolute bottom-2 md:bottom-1 xl:bottom-2 left-2 right-2 text-primary text-xs leading-tight opacity-60">
                                *{disclaimer}
                            </div>
                        )}
                    </>
                ))}
            </div>
            <div className="flex flex-nowrap md:grid grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 overflow-x-auto md:[overflow:unset] -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory my-2 gap-2">
                {images.map((_, index) => (
                    <Slide
                        key={index}
                        className={`w-1/5 md:w-auto p-1 border border-light hover:border-border dark:border-dark dark:hover:border-border-dark rounded relative transition-all hover:scale-[1.01] hover:top-[-.5px] active:scale-[.98] active:top-[.5px] ${
                            index === activeIndex ? 'active' : 'opacity-70 hover:opacity-100'
                        }`}
                        id={`pricing-slider-nav-${index}`}
                        onClick={() => handleClick(index)}
                        src={images[index].thumb}
                        alt={images[index].alt}
                    />
                ))}
            </div>
        </>
    )
}
