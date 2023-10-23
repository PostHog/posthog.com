import React from 'react'
import InternalSidebarLink from './InternalSidebarLink'

export default function InternalSidebar({ tableOfContents }) {
    return (
        tableOfContents?.length > 0 && (
            <div className="">
                <p className="bg-accent dark:bg-accent-dark border-y border-border dark:border-border-dark py-1 px-4 text-sm mt-0 xl:!mb-2 !mb-0 font-semibold text-opacity-50 sticky top-[calc(-1rem_-_1px)] xl:border-x-0 border-x xl:rounded-none rounded-md rounded-br-none rounded-bl-none">
                    On this page
                </p>
                <ul className="list-none m-0 p-0 xl:py-0 py-4 flex flex-col xl:max-h-none max-h-64 overflow-auto xl:!bg-transparent bg-accent dark:bg-accent-dark xl:border-none border border-border dark:border-dark rounded-bl-md rounded-br-md">
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
