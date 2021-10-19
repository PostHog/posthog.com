import React from 'react'
import InternalSidebarLink from './InternalSidebarLink'

export default function InternalSidebar({ tableOfContents }) {
    return (
        <aside className="py-4 mb-10 border-gray-accent-light dark:border-gray-accent-dark border-dashed border-t border-b">
            <p className="text-gray opacity-100 dark:text-white text-base mt-0 mb-4 font-bold">On this page</p>
            <ul className="list-none m-0 p-0 flex flex-col space-y-2">
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
        </aside>
    )
}
