import React, { useEffect, useState } from 'react'
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
    overview: {
        title: string
        textColor?: string
    }
    slug: string
    screenshots?: Array<{ src: string; alt: string }>
}

export default function ProductTabs({ productHandles, className }: ProductTabsProps) {
    const allProducts = useProduct()
    const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal')

    useEffect(() => {
        // Find the container with aria-label="Company stage"
        const container = document.querySelector('[aria-label="Company stage"]')
        if (!container) return

        // Create a ResizeObserver to watch the container
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width } = entry.contentRect
                // Set orientation to vertical only when container is @lg+ wide
                setOrientation(width >= 576 ? 'vertical' : 'horizontal')
            }
        })

        // Start observing the container
        resizeObserver.observe(container)

        // Cleanup
        return () => resizeObserver.disconnect()
    }, [])

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
                <div className={`flex flex-col bg-${product.color} rounded`}>
                    <div className="flex items-start justify-between p-6">
                        <div className="flex-1 flex gap-3">
                            {product.Icon && <product.Icon className={`size-8 ${product.overview.textColor}`} />}
                            <div className={product.overview.textColor}>
                                <h3 className="text-xl font-semibold">{product.name}</h3>
                                {product.overview?.title && <p>{product.overview.title}</p>}
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <OSButton asLink to={`/${product.slug}`} variant="secondary" size="md">
                                Explore
                            </OSButton>
                        </div>
                    </div>

                    {product.screenshots && product.screenshots.length > 0 && (
                        <div>
                            <img
                                src={product.screenshots[0].src}
                                alt={product.screenshots[0].alt}
                                className="w-full shadow-lg"
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
            orientation={orientation}
            tabContainerClassName="pt-2 pr-4 [&>div>div]:flex-wrap [&>div>div]:justify-center"
            tabTriggerClassName="flex justify-start items-center gap-1 rounded-b-sm hover:bg-primary !border-b data-[state=active]:font-semibold"
            tabContentClassName="not-prose pt-2"
            extraTabRowContent={
                <div
                    data-scheme="primary"
                    className="text-primary mt-auto pt-1 text-sm basis-full @xl:basis-auto flex justify-center @xl:justify-stretch"
                >
                    <OSButton asLink to="/products" state={{ newWindow: true }} variant="secondary" size="md">
                        Go to app library ({APP_COUNT})
                    </OSButton>
                </div>
            }
        />
    )
}
