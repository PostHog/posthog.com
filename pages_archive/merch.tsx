import { graphql } from 'gatsby'
import React, { useEffect, useMemo } from 'react'
import Collection from '../templates/merch/Collection'
import { useLocation } from '@reach/router'
import { useCartStore } from '../templates/merch/store'

export default function Merch({ data }) {
    const setDiscountCode = useCartStore((state) => state.setDiscountCode)
    const { search } = useLocation()
    const main = data.main
    const kits = data.kits

    if (!main || !kits) {
        return null
    }
    const { products, handle } = main

    const kit = useMemo(() => {
        const handle = new URLSearchParams(search).get('product')
        const kit = handle ? kits.products.find((p) => p.handle === handle) : null
        if (kit) {
            kit.kit = true
            return [kit]
        }
        return []
    }, [])

    useEffect(() => {
        const discountCode = new URLSearchParams(search).get('coupon')
        if (discountCode) {
            setDiscountCode(discountCode)
        }
    }, [])

    return <Collection pageContext={{ handle, productsForCurrentPage: [...products, ...kit] }} />
}

export const CollectionFragment = graphql`
    fragment CollectionFragment on ShopifyCollection {
        handle
        products {
            description
            descriptionHtml
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
`

export const query = graphql`
    {
        main: shopifyCollection(handle: { eq: "frontpage" }) {
            ...CollectionFragment
        }
        kits: shopifyCollection(handle: { eq: "kits" }) {
            ...CollectionFragment
        }
    }
`
