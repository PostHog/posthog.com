import { InternalMenu } from 'components/MainNav'
import { docsMenu } from '../../../navs'
import React, { useState } from 'react'
import ContentViewer from 'components/ContentViewer'
import productOSContent from './ProductOS'
import productAnalyticsContent from './ProductAnalytics'
import sessionReplayContent from './SessionReplay'
import featureFlagsContent from './FeatureFlags'
import abTestingContent from './ABTesting'
import { Link } from 'gatsby'

const content = {
    'product os': productOSContent,
    'product analytics': productAnalyticsContent,
    'session replay': sessionReplayContent,
    'feature flags': featureFlagsContent,
    'a/b testing': abTestingContent,
}

export default function CodeBlocks() {
    const [activeName, setActiveName] = useState(Object.keys(content)[0])
    const menu = docsMenu?.children.filter(({ name }) => !!content[name.toLowerCase()])
    return (
        <div className="max-w-screen-2xl mx-auto relative pb-12">
            <h2 className="text-4xl px-4 md:px-0 lg:text-6xl text-center mb-1">Mmmm, code examples</h2>
            <p className="text-center leading-tight px-4 md:px-0 text-lg font-medium opacity-75 mb-2">
                Here's what you can do with the PostHog JS code snippet and your product.
            </p>
            <p className="text-center text-sm pb-4">
                <Link
                    to="https://posthog.com/docs/getting-started/install?tab=sdks"
                    className="text-primary/50 dark:text-primary-dark/50 font-normal"
                >
                    (Not using JavaScript?)
                </Link>
            </p>
            <InternalMenu
                scrollOnRender={false}
                activeIndex={menu.findIndex(({ name }) => name.toLowerCase() === activeName)}
                menu={menu.map((child) => ({
                    ...child,
                    url: null,
                    onClick: () => setActiveName(child.name.toLowerCase()),
                }))}
            />
            <div className="my-6 -mb-4 lg:mb-12 lg:my-12 px-5">
                <ContentViewer scrollToTop={false} content={content[activeName]} />
            </div>
        </div>
    )
}
