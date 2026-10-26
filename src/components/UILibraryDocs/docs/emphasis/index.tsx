import type { ComponentDoc } from '../../types'
import Headlines from './Headlines'
import headlinesSource from '!!../../rawSourceLoader!./Headlines.tsx?raw'
import Tones from './Tones'
import tonesSource from '!!../../rawSourceLoader!./Tones.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'emphasis',
    importPath: 'components/UI/Emphasis',
    importNames: ['Emphasis'],
    sourcePath: 'src/components/UI/Emphasis',
    apiNote: 'Emphasis is a site component. It accepts span element props.',
    examples: [
        {
            id: 'headlines',
            title: 'Heading and sentence sizes',
            description: 'The pill scales with the surrounding text.',
            Component: Headlines,
            source: headlinesSource,
        },
        {
            id: 'tones',
            title: 'All colors and line breaks',
            description: 'Each line gets its own rounded tint.',
            Component: Tones,
            source: tonesSource,
        },
    ],
    notes: [
        'Replaces: the tinted heading spans in HeroCopy, DataStackSection, MCPPage, MCPLeaderboard, and Pricing/Redesign/Hero.tsx.',
        'The color is decoration only. It does not mean an error, a warning, or a success. Pick the color that suits the page.',
        'The colors match the live site. Red, blue, and green match the hero headings: red turns yellow in dark mode, and green uses a darker green in light mode. Yellow and purple match the carousel slide titles on the desktop and self-driving pages. Gray is the neutral option.',
        'Padding and corner sizes use em units. The tint scales with heading size.',
        'Cloned box decoration keeps padding and corners at line breaks. The component permits wrapping.',
        'This span adds visual emphasis. Use an em or strong child if you need semantic emphasis.',
    ],
    props: [
        {
            component: 'Emphasis',
            rows: [
                {
                    name: 'color',
                    type: "'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'gray'",
                    defaultValue: "'blue'",
                    description: 'Sets the tint and text color.',
                },
            ],
        },
    ],
}
