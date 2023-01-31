import React from 'react'
import Scrollspy from 'react-scrollspy'
import { flattenMenu } from '../../../gatsby/utils'
import { usePost } from './hooks'
import Menu from './Menu'
import { IMenu } from './types'

export default function TableOfContents({
    handleLinkClick,
}: {
    handleLinkClick?: () => void
    title?: string | boolean
}): JSX.Element | null {
    const { menu, menuType = 'standard' } = usePost()
    if (!menu) return null
    const Wrapper = {
        standard: React.Fragment,
        scroll: Scrollspy,
    }[menuType]

    const wrapperProps = {
        standard: {},
        scroll: {
            componentTag: 'div',
            offset: -50,
            items: flattenMenu(menu)?.map((navItem: IMenu) => navItem.url),
            currentClassName: 'bg-gray-accent-light',
        },
    }[menuType]

    return (
        <nav>
            <Wrapper {...wrapperProps}>
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
            </Wrapper>
        </nav>
    )
}
