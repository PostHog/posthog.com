import React, { useEffect, useRef, useState } from 'react'
import Menu, { MenuItemType } from './Menu'

interface MainSidebarProps {
    slug: string
    menu: MenuItemType[]
    className?: string
    mainEl?: React.MutableRefObject<HTMLElement | null>
    height?: string | number
    sticky?: boolean
    top?: number
}

export default function MainSidebar({
    slug,
    menu,
    className,
    mainEl,
    height,
    sticky,
    top = 0,
}: MainSidebarProps): JSX.Element {
    const [navHeight, setNavHeight] = useState(height)
    const navEl = useRef<HTMLElement | null>(null)
    useEffect(() => {
        const isBrowser = typeof window !== 'undefined'
        if (!height && mainEl?.current && isBrowser) {
            const offset = top * 2
            const navHeight = Math.min(window.innerHeight - offset, mainEl.current.getBoundingClientRect().height)
            setNavHeight(navHeight)
        }
    }, [])
    return (
        <aside style={sticky ? { position: 'sticky', top } : {}} className={className}>
            <nav
                ref={navEl}
                style={{ maxHeight: navHeight || 'auto' }}
                className="w-[224px] overflow-y-auto overflow-x-hidden"
            >
                <Menu menu={menu} slug={slug} topLevel />
            </nav>
        </aside>
    )
}
