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
    }[]
    product: {
        title: string
        featuredMedia: ShopifyMediaImage
    }
    media: ShopifyMediaImage[]
}

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
        }
        userErrors?: CreateCartResponseError
    }
}
