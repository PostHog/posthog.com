import React from 'react'
import Link from 'components/Link'
import { AppIcon, isAppIconName } from 'components/OSIcons/AppIcon'

/**
 * Icon + name pill linking to a tool's page. Icon resolution (`parentIcon` via
 * `AppIcon`, else the product's `Icon` component) matches the `PairsWith`
 * section so cross-tool references look the same everywhere.
 */
export const ToolChip = ({ product, className = '' }: { product: any; className?: string }): JSX.Element => (
    <Link
        to={`/${product.slug}`}
        state={{ newWindow: true }}
        className={`inline-flex items-center gap-1.5 rounded-sm border border-primary bg-accent px-1.5 py-1 text-xs font-semibold text-primary hover:border-secondary ${className}`}
    >
        <span className={`inline-block size-4 ${product.color ? `text-${product.color}` : 'text-primary opacity-50'}`}>
            {product.parentIcon && isAppIconName(product.parentIcon) ? (
                <AppIcon name={product.parentIcon} />
            ) : (
                product.Icon && <product.Icon />
            )}
        </span>
        {product.name}
    </Link>
)

/**
 * Resolves tool handles against a product list (e.g. the `allProducts` prop
 * every product-page section receives) and renders a chip for each. Unknown
 * handles are dropped rather than rendered as a broken link.
 */
export const ToolChips = ({
    handles,
    products,
    label,
    className = '',
}: {
    handles?: string[]
    products?: any[]
    label?: string
    className?: string
}): JSX.Element | null => {
    // Some entries (e.g. the inbox) intentionally have no slug and aren't linkable.
    const tools = (handles ?? [])
        .map((handle) => products?.find((product: any) => product.handle === handle))
        .filter((product: any) => product?.slug)

    if (!tools.length) return null

    return (
        <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
            {label && <span className="text-xs font-semibold uppercase tracking-wide text-secondary">{label}</span>}
            {tools.map((tool: any) => (
                <ToolChip key={tool.handle} product={tool} />
            ))}
        </div>
    )
}

export default ToolChip
