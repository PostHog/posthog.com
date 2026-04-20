import React from 'react'
import Link from 'components/Link'
import { MarketingNavItem } from './types'

interface ProductNavProps {
    items: MarketingNavItem[]
    /**
     * Path of the product's About surface (e.g. `/session-replay`). Each item
     * renders as `<Link to={`${basePath}#${slug}`}>` so Gatsby handles the
     * cross-page navigation and anchor scroll.
     */
    basePath: string
}

/**
 * Combined product nav, rendered on surfaces that are NOT the product's About
 * page (e.g., the Docs page, and eventually tutorials / community questions /
 * other product-related surfaces). Each item navigates to the corresponding
 * anchor on the About page. Same visual shape as `MarketingNav`, but uses
 * cross-page Gatsby links instead of in-page scroll.
 */
const ProductNav = ({ items, basePath }: ProductNavProps) => {
    return (
        <nav>
            <ul className="list-none m-0 p-0 flex flex-col gap-px">
                {items.map(({ slug, name, icon }) => (
                    <li key={slug} className="m-0 p-0">
                        <Link
                            to={`${basePath}#${slug}`}
                            className="block w-full px-2 py-1 rounded text-sm text-secondary hover:text-primary hover:bg-accent"
                        >
                            <span className="inline-flex items-center gap-2">
                                {icon && <span className="size-4 inline-flex">{icon}</span>}
                                {name}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default ProductNav
