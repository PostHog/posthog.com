import React from 'react'
import { LandingPageCallToAction } from '../LandingPage/LandingPageCallToAction'
import HeroAnimation720x1300 from '../productFeature/images/svgs/hero-720x1300.svg'
import HeroAnimation1920x1080 from '../productFeature/images/svgs/hero-1920x1080.svg'
import HeroAnimation1920x720 from '../productFeature/images/svgs/hero-1920x720.svg'

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
        <div
            className={`${componentKey}`}
            id={id} // ID applied to navigate using navbar
        >
            <div className="mt-[180%] sm:mt-[54%] xl:mt-[37.5%]">
                <div className="flex justify-center w-11/12 mx-auto pb-8 pt-12 flex-col relative z-10 text-center">
                    <div className="max-w-full hero-headline mt-4">
                        <div className="font-osiris lowercase text-base mb-4 text-white text-opacity-75">
                            {preTitle}
                        </div>
                        <h1 className="text-white leading-tight mb-4 font-osiris lowercase font-normal">
                            <span className="text-5xl">{title}</span>
                        </h1>
                        <p className="text-baby-blue text-base mx-auto">{tagline}</p>
                    </div>

                    <div className="relative">
                        <LandingPageCallToAction />
                    </div>

                    <div
                        className="text-white text-opacity-70 mt-4 text-xs"
                        dangerouslySetInnerHTML={{
                            __html: disclaimer?.includes('<p>')
                                ? disclaimer
                                : `<p className="max-w-3xl>${disclaimer}</p>`,
                        }}
                    />
                </div>
            </div>

            <a href="#" className="absolute bottom-0 sm:mb-12 xl:mb-4 z-20 p-4 sm:p-8">
                <span className="chevron"></span>
            </a>

            <HeroAnimation720x1300 className="sm:hidden absolute h-full w-full top-0 left-0" />
            <HeroAnimation1920x1080 className="hidden sm:block xl:hidden absolute h-full w-full top-0 left-0" />
            <HeroAnimation1920x720 className="hidden xl:block absolute h-full w-full top-0 left-0" />
        </div>
    )
}
