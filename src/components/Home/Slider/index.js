import React, { useState } from 'react'
import SliderComponent from 'react-slick'
import { slideButtons } from './slideButtons'
import { ABTesting, FeatureFlags, ProductAnalytics, SessionRecording } from './Slides'

const SlideButton = ({ title, Icon, activeSlide, index }) => {
    const active = activeSlide === index
    return (
        <li className="p-2">
            <button
                className={`flex flex-col items-center justify-center pb-[20px] pt-[10px] w-full px-5 rounded-md transition-all ${
                    active ? 'bg-gray-accent-light' : ''
                }`}
            >
                <span className="w-[52px] h-[52px] flex justify-center items-center">
                    <span className="absolute">
                        <Icon active={active} />
                    </span>
                </span>
                <p className={`text-sm opacity-75 m-0 ${active ? 'font-bold' : 'font-semibold'}`}>{title}</p>
            </button>
        </li>
    )
}

export default function Slider() {
    const [buttonRef, setButtonRef] = useState()
    const [slideRef, setSlideRef] = useState()
    const [activeSlide, setActiveSlide] = useState(0)
    console.log(slideButtons)
    const handleChange = (_oldIndex, newIndex) => {
        setActiveSlide(newIndex)
    }

    return (
        <div>
            <div className="border-t border-b border-gray-accent-light border-dashed">
                <SliderComponent
                    beforeChange={handleChange}
                    ref={(buttonRef) => setButtonRef(buttonRef)}
                    asNavFor={slideRef}
                    arrows={false}
                    slidesToShow={7}
                    focusOnSelect
                    className="home-slider list-none max-w-7xl mx-auto m-0 p-0 border-r border-l border-gray-accent-light border-dashed"
                >
                    {slideButtons.map((slide, index) => {
                        return <SlideButton index={index} activeSlide={activeSlide} key={index} {...slide} />
                    })}
                </SliderComponent>
                <SliderComponent
                    ref={(slideRef) => setSlideRef(slideRef)}
                    asNavFor={buttonRef}
                    arrows={false}
                    slidesToShow={1}
                    infinite
                    className="list-none max-w-7xl mx-auto m-0 p-0 flex items-center justify-center divide divide-x divide-gray-accent-light divide-dashed overflow-auto border-r border-l border-gray-accent-light border-dashed"
                >
                    <ProductAnalytics />
                    <SessionRecording />
                    <FeatureFlags />
                    <ABTesting />
                </SliderComponent>
            </div>
        </div>
    )
}
