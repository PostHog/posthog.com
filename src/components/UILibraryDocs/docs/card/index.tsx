import type { ComponentDoc } from '../../types'
import Bars from './Bars'
import barsSource from '!!../../rawSourceLoader!./Bars.tsx?raw'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import Levels from './Levels'
import levelsSource from '!!../../rawSourceLoader!./Levels.tsx?raw'
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
            id: 'basic',
            title: 'Basic',
            description: 'A header with a title and a description, and a footer for actions.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'variants',
            title: 'Appearances',
            description: 'Glass is the default. Solid hides the wallpaper. Dashed marks a later or optional step.',
            Component: Variants,
            source: variantsSource,
        },
        {
            id: 'levels',
            title: 'Levels and sections',
            description:
                'A card is raised. A card inside a card becomes an inset well. A section is a flat border on the window.',
            Component: Levels,
            source: levelsSource,
        },
        {
            id: 'bars',
            title: 'Title and status bars',
            description: 'Card.TitleBar and Card.StatusBar run to the card edges at every padding.',
            Component: Bars,
            source: barsSource,
        },
        {
            id: 'padding',
            title: 'Padding',
            description: 'Three padding sizes. The default is md.',
            Component: Padding,
            source: paddingSource,
        },
    ],
    notes: [
        'Use a card for a small group of related content, such as a feature, a plan, a setting, or a stat. Do not use a card only to add space.',
        'Use Section only for a large flat region of a page, such as a long form or a group of cards. When you are not sure, use a card.',
        'Nesting sets the level for you: a card inside a card becomes an inset well. Avoid a third level. Use a divider or white space.',
        'Glass is the default. Use solid when the wallpaper must not show through, such as behind dense data. Use dashed for a later or optional step, and say so in the text.',
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
                    name: 'appearance',
                    type: "'glass' | 'solid' | 'dashed'",
                    defaultValue: "'glass'; 'solid' inside solid cards",
                    description: 'Selects the material independently of level. A child can select its own appearance.',
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
