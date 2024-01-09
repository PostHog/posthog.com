import { CallToAction } from 'components/CallToAction'
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

            if (itemsExceedingQuantityAvailable.length > 0) {
                setAdjustedItems(itemsExceedingQuantityAvailable)
                setIsCheckingOut(false)
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
                setIsCheckingOut(false)
                return
            }

            const checkoutUrl = getCheckoutUrl(newCart)
            console.log('🚀 ~ checkoutUrl:', checkoutUrl)
            // if (checkoutUrl) {
            //     window.location.href = checkoutUrl
            // }
        }
        checkoutMutation()
    }, [setIsCheckingOut, discountCode, cartItems])

    const classes = cn('', className)

    return (
        <div className={classes}>
            {adjustedItems.length > 0 && <AdjustedLineItems className="my-4" lineItems={adjustedItems} />}

            <div className="flex justify-end">
                <CallToAction
                    onClick={handleCheckout}
                    type="primary"
                    className={cn('relative text-center w-full', className)}
                >
                    <span className={cn('mx-16', showAdjustments && 'invisible', isCheckingOut && 'invisible')}>
                        Checkout
                    </span>
                    <span
                        className={cn(
                            'invisible absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full',
                            showAdjustments && 'visible',
                            isCheckingOut && 'invisible'
                        )}
                    >
                        Proceed to Checkout
                    </span>
                    <LoaderIcon
                        className={cn(
                            'invisible absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2',
                            !showAdjustments && isCheckingOut && 'visible'
                        )}
                    />
                </CallToAction>
            </div>
        </div>
    )
}
