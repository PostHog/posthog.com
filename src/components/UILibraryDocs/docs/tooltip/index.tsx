import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import WithoutArrow from './WithoutArrow'
import withoutArrowSource from '!!../../rawSourceLoader!./WithoutArrow.tsx?raw'
import Delay from './Delay'
import delaySource from '!!../../rawSourceLoader!./Delay.tsx?raw'
import IconButtons from './IconButtons'
import iconButtonsSource from '!!../../rawSourceLoader!./IconButtons.tsx?raw'
import Sides from './Sides'
import sidesSource from '!!../../rawSourceLoader!./Sides.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'tooltip',
    importPath: 'components/UI/Tooltip',
    importNames: ['Tooltip'],
    sourcePath: 'src/components/UI/Tooltip',
    baseUi: [{ label: 'Base UI Tooltip', url: 'https://base-ui.com/react/components/tooltip' }],
    examples: [
        {
            id: 'sides',
            title: 'Sides',
            description: 'Pass side to Tooltip.Popup. The arrow moves to point at the trigger.',
            Component: Sides,
            source: sidesSource,
        },
        {
            id: 'icon-buttons',
            title: 'On icon buttons',
            description:
                'An icon button shows no text, so a tooltip tells sighted users what it does. Use the same text as the aria-label.',
            Component: IconButtons,
            source: iconButtonsSource,
        },
        {
            id: 'delay',
            title: 'Open delay',
            description: 'A tooltip opens at once. Pass delay to Tooltip.Trigger to wait first.',
            Component: Delay,
            source: delaySource,
        },
        {
            id: 'withoutarrow',
            title: 'Without an arrow',
            description: 'Set showArrow to false for a plain tooltip box.',
            Component: WithoutArrow,
            source: withoutArrowSource,
        },
    ],
    notes: [
        <>
            A tooltip opens at once, like <code>OSButton</code> tooltips. Pass <code>delay</code> (in ms) to{' '}
            <code>Tooltip.Trigger</code> to wait first.
        </>,
        <>
            A tooltip closes as soon as the pointer leaves the trigger. The popup takes no pointer events, so it never
            blocks the content under it.
        </>,
        <>
            <code>Tooltip.Trigger</code> always sets its own <code>delay</code>, so the <code>delay</code> prop of{' '}
            <code>Tooltip.Provider</code> has no effect. Use the provider to group tooltips: when one tooltip is open,
            the next one opens with no animation.
        </>,
        <>
            <code>Tooltip.Popup</code> renders its own arrow. There is no <code>Tooltip.Arrow</code> part.
        </>,
        <>
            <code>Tooltip.Popup</code> combines Base UI&apos;s <code>Portal</code>, <code>Positioner</code>, and{' '}
            <code>Popup</code>. Pass positioner props, such as <code>side</code> and <code>align</code>, to it.
        </>,
        <>
            The popup renders at the end of <code>{'<body>'}</code>. It sets{' '}
            <code>data-scheme=&quot;primary&quot;</code>, so a tooltip has the same color as other popups.
        </>,
        <>
            <code>Tooltip.Trigger</code> renders a plain <code>{'<button>'}</code>. Pass{' '}
            <code>{'render={<Button />}'}</code> to show a library button.
        </>,
        <>
            Do not put links or buttons in a tooltip. Use a <Link to="/components/ui/popover">Popover</Link> for content
            that the user can click.
        </>,
    ],
    props: [
        {
            component: 'Tooltip.Trigger',
            rows: [
                {
                    name: 'delay',
                    type: 'number',
                    defaultValue: '0',
                    description: 'How long to wait before the tooltip opens on hover, in milliseconds.',
                },
            ],
        },
        {
            component: 'Tooltip.Popup',
            rows: [
                {
                    name: 'sideOffset',
                    type: 'number',
                    defaultValue: '8, or 4 with no arrow',
                    description: 'The gap between the trigger and the tooltip, in pixels.',
                },
                {
                    name: 'showArrow',
                    type: 'boolean',
                    defaultValue: 'true',
                    description: 'Shows the arrow that points to the trigger.',
                },
                {
                    name: 'container',
                    type: 'HTMLElement | ShadowRoot | RefObject | null',
                    description: 'The element that the tooltip renders into. The default is the document body.',
                },
            ],
        },
    ],
}
