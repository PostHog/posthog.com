import type { CartItem, ShopifyProductVariant } from '../templates/merch/types'
import { create } from 'zustand'

type CartStore = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    isCheckingOut: boolean
    setIsCheckingOut: (isCheckingOut: boolean) => void
    discountCode: string | null
    setDiscountCode: (discountCode: string) => void
    cartItems: CartItem[]
    count: () => number
    add: (variant: ShopifyProductVariant) => void
    remove: (variantId: string) => void
    removeAll: () => void
}

export const useCartStore = create<CartStore>((set, get) => ({
    isOpen: false,
    setIsOpen: (isOpen: boolean) => set({ isOpen }),

    isCheckingOut: false,
    setIsCheckingOut: (isCheckingOut: boolean) => set({ isCheckingOut }),

    discountCode: null,
    setDiscountCode: (discountCode: string) => set({ discountCode }),

    cartItems: [],

    count: () => {
        const { cartItems } = get()
        if (cartItems.length) return cartItems.map((item) => item.count).reduce((prev, curr) => prev + curr)
        return 0
    },
    add: (variant: ShopifyProductVariant) => {
        const { cartItems } = get()
        const updatedCart = updateCart(variant, cartItems)
        set({ cartItems: updatedCart })
    },
    remove: (variantId: string) => {
        const { cartItems } = get()
        const updatedCart = removeCart(variantId, cartItems)
        set({ cartItems: updatedCart })
    },
    removeAll: () => set({ cartItems: [] }),
}))

function updateCart(variant: ShopifyProductVariant, cartItems: CartItem[]): CartItem[] {
    const cartItem = { ...variant, count: 1 } as CartItem

    const productOnCart = cartItems.map((item) => item.shopifyId).includes(variant.shopifyId)

    if (!productOnCart) cartItems.push(cartItem)
    else {
        return cartItems.map((item) => {
            if (item.shopifyId === variant.shopifyId) return { ...item, count: item.count + 1 } as CartItem
            return item
        })
    }

    return cartItems
}

function removeCart(variantId: string, cartItems: CartItem[]): CartItem[] {
    return cartItems
        .map((item) => {
            if (item.shopifyId === variantId) return { ...item, count: item.count - 1 }
            return item
        })
        .filter((item) => {
            return item.count
        })
}
