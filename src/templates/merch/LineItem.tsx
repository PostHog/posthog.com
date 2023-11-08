import { XIcon } from '@heroicons/react/outline'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { cn } from '../../utils'
import { useCartStore } from './store'
import { getLineItemImage } from './transforms'
import { CartItem } from './types'

type LineItemsProps = {
    className?: string
    item: CartItem
}

export function LineItem(props: LineItemsProps): React.ReactElement {
    const { className, item } = props
    const remove = useCartStore((state) => state.remove)

    const image = getLineItemImage(item)

    const handleRemoveFromCart = () => {
        remove(item.shopifyId)
    }

    const classes = cn('my-8 text-black grid grid-cols-[100px_1fr] gap-4', className)
    return (
        <div className={classes}>
            {image ? (
                <GatsbyImage className="w-full" image={image} alt={`${item.product.title} - ${item.title}`} />
            ) : (
                <div className="border-2 rounded grid place-content-center text-gray-400">placeholder image</div>
            )}
            <div className="relative">
                <div className="font-bold">{item.product.title}</div>
                <div className="pr-8">{item.title}</div>
                <div className="pr-8">Quantity: {item.count}</div>
                <div className="cursor-pointer absolute top-0 right-0" onClick={() => void handleRemoveFromCart()}>
                    <XIcon className="w-6 h-6" />
                </div>
            </div>
        </div>
    )
}
