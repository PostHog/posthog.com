import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'
import type { CartItem, ShopifyProductVariant } from './types'

type CartItems = CartItem[] | []

interface CartStore {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    discountCode: string | null
    setDiscountCode: (discountCode: string) => void
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
            isOpen: false,
            setIsOpen: (isOpen: boolean) => set({ isOpen }),
            discountCode: null,
            setDiscountCode: (discountCode: string) => set({ discountCode }),
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
            removeAll: () => set({ cartItems: [] }),
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
        }
    )
)

function updateCart(variant: ShopifyProductVariant, quantity: number, cartItems: CartItem[]): CartItem[] {
    const cartItem = { ...variant, count: quantity || 1 }

    const productOnCart = cartItems.map((item) => item.shopifyId).includes(cartItem.shopifyId)

    if (!productOnCart) cartItems.push(cartItem)
    else {
        return cartItems.map((item) => {
            if (item.shopifyId === cartItem.shopifyId) return { ...item, count: quantity } as CartItem
            return item
        })
    }

    return cartItems
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
            return prev + curr.price * curr.count
        }, 0)
        const cartCount = cartItems?.length
            ? cartItems.map((item) => item.count).reduce((prev, curr) => prev + curr)
            : 0
        useCartStore.setState({ subtotal, count: cartCount })
    }
)
