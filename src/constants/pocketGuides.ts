/** The volumes on the shelf. Data only, so `gatsby/` can import it in Node at build time. */

export interface PocketGuideVolume {
    /** URL segment and content directory: /pocket-guides/<id>, contents/pocket-guides/<id>/ */
    id: string
    title: string
    /** One line on the shelf. What the volume gets you, not what's in it. */
    description: string
    /** Project color token, bare – callers build text-/border-/bg- from it. */
    token: string
    /** Printed on the cover. Order on the shelf follows it. */
    volume: number
    /** A hand-written src/pages file owns this route, so don't generate one. */
    hasStaticPage?: boolean
    /** Announced but unwritten – renders as a cover with a sash and no link. */
    comingSoon?: boolean
}

/**
 * Every volume opens the same way: front matter at `bookOrder: 0`, a 101 at 1. Guides are what
 * follows. Authors assigning `bookOrder` in a volume's MDX frontmatter count from here.
 */
export const FIRST_GUIDE_BOOK_ORDER = 2

export const POCKET_GUIDE_VOLUMES: PocketGuideVolume[] = [
    {
        id: 'self-driving',
        title: 'Self-driving',
        description: 'Scouts that watch your product and open a pull request when something breaks.',
        token: 'orange',
        volume: 1,
        hasStaticPage: true,
    },
    {
        id: 'data-warehouse',
        title: 'Data warehouse',
        description: 'Getting your other systems into PostHog, and asking questions across all of it.',
        token: 'blue',
        volume: 2,
        comingSoon: true,
    },
    {
        id: 'session-replay',
        title: 'Session replay',
        description: 'Watch how people actually use your product – or let Replay Vision watch it for you.',
        token: 'yellow',
        volume: 3,
    },
]

export function volumeById(id: string): PocketGuideVolume | undefined {
    return POCKET_GUIDE_VOLUMES.find((v) => v.id === id)
}
