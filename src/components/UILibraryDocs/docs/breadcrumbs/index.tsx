import React from 'react'
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
            description: 'Labels truncate with an ellipsis when the container is narrow.',
            Component: LongLabels,
            source: longLabelsSource,
        },
    ],
    notes: [
        <>
            Root renders a <code>nav</code> with an ordered list. Put Item and Separator directly inside Root. Each part
            renders a list item.
        </>,
        <>Put Link or Page inside Item. Page marks the current page and does not create a link.</>,
        <>
            Link uses <code>components/Link</code>. It accepts site paths, external URLs, click handlers, and navigation
            state.
        </>,
        <>
            Use <code>maxItems</code> to keep the first item and the final items. The menu trigger counts as one item.
            The minimum is 3.
        </>,
        <>
            For collapse, use Link as a direct child of each hidden Item. Hidden links use Gatsby navigation and keep
            their state and click handler.
        </>,
        <>A native button inside a hidden Item becomes a menu action. Other content becomes a disabled menu item.</>,
        <>Separator is hidden from assistive technology. Pass children to replace its default chevron.</>,
        <>Long labels remain available to assistive technology. No item wraps onto a second line.</>,
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
