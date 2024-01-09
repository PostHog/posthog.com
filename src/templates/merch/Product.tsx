import { Drawer } from 'components/Drawer'
import Layout from 'components/Layout'
import { graphql } from 'gatsby'
import React, { useState } from 'react'
import { Cart } from './Cart'

// type ProductProps = {}

export default function Product(props): React.ReactElement {
    console.log('🚀 ~ props:', props)
    const { pageContext } = props
    const [cartIsOpen, setCartIsOpen] = useState<boolean>(false)

    return (
        <>
            <Layout className="[&_main]:pb-[80px]">
                <div className="w-full px-4 mx-auto max-w-7xl">
                    <div className="md:grid md:grid-cols-2"></div>
                </div>
            </Layout>

            <Drawer isOpen={cartIsOpen} onClose={() => setCartIsOpen(false)}>
                <Cart className="h-full overflow-y-scroll bg-accent dark:bg-accent-dark" />
            </Drawer>
        </>
    )
}

export const query = graphql`
    query ($handle: String) {
        shopifyProduct(handle: { eq: $handle }) {
            id
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
`
