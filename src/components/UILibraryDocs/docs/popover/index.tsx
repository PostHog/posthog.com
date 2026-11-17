import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import { HoverSurfaceGuide } from '../../ChoiceGuide'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import OpenOnHover from './OpenOnHover'
import openOnHoverSource from '!!../../rawSourceLoader!./OpenOnHover.tsx?raw'
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
                'Use a popover for content that the user interacts with next to a trigger. Click the trigger to open it. Set the width on Popover.Popup.',
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
        {
            id: 'open-on-hover',
            title: 'Open on hover',
            description:
                'Set openOnHover on Popover.Trigger for a hover card on a trigger that is not a link. The popover still opens on click, tap, and keyboard, so all users can reach it. delay and closeDelay set the timing in milliseconds.',
            Component: OpenOnHover,
            source: openOnHoverSource,
        },
    ],
    notes: [
        <HoverSurfaceGuide key="guide" />,
        <>
            For a task that needs full focus, use <Link to="/components/ui/dialog">Dialog</Link>.
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
