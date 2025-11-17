import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import { cn } from '../../utils'
import { Checkout } from './Checkout'
import { LineItem } from './LineItem'
import { Price } from './Price'
import { useCartStore } from './store'
import { StaticImage } from 'gatsby-plugin-image'
import ShippingBanner from './ShippingBanner'

type CartProps = {
    className?: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Cart(props: CartProps): React.ReactElement {
    const { className } = props
    const cartItems = useCartStore((state) => state.cartItems)
    const subtotal = useCartStore((state) => state.subtotal)

    const isEmpty = cartItems.length === 0

    const classes = cn('text-primary h-full p-4', className)

    return (
        <div className={classes}>
            {isEmpty && (
                <div className="border border-primary bg-tan dark:bg-dark rounded p-4 text-center flex flex-col gap-2">
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

                {!isEmpty && (
                    <>
                        <div className="flex justify-end gap-3 mt-4 mb-1 pt-4 border-t border-primary">
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
