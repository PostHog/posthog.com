import React from 'react'
import { useLocation } from '@reach/router'

import LearnPage from 'components/PocketGuides/LearnPage'

const BASE = '/docs/product-analytics/learn'

/** Client-only; the indexed copy is /pocket-guides. */
export default function ProductAnalyticsLearnChapter(): JSX.Element {
    const location = useLocation()
    const chapter = (location?.pathname || '').replace(/\/$/, '').slice(BASE.length).replace(/^\//, '')

    return (
        <LearnPage
            productHandle="product_analytics"
            chapter={chapter}
            title="Learn Product Analytics – PostHog"
            description="Follow Twig's engineers as they record and analyze activity in their product."
        />
    )
}
