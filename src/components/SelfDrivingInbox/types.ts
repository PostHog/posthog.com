/** The field guide contract: structured frontmatter, so list and page render from one source. */

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

/** What `#createScout=` prefills, sourced from the sibling SKILL.md. */
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
    /** The one-line takeaway, always on its own line under the premise. Starts "This scout…". */
    tldr?: string
    watches?: WatchedSource[]
    requires?: Requirement[]
    scout?: ScoutSpec
}
