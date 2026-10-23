import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import NonModal from './NonModal'
import nonModalSource from '!!../../rawSourceLoader!./NonModal.tsx?raw'
import Bottom from './Bottom'
import bottomSource from '!!../../rawSourceLoader!./Bottom.tsx?raw'
import SidePanel from './SidePanel'
import sidePanelSource from '!!../../rawSourceLoader!./SidePanel.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'drawer',
    importPath: 'components/UI/Drawer',
    importNames: ['Drawer'],
    sourcePath: 'src/components/UI/Drawer',
    baseUi: [{ label: 'Base UI Drawer', url: 'https://base-ui.com/react/components/drawer' }],
    examples: [
        {
            id: 'bottom',
            title: 'Bottom drawer',
            description:
                'A drawer opens from the bottom edge by default. It shows a grab handle on the title bar. Swipe down to close it.',
            Component: Bottom,
            source: bottomSource,
        },
        {
            id: 'side-panel',
            title: 'Side panel',
            description: 'Set swipeDirection="right" on Drawer.Root to open a panel from the right edge.',
            Component: SidePanel,
            source: sidePanelSource,
        },
        {
            id: 'nonmodal',
            title: 'Non-modal reference panel',
            description:
                'Set modal to false to keep the page active. The drawer has no backdrop, and a click on the page goes to the page. Set disablePointerDismissal to keep the drawer open after that click.',
            Component: NonModal,
            source: nonModalSource,
        },
    ],
    notes: [
        <>
            Set <code>swipeDirection</code> on <code>Drawer.Root</code> to select the edge:{' '}
            <code>&quot;down&quot;</code> (default), <code>&quot;up&quot;</code>, <code>&quot;left&quot;</code>, or{' '}
            <code>&quot;right&quot;</code>.
        </>,
        <>
            A bottom drawer shows its grab handle on the title bar, so start it with <code>Drawer.Header</code>.
        </>,
        <>
            <code>Drawer.Header</code>, <code>Drawer.Footer</code>, <code>Drawer.Title</code>, and{' '}
            <code>Drawer.Description</code> are the <Link to="/components/ui/dialog">Dialog</Link> parts.
        </>,
        <>
            Put actions in <code>Drawer.Footer</code>, after <code>Drawer.Content</code>. The footer stays at the bottom
            of the drawer, and the content scrolls above it. Set <code>separator</code> to add a divider.
        </>,
        <>
            Put the body in <code>Drawer.Content</code>. It has padding, and it scrolls when the content is long.
        </>,
        <>
            A mouse drag in <code>Drawer.Content</code> selects text. So a mouse user drags the title bar to close the
            drawer.
        </>,
        <>
            Top and bottom drawers are <code>max-w-2xl</code> wide. Side drawers are <code>w-96</code> wide. Pass{' '}
            <code>className</code> to <code>Drawer.Popup</code> to change the size.
        </>,
        <>
            <code>Drawer.Popup</code> renders the portal, the backdrop, the viewport, and the popup. It renders at the
            end of <code>{'<body>'}</code> and sets <code>data-scheme=&quot;primary&quot;</code>, so its colors match
            the site theme.
        </>,
    ],
    props: [
        {
            component: 'Drawer.Root',
            rows: [
                {
                    name: 'modal',
                    type: "boolean | 'trap-focus'",
                    defaultValue: 'true',
                    description:
                        "Controls modal behavior. false and 'trap-focus' remove the backdrop and allow outside interaction. 'trap-focus' keeps focus in the drawer.",
                },
            ],
        },
        {
            component: 'Drawer.Header',
            rows: [
                {
                    name: 'children',
                    type: 'ReactNode',
                    description: 'The title text. The header labels the drawer with it.',
                },
                {
                    name: 'showCloseButton',
                    type: 'boolean',
                    defaultValue: 'true',
                    description: 'Shows a close button at the right of the title bar.',
                },
                { name: 'className', type: 'string', description: 'Classes for the title bar.' },
            ],
        },
        {
            component: 'Drawer.Footer',
            rows: [
                {
                    name: 'separator',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Adds a top divider and equal padding above and below the actions.',
                },
                { name: 'children', type: 'ReactNode', description: 'The actions of the drawer.' },
            ],
        },
        {
            component: 'Drawer.Popup',
            rows: [
                {
                    name: 'container',
                    type: 'HTMLElement | ShadowRoot | RefObject | null',
                    description: 'The element that the drawer renders into. The default is the document body.',
                },
            ],
        },
    ],
}
