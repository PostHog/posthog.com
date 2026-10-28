import type { ComponentDoc } from '../../types'
import Examples from './Examples'
import examplesSource from '!!../../rawSourceLoader!./Examples.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'skeleton',
    importPath: 'components/UI/Skeleton',
    importNames: ['Skeleton'],
    sourcePath: 'src/components/UI/Skeleton',
    examples: [
        {
            id: 'examples',
            title: 'Shapes and content',
            description:
                'Placeholders match the shape and size of the content they stand in for. Use the button to switch.',
            Component: Examples,
            source: examplesSource,
        },
    ],
    notes: [
        'Match the shape and text size of the real content, so the layout does not move when it loads.',
        'Show skeletons only for loads that take long enough to notice.',
    ],
    props: [
        {
            component: 'Skeleton',
            rows: [
                {
                    name: 'shape',
                    type: "'text' | 'rect' | 'circle'",
                    defaultValue: "'text'",
                    description: 'The placeholder shape.',
                },
                { name: 'width', type: 'number | string', description: 'A width in pixels or a CSS value.' },
                { name: 'height', type: 'number | string', description: 'A height in pixels or a CSS value.' },
                { name: 'lines', type: 'number', defaultValue: '1', description: 'The number of text lines.' },
                {
                    name: 'loading',
                    type: 'boolean',
                    defaultValue: 'true',
                    description: 'Shows placeholders when true. Shows children when false.',
                },
                { name: 'children', type: 'ReactNode', description: 'The content to show after loading.' },
                { name: 'className', type: 'string', description: 'Classes for the placeholder.' },
            ],
        },
    ],
}
