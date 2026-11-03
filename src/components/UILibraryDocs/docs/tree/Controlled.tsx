import React, { useState } from 'react'
import { Button } from 'components/UI/Button'
import { Tree } from 'components/UI/Tree'
import type { TreeNode } from 'components/UI/Tree'

const items: TreeNode[] = [
    {
        id: 'dashboards',
        label: 'Dashboards',
        children: [
            { id: 'growth', label: 'Growth' },
            { id: 'revenue', label: 'Revenue' },
        ],
    },
    {
        id: 'insights',
        label: 'Insights',
        children: [
            { id: 'weekly-signups', label: 'Weekly signups' },
            { id: 'activation', label: 'Activation' },
        ],
    },
]

const branchIds = items.map((item) => item.id)

export default function TreeControlled(): JSX.Element {
    const [expanded, setExpanded] = useState<string[]>([])
    const [selected, setSelected] = useState<string[]>([])

    return (
        <div className="flex max-w-xs flex-col gap-3">
            <div className="flex gap-2">
                <Button size="sm" onClick={() => setExpanded(branchIds)}>
                    Expand all
                </Button>
                <Button size="sm" onClick={() => setExpanded([])}>
                    Collapse all
                </Button>
            </div>
            <Tree
                aria-label="Saved items"
                items={items}
                selectionMode="multiple"
                expanded={expanded}
                onExpandedChange={setExpanded}
                selected={selected}
                onSelectedChange={setSelected}
            />
            <p className="m-0 text-[13px] text-secondary">Selected: {selected.join(', ') || 'none'}</p>
        </div>
    )
}
