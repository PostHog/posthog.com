import type { IGatsbyImageData } from 'gatsby-plugin-image'
import { GraphQLError } from 'graphql'

export type CollectionPageContext = {
    currentPage: number
    limit: number
    numPages: number
    skip: number
    merchNav: MerchNavItems
    handle: string
    productsForCurrentPage: ShopifyProduct[]
}

export type ImageLocalFile = {
    childImageSharp: {
        gatsbyImageData: IGatsbyImageData
    }
}

/**
 * Shopify
 */
export type MetafieldValue = string | number | Record<'string', unknown>
export type MetafieldKey = string
export type Metafield = {
    value: MetafieldValue
    key: MetafieldKey
}
type Metafields = Metafield[]
export type ShopifyCollection = {
    handle: string
    id: string
    products: ShopifyProduct[]
    title: string
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

export type ShopifyMediaItem = ShopifyMediaImage & {
    mediaContentType: 'IMAGE'
}

export type ShopifyMedia = ShopifyMediaItem[]

export type ShopifyProduct = {
    description: string
    featuredMedia: ShopifyMediaImage
    handle: string
    id: string
    media: ShopifyMedia
    metafields: Metafields
    priceRangeV2: {
        minVariantPrice: {
            amount: number
        }
        maxVariantPrice: {
            amount: number
        }
    }
    options: ProductVariantOption[]
    shopifyId: string
    status: string
    tags: string[]
    title: string
    totalInventory: number
    variants: ShopifyProductVariant[]
}

export type ShopifyProductVariant = {
    availableForSale: boolean
    media: ShopifyMediaImage[]
    price: number
    product: Pick<ShopifyProduct, 'title' | 'featuredMedia' | 'tags'>
    selectedOptions: {
        name: string
        value: string
    }[]
    shopifyId: string
    sku: string
    title: string
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

export type SelectedOption = {
    selectedValue: string
    selected: ProductVariantSelection | null
    option: ProductVariantOption
}

export type SelectedOptions = SelectedOption[]

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
 * Cart API
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

export type Cart = {
    id: string
    checkoutUrl: string
    lines: {
        edges: {
            node: { merchandise: CartProductVariant }
            quantity: number
        }[]
    }
}

export type CartResponse = {
    cart: Cart | null
    userErrors?: CreateCartResponseError
}

export type CartCreateReponse = {
    cartCreate: Cart
    userErrors?: CreateCartResponseError
}

/**
 * Gatsby source nodes
 */

export type MetaobjectsCollection = Pick<ShopifyCollection, 'handle' | 'title'>

export interface MetaobjectsReferencesEdge {
    node: MetaobjectsCollection
}

interface MetaobjectsFields {
    references: {
        edges: MetaobjectsReferencesEdge[]
    }
}

interface MetaobjectsNode {
    fields: MetaobjectsFields
}

interface MetaobjectsEdge {
    node: MetaobjectsNode
}

interface Metaobjects {
    edges: MetaobjectsEdge[]
}

export interface MetaobjectsResponseData {
    data: { metaobjects: Metaobjects }
}

/**
 * Gatsby page creation
 */
export type MerchNavItems = MetaobjectsCollection & {
    url: string
}

export interface GatsbyContentResponse {
    data: {
        allMerchNavigation: {
            nodes: MetaobjectsCollection[]
        }
        allShopifyCollection: {
            nodes: ShopifyCollection[]
        }
        allShopifyProduct: {
            nodes: Pick<ShopifyProduct, 'handle'>[]
        }
    }
    error: GraphQLError[]
}
