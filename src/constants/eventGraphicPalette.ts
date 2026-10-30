// The approved palette for the generated event graphic (v2), taken from the brand team's Figma file.
//
// These hues are deliberately scoped to the event graphic and are NOT the Tailwind palette — none of
// them match `tailwind.config.js` (v2 blue is #0457FF, Tailwind's is #2F80FA). Until the brand team
// confirms whether they supersede the site palette, keeping them here avoids changing anything else.
//
// Each entry is a vertical two-stop gradient plus the title color to use on a light (cream) background
// and on the accent background itself. `badge` is the calendar chip's header color, which the designs
// intentionally set to a contrasting hue rather than the title color.

export type EventGraphicHue = {
    name: string
    /** Accent gradient, top to bottom. */
    from: string
    to: string
    /** Title color on the cream background. */
    titleOnLight: string
    /** Title color when the accent is the background — light hues need dark type. */
    titleOnDark: string
    /** Calendar badge header color. */
    badge: string
}

/** Ink used for date, time and venue copy on the cream background. */
export const EVENT_GRAPHIC_INK = '#394150'

/** Muted ink for the secondary (time) line. */
export const EVENT_GRAPHIC_INK_MUTED = '#8A8F9B'

/** Cream background gradient. */
export const EVENT_GRAPHIC_CREAM_FROM = '#FDFDF8'
export const EVENT_GRAPHIC_CREAM_TO = '#F8F8E6'

const WHITE = '#FFFFFF'
const BLACK = '#151515'

// Contrasting badge hues, assigned per entry to match the designs.
const BADGE_ORANGE = '#FF5C1C'
const BADGE_LIME = '#A0CA21'
const BADGE_SKY = '#2BB3DF'
const BADGE_CORAL = '#E9292F'

export const EVENT_GRAPHIC_HUES: EventGraphicHue[] = [
    { name: 'blue', from: '#0457FF', to: '#0347D1', titleOnLight: '#0457FF', titleOnDark: WHITE, badge: BADGE_LIME },
    { name: 'sky', from: '#2BB3DF', to: '#0B8FB9', titleOnLight: '#2BB3DF', titleOnDark: WHITE, badge: BADGE_CORAL },
    { name: 'ocean', from: '#1590E7', to: '#0070BF', titleOnLight: '#1590E7', titleOnDark: WHITE, badge: BADGE_LIME },
    { name: 'coral', from: '#FF474D', to: '#E9292F', titleOnLight: '#E9292F', titleOnDark: WHITE, badge: BADGE_SKY },
    { name: 'lime', from: '#A0CA21', to: '#8AB211', titleOnLight: '#8AB211', titleOnDark: WHITE, badge: BADGE_CORAL },
    { name: 'green', from: '#47C861', to: '#26B343', titleOnLight: '#26B343', titleOnDark: WHITE, badge: BADGE_ORANGE },
    { name: 'lilac', from: '#6D4FFF', to: '#5332F5', titleOnLight: '#6D4FFF', titleOnDark: WHITE, badge: BADGE_ORANGE },
    {
        name: 'purple',
        from: '#A737D2',
        to: '#981CC8',
        titleOnLight: '#A737D2',
        titleOnDark: WHITE,
        badge: BADGE_ORANGE,
    },
    { name: 'teal', from: '#43DAB3', to: '#0FBB8F', titleOnLight: '#0FBB8F', titleOnDark: WHITE, badge: BADGE_ORANGE },
    // Light hues carry dark type when used as the background.
    {
        name: 'tangerine',
        from: '#FFA81C',
        to: '#F09000',
        titleOnLight: '#F09000',
        titleOnDark: BLACK,
        badge: BADGE_CORAL,
    },
    { name: 'yellow', from: '#FFCE1C', to: '#F1BD00', titleOnLight: '#F0A800', titleOnDark: BLACK, badge: BADGE_SKY },
]

export type EventGraphicVariant = 'light' | 'dark'

/**
 * Stable 32-bit string hash, so a given event always lands on the same hue and variant instead of
 * changing on every render.
 */
const hash = (value: string): number => {
    let h = 0
    for (let i = 0; i < value.length; i++) {
        h = (h << 5) - h + value.charCodeAt(i)
        h |= 0
    }
    return Math.abs(h)
}

/** Total number of hue + variant combinations the shuffle button cycles through. */
export const EVENT_GRAPHIC_STYLE_COUNT = EVENT_GRAPHIC_HUES.length * 2

/** Resolve a style index (any integer) to a concrete hue and light/dark variant. */
export const eventGraphicStyle = (index: number): { hue: EventGraphicHue; variant: EventGraphicVariant } => {
    const normalized = ((index % EVENT_GRAPHIC_STYLE_COUNT) + EVENT_GRAPHIC_STYLE_COUNT) % EVENT_GRAPHIC_STYLE_COUNT
    return {
        hue: EVENT_GRAPHIC_HUES[normalized % EVENT_GRAPHIC_HUES.length],
        variant: normalized < EVENT_GRAPHIC_HUES.length ? 'light' : 'dark',
    }
}

/** Deterministic starting style for an event, so the list and detail views agree. */
export const eventGraphicStyleIndex = (seed?: string): number => (seed ? hash(seed) : 0) % EVENT_GRAPHIC_STYLE_COUNT

/**
 * The hog is picked independently of the hue. An earlier draft paired one hog to each color, but per the
 * brand team hog/hue pairings are no longer a thing — hedgehogs carry a single hue from the brand book —
 * so the two rotate separately and Shuffle only cycles the color.
 */
export const eventGraphicHogIndex = (seed: string, count: number): number => (count > 0 ? hash(seed) % count : 0)
