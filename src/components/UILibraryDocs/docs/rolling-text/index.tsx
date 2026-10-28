import type { ComponentDoc } from '../../types'
import Headline from './Headline'
import headlineSource from '!!../../rawSourceLoader!./Headline.tsx?raw'
import Static from './Static'
import staticSource from '!!../../rawSourceLoader!./Static.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'rolling-text',
    importPath: 'components/UI/RollingText',
    importNames: ['RollingText'],
    sourcePath: 'src/components/UI/RollingText',
    apiNote: 'RollingText is a site component. It accepts span element props.',
    examples: [
        {
            id: 'headline',
            title: 'Headline',
            description:
                'The longest word sets the width, so the headline does not move. Hover or focus pauses the motion.',
            Component: Headline,
            source: headlineSource,
            replay: true,
        },
        {
            id: 'static',
            title: 'Without motion',
            description: 'animate={false}, a single word, or an empty list shows static text.',
            Component: Static,
            source: staticSource,
        },
    ],
    notes: [
        'Use short words that fit the narrowest window. The longest word sets the width.',
        'Use the effect in one headline per page at most.',
    ],
    props: [
        {
            component: 'RollingText',
            rows: [
                { name: 'words', type: 'readonly string[]', description: 'Sets the options in display order.' },
                {
                    name: 'staticText',
                    type: 'string',
                    description:
                        'Adds a description before the accessible list. Supplies visible text when the list is empty.',
                },
                {
                    name: 'interval',
                    type: 'number',
                    defaultValue: '2400',
                    description: 'Sets milliseconds per word, including its transition.',
                },
                {
                    name: 'animate',
                    type: 'boolean',
                    defaultValue: 'true',
                    description: 'Enables the CSS reel while the component is visible.',
                },
                {
                    name: 'color',
                    type: "'gray' | 'brand' | 'blue' | 'cobalt' | 'coral' | 'corn-blue' | 'green' | 'lemon' | 'lime' | 'purple' | 'tangerine' | 'teal' | 'violet' | 'yellow'",
                    description: 'A brand color for the words. Omit it to use the text color.',
                },
            ],
        },
    ],
}
