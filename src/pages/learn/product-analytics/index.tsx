import React from 'react'

import LearnPage from 'components/Learn/LearnPage'
import ProductAnalyticsLearnLanding from 'components/Learn/ProductAnalyticsLearnLanding'

export default function ProductAnalyticsLearn(): JSX.Element {
    return (
        <LearnPage
            productHandle="product_analytics"
            title="Learn Product Analytics – PostHog"
            description="Follow Twig's product team as they decide what to track and how to use it."
            landing={ProductAnalyticsLearnLanding}
        />
    )
}
