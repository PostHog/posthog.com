import React from 'react'
import { cn } from '../../utils'
import { Checkout } from './Checkout'
import { LineItem } from './LineItem'
import { useCartStore } from './store'

type CartProps = {
    className?: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Cart(props: CartProps): React.ReactElement {
    const { className } = props
    const cartItems = useCartStore((state) => state.cartItems)
    const isEmpty = cartItems.length === 0

    const classes = cn('text-black h-full p-8 pt-20', className)

    return (
        <div className={classes}>
            <div>Cart</div>

            {isEmpty && <div>Cart is empty</div>}

            {!isEmpty &&
                cartItems.map((item) => {
                    return <LineItem key={item.shopifyId} item={item} />
                })}

            <Checkout className="my-4" />
        </div>
    )
}
