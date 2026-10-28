import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Tones from './Tones'
import tonesSource from '!!../../rawSourceLoader!./Tones.tsx?raw'
import Variants from './Variants'
import variantsSource from '!!../../rawSourceLoader!./Variants.tsx?raw'
import Sizes from './Sizes'
import sizesSource from '!!../../rawSourceLoader!./Sizes.tsx?raw'
import WithIcon from './WithIcon'
import withiconSource from '!!../../rawSourceLoader!./WithIcon.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'badge',
    importPath: 'components/UI/Badge',
    importNames: ['Badge'],
    sourcePath: 'src/components/UI/Badge',
    apiNote: 'Badge is a site component, not a Base UI component. It accepts span element props.',
    examples: [
        {
            id: 'colors',
            title: 'Colors',
            description: 'Solid is the default. Pick the color that suits the page.',
            Component: Tones,
            source: tonesSource,
        },
        {
            id: 'variants',
            title: 'Solid and soft',
            description: 'Solid is the default. Soft has a tint and a border.',
            Component: Variants,
            source: variantsSource,
        },
        {
            id: 'sizes',
            title: 'Sizes',
            description: 'Use small badges in compact rows.',
            Component: Sizes,
            source: sizesSource,
        },
        {
            id: 'withicon',
            title: 'Icon and long text',
            description: 'Icons add context. Long labels truncate.',
            Component: WithIcon,
            source: withiconSource,
        },
    ],
    notes: [
        <>
            Use Badge for short status or category labels, such as a release stage. It is not interactive. For an
            action, use a <Link to="/components/ui/button">Button</Link>.
        </>,
        'Put the meaning in the text. Colors are decoration and do not mean a status.',
    ],
    props: [
        {
            component: 'Badge',
            rows: [
                {
                    name: 'color',
                    type: "'gray' | 'brand' | 'blue' | 'cobalt' | 'coral' | 'corn-blue' | 'green' | 'lemon' | 'lime' | 'purple' | 'tangerine' | 'teal' | 'violet' | 'yellow'",
                    defaultValue: "'gray'",
                    description: 'Sets the color. Gray or one of the PostHog brand colors.',
                },
                {
                    name: 'appearance',
                    type: "'solid' | 'soft'",
                    defaultValue: "'solid'",
                    description: 'Sets the fill and border.',
                },
                {
                    name: 'size',
                    type: "'sm' | 'md'",
                    defaultValue: "'sm'",
                    description: 'Sets the height and text size.',
                },
                { name: 'icon', type: 'ReactNode', description: 'Adds a decorative icon before the label.' },
                { name: 'children', type: 'ReactNode', description: 'The badge label.' },
            ],
        },
    ],
}
