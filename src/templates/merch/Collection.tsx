import { useLocation } from '@reach/router'
import Layout from 'components/Layout'
import React from 'react'
import Pagination from '../../components/Pagination'
import { Nav } from './Nav'
import ProductGrid from './ProductGrid'
import { getProduct } from './transforms'
import { CollectionPageContext } from './types'

type CollectionProps = {
    pageContext: CollectionPageContext
}

export default function Collection(props: CollectionProps): React.ReactElement {
    const { pageContext } = props
    const location = useLocation()

    const pathnameSplit = location.pathname.split('/').filter((item) => item != '')

    let paginationBase
    if (pathnameSplit.length > 1 && pageContext.handle !== 'all-products') {
        paginationBase = '/' + pathnameSplit[0] + '/' + pathnameSplit[1]
    } else {
        paginationBase = `/${pathnameSplit[0]}`
    }

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
                    <Pagination
                        currentPage={pageContext.currentPage}
                        numPages={pageContext.numPages}
                        base={paginationBase}
                    />
                </div>
            </Layout>
        </>
    )
}
