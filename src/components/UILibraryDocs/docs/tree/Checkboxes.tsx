import React, { useState } from 'react'
import { CheckboxTree } from 'components/UI/Tree'
import type { TreeNode } from 'components/UI/Tree'

const items: TreeNode[] = [
    {
        id: 'events',
        label: 'Events',
        children: [
            { id: 'pageview', label: '$pageview' },
            { id: 'pageleave', label: '$pageleave' },
            { id: 'autocapture', label: '$autocapture' },
        ],
    },
    {
        id: 'person-properties',
        label: 'Person properties',
        children: [
            { id: 'email', label: 'email' },
            { id: 'plan', label: 'plan' },
            { id: 'initial-referrer', label: '$initial_referrer', disabled: true },
        ],
    },
]

export default function TreeCheckboxes(): JSX.Element {
    const [checked, setChecked] = useState(['pageview', 'email'])

    return (
        <div className="flex max-w-xs flex-col gap-3">
            <CheckboxTree
                aria-label="Data to export"
                items={items}
                defaultExpanded={['events', 'person-properties']}
                checked={checked}
                onCheckedChange={setChecked}
            />
            <p className="m-0 text-[13px] text-secondary">Checked: {checked.join(', ') || 'none'}</p>
        </div>
    )
}
