import {
    HedgehogBeaker,
    HedgehogBusinessEvolution,
    HedgehogChartHog,
    HedgehogCodeBubble,
    HedgehogCodingGroup,
    HedgehogExperiment,
    HedgehogFinalEvolution,
    HedgehogMagnifyingGlass,
    HedgehogMoney,
    HedgehogOrganized,
    HedgehogPanic,
    HedgehogPartyHog,
    HedgehogQuickCall,
    HedgehogReading,
    HedgehogReadingIsMagic,
    HedgehogRemoteWork,
    HedgehogRoboHog,
} from '@posthog/brand/hoggies'

/**
 * The hedgehog illustrations Hogpedia uses, as an explicit registry.
 *
 * An article names its hog as a string in frontmatter, so the component has to be looked up
 * at run time. Do NOT do that with `import * as` from `@posthog/brand/hoggies`: a namespace
 * import defeats tree-shaking and pulls all 130-odd illustrations into every page that
 * renders one. That added about 8 MB of JavaScript before this registry existed.
 *
 * To use a new illustration, add a named import above and an entry below.
 *
 * The Main Page's "Featured hog" rotates through this same registry, so it adds no weight
 * of its own. See the note in `MainPageModules.tsx` for why it is not the whole library.
 */
export const HOGS: Record<string, React.ComponentType<any>> = {
    HedgehogBeaker,
    HedgehogBusinessEvolution,
    HedgehogChartHog,
    HedgehogCodeBubble,
    HedgehogCodingGroup,
    HedgehogExperiment,
    HedgehogFinalEvolution,
    HedgehogMagnifyingGlass,
    HedgehogMoney,
    HedgehogOrganized,
    HedgehogPanic,
    HedgehogPartyHog,
    HedgehogQuickCall,
    HedgehogReading,
    HedgehogReadingIsMagic,
    HedgehogRemoteWork,
    HedgehogRoboHog,
}
