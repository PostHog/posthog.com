import React from 'react'
import ProductReaderView from 'components/Products/ReaderViewProduct'

export default function FeatureFlagsPricing(): JSX.Element {
    return (
        <ProductReaderView
            productHandle="feature_flags"
            surface="pricing"
            seoOverrides={{ title: 'Feature Flags pricing – PostHog' }}
        />
    )
}
