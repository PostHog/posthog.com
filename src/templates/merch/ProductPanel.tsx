import { CallToAction } from 'components/CallToAction'
import React, { useState } from 'react'
import { cn } from '../../utils'
import { BackInStockForm } from './BackInStockForm'
import { LoaderIcon } from './LoaderIcon'
import { Price } from './Price'
import { ProductCarousel } from './ProductCarousel'
import { ProductOptionSelect } from './ProductOptionSelect'
import { Quantity } from './Quantity'
import { useProduct } from './hooks'
import { useCartStore } from './store'
import { ShopifyProduct } from './types'
import { getProductMetafield } from './utils'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

type ProductPanelProps = {
    className?: string
    product: ShopifyProduct
    setIsCart: React.Dispatch<React.SetStateAction<boolean>>
    onClick: () => void
    updateURL: (product: ShopifyProduct) => void
}

export function ProductPanel(props: ProductPanelProps): React.ReactElement {
    const { className, product, setIsCart, updateURL } = props

    const [isAdding, setIsAdding] = useState<boolean>(false)
    const [quantity, setQuantity] = useState<number>(1)
    const addToCart = useCartStore((state) => state.update)

    const subtitle = getProductMetafield(product, 'subtitle')
    const isNew = product.tags?.includes('new')

    const { selectedOptions, setOptionAtIndex, selectedVariant, loading, outOfStock } = useProduct(product.shopifyId)

    /**
     * The product.variant option from props is a different shape from the
     * slectedVariant (which comes directly from the Storefront API). We
     * only want the ID from selectedVariant and will add the corresponding
     * variant in product.variants.
     */
    const variantForCart = product.variants.find((v) => v.shopifyId === selectedVariant?.id)

    const handleAddToCart = () => {
        setIsAdding(true)
        setTimeout(() => {
            addToCart(variantForCart || product.variants[0], quantity)
            setIsCart(true)
            setIsAdding(false)
        }, 500)
    }

    const classes = cn('p-8 pt-20 relative space-y-4 overflow-y-auto', className)

    return (
        <div className={classes}>
            <div className="image-wrapper relative bg-white rounded-md border border-light dark:border-dark">
                {isNew && (
                    <div className="z-10 rotate-12 uppercase text-xs flex text-primary items-center justify-center bg-yellow rounded-full p-2 font-bold aspect-square absolute top-1 right-1 -translate-y-1/2 translate-x-1/2">
                        New
                    </div>
                )}

                <ProductCarousel product={product} />
            </div>
            <div className="space-y-0.5">
                <h3 className="text-xl [&_a]:text-primary dark:[&_a]:text-primary-dark leading-snug">
                    {product.title}
                </h3>
                <p className="leading-tight">{subtitle}</p>
                {selectedVariant && (
                    <p className="text-lg">
                        <Price price={selectedVariant.price.amount} />
                    </p>
                )}
            </div>

            {loading && (
                <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-7 bg-gray-accent rounded-md dark:bg-gray-accent-dark w-32"></div>
                    {product.variants.length > 1 && (
                        <div className="h-9 bg-gray-accent rounded-md dark:bg-gray-accent-dark mt-4"></div>
                    )}
                    <span className="sr-only">Loading...</span>
                </div>
            )}

            {selectedOptions?.length &&
                selectedOptions
                    .map((so, i) => {
                        if (so.selectedValue === 'Default Title') return null

                        return (
                            <ProductOptionSelect
                                key={i}
                                option={so.option}
                                onChange={(val) => setOptionAtIndex(i, so.option, val)}
                                value={so.selectedValue}
                            />
                        )
                    })
                    .filter(Boolean)}

            <Quantity value={quantity} onChange={setQuantity} />

            <CallToAction disabled={outOfStock} onClick={handleAddToCart} type="primary" className="relative w-full">
                <>
                    <span className={cn('', isAdding && 'invisible')}>
                        {outOfStock ? 'Out of Stock' : 'Add to Cart'}
                    </span>
                    <LoaderIcon
                        className={cn(
                            'invisible absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2',
                            isAdding && 'visible'
                        )}
                    />
                </>
            </CallToAction>

            {outOfStock && <BackInStockForm />}

            {product.description && (
                <div className="border-t border-light dark:border-dark pt-4">
                    <h3 className="text-lg mb-0">Description</h3>
                    <p className="text-[15px]">{product.description}</p>
                </div>
            )}
            {product.imageProducts?.length > 0 && (
                <div className="border-t border-light dark:border-dark pt-4 mt-4">
                    <h3 className="text-lg mb-0">See something else you liked?</h3>
                    <p className="mt-0 opacity-75">
                        You may have spotted these other fine PostHog products in the photos above.
                    </p>
                    <ul className="list-none m-0 p-0 grid grid-cols-2 gap-x-2">
                        {product.imageProducts?.map((product) => {
                            const { handle, featuredImage } = product
                            return (
                                <li key={handle}>
                                    <a href={`?product=${handle}`}>
                                        <GatsbyImage alt={handle} image={getImage(featuredImage?.localFile)} />
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}
