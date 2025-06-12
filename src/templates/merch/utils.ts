import { shopifyHeaders } from '../../lib/shopify'
import type {
    CartItem,
    CartLineInput,
    CreateCartVariables,
    MetafieldValue,
    ShopifyMediaImage,
    ShopifyMediaItem,
    ShopifyProduct,
} from './types'

export function getCartVariables(cartItems: CartItem[], discountCode?: string): CreateCartVariables {
    const createCartVariables: CreateCartVariables = {
        input: {
            lines: cartItems.map(
                (item): CartLineInput => ({
                    merchandiseId: item.shopifyId,
                    quantity: item.count,
                })
            ),
        },
    }

    if (discountCode) {
        createCartVariables.input.discountCodes = [discountCode]
    }

    return createCartVariables
}

export function isNotNullish<T>(x: T | null | undefined): x is T {
    return x !== null && x !== undefined
}

export function getProductMetafield(product: ShopifyProduct, key: string): MetafieldValue | undefined {
    const metafield = product.metafields?.find((m) => m.key === key)
    return metafield ? metafield.value : undefined
}

export function getProductImages(media: ShopifyMediaItem[]): ShopifyMediaImage[] | null {
    if (!media || !Array.isArray(media)) return null
    return media
        .filter((m) => m.mediaContentType === 'IMAGE')
        .map((m) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { mediaContentType, ...rest } = m
            return rest
        })
}

export const getAvailableQuantity = async (item: CartItem) => {
    try {
        if (item.kit) return 100
        const { data } = await fetch(`https://${process.env.GATSBY_MYSHOPIFY_URL}/api/2023-10/graphql.json`, {
            method: 'POST',
            headers: shopifyHeaders,
            body: JSON.stringify({
                query: `
                query GetVariantById($id: ID!) {
                    node(id: $id) {
                    ... on ProductVariant {
                        id
                        title
                        quantityAvailable
                        availableForSale
                    }
                    }
                }`,
                variables: { id: item.shopifyId },
            }),
        }).then((res) => res.json())

        return data.node.quantityAvailable
    } catch (error) {
        console.error('Error fetching inventory from Shopify:', error)
        return 0
    }
}

export const itemIsAvailableForSale = async (item: CartItem) => {
    const product = await fetch(
        `${process.env.GATSBY_SQUEAK_API_HOST}/api/brilliant/inventory/${
            item.shopifyId.split('gid://shopify/ProductVariant/')[1]
        }`
    ).then((res) => res.json())

    return product?.quantity > 0
}
