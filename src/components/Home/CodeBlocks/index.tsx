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
        <div className="max-w-screen-2xl mx-auto">
            <InternalMenu
                activeIndex={activeIndex}
                menu={docsMenu?.children.map((child, index) => ({
                    ...child,
                    url: null,
                    onClick: () => setActiveIndex(index),
                }))}
            />
            <div className="my-12">
                <ContentViewer scrollToTop={false} content={content[activeIndex]} />
            </div>
        </div>
    )
}
