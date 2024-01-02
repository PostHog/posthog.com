import Layout from 'components/Layout'
import { graphql } from 'gatsby'
import React from 'react'
// import { getShopifyProduct } from './transforms'
import Pagination from '../../components/Pagination'
import { Nav } from './Nav'
import ProductGrid from './ProductGrid'
import { MerchPageContext } from './types'
import { getProductsArray } from './utils'

type CollectionProps = {
    pageContext: MerchPageContext
    // data: {
    //     products: AllShopifyProduct
    // }
}

export default function Collection(props: CollectionProps): React.ReactElement {
    console.log('🚀 ~ props:', props)
    const { data, pageContext } = props
    const start = (pageContext.currentPage - 1) * pageContext.limit
    const end = start + pageContext.limit
    const products = getProductsArray(data.shopifyCollection.products.slice(start, end))

    return (
        <Layout className="[&_main]:pb-[200px]">
            <Nav currentCollectionHandle={pageContext.handle} items={pageContext.merchNav} />
            <div className="container px-2 mx-auto">
                <ProductGrid products={products} />
            </div>

            <div className="mt-16">
                <Pagination
                    currentPage={pageContext.currentPage}
                    numPages={pageContext.numPages}
                    base={`/merch/${pageContext.handle}`}
                />
            </div>
        </Layout>
    )
}

export const query = graphql`
    query collectionQuery($handle: String!) {
        shopifyCollection(handle: { eq: $handle }) {
            products {
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
