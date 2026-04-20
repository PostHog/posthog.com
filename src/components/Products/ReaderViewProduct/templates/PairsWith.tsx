import React from 'react'
import Link from 'components/Link'
import { isAppIconName, AppIcon } from 'components/OSIcons/AppIcon'
import { SectionComponentProps } from '../types'

interface PairItem {
    slug: string
    description: string
}

const PairsWith = ({ id, productData, allProducts }: SectionComponentProps) => {
    const pairsWith: PairItem[] = productData?.pairsWith || []
    if (!pairsWith.length) return null

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="text-3xl font-bold text-primary mt-0 mb-3">Pairs with...</h2>
            <p className="text-base text-secondary leading-relaxed m-0 mb-4">
                {productData?.name} pairs with other products to give you a complete picture.
            </p>
            <ul className="grid grid-cols-1 @md:grid-cols-2 @2xl:grid-cols-3 gap-3 list-none m-0 p-0">
                {pairsWith.map((pair) => {
                    const productDetails = allProducts.find((product: any) => product.slug === pair.slug)
                    if (!productDetails) return null

                    return (
                        <li key={pair.slug} className="m-0">
                            <Link
                                to={`/${pair.slug}`}
                                state={{ newWindow: true }}
                                className="flex flex-col items-center text-center h-full border border-primary rounded p-4 bg-primary hover:bg-accent transition-colors"
                            >
                                <span
                                    className={`inline-block size-8 mb-3 ${
                                        productDetails.color
                                            ? `text-${productDetails.color}`
                                            : 'text-primary opacity-50'
                                    }`}
                                >
                                    {productDetails.parentIcon && isAppIconName(productDetails.parentIcon) ? (
                                        <AppIcon name={productDetails.parentIcon} />
                                    ) : (
                                        productDetails.Icon && <productDetails.Icon />
                                    )}
                                </span>
                                <h3 className="text-lg font-bold text-primary mt-0 mb-1">{productDetails.name}</h3>
                                <p className="text-sm text-secondary m-0">{pair.description}</p>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default PairsWith
