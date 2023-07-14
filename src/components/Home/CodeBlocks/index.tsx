import { InternalMenu } from 'components/MainNav'
import { docsMenu } from '../../../navs'
import React, { useState } from 'react'
import ContentViewer from 'components/ContentViewer'
import productOSContent from './ProductOS'
import productAnalyticsContent from './ProductAnalytics'
import sessionReplayContent from './SessionReplay'
import featureFlagsContent from './FeatureFlags'
import abTestingContent from './ABTesting'
import cdpContent from './CDP'
import dataWarehouseContent from './DataWarehouse'

const content = [
    productOSContent,
    productAnalyticsContent,
    sessionReplayContent,
    featureFlagsContent,
    abTestingContent,
    cdpContent,
    dataWarehouseContent,
]

export default function CodeBlocks() {
    const [activeIndex, setActiveIndex] = useState(0)
    return (
        <div className="max-w-screen-2xl mx-auto relative">
            <h2 className="text-4xl lg:text-6xl text-center mb-1">Code-based</h2>
            <p className="text-center text-lg font-medium opacity-75 pb-4">
                The PostHog code snippet offers granular control over features and data privacy.
            </p>
            <InternalMenu
                activeIndex={activeIndex}
                menu={docsMenu?.children.map((child, index) => ({
                    ...child,
                    url: null,
                    onClick: () => setActiveIndex(index),
                }))}
            />
            <div className="my-12 px-5">
                <ContentViewer scrollToTop={false} content={content[activeIndex]} />
            </div>
        </div>
    )
}
