import React from 'react'
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
        <>
            Pages start at <code>1</code>. The existing list Pagination also starts at 1. OSTable starts at 0. For
            OSTable, pass <code>{'page={currentPage + 1}'}</code> and{' '}
            <code>{'onPageChange={(page) => goToPage(page - 1)}'}</code>.
        </>,
        <>
            Pass <code>onPageChange</code> for local state or <code>getPageHref</code> for navigation. Link mode uses
            URLs and does not call <code>onPageChange</code>.
        </>,
        <>For the existing list routes, return the base path for page 1. Append the page number for other pages.</>,
        <>
            The current page has <code>aria-current="page"</code> and the flat button's pressed style.
        </>,
        <>
            Set <code>compact</code> for a narrow container. The component does not switch modes automatically.
        </>,
        <>
            The control always shows the same number of slots, so its width does not change when the page changes. An
            ellipsis always hides two or more pages.
        </>,
        <>A zero or invalid page count renders nothing. The component clamps the current page to the valid range.</>,
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
