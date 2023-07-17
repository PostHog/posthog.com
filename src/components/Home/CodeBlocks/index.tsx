import { InternalMenu } from 'components/MainNav'
import { docsMenu } from '../../../navs'
import React, { useState } from 'react'
import ContentViewer from 'components/ContentViewer'
import productOSContent from './ProductOS'
import productAnalyticsContent from './ProductAnalytics'
import sessionReplayContent from './SessionReplay'
import featureFlagsContent from './FeatureFlags'
import abTestingContent from './ABTesting'

const content = [productOSContent, productAnalyticsContent, sessionReplayContent, featureFlagsContent, abTestingContent]

export default function CodeBlocks() {
    const [activeIndex, setActiveIndex] = useState(0)
    return (
        <div className="max-w-screen-2xl mx-auto relative pb-12">
            <h2 className="text-4xl lg:text-6xl text-center mb-1">Mmmm, code examples</h2>
            <p className="text-center text-lg font-medium opacity-75 pb-4">
                The PostHog code snippet offers granular control over features and data privacy.
            </p>
            <InternalMenu
                scrollOnRender={false}
                activeIndex={activeIndex}
                menu={docsMenu?.children.slice(0, 5).map((child, index) => ({
                    ...child,
                    url: null,
                    onClick: () => setActiveIndex(index),
                }))}
            />
            <div className="my-6 -mb-4 lg:mb-12 lg:my-12 px-5">
                <ContentViewer scrollToTop={false} content={content[activeIndex]} />
            </div>
        </div>
    )
}
