import React from 'react'
import ProductReaderView from 'components/Products/ReaderViewProduct'

export default function TransactionalEmailsPricing(): JSX.Element {
    return (
        <ProductReaderView
            productHandle="transactional_emails"
            surface="pricing"
            seoOverrides={{ title: 'Transactional emails pricing – PostHog' }}
        />
    )
}
