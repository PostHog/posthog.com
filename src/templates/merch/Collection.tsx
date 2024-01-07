import Layout from 'components/Layout'
import React from 'react'
// import { getShopifyProduct } from './transforms'
import Pagination from '../../components/Pagination'
import { Nav } from './Nav'
import ProductGrid from './ProductGrid'
import { MerchPageContext } from './types'

type CollectionProps = {
    pageContext: MerchPageContext
    // data: {
    //     products: AllShopifyProduct
    // }
}

const productsPerPage = 6

export default function Collection(props: CollectionProps): React.ReactElement {
    console.log('🚀 ~ props:', props)
    const { pageContext } = props
    const products = pageContext.productsForCurrentPage
    // const location = useLocation()
    // const pathArr = location.pathname.split('/').filter((item) => item)
    // const [collectionProductHandle, setCollectionProductHandle] = useState()

    // Checks if pathnames start with /merch, does not have immediate subpath of /products and
    // has both a collection-handle and product-handle immediately after /merch
    // if (pathArr[0] === 'merch' && pathArr[1] !== 'products' && pathArr.length === 3) {
    //     console.log('true')
    // }

    return (
        <Layout className="[&_main]:pb-[80px]">
            <Nav currentCollectionHandle={pageContext.handle} items={pageContext.merchNav} />
            <div className="w-full px-4 mx-auto max-w-7xl">
                <ProductGrid products={products} />
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-light dark:border-dark">
                <Pagination currentPage={pageContext.currentPage} numPages={pageContext.numPages} base="/merch" />
            </div>
        </Layout>
    )
}
