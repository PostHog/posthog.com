import React from 'react'
import SEO from 'components/seo'
import ScrollArea from 'components/RadixUI/ScrollArea'
import Editor from 'components/Editor'
import ProductCustomerTable from 'components/ProductCustomerTable'

export default function ProductAnalyticsCustomers(): JSX.Element {
    return (
        <>
            <SEO
                title="Customers – Product Analytics"
                description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/product-analytics.jpg`}
            />
            <Editor
                title="notable product analytics customers"
                type="mdx"
                filters={{
                    products: ['product_analytics'],
                    caseStudy: true
                }}
            >
                <ScrollArea>
                    <ProductCustomerTable productType="product_analytics" />
                </ScrollArea>
            </Editor>
        </>
    )
}
