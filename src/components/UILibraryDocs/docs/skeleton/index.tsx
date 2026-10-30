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
        'Wrap the real layout in Skeleton. While it loads, Skeleton hides the content and draws the placeholder in exactly its space, so nothing moves when it loads. Render sample text in place of data that has not arrived.',
        'Without children, set lines, width, and height to estimate the size of content you cannot render yet.',
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
                {
                    name: 'width',
                    type: 'number | string',
                    description: 'A width in pixels or a CSS value. Used without children.',
                },
                {
                    name: 'height',
                    type: 'number | string',
                    description: 'A height in pixels or a CSS value. Used without children.',
                },
                {
                    name: 'lines',
                    type: 'number',
                    defaultValue: '1',
                    description: 'The number of text lines. Used without children.',
                },
                {
                    name: 'loading',
                    type: 'boolean',
                    defaultValue: 'true',
                    description: 'Shows placeholders when true. Shows children when false.',
                },
                {
                    name: 'children',
                    type: 'ReactNode',
                    description: 'The content. While loading, it sets the size and shape of the placeholder.',
                },
                {
                    name: 'className',
                    type: 'string',
                    description: 'Classes for the placeholder, or for the wrapper around children.',
                },
            ],
        },
    ],
}
