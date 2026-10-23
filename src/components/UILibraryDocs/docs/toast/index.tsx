import React from 'react'
import type { ComponentDoc } from '../../types'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import WithAction from './WithAction'
import withActionSource from '!!../../rawSourceLoader!./WithAction.tsx?raw'

import Types from './Types'
import typesSource from '!!../../rawSourceLoader!./Types.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'toast',
    importPath: 'components/UI/Toast',
    importNames: ['Toast'],
    sourcePath: 'src/components/UI/Toast',
    baseUi: [{ label: 'Base UI Toast', url: 'https://base-ui.com/react/components/toast' }],
    examples: [
        {
            id: 'basic',
            title: 'Basic toast',
            description:
                'Call add() from Toast.useToastManager() with a title and a description. Click more than once to stack the toasts.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'with-action',
            title: 'With an action',
            description:
                'Pass actionProps to show a button in the toast. The action does not close the toast, so close it in onClick.',
            Component: WithAction,
            source: withActionSource,
        },
        {
            id: 'types',
            title: 'Types',
            description: 'Each type shows a colored status icon.',
            Component: Types,
            source: typesSource,
        },
    ],
    notes: [
        <>
            Render one <code>Toast.Provider</code> and one <code>Toast.Viewport</code> near the root of the page. Then
            call <code>Toast.useToastManager().add()</code> from any component inside the provider. Each example on this
            page has its own provider, so that you can copy it.
        </>,
        <>
            <code>Toast.Viewport</code> renders the toasts. Each toast shows a title, a description, one action, and a
            close button. You do not render the toast parts.
        </>,
        <>Toasts stack at the bottom right of the screen. The stack expands when the pointer is on it.</>,
        <>
            The action does not close its toast. Call <code>toastManager.close(id)</code> in its <code>onClick</code>,
            with the id that <code>add()</code> returns.
        </>,
        <>
            The viewport renders at the end of <code>{'<body>'}</code>. Each toast sets{' '}
            <code>data-scheme=&quot;primary&quot;</code>, so its colors match the site theme.
        </>,
    ],
    props: [
        {
            component: 'Toast.useToastManager().add',
            rows: [
                {
                    name: 'type',
                    type: "'success' | 'error' | 'warning' | 'info' | 'loading'",
                    description: 'Shows a colored status icon. loading shows a spinner. Omit type to show no icon.',
                },
            ],
        },
        {
            component: 'Toast.Viewport',
            rows: [
                {
                    name: 'container',
                    type: 'HTMLElement | ShadowRoot | RefObject | null',
                    description: 'The element that the toasts render into. The default is the document body.',
                },
            ],
        },
    ],
}
