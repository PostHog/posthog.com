import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import Collapsed from './Collapsed'
import collapsedSource from '!!../../rawSourceLoader!./Collapsed.tsx?raw'
import LongLabels from './LongLabels'
import longLabelsSource from '!!../../rawSourceLoader!./LongLabels.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'breadcrumbs',
    importPath: 'components/UI/Breadcrumbs',
    importNames: ['Breadcrumbs'],
    sourcePath: 'src/components/UI/Breadcrumbs',
    apiNote: 'Breadcrumbs is a site component. Its collapsed trail uses the library Menu component.',
    examples: [
        {
            id: 'basic',
            title: 'Basic',
            description: 'Use links for parent pages and Page for the current page.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'collapsed',
            title: 'Collapsed middle',
            description: 'Open the ellipsis menu to reach the hidden parent pages.',
            Component: Collapsed,
            source: collapsedSource,
        },
        {
            id: 'long-labels',
            title: 'Long labels',
            description: 'In a narrow container, labels truncate with an ellipsis. This one is 384px wide.',
            Component: LongLabels,
            source: longLabelsSource,
        },
    ],
    notes: [
        <>
            End the trail with <Snippet.Inline>{'Breadcrumbs.Page'}</Snippet.Inline> for the current page, not a link.
        </>,
        <>
            <Snippet.Inline>{'maxItems'}</Snippet.Inline> folds the middle items into a menu. Keep each folded item a{' '}
            <Snippet.Inline>{'Breadcrumbs.Link'}</Snippet.Inline> directly inside its{' '}
            <Snippet.Inline>{'Item'}</Snippet.Inline>, so it still works from the menu.
        </>,
    ],
    props: [
        {
            component: 'Breadcrumbs.Root',
            rows: [
                {
                    name: 'maxItems',
                    type: 'number',
                    description: 'Limits visible items, including the menu trigger. The minimum is 3.',
                },
                {
                    name: 'aria-label',
                    type: 'string',
                    defaultValue: "'Breadcrumb'",
                    description: 'Names the navigation region.',
                },
                { name: 'className', type: 'string', description: 'Adds classes to the navigation element.' },
            ],
        },
        {
            component: 'Breadcrumbs.Item',
            rows: [
                { name: 'children', type: 'ReactNode', description: 'A Link, Page, or native action button.' },
                { name: 'className', type: 'string', description: 'Adds classes to the list item.' },
            ],
        },
        {
            component: 'Breadcrumbs.Link',
            rows: [
                { name: 'to', type: 'string', description: 'The parent page path or URL. Required.' },
                { name: 'state', type: 'object', description: 'Passes state to site navigation.' },
                { name: 'onClick', type: 'function', description: 'Runs when the link activates.' },
                {
                    name: 'contextMenu',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Enables the site link context menu on visible links.',
                },
                { name: 'className', type: 'string', description: 'Adds classes to the link.' },
            ],
        },
        {
            component: 'Breadcrumbs.Separator',
            rows: [
                {
                    name: 'children',
                    type: 'ReactNode',
                    defaultValue: 'IconChevronRight',
                    description: 'Replaces the separator icon.',
                },
            ],
        },
        {
            component: 'Breadcrumbs.Page',
            rows: [
                { name: 'children', type: 'ReactNode', description: 'The current page label.' },
                { name: 'className', type: 'string', description: 'Adds classes to the current page label.' },
            ],
        },
    ],
}
