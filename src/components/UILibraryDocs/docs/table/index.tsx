import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import Surfaces from './Surfaces'
import surfacesSource from '!!../../rawSourceLoader!./Surfaces.tsx?raw'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import Density from './Density'
import densitySource from '!!../../rawSourceLoader!./Density.tsx?raw'
import Interactive from './Interactive'
import interactiveSource from '!!../../rawSourceLoader!./Interactive.tsx?raw'
import Sortable from './Sortable'
import sortableSource from '!!../../rawSourceLoader!./Sortable.tsx?raw'
import StickyHeader from './StickyHeader'
import stickyHeaderSource from '!!../../rawSourceLoader!./StickyHeader.tsx?raw'
import Pricing from './Pricing'
import pricingSource from '!!../../rawSourceLoader!./Pricing.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'table',
    importPath: 'components/UI/Table',
    importNames: ['Table'],
    sourcePath: 'src/components/UI/Table',
    apiNote: 'Table is a site component. Its parts accept native table element props.',
    examples: [
        {
            id: 'basic',
            title: 'Basic table',
            description:
                'Use a caption and native header cells to describe the data. The default appearance is raised.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'surfaces',
            title: 'Surfaces',
            description:
                'Raised is the default, with a fill and a shadow. Use outlined or plain only where a raised table does not fit, such as inside another raised surface.',
            Component: Surfaces,
            source: surfacesSource,
        },
        {
            id: 'density',
            title: 'Density and stripes',
            description: 'Compact rows use less vertical space. Stripes add a glass tint to alternate body rows.',
            Component: Density,
            source: densitySource,
        },
        {
            id: 'interactive',
            title: 'Interactive rows',
            description: 'Move the pointer over a row to see its tint. Put links or buttons in the cells for actions.',
            Component: Interactive,
            source: interactiveSource,
        },
        {
            id: 'sortable',
            title: 'Sortable headers',
            description: 'Click a header to sort. The caller keeps the sort state and orders the rows.',
            Component: Sortable,
            source: sortableSource,
        },
        {
            id: 'sticky-header',
            title: 'Sticky header',
            description: 'Set a maximum container height. The rows scroll below a header with a solid fill.',
            Component: StickyHeader,
            source: stickyHeaderSource,
        },
        {
            id: 'pricing',
            title: 'Numeric columns and footer',
            description: 'Align numbers at the end of each column. Cells use tabular numerals, so digits line up.',
            Component: Pricing,
            source: pricingSource,
        },
    ],
    notes: [
        <>
            To line up the columns of several tables, add <Snippet.Inline>{'table-fixed'}</Snippet.Inline> to{' '}
            <Snippet.Inline>{'Table.Root'}</Snippet.Inline> and give each table the same{' '}
            <Snippet.Inline>{'<colgroup>'}</Snippet.Inline> widths.
        </>,
        <>
            Name the table with <Snippet.Inline>{'Caption'}</Snippet.Inline>, and set{' '}
            <Snippet.Inline>{'scope="row"'}</Snippet.Inline> on row headers.
        </>,
        'The table only shows data. Sorting, filtering, pagination, and number formats are yours to supply.',
        <>
            Cell styles use <Snippet.Inline>{'!'}</Snippet.Inline> classes to beat prose table styles. Use{' '}
            <Snippet.Inline>{'!'}</Snippet.Inline> to override them, such as <Snippet.Inline>{'!px-0'}</Snippet.Inline>.
        </>,
    ],
    props: [
        {
            component: 'Table.Root',
            rows: [
                {
                    name: 'appearance',
                    type: "'plain' | 'outlined' | 'raised'",
                    defaultValue: "'raised'",
                    description:
                        'Sets the scroll container surface. Plain has no border or fill. Raised adds elevation.',
                },
                {
                    name: 'density',
                    type: "'compact' | 'default'",
                    defaultValue: "'default'",
                    description: 'Sets vertical cell padding.',
                },
                {
                    name: 'striped',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Adds a tint to alternate body rows.',
                },
                {
                    name: 'interactive',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Adds a tint on body row hover.',
                },
                {
                    name: 'stickyHeader',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Keeps the header at the top of the scroll container.',
                },
                {
                    name: 'containerProps',
                    type: 'HTMLAttributes<HTMLDivElement>',
                    description:
                        'Sets scroll container attributes, className, and style. Set its maximum height for vertical scroll.',
                },
            ],
        },
        {
            component: 'Table.Head',
            rows: [
                {
                    name: 'align',
                    type: "'start' | 'center' | 'end'",
                    defaultValue: "'start'",
                    description: 'Sets text alignment.',
                },
                {
                    name: 'sort',
                    type: "'ascending' | 'descending' | 'none'",
                    description: 'Shows the sort carets and sets aria-sort. Omit it for a column that does not sort.',
                },
                {
                    name: 'onSort',
                    type: '() => void',
                    description: 'Makes the header label a button. Set the next sort state in this callback.',
                },
                {
                    name: 'scope',
                    type: 'string',
                    defaultValue: "'col'",
                    description: 'Identifies the cells that this header describes.',
                },
            ],
        },
        {
            component: 'Table.Cell',
            rows: [
                {
                    name: 'align',
                    type: "'start' | 'center' | 'end'",
                    defaultValue: "'start'",
                    description: 'Sets text alignment.',
                },
            ],
        },
    ],
}
