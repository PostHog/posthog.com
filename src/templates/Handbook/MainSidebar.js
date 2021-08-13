import React from 'react'
import Menu from './Menu'

export default function MainSidebar({ slug, menu, className }) {
    return (
        <aside className={className}>
            <nav className="w-[224px]">
                <Menu menu={menu} slug={slug} />
            </nav>
        </aside>
    )
}
