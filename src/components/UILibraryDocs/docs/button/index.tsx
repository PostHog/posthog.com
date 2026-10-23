import React from 'react'
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
            title: 'Variants and sizes',
            description:
                'default is flat. primary, secondary, and danger are raised buttons. Buttons of the same size have the same height.',
            Component: Variants,
            source: variantsSource,
        },
        {
            id: 'with-icon',
            title: 'With an icon',
            description: 'Pass icon, and iconPosition="end" to put it after the text.',
            Component: WithIcon,
            source: withIconSource,
        },
        {
            id: 'icon-buttons',
            title: 'Icon buttons',
            description: 'IconButton shows only an icon, so it needs an aria-label.',
            Component: IconButtons,
            source: iconButtonsSource,
        },
        {
            id: 'groups',
            title: 'Button groups',
            description: 'Buttons in a ButtonGroup take its variant and size, and join edge to edge.',
            Component: Groups,
            source: groupsSource,
        },
        {
            id: 'loading-danger-end-icon',
            title: 'Loading, danger, and two icons',
            description:
                'Click Save changes to start a two-second load. Danger marks destructive actions. iconEnd adds an icon after the label.',
            Component: Additions,
            source: additionsSource,
        },
    ],
    notes: [
        'Disabled flat buttons use muted text. Loading buttons keep their normal color.',
        'Disabled raised buttons fade the face and base together. In an enabled group, only the disabled segment content dims.',
        'Set disabled on ButtonGroup to block all buttons and fade the group as one unit.',
        <>
            Use <code>danger</code> for destructive actions, such as deletion. Use a confirmation dialog when an action
            cannot be undone.
        </>,
        <>
            <code>loading</code> puts a spinner in place of the start icon. A button without a start icon shows the
            spinner on top of a transparent label, so the width does not change and screen readers still read the label.
            Loading buttons stay focusable, but they do not accept actions.
        </>,
        <>
            Use <code>ButtonLink</code> for navigation, not <code>Button</code>. A <code>Button</code> rendered as
            another element gets <code>role=&quot;button&quot;</code>.
        </>,
        <>
            Raised buttons have a two-tone edge: a darker border around a lighter 3D base. The base is a{' '}
            <code>::before</code> layer behind the bottom half, so a pressed face never shows it above the button.
        </>,
        <>
            <code>OSButton</code> does not forward its ref, so it cannot be a Base UI <code>render</code> target. Use{' '}
            <code>Button</code>, for example <code>{'<Popover.Trigger render={<Button />}>'}</code>.
        </>,
        <>
            A <code>Button</code> inside a Base UI <code>Toggle</code> shows the pressed state. See{' '}
            <Link to="/components/ui/toggle">Toggle</Link>.
        </>,
    ],
    props: [
        {
            component: 'Button',
            rows: [
                {
                    name: 'variant',
                    type: "'default' | 'primary' | 'secondary' | 'danger'",
                    defaultValue: "'default'",
                    description: 'Flat, raised orange, raised white, or raised red.',
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
                    name: 'variant',
                    type: "'default' | 'primary' | 'secondary' | 'danger'",
                    defaultValue: "'default'",
                    description: 'Sets the variant of every button in the group.',
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
