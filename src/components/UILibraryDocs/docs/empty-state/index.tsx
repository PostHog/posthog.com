import React from 'react'
import type { ComponentDoc } from '../../types'
import NoResults from './NoResults'
import noResultsSource from '!!../../rawSourceLoader!./NoResults.tsx?raw'
import FirstRun from './FirstRun'
import firstRunSource from '!!../../rawSourceLoader!./FirstRun.tsx?raw'
import Small from './Small'
import smallSource from '!!../../rawSourceLoader!./Small.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'empty-state',
    importPath: 'components/UI/EmptyState',
    importNames: ['EmptyState'],
    sourcePath: 'src/components/UI/EmptyState',
    apiNote: <>EmptyState is a site component. Its parts accept standard HTML props unless listed below.</>,
    examples: [
        {
            id: 'noresults',
            title: 'No search results',
            description: 'Clear the filters with a reset action.',
            Component: NoResults,
            source: noResultsSource,
        },
        {
            id: 'firstrun',
            title: 'First run',
            description: 'Use a primary action to create the first item.',
            Component: FirstRun,
            source: firstRunSource,
        },
        {
            id: 'small',
            title: 'Small size',
            description: 'Use a compact layout in a small region.',
            Component: Small,
            source: smallSource,
        },
    ],
    notes: [
        'Use a title that explains why the list is empty.',
        'Use Actions for recovery or the first action. Root uses Section when outlined is true.',
        'Icons are decorative. Put the information in the title and description.',
    ],
    props: [
        {
            component: 'EmptyState.Root',
            rows: [
                {
                    name: 'size',
                    type: "'sm' | 'md'",
                    defaultValue: "'md'",
                    description: 'Sets the spacing and text size.',
                },
                {
                    name: 'outlined',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Renders the empty state inside Section.Root.',
                },
            ],
        },
    ],
}
