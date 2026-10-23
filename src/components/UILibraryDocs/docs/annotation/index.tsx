import type { ComponentDoc } from '../../types'
import Shapes from './Shapes'
import shapesSource from '!!../../rawSourceLoader!./Shapes.tsx?raw'
import Narrow from './Narrow'
import narrowSource from '!!../../rawSourceLoader!./Narrow.tsx?raw'
import Wide from './Wide'
import wideSource from '!!../../rawSourceLoader!./Wide.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'annotation',
    importPath: 'components/UI/Annotation',
    importNames: ['Annotation'],
    sourcePath: 'src/components/UI/Annotation',
    apiNote: 'Annotation accepts div element props and forwards its ref to the container.',
    examples: [
        {
            id: 'shapes',
            title: 'Shapes and directions',
            description:
                'All three shapes stay visible at 400px. Side notes stack above the target. Bottom notes stay below it.',
            Component: Shapes,
            source: shapesSource,
            replay: true,
        },
        {
            id: 'narrow',
            title: 'Narrow containers',
            description: 'Arrows stay visible below 256px too. Hide only optional notes with narrow="hide".',
            Component: Narrow,
            source: narrowSource,
            replay: true,
        },
        {
            id: 'wide',
            title: 'Side placement in wide containers',
            description:
                'This demo keeps a 640px width. Scroll horizontally to see both side placements and every arrow shape.',
            Component: Wide,
            source: wideSource,
            replay: true,
        },
    ],
    notes: [
        'Replaces: local arrow-and-note layouts. DottedConnection connects separate code elements; ImageAnnotations marks image coordinates. Use Annotation for a note beside a wrapped target.',
        'The note uses the existing Squeak font. The arrow is decorative SVG. The note stays real text in the document.',
        'The component reserves space for the note. It does not cover the target or require absolute coordinates.',
        'Below 448px, left and right notes stack above the target with a downward arrow. Bottom notes stay below with an upward arrow. Arrows stay visible by default, even below 256px.',
        'At 448px or more, left and right notes sit beside the target. The arrow sits between the note and target in both layouts.',
        'Every path starts at the note edge and ends at the target edge. The arrow rotates around those anchors for each side. Wrap a smaller region to point at a specific button or price.',
        'Notes use bold 20px Squeak text and vivid theme colors. The arrow shares the note color. Light mode uses small shade adjustments for contrast. Warning uses red-orange in light mode and yellow in dark mode.',
        'Use narrow="hide" only for optional text. It hides both the note and arrow below 448px.',
        'Draw-in uses CSS stroke motion on a view timeline. This small SVG has no continuous animation or per-frame JavaScript.',
        'Browsers without view timelines show the full arrow. Reduced motion removes the animation. Server rendering shows the complete note and target.',
    ],
    props: [
        {
            component: 'Annotation',
            rows: [
                {
                    name: 'note',
                    type: 'ReactNode',
                    description: 'A short note. Keep essential instructions in the target content.',
                },
                { name: 'children', type: 'ReactNode', description: 'The target element or region.' },
                {
                    name: 'side',
                    type: "'top' | 'bottom' | 'left' | 'right'",
                    defaultValue: "'top'",
                    description: 'Places the note on this side. Left and right stack above the target below 448px.',
                },
                {
                    name: 'shape',
                    type: "'curved' | 'loop' | 'straight'",
                    defaultValue: "'curved'",
                    description: 'Selects the arrow path.',
                },
                {
                    name: 'tone',
                    type: "'neutral' | 'info' | 'success' | 'warning' | 'error' | 'brand'",
                    defaultValue: "'neutral'",
                    description: 'Sets the note and arrow color.',
                },
                {
                    name: 'drawIn',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Draws the arrow during scroll entry where view timelines work.',
                },
                {
                    name: 'narrow',
                    type: "'stack' | 'hide'",
                    defaultValue: "'stack'",
                    description: 'Keeps the note and arrow in a stack, or hides both below 448px.',
                },
            ],
        },
    ],
}
