import { CallToAction } from 'components/CallToAction'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import Slider from 'react-slick'

const slides = [
    {
        image: (
            <StaticImage placeholder="none" quality={100} objectFit="contain" alt="" src="./images/hogs/hog-1.png" />
        ),
    },
    {
        image: (
            <StaticImage placeholder="none" quality={100} objectFit="contain" alt="" src="./images/hogs/hog-2.png" />
        ),
    },
    {
        image: (
            <StaticImage placeholder="none" quality={100} objectFit="contain" alt="" src="./images/hogs/hog-3.png" />
        ),
    },
    {
        image: (
            <StaticImage placeholder="none" quality={100} objectFit="contain" alt="" src="./images/hogs/hog-4.png" />
        ),
    },
    {
        image: (
            <StaticImage placeholder="none" quality={100} objectFit="contain" alt="" src="./images/hogs/hog-5.png" />
        ),
    },
    {
        image: (
            <StaticImage placeholder="none" quality={100} objectFit="contain" alt="" src="./images/hogs/hog-6.png" />
        ),
    },
    {
        image: (
            <StaticImage placeholder="none" quality={100} objectFit="contain" alt="" src="./images/hogs/hog-7.png" />
        ),
    },
    {
        image: (
            <StaticImage placeholder="none" quality={100} objectFit="contain" alt="" src="./images/hogs/hog-8.png" />
        ),
    },
    {
        image: (
            <StaticImage placeholder="none" quality={100} objectFit="contain" alt="" src="./images/hogs/hog-9.png" />
        ),
    },
    {
        image: (
            <StaticImage placeholder="none" quality={100} objectFit="contain" alt="" src="./images/hogs/hog-10.png" />
        ),
    },
    {
        image: (
            <StaticImage placeholder="none" quality={100} objectFit="contain" alt="" src="./images/hogs/hog-11.png" />
        ),
    },
]

const sliderSettings = {
    dots: false,
    infinite: true,
    arrows: false,
    slidesToScroll: 11,
    autoplay: true,
    variableWidth: true,
    autoplaySpeed: 0,
    speed: 50000,
    cssEase: 'linear',
}

const Slide = ({ image }) => {
    return <div className="hover:scale-[1.2] transition-transform">{image}</div>
}

export default function Hero() {
    const [activeSlide, setActiveSlide] = useState(0)
    return (
        <section id="overview" className="text-center pt-7 sm:pt-14 mb-8">
            <div className="px-5 max-w-screen-2xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-6xl m-0">
                    The modern platform for <br />
                    <span className="text-red">product analytics</span> and{' '}
                    <span className="text-red">experimentation</span>
                </h1>
                <p className="text-lg sm:text-xl text-black/75 font-semibold m-0 mt-3 mb-5">
                    PostHog is the single platform that can replace an entire suite of tools you’re already paying for.
                </p>
                <div className="flex space-x-3 items-center justify-center">
                    <CallToAction to="/signup" type="primary">
                        Get started - free
                    </CallToAction>
                    <CallToAction to="/pricing" type="secondary">
                        View pricing
                    </CallToAction>
                </div>
            </div>
            <Slider
                beforeChange={(_oldIndex, newIndex) => setActiveSlide(newIndex)}
                className="product-hogs-slider"
                {...sliderSettings}
            >
                {slides.map((slide, index) => {
                    return <Slide key={index} image={slide.image} />
                })}
            </Slider>
        </section>
    )
}
