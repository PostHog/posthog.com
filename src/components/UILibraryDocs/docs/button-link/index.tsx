import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import External from './External'
import externalSource from '!!../../rawSourceLoader!./External.tsx?raw'
import InGroup from './InGroup'
import inGroupSource from '!!../../rawSourceLoader!./InGroup.tsx?raw'
import Internal from './Internal'
import internalSource from '!!../../rawSourceLoader!./Internal.tsx?raw'
import TwoIcons from './TwoIcons'
import twoIconsSource from '!!../../rawSourceLoader!./TwoIcons.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'button-link',
    importPath: 'components/UI/Button',
    importNames: ['ButtonLink'],
    sourcePath: 'src/components/UI/Button',
    apiNote: 'ButtonLink is a site component, not a Base UI component. It also takes the props of an <a> element.',
    examples: [
        {
            id: 'two-icons',
            title: 'Start and end icons',
            description: 'Use icon and iconEnd to show an icon on each side of the label.',
            Component: TwoIcons,
            source: twoIconsSource,
        },
        {
            id: 'internal',
            title: 'Links to site pages',
            description: 'Pass a site path in the to prop. ButtonLink takes the same variant and size props as Button.',
            Component: Internal,
            source: internalSource,
        },
        {
            id: 'external',
            title: 'External links',
            description:
                'Pass external to open the link in a new tab. ButtonLink does not add an arrow, so pass one with icon.',
            Component: External,
            source: externalSource,
        },
        {
            id: 'in-group',
            title: 'In a button group',
            description: 'Links in a ButtonGroup take its variant and size, and join edge to edge.',
            Component: InGroup,
            source: inGroupSource,
        },
    ],
    notes: [
        <>
            Use <code>ButtonLink</code> for navigation, and <code>Button</code> for actions. <code>ButtonLink</code>{' '}
            renders <code>components/Link</code> (an <code>{'<a>'}</code>) with the{' '}
            <Link to="/components/ui/button">Button</Link> styles. It does not use Base UI.
        </>,
        <>
            In a <code>ButtonGroup</code>, <code>ButtonLink</code> turns off the link context menu. The wrapper element
            of the menu breaks the edges of the group.
        </>,
        <>
            <code>ButtonLink</code> does not forward its ref, so it cannot be a Base UI <code>render</code> target.
        </>,
    ],
    props: [
        {
            component: 'ButtonLink',
            rows: [
                { name: 'to', type: 'string', description: 'A site path or a full URL. Required.' },
                {
                    name: 'variant',
                    type: "'default' | 'primary' | 'secondary' | 'danger'",
                    defaultValue: "'default'",
                    description: 'Flat, raised orange, raised white, or raised red.',
                },
                {
                    name: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    defaultValue: "'md'",
                    description: 'Height and text size.',
                },
                { name: 'icon', type: 'ReactNode', description: 'An icon next to the text.' },
                { name: 'iconEnd', type: 'ReactNode', description: 'A second icon after the label.' },
                {
                    name: 'iconPosition',
                    type: "'start' | 'end'",
                    defaultValue: "'start'",
                    description: 'Which side of the text the icon goes on.',
                },
                {
                    name: 'external',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Opens the link in a new tab.',
                },
                {
                    name: 'contextMenu',
                    type: 'boolean',
                    defaultValue: 'true',
                    description: 'Shows the link menu on right-click. In a ButtonGroup, the default is false.',
                },
                { name: 'event', type: 'string', description: 'A PostHog event to capture when the user clicks.' },
            ],
        },
    ],
}
