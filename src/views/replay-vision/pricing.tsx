import React from 'react'
import ProductReaderView from 'components/Products/ReaderViewProduct'

export default function ReplayVisionPricing(): JSX.Element {
    return (
        <ProductReaderView
            productHandle="replay_vision"
            surface="pricing"
            seoOverrides={{ title: 'Replay Vision pricing – PostHog' }}
        />
    )
}
