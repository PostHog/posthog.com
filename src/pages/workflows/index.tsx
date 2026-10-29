import React from 'react'
import ProductReaderView from 'components/Products/ReaderViewProduct'

export default function Workflows(): JSX.Element {
    // Handle is workflows_emails (billing / getTool); slug remains /workflows.
    return <ProductReaderView productHandle="workflows_emails" />
}
