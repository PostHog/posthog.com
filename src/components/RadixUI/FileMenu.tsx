import React, { useState, useCallback, useEffect, useMemo } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as RadioGroup from '@radix-ui/react-radio-group'
import * as Icons from '@posthog/icons'
import { IMenu } from 'components/PostLayout/types'
import { Link, navigate } from 'gatsby'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'

// --- Data Structure ---

// Custom hook to process file data and provide utility functions
function useFileData(sampleData: IMenu[]) {
    const rootItems: IMenu[] = []

    function processData(items: IMenu[], parentId: IMenu | null = null) {
        items.forEach((item) => {
            if (!parentId) {
                rootItems.push(item)
            }
            if (item.children) {
                processData(item.children, item)
            }
        })
    }

    processData(sampleData) // Process sample data into a structure for easier lookup

    const getItemChildren = useCallback((item: IMenu | null): IMenu[] => {
        if (item === null) return rootItems // Root level
        return item.children || []
    }, [])

    return { getItemChildren }
}

// --- Components ---

interface FileColumnProps {
    items: IMenu[]
    selectedId: number | null
    onSelect: (id: number) => void
}

const FileColumn: React.FC<FileColumnProps> = ({ items, selectedId, onSelect }) => {
    return (
        <ScrollArea.Root className="h-full w-64 border-r border-primary flex-shrink-0">
            <ScrollArea.Viewport className="h-full w-full rounded-lg p-1">
                <RadioGroup.Root
                    value={selectedId?.toString() ?? ''}
                    onValueChange={onSelect}
                    className="flex flex-col space-y-px"
                >
                    {items.map((item, index) => {
                        const isSelected = index === selectedId
                        return (
                            <RadioGroup.Item
                                key={index}
                                value={index.toString()}
                                className="group relative flex select-none items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none data-[state=checked]:bg-accent dark:data-[state=checked]:bg-accent-dark hover:bg-accent dark:hover:bg-accent-dark/50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:relative focus:z-10 focus:ring-1 focus:ring-border dark:focus:ring-border-dark"
                            >
                                <div className="flex items-center space-x-2 truncate">
                                    {/* Using IconCode as folder placeholder due to persistent linter issues with IconFolder */}
                                    {item.children ? (
                                        <Icons.IconCode className="w-4 h-4 text-secondary dark:text-secondary-dark flex-shrink-0" />
                                    ) : (
                                        <Icons.IconDocument className="w-4 h-4 text-secondary dark:text-secondary-dark flex-shrink-0" />
                                    )}
                                    <span className="truncate text-primary dark:text-primary-dark">{item.name}</span>
                                </div>
                                {item.children && (
                                    <Icons.IconChevronRight className="w-4 h-4 text-secondary dark:text-secondary-dark opacity-50 group-data-[state=checked]:opacity-100 flex-shrink-0" />
                                )}
                                {/* Hidden radio indicator - Radix handles state */}
                                <div className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 hidden">
                                    <RadioGroup.Indicator className="flex items-center justify-center">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary dark:bg-primary-dark"></div>
                                    </RadioGroup.Indicator>
                                </div>
                            </RadioGroup.Item>
                        )
                    })}
                </RadioGroup.Root>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
                className="flex select-none touch-none p-0.5 bg-black/5 transition-colors duration-[160ms] ease-out data-[orientation=vertical]:w-2 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                orientation="vertical"
            >
                <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-border dark:bg-border-dark before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
        </ScrollArea.Root>
    )
}

export const FileMenu: React.FC<{ initialPath?: IMenu[]; menu: IMenu[] }> = ({ initialPath = [], menu }) => {
    const { appWindow } = useWindow()
    const { compact, isMobile } = useApp()
    const { getItemChildren } = useFileData(menu)
    const [path, setPath] = useState<(IMenu | null)[]>([null, ...initialPath]) // Start with null for root

    useEffect(() => {
        const findPath = (items: IMenu[], targetPath: string, currentPath: IMenu[] = []): IMenu[] | null => {
            for (const item of items) {
                const newPath = [...currentPath, item]
                if (item.url?.split('?')[0] === targetPath) {
                    return newPath
                }
                if (item.children) {
                    const foundPath = findPath(item.children, targetPath, newPath)
                    if (foundPath) {
                        return foundPath
                    }
                }
            }
            return null
        }

        const currentPathname = appWindow?.path || ''
        const foundPath = findPath(menu, currentPathname)

        if (foundPath) {
            setPath([null, ...foundPath])
        }
    }, [menu])

    const handleSelect = useCallback(
        (columnIndex: number, item: IMenu) => {
            if (item.url && !item.children) {
                return navigate(item.url)
            }
            const newPath = path.slice(0, columnIndex + 1) // Trim path up to the current column index
            newPath.push(item) // Add the newly selected item

            setPath(newPath)
        },
        [path]
    )

    const columns = useMemo(() => {
        const columns: { items: IMenu[]; selectedItem: IMenu | null }[] = []
        for (let i = 0; i < path.length; i++) {
            const parentItem = path[i] // The item selected in the previous column (or null for root)
            const items = getItemChildren(parentItem)
            const selectedItemInNextCol = i + 1 < path.length ? path[i + 1] : null // What's selected in the column *we are generating*

            // Only add a column if the parent was a folder (or root)
            if (i === 0 || (parentItem && parentItem.children)) {
                columns.push({ items, selectedItem: selectedItemInNextCol })
            }

            // Stop adding columns if the last selected item was a file
            if (parentItem && !parentItem.children) {
                break
            }
        }
        return columns
    }, [path])

    // Determine if the very last selected item in the path is a file to show a preview
    const lastSelectedItem = path[path.length - 1]
    const showPreview = lastSelectedItem && !lastSelectedItem.children

    return (
        <div
            data-scheme="primary"
            className="h-72 w-full border border-primary rounded-md overflow-hidden bg-bg-light dark:bg-bg-dark"
        >
            <div className="flex h-full">
                {columns.map((col, index) => (
                    <FileColumn
                        key={index} // Using index is okay here as columns are added/removed predictably
                        items={col.items}
                        selectedId={col.selectedItem ? col.items.indexOf(col.selectedItem) : null}
                        onSelect={(itemId) => handleSelect(index, col.items[itemId])}
                    />
                ))}
                {/* Optional File Preview Column */}
                {showPreview && lastSelectedItem && (
                    <div className="h-full w-64 border-r border-primary flex-shrink-0 p-4">
                        <h3 className="text-lg font-semibold text-primary dark:text-primary-dark mb-2">
                            {lastSelectedItem.name}
                        </h3>
                        <p className="text-sm text-secondary dark:text-secondary-dark mb-2">
                            Type: {lastSelectedItem.children ? 'folder' : 'file'}
                        </p>
                        {/* Add more file details here */}
                    </div>
                )}
            </div>
        </div>
    )
}

export default FileMenu
