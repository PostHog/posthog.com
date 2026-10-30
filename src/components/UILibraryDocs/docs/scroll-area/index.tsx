import React from 'react'
import { Snippet } from 'components/UI/Snippet'
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
        <>
            Give <Snippet.Inline>{'ScrollArea.Root'}</Snippet.Inline> a fixed height, such as{' '}
            <Snippet.Inline>{'h-40'}</Snippet.Inline>. A max height alone does not make it scroll.
        </>,
        <>
            Add a <Snippet.Inline>{'ScrollArea.Scrollbar'}</Snippet.Inline> for each direction that scrolls. Add{' '}
            <Snippet.Inline>{'ScrollArea.Corner'}</Snippet.Inline> when both directions scroll.
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
                    description: 'Adds 24px CSS masks at edges with more content. Supports both axes and RTL.',
                },
            ],
        },
    ],
}
