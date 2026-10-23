import type { ComponentDoc } from '../../types'
import Palettes from './Palettes'
import palettesSource from '!!../../rawSourceLoader!./Palettes.tsx?raw'
import Motion from './Motion'
import motionSource from '!!../../rawSourceLoader!./Motion.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'gradient-text',
    importPath: 'components/UI/GradientText',
    importNames: ['GradientText'],
    sourcePath: 'src/components/UI/GradientText',
    apiNote: 'GradientText is a site component. It accepts span element props.',
    examples: [
        {
            id: 'palettes',
            title: 'Three palettes',
            description: 'Use brand, spectrum, or cool colors.',
            Component: Palettes,
            source: palettesSource,
        },
        {
            id: 'motion',
            title: 'Slow gradient flow',
            description: 'The gradient pauses outside the viewport and when the tab is hidden.',
            Component: Motion,
            source: motionSource,
            replay: true,
        },
    ],
    notes: [
        'Replaces: FlowingGradientHighlight in desktop.tsx, .text-gradient, .text-gradient-wizard, and RainbowText.',
        'Use spectrum for the yellow, green, and blue treatment. Use brand for warm colors or cool for blue, purple, and teal.',
        'The palettes use vivid project tokens. Spectrum matches the yellow, green, and blue colors in FlowingGradientHighlight.',
        'Supported browsers interpolate in OKLCH with the shorter hue path. This keeps color transitions bright. Other browsers use the standard gradient.',
        'The background spans twice the text width. A full 12-second cycle shows the complete palette.',
        'Animation changes background position only. The server shows a complete static gradient.',
        'The effect pauses outside the viewport and when the document is hidden. Reduced motion shows a static gradient.',
        'Pass animate={false} for static text. This color-only effect has no separate pause button.',
        'duration uses seconds. Values below one second clamp to one second.',
        'The component owns its CSS keyframes. It does not depend on the misplaced text-gradient keyframe in tailwind.config.js.',
        'Forced colors use CanvasText. Browsers without text clipping use the first palette color.',
        'Reserve this effect for large headings. Check contrast against the actual background before use.',
    ],
    props: [
        {
            component: 'GradientText',
            rows: [
                {
                    name: 'palette',
                    type: "'brand' | 'spectrum' | 'cool'",
                    defaultValue: "'brand'",
                    description: 'Sets the gradient colors.',
                },
                {
                    name: 'animate',
                    type: 'boolean',
                    defaultValue: 'true',
                    description: 'Enables motion while the text is visible.',
                },
                {
                    name: 'duration',
                    type: 'number',
                    defaultValue: '12',
                    description: 'Sets one complete animation cycle in seconds.',
                },
            ],
        },
    ],
}
