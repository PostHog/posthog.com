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
            id: 'tones',
            title: 'All tones',
            description: 'Choose a tone that matches the label.',
            Component: Tones,
            source: tonesSource,
        },
        {
            id: 'variants',
            title: 'Soft and solid',
            description: 'Soft badges have a border. Solid badges have a filled background.',
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
        'Use Badge for short labels, such as release stages.',
        'Badge is not interactive. Use a Button for an action.',
        'Keep the meaning in the text. Do not use color alone.',
        'Give truncated text a title or show its full text nearby. Icons are decorative.',
    ],
    props: [
        {
            component: 'Badge',
            rows: [
                {
                    name: 'tone',
                    type: "'neutral' | 'info' | 'success' | 'warning' | 'error' | 'brand'",
                    defaultValue: "'neutral'",
                    description: 'Sets the status color.',
                },
                {
                    name: 'appearance',
                    type: "'soft' | 'solid'",
                    defaultValue: "'soft'",
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
