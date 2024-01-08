import Layout from 'components/Layout'
import React, { useState } from 'react'
// import { getShopifyProduct } from './transforms'
import { Drawer } from 'components/Drawer'
import Pagination from '../../components/Pagination'
import { Cart } from './Cart'
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
    const [cartIsOpen, setCartIsOpen] = useState<boolean>(false)
    const products = pageContext.productsForCurrentPage
    const transformedProducts = products?.map((p) => getProduct(p))

    return (
        <>
            <Layout className="[&_main]:pb-[80px]">
                <Nav
                    setCartIsOpen={setCartIsOpen}
                    currentCollectionHandle={pageContext.handle}
                    items={pageContext.merchNav}
                />
                <div className="w-full px-4 mx-auto max-w-7xl">
                    <ProductGrid products={transformedProducts} />
                </div>

                <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-light dark:border-dark">
                    <Pagination currentPage={pageContext.currentPage} numPages={pageContext.numPages} base="/merch" />
                </div>
            </Layout>

            <Drawer isOpen={cartIsOpen} onClose={() => setCartIsOpen(false)}>
                <Cart className="h-full overflow-y-scroll bg-accent dark:bg-accent-dark" />
            </Drawer>
        </>
    )
}
