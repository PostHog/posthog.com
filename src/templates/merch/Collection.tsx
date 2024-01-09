import Layout from 'components/Layout'
import React from 'react'
import Pagination from '../../components/Pagination'
import { Nav } from './Nav'
import ProductGrid from './ProductGrid'
import { getProduct } from './transforms'
import { MerchPageContext } from './types'

type CollectionProps = {
    pageContext: MerchPageContext
    // data: {
    //     products: AllShopifyProduct
    // }
}

export default function Collection(props: CollectionProps): React.ReactElement {
    console.log('🚀 ~ props:', props)
    const { pageContext } = props

    const products = pageContext.productsForCurrentPage
    const transformedProducts = products?.map((p) => getProduct(p))

    return (
        <>
            <Layout className="[&_main]:pb-[80px]">
                <Nav currentCollectionHandle={pageContext.handle} items={pageContext.merchNav} />
                <div className="w-full px-4 mx-auto max-w-7xl">
                    <ProductGrid products={transformedProducts} />
                </div>

                <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-light dark:border-dark">
                    <Pagination currentPage={pageContext.currentPage} numPages={pageContext.numPages} base="/merch" />
                </div>
            </Layout>
        </>
    )
}
