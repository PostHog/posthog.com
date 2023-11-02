import React, { useEffect, useRef, useState } from 'react'
import Scrollspy from 'react-scrollspy'
import InternalSidebarLink from './InternalSidebarLink'

export default function StickySidebar({ tableOfContents, className = '', top = 0 }) {
    const [navBallLocation, setNavBallLocation] = useState(null)
    const [navStyle, setNavStyle] = useState(null)
    const [activeId, setActiveId] = useState(null)
    const navRef = useRef(null)
    const contentRef = useRef(null)
    const handleInternalNavUpdate = (el) => {
        if (el) {
            setActiveId(el.id)
            const activeEl = document.querySelector('.active-link')
            activeEl && setNavBallLocation(activeEl.offsetTop + 7)
        }
    }
    useEffect(() => {
        const isBrowser = typeof window !== 'undefined'
        if (navRef && contentRef && isBrowser) {
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
            className="self-stretch flex-1 relative hidden xl:block"
        >
            <aside style={navStyle} className="sticky flex flex-col pb-14 overflow-y-auto ml-[-5px] pl-[5px]">
                <div ref={contentRef} className="pl-7 mt-auto">
                    <div
                        style={{
                            top: navBallLocation || 0,
                            left: 0,
                            opacity: navBallLocation ? 1 : 0,
                        }}
                        className="bg-primary-dark dark:bg-primary rounded-full w-2 h-2 z-10 absolute transition-all"
                    />
                    <p className="text-primary/75 opacity-100 dark:text-primary-dark/75 text-lg mt-0 mb-4 font-bold">
                        On this page
                    </p>
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
                                    name={navItem.value}
                                    depth={navItem.depth}
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
