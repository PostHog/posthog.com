import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Confirm from './Confirm'
import confirmSource from '!!../../rawSourceLoader!./Confirm.tsx?raw'
import Delete from './Delete'
import deleteSource from '!!../../rawSourceLoader!./Delete.tsx?raw'

import LongContent from './LongContent'
import longContentSource from '!!../../rawSourceLoader!./LongContent.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'alert-dialog',
    importPath: 'components/UI/AlertDialog',
    importNames: ['AlertDialog'],
    sourcePath: 'src/components/UI/AlertDialog',
    baseUi: [{ label: 'Base UI Alert Dialog', url: 'https://base-ui.com/react/components/alert-dialog' }],
    examples: [
        {
            id: 'confirm',
            title: 'Confirm an action',
            description:
                'AlertDialog.Header uses the standard title bar without a close button. Put each action in an AlertDialog.Close.',
            Component: Confirm,
            source: confirmSource,
        },
        {
            id: 'async',
            title: 'Wait for the action',
            description:
                'Control open to keep the dialog open while the delete runs. The button shows a spinner, and Escape does nothing until the delete ends.',
            Component: Delete,
            source: deleteSource,
        },
        {
            id: 'long-content',
            title: 'Long content',
            description: 'The body scrolls. The title bar and footer stay fixed. Set separator on the footer.',
            Component: LongContent,
            source: longContentSource,
        },
    ],
    notes: [
        <>
            Use <code>AlertDialog.Body</code> for content. It has padding and scrolls when content is long.
        </>,
        <>
            Use <code>AlertDialog.Footer</code> for actions. It has compact spacing and no divider by default. It stays
            fixed below the body. Set <code>separator</code> to add a divider for long content.
        </>,
        <>
            Use an alert dialog when the user must answer, for example to confirm a delete. A click outside does not
            close it. For other dialogs, use <Link to="/components/ui/dialog">Dialog</Link>.
        </>,
        <>
            Put each action in an <code>AlertDialog.Close</code>. Pass <code>{'render={<Button />}'}</code> to show a
            library button.
        </>,
        <>
            <code>AlertDialog</code> looks the same as <code>Dialog</code>. <code>AlertDialog.Header</code> is the{' '}
            shared 35-pixel title bar that Drawer uses. Use it as the standard header. It has no close button by
            default, because the user must select an action.
        </>,
        <>
            For a custom layout that needs no title bar, omit <code>AlertDialog.Header</code> and put{' '}
            <code>AlertDialog.Title</code> in the body. Every alert dialog needs a title.
        </>,
        <>
            <code>AlertDialog.Popup</code> has no padding, and it is <code>max-w-lg</code> wide, the same as{' '}
            <code>Dialog.Popup</code>. Use <code>AlertDialog.Body</code> for the content.
        </>,
        <>
            <code>AlertDialog.Popup</code> renders the portal, the backdrop, the viewport, and the popup. It renders at
            the end of <code>{'<body>'}</code> and sets <code>data-scheme=&quot;primary&quot;</code>, so its colors
            match the site theme.
        </>,
    ],
    props: [
        {
            component: 'AlertDialog.Body',
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
            component: 'AlertDialog.Footer',
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
            component: 'AlertDialog.Header',
            rows: [
                {
                    name: 'children',
                    type: 'ReactNode',
                    description: 'The title text. The header labels the dialog with it.',
                },
                {
                    name: 'showCloseButton',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Shows a close button at the right of the title bar.',
                },
                { name: 'className', type: 'string', description: 'Classes for the title bar.' },
            ],
        },
        {
            component: 'AlertDialog.Popup',
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
