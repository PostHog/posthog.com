import type { ComponentDoc } from '../../types'
import Types from './Types'
import typesSource from '!!../../rawSourceLoader!./Types.tsx?raw'
import Multiline from './Multiline'
import multilineSource from '!!../../rawSourceLoader!./Multiline.tsx?raw'
import Options from './Options'
import optionsSource from '!!../../rawSourceLoader!./Options.tsx?raw'
import Sequence from './Sequence'
import sequenceSource from '!!../../rawSourceLoader!./Sequence.tsx?raw'
import Controlled from './Controlled'
import controlledSource from '!!../../rawSourceLoader!./Controlled.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'rough-annotation',
    importPath: 'components/UI/RoughAnnotation',
    importNames: ['RoughAnnotation'],
    sourcePath: 'src/components/UI/RoughAnnotation',
    apiNote: 'RoughAnnotation is a copy of components/Code/RoughAnnotation. It draws with the rough-notation library.',
    examples: [
        {
            id: 'types',
            title: 'Every mark type',
            description: 'Set type to one of seven hand-drawn marks. Each mark draws in when it scrolls into view.',
            Component: Types,
            source: typesSource,
            replay: true,
        },
        {
            id: 'multiline',
            title: 'Highlight across lines',
            description: 'Set multiline to draw one mark for each line of wrapped text.',
            Component: Multiline,
            source: multilineSource,
            replay: true,
        },
        {
            id: 'options',
            title: 'Stroke, passes, and padding',
            description: 'Tune the line weight, the number of pen passes, and the space around the text.',
            Component: Options,
            source: optionsSource,
            replay: true,
        },
        {
            id: 'sequence',
            title: 'A sequence with delays',
            description: 'Set delay in milliseconds to draw marks one after another.',
            Component: Sequence,
            source: sequenceSource,
            replay: true,
        },
        {
            id: 'controlled',
            title: 'Controlled',
            description: 'Set show to draw or remove the mark from state. onComplete runs when the draw ends.',
            Component: Controlled,
            source: controlledSource,
        },
    ],
    notes: [
        'Use annotations rarely, to draw attention to one phrase.',
        'Pass a brand color name. Lines use the full color. The highlight type uses a see-through tint of it, so the text stays readable. Gray follows the text color.',
        'The mark is decorative and screen readers skip it. Do not use it to carry meaning.',
    ],
    props: [
        {
            component: 'RoughAnnotation',
            rows: [
                {
                    name: 'type',
                    type: "'underline' | 'box' | 'circle' | 'highlight' | 'strike-through' | 'crossed-off' | 'bracket'",
                    description: 'The mark to draw.',
                },
                {
                    name: 'color',
                    type: "'gray' | 'brand' | 'blue' | 'cobalt' | 'coral' | 'corn-blue' | 'green' | 'lemon' | 'lime' | 'purple' | 'tangerine' | 'teal' | 'violet' | 'yellow'",
                    defaultValue: "'gray'",
                    description: 'A brand color for the mark. Gray uses the text color.',
                },
                { name: 'strokeWidth', type: 'number', defaultValue: '2', description: 'The line weight in pixels.' },
                {
                    name: 'animationDuration',
                    type: 'number',
                    defaultValue: '800',
                    description: 'The draw time in milliseconds.',
                },
                {
                    name: 'padding',
                    type: 'number | [number, number] | [number, number, number, number]',
                    defaultValue: '0',
                    description: 'Space between the text and the mark, in pixels.',
                },
                {
                    name: 'animateOnScroll',
                    type: 'boolean',
                    defaultValue: 'true',
                    description: 'Draws the mark when the text scrolls into view.',
                },
                {
                    name: 'delay',
                    type: 'number',
                    defaultValue: '0',
                    description: 'Wait time before the draw, in milliseconds.',
                },
                { name: 'show', type: 'boolean', description: 'Shows or hides the mark from state.' },
                {
                    name: 'brackets',
                    type: "('left' | 'right' | 'top' | 'bottom')[]",
                    description: 'The sides that get a bracket when type is bracket.',
                },
                {
                    name: 'iterations',
                    type: 'number',
                    defaultValue: '2',
                    description: 'Pen passes. More passes look rougher.',
                },
                {
                    name: 'multiline',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Draws one mark for each line.',
                },
                { name: 'className', type: 'string', description: 'Classes for the wrapper span.' },
                { name: 'onComplete', type: '() => void', description: 'Runs when the draw ends.' },
            ],
        },
    ],
}
