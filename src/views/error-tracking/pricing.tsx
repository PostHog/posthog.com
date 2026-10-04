import React from 'react'
import ProductReaderView from 'components/Products/ReaderViewProduct'

export default function ErrorTrackingPricing(): JSX.Element {
    return (
        <ProductReaderView
            productHandle="error_tracking"
            surface="pricing"
            seoOverrides={{ title: 'Error Tracking pricing – PostHog' }}
        />
    )
}
