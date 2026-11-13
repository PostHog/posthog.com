import React from 'react'
import {
    IconFlag,
    IconFunnels,
    IconGraph,
    IconPhone,
    IconRetention,
    IconRewindPlay,
    IconScreen,
    IconTestTube,
    IconTrends,
} from '@posthog/icons'
import { Tree } from 'components/UI/Tree'
import type { TreeNode } from 'components/UI/Tree'

const items: TreeNode[] = [
    {
        id: 'product-analytics',
        label: 'Product analytics',
        icon: <IconGraph />,
        children: [
            { id: 'trends', label: 'Trends', icon: <IconTrends /> },
            { id: 'funnels', label: 'Funnels', icon: <IconFunnels /> },
            { id: 'retention', label: 'Retention', icon: <IconRetention /> },
        ],
    },
    {
        id: 'session-replay',
        label: 'Session replay',
        icon: <IconRewindPlay />,
        children: [
            { id: 'web-replay', label: 'Web', icon: <IconScreen /> },
            { id: 'mobile-replay', label: 'Mobile', icon: <IconPhone /> },
        ],
    },
    { id: 'feature-flags', label: 'Feature flags', icon: <IconFlag /> },
    { id: 'experiments', label: 'Experiments', icon: <IconTestTube />, disabled: true },
]

export default function TreeBasic(): JSX.Element {
    return (
        <Tree
            aria-label="Products"
            items={items}
            selectionMode="single"
            defaultExpanded={['product-analytics']}
            defaultSelected={['funnels']}
            className="max-w-xs"
        />
    )
}
