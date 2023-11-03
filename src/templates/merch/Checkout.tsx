import React, { useCallback } from 'react'
import { cn } from '../../utils'
import { useCartStore } from '../../hooks/useCartStore'
import type { CreateCartResponse } from './types'
import { createCartQuery } from '../../lib/shopify'
import { getCartVariables } from './utils'

type CheckoutProps = {
    className?: string
}

export function getCheckoutUrl(response?: CreateCartResponse | null) {
    const checkoutUrl = response?.cartCreate?.cart?.checkoutUrl

    if (!checkoutUrl) {
        return null
    }

    return checkoutUrl
}

export function Checkout(props: CheckoutProps): React.ReactElement {
    const { className } = props
    const cartItems = useCartStore((state) => state.cartItems)
    const isCheckingOut = useCartStore((state) => state.isCheckingOut)
    const setIsCheckingOut = useCartStore((state) => state.setIsCheckingOut)
    const discountCode = useCartStore((state) => state.discountCode)

    const handleCheckout = useCallback(() => {
        async function checkoutMutation() {
            setIsCheckingOut(true)
            const createCartVariables = getCartVariables(cartItems)
            const newCart = (await createCartQuery(createCartVariables)) as CreateCartResponse
            const checkoutUrl = getCheckoutUrl(newCart)
            console.log('📀📀📀 checkoutUrl', checkoutUrl)
            // if (checkoutUrl) {
            //     window.location.href = checkoutUrl
            // }
        }
        checkoutMutation()
    }, [setIsCheckingOut, discountCode])

    const classes = cn('', className)

    return (
        <button className={classes} onClick={handleCheckout}>
            Checkout
        </button>
    )
}
