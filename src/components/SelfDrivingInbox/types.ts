/**
 * The self-driving template report contract.
 *
 * A scout template's report is authored as structured frontmatter (not MDX body) so it can be
 * rendered in two places from one source: the inbox gallery at /templates/self-driving and the
 * template's own page. See README.md for the authoring guide.
 */

/**
 * Report priority, matching the research agent's P0–P4 scale in the product.
 * P0/P1 are urgent, P2 is notable, P3/P4 are informational.
 */
export type ReportPriority = 'P0' | 'P1' | 'P2' | 'P3' | 'P4'

export interface SelfDrivingReport {
    /** The finding, stated as a headline with its evidence in it. Not a topic – a claim. */
    title: string
    priority: ReportPriority
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

/** How a scout tells a real finding from noise – the most teachable idea in the product. */
export interface Discriminator {
    speaksUp: string
    staysQuiet: string
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
 * What actually gets created in PostHog. Powers the `#createScout=` deep link, which prefills
 * the app's "Create a scout" modal – name, description, and instructions only.
 */
export interface ScoutSpec {
    name: string
    description: string
    /** Markdown instructions executed on every run. Optional; prefills the Instructions field. */
    body?: string
    /** Display-only, e.g. "Daily" – the app owns the real schedule. */
    schedule?: string
}

/** One row in the inbox: a template, reduced to its report plus everything the pane teaches. */
export interface InboxTemplate {
    /** Route to the template page, e.g. /templates/silent-failure-core-action */
    url: string
    /** The template's own title, e.g. "Silent failure in your core action" */
    templateTitle: string
    templateSubtitle?: string
    report: SelfDrivingReport
    question?: string
    premise?: string
    discriminator?: Discriminator
    watches?: WatchedSource[]
    requires?: Requirement[]
    scout?: ScoutSpec
}

/** Priority ordering for the inbox list – lower sorts first. */
export const PRIORITY_ORDER: Record<ReportPriority, number> = {
    P0: 0,
    P1: 1,
    P2: 2,
    P3: 3,
    P4: 4,
}

export const DEFAULT_PRIORITY: ReportPriority = 'P2'

/** Project color tokens only – never stock Tailwind colors. */
export const PRIORITY_STYLES: Record<ReportPriority, { dot: string; label: string }> = {
    P0: { dot: 'bg-red', label: 'text-red' },
    P1: { dot: 'bg-red', label: 'text-red' },
    P2: { dot: 'bg-orange', label: 'text-orange' },
    P3: { dot: 'bg-blue', label: 'text-blue' },
    P4: { dot: 'bg-secondary', label: 'text-secondary' },
}

export function isReportPriority(value: unknown): value is ReportPriority {
    return typeof value === 'string' && value in PRIORITY_ORDER
}
