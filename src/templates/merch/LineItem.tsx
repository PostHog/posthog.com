import React from 'react'
import { cn } from '../../utils'
import { ShopifyProductVariant } from './types'
import { GatsbyImage } from 'gatsby-plugin-image'
import { getLineItemImage } from './transforms'
import { useCartStore } from '../../hooks/useCartStore'

type LineItemsProps = {
    className?: string
    item: ShopifyProductVariant
}

export function LineItem(props: LineItemsProps): React.ReactElement {
    const { className, item } = props
    const remove = useCartStore((state) => state.remove)

    const image = getLineItemImage(item)

    const handleRemoveFromCart = () => {
        remove(item.shopifyId)
    }

    const classes = cn('my-8 text-black', className)
    return (
        <div className={classes}>
            {image ? (
                <GatsbyImage className="w-[300px]" image={image} alt={`${item.product.title} - ${item.title}`} />
            ) : (
                <div className="border-2 rounded grid place-content-center text-gray-400">placeholder image</div>
            )}
            <div className="font-bold">{item.product.title}</div>
            <div className="">{item.title}</div>
            <div className="cursor-pointer" onClick={() => void handleRemoveFromCart()}>
                Remove
            </div>
        </div>
    )
}
