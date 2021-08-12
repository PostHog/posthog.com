import React from 'react'
import Menu from './Menu'

export default function MainSidebar({ slug, menu, className }) {
    return (
        <aside className={className}>
            <nav className="transition-opacity opacity-40 hover:opacity-100">
                <Menu menu={menu} slug={slug} />
            </nav>
        </aside>
    )
}
