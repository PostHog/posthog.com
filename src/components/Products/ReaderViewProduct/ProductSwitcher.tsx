import React, { useMemo } from 'react'
import { navigate } from 'gatsby'
import OSSelect from 'components/OSForm/select'
import { useSidebarExpanded } from 'components/ReaderView'
import useProduct from 'hooks/useProduct'
import { PRODUCT_CATEGORIES } from 'constants/productNavigation'
import buildProductMenuTabs, { type ProductSurface } from './buildProductMenuTabs'

interface ProductSwitcherProps {
    /** Handle of the currently active product (matches `product.handle`). */
    activeHandle: string
    /** Optional list of product handles to hide from the dropdown. */
    excludeHandles?: string[]
    /** The sidebar tab of the current page. Switching products opens the same tab. Defaults to `'product'`. */
    surface?: ProductSurface
}

/**
 * Searchable product picker rendered at the top of `ReaderView`'s LeftSidebar.
 * Lists products in the same order as the taskbar Products menu (`PRODUCT_CATEGORIES`),
 * without the group labels. Navigates to the target product's tab for the current
 * `surface` (e.g. Learn), or to the product root (`/<slug>`) when the target
 * product has no such tab.
 *
 * Pass via `<ReaderView productSelect={<ProductSwitcher activeHandle="…" />}>`.
 */
const ProductSwitcher = ({ activeHandle, excludeHandles = [], surface = 'product' }: ProductSwitcherProps) => {
    const allProducts = useProduct() as any[]
    const expanded = useSidebarExpanded()

    const options = useMemo(
        () =>
            PRODUCT_CATEGORIES.flatMap(({ handles }) => handles)
                .map((handle) => allProducts.find((p: any) => p.handle === handle))
                .filter((p: any) => p?.handle && p?.slug && !excludeHandles.includes(p.handle))
                .map((p: any) => ({
                    label: p.name,
                    value: p.handle,
                    color: p.color,
                    icon: p.Icon ? <p.Icon className={`size-5 text-${p.color}`} /> : undefined,
                })),
        [allProducts, excludeHandles]
    )

    const activeProduct = allProducts.find((p: any) => p.handle === activeHandle)

    const handleChange = (handle: string) => {
        if (handle === activeHandle) return
        const target = allProducts.find((p: any) => p.handle === handle)
        if (!target?.slug) return
        const tab = buildProductMenuTabs({ productData: target, activeSurface: surface }).find(
            ({ value }) => value === surface
        )
        navigate(tab?.href ?? `/${target.slug}`)
    }

    // Collapsed sidebar: render only the active product's icon, centered.
    // The wrapping motion.div in LeftSidebar is 32px wide while collapsed,
    // so `flex justify-center` lands the icon at panel center (x=24).
    // `min-h-7` matches the OSSelect button's `min-h-7` (set below) so the
    // rest of the column doesn't jump vertically on hover/pin.
    // Hovering or pinning the sidebar swaps in the full searchable dropdown.
    if (!expanded && activeProduct?.Icon) {
        const Icon = activeProduct.Icon
        return (
            <div className="flex items-center justify-center min-h-7" aria-label={activeProduct.name}>
                <Icon className={`size-5 text-${activeProduct.color}`} />
            </div>
        )
    }

    return (
        <OSSelect
            label="Product"
            showLabel={false}
            options={options}
            value={activeHandle}
            onChange={handleChange}
            placeholder="Switch product..."
            searchable
            searchPlaceholder="Search products..."
            width="auto"
            size="sm"
            maxHeight="max-h-[70vh]"
            // pl-1.5 (6px) aligns the trigger's icon with the centered
            // collapsed icon — both end up at the same panel x.
            // min-h-7 matches the collapsed icon's height so swapping
            // between the two doesn't shift the column vertically.
            className="font-bold text-black dark:text-primary pl-1.5 min-h-7"
            optionClassName="!px-2 !py-1 !text-[13px]"
            dataScheme="primary"
            chrome={false}
        />
    )
}

export default ProductSwitcher
