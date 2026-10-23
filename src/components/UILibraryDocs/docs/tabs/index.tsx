import React from 'react'
import type { ComponentDoc } from '../../types'
import Horizontal from './Horizontal'
import horizontalSource from '!!../../rawSourceLoader!./Horizontal.tsx?raw'
import Vertical from './Vertical'
import verticalSource from '!!../../rawSourceLoader!./Vertical.tsx?raw'
import Underline from './Underline'
import underlineSource from '!!../../rawSourceLoader!./Underline.tsx?raw'
import UnderlineVertical from './UnderlineVertical'
import underlineVerticalSource from '!!../../rawSourceLoader!./UnderlineVertical.tsx?raw'

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
                'Set orientation="vertical" on Root. The list shows to the left of the panels. A disabled tab is muted, and the user cannot select it.',
            Component: Vertical,
            source: verticalSource,
        },
        {
            id: 'underline',
            title: 'Underline',
            description: 'An orange underline moves to the selected tab. The tabs have no fill.',
            Component: Underline,
            source: underlineSource,
        },
        {
            id: 'underline-vertical',
            title: 'Vertical underline',
            description: 'The indicator moves along the left edge when orientation is vertical.',
            Component: UnderlineVertical,
            source: underlineVerticalSource,
        },
    ],
    notes: [
        <>
            <code>Tabs.Tab</code> renders its children two times. An invisible bold copy keeps the width, so the active
            tab does not move the tabs next to it.
        </>,
        <>
            Keep tab labels to text and icons. Do not put an <code>id</code> or interactive content in a tab.
        </>,
        <>
            The default variant shows a light pane with a thin edge. The underline variant changes only the text on
            hover.
        </>,
    ],
    props: [
        {
            component: 'Tabs.Root',
            rows: [
                {
                    name: 'variant',
                    type: "'pane' | 'underline'",
                    defaultValue: "'pane'",
                    description: 'Show a raised pane or an orange underline on the selected tab.',
                },
            ],
        },
    ],
}
