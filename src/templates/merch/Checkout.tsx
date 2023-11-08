import React, { useCallback } from 'react'
import { createCartQuery } from '../../lib/shopify'
import { cn } from '../../utils'
import { AdjustedLineItems } from './AdjustedLineItems'
import { LoaderIcon } from './LoaderIcon'
import { useCartStore } from './store'
import type { AdjustedLineItem, CreateCartResponse } from './types'
import { getCartVariables } from './utils'

type CheckoutProps = {
    className?: string
}
function notNull<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined
}

export function getCheckoutUrl(response?: CreateCartResponse | null): string | null {
    const checkoutUrl = response?.cartCreate?.cart?.checkoutUrl

    if (!checkoutUrl) {
        return null
    }

    return checkoutUrl
}

export function Checkout(props: CheckoutProps): React.ReactElement {
    const { className } = props
    const [adjustedItems, setAdjustedItems] = React.useState<AdjustedLineItem[]>([])
    const { cartItems, setCartItems } = useCartStore((state) => ({
        cartItems: state.cartItems,
        setCartItems: state.setCartItems,
    }))
    const [isCheckingOut, setIsCheckingOut] = React.useState(false)
    const [showAdjustments, setShowAdjustments] = React.useState(false)
    const discountCode = useCartStore((state) => state.discountCode)

    const handleCheckout = useCallback(() => {
        setIsCheckingOut(true)
        setShowAdjustments(false)
        async function checkoutMutation() {
            setIsCheckingOut(true)
            const createCartVariables = getCartVariables(cartItems)
            const newCart = (await createCartQuery(createCartVariables)) as CreateCartResponse
            console.log('--- newCart', newCart)

            const itemsExceedingQuantityAvailable: AdjustedLineItem[] = []

            console.log('🚀 ~ file: Checkout.tsx:71 ~ cartItems.forEach ~ cartItems:', cartItems)
            cartItems.forEach((item) => {
                // first check if it's available for sale. If not, then add to the list
                // with flag for removal from cart
                if (!item.availableForSale) {
                    itemsExceedingQuantityAvailable.push({
                        item,
                        remove: true,
                        newCount: null,
                    })
                    return
                }

                // if it is available for sale, then check if the quantity available is less than
                // the quantity in the cart. If so, then add to the list with the new quantity
                const matchingItem = newCart.cartCreate?.cart?.lines?.edges?.find((edge) => {
                    return edge?.node?.merchandise?.id === item.shopifyId
                })
                if (!!matchingItem && matchingItem.node.merchandise.quantityAvailable < item.count) {
                    itemsExceedingQuantityAvailable.push({
                        item,
                        remove: false,
                        newCount: matchingItem.node.merchandise.quantityAvailable,
                    })
                }
            })

            console.log(
                '🚀 ~ file: Checkout.tsx:73 ~ checkoutMutation ~ itemsExceedingQuantityAvailable:',
                itemsExceedingQuantityAvailable
            )
            if (itemsExceedingQuantityAvailable.length > 0) {
                setAdjustedItems(itemsExceedingQuantityAvailable)
            }
            setShowAdjustments(itemsExceedingQuantityAvailable.length > 0)
            if (itemsExceedingQuantityAvailable.length > 0) {
                const newCartItems = cartItems
                    .map((item) => {
                        const matchingItem = itemsExceedingQuantityAvailable.find((exceedingItem) => {
                            return exceedingItem.item.shopifyId === item.shopifyId
                        })
                        if (!matchingItem) {
                            return item
                        }
                        if (matchingItem.remove) {
                            return null
                        }
                        return {
                            ...item,
                            count: matchingItem.newCount as number,
                        }
                    })
                    .filter(notNull)
                setCartItems(newCartItems ?? [])
                return
            }

            console.log('🚀 ~ file: Checkout.tsx:104 ~ checkoutMutation ~ newCart:', newCart)
            const checkoutUrl = getCheckoutUrl(newCart)
            console.log('--- checkoutUrl', checkoutUrl)
            // if (checkoutUrl) {
            //     window.location.href = checkoutUrl
            // }
        }
        checkoutMutation()
    }, [setIsCheckingOut, discountCode, cartItems])

    const classes = cn(
        'rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black',
        className
    )

    return (
        <>
            {adjustedItems.length > 0 && <AdjustedLineItems className="my-4" lineItems={adjustedItems} />}
            <button className={classes} onClick={handleCheckout}>
                {showAdjustments ? (
                    'Proceed to checkout'
                ) : isCheckingOut ? (
                    <div className="flex gap-2 items-center">
                        <LoaderIcon className="w-4 h-4" />
                        Checking out
                    </div>
                ) : (
                    'Checkout'
                )}
            </button>
        </>
    )
}
