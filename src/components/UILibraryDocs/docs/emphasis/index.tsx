import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import Headlines from './Headlines'
import headlinesSource from '!!../../rawSourceLoader!./Headlines.tsx?raw'
import Tones from './Tones'
import tonesSource from '!!../../rawSourceLoader!./Tones.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'emphasis',
    importPath: 'components/UI/Emphasis',
    importNames: ['Emphasis'],
    sourcePath: 'src/components/UI/Emphasis',
    apiNote: 'Emphasis is a site component. It accepts span element props.',
    examples: [
        {
            id: 'headlines',
            title: 'Heading and sentence sizes',
            description: 'The pill scales with the surrounding text.',
            Component: Headlines,
            source: headlinesSource,
        },
        {
            id: 'tones',
            title: 'All colors and line breaks',
            description: 'Every color, then one phrase across line breaks. Each line gets its own rounded tint.',
            Component: Tones,
            source: tonesSource,
        },
    ],
    notes: [
        'The color is decoration and has no meaning. Pick the color that suits the page.',
        'Emphasize one phrase in a heading at most.',
        <>
            For semantic emphasis, put an <Snippet.Inline>{'<em>'}</Snippet.Inline> or{' '}
            <Snippet.Inline>{'<strong>'}</Snippet.Inline> inside.
        </>,
    ],
    props: [
        {
            component: 'Emphasis',
            rows: [
                {
                    name: 'color',
                    type: "'gray' | 'brand' | 'blue' | 'cobalt' | 'coral' | 'corn-blue' | 'green' | 'lemon' | 'lime' | 'purple' | 'tangerine' | 'teal' | 'violet' | 'yellow'",
                    defaultValue: "'blue'",
                    description: 'Sets the tint and text color.',
                },
            ],
        },
    ],
}
