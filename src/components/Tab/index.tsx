import React from 'react'
import { Tab as HeadlessTab } from '@headlessui/react'
import { classNames } from 'lib/utils'

export const Tab: React.FC & {
    Group: typeof HeadlessTab.Group
    List: typeof HeadlessTab.List
    Panels: typeof HeadlessTab.Panels
    Panel: typeof HeadlessTab.Panel
} = ({ children }) => {
    return (
        <HeadlessTab
            className={({ selected }) =>
                classNames(
                    selected ? 'bg-orange text-white' : 'bg-white',
                    'px-4 py-1.5 rounded shadow-sm text-sm font-medium whitespace-nowrap'
                )
            }
        >
            {children}
        </HeadlessTab>
    )
}

const TabGroup: typeof HeadlessTab.Group = ({ children }) => {
    return (
        <HeadlessTab.Group as="div" className="my-6">
            {children}
        </HeadlessTab.Group>
    )
}

TabGroup.displayName = 'TabGroup'

const TabList: typeof HeadlessTab.List = ({ children, className, ...props }) => {
    return (
        <HeadlessTab.List {...props} className={`space-x-3 flex items-center flex-wrap ${className}`}>
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
