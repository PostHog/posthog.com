import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'
import type { CartItem, ShopifyProductVariant } from './types'

type CartStore = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    discountCode: string | null
    setDiscountCode: (discountCode: string) => void
    cartItems: CartItem[] | []
    setCartItems: (cartItems: CartItem[] | []) => void
    count: () => number
    add: (variant: ShopifyProductVariant, count: number) => void
    remove: (variantId: string) => void
    removeAll: () => void
    checkoutUrl: string | null
    setCheckoutUrl: (checkoutUrl: string) => void
}

export const useCartStore = create<CartStore>(
    subscribeWithSelector(
        persist(
            (set, get) => ({
                isOpen: false,
                setIsOpen: (isOpen: boolean) => set({ isOpen }),

                discountCode: null,
                setDiscountCode: (discountCode: string) => set({ discountCode }),

                cartItems: [],
                setCartItems: (cartItems: CartItem[]) => set({ cartItems }),

                count: () => {
                    const { cartItems } = get()
                    if (cartItems.length) return cartItems.map((item) => item.count).reduce((prev, curr) => prev + curr)
                    return 0
                },
                add: (variant: ShopifyProductVariant, count: number) => {
                    const { cartItems } = get()
                    const updatedCart = updateCart(variant, count, cartItems)
                    set({ cartItems: updatedCart })
                },
                update: (variant: ShopifyProductVariant, count: number) => {
                    const { cartItems } = get()
                    const updatedCart = updateCart(variant, count, cartItems)
                    set({ cartItems: updatedCart })
                },
                remove: (variantId: string) => {
                    const { cartItems } = get()
                    const updatedCart = removeCart(variantId, cartItems)
                    set({ cartItems: updatedCart })
                },
                removeAll: () => set({ cartItems: [] }),
                // TODO: this will hold the checkout url produced at time of checkout. The next time
                // the user visits the site, this url should be in local storage and we need to ping
                // Shopify again because if their checkout (at this specific checkout url) was completed
                // successfully, querying this checkout will produce an empty object. If that's the case,
                // we want to make sure their purchased products are cleared from local storage.
                checkoutUrl: null,
                setCheckoutUrl: (checkoutUrl: string) => set({ checkoutUrl }),
                subtotal: null,
            }),
            {
                name: 'merch-cart',
            }
        )
    )
)

function updateCart(variant: ShopifyProductVariant, count: number, cartItems: CartItem[]): CartItem[] {
    const cartItem = { ...variant, count: count || 1 } as CartItem

    const productOnCart = cartItems.map((item) => item.shopifyId).includes(cartItem.shopifyId)

    if (!productOnCart) cartItems.push(cartItem)
    else {
        return cartItems.map((item) => {
            if (item.shopifyId === cartItem.shopifyId) return { ...item, count } as CartItem
            return item
        })
    }

    return cartItems
}

function removeCart(variantId: string, cartItems: CartItem[]): CartItem[] {
    return cartItems
        .map((item) => {
            if (item.shopifyId === variantId) return null
            return item
        })
        .filter(Boolean)
}

const unsubCartItemsChange = useCartStore.subscribe(
    (state) => state.cartItems, // Listen to the change
    (cartItems) => {
        const subtotal = cartItems.reduce((prev, curr) => {
            return prev + curr.price * curr.count
        }, 0)
        useCartStore.setState({ subtotal })
    }
)
