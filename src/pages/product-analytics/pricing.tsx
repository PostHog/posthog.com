import React from 'react'
import ProductReaderView from 'components/Products/ReaderViewProduct'

export default function ProductAnalyticsPricing(): JSX.Element {
    return (
        <ProductReaderView
            productHandle="product_analytics"
            surface="pricing"
            seoOverrides={{ title: 'Product Analytics pricing – PostHog' }}
        />
    )
}
