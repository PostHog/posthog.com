import type { IGatsbyImageData } from 'gatsby-plugin-image'

export type MerchPageContext = {
    currentPage: number
    limit: number
    numCollectionPages: number
    skip: number
}

export type ImageLocalFile = {
    childImageSharp: {
        gatsbyImageData: IGatsbyImageData
    }
}

export type AllShopifyProduct = {
    edges: {
        node: ShopifyProduct
    }[]
}

export type ShopifyMediaImage = {
    preview: {
        image: {
            localFile: ImageLocalFile
        }
    }
}

export type ShopifyProduct = {
    shopifyId: string
    title: string
    handle: string
    description: string

    priceRangeV2: {
        minVariantPrice: {
            amount: number
        }
        maxVariantPrice: {
            amount: number
        }
    }

    featuredMedia: ShopifyMediaImage

    options: ProductVariantOption[]

    status: string

    variants: ShopifyProductVariant[]
}

export type ShopifyProductVariant = {
    shopifyId: string
    title: string
    price: number
    availableForSale: boolean
    sku: string
    selectedOptions: {
        name: string
        value: string
    }[]
    product: {
        title: string
        featuredMedia: ShopifyMediaImage
    }
    media: ShopifyMediaImage[]
}

interface Image {
    altText: string | null
    height: number
    id: string
    originalSrc: string
    transformedSrc: string
    width: number
}

interface PriceV2 {
    amount: string
    currencyCode: string
}

/**
 * variant options
 */
export type ProductVariantSelection = {
    name: string
    value: string
}

export type ProductVariantOption = {
    shopifyId: string
    name: string
    values: string[]
}

interface SelectedOption {
    name: string
    value: string
}

/**
 * cart
 */

export type CartItem = ShopifyProductVariant & {
    count: number
}

export type CreateCartVariables = {
    input: {
        discountCodes?: string[]
        lines: CartLineInput[]
    }
}

export type CartLineInput = {
    merchandiseId: string
    quantity: number
    attributes?: Record<string, string>
}

export type AdjustedLineItem = {
    item: ShopifyProductVariant
    newCount: number | null
    remove: boolean
}

/**
 * api response
 */

export interface Product {
    id: string
    handle: string
    productType: string
    title: string
    vendor: string
}

interface CartProductVariant {
    availableForSale: boolean
    compareAtPriceV2: null
    currentlyNotInStock: boolean
    id: string
    image: Image
    priceV2: PriceV2
    product: Product
    quantityAvailable: number
    selectedOptions: SelectedOption[]
    sku: string
    title: string
    weight: number
    weightUnit: string
}

export type CreateCartResponseError = {
    userErrors: {
        code:
            | 'INVALID'
            | 'INVALID_DELIVERY_GROUP'
            | 'INVALID_DELIVERY_OPTION'
            | 'INVALID_MERCHANDISE_LINE'
            | 'INVALID_METAFIELDS'
            | 'LESS_THAN'
            | 'MISSING_DISCOUNT_CODE'
            | 'MISSING_NOTE'
            | 'VALIDATION_CUSTOM'
        field: string[]
        message: string
    }[]
}

export type CreateCartResponse = {
    cartCreate: {
        cart: {
            checkoutUrl: string
            lines: {
                edges: {
                    node: { merchandise: CartProductVariant }
                    quantity: number
                }[]
            }
        }
        userErrors?: CreateCartResponseError
    }
}
