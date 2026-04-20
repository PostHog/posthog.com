import React, { useRef } from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import useProduct from 'hooks/useProduct'
import { useCustomers } from 'hooks/useCustomers'
import { useProductInterest } from 'hooks/useProductInterest'
import ProgressBar from 'components/ProgressBar'

import type { MarketingNavItem, SectionComponentProps } from './types'
import { resolveTemplate } from './types'
import buildProductMenuTabs, { type ProductSurface } from './buildProductMenuTabs'
import ProductSwitcher from './ProductSwitcher'
import { templateRegistry } from './templates'

export { default as buildProductMenuTabs } from './buildProductMenuTabs'
export type { ProductSurface } from './buildProductMenuTabs'
export { default as MarketingNav } from './MarketingNav'
export { default as ProductNav } from './ProductNav'
export { default as ProductSwitcher } from './ProductSwitcher'
export { getProductSurfaceUrl } from './getProductSurfaceUrl'
export { templateRegistry } from './templates'
export { resolveTemplate } from './types'
export type { MarketingNavItem, SectionComponentProps } from './types'
export type { MenuTab } from 'components/ReaderView'

interface ProductReaderViewProps {
    productHandle: string
    data: any
    /**
     * Which surface this page renders. Picks the matching menu off the product
     * data (`marketingMenu` for `'about'`, `pricingMenu` for `'pricing'`) and
     * seeds the active tab in the sidebar. Defaults to `'about'`.
     */
    surface?: Exclude<ProductSurface, 'docs'>
    seoOverrides?: {
        title?: string
        description?: string
        image?: string
    }
}

const SURFACE_MENU_FIELD: Record<Exclude<ProductSurface, 'docs'>, 'marketingMenu' | 'pricingMenu'> = {
    about: 'marketingMenu',
    pricing: 'pricingMenu',
}

export default function ProductReaderView({
    productHandle,
    data,
    surface = 'about',
    seoOverrides,
}: ProductReaderViewProps) {
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

    const menuField = SURFACE_MENU_FIELD[surface]
    const surfaceMenu: MarketingNavItem[] = productData[menuField] || []

    const menuTabs = buildProductMenuTabs({
        productData,
        contentRef: sectionsRef,
        activeSurface: surface,
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
                proseSize="lg"
                showQuestions={false}
                menuTabs={menuTabs}
                productSelect={<ProductSwitcher activeHandle={productData.handle} />}
            >
                <div ref={sectionsRef} className="flex flex-col gap-12">
                    {surfaceMenu.map((item) => {
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
