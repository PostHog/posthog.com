import type { CartItem, CartLineInput, CreateCartVariables } from './types'

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
