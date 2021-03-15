import React from 'react'

import analyticsImg from '../images/ProductFeatureIcons/analytics.svg'
import heatmapsImg from '../images/ProductFeatureIcons/heatmaps.svg'
import sessionReplayImg from '../images/ProductFeatureIcons/session-replay.svg'
import featureFlagsImg from '../images/ProductFeatureIcons/feature-flags.svg'
import abTestingImg from '../images/ProductFeatureIcons/ab-testing.svg'
import userFeedbackImg from '../images/ProductFeatureIcons/user-feedback.svg'
import revenueTrackingImg from '../images/ProductFeatureIcons/revenue-tracking.svg'
import placeholderImg from '../images/ProductFeatureIcons/placeholder.svg'

interface ProductIconData {
    label: string
    icon: any
    expectedLaunchDate?: string
}

const ProductFeatureIcon = ({ label, icon, expectedLaunchDate }: ProductIconData) => {
    const opacity = expectedLaunchDate ? 'opacity-50' : 'opacity-100'
    const expectedLabel = expectedLaunchDate ? (
        <span className="text-white uppercase text-2xs opacity-75">{expectedLaunchDate}</span>
    ) : null

    return (
        <div className={`text-center px-2 lg:px-4 flex flex-col ${opacity}`}>
            <div className="h-12 flex items-center justify-around">
                <img src={icon} alt={label} className="mb-0 block mx-auto" />
            </div>
            <span className="text-white block mt-1 font-bold">{label}</span>
            <div className="flex-grow">{expectedLabel}</div>
        </div>
    )
}

export const ProductFeatureIcons = () => {
    return (
        <div className="product-features mt-8 mb-16 lg:my-16 lg:flex lg:justify-center">
            <div className="row-1 flex justify-center lg:justify-between items-stretch flex-row flex-wrap leading-4">
                <ProductFeatureIcon label="Analytics" icon={analyticsImg} />
                <ProductFeatureIcon label="Heatmaps" icon={heatmapsImg} />
                <ProductFeatureIcon label="Session Replay" icon={sessionReplayImg} />
                <ProductFeatureIcon label="Feature Flags" icon={featureFlagsImg} />
            </div>
            <div className="row-2 flex justify-center lg:justify-between items-stretch flex-row flex-wrap my-6 lg:my-0 leading-4">
                <ProductFeatureIcon label="A/B Testing" icon={abTestingImg} expectedLaunchDate="May" />
                <ProductFeatureIcon label="User Feedback" icon={userFeedbackImg} expectedLaunchDate="June" />
                <ProductFeatureIcon label="Revenue Tracking" icon={revenueTrackingImg} expectedLaunchDate="August" />
                <ProductFeatureIcon label="" icon={placeholderImg} />
            </div>
        </div>
    )
}
