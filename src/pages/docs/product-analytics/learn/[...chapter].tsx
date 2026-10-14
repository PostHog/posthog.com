import React from 'react'
import { useLocation } from '@reach/router'

import LearnPage from 'components/PocketGuides/LearnPage'
import ProductAnalyticsLearnLanding from 'components/PocketGuides/ProductAnalyticsLearnLanding'

const BASE = '/docs/product-analytics/learn'

/** Client-only chapter route; the landing remains at the Learn root. */
export default function ProductAnalyticsLearnChapter(): JSX.Element {
    const location = useLocation()
    const chapter = (location?.pathname || '').replace(/\/$/, '').slice(BASE.length).replace(/^\//, '')

    return (
        <LearnPage
            productHandle="product_analytics"
            chapter={chapter}
            title="Learn Product Analytics – PostHog"
            description="Follow Twig's product team as they decide what to track and how to use it."
            landing={ProductAnalyticsLearnLanding}
        />
    )
}
