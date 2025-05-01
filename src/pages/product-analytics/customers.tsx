import React, { useState } from 'react'
import SEO from 'components/seo'
import ScrollArea from 'components/RadixUI/ScrollArea'
import Editor from 'components/Editor'

export default function ProductAnalyticsFeatures(): JSX.Element {
    return (
        <>
            <SEO
                title="Features – Product Analytics"
                description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/product-analytics.jpg`}
            />
            <Editor
                title="customers"
                type="mdx"
                filters={{
                  products: ['product_analytics'],
                  caseStudy: true
                }}
            >
                <ScrollArea>
                  blah
                </ScrollArea>
            </Editor>
        </>
    )
}
