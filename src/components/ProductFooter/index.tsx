import React from 'react'
import { LandingPageCallToAction } from '../LandingPage/LandingPageCallToAction'

interface ProductFooterProps {
    title: string
    tagline?: string
    disclaimer?: string
    componentKey: string
    bgColor?: string
}

export const ProductFooter = ({ title, tagline, componentKey, bgColor = 'navy', disclaimer }: ProductFooterProps) => {
    const backgroundColorClass = `bg-${bgColor}`
    return (
        <div className={`${componentKey}`}>
            <div className="mt-[180%] sm:mt-[54%] xl:mt-[37.5%]">
                <div className="flex justify-center w-11/12 mx-auto mb-8 pt-12 flex-col relative z-10 text-center">
                    <div className="max-w-full hero-headline mt-4">
                        <h1 className="text-white leading-tight mb-4 font-osiris lowercase font-normal">
                            <span className="text-3xl">{title}</span>
                        </h1>
                        <p className="text-baby-blue text-base max-w-3xl">{tagline}</p>
                    </div>

                    <div className="relative">
                        <LandingPageCallToAction />
                    </div>

                    <div
                        className="text-white text-opacity-70 mt-4 text-xs"
                        dangerouslySetInnerHTML={{
                            __html: disclaimer?.includes('<p>') ? disclaimer : `<p>${disclaimer}</p>`,
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
