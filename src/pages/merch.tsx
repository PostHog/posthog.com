import { graphql } from 'gatsby'
import React from 'react'
import Collection from '../templates/merch/Collection'

export default function Merch({ data }) {
    const collection = data.shopifyCollection
    const { products, handle } = collection

    return <Collection pageContext={{ handle, productsForCurrentPage: products }} />
}

export const query = graphql`
    {
        shopifyCollection(handle: { eq: "all-products" }) {
            handle
            products {
                description
                featuredMedia {
                    preview {
                        image {
                            width
                            height
                            originalSrc
                        }
                    }
                }
                handle
                id
                media {
                    mediaContentType
                    preview {
                        image {
                            width
                            height
                            originalSrc
                        }
                    }
                }
                imageProducts {
                    handle
                    featuredImage {
                        width
                        height
                        originalSrc
                    }
                }
                metafields {
                    value
                    key
                }
                options {
                    shopifyId
                    name
                    values
                }
                priceRangeV2 {
                    maxVariantPrice {
                        amount
                    }
                    minVariantPrice {
                        amount
                    }
                }
                shopifyId
                status
                title
                tags
                totalInventory
                variants {
                    availableForSale
                    media {
                        preview {
                            image {
                                width
                                height
                                originalSrc
                            }
                        }
                    }
                    price
                    product {
                        title
                        featuredMedia {
                            preview {
                                image {
                                    width
                                    height
                                    originalSrc
                                }
                            }
                        }
                    }
                    selectedOptions {
                        name
                        value
                    }
                    shopifyId
                    sku
                    title
                }
            }
        }
    }
`
