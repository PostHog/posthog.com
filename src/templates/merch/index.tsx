import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from 'components/Layout'
// import { getShopifyProduct } from './transforms'
import Pagination from 'components/Pagination'
import { Drawer } from 'components/Drawer'
import { useCartStore } from 'hooks/useCartStore'
import { AllShopifyProduct, MerchPageContext, ShopifyProduct } from './types'
import { Cart } from './Cart'

type MerchPageProps = {
    pageContext: MerchPageContext
    data: {
        allShopifyProduct: AllShopifyProduct
    }
}

export default function MerchPage(props: MerchPageProps): React.ReactElement {
    const { data, pageContext } = props
    const addToCart = useCartStore((state) => state.add)
    const cartIsOpen = useCartStore((state) => state.isOpen)
    const setCartIsOpen = useCartStore((state) => state.setIsOpen)

    const handleAddToCart = (product: ShopifyProduct) => {
        addToCart(product.variants[0])
        setCartIsOpen(true)
    }

    return (
        <Layout className="[&_main]:pb-[200px]">
            <div className="container mx-auto">
                <h1>Products</h1>
                <h2 className="cursor-pointer" onClick={() => setCartIsOpen(true)}>
                    Open Drawer
                </h2>
                <Drawer isOpen={cartIsOpen} onClose={() => setCartIsOpen(false)}>
                    <Cart />
                </Drawer>
                <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-4">
                    {data.allShopifyProduct.edges.map(({ node }: { node: ShopifyProduct }) => {
                        // const shopifyProduct = getShopifyProduct(node)

                        return (
                            <div key={node.shopifyId}>
                                <GatsbyImage
                                    className="w-[300px]"
                                    image={node.featuredMedia.preview.image.localFile.childImageSharp.gatsbyImageData}
                                    alt={node.title}
                                />
                                <h3>
                                    <Link to={`/products/${node.handle}`}>{node.title}</Link>
                                    {' - '}${node.priceRangeV2.minVariantPrice.amount}
                                </h3>
                                <button onClick={() => handleAddToCart(node)}>Add to cart</button>
                            </div>
                        )
                    })}
                </div>
            </div>

            <Pagination currentPage={pageContext.currentPage} numPages={pageContext.numCollectionPages} base="/merch" />
        </Layout>
    )
}

export const query = graphql`
    query allProductsQuery($skip: Int!, $limit: Int!) {
        allShopifyProduct(sort: { order: ASC, fields: title }, limit: $limit, skip: $skip) {
            edges {
                node {
                    title
                    handle
                    shopifyId
                    description
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
                    }
                }
            }
        }
    }
`
