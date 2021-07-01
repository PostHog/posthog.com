import React from 'react'
import { LandingPageCallToAction } from '../LandingPage/LandingPageCallToAction'
import HeroAnimation from '../productFeature/images/svgs/hero.svg'

interface ProductHeroProps {
    preTitle?: string
    title: string
    tagline?: string
    disclaimer?: string
    componentKey: string
    bgColor?: string
}

export const ProductHero = ({
    preTitle,
    title,
    tagline,
    componentKey,
    bgColor = 'navy',
    disclaimer,
}: ProductHeroProps) => {
    const backgroundColorClass = `bg-${bgColor}`
    return (
        <div className={`${componentKey}`}>
            <div className="mt-[54%]">
                <div className="flex justify-center w-11/12 mx-auto mb-8 pt-12 flex-col relative z-10 text-center">
                    <div className="max-w-full hero-headline mt-4">
                        <div className="font-osiris lowercase text-base mb-4">{preTitle}</div>
                        <h1 className="text-white leading-tight mb-4 font-osiris lowercase font-normal">
                            <span className="text-5xl">{title}</span>
                        </h1>
                        <p className="text-baby-blue text-base">{tagline}</p>
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

            <HeroAnimation />
        </div>
    )
}
