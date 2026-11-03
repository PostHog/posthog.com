import React from 'react'
import { Snippet } from 'components/UI/Snippet'
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
        'Use a tooltip for a short label or hint, such as the name of an icon button. Touch users cannot hover, so never put the only copy of important information in a tooltip.',
        <>
            Do not put links or buttons in a tooltip. Use a <Link to="/components/ui/popover">Popover</Link>.
        </>,
        <>
            Wrap nearby tooltips in <Snippet.Inline>{'Tooltip.Provider'}</Snippet.Inline>, so the next one opens at
            once.
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
