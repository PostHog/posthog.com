import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import WithClose from './WithClose'
import withCloseSource from '!!../../rawSourceLoader!./WithClose.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'popover',
    importPath: 'components/UI/Popover',
    importNames: ['Popover'],
    sourcePath: 'src/components/UI/Popover',
    baseUi: [{ label: 'Base UI Popover', url: 'https://base-ui.com/react/components/popover' }],
    examples: [
        {
            id: 'basic',
            title: 'Basic popover',
            description:
                'Click the trigger to open the popover. Popover.Arrow points to the trigger. Set the width on Popover.Popup.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'with-close',
            title: 'With a close button',
            description:
                'Popover.Close closes the popover. Popover.Popup takes positioner props, such as align="start".',
            Component: WithClose,
            source: withCloseSource,
        },
    ],
    notes: [
        <>
            Use a popover for content that the user interacts with next to a trigger. For a short text hint, use{' '}
            <Link to="/components/ui/tooltip">Tooltip</Link>. For a task that needs full focus, use{' '}
            <Link to="/components/ui/dialog">Dialog</Link>.
        </>,
        <>
            Do not set <Snippet.Inline>{'overflow'}</Snippet.Inline> on{' '}
            <Snippet.Inline>{'Popover.Popup'}</Snippet.Inline>, because it clips the arrow. Scroll an element inside it.
        </>,
    ],
    props: [
        {
            component: 'Popover.Popup',
            rows: [
                {
                    name: 'sideOffset',
                    type: 'number',
                    defaultValue: '8',
                    description: 'The gap between the trigger and the popup, in pixels.',
                },
                {
                    name: 'container',
                    type: 'HTMLElement | ShadowRoot | RefObject | null',
                    description: 'The element that the popup renders into. The default is the document body.',
                },
            ],
        },
    ],
}
