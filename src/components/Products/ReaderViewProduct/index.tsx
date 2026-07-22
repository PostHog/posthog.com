import React, { useRef } from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import useProduct from 'hooks/useProduct'
import { useCustomers } from 'hooks/useCustomers'
import { useProductInterest } from 'hooks/useProductInterest'
import ProgressBar from 'components/ProgressBar'

import type { ProductNavItem, SectionComponentProps } from './types'
import { resolveTemplate } from './types'
import buildProductMenuTabs, { type ProductSurface } from './buildProductMenuTabs'
import ProductSwitcher from './ProductSwitcher'
import { templateRegistry } from './templates'

export { default as buildProductMenuTabs } from './buildProductMenuTabs'
export type { ProductSurface } from './buildProductMenuTabs'
export { default as ProductNav } from './ProductNav'
export { default as ProductSwitcher } from './ProductSwitcher'
export { getProductSurfaceUrl } from './getProductSurfaceUrl'
export { templateRegistry } from './templates'
export { resolveTemplate } from './types'
export type { ProductNavItem, SectionComponentProps } from './types'
export type { MenuTab } from 'components/ReaderView'
export { LabeledList, FilterTag, InlineCode } from './helpers'

interface ProductReaderViewProps {
    productHandle: string
    /**
     * Which surface this page renders. Picks the matching menu off the product
     * data (`productMenu` for `'product'`, `pricingMenu` for `'pricing'`) and
     * seeds the active tab in the sidebar. Defaults to `'product'`.
     */
    surface?: Exclude<ProductSurface, 'docs'>
    seoOverrides?: {
        title?: string
        description?: string
        image?: string
    }
}

const SURFACE_MENU_FIELD: Record<Exclude<ProductSurface, 'docs'>, 'productMenu' | 'pricingMenu'> = {
    product: 'productMenu',
    pricing: 'pricingMenu',
}

const DIVIDED_GROUP_CLASSES =
    'not-prose flex flex-col divide-y divide-primary [&>*]:py-8 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0'

interface SurfaceGroup {
    items: ProductNavItem[]
    group?: string
}

/**
 * Walk the surface menu and collapse consecutive items that share the same
 * `group` value into a single `SurfaceGroup`. Items without a `group` become
 * their own one-element groups so they render as standalone siblings of the
 * outer flex container.
 */
const groupSurfaceMenu = (items: ProductNavItem[]): SurfaceGroup[] => {
    const groups: SurfaceGroup[] = []
    for (const item of items) {
        const last = groups[groups.length - 1]
        if (item.group && last?.group === item.group) {
            last.items.push(item)
        } else {
            groups.push({ items: [item], group: item.group })
        }
    }
    return groups
}

export default function ProductReaderView({
    productHandle,
    surface = 'product',
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
    const surfaceMenu: ProductNavItem[] = (productData[menuField] ?? []) as ProductNavItem[]

    const menuTabs = buildProductMenuTabs({
        productData,
        contentRef: sectionsRef,
        activeSurface: surface,
    })

    const sharedSectionProps = {
        productData,
        customers,
        customerSlugs,
        hasCaseStudy,
        allProducts,
    }

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
                    {groupSurfaceMenu(surfaceMenu).map((group, groupIndex) => {
                        const renderedItems = group.items.map((item) => {
                            const Component = (item.component ?? templateRegistry[resolveTemplate(item)]) as
                                | React.ComponentType<SectionComponentProps & Record<string, any>>
                                | undefined
                            if (!Component) return null
                            return (
                                <Component
                                    key={item.slug}
                                    id={item.slug}
                                    {...sharedSectionProps}
                                    {...(item.props ?? {})}
                                />
                            )
                        })
                        if (group.group === 'divided') {
                            return (
                                <div key={`g-${groupIndex}`} className={DIVIDED_GROUP_CLASSES}>
                                    {renderedItems}
                                </div>
                            )
                        }
                        return <React.Fragment key={`f-${groupIndex}`}>{renderedItems}</React.Fragment>
                    })}
                </div>
            </ReaderView>
        </>
    )
}
