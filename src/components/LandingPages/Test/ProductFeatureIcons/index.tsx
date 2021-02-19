import React from 'react'

import analyticsImg from '../images/ProductFeatureIcons/analytics.svg'
import heatmapsImg from '../images/ProductFeatureIcons/heatmaps.svg'
import sessionReplayImg from '../images/ProductFeatureIcons/session-replay.svg'
import featureFlagsImg from '../images/ProductFeatureIcons/feature-flags.svg'
import userFeedbackImg from '../images/ProductFeatureIcons/user-feedback.svg'
import revenueTrackingImg from '../images/ProductFeatureIcons/revenue-tracking.svg'

interface ProductIconData {
    label: string
    icon: any
    expectedLaunchDate?: string
}

const ProductFeatureIcon = ({ label, icon, expectedLaunchDate }: ProductIconData) => {
    const opacity = expectedLaunchDate ? 'opacity-50' : 'opacity-100'
    const expectedLabel = expectedLaunchDate ? <span className="text-white font-thin">{expectedLaunchDate}</span> : null

    return (
        <div className={`text-center mx-4 flex flex-col ${opacity}`}>
            <div className="h-12 flex items-center justify-around">
                <img src={icon} alt={label} className="mb-0 block mx-auto" />
            </div>
            <span className="text-white block mt-1 font-bold">{label}</span>
            <div className="flex-grow">{expectedLabel}</div>
        </div>
    )
}

const ProductFeatureIcons = () => {
    return (
        <div className="flex justify-between items-stretch flex-col md:flex-row my-16">
            <ProductFeatureIcon label="Analytics" icon={analyticsImg} />

            <ProductFeatureIcon label="Heatmaps" icon={heatmapsImg} />

            <ProductFeatureIcon label="Session Replay" icon={sessionReplayImg} />

            <ProductFeatureIcon label="Feature Flags" icon={featureFlagsImg} />

            <ProductFeatureIcon label="A/B Testing" icon={featureFlagsImg} expectedLaunchDate="May" />

            <ProductFeatureIcon label="User Feedback" icon={userFeedbackImg} expectedLaunchDate="June" />

            <ProductFeatureIcon label="Revenue Tracking" icon={revenueTrackingImg} expectedLaunchDate="August" />
        </div>
    )
}

export default ProductFeatureIcons
