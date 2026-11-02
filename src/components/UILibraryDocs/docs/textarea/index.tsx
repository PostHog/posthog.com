import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import AppearanceStates from './AppearanceStates'
import appearanceStatesSource from '!!../../rawSourceLoader!./AppearanceStates.tsx?raw'
import AutoExpand from './AutoExpand'
import autoExpandSource from '!!../../rawSourceLoader!./AutoExpand.tsx?raw'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'

import Sizes from './Sizes'
import sizesSource from '!!../../rawSourceLoader!./Sizes.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'textarea',
    importPath: 'components/UI/Textarea',
    importNames: ['Textarea'],
    sourcePath: 'src/components/UI/Textarea',
    baseUi: [{ label: 'Base UI Input', url: 'https://base-ui.com/react/components/input' }],
    examples: [
        {
            id: 'basic',
            title: 'Basic',
            description:
                'Put Textarea in Field.Root, like Field.Control. The box shows three rows. The user can drag it taller.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'auto-expand',
            title: 'Grow with the content',
            description: 'Set autoExpand to grow the box as the user types, up to 320px. Then it scrolls.',
            Component: AutoExpand,
            source: autoExpandSource,
        },
        {
            id: 'sizes',
            title: 'Sizes',
            description: 'sm, md, and lg set the text size and padding to match fields of the same size.',
            Component: Sizes,
            source: sizesSource,
        },
        {
            id: 'states',
            title: 'States',
            description:
                'Empty, filled, invalid, and disabled, in both appearances. Hover and focus the fields to see those states.',
            Component: AppearanceStates,
            source: appearanceStatesSource,
        },
    ],
    notes: [
        <>
            <Snippet.Inline>{'autoExpand'}</Snippet.Inline> grows the box with its content up to a maximum height.
            Browsers without <Snippet.Inline>{'field-sizing'}</Snippet.Inline> support keep a fixed height and scroll.
        </>,
    ],
    props: [
        {
            component: 'Textarea',
            rows: [
                {
                    name: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    defaultValue: "'md'",
                    description: 'Sets the text size, padding, and control height.',
                },
                {
                    name: 'appearance',
                    type: "'inset' | 'line'",
                    defaultValue: "'inset'",
                    description:
                        'Sets the field shape. Use line for light or inline editing, such as renaming in place, filters, and quick settings.',
                },
                {
                    name: 'autoExpand',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Grows the box with its content, up to 320px. The user cannot resize it.',
                },
                {
                    name: 'rows',
                    type: 'number',
                    defaultValue: '3',
                    description: 'The number of visible lines. An autoExpand box ignores it.',
                },
            ],
        },
    ],
}
