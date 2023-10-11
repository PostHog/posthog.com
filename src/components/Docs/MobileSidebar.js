import React from 'react'
import InternalSidebarLink from './InternalSidebarLink'

export default function InternalSidebar({ tableOfContents, mobile = true }) {
    return (
        tableOfContents?.length > 0 && (
            <div className="">
                <p className="bg-accent dark:bg-accent-dark border-y border-border dark:border-border-dark py-1 px-4 text-sm mt-0 mb-2 font-semibold text-opacity-50 sticky top-[calc(-1rem_-_1px)]">
                    On this page
                </p>
                <ul className="list-none m-0 p-0 flex flex-col pr-1">
                    {tableOfContents?.map((navItem, index) => {
                        return (
                            <li key={index}>
                                <InternalSidebarLink
                                    url={navItem.url}
                                    name={navItem.value}
                                    depth={navItem.depth}
                                    className="text-sm"
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    )
}
