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
const SEQUENCES: Record<BuildingSection, ModuleName[]> = {
    top: ['single-story-3', 'single-story-2', 'single-story-1'],
    middle: ['single-story-3', 'double-story-3', 'single-story-2', 'double-story-2', 'single-story-1'],
    bottom: ['single-story-2', 'single-story-1', 'double-story-3', 'single-story-3', 'double-story-1'],
}
const SEEDS = { top: 37, middle: 103, bottom: 211 }

/** Stable pseudo-random offsets: no hydration mismatch or movement on re-render. */
function offset(section: BuildingSection, index: number): number {
    let value = Math.imul(index + 1, 2654435761) ^ SEEDS[section]
    value ^= value >>> 16
    return (((value >>> 0) % 1001) / 1000 - 0.5) * 0.18
}

type StackModule = { name: ModuleName; top: number; left: number; width: number; height: number }
type StackLayout = {
    modules: StackModule[]
    start: number
    end: number
    hog: { width: number; height: number; top: number; left: number }
}

/** Fit complete, proportional modules between two anchors. Content owns the height. */
export function layoutBuilding(section: BuildingSection, width: number, height: number): StackLayout | null {
    if (width <= 0 || height <= 0) return null
    const start = section === 'top' ? 0 : section === 'middle' ? -20 : -32
    const hogWidth = width * 0.45
    const hogHeight = (hogWidth * 127) / 117
    const end = section === 'bottom' ? height + 20 - hogHeight * 0.78 : height
    const distance = end - start
    if (distance <= 0) return null

    const sequence = SEQUENCES[section]
    const moduleWidth = width * 0.94
    const singles = sequence.filter((name) => name.startsWith('single'))
    const doubles = sequence.filter((name) => name.startsWith('double'))
    const terminal: ModuleName =
        section === 'middle' ? 'double-story-1' : section === 'bottom' ? 'double-story-2' : 'single-story-1'
    const target = distance / moduleWidth
    let names: ModuleName[] = [terminal]
    let joinAdjustment = 0
    let bestScore = Infinity
    // Choose whole floors near the required height, then share the small remaining
    // difference across their overlapping diamonds. All three stacks keep one width.
    const maxCount = Math.max(2, Math.ceil(target / 0.37) + 1)
    for (let count = 2; count <= maxCount; count++) {
        for (let doubleCount = 0; doubleCount < count; doubleCount++) {
            if (doubleCount && !doubles.length) continue
            const minimumSingles = Math.min(count - 1, Math.max(2, Math.ceil((count - 1) / 3)))
            if (count - 1 - doubleCount < minimumSingles) continue
            let singleIndex = 0
            let doubleIndex = 0
            const candidate = Array.from({ length: count - 1 }, (_, index) => {
                const useDouble =
                    Math.floor(((index + 1) * doubleCount) / (count - 1)) >
                    Math.floor((index * doubleCount) / (count - 1))
                return useDouble ? doubles[doubleIndex++ % doubles.length] : singles[singleIndex++ % singles.length]
            })
            const rise = candidate.reduce((sum, name) => sum + MODULES[name].rise / MODULES[name].width, 0)
            const adjustment = (target - rise - MODULES[terminal].baseY / MODULES[terminal].width) / (count - 1)
            const score = Math.abs(adjustment) + count * 0.003
            if (score < bestScore) {
                bestScore = score
                names = [...candidate, terminal]
                joinAdjustment = adjustment * moduleWidth
            }
        }
    }

    let top = start
    const modules = names.map((name, index) => {
        const art = MODULES[name]
        const scale = moduleWidth / art.width
        const horizontalOffset = offset(section, index) * moduleWidth
        const center = width / 2 + horizontalOffset
        // Lift offset floors independently; the final floor keeps its landing anchor.
        const lift = index === names.length - 1 ? 0 : Math.abs(horizontalOffset) * 0.75
        const module = {
            name,
            top: top - lift,
            left: center - art.baseX * scale,
            width: moduleWidth,
            height: art.height * scale,
        }
        top += art.rise * scale + joinAdjustment
        return module
    })
    const last = modules[modules.length - 1]
    const lastArt = MODULES[last.name]
    return {
        modules,
        start,
        end,
        hog: {
            width: hogWidth,
            height: hogHeight,
            top: height + 20 - hogHeight,
            left: last.left + (lastArt.baseX / lastArt.width) * last.width - hogWidth / 2,
        },
    }
}
