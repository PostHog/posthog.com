import React from 'react'
import Link from 'components/Link'
import ElementScrollLink, { ScrollSpyProvider } from 'components/ElementScrollLink'
import { ProductNavItem } from './types'

interface ProductNavProps {
    items: ProductNavItem[]
    basePath: string
    contentRef?: React.RefObject<HTMLElement>
}

const linkClass = 'block w-full px-2 py-1 rounded text-sm text-secondary hover:text-primary hover:bg-accent'

const NavItemLabel = ({ name, icon }: Pick<ProductNavItem, 'name' | 'icon'>) => (
    <span className="inline-flex items-center gap-2">
        {icon && <span className="size-4 inline-flex">{icon}</span>}
        <span data-sidebar-label>{name}</span>
    </span>
)

const NavItem = ({ slug, name, icon, basePath, contentRef }: ProductNavItem & Omit<ProductNavProps, 'items'>) => {
    if (!contentRef) {
        return (
            <Link to={slug === 'overview' ? basePath : `${basePath}#${slug}`} className={linkClass}>
                <NavItemLabel name={name} icon={icon} />
            </Link>
        )
    }

    return (
        <ElementScrollLink
            id={slug}
            element={contentRef}
            className={linkClass}
            label={<NavItemLabel name={name} icon={icon} />}
        />
    )
}

const ProductNav = (props: ProductNavProps) => (
    <ScrollSpyProvider>
        <nav>
            <ul className="list-none m-0 p-0 flex flex-col gap-px">
                {props.items.map((item) => (
                    <li key={item.slug} className="m-0 p-0">
                        <NavItem {...item} basePath={props.basePath} contentRef={props.contentRef} />
                    </li>
                ))}
            </ul>
        </nav>
    </ScrollSpyProvider>
)

export default ProductNav
