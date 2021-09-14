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
        <div className={`${componentKey} max-w-2xl mx-auto pt-32 pb-16 text-center`}>
            <h2 className="mb-4">{title}</h2>

            <div className="relative mt-6 mb-4">
                <LandingPageCallToAction />
            </div>

            <div className="mt-6 text-xs">
                <p className="max-w-3xl mx-auto text-xs">{disclaimer}</p>
            </div>
        </div>
    )
}
