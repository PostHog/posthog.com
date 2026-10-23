import React from 'react'
import type { ComponentDoc } from '../../types'
import EdgeFades from './EdgeFades'
import edgeFadesSource from '!!../../rawSourceLoader!./EdgeFades.tsx?raw'
import Horizontal from './Horizontal'
import horizontalSource from '!!../../rawSourceLoader!./Horizontal.tsx?raw'
import Vertical from './Vertical'
import verticalSource from '!!../../rawSourceLoader!./Vertical.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'scroll-area',
    importPath: 'components/UI/ScrollArea',
    importNames: ['ScrollArea'],
    sourcePath: 'src/components/UI/ScrollArea',
    baseUi: [{ label: 'Base UI Scroll Area', url: 'https://base-ui.com/react/components/scroll-area' }],
    examples: [
        {
            id: 'vertical',
            title: 'Vertical',
            description:
                'Give the root a fixed height. Move the pointer onto the area or scroll it to show the scrollbar.',
            Component: Vertical,
            source: verticalSource,
        },
        {
            id: 'horizontal',
            title: 'Horizontal',
            description: 'Set orientation="horizontal" on the scrollbar. The content grows to the width of its items.',
            Component: Horizontal,
            source: horizontalSource,
        },
        {
            id: 'edgefades',
            title: 'Edge fades',
            description: 'Set edgeFades on Viewport. An edge fades only while content continues past it.',
            Component: EdgeFades,
            source: edgeFadesSource,
        },
    ],
    notes: [
        'Edge fades read the Base UI scroll distance variables. Each fade grows with the distance to its edge, up to 24px, so it does not jump on or off. The mask reveals the surface behind the viewport. The scrollbars stay outside the mask.',
        <>
            Give <code>ScrollArea.Root</code> a fixed height, for example <code>h-40</code>. A max height alone does not
            make the content scroll.
        </>,
        <>
            Add one <code>ScrollArea.Scrollbar</code> with a <code>ScrollArea.Thumb</code> for each direction that
            scrolls. If both directions scroll, also add <code>ScrollArea.Corner</code>.
        </>,
        <>The scrollbars show when the pointer is on the area or when the area scrolls. They fade out 300 ms later.</>,
        <>
            <code>ScrollArea</code> does not read the &quot;scrollbars&quot; site setting yet. The Radix{' '}
            <code>ScrollArea</code> in <code>components/RadixUI/ScrollArea</code> does.
        </>,
    ],
    props: [
        {
            component: 'ScrollArea.Viewport',
            rows: [
                {
                    name: 'edgeFades',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Adds 16px CSS masks at edges with more content. Supports both axes and RTL.',
                },
            ],
        },
    ],
}
