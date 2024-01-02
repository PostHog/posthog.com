import { Drawer } from 'components/Drawer'
import React from 'react'
import { cn } from '../../utils'
import { Cart } from './Cart'
import { ProductCard } from './ProductCard'
import { useCartStore } from './store'
import { ShopifyProduct } from './types'

type ProductGridProps = {
    className?: string
    products: ShopifyProduct[]
}

export default function ProductGrid(props: ProductGridProps): React.ReactElement {
    const { className, products } = props
    const cartIsOpen = useCartStore((state) => state.isOpen)
    const setCartIsOpen = useCartStore((state) => state.setIsOpen)

    return (
        <>
            <Drawer isOpen={cartIsOpen} onClose={() => setCartIsOpen(false)}>
                <Cart />
            </Drawer>
            <div className="space-y-8 sm:space-y-0 sm:grid lg:grid-cols-[repeat(4,minMax(0,1fr))] gap-x-10 gap-y-7 sm:grid-cols-2">
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
                        />
                    )
                })}
            </div>
        </>
    )
}
