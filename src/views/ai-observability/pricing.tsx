import React from 'react'
import ProductReaderView from 'components/Products/ReaderViewProduct'

export default function AIObservabilityPricing(): JSX.Element {
    return (
        <ProductReaderView
            productHandle="ai_observability"
            surface="pricing"
            seoOverrides={{ title: 'AI Observability pricing – PostHog' }}
        />
    )
}
