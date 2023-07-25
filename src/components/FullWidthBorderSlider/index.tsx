import { Post } from 'components/Blog'
import SliderNav from 'components/SliderNav'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { IGatsbyImageData, ImageDataLike } from 'gatsby-plugin-image'
import React, { useRef } from 'react'
import Slider from 'react-slick'

interface ISliderItem {
    title: string
    image: IGatsbyImageData
    date: string
    url: string
    authors?: {
        image: ImageDataLike
        name: string
        id: string
    }[]
}

const SlideTemplate = ({ date, url, authors, title, image }: ISliderItem) => {
    return <Post authors={authors} title={title} date={date} slug={url} featuredImage={image} />
}

const Slide = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="py-4 px-4 bg-gray-accent-light dark:bg-gray-accent-dark max-w-[80vw] sm:max-w-lg md:max-w-2xl lg:max-w-4xl w-full border-gray-accent-light dark:border-gray-accent-dark text-black dark:text-white">
            <div className="relative p-1 hover:top-[-.5px] hover:scale-[1.01] active:top-[0px] active:scale-[1] after:border-0 hover:after:border-1 after:border-black/25 after:rounded-md after:-inset-1.5 after:absolute">
                {children}
            </div>
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
    const slidesToShow = breakpoints.lg || breakpoints['2xl'] ? 1 : 2
    return (
        slides.length > 1 && (
            <div>
                <div className="flex justify-between items-end mb-3">
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
