import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import LongContent from './LongContent'
import longContentSource from '!!../../rawSourceLoader!./LongContent.tsx?raw'
import Form from './Form'
import formSource from '!!../../rawSourceLoader!./Form.tsx?raw'
import TitleBar from './TitleBar'
import titleBarSource from '!!../../rawSourceLoader!./TitleBar.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'dialog',
    importPath: 'components/UI/Dialog',
    importNames: ['Dialog'],
    sourcePath: 'src/components/UI/Dialog',
    baseUi: [{ label: 'Base UI Dialog', url: 'https://base-ui.com/react/components/dialog' }],
    examples: [
        {
            id: 'title-bar',
            title: 'With a title bar',
            description:
                'Dialog.Header is the OS title bar. It shows the title and a close button. Use Dialog.Body for the content.',
            Component: TitleBar,
            source: titleBarSource,
        },
        {
            id: 'form',
            title: 'With a form',
            description:
                'Wrap the body and the footer in a form with the contents class. The submit button stays in the footer, and Enter submits the form.',
            Component: Form,
            source: formSource,
        },
        {
            id: 'long-content',
            title: 'Long content',
            description:
                'The dialog is never taller than the screen. The body scrolls, and the title bar and footer stay fixed.',
            Component: LongContent,
            source: longContentSource,
        },
    ],
    notes: [
        <>
            Use <code>Dialog.Body</code> for content. It has padding and scrolls when content is long. A scroll in the
            body does not move the page behind the dialog.
        </>,
        <>
            Use <code>Dialog.Footer</code> for actions. It has compact spacing and no divider by default. It stays fixed
            below the body. Set <code>separator</code> to add a divider for long content.
        </>,
        <>
            Use <code>Dialog.Header</code> as the standard header. It shares the 35-pixel title bar with Drawer. It
            shows the title and a close button. The title aligns with the body text. A long title ends with an ellipsis.
        </>,
        <>
            For a custom layout that needs no title bar, omit <code>Dialog.Header</code> and put{' '}
            <code>Dialog.Title</code> in the body. Every dialog needs a title.
        </>,
        <>
            <code>Dialog.Popup</code> is <code>max-w-lg</code> wide and no taller than the screen. It hides content that
            does not fit. Use <code>Dialog.Body</code> for long content.
        </>,
        <>
            Your <code>className</code> merges on top of the default classes, so <code>max-w-2xl</code> replaces the
            default width.
        </>,
        <>
            <code>Dialog.Popup</code> renders the portal, the backdrop, the viewport, and the popup. It renders at the
            end of <code>{'<body>'}</code>, outside the window that opened it. It sets{' '}
            <code>data-scheme=&quot;primary&quot;</code>, so its colors match the site theme.
        </>,
        <>
            <code>Dialog.Trigger</code> and <code>Dialog.Close</code> render a plain <code>{'<button>'}</code>. Pass{' '}
            <code>{'render={<Button />}'}</code> to show a library button.
        </>,
        <>
            When the user must answer before the dialog closes, use{' '}
            <Link to="/components/ui/alert-dialog">AlertDialog</Link>.
        </>,
    ],
    props: [
        {
            component: 'Dialog.Body',
            rows: [
                {
                    name: 'className',
                    type: 'string',
                    description: 'Classes that replace the default layout or padding.',
                },
                { name: 'children', type: 'ReactNode', description: 'The content of the dialog.' },
            ],
        },
        {
            component: 'Dialog.Footer',
            rows: [
                {
                    name: 'separator',
                    type: 'boolean',
                    defaultValue: 'false',
                    description:
                        'Adds a top divider and equal padding above and below the actions. Use it with long content.',
                },
                {
                    name: 'className',
                    type: 'string',
                    description: 'Classes that replace the default layout or padding.',
                },
                { name: 'children', type: 'ReactNode', description: 'The actions of the dialog.' },
            ],
        },
        {
            component: 'Dialog.Header',
            rows: [
                {
                    name: 'children',
                    type: 'ReactNode',
                    description: 'The title text. The header labels the dialog with it.',
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
            component: 'Dialog.Popup',
            rows: [
                {
                    name: 'container',
                    type: 'HTMLElement | ShadowRoot | RefObject | null',
                    description: 'The element that the dialog renders into. The default is the document body.',
                },
            ],
        },
    ],
}
