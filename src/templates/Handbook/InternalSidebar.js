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
                    className="bg-[#200935] dark:bg-white rounded-full w-2 h-2 z-10 absolute transition-all hidden xl:block"
                />
                <p className="text-light-purple text-base mt-0 mb-4 font-bold">On this page</p>
                <Scrollspy
                    offset={-88}
                    onUpdate={handleInternalNavUpdate}
                    className="list-none m-0 p-0 flex flex-col space-y-2"
                    items={tableOfContents?.map((navItem) => navItem.url)}
                    currentClassName="active-link"
                >
                    {tableOfContents?.map((navItem, index) => {
                        return (
                            <li
                                style={activeId === navItem.url ? { opacity: '1' } : {}}
                                className="hover:opacity-100 xl:opacity-60 text-[15px]"
                                key={index}
                            >
                                <Link
                                    offset={-88}
                                    smooth
                                    duration={300}
                                    to={navItem.url}
                                    className={`text-[#200935] hover:text-[#200935] dark:text-white dark:hover:text-white`}
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
