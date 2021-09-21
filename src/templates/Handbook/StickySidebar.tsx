import React, { useState, useEffect, useRef, CSSProperties } from 'react'
import Scrollspy from 'react-scrollspy'
import InternalSidebarLink from './InternalSidebarLink'
import { MenuItemType } from './Menu'

interface StickySidebarProps {
    tableOfContents: MenuItemType[]
    top?: number
    reportScrollUpdated: (id: string) => void
}

export default function StickySidebar({
    tableOfContents,
    top = 0,
    reportScrollUpdated,
}: StickySidebarProps): JSX.Element {
    const [navBallLocation, setNavBallLocation] = useState<number | null>(null)
    const [navStyle, setNavStyle] = useState<Partial<CSSProperties> | null>(null)
    const [activeId, setActiveId] = useState<string | null>(null)
    const navRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const handleInternalNavUpdate = (el: HTMLElement) => {
        if (el) {
            setActiveId(el.id)
            reportScrollUpdated?.(el.id)
            const activeEl = document.querySelector<HTMLElement>('.active-link')
            activeEl && setNavBallLocation(activeEl.offsetTop + 7)
        }
    }
    useEffect(() => {
        const isBrowser = typeof window !== 'undefined'
        if (navRef?.current && contentRef?.current && isBrowser) {
            const offset = top * 2
            const contentHeight = contentRef.current.offsetHeight
            const windowHeight = window.innerHeight
            const willOverflow = contentHeight > windowHeight - offset
            const height =
                windowHeight - (willOverflow ? offset : navRef.current.getBoundingClientRect().top + window.scrollY)
            const topPosition = willOverflow ? top : -height - -contentHeight + offset
            const style = {
                height,
                top: topPosition,
            }
            setNavStyle(style)
        }
    }, [])
    return (
        <div
            style={{ opacity: navStyle ? 1 : 0, transition: 'opacity .3s' }}
            ref={navRef}
            className="self-stretch flex-1 relative border-l border-dashed border-gray-accent-light dark:border-gray-accent-dark hidden xl:block"
        >
            <aside style={navStyle || {}} className="sticky flex flex-col pb-14 overflow-y-auto ml-[-5px] pl-[5px]">
                <div ref={contentRef} className="pl-7 mt-auto">
                    <div
                        style={{
                            top: navBallLocation || 0,
                            left: 0,
                            opacity: navBallLocation ? 1 : 0,
                        }}
                        className="bg-almost-black dark:bg-white rounded-full w-2 h-2 z-10 absolute transition-all"
                    />
                    <p className="text-gray opacity-100 dark:text-white text-base mt-0 mb-4 font-bold">On this page</p>
                    <Scrollspy
                        offset={-50}
                        onUpdate={handleInternalNavUpdate}
                        className="list-none m-0 p-0 flex flex-col space-y-2"
                        items={tableOfContents?.map((navItem) => navItem.url)}
                        currentClassName="active-link"
                    >
                        {tableOfContents?.map((navItem, index) => (
                            <li key={index}>
                                <InternalSidebarLink
                                    url={navItem.url}
                                    name={navItem.name}
                                    style={activeId === navItem.url ? { opacity: '1' } : {}}
                                    className="hover:opacity-100 opacity-60 text-[15px]"
                                />
                            </li>
                        ))}
                    </Scrollspy>
                </div>
            </aside>
        </div>
    )
}
