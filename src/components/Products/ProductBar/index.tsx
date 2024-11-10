import React from 'react'
interface ProductHeaderProps {
    color: string
    icon: React.ReactNode
    beta?: boolean
    product: string
}

export const ProductBar = ({ color, icon, beta, product }: ProductHeaderProps): JSX.Element => {
    return (
            <div className={`flex gap-1.5 items-center mb-3 @4xl:mb-6 py-2 border-b border-light dark:border-dark px-4 @4xl:px-8 @4xl:py-2`}>
                <span className={`w-6 h-6 text-${color}`}>{icon}</span>
                <span className="text-[15px] font-semibold text-opacity-60">{product}</span>
                {beta && (
                    <span className="text-xs font-semibold text-opacity-60 bg-yellow px-1 py-0.5 rounded-sm uppercase text-primary">
                        Beta
                    </span>
                )}
            </div>
    )
}

export default ProductBar