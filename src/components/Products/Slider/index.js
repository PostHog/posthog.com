import { IconChevronDown } from '@posthog/icons'
import React, { useEffect, useRef, useState } from 'react'
import { slideButtons } from './slideButtons'
import {
    Funnels,
    Trends,
    UserPaths,
    CorrelationAnalysis,
    Retention,
    Stickiness,
    Lifecycle,
    Dashboards,
    HogQL,
} from './Slides'

const SlideButton = ({ title, Icon, color, activeSlide, setSlide, index }) => {
    const active = activeSlide === index

    return (
        <li className="h-[calc(100%_-_.25rem)] pb-1 border-b border-primary/25 dark:border-primary-dark/25 relative">
            <button
                onClick={() => setSlide(index)}
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
const slides = [Funnels, Trends, UserPaths, CorrelationAnalysis, Retention, Stickiness, Lifecycle, Dashboards, HogQL]

const SlideContainer = ({ children, index }) => {
    return (
        <div id={`home-slide-${index}`} key={index} className="flex-shrink-0 w-full snap-center h-[inherit]">
            <span className="inline-block h-full w-full">
                <div className="slide">{children}</div>
            </span>
        </div>
    )
}

export default function Slider() {
    const [activeSlide, setActiveSlide] = useState(0)
    const containerRef = useRef(null)
    const scrollIntoView = (index) => {
        const scroll = window.scrollY
        document.getElementById(`home-slide-${index}`)?.scrollIntoView({ block: 'nearest', inline: 'start' })
        window.scrollTo(0, scroll)
    }

    const handleArrow = (index, defaultIndex) => {
        const newActiveSlide = slides[index] ? index : defaultIndex
        setActiveSlide(newActiveSlide)
        scrollIntoView(newActiveSlide)
    }

    const setSlideHeight = () => {
        if (containerRef) {
            containerRef.current.style.height = `${
                document.getElementById(`home-slide-${activeSlide}`).querySelector('.slide').offsetHeight
            }px`
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setSlideHeight()
        }, 0)
    }, [activeSlide])

    return (
        <div className="-mt-8 md:mt-0 hidden md:block">
            <div className="hidden md:block px-8 lg:px-[50px] xl:px-4">
                <ul className="m-0 grid grid-cols-9 list-none max-w-full lg:max-w-7xl xl:mx-auto xl:max-w-screen-2xl p-0 mb-8">
                    {slideButtons.map((slide, index) => {
                        return (
                            <SlideButton
                                index={index}
                                activeSlide={activeSlide}
                                setSlide={handleArrow}
                                scrollIntoView={scrollIntoView}
                                key={index}
                                {...slide}
                            />
                        )
                    })}
                </ul>
            </div>
            <div className="flex items-start mx-auto">
                <div className="mt-64 shrink-0 basis-[50px] hidden md:flex justify-center items-center lg:static">
                    <button
                        onClick={() => handleArrow(activeSlide - 1, slides.length - 1)}
                        className="relative hover:scale-[1.01] hover:top-[-1px] active:top-[.5px] active:scale-[.99] md:z-30 p-6"
                    >
                        <IconChevronDown className="w-12 h-12 rounded-sm text-primary/60 hover:text-primary/100 dark:text-primary-dark/60 dark:hover:text-primary-dark/100 rotate-90 hover:bg-accent/25 dark:hover:bg-accent-dark/25 hover:backdrop-blur-sm active:backdrop-blur-sm border-transparent hover:border hover:border-light dark:hover:border-dark" />
                    </button>
                </div>
                <div
                    ref={containerRef}
                    className="flex-1 list-none max-w-full lg:max-w-7xl xl:max-w-screen-2xl 2xl:max-w-screen-2xl w-full mx-auto m-0 mb-12 p-0 flex flex-nowrap snap-mandatory snap-x overflow-x-hidden overflow-y-hidden"
                >
                    {slides.map((Slide, index) => (
                        <SlideContainer setActiveSlide={setActiveSlide} key={index} index={index}>
                            <Slide />
                        </SlideContainer>
                    ))}
                </div>
                <div className="mt-64 shrink-0 basis-[50px] hidden md:flex justify-center items-center lg:static">
                    <button
                        onClick={() => handleArrow(activeSlide + 1, 0)}
                        className="relative hover:scale-[1.01] hover:top-[-1px] active:top-[.5px] active:scale-[.99] md:z-30 p-6 box-border"
                    >
                        <IconChevronDown className="w-12 h-12 rounded-sm text-primary/60 hover:text-primary/100 dark:text-primary-dark/60 dark:hover:text-primary-dark/100 -rotate-90 hover:bg-accent/25 dark:hover:bg-accent-dark/25 hover:backdrop-blur-sm active:backdrop-blur-sm border-transparent hover:border hover:border-light dark:hover:border-dark" />
                    </button>
                </div>
            </div>
        </div>
    )
}
