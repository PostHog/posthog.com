import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { cn } from '../../utils'
import { useProduct } from './hooks'
import { useCartStore } from './store'
import { ShopifyProduct } from './types'
import { getProductMetafield } from './utils'

type ProductCardProps = {
    product: ShopifyProduct
    className?: string
    onClick?: () => void
}

export function ProductCard(props: ProductCardProps): React.ReactElement {
    const { className, product, onClick } = props
    const addToCart = useCartStore((state) => state.add)
    const setCartIsOpen = useCartStore((state) => state.setIsOpen)

    const subtitle = getProductMetafield(product, 'subtitle')
    const isNew = product.tags?.includes('new')

    const [
        selectedOptions,
        setOptionAtIndex,
        selections,
        selectedVariant, // use this for add to cart
    ] = useProduct({ product })

    const handleAddToCart = (product: ShopifyProduct) => {
        addToCart(product.variants[0])
        setCartIsOpen(true)
    }

    const classes = cn('group relative flex flex-col justify-between gap-2', className)

    return (
        <div className={classes} key={product.shopifyId} onClick={onClick}>
            <div className="[&_*]:mb-0 space-y-1 mb-4">
                <h3 className="text-lg [&_a]:text-primary dark:[&_a]:text-primary-dark leading-snug">
                    {product.title}
                </h3>
                <p className="text-sm">{subtitle}</p>
                <p className="text-base font-semibold text-gray-900">${product.priceRangeV2.minVariantPrice.amount}</p>
            </div>

            <div className="image-wrapper relative aspect-[.75] bg-white rounded-md border border-gray-accent-light shadow-lg">
                {isNew && (
                    <div className="z-10 uppercase text-xs flex items-center justify-center bg-yellow rounded-full py-2 px-1 font-bold aspect-square absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                        new
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

            {/* {selectedOptions.map((so, i) => {
                return (
                    <ProductOptionSelect
                        key={i}
                        className="my-4"
                        option={so.option}
                        onChange={(val) => setOptionAtIndex(i, so.option, val)}
                        value={so.selectedValue}
                        selections={selections}
                    />
                )
            })} */}

            {/* <button
                className="rounded bg-black px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={() => handleAddToCart(product)}
            >
                Add to cart
            </button> */}
        </div>
    )
}
