import { CallToAction } from 'components/CallToAction'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import Slider from 'react-slick'
import { Link } from 'react-scroll'

const slides = [
    {
        label: 'Product analytics',
        url: 'product-analytics',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/product-analytics.png"
            />
        ),
    },
    {
        label: 'Session recording',
        url: 'session-recording',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/session-recording.png"
            />
        ),
    },
    {
        label: 'Feature flags',
        url: 'feature-flags',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/feature-flags.png"
            />
        ),
    },
    {
        label: 'AB tests and experiments',
        url: 'ab-tests-and-experiments',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/experimentation.png"
            />
        ),
    },
    {
        label: 'Data warehouse',
        url: 'data-warehouse',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/sql.png"
            />
        ),
    },
    {
        label: 'Event pipelines',
        url: 'event-pipelines',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/event-pipelines.png"
            />
        ),
    },
    {
        label: 'API',
        url: 'api',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/api.png"
            />
        ),
    },
    {
        label: 'Data warehouse',
        url: 'data-warehouse',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/data-tree.png"
            />
        ),
    },
    {
        label: 'Data warehouse',
        url: 'data-warehouse',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/data-tractor.png"
            />
        ),
    },
    {
        label: 'Data warehouse',
        url: 'data-warehouse',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/data-warehouse.png"
            />
        ),
    },
    {
        label: 'Data warehouse',
        url: 'data-warehouse',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/warehouse-sync.png"
            />
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
    speed: 100000,
    cssEase: 'linear',
}

const Slide = ({ image, label }) => {
    return (
        <div className="relative group">
            <div className="hover:scale-[1.1] transition-transform">{image}</div>
            <span className="absolute left-0 top-0 text-white bg-primary rounded-md px-2 group-hover:visible invisible">
                {label}
            </span>
        </div>
    )
}

export default function Hero() {
    const [activeSlide, setActiveSlide] = useState(0)
    return (
        <section id="overview" className="text-center pt-7 sm:pt-14 mb-8">
            <div className="px-5 max-w-screen-2xl mx-auto relative z-10">
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
                    return (
                        <Link key={index} className="cursor-pointer" smooth duration={300} offset={-57} to={slide.url}>
                            <Slide {...slide} />
                        </Link>
                    )
                })}
            </Slider>
        </section>
    )
}
