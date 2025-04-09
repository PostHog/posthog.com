import React, { useState, useCallback, useMemo } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Icons from '@posthog/icons';

// --- Data Structure ---
interface FileItem {
    id: string;
    name: string;
    type: 'folder' | 'file';
    children?: FileItem[];
}

interface FileMenuProps {
    initialPath?: string[];
    menuData?: FileItem[];
}

// --- Components ---

interface FileColumnProps {
    items: FileItem[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

const FileColumn: React.FC<FileColumnProps> = ({ items, selectedId, onSelect }) => {
    return (
        <ScrollArea.Root className="h-full w-64 border-r border-border dark:border-border-dark flex-shrink-0">
            <ScrollArea.Viewport className="h-full w-full rounded-lg p-1">
                <RadioGroup.Root
                    value={selectedId ?? ''}
                    onValueChange={onSelect}
                    className="flex flex-col space-y-px"
                >
                    {items.map((item) => {
                        const isSelected = item.id === selectedId;
                        return (
                            <RadioGroup.Item
                                key={item.id}
                                value={item.id}
                                className="group relative flex select-none items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none data-[state=checked]:bg-accent dark:data-[state=checked]:bg-accent-dark hover:bg-accent/50 dark:hover:bg-accent-dark/50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:relative focus:z-10 focus:ring-1 focus:ring-border dark:focus:ring-border-dark"
                            >
                                <div className="flex items-center space-x-2 truncate">
                                    {/* Using IconCode as folder placeholder due to persistent linter issues with IconFolder */}
                                    {item.type === 'folder' ? (
                                        <Icons.IconCode className="w-4 h-4 text-secondary dark:text-secondary-dark flex-shrink-0" />
                                    ) : (
                                        <Icons.IconDocument className="w-4 h-4 text-secondary dark:text-secondary-dark flex-shrink-0" />
                                    )}
                                    <span className="truncate text-primary dark:text-primary-dark">{item.name}</span>
                                </div>
                                {item.type === 'folder' && (
                                    <Icons.IconChevronRight className="w-4 h-4 text-secondary dark:text-secondary-dark opacity-50 group-data-[state=checked]:opacity-100 flex-shrink-0" />
                                )}
                                {/* Hidden radio indicator - Radix handles state */}
                                <div className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 hidden">
                                    <RadioGroup.Indicator className="flex items-center justify-center">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary dark:bg-primary-dark"></div>
                                    </RadioGroup.Indicator>
                                </div>
                            </RadioGroup.Item>
                        );
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
    );
};

export function FileMenu({ initialPath = [], menuData }: FileMenuProps) {
    const [selectedPath, setSelectedPath] = useState<string[]>(initialPath);

    console.log("FileMenu received menuData:", menuData);
    console.log("FileMenu initialPath:", initialPath);
    console.log("FileMenu selectedPath:", selectedPath);

    // Process the menu data into a map for easier lookup
    const menuMap = useMemo(() => {
        const map = new Map<string, FileItem>();
        const processItems = (items: FileItem[], parentPath: string[] = []) => {
            items.forEach((item) => {
                const path = [...parentPath, item.name];
                map.set(path.join('/'), item);
                if (item.children) {
                    processItems(item.children, path);
                }
            });
        };
        if (menuData) {
            processItems(menuData);
        }
        console.log("FileMenu processed menuMap:", map);
        return map;
    }, [menuData]);

    // Get items for a specific path
    const getItemsForPath = (path: string[]): FileItem[] => {
        if (path.length === 0) {
            return menuData || [];
        }
        const parentKey = path.join('/');
        const parent = menuMap.get(parentKey);
        return parent?.children || [];
    };

    const handleSelect = useCallback((columnIndex: number, itemId: string) => {
        const selectedItem = menuMap.get(selectedPath.slice(0, columnIndex + 1).join('/'));
        const newPath = selectedPath.slice(0, columnIndex + 1); // Trim path up to the current column index
        newPath[columnIndex] = selectedItem?.name || ''; // Ensure the path is updated with the correct name

        if (selectedItem?.type === 'folder') {
            newPath.push(''); // Prepare for the next level
        }

        setSelectedPath(newPath);
    }, [selectedPath, menuMap]);

    // Function to calculate the maximum depth of the menuData
    const calculateMaxDepth = (items: FileItem[], currentDepth = 0): number => {
        return items.reduce((maxDepth, item) => {
            const itemDepth = item.children ? calculateMaxDepth(item.children, currentDepth + 1) : currentDepth;
            return Math.max(maxDepth, itemDepth);
        }, currentDepth);
    };

    const maxDepth = useMemo(() => calculateMaxDepth(menuData || []), [menuData]);

    const columns: { items: FileItem[]; selectedId: string | null }[] = [];
    for (let i = 0; i < maxDepth; i++) {
        const currentPath = selectedPath.slice(0, i);
        const items = getItemsForPath(currentPath);
        const selectedIdInNextCol = (i < selectedPath.length) ? selectedPath[i] : null;

        columns.push({ items, selectedId: selectedIdInNextCol });
    }

    console.log("FileMenu columns:", columns);

    // Determine if the very last selected item in the path is a file to show a preview
    const lastSelectedId = selectedPath[selectedPath.length - 1];
    const lastSelectedItem = lastSelectedId ? menuMap.get(lastSelectedId) : null;
    const showPreview = lastSelectedItem?.type === 'file';

    return (
        <div data-scheme="primary" className="h-72 w-full border border-border dark:border-border-dark rounded-md overflow-hidden bg-bg-light dark:bg-bg-dark">
            <ScrollArea.Root className="h-full w-full" type="auto">
                <ScrollArea.Viewport className="h-full w-full">
                    <div className="flex h-full">
                        {columns.map((col, index) => (
                           <FileColumn
                                key={index} // Using index is okay here as columns are added/removed predictably
                                items={col.items}
                                selectedId={col.selectedId}
                                onSelect={(itemId) => handleSelect(index, itemId)}
                            />
                        ))}
                         {/* Optional File Preview Column */}
                        {showPreview && lastSelectedItem && (
                            <div className="h-full w-64 border-r border-border dark:border-border-dark flex-shrink-0 p-4">
                                <h3 className="text-lg font-semibold text-primary dark:text-primary-dark mb-2">{lastSelectedItem.name}</h3>
                                <p className="text-sm text-secondary dark:text-secondary-dark">Type: {lastSelectedItem.type}</p>
                                {/* Add more file details here */}
                            </div>
                        )}
                    </div>
                </ScrollArea.Viewport>
                 <ScrollArea.Scrollbar
                    className="flex select-none touch-none p-0.5 bg-black/5 transition-colors duration-[160ms] ease-out data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2"
                    orientation="horizontal"
                >
                    <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-border dark:bg-border-dark before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner />
            </ScrollArea.Root>
        </div>
    );
}

export default FileMenu;
