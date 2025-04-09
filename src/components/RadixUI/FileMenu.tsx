import React, { useState, useCallback } from 'react';
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

// Sample Data (Replace with your actual data source)
const sampleData: FileItem[] = [
    {
        id: 'docs',
        name: 'Documents',
        type: 'folder',
        children: [
            { id: 'work', name: 'Work', type: 'folder', children: [
                { id: 'report.pdf', name: 'report.pdf', type: 'file' },
                { id: 'notes.txt', name: 'notes.txt', type: 'file' },
            ]},
            { id: 'personal', name: 'Personal', type: 'folder', children: [
                { id: 'vacation.jpg', name: 'vacation.jpg', type: 'file' },
            ]},
            { id: 'resume.pdf', name: 'resume.pdf', type: 'file' },
        ],
    },
    {
        id: 'downloads',
        name: 'Downloads',
        type: 'folder',
        children: [
            { id: 'app.dmg', name: 'app.dmg', type: 'file' },
            { id: 'archive.zip', name: 'archive.zip', type: 'file' },
        ],
    },
    { id: 'image.png', name: 'image.png', type: 'file' },
];

const dataMap = new Map<string, FileItem>();
const rootItems: FileItem[] = [];

function processData(items: FileItem[], parentId: string | null = null) {
    items.forEach(item => {
        dataMap.set(item.id, item);
        if (!parentId) {
            rootItems.push(item);
        }
        if (item.children) {
            processData(item.children, item.id);
        }
    });
}
processData(sampleData); // Process sample data into a map for easier lookup

const getItemChildren = (itemId: string | null): FileItem[] => {
    if (itemId === null) return rootItems; // Root level
    const item = dataMap.get(itemId);
    return item?.type === 'folder' ? item.children || [] : [];
};

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


export const FileMenu: React.FC<{ initialPath?: string[] }> = ({ initialPath = [] }) => {
    const [path, setPath] = useState<(string | null)[]>([null, ...initialPath]); // Start with null for root

    const handleSelect = useCallback((columnIndex: number, itemId: string) => {
        const selectedItem = dataMap.get(itemId);
        const newPath = path.slice(0, columnIndex + 1); // Trim path up to the current column index
        newPath.push(itemId); // Add the newly selected item

        setPath(newPath);
    }, [path]);

    const columns: { items: FileItem[]; selectedId: string | null }[] = [];
    for (let i = 0; i < path.length; i++) {
        const parentId = path[i]; // The item selected in the previous column (or null for root)
        const items = getItemChildren(parentId);
        const selectedIdInNextCol = (i + 1 < path.length) ? path[i + 1] : null; // What's selected in the column *we are generating*

        // Only add a column if the parent was a folder (or root)
        if (i === 0 || (parentId && dataMap.get(parentId)?.type === 'folder')) {
             columns.push({ items, selectedId: selectedIdInNextCol });
        }

         // Stop adding columns if the last selected item was a file
         if (parentId && dataMap.get(parentId)?.type === 'file') {
            break;
        }
    }

    // Determine if the very last selected item in the path is a file to show a preview
    const lastSelectedId = path[path.length - 1];
    const lastSelectedItem = lastSelectedId ? dataMap.get(lastSelectedId) : null;
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
};

export default FileMenu;
