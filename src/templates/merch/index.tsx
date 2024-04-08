import Layout from 'components/Layout'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
// import { getShopifyProduct } from './transforms'
import { Drawer } from 'components/Drawer'
import Pagination from 'components/Pagination'
import { Cart } from './Cart'
import { useCartStore } from './store'
import { AllShopifyProduct, MerchPageContext, ShopifyProduct } from './types'

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
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {data.allShopifyProduct.edges.map(({ node }: { node: ShopifyProduct }) => {
                        // const shopifyProduct = getShopifyProduct(node)

                        return (
                            <div className="group relative" key={node.shopifyId}>
                                <GatsbyImage
                                    className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
                                    image={node.featuredMedia.preview.image.localFile.childImageSharp.gatsbyImageData}
                                    alt={node.title}
                                />
                                <div className="mt-4 flex justify-between">
                                    <h3 className="text-base text-primary!">
                                        <Link to={`/products/${node.handle}`}>{node.title}</Link>
                                    </h3>
                                    <p className="text-sm font-medium text-gray-900">
                                        ${node.priceRangeV2.minVariantPrice.amount}
                                    </p>
                                </div>
                                <button
                                    className="rounded bg-black px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    onClick={() => handleAddToCart(node)}
                                >
                                    Add to cart
                                </button>
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
                    imageProducts {
                        handle
                        featuredImage {
                            localFile {
                                childImageSharp {
                                    gatsbyImageData(width: 400)
                                }
                            }
                        }
                    }
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
