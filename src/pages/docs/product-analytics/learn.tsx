import React from 'react'

import LearnPage from 'components/PocketGuides/LearnPage'

export default function ProductAnalyticsLearn(): JSX.Element {
    return (
        <LearnPage
            productHandle="product_analytics"
            title="Learn Product Analytics – PostHog"
            description="Follow engineers as they discover and learn about the wonderful world of user activity."
            interactiveLearningUrl="https://twig.com/#twig-playground"
        />
    )
}
