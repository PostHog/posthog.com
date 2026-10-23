import type { ComponentDoc } from '../../types'
import Effects from './Effects'
import effectsSource from '!!../../rawSourceLoader!./Effects.tsx?raw'
import Stagger from './Stagger'
import staggerSource from '!!../../rawSourceLoader!./Stagger.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'reveal',
    importPath: 'components/UI/Reveal',
    importNames: ['Reveal'],
    sourcePath: 'src/components/UI/Reveal',
    apiNote: 'Reveal accepts div props and forwards its ref to the div. All content is visible in the server render.',
    examples: [
        {
            id: 'effects',
            title: 'Three entrance effects',
            description: 'Scroll to each screenshot. Each entrance runs once per mount.',
            Component: Effects,
            source: effectsSource,
            replay: true,
        },
        {
            id: 'stagger',
            title: 'Words and children',
            description: 'Words stay real text. Delay and stagger use milliseconds.',
            Component: Stagger,
            source: staggerSource,
            replay: true,
        },
    ],
    notes: [
        'Replaces: AnimateIntoView entrances, ChoppyReveal text, and IconPop-style entrances. Existing call sites remain unchanged.',
        'AnimateIntoView children map to children. Replace hidden and shown variants with effect, duration, and delay. Arbitrary motion variants have no direct mapping.',
        'For plain ChoppyReveal text, pass text, wordDelay as stagger, and initialDelay as delay. Inline element sequences use children with stagger instead of text.',
        'Completion callbacks and observer thresholds are not supported. Do not use decorative motion to schedule application work.',
        'One shared IntersectionObserver starts CSS animations at the first intersection. There are no timers or per-frame JavaScript updates.',
        'This component uses an observer instead of a view timeline. This keeps one-time entrances and millisecond delays consistent in supported browsers.',
        'Content starts in its final layout. The server render, JavaScript-disabled pages, and browsers without IntersectionObserver show all content.',
        'Animation starts at 40% opacity, never zero. Delay keeps content partly visible. Only opacity and transform animate; blur-in is omitted for performance.',
        'Reduced motion disables the animation. A preference change during an entrance also removes the animation immediately.',
        'Stagger wraps each direct child in a div. Use normal flow content. Do not use it inside a table or where direct child selectors are required.',
        'Text mode splits plain text into words and keeps whitespace. It overrides children. Word spans stay in the accessibility tree and support selection.',
        'An entrance can run again when the component remounts. Keep stable keys to avoid repeated motion. Apply Reveal to selected content, not every section.',
    ],
    props: [
        {
            component: 'Reveal',
            rows: [
                {
                    name: 'effect',
                    type: "'fade' | 'slide-up' | 'scale'",
                    defaultValue: "'slide-up'",
                    description: 'Selects the entrance effect.',
                },
                {
                    name: 'delay',
                    type: 'number',
                    defaultValue: '0',
                    description: 'Sets the initial delay in milliseconds.',
                },
                {
                    name: 'duration',
                    type: 'number',
                    defaultValue: '500',
                    description: 'Sets each entrance duration in milliseconds.',
                },
                {
                    name: 'stagger',
                    type: 'number',
                    defaultValue: '0; text mode: 45',
                    description: 'Sets the delay between children or words in milliseconds.',
                },
                {
                    name: 'text',
                    type: 'string',
                    description: 'Enables plain word-by-word text mode. Overrides children.',
                },
                {
                    name: 'children',
                    type: 'ReactNode',
                    description: 'Content to animate as one group or stagger by direct child.',
                },
            ],
        },
    ],
}
