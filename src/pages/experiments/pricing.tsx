import React from 'react'
import ProductReaderView from 'components/Products/ReaderViewProduct'

export default function ExperimentsPricing(): JSX.Element {
    return (
        <ProductReaderView
            productHandle="experiments"
            surface="pricing"
            seoOverrides={{ title: 'Experiments pricing – PostHog' }}
        />
    )
}
