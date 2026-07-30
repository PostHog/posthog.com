import React from 'react'
import {
    IconWarning,
    IconRewindPlay,
    IconEye,
    IconList,
    IconCompass,
    IconSparkles,
    IconSupport,
    IconGraph,
} from '@posthog/icons'
import { Code } from './prose'

/**
 * Data for the /ship-with-posthog inbox replica.
 *
 * Every item is a real report that produced a real merged pull request on
 * PostHog/posthog. Nothing here is invented – see the note above `INBOX_ITEMS` for
 * where each field comes from and the two places the wording departs from the stored
 * data for privacy reasons.
 *
 * The items are grouped by *discovery channel* rather than by product, because that's
 * what the reports actually record: a cohorts bug found by Replay Vision, an
 * integrations bug found by a support conversation, a query bug found by error
 * tracking. Which tool spotted it is the interesting axis; the tool it happened to be
 * in is not.
 */

/**
 * The signal sources a report can come from. These are *discovery channels* – how
 * PostHog found the problem – not the product the bug turned out to live in. That
 * distinction matters: a bug in cohorts was found by Replay Vision, and a bug in
 * integrations was found by a support conversation.
 */
export type SourceKey =
    | 'error_tracking'
    | 'session_replay'
    | 'replay_vision'
    | 'conversations'
    | 'logs'
    | 'traces'
    | 'ai_observability'
    | 'analytics'

interface SourceMeta {
    label: string
    Icon: React.ComponentType<{ className?: string }>
    /** Icon tint on the row meta line. Literal classes so Tailwind JIT keeps them. */
    color: string
    /** How this source found the problem, for the row's tooltip. */
    found?: string
}

// Icon + tint per source product, mirroring the app's sourceProductIcons.
export const SOURCE_META: Record<SourceKey, SourceMeta> = {
    error_tracking: {
        label: 'Error tracking',
        Icon: IconWarning,
        color: 'text-red',
        found: 'An exception spiked, and every occurrence carried a stack trace.',
    },
    session_replay: {
        label: 'Session replay',
        Icon: IconRewindPlay,
        color: 'text-orange',
        found: 'Recordings showed people hitting the problem.',
    },
    replay_vision: {
        label: 'Replay Vision',
        Icon: IconEye,
        color: 'text-orange',
        found: 'A vision model watched the recordings and described what went wrong.',
    },
    conversations: {
        label: 'Conversations',
        Icon: IconSupport,
        color: 'text-green',
        found: 'Someone wrote in about it, and the ticket became a signal.',
    },
    logs: {
        label: 'Logs',
        Icon: IconList,
        color: 'text-secondary',
        found: 'A log line repeated far more than it should.',
    },
    traces: {
        label: 'Traces',
        Icon: IconCompass,
        color: 'text-blue',
        found: 'A span got slower than its usual pattern.',
    },
    ai_observability: {
        label: 'AI observability',
        Icon: IconSparkles,
        color: 'text-purple',
        found: 'An evaluation or a model call started failing.',
    },
    analytics: {
        label: 'Product analytics',
        Icon: IconGraph,
        color: 'text-blue',
        found: 'The numbers moved against their own baseline.',
    },
}

export type Priority = 'P0' | 'P1' | 'P2' | 'P3' | 'P4'

// Signal-source reports show the source product's icon + name. Scout-authored reports
// show "Scout · <category>", exactly as the real Inbox attributes them.
type Origin = { kind: 'signal'; product: SourceKey } | { kind: 'scout'; product: SourceKey; scout: string }

/* ── Detail-view types ─────────────────────────────────────────────────────── */

/**
 * One block of the Summary card. `paragraphs` are ReactNode so authored copy can
 * carry <strong> and <Code> without a markdown renderer.
 */
export interface ProseSection {
    /** Omitted for the lead paragraph, which sits above the first heading. */
    heading?: string
    /** One entry per rendered paragraph. */
    paragraphs: React.ReactNode[]
}

/** Evidence sources are the same set of signal sources a report can come from. */
export type EvidenceSource = SourceKey

/** Status tag hue on an evidence card. Semantic tokens, not stock Tailwind. */
export type TagTone = 'red' | 'orange' | 'yellow' | 'blue' | 'green'

export interface EvidenceTag {
    label: string
    tone: TagTone
    /** Prefix a small filled dot, as the app does for in-flight states. */
    dot?: boolean
    /** Explains what the tag means on hover. */
    tooltip?: string
}

export interface EvidenceItem {
    id: string
    source: EvidenceSource
    /** One line summarizing what this source saw. Gets its own line, so it can wrap. */
    title: string
    /**
     * What this signal observed. Written from the real `signal_finding` artefact but
     * deliberately re-worded: the stored prose carries customer session ids, asset
     * ids, and team numbers that can't go on a public page.
     */
    body: React.ReactNode
    tags: EvidenceTag[]
    /**
     * The repo files the agent read for this finding, verbatim from the artefact's
     * `relevant_code_paths`. Public paths, so these are safe to publish as-is – and
     * they're the most concrete evidence that it actually read the code.
     */
    codePaths?: string[]
    /** The artefact's own `verified` flag: whether the finding was confirmed in data. */
    verified?: boolean
}

/**
 * A suggested reviewer, taken verbatim from the report's newest `suggested_reviewers`
 * artefact – real people, real commits, real rationale. `name` is matched against the
 * team directory at build time for the avatar and profile link.
 *
 * Reviewers whose only stated reason is activity boilerplate ("recently active in
 * frontend/src") are left out rather than dressed up, which is why some reports here
 * carry no reviewers at all.
 */
export interface Reviewer {
    name: string
    /** GitHub handle, shown when the person isn't in the team directory. */
    githubLogin: string
    /** The commits the blame walk landed on, with links to the real diffs. */
    commits: { sha: string; url: string }[]
    /** The artefact's own rationale for suggesting them. */
    reason: React.ReactNode
    /** True when this person went on to actually approve the pull request. */
    approved?: boolean
}

export type CheckStatus = 'success' | 'skipped' | 'pending' | 'failed'

export interface CiChecks {
    successful: number
    skipped: number
    failed?: number
    /** A few named checks listed under the summary line. */
    checks: { name: string; status: CheckStatus }[]
}

export interface DiffLine {
    kind: 'context' | 'add' | 'remove'
    text: string
}

export interface DiffFile {
    path: string
    /**
     * Whole-file totals, which is what the tab strip sums. Deliberately independent
     * of `lines` – that's a single excerpted hunk, not the entire change.
     */
    added: number
    removed: number
    /** Hunk header, e.g. "@@ -604,7 +604,20 @@". */
    hunk: string
    lines: DiffLine[]
}

/**
 * Everything the detail view renders beyond what the list row already needs.
 * Every field below `summary` is optional, so a lightly authored item degrades to
 * header + summary instead of rendering empty panels.
 */
export interface ReportDetail {
    /** Green pill on the meta row, e.g. "Actionable". */
    status: string
    /** Real dates from the report, rendered as-is. */
    firstSeen: string
    lastUpdated: string
    /** The real branch the agent worked on. */
    branch: string
    /** The report's own `source_products` – how PostHog found this. */
    contributingSources: EvidenceSource[]
    summary: ProseSection[]
    /**
     * Real whole-PR totals from the GitHub API, so the tab strip doesn't have to be
     * summed from the single hunk shown under Files changed.
     */
    stats?: { added: number; removed: number; files: number; commits: number }
    /** GitHub handles that actually approved the pull request. */
    approvers?: string[]
    ci?: CiChecks
    reviewers?: Reviewer[]
    evidence?: EvidenceItem[]
    files?: DiffFile[]
}

export interface InboxItem {
    /** Slug used for the URL hash + React keys. */
    id: string
    /** Conventional-commit type, e.g. "fix". */
    commitType: string
    /** Conventional-commit scope, e.g. "hogql". */
    scope: string
    /** Human title after the type(scope): prefix. */
    title: string
    summary: string
    priority: Priority
    signalCount: number
    timeAgo: string
    origin: Origin
    /** Set only when the PR is real and public; the header link is gated on it. */
    prUrl?: string
    /** Shown as a badge on the row. Illustrative unless `prUrl` is set too. */
    prNumber?: number
    /** The detail view's payload. Only item 1 is fully authored so far. */
    detail?: ReportDetail
}

/**
 * Five real reports that produced real merged pull requests on PostHog/posthog.
 *
 * Everything here is genuine: the PR numbers, titles, branches, diff totals, and
 * approvers come from the GitHub API; the priority, signal counts, discovery channel,
 * summary prose, suggested reviewers, commit rationale, and the code paths under each
 * finding come from the reports themselves in project 2.
 *
 * Two deliberate departures from the stored data, both for privacy:
 *   - Evidence bodies are re-worded. The real `signal_finding` prose carries customer
 *     session ids, export asset ids, team numbers, and in places an end user's name.
 *     The code paths beside them are verbatim, because repo paths are public.
 *   - Nothing carries the reports' internal dollar-value impact estimates, reviewer
 *     email addresses, or user ids.
 *
 * To refresh or add an item, see README.md – the GitHub half can be re-fetched from
 * the public API, the report half needs project 2 access.
 */
export const INBOX_ITEMS: InboxItem[] = [
    // 1 — PostHog/posthog#75725. Found by error tracking.
    {
        id: 'error-tracking',
        commitType: 'fix',
        scope: 'insights',
        title: "don't fail queries when the cache size lookup errors",
        summary:
            '172 insight queries failed in three minutes even though the queries had already succeeded – a bookkeeping read in the cache write path took the response down with it.',
        priority: 'P1',
        signalCount: 1,
        timeAgo: 'Merged Jul 30',
        origin: { kind: 'signal', product: 'error_tracking' },
        prUrl: 'https://github.com/PostHog/posthog/pull/75725',
        prNumber: 75725,
        detail: {
            status: 'Actionable',
            firstSeen: 'Jul 30, 2026',
            lastUpdated: 'Jul 30, 2026',
            branch: 'posthog-code/query-cache-failsoft-team-limit',
            contributingSources: ['error_tracking'],
            stats: { added: 39, removed: 3, files: 4, commits: 4 },
            approvers: ['andyzzhao'],
            summary: [
                {
                    paragraphs: [
                        <>
                            <strong>172 insight queries failed in a three-minute window</strong> even though the queries
                            themselves had already succeeded. A Postgres bookkeeping read in the query cache write path
                            blew up and took the response with it.
                        </>,
                    ],
                },
                {
                    heading: 'Problem',
                    paragraphs: [
                        <>
                            <Code>QueryCache.store_result()</Code> writes the result, then asks{' '}
                            <Code>get_team_cache_limit()</Code> for the team's cache cap. That helper reads an optional
                            override from Postgres and only catches <Code>Team.DoesNotExist</Code>, so when the
                            connection pooler saturates and raises <Code>OperationalError</Code> a successful ClickHouse
                            query becomes a 500 over a config value that has a perfectly good default.
                        </>,
                    ],
                },
                {
                    heading: 'Impact',
                    paragraphs: [
                        <>
                            172 exceptions in three minutes, each one a query someone paid for and didn't get back. It
                            only fires when Postgres is already under pressure, so it amplifies database incidents
                            rather than dripping constantly.
                        </>,
                    ],
                },
                {
                    heading: 'Solution',
                    paragraphs: [
                        <>
                            Catch <Code>DatabaseError</Code> and fall back to the default limit, and wrap the
                            bookkeeping call in <Code>store_result()</Code> so cache accounting can never fail a query
                            that already ran.
                        </>,
                    ],
                },
            ],
            reviewers: [
                {
                    name: 'Andy Zhao',
                    githubLogin: 'andyzzhao',
                    approved: true,
                    commits: [
                        {
                            sha: 'a93db7e',
                            url: 'https://github.com/PostHog/posthog/commit/a93db7eb3e11bce139529b57baa550330f64e412',
                        },
                        {
                            sha: 'dd25283',
                            url: 'https://github.com/PostHog/posthog/commit/dd25283cd3a812b26299f6eddcf5ba2d737c483b',
                        },
                    ],
                    reason: (
                        <>
                            Introduced <Code>get_team_cache_limit()</Code>, which put a synchronous Postgres read into
                            the ClickHouse result-cache write path – the call that raises in the reported traceback.
                            Also authored the current <Code>store_result()</Code>, the frame that lets a bookkeeping
                            failure escape and fail an already-successful query.
                        </>
                    ),
                },
            ],
            evidence: [
                {
                    id: 'exception-burst',
                    source: 'error_tracking',
                    title: '172 events in a three-minute window',
                    body: (
                        <>
                            Queried <Code>$exception</Code> events: the timeout arrives in project-wide bursts, then
                            goes near-silent for about ten days. Narrowed to this path, 172 events land inside three
                            minutes, 171 of them as <Code>OperationalError</Code> with <Code>ProtocolViolation</Code>. A
                            GitHub search confirmed nobody had an open branch on either file.
                        </>
                    ),
                    tags: [
                        {
                            label: 'Verified',
                            tone: 'green',
                            tooltip: 'The finding was confirmed against event data, not just inferred from the code.',
                        },
                    ],
                    verified: true,
                    codePaths: [
                        'posthog/query_cache/size_tracker.py',
                        'posthog/query_cache/cache.py',
                        'posthog/cache_utils.py',
                        'posthog/hogql_queries/query_runner.py',
                        'posthog/settings/schedules.py',
                    ],
                },
            ],
            files: [
                {
                    path: 'posthog/query_cache/cache.py',
                    added: 12,
                    removed: 3,
                    hunk: '@@ -4,6 +4,8 @@',
                    lines: [
                        { kind: 'context', text: 'from django.conf import settings' },
                        { kind: 'context', text: '' },
                        { kind: 'add', text: 'import structlog' },
                        { kind: 'add', text: '' },
                        { kind: 'context', text: 'from posthog.cache_utils import OrjsonJsonSerializer' },
                        {
                            kind: 'context',
                            text: 'from posthog.query_cache.size_tracker import TeamCacheSizeTracker',
                        },
                        { kind: 'context', text: '' },
                        { kind: 'add', text: 'logger = structlog.get_logger(__name__)' },
                    ],
                },
            ],
        },
    },
    // 2 — PostHog/posthog#72382. Found by Replay Vision.
    {
        id: 'replay-vision',
        commitType: 'fix',
        scope: 'cohorts',
        title: 'validate negation against sibling groups under outer AND',
        summary:
            "A valid cohort couldn't be saved when a negation sat in its own group, and the obvious workaround silently built a different cohort.",
        priority: 'P2',
        signalCount: 3,
        timeAgo: 'Merged Jul 29',
        origin: { kind: 'signal', product: 'replay_vision' },
        prUrl: 'https://github.com/PostHog/posthog/pull/72382',
        prNumber: 72382,
        detail: {
            status: 'Actionable',
            firstSeen: 'Jul 6, 2026',
            lastUpdated: 'Jul 29, 2026',
            branch: 'posthog-code/fix-cohort-negation-sibling-group',
            contributingSources: ['replay_vision'],
            stats: { added: 89, removed: 9, files: 3, commits: 2 },
            approvers: ['gustavohstrassburger'],
            summary: [
                {
                    paragraphs: [
                        <>
                            A "did not complete event" negation in its own criteria group made a valid cohort
                            unsaveable, even with the top-level operator set to match all criteria.
                        </>,
                    ],
                },
                {
                    heading: 'Problem',
                    paragraphs: [
                        <>
                            <Code>validateGroup</Code> checks negation one group at a time. A negation alone in its
                            group makes that group entirely negated, so the check fires and throws – it never looks at
                            the positive criterion in a sibling group, or at the top-level AND.
                        </>,
                    ],
                },
                {
                    heading: 'Impact',
                    paragraphs: [
                        <>
                            Three independent recordings caught this across two regions over about three weeks, so it's
                            a recurring trap. People either delete the negation they wanted, or switch the group to
                            "any" to get past the error and <strong>silently build a different cohort</strong>.
                        </>,
                    ],
                },
                {
                    heading: 'Solution',
                    paragraphs: [
                        <>
                            Make negation validation reason about the whole cohort instead of each group in isolation:
                            when the outer operator is AND, a negation in one group is satisfied by a positive criterion
                            in any sibling group.
                        </>,
                    ],
                },
            ],
            evidence: [
                {
                    id: 'vision-1',
                    source: 'replay_vision',
                    title: 'Traced the error text to the validator',
                    body: 'Confirmed from a recording plus the code that new subgroups default to the "any" operator, that the negation check fires for any non-AND group, and that the message matches the client-side error constant exactly. Blame put all of it in the original cohort filters commit.',
                    tags: [{ label: 'Verified', tone: 'green' }],
                    verified: true,
                    codePaths: [
                        'frontend/src/scenes/cohorts/cohortUtils.tsx',
                        'frontend/src/scenes/cohorts/CohortFilters/constants.tsx',
                        'frontend/src/scenes/cohorts/CohortFilters/types.ts',
                        'frontend/src/scenes/cohorts/cohortEditLogic.ts',
                    ],
                },
                {
                    id: 'vision-2',
                    source: 'replay_vision',
                    title: 'A second session reproduced it',
                    body: 'Another observed session hit the same block, and the described reproduction matched the traced code path exactly. Two regions, three weeks apart.',
                    tags: [{ label: 'Verified', tone: 'green' }],
                    verified: true,
                    codePaths: [
                        'frontend/src/scenes/cohorts/cohortUtils.tsx',
                        'frontend/src/scenes/cohorts/cohortEditLogic.ts',
                    ],
                },
            ],
            files: [
                {
                    path: 'frontend/src/scenes/cohorts/cohortUtils.tsx',
                    added: 24,
                    removed: 7,
                    hunk: '@@ -182,8 +182,22 @@',
                    lines: [
                        { kind: 'add', text: '/** Whether a group contributes at least one positive criterion. */' },
                        { kind: 'add', text: 'function hasPositiveCriterion(group): boolean {' },
                        { kind: 'add', text: '    if (!isCohortCriteriaGroup(group)) {' },
                        { kind: 'add', text: '        return !group.negation' },
                        { kind: 'add', text: '    }' },
                        {
                            kind: 'add',
                            text: '    return group.values.filter((g) => !isCohortCriteriaGroup(g)).some(...)',
                        },
                        { kind: 'add', text: '}' },
                        { kind: 'context', text: '' },
                        { kind: 'context', text: 'export function validateGroup(' },
                        { kind: 'remove', text: '    group: CohortCriteriaGroupFilter | AnyCohortCriteriaType' },
                        { kind: 'add', text: '    group: CohortCriteriaGroupFilter | AnyCohortCriteriaType,' },
                        { kind: 'add', text: '    outerOperator?: FilterLogicalOperator,' },
                    ],
                },
            ],
        },
    },
    // 3 — PostHog/posthog#73901. Found by a support conversation.
    {
        id: 'conversations',
        commitType: 'fix',
        scope: 'integrations',
        title: 'land OAuth integration on the initiating project',
        summary:
            'Connecting Slack from one project landed the integration on a different one, and it looked like it had worked.',
        priority: 'P2',
        signalCount: 2,
        timeAgo: 'Merged Jul 30',
        origin: { kind: 'signal', product: 'conversations' },
        prUrl: 'https://github.com/PostHog/posthog/pull/73901',
        prNumber: 73901,
        detail: {
            status: 'Actionable',
            firstSeen: 'Jul 27, 2026',
            lastUpdated: 'Jul 30, 2026',
            branch: 'posthog-code/fix-oauth-integration-lands-on-wrong-project',
            contributingSources: ['conversations'],
            stats: { added: 89, removed: 9, files: 6, commits: 4 },
            approvers: ['andrewm4894'],
            summary: [
                {
                    paragraphs: [
                        <>
                            People with more than one project who connect Slack end up with the integration on the wrong
                            project, because the OAuth callback creates it against their default team rather than the
                            project they started from.
                        </>,
                    ],
                },
                {
                    heading: 'Problem',
                    paragraphs: [
                        <>
                            <Code>authorize_url</Code> puts only <Code>{'{next, token}'}</Code> in the OAuth{' '}
                            <Code>state</Code> and sends Slack to a callback that isn't project-scoped. That full-page
                            round-trip reloads the app, so the current team re-resolves to the user's persisted default
                            and the create call writes against <Code>@current</Code>. <Code>state.next</Code> then
                            bounces the UI back to the right project, which is exactly why it looks like it worked.
                        </>,
                    ],
                },
                {
                    heading: 'Impact',
                    paragraphs: [
                        <>
                            Hits any multi-project customer wiring up Slack, or any other OAuth integration – they share
                            the flow. There's a workaround (switch default project first), but it's a confusing
                            onboarding snag that generates support tickets.
                        </>,
                    ],
                },
                {
                    heading: 'Solution',
                    paragraphs: [
                        <>
                            Carry the initiating <Code>team_id</Code> through the OAuth <Code>state</Code> and create
                            against that team, as the GitHub flow already does.
                        </>,
                    ],
                },
            ],
            evidence: [
                {
                    id: 'conv-1',
                    source: 'conversations',
                    title: 'Repeat connect attempts collapsing onto one project',
                    body: 'Queried the integration-created events: Slack is the highest-volume integration kind by a wide margin over 60 days, across thousands of distinct projects. Several people show three or four Slack connect attempts in a single day that all resolve to exactly one project – including on the day it was reported.',
                    tags: [{ label: 'Verified', tone: 'green' }],
                    verified: true,
                    codePaths: [
                        'frontend/src/lib/integrations/integrationsLogic.ts',
                        'posthog/models/integration.py',
                        'posthog/api/integration.py',
                        'frontend/src/scenes/IntegrationsRedirect/IntegrationsRedirect.tsx',
                        'posthog/api/github_callback/types.py',
                    ],
                },
                {
                    id: 'conv-2',
                    source: 'conversations',
                    title: 'Confirmed from the code path alone',
                    body: 'The affected rows live in Postgres rather than in queryable event data, so this one rests on the code: the create call resolves its team from @current, and the callback that is not project-scoped re-resolves to the persisted default team.',
                    tags: [
                        {
                            label: 'Code analysis',
                            tone: 'blue',
                            tooltip:
                                'The finding could not be confirmed in event data, and the report says so rather than overstating it.',
                        },
                    ],
                    verified: false,
                    codePaths: [
                        'frontend/src/lib/integrations/integrationsLogic.ts',
                        'posthog/models/integration.py',
                        'posthog/api/integration.py',
                    ],
                },
            ],
            files: [
                {
                    path: 'frontend/src/lib/integrations/integrationsLogic.ts',
                    added: 14,
                    removed: 5,
                    hunk: '@@ -858,7 +858,7 @@',
                    lines: [
                        { kind: 'context', text: 'handleOauthCallback: async ({ kind, searchParams }) => {' },
                        {
                            kind: 'remove',
                            text: '    const { next, token, source, server_id } = fromParamsGivenUrl(state)',
                        },
                        {
                            kind: 'add',
                            text: '    const { next, token, source, server_id, team_id } = fromParamsGivenUrl(state)',
                        },
                        { kind: 'context', text: '' },
                        { kind: 'remove', text: '    const integration = await api.integrations.create({' },
                        { kind: 'remove', text: '        kind: resolvedKind,' },
                        { kind: 'remove', text: '        config: { state, code },' },
                        { kind: 'remove', text: '    })' },
                        {
                            kind: 'add',
                            text: '    // The callback URL is not project-scoped, so after this full-page',
                        },
                        {
                            kind: 'add',
                            text: "    // round-trip the SPA may have re-resolved to the user's default team.",
                        },
                        { kind: 'add', text: '    // Target the team that started the flow instead.' },
                    ],
                },
            ],
        },
    },
    // 4 — PostHog/posthog#70918. Found by a support conversation.
    {
        id: 'ai-observability',
        commitType: 'fix',
        scope: 'aio',
        title: 'chunk eval summary to avoid ai-gateway 30s timeout',
        summary:
            'Generating an AI eval summary failed about two-thirds of the time, because one slow LLM call ran into a hard gateway timeout.',
        priority: 'P1',
        signalCount: 1,
        timeAgo: 'Merged Jul 29',
        origin: { kind: 'signal', product: 'conversations' },
        prUrl: 'https://github.com/PostHog/posthog/pull/70918',
        prNumber: 70918,
        detail: {
            status: 'Actionable',
            firstSeen: 'Jul 14, 2026',
            lastUpdated: 'Jul 29, 2026',
            branch: 'posthog-code/eval-summary-chunked-map-reduce',
            contributingSources: ['conversations', 'ai_observability'],
            stats: { added: 997, removed: 94, files: 13, commits: 12 },
            approvers: ['Radu-Raicea'],
            summary: [
                {
                    paragraphs: [
                        <>
                            Generating an AI eval summary failed <strong>roughly two-thirds of the time</strong>,
                            because the request ran as one slow synchronous LLM call that the internal gateway killed at
                            30 seconds.
                        </>,
                    ],
                },
                {
                    heading: 'Problem',
                    paragraphs: [
                        <>
                            The endpoint fires a single blocking completion analysing up to 250 runs in one prompt. That
                            takes 20 to 30+ seconds, and the call routes through a gateway with a hard ~30s timeout. The
                            Python-side 120s timeout never applies, because the gateway aborts first and returns a 502.
                        </>,
                    ],
                },
                {
                    heading: 'Impact',
                    paragraphs: [
                        <>
                            16 of the last 24 generations failed with a 502, all pinned at about 30s latency (a{' '}
                            <strong>67% failure rate</strong>), while the 8 that succeeded squeaked under the cliff at
                            up to 29.3s.
                        </>,
                    ],
                },
                {
                    heading: 'Solution',
                    paragraphs: [
                        <>
                            Summarize as a bounded concurrent map-reduce, chunking the run set so no single gateway
                            request approaches the timeout.
                        </>,
                    ],
                },
            ],
            evidence: [
                {
                    id: 'aio-1',
                    source: 'ai_observability',
                    title: 'Every failure pinned to the 30s boundary',
                    body: (
                        <>
                            Queried <Code>$ai_generation</Code> events for this feature over 30 days, grouped by error
                            state and HTTP status with average and max latency: 16 errors, all 502, max latency 30.0s
                            and average 29.1s, against 8 successes up to 29.3s. Failures clustered at the boundary
                            rather than spread out, which points at a hard timeout instead of variable model slowness.
                        </>
                    ),
                    tags: [{ label: 'Verified', tone: 'green' }],
                    verified: true,
                    codePaths: [
                        'products/ai_observability/backend/summarization/llm/evaluation_summary.py',
                        'products/ai_observability/backend/api/evaluation_summary.py',
                        'posthog/llm/gateway_client.py',
                        'products/ai_observability/backend/summarization/constants.py',
                    ],
                },
            ],
            files: [
                {
                    path: 'products/ai_observability/backend/summarization/constants.py',
                    added: 10,
                    removed: 0,
                    hunk: '@@ -11,3 +11,13 @@',
                    lines: [
                        { kind: 'context', text: '# Evaluation summary limits' },
                        { kind: 'context', text: 'EVALUATION_SUMMARY_MAX_RUNS = 250' },
                        { kind: 'add', text: '' },
                        {
                            kind: 'add',
                            text: '# Large or verbose inputs are summarized as a bounded concurrent map-reduce so no',
                        },
                        {
                            kind: 'add',
                            text: '# individual ai-gateway request approaches its ~30s hard timeout.',
                        },
                        { kind: 'add', text: 'EVALUATION_SUMMARY_CHUNK_SIZE = 20' },
                        { kind: 'add', text: 'EVALUATION_SUMMARY_PROMPT_MAX_CHARS = 20_000' },
                        { kind: 'add', text: 'EVALUATION_SUMMARY_MAX_CONCURRENT_MAP_CALLS = 5' },
                    ],
                },
            ],
        },
    },
    // 5 — PostHog/posthog#67019. Found by Replay Vision.
    {
        id: 'session-replay',
        commitType: 'fix',
        scope: 'settings',
        title: 'redirect removed toolbar section to web analytics',
        summary:
            'A removed settings route showed "Setting not found" while the sidebar still highlighted it as the current page.',
        priority: 'P2',
        signalCount: 3,
        timeAgo: 'Merged Jul 28',
        origin: { kind: 'signal', product: 'replay_vision' },
        prUrl: 'https://github.com/PostHog/posthog/pull/67019',
        prNumber: 67019,
        detail: {
            status: 'Actionable',
            firstSeen: 'Jun 29, 2026',
            lastUpdated: 'Jul 28, 2026',
            branch: 'posthog-code/fix-dead-settings-and-alerts-routes',
            contributingSources: ['replay_vision', 'session_replay'],
            stats: { added: 57, removed: 0, files: 3, commits: 3 },
            approvers: ['rafaeelaudibert'],
            summary: [
                {
                    paragraphs: [
                        <>
                            Opening the old toolbar settings URL gave a "Setting not found" page, while the sidebar went
                            on highlighting Toolbar as though you were on it.
                        </>,
                    ],
                },
                {
                    heading: 'Problem',
                    paragraphs: [
                        <>
                            The section was removed when toolbar configuration folded into web analytics. The settings
                            router canonicalizes old section ids through a legacy map, but that map only covered one
                            earlier rename – so this id falls through, the selected section resolves to null, and the
                            scene renders its not-found state.
                        </>,
                    ],
                },
                {
                    heading: 'Impact',
                    paragraphs: [
                        <>
                            A papercut rather than a hard block, since the sidebar link itself still works. But it's
                            broad: not-found events on that exact path appear across{' '}
                            <strong>more than 20 distinct projects over 90 days</strong>, so something stale is still
                            linking to it.
                        </>,
                    ],
                },
                {
                    heading: 'Solution',
                    paragraphs: [
                        <>
                            Add the removed section to the legacy map so the router redirects to where the settings
                            actually live now.
                        </>,
                    ],
                },
            ],
            reviewers: [
                {
                    name: 'Rafael Audibert',
                    githubLogin: 'rafaeelaudibert',
                    approved: true,
                    commits: [
                        {
                            sha: '93e6bdf',
                            url: 'https://github.com/PostHog/posthog/commit/93e6bdff54a3e28ef0683796afc6f135f62c39c6',
                        },
                    ],
                    reason: (
                        <>
                            Removed the Toolbar settings section and its authorized-URL setting during the web analytics
                            revamp, which is what left this URL with no matching section. Causative.
                        </>
                    ),
                },
                {
                    name: 'Marius Andra',
                    githubLogin: 'mariusandra',
                    commits: [
                        {
                            sha: '8a8fe72',
                            url: 'https://github.com/PostHog/posthog/commit/8a8fe725455bcb59421003e8891d18377ee381d2',
                        },
                    ],
                    reason: <>Restructured the routes and tabs mapping that decides which paths resolve to a scene.</>,
                },
            ],
            evidence: [
                {
                    id: 'settings-1',
                    source: 'replay_vision',
                    title: 'Not-found events across 20+ projects',
                    body: (
                        <>
                            Counted <Code>not_found_shown</Code> events over 90 days for that path: it appears across
                            more than twenty distinct projects in both regions, with multiple distinct users each,
                            confirming a widespread and reproducible "Setting not found".
                        </>
                    ),
                    tags: [{ label: 'Verified', tone: 'green' }],
                    verified: true,
                    codePaths: [
                        'frontend/src/scenes/settings/settingsSceneLogic.ts',
                        'frontend/src/scenes/settings/SettingsMap.tsx',
                        'frontend/src/scenes/settings/Settings.tsx',
                        'frontend/src/lib/components/NotFound/index.tsx',
                    ],
                },
            ],
            files: [
                {
                    path: 'frontend/src/scenes/settings/settingsSceneLogic.ts',
                    added: 25,
                    removed: 0,
                    hunk: '@@ -17,10 +17,16 @@',
                    lines: [
                        {
                            kind: 'add',
                            text: "const WEB_ANALYTICS_SETTINGS_SECTION: SettingSectionId = 'project-web-analytics'",
                        },
                        { kind: 'context', text: '' },
                        {
                            kind: 'context',
                            text: 'const LEGACY_SETTINGS_SECTIONS: Record<string, SettingSectionId> = {',
                        },
                        {
                            kind: 'context',
                            text: "    'project-llm-analytics': AI_OBSERVABILITY_SETTINGS_SECTION,",
                        },
                        {
                            kind: 'add',
                            text: '    // The dedicated Toolbar section was removed; its authorized-URL',
                        },
                        { kind: 'add', text: '    // config now lives under Web analytics.' },
                        { kind: 'add', text: "    'environment-toolbar': WEB_ANALYTICS_SETTINGS_SECTION," },
                        { kind: 'add', text: "    'project-toolbar': WEB_ANALYTICS_SETTINGS_SECTION," },
                        { kind: 'context', text: '}' },
                    ],
                },
            ],
        },
    },
]

interface OriginMeta {
    Icon: React.ComponentType<{ className?: string }>
    color: string
    /** Primary origin label, e.g. "Session replay" or "Scout". */
    primary: string
    /** Secondary label for scouts, e.g. "APM" – rendered as "Scout · APM". */
    secondary?: string
}

// Resolves how an item's origin renders on the row and in the detail header: a source
// product's icon + name for signal sources, or a compass + "Scout · <category>" for scouts.
export const originMeta = (item: InboxItem): OriginMeta => {
    const source = SOURCE_META[item.origin.product]
    if (item.origin.kind === 'scout') {
        return { Icon: IconCompass, color: source.color, primary: 'Scout', secondary: item.origin.scout }
    }
    return { Icon: source.Icon, color: source.color, primary: source.label }
}

/**
 * Evidence sources, which include support tools the six signal products don't cover.
 * `groupLabel` lets the meta row say "Support" where the card says "Zendesk".
 */
export const EVIDENCE_SOURCE_META: Record<EvidenceSource, SourceMeta & { groupLabel?: string }> = {
    ...SOURCE_META,
    zendesk: { label: 'Zendesk', Icon: IconSupport, color: 'text-green', groupLabel: 'Support' },
}

/** Findings count on the meta row, from the evidence actually authored. */
export const findingsCount = (item: InboxItem): number => item.detail?.evidence?.length ?? item.signalCount

/**
 * The diff stat on the tab strip. Prefers the real whole-PR totals from GitHub, and
 * falls back to summing the listed files – the hunks shown under Files changed are
 * excerpts of one file each, so they undercount a multi-file pull request.
 */
export const diffStat = (detail: ReportDetail): { added: number; removed: number } =>
    detail.stats ??
    (detail.files ?? []).reduce(
        (acc, file) => ({ added: acc.added + file.added, removed: acc.removed + file.removed }),
        { added: 0, removed: 0 }
    )
