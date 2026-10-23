import React from 'react'
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
            A vertical separator stretches to the height of its flex row. Outside a flex container, it has no height, so
            give it one, for example <code>h-4</code>.
        </>,
        <>
            Inside <code>Menu</code>, <code>Select</code>, <code>Combobox</code>, <code>Autocomplete</code>, and{' '}
            <code>Toolbar</code>, use the <code>Separator</code> part of that component. It has the correct spacing.
        </>,
    ],
}
