import React from 'react'
import InternalSidebarLink from './InternalSidebarLink'
import { Chevron } from 'components/Icons'

export default function InternalSidebar({ tableOfContents }) {
    return (
        <details className="group py-4 mb-10 border-gray-accent-light dark:border-gray-accent-dark border-dashed border-t border-b block lg:hidden">
            <summary className="text-gray opacity-100 dark:text-white text-base my-0 font-bold flex items-center justify-between cursor-pointer">
                <span>Jump to</span>
                <Chevron className="group-open:rotate-180 transition-transform duration-100 w-3 h-3" />
            </summary>
            <ul className="list-none mx-0 mt-2 p-0 flex flex-col space-y-1">
                {tableOfContents?.map((navItem, index) => {
                    return (
                        <li key={index}>
                            <InternalSidebarLink
                                url={navItem.url}
                                name={navItem.value}
                                depth={navItem.depth}
                                className="jumpTo text-[15px] pl-6"
                            />
                        </li>
                    )
                })}
            </ul>
        </details>
    )
}
