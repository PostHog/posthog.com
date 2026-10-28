import React from 'react'
import { Snippet } from 'components/UI/Snippet'
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
            title: 'Basic',
            description:
                'Call add() from Toast.useToastManager() with a title and a description. Click more than once to stack toasts.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'with-action',
            title: 'With an action',
            description:
                'Pass actionProps to add a button. The action does not close the toast, so close it in onClick.',
            Component: WithAction,
            source: withActionSource,
        },
        {
            id: 'types',
            title: 'Types',
            description: 'A status type sets the icon and its color.',
            Component: Types,
            source: typesSource,
        },
    ],
    notes: [
        'Use a toast for brief feedback after an action. Do not put information in it that the user must keep.',
        <>
            The site root already renders the toast stack. Add a toast with{' '}
            <Snippet.Inline>{'Toast.useToastManager().add()'}</Snippet.Inline> in a component, or with{' '}
            <Snippet.Inline>{'globalToastManager.add()'}</Snippet.Inline> outside React. Do not render another provider.
        </>,
        <>
            Toasts stack in one column at the bottom right, newest at the bottom, and close after 3 seconds. Set{' '}
            <Snippet.Inline>{'timeout: 0'}</Snippet.Inline> for a toast that stays until the user closes it, and use{' '}
            <Snippet.Inline>{'onClose'}</Snippet.Inline> to react to the close.
        </>,
        <>
            An action does not close its toast. Call <Snippet.Inline>{'close(id)'}</Snippet.Inline> with the id that{' '}
            <Snippet.Inline>{'add()'}</Snippet.Inline> returns.
        </>,
    ],
    props: [
        {
            component: 'Toast.useToastManager().add',
            rows: [
                {
                    name: 'type',
                    type: "ColorName | 'neutral' | 'info' | 'success' | 'warning' | 'error' | 'brand' | 'loading'",
                    description:
                        'A status alias shows its icon in its brand color. A brand color name shows the info icon in that color. loading shows a spinner. Omit type to show no icon.',
                },
            ],
        },
        {
            component: 'Toast.useToastManager().add data',
            rows: [
                {
                    name: 'image',
                    type: 'ReactNode',
                    description: 'A decorative image placed in the toast. Position it with absolute classes.',
                },
                {
                    name: 'align',
                    type: "'start' | 'center'",
                    defaultValue: "'center'",
                    description: 'Aligns the icon and buttons with the top or the middle of the text.',
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
