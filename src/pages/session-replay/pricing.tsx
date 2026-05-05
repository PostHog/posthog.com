import React from 'react'
import ProductReaderView from 'components/Products/ReaderViewProduct'
import { PRODUCT_HANDLE, pricingMenu, productMenu } from './index'

export default function SessionReplayPricing(): JSX.Element {
    return (
        <ProductReaderView
            productHandle={PRODUCT_HANDLE}
            surface="pricing"
            seoOverrides={{ title: 'Session Replay pricing – PostHog' }}
            productMenu={productMenu}
            pricingMenu={pricingMenu}
        />
    )
}
