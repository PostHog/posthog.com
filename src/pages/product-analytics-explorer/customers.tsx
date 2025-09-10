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
                image={`/images/og/default.png`}
            />
            <Editor
                title="notable product analytics customers"
                type="mdx"
                showFilters
                disableFilterChange
                availableFilters={[
                    {
                        label: 'product used',
                        options: [{ label: 'Product Analytics', value: 'product analytics' }],
                        filter: () => false,
                        operator: 'includes',
                    },
                    {
                        label: 'case study',
                        options: [
                            { label: 'TRUE', value: true },
                            { label: 'FALSE', value: false },
                        ],
                        filter: () => false,
                        operator: 'equals',
                    },
                ]}
            >
                <ScrollArea>
                    <ProductCustomerTable productType="product_analytics" />
                </ScrollArea>
            </Editor>
        </>
    )
}
