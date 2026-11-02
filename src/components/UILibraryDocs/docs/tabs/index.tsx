import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Horizontal from './Horizontal'
import horizontalSource from '!!../../rawSourceLoader!./Horizontal.tsx?raw'
import Vertical from './Vertical'
import verticalSource from '!!../../rawSourceLoader!./Vertical.tsx?raw'
import Appearances from './Appearances'
import appearancesSource from '!!../../rawSourceLoader!./Appearances.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'tabs',
    importPath: 'components/UI/Tabs',
    importNames: ['Tabs'],
    sourcePath: 'src/components/UI/Tabs',
    baseUi: [{ label: 'Base UI Tabs', url: 'https://base-ui.com/react/components/tabs' }],
    examples: [
        {
            id: 'horizontal',
            title: 'Horizontal',
            description: 'The default orientation. The panels show below the list.',
            Component: Horizontal,
            source: horizontalSource,
        },
        {
            id: 'vertical',
            title: 'Vertical',
            description:
                'Set orientation="vertical" on Root. The list shows to the left of the panels. A disabled tab shows the disabled button style, and the user cannot select it.',
            Component: Vertical,
            source: verticalSource,
        },
        {
            id: 'appearances',
            title: 'Appearances',
            description:
                'Tabs use the same looks as a ButtonGroup. The selected tab shows the pressed state. Set appearance, variant, and size on Root.',
            Component: Appearances,
            source: appearancesSource,
        },
    ],
    notes: [
        <>
            Use Tabs to switch between views of the same content. For a marketing feature tour, use{' '}
            <Link to="/components/ui/feature-tabs">FeatureTabs</Link>. To go to another page, use links.
        </>,
        'Keep tab labels to text and icons. Do not put links or buttons in a tab.',
    ],
    props: [
        {
            component: 'Tabs.Root',
            rows: [
                {
                    name: 'appearance',
                    type: "'flat' | 'raised' | 'outline'",
                    defaultValue: "'flat'",
                    description: 'Sets the look of the tab list. It matches the ButtonGroup appearance.',
                },
                {
                    name: 'variant',
                    type: "'primary' | 'secondary' | 'danger'",
                    defaultValue: "'secondary'",
                    description: 'Sets the color of the tabs. It matches the ButtonGroup variant.',
                },
                {
                    name: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    defaultValue: "'md'",
                    description: 'Sets the height, padding, and text size of the tabs.',
                },
            ],
        },
    ],
}
