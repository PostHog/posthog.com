import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import { StatusChoiceGuide } from '../../ChoiceGuide'
import {
    tagAppearanceRow,
    tagAppearancesDescription,
    tagColorRow,
    tagColorsDescription,
    tagHrefRow,
    tagPreviewDescription,
    tagPreviewNote,
    tagPreviewRow,
} from '../../tagDocs'
import Tones from './Tones'
import tonesSource from '!!../../rawSourceLoader!./Tones.tsx?raw'
import Variants from './Variants'
import variantsSource from '!!../../rawSourceLoader!./Variants.tsx?raw'
import Sizes from './Sizes'
import sizesSource from '!!../../rawSourceLoader!./Sizes.tsx?raw'
import Inline from './Inline'
import inlineSource from '!!../../rawSourceLoader!./Inline.tsx?raw'
import Links from './Links'
import linksSource from '!!../../rawSourceLoader!./Links.tsx?raw'
import Preview from './Preview'
import previewSource from '!!../../rawSourceLoader!./Preview.tsx?raw'
import WithIcon from './WithIcon'
import withiconSource from '!!../../rawSourceLoader!./WithIcon.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'badge',
    importPath: 'components/UI/Badge',
    importNames: ['Badge'],
    sourcePath: 'src/components/UI/Badge',
    apiNote:
        'Badge is a site component, not a Base UI component. Without href, it accepts span element props. With href, it takes the props of the site Link.',
    examples: [
        {
            id: 'colors',
            title: 'Colors',
            description: tagColorsDescription,
            Component: Tones,
            source: tonesSource,
        },
        {
            id: 'variants',
            title: 'Solid and soft',
            description: tagAppearancesDescription,
            Component: Variants,
            source: variantsSource,
        },
        {
            id: 'sizes',
            title: 'Sizes',
            description:
                'Use sm (the default) for most badges. Use md when the badge sits beside larger text, such as a card title.',
            Component: Sizes,
            source: sizesSource,
        },
        {
            id: 'withicon',
            title: 'Icon and long text',
            description: 'Use an icon when it makes the label faster to recognize. Long labels truncate.',
            Component: WithIcon,
            source: withiconSource,
        },
        {
            id: 'links',
            title: 'Links',
            description:
                'Pass href to make the badge a link. Internal links open in the app window, like the site Link.',
            Component: Links,
            source: linksSource,
        },
        {
            id: 'preview',
            title: 'With a preview',
            description: tagPreviewDescription('badge'),
            Component: Preview,
            source: previewSource,
        },
        {
            id: 'inline',
            title: 'Inline',
            description:
                'Set size to inline to put a badge in a heading or a sentence. The badge scales with the text around it and does not break across lines.',
            Component: Inline,
            source: inlineSource,
        },
    ],
    notes: [
        <StatusChoiceGuide key="guide" />,
        <>
            A badge with href is a link. For an action, use a <Link to="/components/ui/button">Button</Link>.
        </>,
        'Put the meaning in the text. Colors are decoration and do not mean a status.',
        tagPreviewNote('badge'),
    ],
    props: [
        {
            component: 'Badge',
            rows: [
                tagColorRow,
                tagAppearanceRow,
                {
                    name: 'size',
                    type: "'sm' | 'md' | 'inline'",
                    defaultValue: "'sm'",
                    description: 'Sets the height and text size. inline scales the badge with the text around it.',
                },
                tagHrefRow('badge'),
                tagPreviewRow('badge'),
                { name: 'icon', type: 'ReactNode', description: 'Adds a decorative icon before the label.' },
                { name: 'children', type: 'ReactNode', description: 'The badge label.' },
            ],
        },
    ],
}
