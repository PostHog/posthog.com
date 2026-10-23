import type { ComponentDoc } from '../../types'
import Hero from './Hero'
import heroSource from '!!../../rawSourceLoader!./Hero.tsx?raw'
import Tones from './Tones'
import tonesSource from '!!../../rawSourceLoader!./Tones.tsx?raw'
import Draw from './Draw'
import drawSource from '!!../../rawSourceLoader!./Draw.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'highlight',
    importPath: 'components/UI/Highlight',
    importNames: ['Highlight'],
    sourcePath: 'src/components/UI/Highlight',
    apiNote:
        'Highlight accepts the original RoughAnnotation props except its fixed mark type. The library copy is also available for direct use.',
    examples: [
        {
            id: 'hero',
            title: 'Homepage copy',
            description: 'This example recreates the homepage marker and delayed underline.',
            Component: Hero,
            source: heroSource,
            replay: true,
        },
        {
            id: 'tones',
            title: 'All tones',
            description: 'The sketch uses a translucent tone fill.',
            Component: Tones,
            source: tonesSource,
            replay: true,
        },
        {
            id: 'draw',
            title: 'Draw on scroll',
            description: 'Scroll the preview to bring the marker into view.',
            Component: Draw,
            source: drawSource,
            replay: true,
        },
    ],
    notes: [
        'Replaces: the local Highlight in Home/HeroCopy/variants.tsx and RoughAnnotation with type="highlight". Existing uses remain unchanged.',
        'Highlight wraps the library copy of RoughAnnotation. It uses the same rough-notation dependency and draws the actual hand-drawn marker.',
        'The homepage defaults use yellow at 15% opacity, strokeWidth={1}, padding={2}, multiline, and two sketch passes.',
        'Shared tones provide light and dark fills. An explicit color overrides the tone.',
        'Real text renders on the server. The decorative marks render after hydration; they do not appear without JavaScript.',
        'The generated SVG is aria-hidden and not focusable. The text remains available to screen readers.',
        'The copied component retains viewport entry animation and redraws after window resize or sibling style changes.',
        'Reduced motion removes the draw animation and delay. The mark still appears after hydration when its visibility condition is met.',
        'animateOnScroll defaults to true. Pass show with animateOnScroll={false} to draw immediately. show={false} hides the mark.',
        'Select Replay under an example to draw the mark again.',
        'RoughAnnotation is also available from components/UI/RoughAnnotation. It accepts all original props and every annotation type.',
        'Highlight no longer uses the CSS marker band or scroll timeline.',
    ],
    props: [
        {
            component: 'Highlight',
            rows: [
                {
                    name: 'tone',
                    type: "Tone | 'yellow'",
                    defaultValue: "'yellow'",
                    description: 'Sets the translucent marker fill.',
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
                    defaultValue: '2',
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
