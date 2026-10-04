import React from 'react'
import ProductReaderView from 'components/Products/ReaderViewProduct'

export default function WebAnalyticsPricing(): JSX.Element {
    return (
        <ProductReaderView
            productHandle="web_analytics"
            surface="pricing"
            seoOverrides={{ title: 'Web Analytics pricing – PostHog' }}
        />
    )
}
