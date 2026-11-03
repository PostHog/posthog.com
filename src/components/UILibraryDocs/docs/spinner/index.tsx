import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Examples from './Examples'
import examplesSource from '!!../../rawSourceLoader!./Examples.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'spinner',
    importPath: 'components/UI/Spinner',
    importNames: ['Spinner'],
    sourcePath: 'src/components/UI/Spinner',
    examples: [
        {
            id: 'examples',
            title: 'Sizes and color',
            description: 'Three sizes. The spinner takes the current text color.',
            Component: Examples,
            source: examplesSource,
        },
    ],
    notes: [
        <>
            Set <Snippet.Inline>{'label'}</Snippet.Inline> to say what is loading.
        </>,
        <>
            For a button action, use the button&apos;s <Snippet.Inline>{'loading'}</Snippet.Inline> prop. For content
            that loads, use <Link to="/components/ui/skeleton">Skeleton</Link>.
        </>,
    ],
    props: [
        {
            component: 'Spinner',
            rows: [
                {
                    name: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    defaultValue: "'md'",
                    description: 'The spinner diameter.',
                },
                {
                    name: 'label',
                    type: 'string',
                    defaultValue: "'Loading'",
                    description: 'The accessible status label.',
                },
                { name: 'className', type: 'string', description: 'Classes for the spinner.' },
            ],
        },
    ],
}
