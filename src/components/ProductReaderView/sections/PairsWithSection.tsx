import React from 'react'
import Link from 'components/Link'
import useProduct from 'hooks/useProduct'
import { isAppIconName, AppIcon } from 'components/OSIcons/AppIcon'

interface PairItem {
    slug: string
    description: string
}

interface PairsWithSectionProps {
    productData: any
}

export default function PairsWithSection({ productData }: PairsWithSectionProps): JSX.Element {
    const allProducts = useProduct() as any[]
    const pairsWith: PairItem[] = productData?.pairsWith || []

    if (pairsWith.length === 0) {
        return <></>
    }

    return (
        <section id="pairs-with" className="mb-12">
            <h2 className="text-2xl font-bold mb-2">Pairs with...</h2>
            <p className="text-secondary mb-6">
                {productData?.name} pairs with other products to give you a complete picture of your product.
            </p>

            <div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4">
                {pairsWith.map((pair: PairItem) => {
                    // Find the product details by slug
                    const productDetails = allProducts.find((product: any) => product.slug === pair.slug)
                    if (!productDetails) return null

                    return (
                        <Link
                            key={productDetails.name}
                            to={`/${pair.slug}`}
                            state={{ newWindow: true }}
                            className="flex flex-col items-center border border-primary rounded p-4 bg-primary hover:bg-accent transition-colors h-full"
                        >
                            <span
                                className={`inline-block size-8 my-4 ${
                                    productDetails.color
                                        ? 'text-' + productDetails.color
                                        : 'text-primary dark:text-primary-dark opacity-50'
                                }`}
                            >
                                {productDetails.parentIcon && isAppIconName(productDetails.parentIcon) ? (
                                    <AppIcon name={productDetails.parentIcon} />
                                ) : (
                                    productDetails.Icon && <productDetails.Icon />
                                )}
                            </span>
                            <h3 className="text-lg font-bold text-primary mb-2 text-center">{productDetails.name}</h3>
                            <p className="text-sm text-secondary text-center">{pair.description}</p>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
