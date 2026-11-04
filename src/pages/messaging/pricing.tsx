import React from 'react'
import ProductReaderView from 'components/Products/ReaderViewProduct'

export default function MessagingPricing(): JSX.Element {
    return (
        <ProductReaderView
            productHandle="messaging"
            surface="pricing"
            seoOverrides={{ title: 'Email & Messaging pricing - PostHog' }}
        />
    )
}
