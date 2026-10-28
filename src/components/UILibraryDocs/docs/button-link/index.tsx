import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import External from './External'
import externalSource from '!!../../rawSourceLoader!./External.tsx?raw'
import InGroup from './InGroup'
import inGroupSource from '!!../../rawSourceLoader!./InGroup.tsx?raw'
import Internal from './Internal'
import internalSource from '!!../../rawSourceLoader!./Internal.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'button-link',
    importPath: 'components/UI/Button',
    importNames: ['ButtonLink'],
    sourcePath: 'src/components/UI/Button',
    apiNote: 'ButtonLink is a site component, not a Base UI component. It also takes the props of an <a> element.',
    examples: [
        {
            id: 'internal',
            title: 'Links to site pages',
            description:
                'Pass a site path to to. ButtonLink takes the same appearance, variant, size, and icon props as Button.',
            Component: Internal,
            source: internalSource,
        },
        {
            id: 'external',
            title: 'External links',
            description:
                'Pass external to open the link in a new tab. Add an arrow icon to show that it leaves the site.',
            Component: External,
            source: externalSource,
        },
        {
            id: 'in-group',
            title: 'In a button group',
            description: 'Links in a ButtonGroup take its appearance, variant, and size, and join edge to edge.',
            Component: InGroup,
            source: inGroupSource,
        },
    ],
    notes: [
        <>
            Use ButtonLink for navigation and <Link to="/components/ui/button">Button</Link> for actions.
        </>,
        <>
            ButtonLink does not forward a ref, so it cannot be a Base UI <Snippet.Inline>{'render'}</Snippet.Inline>{' '}
            target.
        </>,
    ],
    props: [
        {
            component: 'ButtonLink',
            rows: [
                { name: 'to', type: 'string', description: 'A site path or a full URL. Required.' },
                {
                    name: 'appearance',
                    type: "'flat' | 'raised' | 'outline'",
                    defaultValue: "'raised'",
                    description: 'The shape: flat, raised 3D, or outlined.',
                },
                {
                    name: 'variant',
                    type: "'primary' | 'secondary' | 'danger'",
                    defaultValue: "'secondary'",
                    description: 'The meaning and color: brand orange, neutral, or destructive red.',
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
