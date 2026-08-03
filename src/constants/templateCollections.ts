/**
 * The collections `/templates` is a home for.
 *
 * Data only – no React – because `gatsby/createPages.ts` imports this at build time to create
 * each collection's route. Components live in `components/TemplateCollection/layouts.tsx`; keep
 * them out of here or the Node build pulls in browser modules and fails confusingly.
 */

export interface TemplateCollection {
    /** URL segment: /templates/<id>. Must not collide with an existing template slug. */
    id: string
    title: string
    /** One line, on the card. Say what the collection gets you, not what it contains. */
    description: string
    /** The team accountable for the content – one claim per collection, not per template. */
    owner: string
    /** The frontmatter `filters.type` value its templates carry, until `collection:` lands. */
    legacyType?: string
    /** Featured collections lead the hub. */
    featured?: boolean
    /** A hand-written src/pages file already owns this route, so don't create one. */
    hasStaticPage?: boolean
    /** Project color token, bare – callers build text-/border-/bg- from it. */
    token: string
}

export const TEMPLATE_COLLECTIONS: TemplateCollection[] = [
    {
        id: 'self-driving',
        title: 'Self-driving',
        description: 'Scouts that watch your data and open a pull request when something breaks.',
        owner: 'self-driving',
        legacyType: 'self-driving',
        featured: true,
        hasStaticPage: true,
        token: 'orange',
    },
    {
        id: 'dashboards',
        title: 'Dashboards',
        description: 'Describe what you want to track and PostHog AI builds the dashboard.',
        owner: 'product-analytics',
        legacyType: 'dashboard',
        token: 'blue',
    },
    {
        id: 'surveys',
        title: 'Surveys',
        description: 'NPS, CSAT, PMF, and exit surveys, prefilled and ready to launch.',
        owner: 'surveys',
        legacyType: 'survey',
        token: 'purple',
    },
    {
        id: 'workflows',
        title: 'Workflows',
        description: 'Automations that fire when a user does – or stops doing – something.',
        owner: 'cdp',
        legacyType: 'workflow',
        token: 'seagreen',
    },
]

/** The collection a template belongs to, by its legacy `filters.type`. */
export function collectionOfType(type?: string): TemplateCollection | undefined {
    return type ? TEMPLATE_COLLECTIONS.find((c) => c.legacyType === type.toLowerCase()) : undefined
}
