export type BuildingSection = 'top' | 'middle' | 'bottom'

// Measured in each supplied SVG's viewBox. baseY bisects the diamond vertically;
// baseX bisects it horizontally. rise is its upper vertex, where the next roof joins.
export const MODULES = {
    'single-story-1': { width: 1086, height: 681, rise: 409.696, baseX: 536.68, baseY: 544.43 },
    'single-story-2': { width: 1086, height: 700, rise: 429.438, baseX: 542.52, baseY: 564.17 },
    'single-story-3': { width: 1086, height: 702, rise: 430.876, baseX: 543.67, baseY: 565.6 },
    'double-story-1': { width: 979, height: 987, rise: 735.098, baseX: 493.09, baseY: 860.28 },
    'double-story-2': { width: 976, height: 965, rise: 712.867, baseX: 490.63, baseY: 838.05 },
    'double-story-3': { width: 1047, height: 1057, rise: 785.869, baseX: 524.74, baseY: 920.6 },
}

type ModuleName = keyof typeof MODULES

const S1: ModuleName = 'single-story-1'
const S2: ModuleName = 'single-story-2'
const S3: ModuleName = 'single-story-3'
const D1: ModuleName = 'double-story-1'
const D2: ModuleName = 'double-story-2'
const D3: ModuleName = 'double-story-3'

type Floor = { name: ModuleName; minRatio: number }

// Reveal successive floors as the artwork container gets taller relative to its width.
// The landing floor stays separate so it always meets the card or hedgehog below.
export const STACK_FLOORS: Record<BuildingSection, Floor[]> = {
    top: [
        { name: S3, minRatio: 0 },
        { name: S2, minRatio: 0 },
        { name: S3, minRatio: 1.24 },
        { name: S1, minRatio: 1.58 },
        { name: S2, minRatio: 1.92 },
        { name: S3, minRatio: 2.25 },
        { name: S1, minRatio: 2.58 },
    ],
    middle: [
        { name: S3, minRatio: 0 },
        { name: D3, minRatio: 0 },
        { name: S2, minRatio: 0 },
        { name: S1, minRatio: 0 },
        { name: D2, minRatio: 2.83 },
        { name: S3, minRatio: 3.33 },
        { name: D3, minRatio: 3.78 },
        { name: S2, minRatio: 4.28 },
        { name: D2, minRatio: 4.77 },
        { name: S1, minRatio: 5.22 },
        { name: S3, minRatio: 5.58 },
        { name: D3, minRatio: 6.08 },
        { name: S2, minRatio: 6.57 },
    ],
    bottom: [
        { name: S2, minRatio: 0 },
        { name: S1, minRatio: 1.53 },
        { name: S3, minRatio: 1.89 },
        { name: D3, minRatio: 2.34 },
        { name: D1, minRatio: 3.06 },
    ],
}

// Deliberate, repeatable offsets. The terminal floor and its shadow share one offset.
export const OFFSETS = [-0.035, 0.07, -0.08, 0.035, -0.015, 0.085, -0.06, 0.015]
export const BASE_OFFSETS: Record<BuildingSection, number> = { top: 0.02, middle: 0.04, bottom: -0.02 }
export const BASE_MODULES: Record<BuildingSection, ModuleName> = { top: S1, middle: D1, bottom: D2 }

// Generated from SVG geometry once, including during SSR. Resizing runs only CSS.
export const FLOOR_QUERIES = Object.entries(STACK_FLOORS)
    .flatMap(([section, floors]) => {
        const base = MODULES[BASE_MODULES[section as BuildingSection]]
        let rise = 0
        return floors.map(({ name, minRatio }, index) => {
            const art = MODULES[name]
            rise += art.rise / art.width
            const rules = `
                .building-layout[data-section="${section}"] {
                    --joins: ${index + 1};
                    --base-rise: ${rise};
                    --natural-height: ${rise + base.baseY / base.width};
                }
                .building-layout[data-section="${section}"] > [data-floor-index="${index}"] { display: block; }
            `
            return minRatio === 0
                ? rules
                : `@container enterprise-building (max-aspect-ratio: 1 / ${minRatio}) { ${rules} }`
        })
    })
    .join('\n')
