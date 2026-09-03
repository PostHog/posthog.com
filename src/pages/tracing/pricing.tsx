import React from 'react'
import ProductReaderView from 'components/Products/ReaderViewProduct'

export default function TracesPricing(): JSX.Element {
    return (
        <ProductReaderView
            productHandle="traces"
            surface="pricing"
            seoOverrides={{ title: 'Traces pricing – PostHog' }}
        />
    )
}
