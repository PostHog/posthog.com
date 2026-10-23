import React from 'react'
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
            Do not set <code>overflow</code> on <code>Popover.Popup</code>, because it clips the arrow. Scroll an
            element inside the popup instead.
        </>,
        <>
            <code>Popover.Popup</code> combines Base UI&apos;s <code>Portal</code>, <code>Positioner</code>, and{' '}
            <code>Popup</code>. Pass positioner props, such as <code>side</code>, <code>align</code>, and{' '}
            <code>sideOffset</code>, to it.
        </>,
        <>
            The popup renders at the end of <code>{'<body>'}</code>, outside the window that opened it. It sets{' '}
            <code>data-scheme=&quot;primary&quot;</code>, so its colors match the site theme.
        </>,
        <>
            <code>Popover.Trigger</code> renders a plain <code>{'<button>'}</code>. Pass{' '}
            <code>{'render={<Button />}'}</code> to show a library button.
        </>,
        <>
            Use a popover for content that the user can click. For a short hint, use a{' '}
            <Link to="/components/ui/tooltip">Tooltip</Link>.
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
