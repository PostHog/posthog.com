import React from 'react'
import { FileTree } from 'components/UI/Tree'
import type { FileTreeNode, TreeSize } from 'components/UI/Tree'
import { DemoLabel } from 'components/UILibraryDocs/DemoLayout'

const items: FileTreeNode[] = [
    {
        id: 'src',
        label: 'src',
        children: [
            {
                id: 'components',
                label: 'components',
                children: [{ id: 'tree', label: 'Tree.tsx' }],
            },
            { id: 'index', label: 'index.ts' },
        ],
    },
]

const sizes: { size: TreeSize; label: string }[] = [
    { size: 'sm', label: 'sm · dense UI' },
    { size: 'md', label: 'md · default' },
    { size: 'lg', label: 'lg' },
]

export default function TreeSizes(): JSX.Element {
    return (
        <div className="grid gap-6 @lg:grid-cols-3">
            {sizes.map(({ size, label }) => (
                <div key={size} className="flex min-w-0 flex-col gap-2">
                    <DemoLabel>{label}</DemoLabel>
                    <FileTree
                        aria-label={`Files, size ${size}`}
                        size={size}
                        items={items}
                        defaultExpanded={['src', 'components']}
                    />
                </div>
            ))}
        </div>
    )
}
