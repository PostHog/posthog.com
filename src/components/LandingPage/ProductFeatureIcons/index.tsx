import React from 'react'

import eventPipelineImg from '../images/ProductFeatureIcons/eventPipeline.svg'
import analyticsImg from '../images/ProductFeatureIcons/analytics.svg'
import sessionReplayImg from '../images/ProductFeatureIcons/session-replay.svg'
import featureFlagsImg from '../images/ProductFeatureIcons/feature-flags.svg'
import dataLakesImg from '../images/ProductFeatureIcons/dataLakes.svg'

interface ProductIconData {
    label: string
    icon: string
    subtitle?: string
    expectedLaunchDate?: string
}

const ProductFeatureIcon = ({ label, icon, subtitle, expectedLaunchDate }: ProductIconData) => {
    const opacity = expectedLaunchDate ? 'opacity-50' : 'opacity-100'
    const expectedLabel = expectedLaunchDate ? (
        <span className="text-white uppercase text-2xs opacity-75">{expectedLaunchDate}</span>
    ) : null

    return (
        <div className={`text-center text-baseline leading-snug px-2 mb-4 lg:px-4 flex flex-col ${opacity}`}>
            <div className="h-12 flex items-center justify-around">
                <img src={icon} alt={label} className="mb-0 block mx-auto" />
            </div>
            <span className="text-white block mt-1 font-bold">{label}</span>
            <div className="flex-grow text-white">{subtitle}</div>
            <div className="flex-grow">{expectedLabel}</div>
        </div>
    )
}

export const ProductFeatureIcons = () => {
    return (
        <div className="product-features justify-center mt-8 mb-8 lg:my-16 inline-grid">
            <ProductFeatureIcon label="Ingest product data" icon={eventPipelineImg} subtitle="with event pipeline" />
            <ProductFeatureIcon label="Learn" icon={analyticsImg} subtitle="with analytics suite" />
            <ProductFeatureIcon label="Test &amp; iterate" icon={featureFlagsImg} subtitle="with feature flags" />
            <ProductFeatureIcon label="Watch adoption" icon={sessionReplayImg} subtitle="with session recordings" />
            <ProductFeatureIcon label="Export" icon={dataLakesImg} subtitle="to data lakes" />
        </div>
    )
}
