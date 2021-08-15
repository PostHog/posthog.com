import React, { useEffect, useRef, useState } from 'react'
import Menu from './Menu'

export default function MainSidebar({ slug, menu, className, mainEl, height }) {
    const [navHeight, setNavHeight] = useState(height)
    const navEl = useRef()
    useEffect(() => {
        const isBrowser = typeof window !== 'undefined'
        if (!height && mainEl && isBrowser) {
            const offSet = 90
            const distanceFromTop = navEl.current.getBoundingClientRect().top
            const navHeight = Math.min(
                window.innerHeight - distanceFromTop - offSet,
                mainEl.current.getBoundingClientRect().height
            )
            setNavHeight(navHeight)
        }
    }, [])
    return (
        <aside className={className}>
            <nav
                ref={navEl}
                style={{ height: navHeight || 'auto' }}
                className="w-[224px] overflow-y-auto overflow-x-hidden"
            >
                <Menu menu={menu} slug={slug} topLevel />
            </nav>
        </aside>
    )
}
