import type { ComponentDoc } from '../../types'
import Directions from './Directions'
import directionsSource from '!!../../rawSourceLoader!./Directions.tsx?raw'
import Controlled from './Controlled'
import controlledSource from '!!../../rawSourceLoader!./Controlled.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'compare',
    importPath: 'components/UI/Compare',
    importNames: ['Compare'],
    sourcePath: 'src/components/UI/Compare',
    apiNote: 'Compare accepts div props and forwards its ref to the outer div.',
    examples: [
        {
            id: 'directions',
            title: 'Horizontal and vertical',
            description:
                'Drag anywhere on the image, or focus it with Tab and use the arrow keys. These examples compare the same dashboard in two themes.',
            Component: Directions,
            source: directionsSource,
        },
        {
            id: 'controlled',
            title: 'Controlled position',
            description: 'Use value and onValueChange to add a reset action.',
            Component: Controlled,
            source: controlledSource,
        },
    ],
    notes: [
        'Replaces: one-off image comparisons. react-compare-slider is installed but unused. This component uses no comparison dependency.',
        'A hidden native range input gives keyboard and screen reader access. Arrow keys, Home, and End move the divider. The handle shows the focus ring.',
        'Drag anywhere on the image surface. Pointer capture keeps the drag active outside the frame. Touch dragging prevents page scroll on the image surface.',
        'Horizontal places before on the left. Vertical places before at the top. Each label slides out of view as the divider passes it.',
        'CSS clip-path uses --compare-position. Images stay full size while the divider moves. Motion preferences do not affect this direct user control.',
        'Use images with the same dimensions and alignment. object-contain keeps the whole screenshot visible. The example compares themes, not a product change.',
        'Each image can supply darkSrc. Theme classes select it without JavaScript. Without JavaScript, the initial comparison remains visible but cannot change.',
        'The initial position defaults to 50. Values clamp to 0–100. Non-finite values use 50.',
    ],
    props: [
        {
            component: 'Compare',
            rows: [
                {
                    name: 'before / after',
                    type: '{ src: string; darkSrc?: string; alt: string }',
                    description: 'Required. Supply each image and its description.',
                },
                {
                    name: 'beforeLabel / afterLabel',
                    type: 'string',
                    defaultValue: "'Before' / 'After'",
                    description: 'Sets visible labels and accessible value text.',
                },
                {
                    name: 'orientation',
                    type: "'horizontal' | 'vertical'",
                    defaultValue: "'horizontal'",
                    description: 'Sets the drag direction and clipping axis.',
                },
                {
                    name: 'value / defaultValue',
                    type: 'number',
                    defaultValue: 'defaultValue: 50',
                    description: 'Sets a controlled or initial percentage of the before image.',
                },
                {
                    name: 'onValueChange',
                    type: '(value: number) => void',
                    description: 'Receives the percentage during pointer or keyboard changes.',
                },
                {
                    name: 'label',
                    type: 'string',
                    defaultValue: "'Image comparison'",
                    description: 'The accessible name of the comparison.',
                },
                {
                    name: 'aspectRatio',
                    type: 'string',
                    description: 'Reserves space before the images load. Without it, the after image sets the height.',
                },
            ],
        },
    ],
}
