// Board logic for Spot the Hog. Pure TypeScript with no React and no DOM, so `node --test` can run it.
// The skin and accessory lists come from @posthog/hedgehog-mode at runtime (see index.tsx). Tests pass their own.

export type TraitOptions = {
    skins: readonly string[]
    accessories: Record<string, { group: string }>
}

export type Look = { skin: string; hat: string | null }

export type Hog = {
    id: number
    look: Look
    name: string
    // Center of the hog, as a percentage of the board's width and height.
    x: number
    y: number
    // Width of the hog, as a percentage of the board's width.
    size: number
    flip: boolean
}

export type Board = {
    seed: number
    level: number
    target: Hog
    // Paint order, back to front. Includes the target.
    hogs: Hog[]
    crime: string
    // Easter egg: the id of one innocent hog that wears the PostHog logo.
    logoHogId: number
}

export const BOARD_ASPECT = 4 / 3
// A round has this many different hogs: the suspect, and three kinds of innocent hog.
export const CAST_SIZE = 4
// What makes the four hogs of a round different. First their skins, which is easy. From HAT_LEVEL, one skin
// and four hats. From MIX_LEVEL, two skins and two hats: the suspect shares its skin with one kind of innocent
// hog and its hat with another, so no single feature gives it away.
export const HAT_LEVEL = 3
export const MIX_LEVEL = 5

// Distance between neighbors, as a share of a hog's size. Less than 1, so the hogs overlap like a pile of
// stickers: each row covers the bodies of the row above, and every head stays in view.
const STEP = { x: 0.62, y: 0.42 }
// How far a hog can move off its place in the grid, as a share of its size.
const JITTER = 0.08
// Where things are in a hog's square box, as shares of its size. The body takes clicks (an ellipse).
export const BODY = { x: 0.5, y: 0.55, rx: 0.33, ry: 0.42 }
export const HEAD = { x: 0.5, y: 0.35 }
export const BELLY = { x: 0.53, y: 0.71 }

const NAMES = (
    'Gary Brenda Kevin Doris Steve Pam Clive Mildred Todd Bernard Tina Nigel ' +
    'Agatha Barry Wendy Gus Phyllis Rupert Sandra Derek Mabel Kyle Ingrid Hank'
).split(' ')

const CRIMES = [
    'stealing a pineapple',
    'merging to main on a Friday',
    'eating the last office cookie',
    'force-pushing to master',
    'calling a funnel a "sales pipeline"',
    'shipping without a feature flag',
    'leaving a console.log in production',
    'replying "per my last email"',
]

// mulberry32: a tiny seeded PRNG, so a seed always rebuilds the same board.
export function createRng(seed: number): () => number {
    let a = seed >>> 0
    return () => {
        a = (a + 0x6d2b79f5) >>> 0
        let t = a
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

const pick = <T>(rng: () => number, items: readonly T[]): T => items[Math.floor(rng() * items.length)]

function shuffle<T>(rng: () => number, items: T[]): T[] {
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1))
        ;[items[i], items[j]] = [items[j], items[i]]
    }
    return items
}

export const lookKey = (look: Look): string => `${look.skin}/${look.hat ?? '-'}`

// The grid for a level: one more column per level, and as many rows as fit a 4:3 board.
export function layout(level: number): { cols: number; rows: number; size: number } {
    const cols = Math.min(8 + level, 16)
    // A row is one hog wide plus a step per extra hog. Odd rows start half a step in. Jitter needs room too.
    const margin = 1 + 2 * JITTER
    const size = 100 / (margin + STEP.x * (cols - 0.5))
    const rows = Math.floor((100 / BOARD_ASPECT / size - margin) / STEP.y) + 1
    return { cols, rows, size }
}

// The suspect first, then the three kinds of innocent hog.
function cast(rng: () => number, level: number, options: TraitOptions): Look[] {
    const skins = shuffle(rng, [...options.skins])
    const hats = shuffle(
        rng,
        Object.keys(options.accessories).filter((name) => options.accessories[name].group === 'headwear')
    )
    return Array.from({ length: CAST_SIZE }, (_, i) => {
        if (level < HAT_LEVEL) return { skin: skins[i], hat: null }
        if (level < MIX_LEVEL) return { skin: skins[0], hat: hats[i] }
        return { skin: skins[Math.floor(i / 2)], hat: hats[i % 2] }
    })
}

export function generateBoard(seed: number, level: number, options: TraitOptions): Board {
    const rng = createRng(seed)
    const [suspect, ...innocent] = cast(rng, level, options)
    const { cols, rows, size } = layout(level)
    const targetId = Math.floor(rng() * cols * rows)
    const jitter = () => (rng() - 0.5) * 2 * JITTER
    // Everything below is in percent of the board's width, until `y` is turned into percent of the height.
    const height = 100 / BOARD_ASPECT
    const top = (height - size * (1 + 2 * JITTER + STEP.y * (rows - 1))) / 2

    // Row by row, left to right. This is also the paint order, so a hog covers the row above it.
    const hogs: Hog[] = Array.from({ length: cols * rows }, (_, id) => {
        const row = Math.floor(id / cols)
        const col = (id % cols) + (row % 2) / 2
        return {
            id,
            look: id === targetId ? suspect : pick(rng, innocent),
            name: pick(rng, NAMES),
            x: size * (0.5 + JITTER + STEP.x * col + jitter()),
            y: ((top + size * (0.5 + JITTER + STEP.y * row + jitter())) / height) * 100,
            size,
            flip: rng() < 0.5,
        }
    })

    // The logo is on a belly, and only the bottom row has its bellies in view.
    const logoHog = pick(
        rng,
        hogs.slice(-cols).filter((hog) => hog.id !== targetId)
    )
    return { seed, level, target: hogs[targetId], hogs, crime: pick(rng, CRIMES), logoHogId: logoHog.id }
}

// Whether a click at `spot` (a point in `hog`'s box, like HEAD) lands on `other` instead, when `other` is
// painted above `hog`. The page does the same check with a round button over each body.
export function covers(other: Hog, hog: Hog, spot: { x: number; y: number }): boolean {
    const dx = hog.x + (spot.x - 0.5) * hog.size - (other.x + (BODY.x - 0.5) * other.size)
    const dy = (hog.y - other.y) / BOARD_ASPECT + (spot.y - 0.5) * hog.size - (BODY.y - 0.5) * other.size
    return (dx / (BODY.rx * other.size)) ** 2 + (dy / (BODY.ry * other.size)) ** 2 <= 1
}

// One seed per UTC calendar day, so every player in every time zone gets the same daily hog.
export const dailySeed = (date: Date): number =>
    date.getUTCFullYear() * 10000 + (date.getUTCMonth() + 1) * 100 + date.getUTCDate()
