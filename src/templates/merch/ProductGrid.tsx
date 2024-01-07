import { Drawer } from 'components/Drawer'
import React, { useEffect, useState } from 'react'
import { cn } from '../../utils'
import { ProductCard } from './ProductCard'
import { ProductPanels } from './ProductPanels'
import { ShopifyProduct } from './types'

type ProductGridProps = {
    className?: string
    products: ShopifyProduct[]
}

function getProductFromHandle(products, handle) {
    return products.find((p) => p.handle === handle)
}

export default function ProductGrid(props: ProductGridProps): React.ReactElement {
    const { className, products } = props
    const [sidePanels, setSidePanels] = useState({ isOpen: false, product: null, animateOpen: true })

    /**
     * when clicking a product card, add its handle to the URL and open
     * the product drawer
     */
    const updateURL = (product) => {
        if (typeof window !== 'undefined') {
            const url = new URL(window.location)
            url.searchParams.set('product', product.handle) // replace 'param' and 'value' with your query parameter and value
            window.history.pushState({}, '', url)
        }
        setSidePanels({ product, isOpen: true })
    }

    /**
     * when landing on or navigating to a collection page with a "product"
     * param in the URL, get the handle's corresponding product and load
     * it into the product drawer.
     */
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search)
            const paramName = urlParams.get('product') // replace 'param' with your query parameter
            if (paramName) {
                setSidePanels({ product: getProductFromHandle(products, paramName), isOpen: true, animateOpen: false })
            }
        }
    }, [])

    const classes = cn(
        'space-y-8 sm:space-y-0 sm:grid lg:grid-cols-[repeat(4,minMax(0,1fr))] gap-x-10 gap-y-7 sm:grid-cols-2',
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
                            className={cn(isLarge && 'col-span-2 row-span-2 sm:[&_.image-wrapper]:aspect-square')}
                            key={product.shopifyId}
                            product={product}
                            onClick={() => updateURL(product)}
                        />
                    )
                })}
            </div>

            <Drawer
                removeScroll
                isOpen={sidePanels.isOpen}
                // for when we have a query param for "product" in the URL, we just want it to be open and not animate
                animateOpen={sidePanels.animateOpen}
                onClose={() => {
                    const url = new URL(window.location)
                    url.searchParams.delete('product')
                    window.history.pushState({}, '', url)
                    setSidePanels((prev) => ({ ...prev, isOpen: false, animateOpen: true }))
                }}
            >
                <ProductPanels className="" product={sidePanels.product} />
            </Drawer>
        </>
    )
}
