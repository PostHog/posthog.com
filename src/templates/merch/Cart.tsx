import { useCartStore } from 'hooks/useCartStore'
import React from 'react'
import { cn } from '../../utils'
import { LineItem } from './LineItem'
import { Checkout } from './Checkout'

type CartProps = {
    className?: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Cart(props: CartProps) {
    const { className } = props
    const cartItems = useCartStore((state) => state.cartItems)
    const isEmpty = cartItems.length === 0

    const classes = cn('text-black h-full', className)

    return (
        <div className={classes}>
            <div>Cart</div>

            {isEmpty && <div>Cart is empty</div>}

            {!isEmpty &&
                cartItems.map((item) => {
                    return <LineItem key={item.shopifyId} item={item} />
                })}

            <Checkout />
        </div>
    )
}
