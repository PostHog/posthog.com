import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

const Slide = ({ className = '', onClick, id }: { className?: string; onClick?: () => void; id: string }) => {
    const handleClick = () => onClick?.()
    return (
        <button
            id={id}
            onClick={handleClick}
            className={`aspect-square bg-accent dark:bg-accent-dark flex items-center justify-center flex-grow flex-shrink-0 snap-start ${className}`}
        >
            <StaticImage key="cloud" src="../../Home/images/cloud-cd.jpg" alt="PostHog Cloud" />
        </button>
    )
}

export default function ImageSlider(): JSX.Element {
    const handleClick = (id: string) => {
        const el = document.getElementById(`pricing-slider-slide-${id}`)
        el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
    return (
        <>
            <div className="flex flex-nowrap snap-x overflow-y-hidden overflow-x-auto">
                {new Array(5).fill(0).map((_, index) => (
                    <Slide key={index} className="w-full" id={`pricing-slider-slide-${index}`} />
                ))}
            </div>
            <div className="flex flex-nowrap snap-x overflow-y-hidden overflow-x-auto mt-4 space-x-2">
                {new Array(5).fill(0).map((_, index) => (
                    <Slide
                        key={index}
                        className="w-1/5"
                        id={`pricing-slider-nav-${index}`}
                        onClick={() => handleClick(index)}
                    />
                ))}
            </div>
        </>
    )
}
