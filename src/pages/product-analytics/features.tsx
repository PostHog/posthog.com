import React from 'react'
import Layout from 'components/Layout'
import ProductProductAnalytics from 'components/Product/ProductAnalytics'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'

export default function ProductAnalyticsFeatures(): JSX.Element {
    return (
      <>
        <SEO
            title="Features – Product Analytics"
            description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
            image={`/images/og/product-analytics.jpg`}
        />
        <Explorer slug="product-analytics" title="Features">
          features go here!
        </Explorer>
      </>
    )
}
