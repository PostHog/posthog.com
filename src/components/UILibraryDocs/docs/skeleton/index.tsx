import React from 'react'
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
                'Use placeholders while content loads. Select Toggle content to show or hide all report content.',
            Component: Examples,
            source: examplesSource,
        },
    ],
    notes: [
        <>Placeholders are hidden from screen readers. The wrapper sets aria-busy while content loads.</>,
        <>
            Reduced motion stops the shimmer. Each text line is one line height tall, so a placeholder takes the same
            space as the text. Set the text size class on the Skeleton to match the content. The last of several lines
            is shorter.
        </>,
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
