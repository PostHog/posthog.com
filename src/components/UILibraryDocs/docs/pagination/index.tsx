import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import ManyPages from './ManyPages'
import manyPagesSource from '!!../../rawSourceLoader!./ManyPages.tsx?raw'
import Links from './Links'
import linksSource from '!!../../rawSourceLoader!./Links.tsx?raw'
import Compact from './Compact'
import compactSource from '!!../../rawSourceLoader!./Compact.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'pagination',
    importPath: 'components/UI/Pagination',
    importNames: ['Pagination'],
    sourcePath: 'src/components/UI/Pagination',
    apiNote: 'Pagination is a site component. It uses the library Button, IconButton, and ButtonLink components.',
    examples: [
        {
            id: 'basic',
            title: 'Basic',
            description: 'Select a page. The previous and next controls stop at the ends.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'many-pages',
            title: 'Many pages with ellipses',
            description: 'Show the first and last pages, the current page, and its neighbors.',
            Component: ManyPages,
            source: manyPagesSource,
        },
        {
            id: 'links',
            title: 'Links to pages',
            description: 'Each control has a URL. These links open blog pages.',
            Component: Links,
            source: linksSource,
        },
        {
            id: 'compact',
            title: 'Compact',
            description: 'Show the page count between the previous and next controls.',
            Component: Compact,
            source: compactSource,
        },
    ],
    notes: [
        'Pages start at 1.',
        <>
            Use <Snippet.Inline>{'getPageHref'}</Snippet.Inline> when each page has a URL, and{' '}
            <Snippet.Inline>{'onPageChange'}</Snippet.Inline> for local state.
        </>,
        <>
            Set <Snippet.Inline>{'compact'}</Snippet.Inline> in narrow containers. It does not switch on its own.
        </>,
    ],
    props: [
        {
            component: 'Pagination',
            rows: [
                { name: 'page', type: 'number', description: 'The current page, starting at 1. Required.' },
                { name: 'pageCount', type: 'number', description: 'The total number of pages. Required.' },
                {
                    name: 'onPageChange',
                    type: '(page: number) => void',
                    description: 'Receives a page number when a button activates.',
                },
                {
                    name: 'getPageHref',
                    type: '(page: number) => string',
                    description: 'Returns a URL for each page. Enables link mode.',
                },
                {
                    name: 'siblingCount',
                    type: 'number',
                    defaultValue: '1',
                    description: 'The number of visible pages on each side of the current page.',
                },
                {
                    name: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    defaultValue: "'md'",
                    description: 'Sets the size of every button.',
                },
                {
                    name: 'compact',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Shows the page count instead of page buttons.',
                },
                { name: 'className', type: 'string', description: 'Adds classes to the navigation element.' },
            ],
        },
    ],
}
