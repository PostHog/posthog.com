import React from 'react'
import ProductsControl from './ProductsControl'
import ProductsTest from './ProductsTest'
import usePostHog from 'hooks/usePostHog'
import { RenderInClient } from 'components/RenderInClient'

export default function Products() {
    const posthog = usePostHog()
    return (
        <RenderInClient
            placeholder={<ProductsControl />}
            render={() => {
                const variant = posthog?.getFeatureFlag?.('data-positioning')
                return variant === 'test' ? <ProductsTest /> : <ProductsControl />
            }}
        />
    )
}
