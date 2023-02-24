import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

export const ProductAnalytics = () => {
    return (
        <details>
            <summary className="flex items-center justify-between">
                <h3>Product Analytics</h3>

                <StaticImage
                    alt=""
                    placeholder="none"
                    quality={100}
                    className="w-36"
                    src="../Home/Slider/images/product-analytics-hog.png"
                />
            </summary>
            Product Analytics
        </details>
    )
}

export const Recordings = () => {
    return (
        <details>
            <summary className="flex items-center justify-between">
                <h3>Session recording</h3>

                <StaticImage
                    alt=""
                    placeholder="none"
                    quality={100}
                    className="w-36"
                    src="../Home/Slider/images/session-recording-hog.png"
                />
            </summary>
            Session recording
        </details>
    )
}

export const FeatureFlags = () => {
    return (
        <details>
            <summary className="flex items-center justify-between">
                <h3>Feature Flags</h3>

                <StaticImage
                    alt=""
                    placeholder="none"
                    quality={100}
                    className="w-36"
                    src="../Home/Slider/images/feature-flags-hog.png"
                />
            </summary>
            Feature flags
        </details>
    )
}

export const Experiments = () => {
    return (
        <details>
            <summary className="flex items-center justify-between">
                <h3>Experiments</h3>

                <StaticImage
                    alt=""
                    placeholder="none"
                    quality={100}
                    className="w-36"
                    src="../Home/Slider/images/ab-testing-hog.png"
                />
            </summary>
            Experiments
        </details>
    )
}

export const Apps = () => {
    return (
        <details>
            <summary className="flex items-center justify-between">
                <h3>Apps</h3>

                <StaticImage
                    alt=""
                    placeholder="none"
                    quality={100}
                    className="w-36"
                    src="../Home/Slider/images/event-pipelines-hog.png"
                />
            </summary>
            Apps
        </details>
    )
}
