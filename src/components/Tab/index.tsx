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

Tab.Group = function TabGroup({ children }) {
    return (
        <HeadlessTab.Group as="div" className="my-6">
            {children}
        </HeadlessTab.Group>
    )
}

Tab.List = function TabList({ children }) {
    return <HeadlessTab.List className="space-x-3 flex items-center flex-wrap">{children}</HeadlessTab.List>
}

Tab.Panels = function TabPanels({ children }) {
    return <HeadlessTab.Panels className="mt-4">{children}</HeadlessTab.Panels>
}

Tab.Panel = HeadlessTab.Panel

export default Tab
