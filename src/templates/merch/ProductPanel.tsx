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
    console.log('🚀 ~ product:', product)
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
    console.log('🚀 ~ selectedOptions:', selectedOptions)

    const handleAddToCart = () => {
        setIsAdding(true)
        addToCart(selectedVariant || product.variants[0], quantity)
        setTimeout(() => {
            setIsCart(true)
            setIsAdding(false)
        }, 500)
    }

    const classes = cn('p-8 pt-20 relative space-y-6 overflow-y-scroll', className)

    return (
        <div className={classes}>
            <div className="image-wrapper relative bg-white rounded-md border border-light dark:border-dark">
                {isNew && (
                    <div className="z-10 uppercase text-xs flex items-center justify-center bg-yellow rounded-full py-2 px-1 font-bold aspect-square absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                        new
                    </div>
                )}
                <GatsbyImage
                    className="w-full rounded-md overflow-hidden aspect-square"
                    image={product.featuredMedia.preview.image.localFile.childImageSharp.gatsbyImageData}
                    alt={product.title}
                />
            </div>
            <div className="[&_*]:mb-0 space-y-1 mb-4">
                <h3 className="text-lg [&_a]:text-primary dark:[&_a]:text-primary-dark leading-snug">
                    {product.title}
                </h3>
                <p className="text-sm">{subtitle}</p>
                <p className="text-base font-semibold text-gray-900">${product.priceRangeV2.minVariantPrice.amount}</p>
            </div>

            {selectedOptions.map((so, i) => {
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
            })}

            <Quantity value={quantity} onChange={setQuantity} />

            <CallToAction onClick={handleAddToCart} type="primary" className="relative">
                <span className={cn('', isAdding && 'invisible')}>Add to Cart</span>
                <LoaderIcon
                    className={cn(
                        'invisible absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2',
                        isAdding && 'visible'
                    )}
                />
            </CallToAction>
            <p className="text-sm">{product.description}</p>
        </div>
    )
}
