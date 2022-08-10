import { Calendar } from 'components/Icons/Icons'
import Link from 'components/Link'
import SliderNav from 'components/SliderNav'
import { graphql, useStaticQuery } from 'gatsby'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import React, { useRef, useState } from 'react'
import Slider from 'react-slick'

interface ISliderItem {
    title: string
    image: IGatsbyImageData
    date: string
    url: string
    authors?: {
        image: IGatsbyImageData
        name: string
        id: string
    }[]
}

const SlideTemplate = ({ date, url, authors, title, ...other }: ISliderItem) => {
    const image = getImage(other.image)
    return (
        <>
            <div className="flex justify-between items-center mb-2">
                {authors && (
                    <ul className="flex space-x-2 list-none p-0 m-0">
                        {authors.map(({ name, id, ...other }) => {
                            const image = getImage(other.image)
                            return (
                                <li key={id} className="flex space-x-2 items-center">
                                    {image && (
                                        <div className="w-[36px] h-[36px] relative rounded-full overflow-hidden">
                                            <GatsbyImage image={image} alt={name} />
                                        </div>
                                    )}
                                    <span className="author text-[15px] font-semibold opacity-50">{name}</span>
                                </li>
                            )
                        })}
                    </ul>
                )}
                <span className="flex space-x-2 items-center ml-auto">
                    <Calendar className="text-gray" />
                    <time className="font-semibold opacity-50 text-[13px]">{date}</time>
                </span>
            </div>

            {image && (
                <Link to={url}>
                    {image ? (
                        <GatsbyImage image={image} alt={title} />
                    ) : (
                        <img width={514} height={289} src="/banner.png" />
                    )}
                </Link>
            )}
        </>
    )
}

const Slide = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="p-3 sm:p-6 border-t border-b border-r border-dashed max-w-[80vw] sm:max-w-lg md:max-w-2xl lg:max-w-4xl w-full border-gray-accent-light dark:border-gray-accent-dark text-black dark:text-white">
            {children}
        </div>
    )
}

export default function FullWidthBorderSlider({
    slides,
    activeSlide,
    setActiveSlide,
    title,
    slideTemplate,
}: {
    slides: ISliderItem[]
    activeSlide: number
    setActiveSlide: (index: number) => void
    title?: string
    slideTemplate?: React.ReactNode
}): any {
    const sliderRef = useRef(null)
    const sliderSettings = {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToScroll: 1,
        autoplay: false,
        variableWidth: true,
        adaptiveHeight: true,
    }

    const handleChange = (_oldIndex: number, newIndex: number) => {
        setActiveSlide(newIndex)
    }
    const breakpoints = useBreakpoint()
    const slidesToShow = breakpoints.lg ? 1 : breakpoints['2xl'] ? 2 : 2
    return (
        slides.length > 1 && (
            <div>
                <div className="flex justify-between items-end mb-6">
                    {title && <h4 className="m-0">{title}</h4>}
                    {slides.length > 1 && slides.length > slidesToShow && (
                        <SliderNav
                            handlePrevious={() => sliderRef?.current.slickPrev()}
                            handleNext={() => sliderRef?.current.slickNext()}
                            currentIndex={activeSlide}
                            length={slides.length - slidesToShow}
                            className="!my-0"
                        />
                    )}
                </div>

                <div className="w-screen">
                    <Slider
                        className="tutorials-slider"
                        beforeChange={handleChange}
                        ref={sliderRef}
                        slidesToShow={slidesToShow}
                        {...sliderSettings}
                    >
                        {slides.map((slide, index) => {
                            return (
                                <Slide key={index}>
                                    {slideTemplate ? slideTemplate({ ...slide }) : <SlideTemplate {...slide} />}
                                </Slide>
                            )
                        })}
                    </Slider>
                </div>
            </div>
        )
    )
}
