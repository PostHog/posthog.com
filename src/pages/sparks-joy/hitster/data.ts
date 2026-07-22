// Deck + game logic for Hitster (tech history edition)
//
// A single-device, pass-and-play timeline guessing game inspired by the card
// game Hitster. Instead of streaming copyrighted songs (which the original game
// does via Spotify), this edition uses well-known, verifiable moments from tech
// and internet history — no music licensing required, and on-brand for a
// developer audience. Each card hides its year; players slot it into the correct
// chronological position on their personal timeline.

export interface HitsterCard {
    id: string
    /** The event shown to the player while the year is hidden. */
    title: string
    /** Short category label used for grouping/color. */
    category: 'Web' | 'Hardware' | 'Software' | 'Companies' | 'AI' | 'Culture'
    /** The answer — hidden until the card is placed. */
    year: number
    /** Small flourish shown on the card face. */
    emoji: string
}

// Years below are widely documented public milestones. Where a company/product
// has both a "founded" and a "launched" date, the card copy names the specific
// event that matches the year to avoid ambiguity.
export const DECK: HitsterCard[] = [
    { id: 'arpanet', title: "ARPANET's first message is sent", category: 'Web', year: 1969, emoji: '📡' },
    { id: 'email', title: 'The first email is sent between two computers', category: 'Web', year: 1971, emoji: '✉️' },
    { id: 'microsoft', title: 'Microsoft is founded', category: 'Companies', year: 1975, emoji: '🪟' },
    { id: 'apple', title: 'Apple is founded', category: 'Companies', year: 1976, emoji: '🍎' },
    { id: 'ibm-pc', title: 'The IBM PC is released', category: 'Hardware', year: 1981, emoji: '🖥️' },
    { id: 'tcp-ip', title: 'ARPANET switches to TCP/IP', category: 'Web', year: 1983, emoji: '🔌' },
    { id: 'macintosh', title: 'The Apple Macintosh is released', category: 'Hardware', year: 1984, emoji: '💻' },
    { id: 'windows1', title: 'Windows 1.0 is released', category: 'Software', year: 1985, emoji: '🪟' },
    { id: 'pixar', title: 'Pixar is founded', category: 'Companies', year: 1986, emoji: '🎬' },
    { id: 'photoshop', title: 'Photoshop 1.0 is released', category: 'Software', year: 1990, emoji: '🖼️' },
    { id: 'web', title: 'The first website goes live', category: 'Web', year: 1991, emoji: '🌐' },
    { id: 'linux', title: 'The Linux kernel is first released', category: 'Software', year: 1991, emoji: '🐧' },
    { id: 'sms', title: 'The first SMS text message is sent', category: 'Culture', year: 1992, emoji: '📱' },
    { id: 'mosaic', title: 'The Mosaic web browser is released', category: 'Web', year: 1993, emoji: '🧭' },
    { id: 'amazon', title: 'Amazon is founded', category: 'Companies', year: 1994, emoji: '📦' },
    { id: 'javascript', title: 'JavaScript is created', category: 'Software', year: 1995, emoji: '🟨' },
    { id: 'ebay', title: 'eBay is founded', category: 'Companies', year: 1995, emoji: '🔨' },
    { id: 'google', title: 'Google is founded', category: 'Companies', year: 1998, emoji: '🔍' },
    { id: 'napster', title: 'Napster launches', category: 'Culture', year: 1999, emoji: '🎵' },
    { id: 'wikipedia', title: 'Wikipedia launches', category: 'Web', year: 2001, emoji: '📚' },
    { id: 'macosx', title: 'Mac OS X is released', category: 'Software', year: 2001, emoji: '🅧' },
    { id: 'firefox', title: 'Firefox 1.0 is released', category: 'Software', year: 2004, emoji: '🦊' },
    { id: 'facebook', title: 'Facebook launches', category: 'Web', year: 2004, emoji: '👍' },
    { id: 'gmail', title: 'Gmail launches', category: 'Web', year: 2004, emoji: '📧' },
    { id: 'youtube', title: 'YouTube is founded', category: 'Web', year: 2005, emoji: '▶️' },
    { id: 'reddit', title: 'Reddit is founded', category: 'Web', year: 2005, emoji: '👽' },
    { id: 'twitter', title: 'Twitter launches', category: 'Web', year: 2006, emoji: '🐦' },
    { id: 'aws', title: 'Amazon Web Services (S3) launches', category: 'Software', year: 2006, emoji: '☁️' },
    { id: 'iphone', title: 'The first iPhone is released', category: 'Hardware', year: 2007, emoji: '📲' },
    { id: 'android', title: "Android's first phone ships", category: 'Hardware', year: 2008, emoji: '🤖' },
    { id: 'github', title: 'GitHub launches', category: 'Software', year: 2008, emoji: '🐙' },
    { id: 'bitcoin', title: 'The Bitcoin whitepaper is published', category: 'Software', year: 2008, emoji: '₿' },
    { id: 'whatsapp', title: 'WhatsApp launches', category: 'Web', year: 2009, emoji: '💬' },
    { id: 'instagram', title: 'Instagram launches', category: 'Web', year: 2010, emoji: '📷' },
    { id: 'ipad', title: 'The iPad is released', category: 'Hardware', year: 2010, emoji: '📖' },
    { id: 'stripe', title: 'Stripe launches publicly', category: 'Companies', year: 2011, emoji: '💳' },
    { id: 'minecraft', title: 'Minecraft is officially released', category: 'Culture', year: 2011, emoji: '⛏️' },
    { id: 'docker', title: 'Docker is released', category: 'Software', year: 2013, emoji: '🐳' },
    { id: 'slack', title: 'Slack launches', category: 'Software', year: 2013, emoji: '💼' },
    { id: 'kubernetes', title: 'Kubernetes is open-sourced', category: 'Software', year: 2014, emoji: '☸️' },
    { id: 'tensorflow', title: 'TensorFlow is open-sourced', category: 'AI', year: 2015, emoji: '🧠' },
    {
        id: 'transformer',
        title: 'The "Attention Is All You Need" paper is published',
        category: 'AI',
        year: 2017,
        emoji: '📄',
    },
    { id: 'posthog', title: 'PostHog is founded', category: 'Companies', year: 2020, emoji: '🦔' },
    { id: 'gpt3', title: 'GPT-3 is released', category: 'AI', year: 2020, emoji: '🤯' },
    { id: 'chatgpt', title: 'ChatGPT is released', category: 'AI', year: 2022, emoji: '💡' },
    { id: 'gpt4', title: 'GPT-4 is released', category: 'AI', year: 2023, emoji: '🚀' },
]

// Brand color per category (hex values from tailwind.config.js). These are used
// as inline card background colors, so they're picked to keep white text legible.
export const CATEGORY_COLOR: Record<HitsterCard['category'], string> = {
    Web: '#2F80FA', // blue
    Hardware: '#B62AD9', // purple
    Software: '#1E2F46', // navy
    Companies: '#F54E00', // red
    AI: '#30ABC6', // seagreen
    Culture: '#DF6133', // burnt-orange
}

/** Fisher–Yates shuffle (returns a new array, does not mutate the input). */
export function shuffle<T>(input: readonly T[]): T[] {
    const arr = [...input]
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}

/**
 * Insert a card into a year-sorted timeline at the given slot index and return a
 * new sorted array. Slot `i` means "between timeline[i-1] and timeline[i]".
 */
export function insertAt(timeline: HitsterCard[], card: HitsterCard, slot: number): HitsterCard[] {
    const next = [...timeline]
    next.splice(slot, 0, card)
    return next
}

/**
 * A placement is correct if the card's year fits the chosen slot, i.e. it is
 * >= the left neighbor's year and <= the right neighbor's year. Bounds are
 * inclusive so cards sharing a year can sit on either side (matching Hitster's
 * "same year is fine" rule).
 */
export function isPlacementCorrect(timeline: HitsterCard[], card: HitsterCard, slot: number): boolean {
    const left = slot > 0 ? timeline[slot - 1].year : -Infinity
    const right = slot < timeline.length ? timeline[slot].year : Infinity
    return card.year >= left && card.year <= right
}

/** The slot index where a card actually belongs in a sorted timeline. */
export function correctSlot(timeline: HitsterCard[], card: HitsterCard): number {
    let slot = 0
    while (slot < timeline.length && timeline[slot].year < card.year) slot++
    return slot
}
