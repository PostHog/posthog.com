import React, { useState } from 'react'
import Scrollspy from 'react-scrollspy'
import { Link } from 'react-scroll'

export default function InternalSidebar({ tableOfContents, className = '' }) {
    const [navBallLocation, setNavBallLocation] = useState(null)
    const [activeId, setActiveId] = useState(null)
    const handleInternalNavUpdate = (el) => {
        if (el) {
            const activeEl = document.querySelector('.active-link')
            setActiveId(el.id)
            setNavBallLocation(activeEl.offsetTop + 7)
        }
    }
    return (
        <aside className={`relative ${className}`}>
            <div className="xl:pl-7">
                <div
                    style={{ top: navBallLocation || 0, left: -5 }}
                    className="bg-almost-black dark:bg-white rounded-full w-2 h-2 z-10 absolute transition-all hidden xl:block"
                />
                <p className="text-gray opacity-100 dark:text-white text-base mt-0 mb-4 font-bold">On this page</p>
                <Scrollspy
                    offset={-88}
                    onUpdate={handleInternalNavUpdate}
                    className="list-none m-0 p-0 flex flex-col space-y-2"
                    items={tableOfContents?.map((navItem) => navItem.url)}
                    currentClassName="active-link"
                >
                    {tableOfContents?.map((navItem, index) => {
                        return (
                            <li key={index}>
                                <Link
                                    style={activeId === navItem.url ? { opacity: '1' } : {}}
                                    offset={-88}
                                    smooth
                                    duration={300}
                                    to={navItem.url}
                                    className={`jumpTo hover:opacity-100 xl:opacity-60 text-[15px] pl-6 xl:pl-0 text-almost-black hover:text-orange dark:text-white dark:hover:text-orange`}
                                >
                                    {navItem.name}
                                </Link>
                            </li>
                        )
                    })}
                </Scrollspy>
            </div>
        </aside>
    )
}
