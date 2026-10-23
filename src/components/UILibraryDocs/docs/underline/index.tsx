import type { ComponentDoc } from '../../types'
import Copy from './Copy'
import copySource from '!!../../rawSourceLoader!./Copy.tsx?raw'
import Marks from './Marks'
import marksSource from '!!../../rawSourceLoader!./Marks.tsx?raw'
import Draw from './Draw'
import drawSource from '!!../../rawSourceLoader!./Draw.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'underline',
    importPath: 'components/UI/Underline',
    importNames: ['Underline'],
    sourcePath: 'src/components/UI/Underline',
    apiNote:
        'Underline accepts the original RoughAnnotation props with an optional type and tone. The library copy is also available for direct use.',
    examples: [
        {
            id: 'copy',
            title: 'Homepage copy and wrapped phrases',
            description: 'A single annotation follows the full phrase across line breaks.',
            Component: Copy,
            source: copySource,
            replay: true,
        },
        {
            id: 'marks',
            title: 'Six marks',
            description: 'Frames draw around the text without adding inline padding.',
            Component: Marks,
            source: marksSource,
            replay: true,
        },
        {
            id: 'draw',
            title: 'Draw on scroll',
            description: 'Scroll the preview to bring the underline into view.',
            Component: Draw,
            source: drawSource,
            replay: true,
        },
    ],
    notes: [
        'Replaces: the local Underline in Home/HeroCopy/variants.tsx and RoughAnnotation line or frame marks. Existing uses remain unchanged.',
        'Underline wraps the library copy of RoughAnnotation. Its defaults match the hero: type="underline", currentColor, strokeWidth={1}, and multiline.',
        'As in the hero, the underlined text uses text-secondary and the stroke uses the surrounding text color. className sets the text color. A tone changes the stroke color. An explicit color overrides it.',
        'Use type for underline, box, circle, strike-through, crossed-off, or bracket. Wave and double are not rough-notation types.',
        'One annotation wraps the whole phrase. multiline draws a continuous mark on each text line; it does not split the phrase at spaces.',
        'Frames use annotation padding. They do not add CSS padding or move the text.',
        'Real text renders on the server. The decorative marks render after hydration; they do not appear without JavaScript.',
        'The generated SVG is aria-hidden and not focusable. State the meaning of crossed-out text in the surrounding copy.',
        'The copied component retains viewport entry animation and redraws after window resize or sibling style changes.',
        'Reduced motion removes the draw animation and delay. The mark still appears after hydration when its visibility condition is met.',
        'animateOnScroll defaults to true. Pass show with animateOnScroll={false} to draw immediately. show={false} hides the mark.',
        'Select Replay under an example to draw the mark again. All animation props pass through to RoughAnnotation.',
        'RoughAnnotation is also available from components/UI/RoughAnnotation for direct access to every mark type and original prop.',
    ],
    props: [
        {
            component: 'Underline',
            rows: [
                {
                    name: 'type',
                    type: "'underline' | 'box' | 'circle' | 'strike-through' | 'crossed-off' | 'bracket'",
                    defaultValue: "'underline'",
                    description: 'Selects the rough-notation mark.',
                },
                {
                    name: 'tone',
                    type: 'Tone',
                    defaultValue: 'Text color',
                    description: 'Sets the stroke color in light and dark mode.',
                },
                { name: 'color', type: 'string', description: 'Overrides the tone with a CSS color.' },
                {
                    name: 'strokeWidth',
                    type: 'number',
                    defaultValue: '1',
                    description: 'Sets the stroke width in pixels.',
                },
                {
                    name: 'padding',
                    type: 'number | [number, number] | [number, number, number, number]',
                    description: 'Sets mark padding without changing text layout.',
                    defaultValue: '0',
                },
                {
                    name: 'multiline',
                    type: 'boolean',
                    defaultValue: 'true',
                    description: 'Draws one mark per text line.',
                },
                {
                    name: 'animateOnScroll',
                    type: 'boolean',
                    defaultValue: 'true',
                    description: 'Draws when the text enters the viewport. Pass show when false.',
                },
                {
                    name: 'delay',
                    type: 'number',
                    defaultValue: '0',
                    description: 'Sets the delay before drawing, in milliseconds.',
                },
                {
                    name: 'animationDuration',
                    type: 'number',
                    defaultValue: '800',
                    description: 'Sets the draw duration in milliseconds.',
                },
                {
                    name: 'iterations',
                    type: 'number',
                    defaultValue: '2',
                    description: 'Sets the number of sketch passes.',
                },
                { name: 'show', type: 'boolean', description: 'Controls visibility. It overrides scroll visibility.' },
                {
                    name: 'brackets',
                    type: "('left' | 'right' | 'top' | 'bottom')[]",
                    description: 'Selects the sides for a bracket mark.',
                },
                { name: 'onComplete', type: '() => void', description: 'Runs after the draw duration.' },
                { name: 'className', type: 'string', description: 'Adds classes to the text wrapper.' },
                { name: 'children', type: 'ReactNode', description: 'Sets the real text or inline content.' },
            ],
        },
    ],
}
