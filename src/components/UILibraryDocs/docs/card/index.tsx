import React from 'react'
import type { ComponentDoc } from '../../types'
import Bars from './Bars'
import barsSource from '!!../../rawSourceLoader!./Bars.tsx?raw'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import Levels from './Levels'
import levelsSource from '!!../../rawSourceLoader!./Levels.tsx?raw'
import Nested from './Nested'
import nestedSource from '!!../../rawSourceLoader!./Nested.tsx?raw'
import Padding from './Padding'
import paddingSource from '!!../../rawSourceLoader!./Padding.tsx?raw'
import Variants from './Variants'
import variantsSource from '!!../../rawSourceLoader!./Variants.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'card',
    importPath: 'components/UI/Card',
    importNames: ['Card'],
    imports: [{ path: 'components/UI/Section', names: ['Section'] }],
    sourcePath: 'src/components/UI/Card',
    sourcePaths: ['src/components/UI/Section'],
    apiNote:
        'Card and Section are site components. Root, Header, and Footer accept div props. Title accepts h3 props. Description accepts p props.',
    examples: [
        {
            id: 'variants',
            title: 'Materials and nesting',
            description:
                'Each variant appears alone, as an inset well, and with nested content. Use the Light and Dark controls to check both themes on glass.',
            Component: Variants,
            source: variantsSource,
        },
        {
            id: 'bars',
            title: 'Title and status bars',
            description:
                'Card.TitleBar and Card.StatusBar use the window chrome style. They reach the card edges at every padding.',
            Component: Bars,
            source: barsSource,
        },
        {
            id: 'levels',
            title: 'Sections and card levels',
            description:
                'A section is a border on the window, with no elevation. A card (level 1) is raised. A card on a card (level 2) is an inset well, so shadows never stack.',
            Component: Levels,
            source: levelsSource,
        },
        {
            id: 'basic',
            title: 'Basic',
            description: 'A header with a title and a description, and a footer for actions.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'padding',
            title: 'Padding',
            description: 'Three padding sizes. The default is md.',
            Component: Padding,
            source: paddingSource,
        },
        {
            id: 'nested',
            title: 'Card on a card',
            description: 'Cards count their own level. A card inside a card becomes an inset well.',
            Component: Nested,
            source: nestedSource,
        },
    ],
    notes: [
        <>
            Reach for a card first. Use a card for any small group of related content: a feature, a plan, a setting, a
            demo, a stat. Most page content that needs a container is a card.
        </>,
        <>
            Section is the exception. Use it only for a large page region that must stay flat on the window, such as a
            long form or a group of cards. If you are not sure, use a card.
        </>,
        <>
            Card.TitleBar takes an icon, a title, short meta text on the right, and optional actions. Card.StatusBar is
            a footer bar for counts, status, or code. Both reach the card edges, so put them first and last in the card.
        </>,
        <>
            A card is raised above the window (level 1). A card inside a card is an inset well (level 2). Only level 1
            casts an outer shadow by default. Level 2 uses an inner shadow. An explicit level 1 can add another outer
            shadow.
        </>,
        <>
            A card gets its level from the card around it, so you do not set <code>level</code> in most cases. A third
            level of nesting stays a level 2 well. Use a border, a divider, or white space in its place.
        </>,
        <>
            <code>Section</code> is not a card. It is a border on the window that marks a large region of a page. It has
            no shadow and does not change card levels. Inside solid cards, it uses an opaque face.
        </>,
        <>
            Card and Section use the same padding scale. Lines inside them use <code>surfaceDivider</code> from{' '}
            <code>styles.ts</code>, the same color as the section border.
        </>,
        <>
            Overlays use a solid fill and three shadow steps. Small is for tooltips. Medium is for menus, popovers,
            selects, comboboxes, preview cards, and toasts. Large is for dialogs, alert dialogs, and drawers. Every
            overlay shadow is larger than the level 1 card shadow.
        </>,
        <>Do not use a card only to add space. A card groups content that belongs together.</>,
        <>
            Variant selects the material. Level selects the elevation. Every variant supports both levels. Variants do
            not change padding.
        </>,
        <>Glass keeps the existing appearance. Solid uses opaque white in light mode and near-black in dark mode.</>,
        <>
            Nested cards use solid faces by default inside solid cards. Other parents use glass children. Set variant on
            a child to override this choice.
        </>,
        <>
            Dashed means a later or optional step, as on /pricing. State this meaning in text. It does not disable
            content or change its accessibility.
        </>,
        <>
            Replaces: use variant="dashed" for the later-step outline in PricingJourney. Existing pages remain
            unchanged.
        </>,
    ],
    props: [
        {
            component: 'Card.TitleBar',
            rows: [
                { name: 'children', type: 'ReactNode', description: 'The title.' },
                { name: 'icon', type: 'ReactNode', description: 'An icon before the title.' },
                { name: 'meta', type: 'ReactNode', description: 'Short text on the right, in the code font.' },
                { name: 'actions', type: 'ReactNode', description: 'Buttons on the right, after the meta text.' },
            ],
        },
        {
            component: 'Card.StatusBar',
            rows: [{ name: 'children', type: 'ReactNode', description: 'Counts, status, or code for the footer bar.' }],
        },
        {
            component: 'Card.Root',
            rows: [
                {
                    name: 'variant',
                    type: "'glass' | 'solid' | 'dashed'",
                    defaultValue: "'glass'; 'solid' inside solid cards",
                    description: 'Selects the material independently of level. A child can select its own variant.',
                },
                {
                    name: 'level',
                    type: '1 | 2',
                    defaultValue: 'parent + 1',
                    description:
                        '1 is a raised card and 2 is an inset well. A card inside a card is level 2. Sections do not count.',
                },
                {
                    name: 'padding',
                    type: "'none' | 'sm' | 'md' | 'lg'",
                    defaultValue: "'md'",
                    description: 'The inner padding (12, 16, or 24px) and the gap between parts (8, 12, or 16px).',
                },
            ],
        },
        {
            component: 'Section.Root',
            rows: [
                {
                    name: 'padding',
                    type: "'none' | 'sm' | 'md' | 'lg'",
                    defaultValue: "'md'",
                    description: 'The same padding scale as Card.',
                },
            ],
        },
    ],
}
