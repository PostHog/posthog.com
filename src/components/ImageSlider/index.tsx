import { IconArrowLeft, IconArrowRight } from '@posthog/icons'
import React, { useRef } from 'react'
import Slider from 'react-slick'

const sliderSettings = {
    dots: false,
    arrows: false,
    slidesToScroll: 1,
    autoplay: false,
    adaptiveHeight: true,
    slidesToShow: 1,
    infinite: true,
    centerMode: false,
}

export default function ImageSlider({ children, ...other }: { children: JSX.Element[] | JSX.Element }) {
    const ref = useRef(null)
    return (
        <div className="relative group image-slider">
            <Slider {...sliderSettings} {...other} ref={ref}>
                {children}
            </Slider>
            <button
                onClick={() => ref.current?.slickPrev()}
                className="absolute top-1/2 left-0 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity rounded border border-light dark:border-dark bg-accent dark:bg-accent-dark p-1 border-b-2"
            >
                <IconArrowLeft className="size-5 opacity-70" />
            </button>
            <button
                onClick={() => ref.current?.slickNext()}
                className="absolute top-1/2 right-0 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity rounded border border-light dark:border-dark bg-accent dark:bg-accent-dark p-1 border-b-2"
            >
                <IconArrowRight className="size-5 opacity-70" />
            </button>
        </div>
    )
}
