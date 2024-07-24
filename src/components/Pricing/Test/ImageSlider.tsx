import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const images = [
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
        alt: 'A/B testing',
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

    return (
        <>
            <div className="flex flex-nowrap snap-x snap-mandatory overflow-y-hidden overflow-x-auto rounded">
                {images.map((image, index) => (
                    <Slide
                        key={index}
                        className="w-full cursor-auto"
                        id={`pricing-slider-slide-${index}`}
                        src={image.src}
                        alt={image.alt}
                        index={index}
                        setActiveIndex={setActiveIndex}
                    />
                ))}
            </div>
            <div className="grid grid-cols-5 snap-x snap-mandatory my-2 gap-1.5">
                {images.map((_, index) => (
                    <Slide
                        key={index}
                        className={`p-1 border border-light hover:border-border dark:border-dark dark:hover:border-border-dark rounded relative transition-all hover:scale-[1.01] hover:top-[-.5px] active:scale-[.98] active:top-[.5px] ${
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
