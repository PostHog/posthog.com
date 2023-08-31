import { ArrowLeft, ArrowRight } from '@posthog/icons'
import React, { useEffect, useState } from 'react'
import { slideButtons } from './slideButtons'
import { ProductAnalytics, SessionReplay, FeatureFlags, ABTesting, Cdp, DataWarehouse, Sql, Api } from './Slides'
import { useInView } from 'react-intersection-observer'

const SlideButton = ({ title, Icon, color, activeSlide, index }) => {
    const active = activeSlide === index

    const handleClick = () => {
        document.getElementById(`home-slide-${index}`)?.scrollIntoView({ block: 'nearest', inline: 'start' })
    }

    return (
        <li className="h-[calc(100%_-_.25rem)] pb-1 border-b border-primary/25 dark:border-primary-dark/25 relative">
            <button
                onClick={handleClick}
                className={`flex flex-col items-center mt-1 p-2 w-full rounded-md transition-opacity transition-colors border border-b-3 border-transparent space-y-1 h-full ${
                    active
                        ? `after:absolute after:bottom-0 after:h-[3px] after:w-full after:bg-${color} after:rounded-full active after:translate-y-1/2`
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
const slides = [ProductAnalytics, SessionReplay, FeatureFlags, ABTesting, Cdp, DataWarehouse, Sql]

const SlideContainer = ({ children, index, setActiveSlide }) => {
    const [viewRef, inView] = useInView({ threshold: 0.5 })

    useEffect(() => {
        if (inView) setActiveSlide(index)
    }, [inView])

    return (
        <div id={`home-slide-${index}`} key={index} className="pt-8 flex-shrink-0 w-full snap-center h-[inherit]">
            <span className="inline-block h-full w-full" ref={viewRef}>
                {children}
            </span>
        </div>
    )
}

export default function Slider() {
    const [activeSlide, setActiveSlide] = useState(0)

    const scrollIntoView = (index) =>
        document.getElementById(`home-slide-${index}`)?.scrollIntoView({ block: 'nearest', inline: 'start' })

    const handleArrow = (index, defaultIndex) => {
        const newActiveSlide = slides[index] ? index : defaultIndex
        setActiveSlide(newActiveSlide)
        scrollIntoView(newActiveSlide)
    }

    return (
        <div className="-mt-8 md:mt-0 hidden md:block">
            <div className="hidden md:block px-8 lg:px-[50px]">
                <ul className="m-0 grid grid-cols-7 list-none max-w-full lg:max-w-7xl xl:mx-auto p-0">
                    {slideButtons.map((slide, index) => {
                        return <SlideButton index={index} activeSlide={activeSlide} key={index} {...slide} />
                    })}
                </ul>
            </div>
            <div className="flex items-center max-w-screen-2xl mx-auto">
                <div className="shrink-0 basis-[50px] hidden md:flex justify-center items-center  lg:static">
                    <button
                        onClick={() => handleArrow(activeSlide - 1, slides.length - 1)}
                        className="relative hover:scale-[1.01] hover:top-[-1px] active:top-[.5px] active:scale-[.99] md:z-30 p-8"
                    >
                        <ArrowLeft className="w-10" />
                    </button>
                </div>
                <div className="flex-1 list-none max-w-full lg:max-w-7xl xl:max-w-7xl 2xl:max-w-7xl w-full mx-auto m-0 p-0 flex flex-nowrap snap-mandatory snap-x overflow-x-auto overflow-y-hidden">
                    {slides.map((Slide, index) => (
                        <SlideContainer setActiveSlide={setActiveSlide} key={index} index={index}>
                            <Slide />
                        </SlideContainer>
                    ))}
                </div>
                <div className="shrink-0 basis-[50px] hidden md:flex justify-center items-center  lg:static">
                    <button
                        onClick={() => handleArrow(activeSlide + 1, 0)}
                        className="relative hover:scale-[1.01] hover:top-[-1px] active:top-[.5px] active:scale-[.99] md:z-30 p-8"
                    >
                        <ArrowRight className="w-10" />
                    </button>
                </div>
            </div>
        </div>
    )
}
