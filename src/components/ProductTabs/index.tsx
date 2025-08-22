import React, { useEffect, useState } from 'react'
import OSTabs from 'components/OSTabs'
import useProduct from 'hooks/useProduct'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import { APP_COUNT } from '../../constants'
import CloudinaryImage from 'components/CloudinaryImage'
import { DebugContainerQuery } from "components/DebugContainerQuery"
import { useApp } from '../../context/App'

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
    screenshots?: {
        [key: string]: {
            src: string
            srcDark?: string
            alt: string
            width?: number
            height?: number
            classes?: string
            imgClasses?: string
        }
    }
}

export default function ProductTabs({ productHandles, className, selectedStage }: ProductTabsProps) {
    const allProducts = useProduct()
    const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal')
    const { siteSettings } = useApp()
    const isDark = siteSettings.theme === 'dark'

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
                <div className={`@container flex flex-col bg-${product.color} dark:bg-accent rounded`}>
                    <div className="flex items-start justify-between p-4 @lg:p-6">
                        <div className="flex-1 flex gap-3">
                            {product.Icon && <product.Icon className={`size-8 ${product.overview.textColor} dark:text-${product.color}`} />}
                            <div className={`${product.overview.textColor} dark:text-white`}>
                                <h3 className="text-xl font-semibold tracking-tight">{product.name}</h3>
                                {product.overview?.title && <p className="mb-0">{product.overview.title}</p>}
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <OSButton asLink to={`/${product.slug}`} state={{ newWindow: true }} variant="secondary" size="md">
                                Explore
                            </OSButton>
                        </div>
                    </div>

                    {product.screenshots?.home && (
                        <div
                            className={`flex-1 flex ${product.screenshots.home.classes
                                ? product.screenshots.home.classes
                                : "justify-center items-end px-2 pb-2 @lg:px-4 @lg:pb-4"
                                }`}
                        >

                            <CloudinaryImage
                                src={(isDark && product.screenshots.home.srcDark) ? product.screenshots.home.srcDark : product.screenshots.home.src as any}
                                alt={product.screenshots.home.alt}
                                width={product.screenshots.home.width}
                                height={product.screenshots.home.height}
                                imgClassName={product.screenshots.home.imgClasses ? product.screenshots.home.imgClasses : "rounded-md shadow-2xl"}
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
                    className="text-primary mt-auto pt-1 text-sm basis-full @xl:basis-auto flex flex-col items-center @xl:items-stretch gap-2"
                >
                    {selectedStage === 'scale' && (
                        <div className="bg-accent border border-primary rounded p-2 text-xs basis-full">
                            <span>You may also like...</span>
                            <ul className="my-0">
                                <li><Link to="/dpa" state={{ newWindow: true }}>DPA generator</Link></li>
                                <li><Link to="/baa" state={{ newWindow: true }}>BAA generator</Link></li>
                                <li><Link to="/platform-addons" state={{ newWindow: true }}>Product OS add-ons</Link></li>

                            </ul>
                        </div>
                    )}
                    <OSButton asLink to="/products" state={{ newWindow: true }} variant="secondary" size="md" width="full">
                        Go to app library ({APP_COUNT})
                    </OSButton>
                </div>
            }
        />
    )
}
