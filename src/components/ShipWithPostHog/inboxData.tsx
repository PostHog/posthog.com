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
import type { SelfDrivingStoryStep } from 'components/SelfDrivingStory'

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
    | 'zendesk'
    | 'logs'
    | 'traces'
    | 'ai_observability'
    | 'analytics'
    /**
     * Scout-authored reports. This really is a `source_product` in the API rather than a
     * modifier on another one – a scout report comes back as
     * `source_products: ['signals_scout']`, with the scout's domain living on its skill
     * name (`signals-scout-instrumentation-gaps`) instead.
     */
    | 'signals_scout'

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
    zendesk: {
        label: 'Zendesk',
        Icon: IconSupport,
        color: 'text-green',
        found: 'A support ticket landed, and the conversation became a signal.',
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
    signals_scout: {
        label: 'Scout',
        Icon: IconCompass,
        color: 'text-purple',
        found: 'A scout went looking on a schedule, rather than waiting for something to break.',
    },
}

export type Priority = 'P0' | 'P1' | 'P2' | 'P3' | 'P4'

/**
 * Signal-source reports show the source product's icon and name. Scout-authored reports
 * show "Scout · <domain>".
 *
 * The scout variant carries no second product on purpose: in the API a scout report's
 * `source_products` is exactly `['signals_scout']`, so pairing it with another product
 * would show an origin the Inbox never emits. The domain comes from the scout's skill
 * name – `signals-scout-instrumentation-gaps` reads as "Instrumentation gaps".
 */
type Origin = { kind: 'signal'; product: SourceKey } | { kind: 'scout'; scout: string }

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
    /**
     * The commits the blame walk landed on, with links to the real diffs. Optional: the
     * artefact can name a reason without pinning specific commits, and then there are
     * no shas to render.
     */
    commits?: { sha: string; url: string }[]
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
    /**
     * The real branch the agent worked on. Absent when no agent has picked the report up
     * yet – a report waiting on human input often has no branch at all.
     */
    branch?: string
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
    /** The detail view's payload. */
    detail?: ReportDetail
    /**
     * One-line lead-in above this item's walkthrough in `SignalsToInbox`. Optional so an
     * item can appear in the inbox without appearing in that section.
     */
    intro?: React.ReactNode
    /**
     * The Scout → Signal → Investigate → PR → Merge walkthrough for `SignalsToInbox`.
     * Optional for the same reason: only items with steps show up in the selector, so an
     * item added to the inbox never breaks that section by having nothing to narrate.
     */
    steps?: SelfDrivingStoryStep[]
}

/*
 * Placeholder screenshot labels, so a later content pass knows which image each slot
 * wants. `SelfDrivingStory` renders these as labeled dashed boxes until real captures
 * land, and `image` takes precedence over `imagePlaceholder` once one does – the
 * session-replay walkthrough already has all four for real.
 */
const ph = {
    signal: 'Screenshot: the report in your Inbox',
    investigate: 'Screenshot: the agent tracing the root cause',
    pr: (n: number) => `Screenshot: pull request #${n} on GitHub`,
    merge: (n: number) => `Screenshot: #${n} merged`,
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
        intro: 'An exception burst that pointed at the wrong culprit until an agent read the write path.',
        steps: [
            {
                stage: 'signal',
                copy: 'Error tracking groups every exception into an issue with a running count, so a burst registers the moment it starts. Insight queries begin returning 500s in project-wide bursts – 172 exceptions inside three minutes, 171 of them the same database error.',
                imagePlaceholder: ph.signal,
            },
            {
                stage: 'investigate',
                copy: (
                    <>
                        The agent finds the queries had already succeeded. <Code>store_result()</Code> asks{' '}
                        <Code>get_team_cache_limit()</Code> for the team's cache cap, and that helper reads an optional
                        override from Postgres while only catching <Code>Team.DoesNotExist</Code> – so a saturated
                        connection pooler fails a query over a config value that has a good default.
                    </>
                ),
                imagePlaceholder: ph.investigate,
            },
            {
                stage: 'pr',
                copy: (
                    <>
                        The fix catches <Code>DatabaseError</Code>, falls back to the default limit, and wraps the
                        bookkeeping call so cache accounting can never fail a query that already ran. 39 lines added
                        across four files.
                    </>
                ),
                imagePlaceholder: ph.pr(75725),
            },
            {
                stage: 'merge',
                copy: 'The agent suggested Andy Zhao, who wrote the cache-limit helper in the first place. He reviewed it, approved it, and it merged the same day.',
                imagePlaceholder: ph.merge(75725),
            },
        ],
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
        intro: 'Three recordings, three weeks apart, all stuck on the same validation error.',
        steps: [
            {
                stage: 'signal',
                copy: 'Replay Vision watches recordings and flags friction as it happens. Someone builds a cohort with a "did not complete event" criterion, hits save, and gets an error – three independent recordings catch the same block across two regions over about three weeks.',
                imagePlaceholder: ph.signal,
            },
            {
                stage: 'investigate',
                copy: (
                    <>
                        The agent matches the error text to its client-side constant, then finds{' '}
                        <Code>validateGroup</Code> checking negation one group at a time. A negation alone in its group
                        makes that group entirely negated, so the check throws without ever looking at the positive
                        criterion in a sibling group.
                    </>
                ),
                imagePlaceholder: ph.investigate,
            },
            {
                stage: 'pr',
                copy: 'The fix makes negation validation reason about the whole cohort: under a top-level AND, a negation in one group is satisfied by a positive criterion in any sibling group.',
                imagePlaceholder: ph.pr(72382),
            },
            {
                stage: 'merge',
                copy: 'Worth merging for the workaround alone – people were switching the group to "any" to get past the error, which silently built a different cohort than the one they wanted.',
                imagePlaceholder: ph.merge(72382),
            },
        ],
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
        intro: 'A support thread about Slack that turned out to be an OAuth bug hiding behind a successful-looking redirect.',
        steps: [
            {
                stage: 'signal',
                copy: 'Conversations reads your support inbox, so a thread describing a reproducible problem becomes a signal without anyone filing a ticket. A customer with several projects connects Slack and it lands on a different one – and integration-created events show people making three or four attempts in a day that all resolve to the same project.',
                imagePlaceholder: ph.signal,
            },
            {
                stage: 'investigate',
                copy: (
                    <>
                        The agent finds <Code>authorize_url</Code> putting only <Code>{'{next, token}'}</Code> in the
                        OAuth <Code>state</Code>, with a callback that isn't project-scoped. The full-page round-trip
                        re-resolves the current team to the user's saved default, so the integration is created against
                        the wrong one – then <Code>state.next</Code> bounces the UI back, which is why it looks like it
                        worked.
                    </>
                ),
                imagePlaceholder: ph.investigate,
            },
            {
                stage: 'pr',
                copy: (
                    <>
                        The fix carries the initiating <Code>team_id</Code> through the OAuth <Code>state</Code> and
                        creates against that team, matching what the GitHub flow already did.
                    </>
                ),
                imagePlaceholder: ph.pr(73901),
            },
            {
                stage: 'merge',
                copy: 'One report, but it affects every multi-project customer wiring up any OAuth integration, since they all share this flow. Approved and merged three days after it was first seen.',
                imagePlaceholder: ph.merge(73901),
            },
        ],
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
        intro: 'A feature that failed two times in three, with every failure landing on the same suspicious number.',
        steps: [
            {
                stage: 'signal',
                copy: (
                    <>
                        Conversations picked this one up, and LLM analytics had the numbers to confirm it. Generating an
                        AI eval summary mostly fails: over 30 days of <Code>$ai_generation</Code> events, 16 errors, all
                        502, averaging 29.1s against 8 successes topping out at 29.3s.
                    </>
                ),
                imagePlaceholder: ph.signal,
            },
            {
                stage: 'investigate',
                copy: 'Failures clustered on the boundary rather than spread out, which points at a hard timeout instead of a slow model. The endpoint ran one blocking completion over as many as 250 runs, taking 20 to 30+ seconds through a gateway that aborts at about 30 – so the generous Python-side timeout never got a chance to apply.',
                imagePlaceholder: ph.investigate,
            },
            {
                stage: 'pr',
                copy: 'The fix summarizes as a bounded concurrent map-reduce, chunking the run set so no single gateway request approaches the timeout. The largest of these five by a distance: 997 lines added across 13 files.',
                imagePlaceholder: ph.pr(70918),
            },
            {
                stage: 'merge',
                copy: 'Approved and merged, taking a 67% failure rate to zero without raising a single limit.',
                imagePlaceholder: ph.merge(70918),
            },
        ],
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
        intro: 'Some bugs never throw an exception. Replay is how self-driving catches the ones users only feel.',
        /*
         * The built-out walkthrough, and the only one with real screenshots rather than
         * placeholder boxes. Its copy is about how a replay-sourced report moves through the
         * loop rather than about this specific 404, which is why the captures are reusable.
         */
        steps: [
            {
                stage: 'signal',
                copy: 'Rage clicks, dead ends, blocking errors: the signal source flags them in every new recording, and scouts hunt where you point them, on a schedule. When the same wall keeps showing up, it becomes a report.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_07_30_at_15_24_02_2x_1_1054be2650.png',
            },
            {
                stage: 'investigate',
                copy: 'The agent watches the flagged sessions, sizes the damage, and traces it to the responsible code. The replays go in as evidence.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Report_Investigate_Mock_Session_replay_c67c6ef4d4.png',
            },
            {
                stage: 'pr',
                copy: 'A replay shows the symptom, so the report waits for your call. You decide the fix; the agent opens the PR.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Git_Hub_PR_Mock_Session_replay_4207c634ad.png',
            },
            {
                stage: 'merge',
                copy: 'You review the diff next to the replays that earned it. Merge, or dismiss with a reason the scout learns from.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Git_Hub_PR_Merged_Mock_Session_replay_c1198f45ea.png',
            },
        ],
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

/**
 * Three real reports that have **not** become pull requests – the other half of the
 * Inbox, and the state every item in `INBOX_ITEMS` passed through first.
 *
 * A report is what the loop produces before anyone commits to a fix: the evidence is
 * gathered, the code is read, reviewers are worked out, and a write-up exists – but no
 * branch has been merged. Two here are `immediately_actionable`, meaning an agent could
 * open the pull request today; the third is `requires_human_input`, where the agent
 * investigated, disproved its own first diagnosis, and stopped rather than shipping a
 * fix it couldn't stand behind. That last one is the honest case, so it's included.
 *
 * Sourced exactly like `INBOX_ITEMS` – `inbox-reports-retrieve` and
 * `inbox-report-artefacts-list` on project 2 – with the same privacy rules: evidence
 * bodies are re-worded to drop customer project ids, ticket numbers, session ids, and
 * email addresses, while repo paths and commit SHAs stay verbatim because they're public.
 *
 * None of them carry `stats` or `files`: without a merged pull request there is no
 * authoritative diff to publish, so the detail view degrades to Overview rather than
 * showing invented numbers.
 */
export const REPORT_ITEMS: InboxItem[] = [
    // 1 — Report 019f21c4. Found by Replay Vision, corroborated by a support ticket.
    {
        id: 'mcp-analytics',
        commitType: 'fix',
        scope: 'mcp-analytics',
        title: 'Stop access-control denials crashing the view',
        summary:
            'MCP analytics went generally available, but its two access gates disagree with each other, so users are shown the product and then hit a hard error instead of data.',
        priority: 'P1',
        signalCount: 3,
        timeAgo: 'Updated a day ago',
        origin: { kind: 'signal', product: 'replay_vision' },
        detail: {
            status: 'Actionable',
            firstSeen: 'Jul 2, 2026',
            lastUpdated: 'Jul 30, 2026',
            branch: 'posthog-code/mcp-analytics-beta-gate',
            contributingSources: ['replay_vision', 'session_replay', 'zendesk'],
            summary: [
                {
                    paragraphs: [
                        <>
                            MCP analytics went generally available, but its two access gates disagree with each other,
                            so users are shown the product and then hit a hard error instead of data.
                        </>,
                    ],
                },
                {
                    heading: 'Problem',
                    paragraphs: [
                        <>
                            There are now <strong>two independent gates on MCP analytics that don't agree</strong>. The
                            dashboard's tile queries go through <Code>validate_mcp_analytics_access</Code>, which raises
                            on both a false <Code>mcp-analytics</Code> flag eval <em>and</em> a failed RBAC check. The
                            sessions list was left on flag-only <Code>PostHogFeatureFlagPermission</Code>, so{' '}
                            <strong>the two halves of the product can give the same user different answers</strong>.
                            Worse, both gates <em>raise</em> rather than degrade, so one denied tile query escalates
                            through the scene error boundary and takes the whole view down instead of showing that one
                            tile as unavailable.
                        </>,
                    ],
                },
                {
                    heading: 'Impact',
                    paragraphs: [
                        <>
                            This used to be contained to a handful of allow-listed beta users. It isn't anymore:{' '}
                            <strong>
                                the flag went to a single unconditional 100% group and the feature is now marked
                                generally available
                            </strong>
                            , so everyone can reach the product. Denials have not stopped –{' '}
                            <Code>query access control error</Code> still fires every day, 42 times on one day and 15
                            the next. A support ticket already came from someone who couldn't compute insights or see
                            sessions while their colleague could, and a session recording shows the failure as a{' '}
                            <strong>full-page crash on entry</strong>.
                        </>,
                    ],
                },
                {
                    heading: 'Solution',
                    paragraphs: [
                        <>
                            Make the two gates agree and make failure local. Move the sessions viewset onto the same{' '}
                            <Code>mcp_analytics</Code> RBAC resource the query runners use, so a user who can see the
                            dashboard can see its sessions. Then{' '}
                            <strong>stop treating a not-yet-propagated flag eval as an access denial</strong>, and have
                            the overview loader fail the individual tile rather than throwing to the scene error
                            boundary. Two open pull requests are already reworking that loader's error handling, so new
                            work should stay on the backend gating and leave those files alone.
                        </>,
                    ],
                },
            ],
            reviewers: [
                {
                    name: "Paul D'Ambra",
                    githubLogin: 'pauldambra',
                    commits: [
                        {
                            sha: '30bcca5',
                            url: 'https://github.com/PostHog/posthog/commit/30bcca5c8fe4e6ef53e6981204c722b3f2b5e8d0',
                        },
                        {
                            sha: 'acfeb19',
                            url: 'https://github.com/PostHog/posthog/commit/acfeb1904b77f3c820ae2e12a1a82712a5b37b46',
                        },
                        {
                            sha: '5e90103',
                            url: 'https://github.com/PostHog/posthog/commit/5e901039705419d3841ab89d0f2532059dd5bd0c',
                        },
                    ],
                    reason: (
                        <>
                            Introduced <Code>validate_mcp_analytics_access</Code>, whose first branch raises{' '}
                            <Code>UserAccessControlError</Code> when the <Code>mcp-analytics</Code> flag evaluates false
                            server-side – still a live failure path when the eval fails or hasn't propagated. Also
                            authored the session-selection button behind the reported dead click.
                        </>
                    ),
                },
                {
                    name: 'Reece Jones',
                    githubLogin: 'reecejones',
                    commits: [
                        {
                            sha: '06830fd',
                            url: 'https://github.com/PostHog/posthog/commit/06830fd80993a7aba0be6d7b68f79c3a5724eeba',
                        },
                    ],
                    reason: (
                        <>
                            Added the RBAC assertion to the query runners and registered <Code>mcp_analytics</Code> in{' '}
                            <Code>ACCESS_CONTROL_RESOURCES</Code>. This is now the live mechanism by which one colleague
                            can see MCP analytics and another cannot – it replaced the beta email allow-list as the
                            differing-access cause, and it's the layer any fix has to address.
                        </>
                    ),
                },
                {
                    name: 'Samuel Pennington',
                    githubLogin: 'sampennington',
                    commits: [
                        {
                            sha: '632567f',
                            url: 'https://github.com/PostHog/posthog/commit/632567f7384d6084202de66f118ba896041753de',
                        },
                    ],
                    reason: (
                        <>
                            Set <Code>PostHogFeatureFlagPermission</Code> on the MCP analytics viewsets – the
                            sessions-list gate that 403s a non-enabled user. That gate is still flag-only and was never
                            moved onto the RBAC model, which is exactly why it and the query runners can now disagree.
                        </>
                    ),
                },
            ],
            evidence: [
                {
                    id: 'mcp-vision',
                    source: 'replay_vision',
                    title: 'A full-page crash on entry to the dashboard',
                    body: (
                        <>
                            A recording shows someone enable MCP Analytics in settings, open the dashboard, and hit an
                            access-control error, then explore its dashboards, sessions, and tool-quality metrics – with
                            one dead click when trying to select a session. The view failed as a whole-scene error
                            rather than a single unavailable tile, with a scout configuration panel stuck mid-load
                            behind it.
                        </>
                    ),
                    tags: [
                        {
                            label: 'Failure',
                            tone: 'red',
                            tooltip: 'The vision scanner classified this segment as an outright failure, not friction.',
                        },
                    ],
                    verified: true,
                    codePaths: [
                        'products/mcp_analytics/frontend/mcpDashboardOverviewLogic.ts',
                        'products/mcp_analytics/frontend/MCPAnalyticsDashboardOverview.tsx',
                        'products/mcp_analytics/backend/hogql_queries/base.py',
                        'frontend/src/layout/ErrorBoundary/ErrorBoundary.tsx',
                        'products/mcp_analytics/frontend/MCPAnalyticsScene.tsx',
                    ],
                },
                {
                    id: 'mcp-ticket',
                    source: 'zendesk',
                    title: "One colleague can see the product, another can't",
                    body: (
                        <>
                            A support ticket from someone who couldn't compute insights or see sessions while a
                            colleague on the same team could. At the time the flag was an email allow-list, which
                            explained it – but the allow-list is gone and the asymmetry isn't, which is what pointed at
                            a second, independent gate.
                        </>
                    ),
                    tags: [
                        {
                            label: 'Pending',
                            tone: 'orange',
                            dot: true,
                            tooltip: 'The ticket is still open at the time this report was last updated.',
                        },
                    ],
                    codePaths: [
                        'products/mcp_analytics/backend/presentation/views.py',
                        'posthog/rbac/user_access_control.py',
                        'posthog/permissions.py',
                    ],
                },
                {
                    id: 'mcp-denials',
                    source: 'session_replay',
                    title: 'Denials continue after the flag went to 100%',
                    body: (
                        <>
                            Queried <Code>query access control error</Code> events: they still fire every day – 42 on
                            one day, 15 the next, between 1 and 42 a day across a month – and they carried on{' '}
                            <em>after</em> the flag opened to everyone. That's what rules out the flag as the remaining
                            cause and points at the RBAC gate added later.
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
                        'products/mcp_analytics/backend/hogql_queries/harness_breakdown.py',
                        'products/mcp_analytics/frontend/sessions/mcpSessionsLogic.ts',
                    ],
                },
            ],
        },
    },

    // 2 — Report 019f24a4. Seven customer sessions across seven projects in four weeks.
    {
        id: 'replay-drilldowns',
        commitType: 'fix',
        scope: 'replay',
        title: 'Repair broken filters on drill-downs into recordings',
        summary:
            "Users clicking through to session recordings from Web analytics rows or an insight's persons modal land on an empty or endlessly-loading replay list even when the thing they clicked says recordings exist.",
        priority: 'P2',
        signalCount: 8,
        timeAgo: 'Updated a day ago',
        origin: { kind: 'signal', product: 'replay_vision' },
        detail: {
            status: 'Actionable',
            firstSeen: 'Jul 2, 2026',
            lastUpdated: 'Jul 30, 2026',
            branch: 'posthog-code/web-analytics-replay-path-cleaning',
            contributingSources: ['replay_vision', 'session_replay'],
            summary: [
                {
                    paragraphs: [
                        <>
                            Users clicking through to session recordings from Web analytics rows or an insight's persons
                            modal land on an empty or endlessly-loading replay list even when the thing they clicked
                            says recordings exist.
                        </>,
                    ],
                },
                {
                    heading: 'Problem',
                    paragraphs: [
                        <>
                            Three separate defects break the same drill-down. First, the cross-sell button{' '}
                            <strong>
                                always emits an event-scoped <Code>$pathname</Code> filter with{' '}
                                <Code>PropertyOperator.Exact</Code>
                            </strong>
                            : when path cleaning is on, the row shows a cleaned value but the backend matches literally
                            against the raw stored path, so nothing matches. <Code>webAnalyticsLogic.tsx</Code> already
                            rewrites these to <Code>IsCleanedPathExact</Code> for dashboard filters, but the button
                            never got that treatment – and <Code>WebAnalyticsTile.tsx</Code>{' '}
                            <strong>forwards the web analytics date range verbatim</strong> with no clamping to
                            recording retention, so a range predating retention forces a guaranteed-empty list plus a
                            misleading ad-blocker warning.
                        </>,
                        <>
                            Second, when the filter is the high-traffic root path, the events subquery runs a{' '}
                            <strong>DISTINCT-session_id scan capped at 1,000,000 rows</strong>, which hung one session
                            for <strong>100+ seconds</strong> on a blank screen before the user gave up.
                        </>,
                        <>
                            Third, and separate from web analytics entirely: the persons-modal path emits a{' '}
                            <Code>session_ids</Code>-only filter with no date range, and the playlist logic then quietly
                            substitutes the <Code>-3d</Code> default. In one signal the two recordings the user picked
                            were <strong>only about 3.4 days old</strong>, just outside that window, so an explicit
                            session-ID lookup returned nothing.
                        </>,
                    ],
                },
                {
                    heading: 'Impact',
                    paragraphs: [
                        <>
                            This quietly{' '}
                            <strong>blocks the drill-down from aggregate numbers into watching real sessions</strong>,
                            on two of the most discoverable, high-intent paths in the product. Confirmed across{' '}
                            <strong>
                                seven independent customer sessions in seven distinct projects over four weeks
                            </strong>
                            : users hit either the "No matching recordings" empty state with a retention warning or a
                            100+ second white-screen load, then bounced. It's a contained papercut with a manual
                            workaround, not a core-flow break, but it wastes the moment where someone is most motivated
                            to watch a recording.
                        </>,
                    ],
                },
                {
                    heading: 'Solution',
                    paragraphs: [
                        <>
                            Mirror what the dashboard filters already do: use{' '}
                            <strong>
                                <Code>IsCleanedPathExact</Code> for path-type keys when path cleaning is enabled
                            </strong>{' '}
                            instead of always <Code>Exact</Code>, and handle URL-encoded pathname values so they still
                            match. Guard the forwarded date range so a range that predates recording retention doesn't
                            silently produce an empty list, and surface the forwarded test-account and property filters
                            so the narrowing is visible. In the persons-modal path,{' '}
                            <strong>
                                skip the <Code>-3d</Code> default whenever <Code>session_ids</Code> are present
                            </strong>{' '}
                            – an explicit ID lookup shouldn't be date-bounded at all.
                        </>,
                    ],
                },
            ],
            reviewers: [
                {
                    name: 'Rafael Audibert',
                    githubLogin: 'rafaeelaudibert',
                    commits: [
                        {
                            sha: '6e9a6ee',
                            url: 'https://github.com/PostHog/posthog/commit/6e9a6ee8b668d41f4c049b96e2d654c787416d84',
                        },
                    ],
                    reason: (
                        <>
                            The cross-sell cell in <Code>WebAnalyticsTile.tsx</Code> forwards the web analytics date
                            range verbatim into the replay button with no clamping against recording retention. A 90-day
                            range therefore reaches replay unchanged even though recordings for most plans expire well
                            before 90 days – the concrete reason the list is empty while the table shows visitors.
                        </>
                    ),
                },
                {
                    name: 'Kim Dugan',
                    githubLogin: 'ksvat',
                    commits: [
                        {
                            sha: '83035c5',
                            url: 'https://github.com/PostHog/posthog/commit/83035c5bd3a103652f29eb86d3cc9bf439db5769',
                        },
                        {
                            sha: '61c82ff',
                            url: 'https://github.com/PostHog/posthog/commit/61c82ff2828dc76cfd7de005f89bff6de063f95d',
                        },
                        {
                            sha: 'f1ce606',
                            url: 'https://github.com/PostHog/posthog/commit/f1ce606dde9c9e9b36b3e5e8d8599290ad6f1ab2',
                        },
                    ],
                    reason: (
                        <>
                            Created the replay cross-sell flow that builds recording filters from web analytics rows,
                            with no fallback or explanatory state when zero recordings match. Also authored the events
                            subquery whose million-row DISTINCT scan is the mechanism behind the 100+ second spinner,
                            and the <Code>session_ids</Code> short-circuit in the persons modal.
                        </>
                    ),
                },
                {
                    name: 'Lucas Ricoy',
                    githubLogin: 'lricoy',
                    commits: [
                        {
                            sha: '52663cb',
                            url: 'https://github.com/PostHog/posthog/commit/52663cbf06d1f7286be889abca8ff7238c4ae5df',
                        },
                    ],
                    reason: (
                        <>
                            Added forwarding of the web analytics properties and <Code>filter_test_accounts</Code> into
                            the replay button. Replay defaults test-account filtering to off, so this forwarding narrows
                            the recordings population in a way the user never chose on the replay page.
                        </>
                    ),
                },
            ],
            evidence: [
                {
                    id: 'drill-empty-list',
                    source: 'session_replay',
                    title: 'Recording list loads empty from a Web analytics row',
                    body: (
                        <>
                            From the Web analytics dashboard, the user tried to view recordings for a specific path. The
                            recording list loaded empty, and they went on clicking inactive player elements before
                            giving up.
                        </>
                    ),
                    tags: [
                        {
                            label: 'Confusion',
                            tone: 'orange',
                            tooltip: 'The segment was classified as the user being confused rather than blocked.',
                        },
                    ],
                    codePaths: [
                        'frontend/src/scenes/web-analytics/CrossSellButtons/ReplayButton.tsx',
                        'frontend/src/scenes/web-analytics/tiles/WebAnalyticsTile.tsx',
                        'posthog/session_recordings/queries/sub_queries/events_subquery.py',
                    ],
                },
                {
                    id: 'drill-scanner',
                    source: 'replay_vision',
                    title: 'Dozens of visitors in the table, no recordings on the drill-down',
                    body: (
                        <>
                            Clicking the "View recordings" icon for a specific path navigates to an empty session replay
                            list, even though the analytics table shows dozens of visitors for that path in the selected
                            range. The page shows "No matching recordings" and warns that recordings might be outside
                            the retention period, blocking the drill-down into the sessions behind the number the user
                            was looking at.
                        </>
                    ),
                    tags: [
                        {
                            label: 'Bug',
                            tone: 'red',
                            tooltip: 'The vision scanner rated this a bug at 85% confidence.',
                        },
                    ],
                    verified: true,
                    codePaths: [
                        'frontend/src/scenes/trends/persons-modal/personsModalLogic.ts',
                        'frontend/src/scenes/session-recordings/playlist/sessionRecordingsPlaylistLogic.ts',
                    ],
                },
            ],
        },
    },

    // 3 — Report 019effdb. The agent disproved its own first diagnosis and stopped.
    {
        id: 'trends-refresh',
        commitType: 'fix',
        scope: 'insights',
        title: 'Trends editor empty/error chart until manual refresh',
        summary:
            'Users editing trend insights sometimes land on an empty chart or a 500 error that only clears after a manual Refresh, seen across at least 3 sessions in 3 different projects.',
        priority: 'P2',
        signalCount: 3,
        timeAgo: 'Updated 24 days ago',
        origin: { kind: 'signal', product: 'replay_vision' },
        detail: {
            status: 'Needs input',
            firstSeen: 'Jun 25, 2026',
            lastUpdated: 'Jul 7, 2026',
            branch: 'posthog-code/trends-editor-refresh',
            contributingSources: ['replay_vision', 'session_replay'],
            summary: [
                {
                    paragraphs: [
                        <>
                            Users editing trend insights sometimes land on an empty chart or a 500 error that only
                            clears after a manual Refresh, seen across at least 3 sessions in 3 different projects.
                        </>,
                    ],
                },
                {
                    heading: 'Problem',
                    paragraphs: [
                        <>
                            Three session-replay observations show the trends insight editor failing right after a
                            config change and forcing a manual reload. The original diagnosis blamed a{' '}
                            <strong>stale-cache short-circuit</strong> in <Code>dataNodeLogic</Code> on breakdown/date
                            edits, but on closer inspection that doesn't hold in the new-insight editor:{' '}
                            <Code>props.cachedResults</Code> is undefined there, so both short-circuits are gated off
                            and <Code>loadData</Code> always runs, and the server hashes the full query, so a breakdown
                            edit is a <strong>cache miss that recomputes fresh</strong>. One signal is a different,
                            concrete failure: a genuine <strong>transient Internal Server Error</strong> on an expensive
                            multi-breakdown query, surfaced through <Code>InsightErrorState</Code>, whose own code
                            comment says it's built for intermittent errors that complete on retry.
                        </>,
                    ],
                },
                {
                    heading: 'Impact',
                    paragraphs: [
                        <>
                            This lives in the <strong>core product-analytics editing flow</strong>, which is high
                            traffic. Evidence is 3 individual sessions across 3 projects, and there's a real workaround
                            (hit Refresh). The aggregate blast radius isn't quantifiable from here – the recordings and
                            error events for those projects were cross-region and unreachable from this environment – so
                            this reads as recurring, annoying friction rather than a confirmed broken flow.
                        </>,
                    ],
                },
                {
                    heading: 'Solution',
                    paragraphs: [
                        <>
                            Don't ship the originally-proposed fix blindly: it would be a{' '}
                            <strong>no-op in the editor</strong> and just add redundant recomputes. Instead, a human
                            with insight-editor access should confirm the true cause first – candidates are{' '}
                            <strong>expensive multi-breakdown queries timing out or OOMing in ClickHouse</strong>, an
                            aborted-query race, or genuinely-empty data for the chosen breakdown and date window. If
                            it's query cost, the real fix is optimizing that path or adding smarter auto-retry so users
                            don't have to click Refresh.
                        </>,
                    ],
                },
            ],
            reviewers: [
                {
                    name: 'Georgiy Tarasov',
                    githubLogin: 'skoob13',
                    commits: [
                        {
                            sha: '7a3e849',
                            url: 'https://github.com/PostHog/posthog/commit/7a3e849521e55a860cfc1adbb10e244817221b0c',
                        },
                    ],
                    reason: (
                        <>
                            Introduced multi-column breakdown query construction in trends. A two-property breakdown
                            combined with <Code>unique_session</Code> aggregation greatly expands the query's cost,
                            making ClickHouse timeouts and memory errors – surfaced as a 500 – far more likely than a
                            single breakdown.
                        </>
                    ),
                },
                {
                    name: 'Robbie Coomber',
                    githubLogin: 'robbie-c',
                    commits: [
                        {
                            sha: '6e1338c',
                            url: 'https://github.com/PostHog/posthog/commit/6e1338ccc699ea8c3ff7c5ab60ea2256a168273f',
                        },
                    ],
                    reason: (
                        <>
                            Reworked the <Code>loadData</Code> error handling that captures the backend 500 and drives
                            the reducers feeding <Code>InsightErrorState</Code> – the component the user actually sees
                            when this fails.
                        </>
                    ),
                },
                {
                    name: 'Tim Glaser',
                    githubLogin: 'timgl',
                    commits: [
                        {
                            sha: '9dcabab',
                            url: 'https://github.com/PostHog/posthog/commit/9dcababa93e07c69fa9dbbbca0aa38a299d99547',
                        },
                        {
                            sha: 'ef7abcc',
                            url: 'https://github.com/PostHog/posthog/commit/ef7abcc9ad9affd3e07396a8bf56b9d82bac1cff',
                        },
                    ],
                    reason: (
                        <>
                            Introduced the refresh-type distinction and the cached-results short-circuit that lets a
                            stale or empty cached response be served without a fresh server query – the mechanism the
                            first diagnosis blamed, and the one this investigation ruled out for the new-insight editor.
                        </>
                    ),
                },
            ],
            evidence: [
                {
                    id: 'trends-scanner',
                    source: 'replay_vision',
                    title: 'Reload clicked twice before the chart populates',
                    body: (
                        <>
                            After adding a breakdown to a trend insight, the chart area shows a "nothing matching query
                            results" message and a Reload button. The user clicks it twice before the chart eventually
                            populates – a failure to handle the initial loading state gracefully, or a query timeout
                            that needs manual intervention.
                        </>
                    ),
                    tags: [
                        {
                            label: 'UX friction',
                            tone: 'yellow',
                            tooltip: 'The vision scanner rated this UX friction at 80% confidence.',
                        },
                    ],
                    codePaths: [
                        'frontend/src/queries/nodes/DataNode/dataNodeLogic.ts',
                        'frontend/src/scenes/insights/InsightErrorState.tsx',
                        'posthog/hogql_queries/insights/trends/breakdown.py',
                    ],
                },
            ],
        },
    },
    /*
     * 4 — the one scout-authored report here. Worth keeping one: a scout goes looking on a
     * schedule instead of waiting for something to break, so it finds gaps that no
     * exception, recording, or support ticket would ever surface. This one noticed a
     * shipped feature that forgot to emit an analytics event – nothing is broken for
     * anyone, which is exactly why no signal source would have caught it.
     */
    {
        id: 'catalog-instrumentation',
        commitType: 'feat',
        scope: 'data-catalog',
        title: 'Instrument warehouse join deletion',
        summary:
            'The new Data Catalog join deletion flow ships without an analytics event, so joins can be removed without anything measuring it.',
        priority: 'P3',
        signalCount: 3,
        timeAgo: 'Updated Jul 31',
        origin: { kind: 'scout', scout: 'Instrumentation gaps' },
        detail: {
            status: 'Needs input',
            firstSeen: 'Jul 31, 2026',
            lastUpdated: 'Jul 31, 2026',
            contributingSources: ['signals_scout'],
            summary: [
                {
                    paragraphs: [
                        <>
                            The Data Catalog's warehouse-join deletion flow is not product-instrumented: the delete
                            succeeds without a capture, and no matching event exists in the live vocabulary.
                        </>,
                    ],
                },
                {
                    heading: 'Problem',
                    paragraphs: [
                        <>
                            <Code>relationshipsLogic.tsx</Code> deletes a join through <Code>deleteWithUndo</Code> and
                            then stops – there's no <Code>posthog.capture</Code> on that path. The shared join modal
                            already captures <Code>join created</Code> and <Code>join updated</Code>, so the codebase
                            has a settled idiom for this; deletion is simply the one that didn't get it.
                        </>,
                    ],
                },
                {
                    heading: 'Impact',
                    paragraphs: [
                        <>
                            Nothing is broken for anyone – this is a measurement gap, not a defect. The cost is that
                            warehouse-join cleanup can't be measured at all, so there's no way to see whether people
                            build joins and keep them, or build them and immediately undo them.
                        </>,
                    ],
                },
                {
                    heading: 'Why it needs input',
                    paragraphs: [
                        <>
                            The change itself is a few lines, but the event name and its properties are a contract that
                            outlives the patch. The agent stopped rather than guess a schema: the Data Catalog owner
                            should confirm the shape before anyone writes it.
                        </>,
                    ],
                },
            ],
            reviewers: [
                {
                    name: 'Thiago Salvatore',
                    githubLogin: 'thiagosalvatore',
                    reason: (
                        <>
                            Authored the merged commit that added the Relationships-tab join management flow, which is
                            where the uninstrumented delete action lives.
                        </>
                    ),
                },
            ],
            evidence: [
                {
                    id: 'scout-code',
                    source: 'signals_scout',
                    title: 'The delete path has no capture',
                    body: (
                        <>
                            The user-facing Delete action landed in commit <Code>c0b14ee2</Code> and calls{' '}
                            <Code>deleteWithUndo</Code> against the warehouse view-link endpoint. Searched that path for{' '}
                            <Code>posthog.capture</Code>, <Code>report_user_action</Code>, and the other capture helpers
                            used in this repo – none of them appear.
                        </>
                    ),
                    tags: [
                        {
                            label: 'Verified',
                            tone: 'green',
                            tooltip: 'Checked against the merged commit, not inferred from the feature description.',
                        },
                    ],
                    verified: true,
                    codePaths: [
                        'products/data_catalog/frontend/relationshipsLogic.tsx',
                        'frontend/src/scenes/data-warehouse/viewLinkLogic.tsx',
                    ],
                },
                {
                    id: 'scout-vocabulary',
                    source: 'signals_scout',
                    title: 'No deletion event in the live vocabulary',
                    body: (
                        <>
                            Searched the event schema for <Code>join deleted</Code> and its near-synonyms. It carries{' '}
                            <Code>join created</Code>, <Code>join updated</Code>, and two data-catalog relationship
                            events, but nothing for deletion – confirming the gap from the data side as well as the code
                            side.
                        </>
                    ),
                    tags: [{ label: 'Verified', tone: 'green' }],
                    verified: true,
                    codePaths: ['products/data_catalog/frontend/relationshipsLogic.tsx'],
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
/**
 * The item's source product, as the API would report it: a scout report's product is
 * `signals_scout`, not whatever area the scout happened to be looking at. Filtering and
 * the Source menu both go through this so a scout item can't slip out of either.
 */
export const sourceKeyOf = (item: InboxItem): SourceKey =>
    item.origin.kind === 'scout' ? 'signals_scout' : item.origin.product

export const originMeta = (item: InboxItem): OriginMeta => {
    if (item.origin.kind === 'scout') {
        // Scouts are their own source product, so the chrome comes from signals_scout.
        const scout = SOURCE_META.signals_scout
        return { Icon: scout.Icon, color: scout.color, primary: scout.label, secondary: item.origin.scout }
    }
    const source = SOURCE_META[item.origin.product]
    return { Icon: source.Icon, color: source.color, primary: source.label }
}

/**
 * Evidence sources, which include support tools the six signal products don't cover.
 * `groupLabel` lets the meta row say "Support" where the card says "Zendesk".
 */
export const EVIDENCE_SOURCE_META: Record<EvidenceSource, SourceMeta & { groupLabel?: string }> = {
    ...SOURCE_META,
    zendesk: { ...SOURCE_META.zendesk, groupLabel: 'Support' },
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
