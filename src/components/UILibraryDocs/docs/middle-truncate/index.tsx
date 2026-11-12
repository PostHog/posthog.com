import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import Values from './Values'
import valuesSource from '!!../../rawSourceLoader!./Values.tsx?raw'
import Widths from './Widths'
import widthsSource from '!!../../rawSourceLoader!./Widths.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'middle-truncate',
    importPath: 'components/UI/MiddleTruncate',
    importNames: ['MiddleTruncate'],
    sourcePath: 'src/components/UI/MiddleTruncate',
    apiNote: 'MiddleTruncate accepts span element props. Pass the full string as children.',
    examples: [
        {
            id: 'values',
            title: 'URLs, paths, keys, and events',
            description: 'Keep the end visible. CopyButton copies the full value.',
            Component: Values,
            source: valuesSource,
        },
        {
            id: 'widths',
            title: 'Available width',
            description: 'The same path in narrower boxes. The end stays visible at every width.',
            Component: Widths,
            source: widthsSource,
        },
    ],
    notes: [
        'Use MiddleTruncate for identifiers where both ends matter, such as keys, IDs, and file paths. Do not use it for prose.',
        <>
            It needs a width limit. Add <Snippet.Inline>{'min-w-0'}</Snippet.Inline> to flex and grid parents.
        </>,
        'Truncation is visual only. It does not hide secrets.',
    ],
    props: [
        {
            component: 'MiddleTruncate',
            rows: [
                { name: 'children', type: 'string', description: 'The full value to display and copy.' },
                {
                    name: 'endChars',
                    type: 'number',
                    defaultValue: '16',
                    description: 'Sets the suffix length in Unicode code points. Values below one become one.',
                },
                { name: 'title', type: 'string', defaultValue: 'children', description: 'Sets the native hover text.' },
                { name: 'className', type: 'string', description: 'Sets width, font, and other span styles.' },
            ],
        },
    ],
}
