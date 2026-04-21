import React from 'react'
import Link from 'components/Link'
import ElementScrollLink, { ScrollSpyProvider } from 'components/ElementScrollLink'
import { ProductNavItem } from './types'

interface ProductNavProps {
    items: ProductNavItem[]
    /**
     * Path of the product surface that hosts the sections (e.g. `/session-replay`
     * or `/session-replay/pricing`). Used to build cross-page links and as the
     * landing target for the `'overview'` shortcut.
     */
    basePath: string
    /**
     * When provided, the nav renders as an in-page anchor menu inside the
     * shared radix `ScrollArea` viewport (smooth scroll + ScrollSpy active
     * highlighting). Pass the ref of the element that wraps the
     * `<section id="..." />` nodes. Omit when rendering on a page that does
     * NOT host these sections — items become cross-page Gatsby links to
     * `${basePath}#${slug}`.
     */
    contentRef?: React.RefObject<HTMLElement>
}

const linkClassName = 'block w-full px-2 py-1 rounded text-sm text-secondary hover:text-primary hover:bg-accent'

/**
 * Combined product nav, used in both contexts:
 *
 * - When `contentRef` is provided (the user is on the surface that hosts the
 *   sections): items use in-page anchor scrolling via `ElementScrollLink`,
 *   wrapped in `ScrollSpyProvider` so the active item highlights as the user
 *   scrolls.
 * - When `contentRef` is omitted (e.g. the user is on the docs page looking
 *   at the About menu): items are Gatsby `<Link>`s to `${basePath}#${slug}`
 *   so navigation + anchor jump are handled by the browser.
 *
 * Special case: the `'overview'` slug always lands at the top of the surface
 * — in-page mode scrolls the viewport to 0 (and clears the URL hash); cross-
 * page mode links to `basePath` itself with no hash.
 */
const ProductNav = ({ items, basePath, contentRef }: ProductNavProps) => {
    const inPage = !!contentRef

    const scrollToTop = () => {
        const node = contentRef?.current
        const viewport = node?.closest('[data-radix-scroll-area-viewport]') as HTMLElement | null
        if (viewport) {
            viewport.scrollTo({ top: 0, behavior: 'smooth' })
        } else if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        if (typeof window !== 'undefined' && window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname + window.location.search)
        }
    }

    const list = (
        <nav>
            <ul className="list-none m-0 p-0 flex flex-col gap-px">
                {items.map(({ slug, name, icon }) => {
                    const label = (
                        <span className="inline-flex items-center gap-2">
                            {icon && <span className="size-4 inline-flex">{icon}</span>}
                            {name}
                        </span>
                    )

                    let trigger: React.ReactNode

                    if (slug === 'overview') {
                        trigger = inPage ? (
                            <button type="button" onClick={scrollToTop} className={`text-left ${linkClassName}`}>
                                {label}
                            </button>
                        ) : (
                            <Link to={basePath} className={linkClassName}>
                                {label}
                            </Link>
                        )
                    } else if (inPage) {
                        trigger = (
                            <ElementScrollLink
                                id={slug}
                                element={contentRef!}
                                className="w-full px-2 py-1 rounded hover:bg-accent"
                                label={label}
                            />
                        )
                    } else {
                        trigger = (
                            <Link to={`${basePath}#${slug}`} className={linkClassName}>
                                {label}
                            </Link>
                        )
                    }

                    return (
                        <li key={slug} className="m-0 p-0">
                            {trigger}
                        </li>
                    )
                })}
            </ul>
        </nav>
    )

    return inPage ? <ScrollSpyProvider>{list}</ScrollSpyProvider> : list
}

export default ProductNav
