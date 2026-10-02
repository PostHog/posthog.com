import { useEffect } from 'react'
import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'
import type { CartItem, ShopifyProductVariant } from './types'

type CartItems = CartItem[] | []

interface CartStore {
    hasHydrated: boolean
    cartId: string | null
    setCartId: (id: string) => void
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    discountCode: string | null
    setDiscountCode: (discountCode: string | null) => void
    cartItems: CartItems
    setCartItems: (cartItems: CartItem[] | []) => void
    count: number | null
    update: (variant: ShopifyProductVariant, quantity: number) => void
    remove: (variantId: string) => void
    removeAll: () => void
    checkoutUrl: string | null
    setCheckoutUrl: (checkoutUrl: string) => void
    subtotal: number | null
}

export const useCartStore = create<CartStore>()(
    persist(
        subscribeWithSelector((set, get) => ({
            hasHydrated: false,
            cartId: null,
            setCartId: (id: string) => set({ cartId: id }),
            isOpen: false,
            setIsOpen: (isOpen: boolean) => set({ isOpen }),
            discountCode: null,
            setDiscountCode: (discountCode: string | null) => set({ discountCode }),
            cartItems: [],
            setCartItems: (cartItems: CartItem[]) => set({ cartItems }),
            count: null,
            update: (variant: ShopifyProductVariant, quantity: number) => {
                const { cartItems } = get()
                const updatedCart = updateCart(variant, quantity, cartItems)
                set({ cartItems: updatedCart })
            },
            remove: (variantId: string) => {
                const { cartItems } = get()
                const updatedCart = removeCart(variantId, cartItems)
                set({ cartItems: updatedCart })
            },
            removeAll: () =>
                set({
                    cartItems: [],
                    cartId: null,
                    count: null,
                    discountCode: null,
                    subtotal: null,
                }),
            // TODO: this will hold the checkout url produced at time of checkout. The next time
            // the user visits the site, this url should be in local storage and we need to ping
            // Shopify again because if their checkout (at this specific checkout url) was completed
            // successfully, querying this checkout will produce an empty object. If that's the case,
            // we want to make sure their purchased products are cleared from local storage.
            checkoutUrl: null,
            setCheckoutUrl: (checkoutUrl: string) => set({ checkoutUrl }),
            subtotal: null,
        })),
        {
            name: 'merch-cart',
            // Local storage is read on the first client effect, not during render. See useCartStoreHydration.
            skipHydration: true,
            // the cart contents outlive a reload, but the panel and the hydration flag do not
            partialize: (state) => ({
                cartId: state.cartId,
                cartItems: state.cartItems,
                count: state.count,
                subtotal: state.subtotal,
                discountCode: state.discountCode,
                checkoutUrl: state.checkoutUrl,
            }),
            onRehydrateStorage: () => () => useCartStore.setState({ hasHydrated: true }),
        }
    )
)

/**
 * Read the cart from local storage after React hydrates the page.
 *
 * The server cannot read local storage, so it renders an empty cart. If the client
 * read the cart during its first render instead, the two trees would not match,
 * React would discard the server tree and render the whole page again, and every
 * piece of component state would go back to its default value.
 *
 * Call this hook in each component that shows persisted cart state.
 */
export function useCartStoreHydration(): boolean {
    const hasHydrated = useCartStore((state) => state.hasHydrated)

    useEffect(() => {
        if (!useCartStore.persist.hasHydrated()) {
            useCartStore.persist.rehydrate()
        }
    }, [])

    return hasHydrated
}

function updateCart(variant: ShopifyProductVariant, quantity: number, cartItems: CartItem[]): CartItem[] {
    const cartItem = { ...variant, count: quantity || 1 }

    const productOnCart = cartItems.map((item) => item.shopifyId).includes(cartItem.shopifyId)

    if (!productOnCart) {
        return [...cartItems, cartItem]
    } else {
        return cartItems.map((item) => {
            if (item.shopifyId === cartItem.shopifyId) return { ...item, count: quantity } as CartItem
            return item
        })
    }
}

function removeCart(variantId: string, cartItems: CartItem[]): CartItem[] {
    const newCartItems = cartItems.filter((item) => item.shopifyId !== variantId)

    return newCartItems.length > 0 ? newCartItems : []
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unsubCartItemsChange = useCartStore.subscribe(
    (state) => state.cartItems,
    (cartItems) => {
        const subtotal = cartItems?.reduce((prev, curr) => {
            return prev + (curr.kit ? 0 : curr.price) * curr.count
        }, 0)
        const cartCount = cartItems?.length
            ? cartItems.map((item) => item.count).reduce((prev, curr) => prev + curr)
            : 0
        useCartStore.setState({ subtotal, count: cartCount, cartId: null })
    }
)
