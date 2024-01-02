import Layout from 'components/Layout'
import { graphql } from 'gatsby'
import React from 'react'
// import { getShopifyProduct } from './transforms'
import Pagination from 'components/Pagination'
import { Nav } from './Nav'
import ProductGrid from './ProductGrid'
import { AllShopifyProduct, MerchPageContext } from './types'
import { getProductsArray } from './utils'

type AllProductsProps = {
    pageContext: MerchPageContext
    data: {
        allShopifyProduct: AllShopifyProduct
    }
}

export default function AllProducts(props: AllProductsProps): React.ReactElement {
    const { data, pageContext } = props

    const products = getProductsArray(data.allShopifyProduct.nodes)

    return (
        <Layout className="[&_main]:pb-[200px]">
            <Nav />
            <div className="container px-2 mx-auto">
                <ProductGrid products={products} />
            </div>

            <div className="mt-16">
                <Pagination currentPage={pageContext.currentPage} numPages={pageContext.numPages} base="/merch" />
            </div>
        </Layout>
    )
}

export const query = graphql`
    query allProductsQuery($skip: Int!, $limit: Int!) {
        allShopifyProduct(sort: { order: ASC, fields: title }, limit: $limit, skip: $skip) {
            nodes {
                title
                handle
                shopifyId
                description
                metafields {
                    value
                    key
                }
                priceRangeV2 {
                    maxVariantPrice {
                        amount
                    }
                    minVariantPrice {
                        amount
                    }
                }
                status
                featuredMedia {
                    preview {
                        image {
                            localFile {
                                childImageSharp {
                                    gatsbyImageData
                                }
                            }
                        }
                    }
                }
                options {
                    shopifyId
                    name
                    values
                }
                tags
                totalInventory
                variants {
                    shopifyId
                    title
                    sku
                    price
                    availableForSale
                    product {
                        title
                        featuredMedia {
                            preview {
                                image {
                                    localFile {
                                        childImageSharp {
                                            gatsbyImageData
                                        }
                                    }
                                }
                            }
                        }
                    }
                    media {
                        preview {
                            image {
                                localFile {
                                    childImageSharp {
                                        gatsbyImageData
                                    }
                                }
                            }
                        }
                    }
                    selectedOptions {
                        name
                        value
                    }
                }
            }
        }
    }
`
