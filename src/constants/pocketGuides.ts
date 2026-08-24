/** The volumes on the shelf. Data only, so `gatsby/` can import it in Node at build time. */

/** Spine colours. Limited to tokens white text reads on – `Book.tsx` prints the title in white. */
export type PocketGuideToken = 'orange' | 'purple' | 'blue'

export interface PocketGuideVolume {
    /** URL segment and content directory: /pocket-guides/<id>, contents/pocket-guides/<id>/ */
    id: string
    title: string
    /** One line on the shelf. What the volume gets you, not what's in it. */
    description: string
    /** Project color token, bare – callers build text-/border-/bg- from it. */
    token: PocketGuideToken
    /** Printed on the cover. Order on the shelf follows it. */
    volume: number
    /** A hand-written src/pages file owns this route, so don't generate one. */
    hasStaticPage?: boolean
    /** Announced but unwritten – renders as a cover with a sash and no link. */
    comingSoon?: boolean
}

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
        id: 'ai-observability',
        title: 'AI Observability',
        description: 'Tracing every LLM call, scoring what comes back, and seeing what users do with it.',
        token: 'purple',
        volume: 2,
    },
    {
        id: 'context-warehouse',
        title: 'Context Warehouse',
        description:
            'Model revenue, conversion, activation, and usage once, so every dashboard and downstream model reuses the same definition.',
        token: 'blue',
        volume: 3,
    },
]

export function volumeById(id: string): PocketGuideVolume | undefined {
    return POCKET_GUIDE_VOLUMES.find((v) => v.id === id)
}
