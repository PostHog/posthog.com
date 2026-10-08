import React from 'react'
import ProductReaderView from 'components/Products/ReaderViewProduct'

export default function WorkflowsPricing(): JSX.Element {
    return (
        <ProductReaderView
            productHandle="workflows_emails"
            surface="pricing"
            seoOverrides={{ title: 'Workflows pricing – PostHog' }}
        />
    )
}
