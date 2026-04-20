import React, { useRef } from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import useProduct from 'hooks/useProduct'
import { useCustomers } from 'hooks/useCustomers'
import { useProductInterest } from 'hooks/useProductInterest'
import ProgressBar from 'components/ProgressBar'

import type { MarketingNavItem, SectionComponentProps } from './types'
import { resolveTemplate } from './types'
import buildProductMenuTabs from './buildProductMenuTabs'
import { templateRegistry } from './templates'

export { default as buildProductMenuTabs } from './buildProductMenuTabs'
export { default as MarketingNav } from './MarketingNav'
export { default as ProductNav } from './ProductNav'
export { templateRegistry } from './templates'
export { resolveTemplate } from './types'
export type { MarketingNavItem, SectionComponentProps } from './types'
export type { MenuTab } from 'components/ReaderView'

interface ProductReaderViewProps {
    productHandle: string
    data: any
    seoOverrides?: {
        title?: string
        description?: string
        image?: string
    }
}

export default function ProductReaderView({ productHandle, data, seoOverrides }: ProductReaderViewProps) {
    const productData = useProduct({ handle: productHandle }) as any
    const allProducts = useProduct() as any[]
    const { getCustomers, hasCaseStudy } = useCustomers()

    useProductInterest(productData?.slug)

    const sectionsRef = useRef<HTMLDivElement>(null)

    const customerSlugs = productData?.customers ? Object.keys(productData.customers) : []
    const customers = getCustomers(customerSlugs)

    if (!productData) {
        return (
            <div className="size-full flex items-center justify-center">
                <ProgressBar title="product" />
            </div>
        )
    }

    const marketingMenu: MarketingNavItem[] = productData.marketingMenu || []

    const menuTabs = buildProductMenuTabs({
        productData,
        aboutContentRef: sectionsRef,
        activeSurface: 'about',
    })

    return (
        <>
            <SEO
                title={seoOverrides?.title || productData?.seo?.title}
                description={seoOverrides?.description || productData?.seo?.description}
                image={seoOverrides?.image || `/images/og/${productData?.slug}.jpg`}
            />
            <ReaderView
                title={productData?.name}
                hideTitle
                chrome
                proseSize="base"
                showQuestions={false}
                menuTabs={menuTabs}
            >
                <div ref={sectionsRef} className="flex flex-col gap-12">
                    {marketingMenu.map((item) => {
                        const templateKey = resolveTemplate(item)
                        const Template = templateRegistry[templateKey] as
                            | React.ComponentType<SectionComponentProps>
                            | undefined
                        if (!Template) return null
                        return (
                            <Template
                                key={item.slug}
                                id={item.slug}
                                productData={productData}
                                data={data}
                                customers={customers}
                                customerSlugs={customerSlugs}
                                hasCaseStudy={hasCaseStudy}
                                allProducts={allProducts}
                            />
                        )
                    })}
                </div>
            </ReaderView>
        </>
    )
}
