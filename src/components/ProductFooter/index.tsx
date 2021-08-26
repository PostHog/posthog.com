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
            <div className="flex justify-center w-11/12 mx-auto pb-8 pt-12 flex-col relative z-10 text-center">
                <div className="max-w-full hero-headline mt-4">
                    <div className="text-white leading-tight mb-4">
                        <span className="text-3xl">{title}</span>
                    </div>
                    <p className="text-baby-blue text-base max-w-3xl mx-auto">{tagline}</p>
                </div>

                <div className="relative">
                    <LandingPageCallToAction />
                </div>

                <div className="mt-6 text-xs">
                    <p className="max-w-3xl mx-auto text-xs text-baby-blue">{disclaimer}</p>
                </div>
            </div>
        </div>
    )
}
