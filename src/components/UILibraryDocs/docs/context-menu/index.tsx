import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'context-menu',
    importPath: 'components/UI/ContextMenu',
    importNames: ['ContextMenu'],
    sourcePath: 'src/components/UI/ContextMenu',
    baseUi: [{ label: 'Base UI Context Menu', url: 'https://base-ui.com/react/components/context-menu' }],
    examples: [
        {
            id: 'basic',
            title: 'Basic context menu',
            description: 'Right-click the area, or touch and hold it on a touch screen. The menu opens at the pointer.',
            Component: Basic,
            source: basicSource,
        },
    ],
    notes: [
        <>
            <code>ContextMenu.Trigger</code> has no style. It is the area that the user right-clicks. Give it a size and
            a visible edge, so that users can find it.
        </>,
        <>
            The items, checkbox items, radio items, groups, separators, and submenus are the{' '}
            <Link to="/components/ui/menu">Menu</Link> parts. They look and work the same.
        </>,
        <>
            <code>ContextMenu.Popup</code> combines Base UI&apos;s <code>Portal</code>, <code>Positioner</code>, and{' '}
            <code>Popup</code>. It renders at the end of <code>{'<body>'}</code> and sets{' '}
            <code>data-scheme=&quot;primary&quot;</code>, so its colors match the site theme.
        </>,
    ],
    props: [
        {
            component: 'ContextMenu.Popup',
            rows: [
                {
                    name: 'container',
                    type: 'HTMLElement | ShadowRoot | RefObject | null',
                    description: 'The element that the menu renders into. The default is the document body.',
                },
            ],
        },
    ],
}
