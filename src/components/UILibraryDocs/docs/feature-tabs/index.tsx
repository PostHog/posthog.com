import React from 'react'
import Link from 'components/Link'
import SelfDriving from './SelfDriving'
import selfDrivingSource from '!!../../rawSourceLoader!./SelfDriving.tsx?raw'
import Desktop from './Desktop'
import desktopSource from '!!../../rawSourceLoader!./Desktop.tsx?raw'
import type { ComponentDoc } from '../../types'

export const doc: ComponentDoc = {
    slug: 'feature-tabs',
    importPath: 'components/UI/FeatureTabs',
    importNames: ['FeatureTabs'],
    sourcePath: 'src/components/UI/FeatureTabs',
    apiNote:
        'FeatureTabs is a copy of TabbedCarousel. It keeps Radix Tabs, the existing tooltip, and the original API. Named and default imports are available.',
    examples: [
        {
            id: 'self-driving',
            title: 'Self-driving hero',
            description: 'The hero appearance, with four feature tabs.',
            Component: SelfDriving,
            source: selfDrivingSource,
        },
        {
            id: 'desktop',
            title: 'Desktop features',
            description: 'The minimal appearance, the default.',
            Component: Desktop,
            source: desktopSource,
        },
    ],
    notes: [
        <>
            Use FeatureTabs on marketing pages to step through a few product features. To switch views inside an app,
            use <Link to="/components/ui/tabs">Tabs</Link>.
        </>,
        'Give each tab a unique value. Autoplay pauses on hover, off screen, and for users who prefer reduced motion.',
    ],
    props: [
        {
            component: 'FeatureTabs',
            rows: [
                {
                    name: 'tabs',
                    type: 'FeatureTabsTab[]',
                    description: 'The feature tabs. Supply at least one tab with a unique value.',
                },
                {
                    name: 'slideDuration',
                    type: 'number',
                    defaultValue: '5000',
                    description: 'Sets the progress animation duration in milliseconds.',
                },
                {
                    name: 'autoplayStartDelay',
                    type: 'number',
                    defaultValue: '0',
                    description: 'Pauses the first slide until this delay ends after mount.',
                },
                {
                    name: 'className',
                    type: 'string',
                    description: 'Adds classes to the outer container.',
                },
                {
                    name: 'slideClassName',
                    type: 'string',
                    description: 'Adds classes to the colored slide frame.',
                },
                {
                    name: 'showActiveBg',
                    type: 'boolean',
                    defaultValue: 'true',
                    description: 'Paints the active color in minimal mode. Hero always paints it.',
                },
                {
                    name: 'appearance',
                    type: "'minimal' | 'hero'",
                    defaultValue: "'minimal'",
                    description: 'Selects quiet tabs or bordered hero tabs with color halos.',
                },
            ],
        },
        {
            component: 'FeatureTabsTab',
            rows: [
                {
                    name: 'value',
                    type: 'string',
                    description: 'Sets the unique tab value.',
                },
                {
                    name: 'label',
                    type: 'ReactNode',
                    description: 'Sets the visible tab label.',
                },
                {
                    name: 'icon',
                    type: 'ReactNode',
                    description: 'Adds a tab icon. Any icon makes all triggers stack their icon and label.',
                },
                {
                    name: 'content',
                    type: 'ReactNode',
                    description: 'Sets the image, video, or content panel.',
                },
                {
                    name: 'color',
                    type: 'string',
                    description: 'Sets the active background classes.',
                },
                {
                    name: 'activeText',
                    type: 'string',
                    description: 'Sets the active text classes.',
                },
                {
                    name: 'progressBar',
                    type: 'string',
                    description: 'Sets the progress bar classes.',
                },
                {
                    name: 'triggerClassName',
                    type: 'string',
                    description: 'Adds classes to this tab trigger.',
                },
            ],
        },
    ],
}
