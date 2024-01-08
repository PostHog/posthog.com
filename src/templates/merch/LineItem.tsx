import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useEffect, useState } from 'react'
import { cn } from '../../utils'
import { Price } from './Price'
import { Quantity } from './Quantity'
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
    const update = useCartStore((state) => state.update)

    const isNew = item.product.tags?.includes('new')
    const image = getLineItemImage(item)

    const [quantity, setQuantity] = useState<number>(item.count)

    useEffect(() => {
        update(item, quantity)
    }, [quantity])

    const handleRemoveFromCart = () => {
        remove(item.shopifyId)
    }

    const classes = cn('text-black grid grid-cols-[50px_1fr] sm:grid-cols-[100px_1fr] gap-4', className)
    return (
        <div className={classes}>
            {image ? (
                <div className="self-start grid place-content-center image-wrapper relative bg-white rounded-md border border-light dark:border-dark">
                    {isNew && (
                        <div className="z-10 uppercase text-xs flex items-center justify-center bg-yellow rounded-full py-2 px-1 font-bold aspect-square absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                            new
                        </div>
                    )}
                    <GatsbyImage
                        className="w-full rounded-md overflow-hidden aspect-square"
                        image={image}
                        alt={`${item.product.title} - ${item.title}`}
                    />
                </div>
            ) : (
                <div className="border-2 rounded grid place-content-center text-gray-400">placeholder image</div>
            )}
            <div className="relative grid grid-cols-[1fr_85px]">
                <div className="col-span-1">
                    <div className="font-bold">{item.product.title}d</div>
                    {item.title !== 'Default Title' && <div className="text-sm">{item.title}</div>}
                    <Quantity className="mt-2" defaultValue={item.count} onChange={setQuantity} />
                </div>
                <div className="mb-3 text-sm col-span-1 text-right">
                    {item.count > 1 && <span className="inline-block mr-2">{item.count} x</span>}{' '}
                    <Price price={item.price} />
                </div>
                <div
                    className="cursor-pointer absolute bottom-0 right-0 underline text-xs"
                    onClick={() => void handleRemoveFromCart()}
                >
                    Remove
                </div>
            </div>
        </div>
    )
}
