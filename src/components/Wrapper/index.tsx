import React, { useRef } from 'react'
import { useApp } from '../../context/App'
import Desktop from 'components/Desktop'
import TaskBarMenu from 'components/TaskBarMenu'
import AppWindow from 'components/AppWindow'
import { handbookSidebar, docsMenu } from '../../navs/index.js'

interface MenuItem {
    id: string
    name: string
    type: 'folder' | 'file'
    children?: MenuItem[]
}

// Function to select menu data based on context
const selectMenuData = (slug: string): MenuItem[] => {
    if (slug.startsWith('handbook')) {
        return handbookSidebar.map(transformToMenuItem);
    } else if (slug.startsWith('docs')) {
        return docsMenu.children.map(transformToMenuItem);
    }
    return [];
};

// Helper function to transform data to MenuItem
const transformToMenuItem = (item: any, index: number): MenuItem => ({
    id: item.url || `item-${index}`,
    name: item.name,
    type: item.children ? 'folder' : 'file',
    children: item.children?.map(transformToMenuItem),
});

export default function Wrapper() {
    const constraintsRef = useRef(null)
    const { windows } = useApp()
    const slug = window.location.pathname.substring(1)
    const menuData = selectMenuData(slug)

    return (
        <div className="fixed inset-0 size-full flex flex-col">
            <TaskBarMenu />
            <div ref={constraintsRef} className="flex-grow">
                <Desktop />
            </div>
            {windows.map((item) => (
                <AppWindow item={item} key={item.key} constraintsRef={constraintsRef} menuData={menuData} />
            ))}
        </div>
    )
}
