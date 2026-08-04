/**
 * The self-driving template contract. Authored as structured frontmatter, not MDX body, so the
 * gallery and the template's own page render from one source. See README.md to author one.
 */

export interface SelfDrivingReport {
    /** The finding, stated as a headline with its evidence in it. Not a topic – a claim. */
    title: string
    /** What surfaced it, e.g. "Scout · core action funnel" or "Error tracking". */
    source: string
    /** Authored static string like "2h". Never computed – see README on why. */
    receivedAgo?: string
    /** The body of the report. Markdown: **bold**, `code`, and links all render. */
    body: string
    /** What the agent proposes doing about it. Markdown. */
    suggestedAction?: string
    /** Aside on what happens next, e.g. "An agent opens the PR; you review and merge." */
    actionNote?: string
    /** Impact line, e.g. "47 users affected". */
    affected?: string
}

/**
 * How a scout tells a real finding from noise. Both halves get named because "writes nothing" is
 * the common case, and unexplained silence reads as a broken scout.
 */
export interface Discriminator {
    writesToInbox: string
    writesNothing: string
    why?: string
}

/** One evidence source the scout reads. */
export interface WatchedSource {
    name: string
    detail: string
}

export type RequirementLevel = 'required' | 'recommended' | 'optional'

export interface Requirement {
    label: string
    level?: RequirementLevel
}

/**
 * What gets created in PostHog, and what the `#createScout=` deep link prefills. Sourced from a
 * sibling `SKILL.md`: a scout is a real file in the monorepo, so it's authored as one here too.
 */
export interface ScoutSpec {
    name: string
    description: string
    /** The verbatim SKILL.md, frontmatter included, so the page shows the file and not a copy. */
    raw?: string
    /** Display-only, e.g. "Daily" – the app owns the real schedule. Lives in index.mdx. */
    schedule?: string
}

/** Fallback rail label for a template that hasn't declared a category yet. */
export const UNCATEGORIZED = 'Other'

/** The product the rail is filtering by, or null for everything. */
export type InboxFilter = string | null

/** One row in the inbox: a template, reduced to its report plus everything the pane teaches. */
export interface InboxTemplate {
    /** Product surface, e.g. "Error Tracking". Authored in frontmatter, never mapped from title. */
    category: string
    /** Route to the template page, e.g. /templates/silent-failure-core-action */
    url: string
    /** The template's own title, e.g. "Silent failure in your core action" */
    templateTitle: string
    templateSubtitle?: string
    report: SelfDrivingReport
    premise?: string
    discriminator?: Discriminator
    watches?: WatchedSource[]
    requires?: Requirement[]
    scout?: ScoutSpec
}
