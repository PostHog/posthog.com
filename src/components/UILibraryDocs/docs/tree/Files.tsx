import React from 'react'
import { FileTree } from 'components/UI/Tree'
import type { FileTreeNode } from 'components/UI/Tree'

const items: FileTreeNode[] = [
    {
        id: 'components',
        label: 'components',
        children: [
            {
                id: 'ui',
                label: 'UI',
                children: [
                    { id: 'tree', label: 'Tree', href: '/components/ui/tree' },
                    { id: 'tabs', label: 'Tabs', href: '/components/ui/tabs' },
                    { id: 'menu', label: 'Menu', href: '/components/ui/menu' },
                ],
            },
        ],
    },
    {
        id: 'docs',
        label: 'docs',
        children: [{ id: 'getting-started', label: 'Getting started', href: '/docs/getting-started/install' }],
    },
    { id: 'readme', label: 'README.md' },
]

export default function TreeFiles(): JSX.Element {
    return <FileTree aria-label="Site files" items={items} currentId="tree" className="max-w-xs" />
}
