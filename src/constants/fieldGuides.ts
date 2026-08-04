/** The volumes on the shelf. Data only, so `gatsby/` can import it in Node at build time. */

export interface FieldGuideVolume {
    /** URL segment and content directory: /field-guides/<id>, contents/field-guides/<id>/ */
    id: string
    title: string
    /** One line on the shelf. What the volume gets you, not what's in it. */
    description: string
    /** The team accountable for the content – one claim per volume, not per guide. */
    owner: string
    /** Project colour token, bare – callers build text-/border-/bg- from it. */
    token: string
    /** Printed on the cover. Order on the shelf follows it. */
    volume: number
    /** A hand-written src/pages file owns this route, so don't generate one. */
    hasStaticPage?: boolean
    /** Announced but unwritten – renders as a cover with a sash and no link. */
    comingSoon?: boolean
}

export const FIELD_GUIDE_VOLUMES: FieldGuideVolume[] = [
    {
        id: 'self-driving',
        title: 'Self-driving',
        description: 'Scouts that watch your product and open a pull request when something breaks.',
        owner: 'self-driving',
        token: 'orange',
        volume: 1,
        hasStaticPage: true,
    },
    {
        id: 'data-warehouse',
        title: 'Data warehouse',
        description: 'Getting your other systems into PostHog, and asking questions across all of it.',
        owner: 'data warehouse',
        token: 'blue',
        volume: 2,
        comingSoon: true,
    },
    {
        id: 'workflows',
        title: 'Workflows',
        description: 'Automations that fire when someone does – or stops doing – something.',
        owner: 'CDP',
        token: 'seagreen',
        volume: 3,
        comingSoon: true,
    },
]

export function volumeById(id: string): FieldGuideVolume | undefined {
    return FIELD_GUIDE_VOLUMES.find((v) => v.id === id)
}
