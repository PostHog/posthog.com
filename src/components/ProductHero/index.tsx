import { scrollWithOffset } from 'lib/utils'
import React from 'react'
import { LandingPageCallToAction } from '../LandingPage/LandingPageCallToAction'

import HeroImage from './HeroImage'

interface ProductHeroProps {
    preTitle?: string
    title: string
    tagline?: string
    disclaimer?: string
    componentKey: string
    bgColor?: string
    id?: 'platform' | undefined
}

export const ProductHero = ({
    preTitle,
    title,
    tagline,
    componentKey,
    bgColor = 'navy',
    disclaimer,
    id,
}: ProductHeroProps) => {
    const backgroundColorClass = `bg-${bgColor}`
    return (
        <div className={`${componentKey}`}>
            <div className="mt-[180%] sm:mt-[54%] xl:mt-[37.5%]">
                <div className="flex justify-center w-11/12 mx-auto pb-8 pt-12 flex-col relative z-10 text-center">
                    <div className="max-w-full hero-headline mt-4">
                        <div className="text-base mb-0 text-white text-opacity-75">{preTitle}</div>
                        <h1 className="text-white leading-none my-4">
                            <span className="text-5xl">{title}</span>
                        </h1>
                        <p className="text-baby-blue text-base max-w-3xl mx-auto">{tagline}</p>
                    </div>

                    <div className="relative">
                        <LandingPageCallToAction />
                    </div>

                    <div className="text-white text-opacity-70 mt-6 text-xs">
                        <p className="max-w-3xl mx-auto text-xs text-baby-blue">{disclaimer}</p>
                    </div>
                </div>
            </div>

            <div
                className="absolute sm:hidden md:hidden lg:block bottom-0 sm:mb-12 xl:mb-4 z-20 p-4 sm:p-8 cursor-pointer"
                onClick={() => scrollWithOffset('#platform', -90)}
            >
                <span className="chevron"></span>
            </div>

            <HeroImage />
        </div>
    )
}
