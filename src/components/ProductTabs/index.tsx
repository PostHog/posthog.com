import React from 'react'
import OSTabs from 'components/OSTabs'
import useProduct from 'hooks/useProduct'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import { APP_COUNT } from '../../constants'

interface ProductTabsProps {
    productHandles: string[]
    className?: string
}

interface Product {
    handle: string
    name: string
    Icon?: React.ComponentType<any>
    color: string
    shortDescription?: string
    slug: string
    screenshots?: Array<{ src: string; alt: string }>
}

export default function ProductTabs({ productHandles, className }: ProductTabsProps) {
    const allProducts = useProduct()

    // Filter products based on the provided handles
    const products = productHandles
        .map((handle) => {
            const product = Array.isArray(allProducts)
                ? allProducts.find((p: any) => p.handle === handle)
                : allProducts?.handle === handle
                ? allProducts
                : null
            return product as Product | null
        })
        .filter((product): product is Product => product !== null)

    if (!products.length) {
        return null
    }

    const tabs = products.map((product) => {
        return {
            value: product.handle,
            label: (
                <>
                    {product.Icon && <product.Icon className={`inline-block size-6 text-${product.color}`} />}
                    {product.name}
                </>
            ),
            content: (
                <div className={`flex flex-col gap-4 p-6 bg-${product.color} rounded`}>
                    <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                            {product.Icon && <product.Icon className={`size-8 text-white`} />}
                            <div>
                                <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                                {product.shortDescription && (
                                    <p className="text-white/80">{product.shortDescription}</p>
                                )}
                            </div>
                        </div>
                        <OSButton asLink to={`/${product.slug}`} variant="secondary" size="md">
                            Explore
                        </OSButton>
                    </div>

                    {product.screenshots && product.screenshots.length > 0 && (
                        <div className="mt-4">
                            <img
                                src={product.screenshots[0].src}
                                alt={product.screenshots[0].alt}
                                className="w-full rounded shadow-lg"
                            />
                        </div>
                    )}
                </div>
            ),
        }
    })

    return (
        <OSTabs
            tabs={tabs}
            defaultValue={products[0]?.handle}
            frame={false}
            className={className}
            orientation="vertical"
            tabContainerClassName="pt-2 pr-4"
            tabTriggerClassName="flex justify-start items-center gap-1 rounded-b-sm hover:bg-primary !border-b data-[state=active]:font-semibold"
            tabContentClassName="not-prose pt-2"
            extraTabRowContent={
                <div data-scheme="primary" className="text-primary mt-auto pt-1 text-sm">
                    <OSButton asLink to="/products" state={{ newWindow: true }} variant="secondary" size="md">
                        Go to app library ({APP_COUNT})
                    </OSButton>
                </div>
            }
        />
    )
}
