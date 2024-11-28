import Layout from 'components/Layout'
import React from 'react'
import { Nav } from './Nav'
import ProductGrid from './ProductGrid'
import { getProduct } from './transforms'
import { CollectionPageContext } from './types'
import SEO from 'components/seo'

type CollectionProps = {
    pageContext: CollectionPageContext
}

const order = [
    'Caution T-Shirt',
    'Dark Mode T-Shirt',
    'Items T-Shirt',
    'Hogzilla T-Shirt',
    'Scrabble T-Shirt',
    'SF T-Shirt',
]

export default function Collection(props: CollectionProps): React.ReactElement {
    const { pageContext } = props

    const products = pageContext.productsForCurrentPage
    const transformedProducts = products
        ?.map((p) => getProduct(p))
        .sort((a, b) => {
            const aIndex = order.findIndex((title) => title.toLowerCase() === a.title.toLowerCase())
            const bIndex = order.findIndex((title) => title.toLowerCase() === b.title.toLowerCase())
            if (aIndex === -1) return 1
            if (bIndex === -1) return -1
            return aIndex - bIndex
        })

    return (
        <>
            <Layout className="[&_main]:pb-[80px]">
                <SEO title="Merch - PostHog" image="/images/merch.png" />
                <Nav currentCollectionHandle={pageContext.handle} />
                <div className="w-full px-4 mx-auto max-w-7xl">
                    <ProductGrid products={transformedProducts} />
                </div>
            </Layout>
        </>
    )
}
