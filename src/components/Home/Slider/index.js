import { RightArrow } from 'components/Icons/Icons'
import React, { useState } from 'react'
import SliderComponent from 'react-slick'
import { slideButtons } from './slideButtons'
import {
    ABTesting,
    DataWarehouse,
    EventPipelines,
    FeatureFlags,
    ProductAnalytics,
    SelfHosting,
    SessionRecording,
} from './Slides'

const SlideButton = ({ title, Icon, activeSlide, index }) => {
    const active = activeSlide === index
    return (
        <li className="p-1">
            <button
                className={`flex flex-col items-center justify-center pt-1 px-1 pb-3 w-full rounded-md transition-opacity transition-colors hover:bg-gray-accent/25 focus:bg-gray-accent/40 relative active:top-[1px] active:scale-[.99] space-y-2 md:space-y-0 h-full ${
                    active ? 'bg-gray-accent/40 hover:bg-gray-accent/40 active ' : 'group '
                }`}
            >
                <span className="w-[52px] h-[52px] flex justify-center items-center opacity-60 group-hover:opacity-90">
                    <span className="absolute">
                        <Icon active={active} />
                    </span>
                </span>
                <p
                    className={`leading-tight text-sm lg:text-md opacity-90 m-0 -mt-2 ${
                        active ? 'font-bold' : 'font-semibold'
                    }`}
                >
                    {title}
                </p>
            </button>
        </li>
    )
}

export default function Slider() {
    const [buttonRef, setButtonRef] = useState()
    const [slideRef, setSlideRef] = useState()
    const [activeSlide, setActiveSlide] = useState(0)
    const [lazyLoad, setLazyLoad] = useState()

    const handleButtonChange = (_oldIndex, newIndex) => {
        setActiveSlide(newIndex)
    }

    const handleDropdownChange = (e) => {
        slideRef.slickGoTo(e.target.selectedIndex)
    }

    return (
        <div>
            <div className="md:border-t border-b border-gray-accent-light border-dashed -mt-8 md:mt-0">
                <div className="hidden md:block border-b border-dashed border-gray-accent-light">
                    <SliderComponent
                        beforeChange={handleButtonChange}
                        ref={(buttonRef) => setButtonRef(buttonRef)}
                        asNavFor={slideRef}
                        arrows={false}
                        slidesToShow={7}
                        focusOnSelect
                        className="home-slider-buttons list-none max-w-full lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mx-auto m-0 p-0 border-r border-l border-gray-accent-light border-dashed"
                    >
                        {slideButtons.map((slide, index) => {
                            return <SlideButton index={index} activeSlide={activeSlide} key={index} {...slide} />
                        })}
                    </SliderComponent>
                </div>
                <div className="block md:hidden px-4">
                    <p className="text-[14px] text-black opacity-50 text-center mt-0">Explore the toolkit</p>
                    <div className="relative">
                        <select
                            value={activeSlide}
                            onChange={handleDropdownChange}
                            className="appearance-none text-primary text-center text-md bg-white block p-3 w-full rounded font-bold shadow-lg"
                        >
                            {slideButtons.map(({ title, Icon }, index) => {
                                return (
                                    <option value={index} key={title}>
                                        {title}
                                    </option>
                                )
                            })}
                        </select>
                        <svg
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g opacity="0.3">
                                <path
                                    d="M10.4016 3.98684L6.99792 7.39165L3.59424 3.98684C3.13815 3.53075 2.39931 3.53075 1.94322 3.98684C1.48768 4.44239 1.48768 5.18177 1.94322 5.63731L6.17276 9.86685C6.62831 10.3218 7.36658 10.3218 7.8221 9.86685L12.0511 5.63787C12.5072 5.18232 12.5072 4.4435 12.0516 3.98742C11.5961 3.53134 10.8577 3.5313 10.4016 3.98684Z"
                                    fill="black"
                                />
                            </g>
                        </svg>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="flex-grow hidden md:flex justify-center items-center md:absolute md:left-2 xl:static">
                        <button
                            onClick={() => slideRef.slickPrev()}
                            className="px-3 py-2 bg-white rounded-sm shadow-md text-primary relative active:top-[1px] active:scale-[.97] md:z-30"
                        >
                            <RightArrow className="rotate-180 w-5" />
                        </button>
                    </div>
                    <SliderComponent
                        adaptiveHeight
                        onInit={() => setLazyLoad('ondemand')}
                        lazyLoad={lazyLoad}
                        ref={(slideRef) => setSlideRef(slideRef)}
                        asNavFor={buttonRef}
                        arrows={false}
                        slidesToShow={1}
                        infinite
                        className="home-slider flex-shrink-0 list-none max-w-full lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl w-full mx-auto m-0 p-0 flex items-center justify-center divide divide-x divide-gray-accent-light divide-dashed overflow-auto md:border-l md:border-r border-gray-accent-light border-dashed"
                    >
                        <ProductAnalytics />
                        <SessionRecording />
                        <FeatureFlags />
                        <ABTesting />
                        <EventPipelines />
                        <DataWarehouse />
                        <SelfHosting />
                    </SliderComponent>
                    <div className="flex-grow hidden md:flex justify-center items-center md:absolute md:right-2 xl:static">
                        <button
                            onClick={() => slideRef.slickNext()}
                            className="px-3 py-2 bg-white rounded-sm shadow-md text-primary relative active:top-[1px] active:scale-[.97] md:z-30"
                        >
                            <RightArrow className="w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
