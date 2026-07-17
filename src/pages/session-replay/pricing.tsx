import React from 'react'
import ProductReaderView from 'components/Products/ReaderViewProduct'

export default function SessionReplayPricing(): JSX.Element {
    return (
        <ProductReaderView
            productHandle="session_replay"
            surface="pricing"
            seoOverrides={{ title: 'Session Replay pricing – PostHog' }}
        />
    )
}
