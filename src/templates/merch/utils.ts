import type { CartItem, CartLineInput, CreateCartVariables, MetafieldValue, ShopifyProduct } from './types'

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
