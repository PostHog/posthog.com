import React, { useState } from 'react'
import Nav from './Nav'
import { IFooter } from './types'
import Slider from 'react-slick'
import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'

const slides = [
    {
        label: 'Product analytics',
        url: '/product-analytics',
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
        label: 'Session replay',
        url: '/session-replay',
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
        url: '/feature-flags',
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
        label: 'A/B testing and experiments',
        url: '/ab-testing',
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
        url: '/product-os',
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
        url: '/product-os',
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
        url: '/product-os',
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
        url: '/product-os',
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
        url: '/product-os',
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
        url: '/product-os',
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
        url: '/product-os',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/warehouse-sync.png"
                className="max-h-[300px]"
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

const Slide = ({ image, label }: { image: React.ReactNode; label: string }) => {
    return (
        <div className="relative group">
            <div className="hover:scale-[1.1] transition-transform relative active:scale-[1.09]">{image}</div>
            <div className="absolute left-0 bottom-4 right-0 group-hover:visible invisible flex justify-center">
                <span className="text-black bg-tan/75 backdrop-blur shadow-xl text-lg rounded-md px-3">{label}</span>
            </div>
        </div>
    )
}

export default function Footer({ title }: IFooter) {
    const [activeSlide, setActiveSlide] = useState(0)

    return (
        <section className="text-center my-14">
            <h2 className="text-4xl md:text-6xl">PostHog does that.</h2>
            <p className="mt-2 mb-12">
                Now that you know PostHog does {title.toLowerCase()}, check out what else PostHog can do.
            </p>
            <Nav />
            <div className="-mx-5 pt-28 -mb-20">
                <Slider
                    beforeChange={(_oldIndex, newIndex) => setActiveSlide(newIndex)}
                    className="product-hogs-slider"
                    {...sliderSettings}
                >
                    {slides.map((slide, index) => {
                        return (
                            <Link key={index} className="cursor-pointer" to={slide.url}>
                                <Slide {...slide} />
                            </Link>
                        )
                    })}
                </Slider>
            </div>
        </section>
    )
}
