import { CallToAction } from 'components/CallToAction'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import { cn } from '../../utils'
import { LoaderIcon } from './LoaderIcon'
import { ProductOptionSelect } from './ProductOptionSelect'
import { Quantity } from './Quantity'
import { useProduct } from './hooks'
import { useCartStore } from './store'
import { getProductMetafield } from './utils'

type ProductPanelProps = {
    className?: string
}

export function ProductPanel(props: ProductPanelProps): React.ReactElement {
    const { className, product, setIsCart } = props

    const [isAdding, setIsAdding] = useState<boolean>(false)
    const [quantity, setQuantity] = useState<number>(1)
    const addToCart = useCartStore((state) => state.add)

    const subtitle = getProductMetafield(product, 'subtitle')
    const isNew = product.tags?.includes('new')

    const [
        selectedOptions,
        setOptionAtIndex,
        selections,
        selectedVariant, // use this for add to cart
    ] = useProduct({ product })

    const handleAddToCart = () => {
        setIsAdding(true)
        addToCart(selectedVariant || product.variants[0], quantity)
        setTimeout(() => {
            setIsCart(true)
            setIsAdding(false)
        }, 500)
    }

    const classes = cn('p-8 pt-20 relative space-y-4 overflow-y-auto', className)

    return (
        <div className={classes}>
            <div className="image-wrapper relative bg-white rounded-md border border-light dark:border-dark">
                {isNew && (
                    <div className="z-10 rotate-12 uppercase text-xs flex items-center justify-center bg-yellow rounded-full p-2 font-bold aspect-square absolute top-1 right-1 -translate-y-1/2 translate-x-1/2">
                        New
                    </div>
                )}
                <GatsbyImage
                    className="w-full rounded-md overflow-hidden aspect-square"
                    image={product.featuredMedia.preview.image.localFile.childImageSharp.gatsbyImageData}
                    alt={product.title}
                />
            </div>
            <div className="[&_*]:mb-0 space-y-0.5">
                <h3 className="text-xl [&_a]:text-primary dark:[&_a]:text-primary-dark leading-snug">
                    {product.title}
                </h3>
                <p className="leading-tight">{subtitle}</p>
                <p className="text-lg">
                    <strong>${product.priceRangeV2.minVariantPrice.amount}</strong>
                </p>
            </div>

            {selectedOptions.map((so, i) => {
                return (
                    <ProductOptionSelect
                        key={i}
                        option={so.option}
                        onChange={(val) => setOptionAtIndex(i, so.option, val)}
                        value={so.selectedValue}
                        selections={selections}
                    />
                )
            })}

            <Quantity value={quantity} onChange={setQuantity} />

            <CallToAction onClick={handleAddToCart} type="primary" className="relative w-full">
                <span className={cn('', isAdding && 'invisible')}>Add to Cart</span>
                <LoaderIcon
                    className={cn(
                        'invisible absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2',
                        isAdding && 'visible'
                    )}
                />
            </CallToAction>
            {product.description && (
                <div className="border-t border-light dark:border-dark pt-4">
                    <h3 className="text-lg mb-0">Description</h3>
                    <p className="text-[15px]">{product.description}</p>
                </div>
            )}
        </div>
    )
}
