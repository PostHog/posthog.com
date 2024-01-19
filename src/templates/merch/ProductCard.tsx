import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { cn } from '../../utils'
import { ShopifyProduct } from './types'
import { getProductMetafield } from './utils'

type ProductCardProps = {
    product: ShopifyProduct
    className?: string
    onClick?: () => void
}

export function ProductCard(props: ProductCardProps): React.ReactElement {
    const { className, product, onClick } = props

    const subtitle = getProductMetafield(product, 'subtitle')
    const isNew = product.tags?.includes('new')

    const classes = cn('group relative flex flex-col gap-2', className)

    return (
        <div className={classes} key={product.shopifyId} onClick={onClick}>
            <div className="cursor-pointer [&_*]:mb-0 mb-2">
                <h3 className="text-lg [&_a]:text-primary dark:[&_a]:text-primary-dark leading-snug">
                    {product.title}
                </h3>
                <p className="text-[15px] leading-tight mb-1">{subtitle}</p>
                <p className="text-base font-semibold text-gray-900">${product.priceRangeV2.minVariantPrice.amount}</p>
            </div>

            <div className="cursor-pointer image-wrapper relative aspect-[.75]">
                {isNew && (
                    <div className="z-10 rotate-12 uppercase text-xs flex items-center justify-center bg-yellow rounded-full p-2 font-bold aspect-square absolute top-1 right-1 -translate-y-1/2 translate-x-1/2">
                        New
                    </div>
                )}
                <div className="relative h-full bg-white rounded-md border border-light dark:border-dark flex items-center hover:top-[-1px] hover:scale-[1.005] active:top-[2px] active:scale-[.99] hover:transition-all">
                    <GatsbyImage
                        className="w-full h-full rounded-md overflow-hidden"
                        image={product.featuredMedia.preview.image.localFile.childImageSharp.gatsbyImageData}
                        alt={product.title}
                    />
                </div>
            </div>
        </div>
    )
}
