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
            title: 'All tones and line breaks',
            description: 'Each line gets its own rounded tint.',
            Component: Tones,
            source: tonesSource,
        },
    ],
    notes: [
        'Replaces: the tinted heading spans in HeroCopy, DataStackSection, MCPPage, MCPLeaderboard, and Pricing/Redesign/Hero.tsx.',
        'Map blue spans to info, green spans to success, and yellow spans to warning. Map the red/yellow spans (text-red dark:text-yellow) to brand.',
        'Info uses the vivid hero blue. Brand keeps the site red in light mode and yellow in dark mode. Other tones use darker shades in light mode for contrast.',
        'Padding and corner sizes use em units. The tint scales with heading size.',
        'Cloned box decoration keeps padding and corners at line breaks. The component permits wrapping.',
        'This span adds visual emphasis. Use an em or strong child if you need semantic emphasis.',
    ],
    props: [
        {
            component: 'Emphasis',
            rows: [
                { name: 'tone', type: 'Tone', defaultValue: "'info'", description: 'Sets the tint and text color.' },
            ],
        },
    ],
}
