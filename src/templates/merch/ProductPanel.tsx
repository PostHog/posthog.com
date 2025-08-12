import { CallToAction } from 'components/CallToAction'
import React, { useMemo, useState } from 'react'
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
import { getProductMetafield, getDisplayTitle, calculateAspectRatioDimensions } from './utils'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { getShopifyImage } from './utils'
import { IconSpinner } from '@posthog/icons'
import SizeGuide from './SizeGuide'
import Link from 'components/Link'

type ProductPanelProps = {
    className?: string
    product: ShopifyProduct
    setIsCart: React.Dispatch<React.SetStateAction<boolean>>
    onClick: () => void
    updateURL: (product: ShopifyProduct) => void
    onCartOpen?: () => void
    containerWidth?: number
}

const Image = ({ alt, image }: { alt: string; image: any }) => {
    const memoizedImage = useMemo(() => {
        const { width, height } = calculateAspectRatioDimensions(image, 500)
        return getShopifyImage({
            image: {
                ...image,
                width,
                height,
            },
        })
    }, [image])

    return <GatsbyImage alt={alt} image={memoizedImage} />
}

export function ProductPanel(props: ProductPanelProps): React.ReactElement {
    const { className, product, setIsCart, updateURL, onCartOpen, containerWidth } = props

    const [isAdding, setIsAdding] = useState<boolean>(false)
    const [justAdded, setJustAdded] = useState<boolean>(false)
    const [quantity, setQuantity] = useState<number>(1)
    const addToCart = useCartStore((state) => state.update)

    const subtitle = getProductMetafield(product, 'subtitle')
    const isNew = product.tags?.includes('new')

    const { selectedOptions, setOptionAtIndex, selectedVariant, loading, outOfStock } = useProduct(product.shopifyId)

    // New metafields (now using non-namespaced lookups)
    const productName = getProductMetafield(product, 'name')
    const productExtension = getProductMetafield(product, 'extension')
    const productBrand = getProductMetafield(product, 'brand')
    const productModelInfo = getProductMetafield(product, 'model_info')
    // Kit logic: use product.type === 'Kit' (case-insensitive)
    const productKit = typeof product.type === 'string' && product.type.toLowerCase() === 'kit'

    // Category breadcrumb
    function getCategoryBreadcrumb(category?: ShopifyProduct['category']): string {
        if (!category) return ''
        // For now, just show the name. You can make this recursive if you add parent info.
        return category.name
    }

    // Available quantity
    let available = 'not tracked'
    if (selectedVariant && typeof selectedVariant.quantityAvailable === 'number') {
        available = selectedVariant.quantityAvailable.toString()
    } else if (typeof product.totalInventory === 'number' && product.totalInventory > 0) {
        available = product.totalInventory.toString()
    }

    // Date added
    const addedOn = product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'not tracked'

    /**
     * The product.variant option from props is a different shape from the
     * selectedVariant (which comes directly from the Storefront API). We
     * only want the ID from selectedVariant and will add the corresponding
     * variant in product.variants.
     */
    const variantForCart = product.variants.find((v) => v.shopifyId === selectedVariant?.id)

    const handleAddToCart = () => {
        setIsAdding(true)
        setTimeout(() => {
            const cartItem = variantForCart || product.variants[0]
            addToCart(cartItem, quantity)
            setIsCart(true)
            setIsAdding(false)
            setJustAdded(true)
            // Hide the message after 5 seconds
            setTimeout(() => {
                setJustAdded(false)
            }, 5000)
        }, 500)
    }

    const handleGoToCart = () => {
        onCartOpen?.()
        setJustAdded(false)
    }

    const classes = cn('p-8 pt-20 relative space-y-4 overflow-y-auto', className)

    return (
        <div className={classes}>
            <div className="image-wrapper relative bg-white rounded-md border border-primary">
                {isNew && (
                    <div className="z-10 rotate-12 uppercase text-xs flex text-primary items-center justify-center bg-yellow rounded-full p-2 font-bold aspect-square absolute top-1 right-1 -translate-y-1/2 translate-x-1/2">
                        New
                    </div>
                )}
                <ProductCarousel product={product} containerWidth={containerWidth} />
            </div>
            <div className="space-y-0.5 text-center">
                <h3 className="text-base leading-snug">{getDisplayTitle(product)}</h3>
                <p className="leading-tight text-sm">{subtitle}</p>
            </div>

            {loading && (
                <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-7 bg-accent rounded-md  w-32"></div>
                    {product.variants.length > 1 && <div className="h-9 bg-accent rounded-md  mt-4"></div>}
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

            <SizeGuide title={product.title} />

            <div className="hidden">
                <Quantity value={quantity} onChange={setQuantity} disabled={productKit} />
            </div>

            <CallToAction
                disabled={loading || outOfStock}
                onClick={handleAddToCart}
                type="primary"
                className="relative w-full"
            >
                <>
                    <span className={cn('', isAdding && 'invisible')}>
                        {loading ? (
                            <IconSpinner className="w-5 mx-auto animate-spin" />
                        ) : outOfStock ? (
                            'Out of stock'
                        ) : (
                            <>
                                Add to cart
                                {selectedVariant && (
                                    <span className="text-sm">
                                        {' '}
                                        –{' '}
                                        {productKit ? (
                                            <>
                                                <span className="line-through">
                                                    <Price price={selectedVariant.price.amount} />
                                                </span>{' '}
                                                <span className="text-green font-bold">FREE</span>
                                            </>
                                        ) : (
                                            <Price price={selectedVariant.price.amount} />
                                        )}
                                    </span>
                                )}
                            </>
                        )}
                    </span>
                    <LoaderIcon
                        className={cn(
                            'invisible absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2',
                            isAdding && 'visible'
                        )}
                    />
                </>
            </CallToAction>

            {!loading && outOfStock && <BackInStockForm variant={variantForCart} product={product} />}

            {justAdded && !outOfStock && (
                <div className="text-center py-2">
                    <button
                        onClick={handleGoToCart}
                        className="text-red dark:text-yellow font-semibold hover:underline text-sm"
                    >
                        Go to cart →
                    </button>
                </div>
            )}

            <div className="grid grid-cols-4 gap-y-1 gap-x-2 text-sm">
                <div className="text-secondary">Available</div>
                <div className="col-span-3">{available}</div>

                <div className="text-secondary">Brand</div>
                <div className="col-span-3">{productBrand}</div>

                <div className="text-secondary">Quality</div>
                <div className="col-span-3">Excellent</div>

                <div className="text-secondary">Model info</div>
                <div className="col-span-3">
                    {typeof productModelInfo === 'string'
                        ? productModelInfo.split('\n').map((line, i) => <div key={i}>{line}</div>)
                        : ''}
                </div>

                <div className="text-secondary">Added on</div>
                <div className="col-span-3">{addedOn}</div>
                {product.description && (
                    <>
                        <div className="text-secondary">Description</div>
                        <div className="col-span-3" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                    </>
                )}
            </div>

            {product.imageProducts?.length > 0 && (
                <div className="border-t border-primary pt-4 mt-4">
                    <h3 className="text-lg mb-0">See something else you liked?</h3>
                    <p className="mt-0 opacity-75">
                        You may have spotted these other fine PostHog products in the photos above.
                    </p>
                    <ul className="list-none m-0 p-0 grid grid-cols-2 gap-x-2">
                        {product.imageProducts?.map((product) => {
                            const { handle } = product
                            const featuredImage = (product as any).featuredImage
                            return (
                                <li key={handle}>
                                    <Link to={`?product=${handle}`}>
                                        <Image alt={handle} image={featuredImage} />
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}
