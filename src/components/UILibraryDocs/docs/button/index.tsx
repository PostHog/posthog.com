import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Groups from './Groups'
import groupsSource from '!!../../rawSourceLoader!./Groups.tsx?raw'
import IconButtons from './IconButtons'
import iconButtonsSource from '!!../../rawSourceLoader!./IconButtons.tsx?raw'
import Variants from './Variants'
import variantsSource from '!!../../rawSourceLoader!./Variants.tsx?raw'
import WithIcon from './WithIcon'
import withIconSource from '!!../../rawSourceLoader!./WithIcon.tsx?raw'
import Additions from './Additions'
import additionsSource from '!!../../rawSourceLoader!./Additions.tsx?raw'

const sizeType = "'sm' | 'md' | 'lg'"

export const doc: ComponentDoc = {
    slug: 'button',
    importPath: 'components/UI/Button',
    importNames: ['Button', 'IconButton', 'ButtonGroup'],
    sourcePath: 'src/components/UI/Button',
    baseUi: [{ label: 'Base UI Button', url: 'https://base-ui.com/react/components/button' }],
    examples: [
        {
            id: 'variants',
            title: 'Appearances and variants',
            description:
                'appearance sets the shape: raised (the default), flat, or outline. variant sets the meaning: secondary (the default), primary, or danger.',
            Component: Variants,
            source: variantsSource,
        },
        {
            id: 'sizes-states',
            title: 'Sizes and states',
            description: 'Every appearance comes in sm, md, and lg. Click Save to see the loading state.',
            Component: Additions,
            source: additionsSource,
        },
        {
            id: 'with-icon',
            title: 'With an icon',
            description: 'icon goes before the label. iconPosition="end" moves it after. iconEnd adds a second icon.',
            Component: WithIcon,
            source: withIconSource,
        },
        {
            id: 'icon-buttons',
            title: 'Icon buttons',
            description: 'IconButton shows only an icon, so give it an aria-label.',
            Component: IconButtons,
            source: iconButtonsSource,
        },
        {
            id: 'groups',
            title: 'Button groups',
            description: 'Buttons in a ButtonGroup take its appearance, variant, and size, and join edge to edge.',
            Component: Groups,
            source: groupsSource,
        },
    ],
    notes: [
        <>
            Raised is the default. Use flat only where a raised button does not fit, such as toolbars, bars, and actions
            that repeat in a list. Use outline for a secondary action next to a raised one. Make the main action in a
            section primary, and use one primary per section. Over images or video, use{' '}
            <Link to="/components/ui/floating-button">FloatingButton</Link>.
        </>,
        <>
            Pick the variant by what the button does. Use danger only for destructive actions, and confirm actions that
            cannot be undone with an <Link to="/components/ui/alert-dialog">AlertDialog</Link>.
        </>,
        <>
            Use <Snippet.Inline>{'loading'}</Snippet.Inline>, not <Snippet.Inline>{'disabled'}</Snippet.Inline>, while a
            request runs. The width stays the same and the button stays focusable.
        </>,
        <>
            For navigation, use <Link to="/components/ui/button-link">ButtonLink</Link>.
        </>,
        <>
            To use a library button as a Base UI trigger, pass it to <Snippet.Inline>{'render'}</Snippet.Inline>, for
            example <Snippet.Inline>{'<Popover.Trigger render={<Button />}>'}</Snippet.Inline>.
        </>,
    ],
    props: [
        {
            component: 'Button',
            rows: [
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
                { name: 'size', type: sizeType, defaultValue: "'md'", description: 'Height and text size.' },
                { name: 'icon', type: 'ReactNode', description: 'An icon next to the text.' },
                { name: 'iconEnd', type: 'ReactNode', description: 'A second icon after the label.' },
                {
                    name: 'loading',
                    type: 'boolean',
                    description: 'Shows a spinner and blocks actions. The width does not change.',
                },
                {
                    name: 'iconPosition',
                    type: "'start' | 'end'",
                    defaultValue: "'start'",
                    description: 'Which side of the text the icon goes on.',
                },
            ],
        },
        {
            component: 'IconButton',
            rows: [
                { name: 'icon', type: 'ReactNode', description: 'The icon. Required.' },
                {
                    name: 'loading',
                    type: 'boolean',
                    description: 'Replaces the icon with a spinner and blocks actions.',
                },
                { name: 'aria-label', type: 'string', description: 'The accessible name. Required.' },
            ],
        },
        {
            component: 'ButtonGroup',
            rows: [
                {
                    name: 'appearance',
                    type: "'flat' | 'raised' | 'outline'",
                    defaultValue: "'raised'",
                    description: 'The shape: flat, raised 3D, or outlined. Sets it for every button in the group.',
                },
                {
                    name: 'variant',
                    type: "'primary' | 'secondary' | 'danger'",
                    defaultValue: "'secondary'",
                    description:
                        'The meaning and color: brand orange, neutral, or destructive red. Sets it for every button in the group.',
                },
                { name: 'size', type: sizeType, defaultValue: "'md'", description: 'Sets the size of every button.' },
                {
                    name: 'disabled',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Blocks every button and fades the group as one unit.',
                },
            ],
        },
    ],
}
