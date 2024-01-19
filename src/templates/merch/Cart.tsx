import React from 'react'
import { cn } from '../../utils'
import { Checkout } from './Checkout'
import { LineItem } from './LineItem'
import { Price } from './Price'
import { useCartStore } from './store'
import { StaticImage } from 'gatsby-plugin-image'

type CartProps = {
    className?: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Cart(props: CartProps): React.ReactElement {
    const { className } = props
    const cartItems = useCartStore((state) => state.cartItems)
    const subtotal = useCartStore((state) => state.subtotal)

    const isEmpty = cartItems.length === 0

    const classes = cn('text-primary dark:text-primary-dark h-full p-8 pt-20', className)

    return (
        <div className={classes}>
            <h3 className="text-xl font-bold mb-4">Cart</h3>
            {isEmpty && (
                <div className="border border-light bg-tan rounded p-8 text-center flex flex-col gap-8">
                    <p className="font-medium mb-0">This cart would look better with something in it.</p>
                    <div className="w-64 mx-auto">
                        <StaticImage src="../../images/shopahogic.png" alt="Empty cart" />
                    </div>
                </div>
            )}

            <>
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

                {!isEmpty && (
                    <>
                        <div className="flex justify-end gap-3 mt-4 mb-1 pt-4 border-t border-light dark:border-dark">
                            <span className="">Subtotal</span>{' '}
                            <strong>
                                <Price price={subtotal} />
                            </strong>
                        </div>
                        <div className="text-right italic text-sm">Shipping and taxes calculated at checkout</div>
                    </>
                )}

                <Checkout className="my-2" isEmpty={isEmpty} />
            </>
        </div>
    )
}
