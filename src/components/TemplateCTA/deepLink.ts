/** The one-touch app link. Builders return null rather than a link the app would ignore. */

const APP = 'https://app.posthog.com'

/** Fuzzy search params are ignored by the app below three characters. */
const MIN_SEARCH_LENGTH = 3

export type CtaKind = 'ai' | 'survey' | 'dashboard' | 'sql' | 'insight' | 'workflow' | 'scout' | 'url'

export interface CtaSpec {
    kind?: CtaKind
    /** The prompt, template name, or query – whatever the kind's builder expects. */
    value?: string
    label?: string
    /** Where to send people when the deep link can't be built. Usually a docs page. */
    fallback?: string
}

export interface ResolvedCta {
    href: string
    label: string
    /** Lands on the thing itself, vs only runs a search – drives the wording. */
    precise: boolean
}

type Builder = (value: string) => string | null

const search = (path: string, param: string, hash: string): Builder => {
    return (value) =>
        value.length >= MIN_SEARCH_LENGTH ? `${APP}${path}?${param}=${encodeURIComponent(value)}#${hash}=modal` : null
}

const BUILDERS: Record<CtaKind, Builder> = {
    // Auto-submits, so this is the only kind that builds a dashboard rather than finding one.
    ai: (value) => `${APP}/ai?ask=${encodeURIComponent(value)}`,
    // Exact match against the app's SurveyTemplateType enum – see README on keeping it in sync.
    survey: (value) => `${APP}/surveys/guided/new?template=${encodeURIComponent(value)}`,
    sql: (value) => `${APP}/sql?open_query=${encodeURIComponent(value)}`,
    insight: (value) =>
        value.trim().startsWith('{')
            ? `${APP}/insights/new#q=${encodeURIComponent(value)}`
            : `${APP}/insights/new#insight=${encodeURIComponent(value)}`,
    dashboard: search('/dashboard', 'templateFilter', 'newDashboard'),
    workflow: search('/workflows', 'templateFilter', 'newWorkflow'),
    // Scouts need their sibling SKILL.md, which is a query concern – buildScoutDeepLink owns it.
    scout: () => null,
    url: (value) => value,
}

/** Kinds that land on the thing itself, rather than running a search the reader still has to sift. */
const PRECISE: CtaKind[] = ['ai', 'survey', 'sql', 'insight', 'url']

const DEFAULT_LABELS: Record<CtaKind, string> = {
    ai: 'Build this with PostHog AI',
    survey: 'Create this survey',
    sql: 'Open this query',
    insight: 'Create this insight',
    dashboard: 'Find this in PostHog',
    workflow: 'Find this in PostHog',
    scout: 'Add this scout',
    url: 'Open in PostHog',
}

/** Null renders no button: no kind, a builder that refused, or no fallback left. */
export function buildCta(spec?: CtaSpec | null): ResolvedCta | null {
    if (!spec?.kind) {
        return null
    }

    // An unrecognised kind takes the fallback below, same as a builder that refused.
    const build = BUILDERS[spec.kind]
    const href = build && spec.value ? build(spec.value) : null
    if (href) {
        return { href, label: spec.label ?? DEFAULT_LABELS[spec.kind], precise: PRECISE.includes(spec.kind) }
    }

    return spec.fallback ? { href: spec.fallback, label: spec.label ?? 'Learn more', precise: false } : null
}
