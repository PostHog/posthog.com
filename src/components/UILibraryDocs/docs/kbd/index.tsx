import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import Examples from './Examples'
import examplesSource from '!!../../rawSourceLoader!./Examples.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'kbd',
    importPath: 'components/UI/Kbd',
    importNames: ['Kbd'],
    sourcePath: 'src/components/UI/Kbd',
    apiNote: 'These are site components. Kbd takes kbd element props. Kbd.Shortcut takes span element props.',
    examples: [
        {
            id: 'examples',
            title: 'Examples',
            description: 'Show one key or a shortcut. Set platform="other" for Windows and Linux names.',
            Component: Examples,
            source: examplesSource,
        },
    ],
    notes: [
        'Keycaps show keys. They do not run commands, so register the shortcut yourself.',
        <>
            <Snippet.Inline>{'Kbd.Shortcut'}</Snippet.Inline> shows Mac symbols by default. Set{' '}
            <Snippet.Inline>{'platform'}</Snippet.Inline> when you know the user&apos;s platform.
        </>,
    ],
    props: [
        {
            component: 'Kbd',
            rows: [
                { name: 'children', type: 'ReactNode', description: 'The key label.' },
                {
                    name: 'size',
                    type: "'sm' | 'md'",
                    defaultValue: "'md'",
                    description: 'The keycap height and text size.',
                },
            ],
        },
        {
            component: 'Kbd.Shortcut',
            rows: [
                { name: 'keys', type: 'readonly string[]', description: 'The keys in display order. Required.' },
                {
                    name: 'platform',
                    type: "'mac' | 'other'",
                    defaultValue: "'mac'",
                    description: 'Use Control and Alt labels on other platforms.',
                },
                { name: 'size', type: "'sm' | 'md'", defaultValue: "'md'", description: 'The size of each keycap.' },
            ],
        },
    ],
}
