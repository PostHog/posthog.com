import React from 'react'
import ProductReaderView from 'components/Products/ReaderViewProduct'

export default function SurveysPricing(): JSX.Element {
    return (
        <ProductReaderView
            productHandle="surveys"
            surface="pricing"
            seoOverrides={{ title: 'Surveys pricing – PostHog' }}
        />
    )
}
