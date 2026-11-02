import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import Horizontal from './Horizontal'
import horizontalSource from '!!../../rawSourceLoader!./Horizontal.tsx?raw'
import Vertical from './Vertical'
import verticalSource from '!!../../rawSourceLoader!./Vertical.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'separator',
    importPath: 'components/UI/Separator',
    importNames: ['Separator'],
    sourcePath: 'src/components/UI/Separator',
    baseUi: [{ label: 'Base UI Separator', url: 'https://base-ui.com/react/components/separator' }],
    examples: [
        {
            id: 'horizontal',
            title: 'Horizontal',
            description: 'The default orientation. The line fills the width of its container.',
            Component: Horizontal,
            source: horizontalSource,
        },
        {
            id: 'vertical',
            title: 'Vertical',
            description: 'Set orientation="vertical" to put a line between items in a row.',
            Component: Vertical,
            source: verticalSource,
        },
    ],
    notes: [
        <>
            Inside Menu, Select, Combobox, Autocomplete, and Toolbar, use that component&apos;s{' '}
            <Snippet.Inline>{'Separator'}</Snippet.Inline> part.
        </>,
        <>
            Outside a flex row, a vertical separator needs a height, such as <Snippet.Inline>{'h-4'}</Snippet.Inline>.
        </>,
    ],
}
