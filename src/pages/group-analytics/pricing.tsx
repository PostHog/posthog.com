import React from 'react'
import ProductReaderView from 'components/Products/ReaderViewProduct'

export default function GroupAnalyticsPricing(): JSX.Element {
    return (
        <ProductReaderView
            productHandle="group_analytics"
            surface="pricing"
            seoOverrides={{ title: 'Group Analytics pricing – PostHog' }}
        />
    )
}
