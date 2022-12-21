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
                    selected
                        ? 'text-red border-b-2 border-red'
                        : 'border-b-2 border-transparent hover:border-gray-accent-light',
                    'pt-3 pb-2.5 text-base -mb-px font-semibold whitespace-nowrap'
                )
            }
        >
            {children}
        </HeadlessTab>
    )
}

const TabGroup: typeof HeadlessTab.Group = ({ children }) => {
    return (
        <HeadlessTab.Group as="div" className="my-4">
            {children}
        </HeadlessTab.Group>
    )
}

TabGroup.displayName = 'TabGroup'

const TabList: typeof HeadlessTab.List = ({ children, className, ...props }) => {
    return (
        <HeadlessTab.List
            {...props}
            className={`space-x-6 flex whitespace-nowrap border-b border-gray-accent-light ${className}`}
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
