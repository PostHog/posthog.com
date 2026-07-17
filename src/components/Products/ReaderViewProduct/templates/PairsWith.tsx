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
            <h2 className="text-3xl font-bold text-primary mt-0 mb-3">Works with other PostHog products</h2>
            <p className="text-base text-secondary leading-relaxed m-0 mb-4">
                Use {productData?.name} with these other PostHog apps to maximize shareholder value.
            </p>
            <h3 className="mb-4 !text-base">Works with...</h3>
            <ul className="list-none space-y-4">
                {pairsWith.map((pair) => {
                    const productDetails = allProducts.find((product: any) => product.slug === pair.slug)
                    if (!productDetails) return null

                    return (
                        <li key={pair.slug} className="">
                            <Link to={`/${pair.slug}`} state={{ newWindow: true }} className="flex items-center gap-2">
                                <span
                                    className={`inline-block size-6 ${
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
                                <h3 className="!text-lg font-bold text-primary underline">{productDetails.name}</h3>
                            </Link>
                            <p className="text-sm text-secondary m-0 pl-8">{pair.description}</p>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default PairsWith
