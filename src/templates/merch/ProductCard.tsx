import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useMemo } from 'react'
import { cn } from '../../utils'
import { ShopifyProduct } from './types'
import { getProductMetafield, getDisplayTitle } from './utils'
import { getShopifyImage } from './utils'

type ProductCardProps = {
    product: ShopifyProduct
    className?: string
    onClick?: () => void
    selected?: boolean
}

export function ProductCard(props: ProductCardProps): React.ReactElement {
    const { className, product, onClick, selected = false } = props

    const subtitle = getProductMetafield(product, 'subtitle')
    const isNew = product.tags?.includes('new')

    // Kit logic: use product.type === 'Kit' (case-insensitive)
    const productKit = typeof product.type === 'string' && product.type.toLowerCase() === 'kit'

    // Use shared display title logic
    const displayTitle = getDisplayTitle(product)

    const image = useMemo(() => getShopifyImage({ image: product.featuredMedia.preview.image }), [product])

    return (
        <div
            className={`group px-2 pt-2 pb-1 border-[1.5px] rounded ${
                selected ? 'border-blue bg-blue/10' : 'border-transparent'
            }  relative flex flex-col gap-2 ${className}`}
            key={product.shopifyId}
            onClick={onClick}
        >
            <div className="cursor-default image-wrapper relative">
                {isNew && (
                    <div className="z-10 rotate-12 uppercase text-xs flex text-primary items-center justify-center bg-yellow rounded-full p-2 font-bold aspect-square absolute top-1 right-1 -translate-y-1/2 translate-x-1/2">
                        New
                    </div>
                )}
                <div className="relative aspect-square bg-white flex items-center">
                    <GatsbyImage
                        className="aspect-square overflow-hidden"
                        image={image}
                        alt={product.title}
                        loading="lazy"
                    />
                </div>
            </div>

            <div className="cursor-default mb-2 text-center">
                <h3 className="text-sm font-medium leading-tight">{displayTitle}</h3>
                {/* <p className="text-[15px] leading-tight mb-1">{subtitle}</p> */}
                <p className="text-sm text-secondary mb-0">
                    <span className={`${productKit ? 'line-through' : ''}`}>
                        ${product.priceRangeV2.minVariantPrice.amount}
                    </span>{' '}
                    {productKit ? <span className="text-green font-bold">FREE</span> : null}
                </p>
            </div>
        </div>
    )
}
