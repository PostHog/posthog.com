import React from 'react'
import { Snippet } from 'components/UI/Snippet'
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
            title: 'With a header',
            description: 'Dialog.Header shows the title and a close button. Put the content in Dialog.Body.',
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
                'The dialog is never taller than the screen. The body scrolls, and the header and footer stay fixed.',
            Component: LongContent,
            source: longContentSource,
        },
    ],
    notes: [
        <>
            Use a dialog for a focused task that interrupts the page. When the user must decide before going on, use{' '}
            <Link to="/components/ui/alert-dialog">AlertDialog</Link>. For a panel from a screen edge, use{' '}
            <Link to="/components/ui/drawer">Drawer</Link>. For light content next to a trigger, use{' '}
            <Link to="/components/ui/popover">Popover</Link>.
        </>,
        <>
            Every dialog needs a title. Use <Snippet.Inline>{'Dialog.Header'}</Snippet.Inline>, or put{' '}
            <Snippet.Inline>{'Dialog.Title'}</Snippet.Inline> in the body.
        </>,
        <>
            Put long content in <Snippet.Inline>{'Dialog.Body'}</Snippet.Inline>, so it scrolls and the footer stays
            visible.
        </>,
        <>
            Pass a width class, such as <Snippet.Inline>{'max-w-2xl'}</Snippet.Inline>, to{' '}
            <Snippet.Inline>{'Dialog.Popup'}</Snippet.Inline> to change its width.
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
                    description: 'Shows a close button at the right of the header.',
                },
                { name: 'className', type: 'string', description: 'Classes for the header.' },
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
