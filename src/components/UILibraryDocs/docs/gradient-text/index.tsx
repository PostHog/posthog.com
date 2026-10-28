import React from 'react'
import { Snippet } from 'components/UI/Snippet'
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
            title: 'Palettes',
            description: 'Each palette blends three PostHog brand colors.',
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
        'Use the effect on one large heading phrase per page at most.',
        <>
            Check the contrast against the real background. Pass <Snippet.Inline>{'animate={false}'}</Snippet.Inline>{' '}
            where motion distracts.
        </>,
    ],
    props: [
        {
            component: 'GradientText',
            rows: [
                {
                    name: 'palette',
                    type: "'sunset' | 'citrus' | 'fresh' | 'ocean' | 'dusk'",
                    defaultValue: "'sunset'",
                    description:
                        'Sets the gradient colors. sunset is coral, tangerine, and yellow. citrus is tangerine, yellow, and lemon. fresh is lime, green, and teal. ocean is corn blue, blue, and cobalt. dusk is violet, purple, and coral.',
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
