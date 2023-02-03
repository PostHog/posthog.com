import React, { useEffect, useState } from 'react'
import { Tab as HeadlessTab } from '@headlessui/react'
import { classNames } from 'lib/utils'

export const Tab: React.FC & {
    Group: typeof HeadlessTab.Group
    List: typeof HeadlessTab.List
    Panels: typeof HeadlessTab.Panels
    Panel: typeof HeadlessTab.Panel
    count?: string
} = ({ count, children }) => {
    return (
        <HeadlessTab
            className={({ selected }) =>
                classNames(
                    selected
                        ? 'text-red font-bold after:h-[2px] after:bg-red after:bottom-[calc(-.25rem_-_3px)] after:content-[""] after:absolute after:left-0 after:right-0'
                        : 'border-transparent text-primary/75 dark:text-primary-dark/75 hover:border-gray-accent-light hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark/25',
                    'px-3 py-1.5 mb-1.5 text-sm font-semibold whitespace-nowrap rounded relative hover:scale-[1.01] active:scale-[.99] group'
                )
            }
        >
            {children}
            {count && (
                <span className="ml-2 bg-gray-accent/50 dark:bg-gray-accent-dark/50 text-sm text-primary/60 dark:text-primary-dark/60 group-hover:text-primary/75 dark:group-hover:text-primary-dark/75 font-bold rounded-xl px-2 py-1">
                    {count}
                </span>
            )}
        </HeadlessTab>
    )
}

const TabGroup: typeof HeadlessTab.Group = ({ children, tabs }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const hasTabs = tabs?.length > 0

    const handleChange = (index: number) => {
        if (hasTabs && typeof window !== 'undefined') {
            const url = new URL(window.location)
            url.searchParams.set('tab', tabs[index])
            window.history.pushState({}, '', url)
        }
        setSelectedIndex(index)
    }

    useEffect(() => {
        if (hasTabs && typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search)
            setSelectedIndex(tabs.indexOf(params.get('tab')))
        }
    }, [])

    return (
        <HeadlessTab.Group selectedIndex={selectedIndex} onChange={handleChange} as="div" className="my-4">
            {children}
        </HeadlessTab.Group>
    )
}

TabGroup.displayName = 'TabGroup'

const TabList: typeof HeadlessTab.List = ({ children, className, ...props }) => {
    return (
        <HeadlessTab.List
            {...props}
            className={`flex whitespace-nowrap gap-x-[1px] border-b border-gray-accent-light dark:border-gray-accent-dark ${className}`}
        >
            {children}
        </HeadlessTab.List>
    )
}

TabList.displayName = 'TabList'

const TabPanels: typeof HeadlessTab.Panels = ({ children }) => {
    return <HeadlessTab.Panels className="mt-4">{children}</HeadlessTab.Panels>
}

TabPanels.displayName = 'TabPanels'

Tab.Group = TabGroup
Tab.List = TabList
Tab.Panel = HeadlessTab.Panel
Tab.Panels = TabPanels

export default Tab
