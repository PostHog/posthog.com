import React from 'react'
import { Snippet } from 'components/UI/Snippet'
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
                'AlertDialog.Header uses the standard header without a close button. Put each action in an AlertDialog.Close.',
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
            description:
                'The body scrolls, and the header and footer stay fixed. Set separator to draw a line above the actions.',
            Component: LongContent,
            source: longContentSource,
        },
    ],
    notes: [
        <>
            Use an alert dialog only when the user must decide before going on, such as confirming a delete. A click
            outside does not close it. For anything else, use <Link to="/components/ui/dialog">Dialog</Link>.
        </>,
        <>
            Name each action by what it does, such as &quot;Delete project&quot;, not &quot;OK&quot;. Put each one in{' '}
            <Snippet.Inline>{'AlertDialog.Close'}</Snippet.Inline>.
        </>,
        <>
            Every alert dialog needs an <Snippet.Inline>{'AlertDialog.Title'}</Snippet.Inline>, even when you leave out
            the header.
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
                    description: 'Shows a close button at the right of the header.',
                },
                { name: 'className', type: 'string', description: 'Classes for the header.' },
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
