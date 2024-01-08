import React, { useState } from 'react'
import { cn } from '../../utils'
import { Cart } from './Cart'
import { ProductPanel } from './ProductPanel'

type ProductPanelsProps = {
    className?: string
}

export function ProductPanels(props: ProductPanelsProps): React.ReactElement {
    const { className, product } = props
    const [isCart, setIsCart] = useState(false)

    function handle() {
        setIsCart((prev) => !prev)
    }

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
