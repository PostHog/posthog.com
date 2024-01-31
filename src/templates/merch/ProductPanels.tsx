import React, { useState } from 'react'
import { cn } from '../../utils'
import { Cart } from './Cart'
import { ProductPanel } from './ProductPanel'
import { ShopifyProduct } from './types'

type ProductPanelsProps = {
    className?: string
    product: ShopifyProduct | null
}

export function ProductPanels(props: ProductPanelsProps): React.ReactElement | null {
    const { className, product } = props
    const [isCart, setIsCart] = useState<boolean>(false)

    function handle() {
        setIsCart((prev) => !prev)
    }

    if (!product) return null

    return (
        <div
            className={cn(
                'absolute inset-0 bg-light dark:bg-dark border-l border-light dark:border-dark shadow-xl',
                isCart && 'overflow-hidden'
            )}
        >
            <div
                className={cn(
                    'w-[200%] h-full flex [&>*]:[flex-basis:50%] [&>*]:flex-shrink-0 absolute left-0 top-0 transition duration-300 ease-out‘',
                    isCart && '-translate-x-1/2 ease-out',
                    className
                )}
            >
                <ProductPanel product={product} onClick={handle} setIsCart={setIsCart} />
                <Cart className="h-full overflow-y-scroll" />
            </div>
        </div>
    )
}
