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
            title: 'Stable headline with hover and focus pause',
            description: 'Each option contributes to the reserved width.',
            Component: Headline,
            source: headlineSource,
            replay: true,
        },
        {
            id: 'static',
            title: 'Static and short lists',
            description: 'Single and empty lists do not animate.',
            Component: Static,
            source: staticSource,
        },
    ],
    notes: [
        'Replaces: SlotMachineText and the unused RollingWords. Pass words instead of timed steps. Put a prefix outside RollingText.',
        'All options contribute to the width from the server render. The surrounding headline does not move as words change.',
        'Use short words or phrases that fit the narrowest window. Each option stays on one line.',
        'Screen readers receive the full word list once. staticText adds an optional description before the list. The reel and width placeholders are decorative.',
        'The server and reduced-motion mode show the first nonempty word. Empty lists use staticText as a fallback.',
        'CSS transforms move the reel. No timer or JavaScript runs for each frame or word.',
        'Hover or keyboard focus pauses the current reel position. Move the pointer away or move focus to resume.',
        'The animated span accepts keyboard focus and shows a focus outline. It has no pause button.',
        'The reel also pauses outside the viewport and when the tab is hidden. Reduced motion removes animation and shows the first word.',
        'animate={false} shows the first word without motion.',
        "interval includes each word's hold and transition. Values below 1200 milliseconds clamp to 1200 milliseconds.",
        'Empty strings do not become options. An empty list shows staticText, or an empty span if staticText is absent.',
        "This component loops at a uniform interval. It does not reproduce RollingWords' accelerating sequence or final stop.",
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
            ],
        },
    ],
}
