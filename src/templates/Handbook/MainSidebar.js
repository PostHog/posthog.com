import React from 'react'
import Menu from './Menu'

export default function MainSidebar({ slug, menu }) {
    return (
        <aside className="hidden md:block flex-shrink-0 2xl:flex-1 sticky top-10 mb-14 max-w-[224px]">
            <nav className="transition-opacity opacity-40 hover:opacity-100">
                <Menu menu={menu} slug={slug} />
            </nav>
        </aside>
    )
}
