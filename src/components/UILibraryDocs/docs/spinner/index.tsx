import React from 'react'
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
            title: 'Sizes',
            description: 'The spinner uses the current text color. Sizes are 14, 16, and 20 pixels.',
            Component: Examples,
            source: examplesSource,
        },
    ],
    notes: [
        <>The spinner has a status role and a hidden label. Set the label to describe the loading task.</>,
        <>Reduced motion slows the rotation to 2.5 seconds per turn.</>,
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
