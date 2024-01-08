import React from 'react'
import { cn } from '../../utils'
import { Checkout } from './Checkout'
import { LineItem } from './LineItem'
import { Price } from './Price'
import { useCartStore } from './store'

type CartProps = {
    className?: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Cart(props: CartProps): React.ReactElement {
    const { className } = props
    const cartItems = useCartStore((state) => state.cartItems)
    const subtotal = useCartStore((state) => state.subtotal)

    const isEmpty = cartItems.length === 0

    const classes = cn('text-black h-full p-8 pt-20', className)

    return (
        <div className={classes}>
            <div className="text-xl fond-bold mb-4">Cart</div>
            {isEmpty && <div>Cart is empty</div>}

            {!isEmpty && (
                <div>
                    {cartItems.map((item) => {
                        return (
                            <LineItem
                                className="py-4 border-light dark:border-dark border-b-0 border-r-0 border-l-0 border-t-1 first:border-t-0"
                                key={item.shopifyId}
                                item={item}
                            />
                        )
                    })}
                </div>
            )}

            <div className="flex justify-end gap-16 my-4">
                <span className="">Subtotal</span> <Price price={subtotal} />
            </div>

            <div className="text-right italic text-sm">Shipping and taxes calculated at checkout</div>

            <Checkout className="my-4" />
        </div>
    )
}
