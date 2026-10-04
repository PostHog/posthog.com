import React from 'react'
import { usePost } from './hooks'
import Menu from './Menu'

export default function TableOfContents({
    handleLinkClick,
}: {
    handleLinkClick?: () => void
    title?: string | boolean
}): JSX.Element | null {
    const { menu, menuType = 'standard' } = usePost()
    if (!menu) return null
    return (
        <nav>
            {menu.map((menuItem) => {
                return (
                    <Menu
                        menuType={menuType}
                        topLevel
                        handleLinkClick={handleLinkClick}
                        className="ml-0"
                        key={menuItem.name}
                        {...menuItem}
                    />
                )
            })}
        </nav>
    )
}
