import React, { useMemo } from 'react'
import { navigate } from 'gatsby'
import OSSelect from 'components/OSForm/select'
import useProduct from 'hooks/useProduct'
import { getProductSurfaceUrl } from './getProductSurfaceUrl'

interface ProductSwitcherProps {
    /** Handle of the currently active product (matches `product.handle`). */
    activeHandle: string
    /** Optional list of product handles to hide from the dropdown. */
    excludeHandles?: string[]
}

/**
 * Searchable product picker rendered at the top of `ReaderView`'s LeftSidebar.
 * Sources the product list from `useProduct()` (which chains in
 * `useProducts()` plus the extended/alpha entries) and navigates to the
 * equivalent surface on the new product via `getProductSurfaceUrl`.
 *
 * Pass via `<ReaderView productSelect={<ProductSwitcher activeHandle="…" />}>`.
 */
const ProductSwitcher = ({ activeHandle, excludeHandles = [] }: ProductSwitcherProps) => {
    const allProducts = useProduct() as any[]

    const options = useMemo(
        () =>
            allProducts
                .filter((p) => p.handle && p.slug && !excludeHandles.includes(p.handle))
                .map((p) => ({
                    label: p.name,
                    value: p.handle,
                    color: p.color,
                    icon: p.Icon ? <p.Icon className={`size-4 text-${p.color}`} /> : undefined,
                })),
        [allProducts, excludeHandles]
    )

    const handleChange = (handle: string) => {
        if (handle === activeHandle) return
        const target = allProducts.find((p) => p.handle === handle)
        if (!target?.slug) return
        const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''
        navigate(getProductSurfaceUrl(currentPath, target.slug))
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
            className="font-bold text-black dark:text-primary"
            optionClassName="!px-2 !py-1 !text-[13px]"
            dataScheme="primary"
            chrome={false}
        />
    )
}

export default ProductSwitcher
