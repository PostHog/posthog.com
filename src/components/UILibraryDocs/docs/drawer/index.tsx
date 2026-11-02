import React from 'react'
import { Snippet } from 'components/UI/Snippet'
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
                'A drawer opens from the bottom edge by default. It shows a grab handle above the header. Swipe down to close it.',
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
                'Set modal={false} to remove the backdrop and keep the page usable. Add disablePointerDismissal so clicks on the page do not close it.',
            Component: NonModal,
            source: nonModalSource,
        },
    ],
    notes: [
        'Use a drawer for a secondary task or for details that keep the page in view. Bottom drawers suit narrow screens. Side drawers suit details on wide screens.',
        <>
            Put the body in <Snippet.Inline>{'Drawer.Content'}</Snippet.Inline> and the actions in{' '}
            <Snippet.Inline>{'Drawer.Footer'}</Snippet.Inline>, after the content.
        </>,
        'Users close a drawer by swiping it toward its edge. Mouse users drag the header.',
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
                    description: 'Shows a close button at the right of the header.',
                },
                { name: 'className', type: 'string', description: 'Classes for the header.' },
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
