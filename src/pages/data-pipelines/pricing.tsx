import React from 'react'
import ProductReaderView from 'components/Products/ReaderViewProduct'

export default function DataPipelinesPricing(): JSX.Element {
    return (
        <ProductReaderView
            productHandle="data_pipelines"
            surface="pricing"
            seoOverrides={{ title: 'Data pipelines pricing – PostHog' }}
        />
    )
}
