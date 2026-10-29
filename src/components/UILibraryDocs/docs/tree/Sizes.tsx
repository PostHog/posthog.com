import React from 'react'
import { FileTree } from 'components/UI/Tree'
import type { FileTreeNode, TreeSize } from 'components/UI/Tree'

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

const sizes: TreeSize[] = ['sm', 'md', 'lg']

export default function TreeSizes(): JSX.Element {
    return (
        <div className="grid gap-6 @lg:grid-cols-3">
            {sizes.map((size) => (
                <FileTree
                    key={size}
                    aria-label={`Files, size ${size}`}
                    size={size}
                    items={items}
                    defaultExpanded={['src', 'components']}
                />
            ))}
        </div>
    )
}
