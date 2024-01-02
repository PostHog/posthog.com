import type { CartItem, CartLineInput, CreateCartVariables } from './types'

export function getProductsArray(arr) {
    if (!Array.isArray(arr)) return null

    return arr.map((item) => {
        return item.node || item
    })
}

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

import type { ProductVariantSelection, Variant } from 'types/product'

export function getVariant(variants: Variant[], options: ProductVariantSelection[]) {
    return variants.find((variant) => {
        let isVariant = true

        for (const opt of options) {
            isVariant = isVariant && variant.options.findIndex((o) => o.name === opt.name && o.value === opt.value) > -1
        }

        return isVariant
    })
}

export function isNotNullish<T>(x: T | null | undefined): x is T {
    return x !== null && x !== undefined
}

export function getProductMetafield(product, key: string) {
    return product.metafields?.find((m) => m.key === key)?.value
}
