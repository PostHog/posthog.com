import React from 'react'
import ProductReaderView from 'components/Products/ReaderViewProduct'

export default function LogsPricing(): JSX.Element {
    return (
        <ProductReaderView productHandle="logs" surface="pricing" seoOverrides={{ title: 'Logs pricing – PostHog' }} />
    )
}
