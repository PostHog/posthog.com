import { Drawer } from 'components/Drawer'
import React, { useState } from 'react'
import { cn } from '../../utils'
import { ProductCard } from './ProductCard'
import { ProductPanels } from './ProductPanels'
import { ShopifyProduct } from './types'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

type ProductGridProps = {
    className?: string
    products: ShopifyProduct[]
    onProductClick?: (product: ShopifyProduct) => void
    selectedProduct?: ShopifyProduct | null
}

export default function ProductGrid(props: ProductGridProps): React.ReactElement {
    const { className, products, onProductClick, selectedProduct } = props
    const [sidePanels, setSidePanels] = useState<{
        isOpen: boolean
        product: ShopifyProduct | null
        animateOpen?: boolean
    }>({ isOpen: false, product: null, animateOpen: true })

    /**
     * when clicking a product card, either use the onProductClick prop
     * or fall back to the default drawer behavior
     */
    const updateURL = (product: ShopifyProduct) => {
        if (onProductClick) {
            // Use the provided click handler (for sidebar mode)
            onProductClick(product)
        } else {
            // Fall back to original drawer behavior
            if (typeof window !== 'undefined') {
                const url: URL = new URL(window.location.href)
                url.searchParams.set('product', product.handle)
                window.history.pushState({}, '', url)
            }
            setSidePanels({ product, isOpen: true })
        }
    }

    // URL handling is now done in Collection.tsx component

    const classes = cn(
        'grid @xs:grid-cols-2 @2xl:grid-cols-3 @4xl:grid-cols-4 @7xl:grid-cols-5 @2xl:gap-1 p-2',
        className
    )

    return (
        <>
            <div className={classes}>
                {products.map((product: ShopifyProduct, index) => {
                    /**
                     * We want every other two cards to be large and take up 2 rows and 2 cols
                     * and also make their image 1:1
                     */
                    let isLarge = false
                    if (index % 4 === 2 || index % 4 === 3) {
                        isLarge = true
                    }
                    return (
                        <ProductCard
                            className={cn(isLarge && ' sm:[&_.image-wrapper]:aspect-square')}
                            key={product.shopifyId}
                            product={product}
                            onClick={() => updateURL(product)}
                            selected={selectedProduct?.shopifyId === product.shopifyId}
                        />
                    )
                })}
            </div>

            {!onProductClick && (
                <Drawer
                    removeScroll
                    isOpen={sidePanels.isOpen}
                    /**
                     * for when we have a query param for "product" in the URL, we want it to be
                     * already open and not animate in
                     */
                    animateOpen={sidePanels.animateOpen}
                    onClose={() => {
                        const url: URL = new URL(window.location.href)
                        url.searchParams.delete('product')
                        window.history.pushState({}, '', url)
                        setSidePanels((prev) => ({ ...prev, isOpen: false, animateOpen: true }))
                    }}
                >
                    <ProductPanels className="" product={sidePanels.product} updateURL={updateURL} />
                </Drawer>
            )}
        </>
    )
}
