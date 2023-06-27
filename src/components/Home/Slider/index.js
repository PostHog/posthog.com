import { ArrowLeft, ArrowRight } from 'components/NewIcons'
import React, { useState } from 'react'
import SliderComponent from 'react-slick'
import { slideButtons } from './slideButtons'
import { ProductAnalytics, SessionReplay, FeatureFlags, ABTesting, Cdp, DataWarehouse, Sql, Api } from './Slides'

const SlideButton = ({ title, Icon, color, activeSlide, index }) => {
    const active = activeSlide === index
    return (
        <li className="pb-1 border-b border-primary/25 dark:border-primary-dark/25">
            <button
                className={`flex flex-col items-center justify-center mt-1 p-2 w-full rounded-md transition-opacity transition-colors border border-b-3 border-transparent relative space-y-1 h-full ${
                    active
                        ? `after:absolute after:bottom-[calc(-.5rem_-_1px)] after:h-[3px] after:w-full after:bg-${color} after:rounded-full active `
                        : 'group hover:border-light dark:hover:border-dark hover:translate-y-[-2px] active:translate-y-[1px]'
                }`}
            >
                <span className={`w-6 h-6 text-${color} flex justify-center items-center`}>
                    <Icon active={active} />
                </span>
                <p
                    className={`leading-tight text-sm lg:text-md m-0 -mt-2 ${
                        active ? 'font-bold' : 'font-medium opacity/75'
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
            <div className="-mt-8 md:mt-0">
                <div className="hidden md:block">
                    <SliderComponent
                        beforeChange={handleButtonChange}
                        ref={(buttonRef) => setButtonRef(buttonRef)}
                        asNavFor={slideRef}
                        arrows={false}
                        slidesToShow={8}
                        focusOnSelect
                        className="home-slider-buttons list-none max-w-full lg:max-w-7xl mx-auto m-0 p-0"
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
                <div className="flex items-center max-w-screen-2xl mx-auto">
                    <div className="shrink-0 basis-[50px] hidden md:flex justify-center items-center md:absolute md:left-2 xl:static">
                        <button
                            onClick={() => slideRef.slickPrev()}
                            className="relative hover:scale-[1.01] hover:top-[-1px] active:top-[.5px] active:scale-[.99] md:z-30"
                        >
                            <ArrowLeft className="w-10" />
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
                        className="home-slider flex-1 list-none max-w-full lg:max-w-7xl xl:max-w-7xl 2xl:max-w-7xl w-full mx-auto m-0 p-0 flex items-center justify-center overflow-x-auto"
                    >
                        <ProductAnalytics />
                        <SessionReplay />
                        <FeatureFlags />
                        <ABTesting />
                        <Cdp />
                        <DataWarehouse />
                        <Sql />
                        <Api />
                    </SliderComponent>
                    <div className="shrink-0 basis-[50px] hidden md:flex justify-center items-center md:absolute md:right-2 xl:static">
                        <button
                            onClick={() => slideRef.slickNext()}
                            className="relative hover:scale-[1.01] hover:top-[-1px] active:top-[.5px] active:scale-[.99] md:z-30"
                        >
                            <ArrowRight className="w-10" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
