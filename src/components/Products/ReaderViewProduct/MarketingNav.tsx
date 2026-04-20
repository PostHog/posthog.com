import React from 'react'
import ElementScrollLink, { ScrollSpyProvider } from 'components/ElementScrollLink'
import { MarketingNavItem } from './types'

interface MarketingNavProps {
    items: MarketingNavItem[]
    /**
     * Ref to the wrapping element that contains the `<section id="..." />` nodes.
     * `ElementScrollLink` walks up from this element to find the nearest
     * scrollable Radix ScrollArea viewport and scrolls within it.
     */
    contentRef: React.RefObject<HTMLElement>
}

/**
 * In-page anchor menu rendered on the product's About surface. Each item
 * scrolls smoothly to its corresponding `<section id={slug}>` inside the
 * shared ScrollArea viewport, with ScrollSpy-driven active-item highlighting.
 */
const MarketingNav = ({ items, contentRef }: MarketingNavProps) => {
    return (
        <ScrollSpyProvider>
            <nav>
                <ul className="list-none m-0 p-0 flex flex-col gap-px">
                    {items.map(({ slug, name, icon }) => (
                        <li key={slug} className="m-0 p-0">
                            <ElementScrollLink
                                id={slug}
                                element={contentRef}
                                className="w-full px-2 py-1 rounded hover:bg-accent"
                                label={
                                    <span className="inline-flex items-center gap-2">
                                        {icon && <span className="size-4 inline-flex">{icon}</span>}
                                        {name}
                                    </span>
                                }
                            />
                        </li>
                    ))}
                </ul>
            </nav>
        </ScrollSpyProvider>
    )
}

export default MarketingNav
