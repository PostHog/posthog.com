export const tierIds = ['S', 'A', 'B', 'C', 'D'] as const
export type Tier = (typeof tierIds)[number]
export type Ranking = Record<Tier, string[]>
export const emptyRanking = (): Ranking => ({ S: [], A: [], B: [], C: [], D: [] })

export function insertionBefore(
    slots: { slug: string; midpoint: number }[],
    x: number,
    active: string
): string | undefined {
    return slots.find(({ slug, midpoint }) => slug !== active && x < midpoint)?.slug
}

export function moveHog(ranking: Ranking, slug: string, destination: Tier | 'tray', before?: string): Ranking {
    const next = Object.fromEntries(tierIds.map((tier) => [tier, ranking[tier].filter((id) => id !== slug)])) as Ranking
    if (destination !== 'tray') {
        const index = before ? next[destination].indexOf(before) : -1
        next[destination].splice(index < 0 ? next[destination].length : index, 0, slug)
    }
    return next
}

export function serializeRanking(title: string, ranking: Ranking): string {
    return encodeURIComponent(
        JSON.stringify({ v: 1, title: title.slice(0, 80), rows: tierIds.map((id) => ranking[id]) })
    )
}

export function parseRanking(value: string, available: Set<string>): { title: string; ranking: Ranking } | null {
    try {
        if (value.length > 30000) return null
        const data = JSON.parse(decodeURIComponent(value))
        if (data.v !== 1 || typeof data.title !== 'string' || !Array.isArray(data.rows) || data.rows.length !== 5)
            return null
        const ranking = emptyRanking()
        const seen = new Set<string>()
        for (const [index, row] of data.rows.entries()) {
            if (!Array.isArray(row)) return null
            for (const slug of row) {
                if (typeof slug !== 'string' || !available.has(slug) || seen.has(slug)) continue
                seen.add(slug)
                ranking[tierIds[index]].push(slug)
            }
        }
        return { title: data.title.slice(0, 80), ranking }
    } catch {
        return null
    }
}
