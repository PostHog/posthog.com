import React from 'react'
import { SlidesTemplate } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import billingProductsJson from '@data/products-billing.json'

// Product configuration - change this to adapt for different products
const PRODUCT_HANDLE = 'hog'

export default function Hog(): JSX.Element {
    const contentData = useContentData()

    // Merge content data with product data. SlidesTemplate reads the billing products as
    // `allProductData.nodes[0].products`.
    const mergedData = {
        allProductData: { nodes: [{ products: billingProductsJson }] },
        ...contentData,
    }

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={mergedData} />
}
