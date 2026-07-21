import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import { cn } from '../../utils'
import { Checkout } from './Checkout'
import { LineItem } from './LineItem'
import { Price } from './Price'
import { useCartStore } from './store'
import * as Icons from '@posthog/icons'

type CartProps = {
    className?: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Cart(props: CartProps): React.ReactElement {
    const { className } = props
    const cartItems = useCartStore((state) => state.cartItems)
    const subtotal = useCartStore((state) => state.subtotal)
    const discountCode = useCartStore((state) => state.discountCode)
    const setDiscountCode = useCartStore((state) => state.setDiscountCode)

    const isEmpty = cartItems.length === 0

    const classes = cn('text-primary h-full p-4', className)

    return (
        <div className={classes}>
            {isEmpty && (
                <div className="border border-primary bg-tan dark:bg-dark rounded p-4 text-center flex flex-col gap-2 mb-4">
                    <div className="w-48 mx-auto">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/shopahogic.png"
                            alt="Empty cart"
                        />
                    </div>
                    <p className="font-medium mb-0 text-balance">This cart would look better with something in it...</p>
                </div>
            )}

            {/* {!isEmpty && <ShippingBanner />} */}

            <>
                <div>
                    {cartItems.map((item) => {
                        return (
                            <LineItem
                                className="py-4 border-primary border-b-0 border-r-0 border-l-0 border-t-1 first:border-t-0"
                                key={item.shopifyId}
                                item={item}
                            />
                        )
                    })}
                </div>
                {discountCode && (
                    <div className="mb-2 py-2 px-3 bg-green/10 dark:bg-green/20 border border-green/30 rounded text-sm">
                        <div className="flex items-center justify-between gap-2">
                            <div>
                                <p className="text-xs text-muted m-0">Discount code</p>
                                <span className="text-green font-bold">{discountCode}</span>
                            </div>
                            <button
                                onClick={() => setDiscountCode(null)}
                                className="p-0.5 hover:opacity-80 opacity-50 transition-opacity"
                                aria-label="Remove discount code"
                            >
                                <Icons.IconX className="size-4" />
                            </button>
                        </div>
                    </div>
                )}
                {!isEmpty && (
                    <div className="mt-4 mb-1 pt-4 border-t border-primary">
                        <div className="flex justify-end gap-3">
                            <span>Subtotal</span>{' '}
                            <strong>
                                <Price price={subtotal} />
                            </strong>
                        </div>
                        <div className="text-right italic text-sm mt-1">
                            Shipping, taxes, and discounts calculated at checkout
                        </div>
                    </div>
                )}

                {!isEmpty && <Checkout className="my-2" />}
            </>
        </div>
    )
}
