import React from 'react'
import ProductReaderView from 'components/Products/ReaderViewProduct'

export default function EndpointsPricing(): JSX.Element {
    return (
        <ProductReaderView
            productHandle="endpoints"
            surface="pricing"
            seoOverrides={{ title: 'Endpoints pricing – PostHog' }}
        />
    )
}
