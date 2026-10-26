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
            description: 'The four tabs copy the content and hero props from /self-driving.',
            Component: SelfDriving,
            source: selfDrivingSource,
        },
        {
            id: 'desktop',
            title: 'Desktop features',
            description: 'Plan and Prompt copy the content from /desktop. The default appearance is minimal.',
            Component: Desktop,
            source: desktopSource,
        },
    ],
    notes: [
        'Replaces: TabbedCarousel. This is a copy, not a move. The original component and its call sites remain unchanged.',
        'To migrate, change the default import to components/UI/FeatureTabs. Rename TabbedCarouselTab to FeatureTabsTab and keep the existing tab objects and props.',
        'Minimal keeps the flat tab strip and optional active background. Hero keeps borders, hover effects, color halos, and the active background.',
        'The self-driving example copies all four tab objects and their panel content. The Desktop example copies its first two tab objects and the relevant panel styling.',
        'Hover and offscreen state pause the CSS progress animation. The pause button toggles manual pause. Selecting a tab restarts its progress; autoplay continues.',
        'The offscreen observer uses the nearest Radix ScrollArea viewport when available. Its top root margin stays at -300px.',
        'autoplayStartDelay uses one mount timer. animationend advances the slide. The progress and fade use the existing global carousel keyframes.',
        'Reduced motion and a hidden browser tab pause the progress and automatic tab changes. Focus does not pause them yet. The progress bar still animates width, as the original does.',
        'The original supports a top tab strip only. Vertical or side tabs are a possible follow-up, not part of this copy.',
        'The component uses container queries. Wrapped tabs reorder so the active row stays beside the panel. The shared scrollbarHidden token remains on the tab list.',
        'Radix generates the tab IDs. The original has no direct useId call, so no shared helper substitution is necessary.',
        'Supply at least one tab. Keep all tab values unique. Use project color tokens for color, activeText, and progressBar.',
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
