import React from 'react'
import { IconWarning, IconRewindPlay, IconEye, IconList, IconCompass, IconSparkles, IconSupport } from '@posthog/icons'
import { Code } from './prose'

/**
 * Data for the /ship-with-posthog inbox replica: six pull requests, one per tool,
 * each opening into a replica of the app's report → pull request detail view.
 *
 * Item 1 is the fully authored one – it carries the whole detail payload (prose
 * summary, CI checks, suggested reviewers, evidence, and a diff) and is the
 * reference for what a finished item looks like. Items 2–6 carry a short summary
 * only, so they render header + summary and skip the panels they have no data for.
 *
 * Items 2 and 3 link real PRs on the public repo. Every other PR number, commit
 * SHA, and reviewer rationale on this page is illustrative – see the note on
 * `Reviewer` before adding more.
 */

export type SourceKey = 'error_tracking' | 'session_replay' | 'replay_vision' | 'logs' | 'traces' | 'ai_observability'

interface SourceMeta {
    label: string
    Icon: React.ComponentType<{ className?: string }>
    /** Icon tint on the row meta line. Literal classes so Tailwind JIT keeps them. */
    color: string
}

// Icon + tint per source product, mirroring the app's sourceProductIcons.
export const SOURCE_META: Record<SourceKey, SourceMeta> = {
    error_tracking: { label: 'Error tracking', Icon: IconWarning, color: 'text-red' },
    session_replay: { label: 'Session replay', Icon: IconRewindPlay, color: 'text-orange' },
    replay_vision: { label: 'Replay Vision', Icon: IconEye, color: 'text-orange' },
    logs: { label: 'Logs', Icon: IconList, color: 'text-secondary' },
    traces: { label: 'Traces', Icon: IconCompass, color: 'text-blue' },
    ai_observability: { label: 'AI observability', Icon: IconSparkles, color: 'text-purple' },
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

/** Evidence reaches beyond the six signal products – support tools feed it too. */
export type EvidenceSource = SourceKey | 'zendesk'

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
    /** Sub-label after the source name, e.g. "Problem segment", "Ticket", "Issue". */
    kind: string
    /** Shares a line with the source, and truncates – keep it short. */
    title: string
    body: React.ReactNode
    /** Usually one; a scanner finding pairs its verdict with a confidence score. */
    tags: EvidenceTag[]
    /** Renders a "View replay" button. Inert – it's chrome, there's no recording. */
    hasReplay?: boolean
    /**
     * Footer line: a session or issue id, replay timings when there are any, and an
     * optional link label ("View issue", "Open ticket").
     */
    footer?: { id: string; timing?: string; link?: string }
}

/**
 * A suggested reviewer. `name` is matched against the real team directory at build
 * time so the avatar and profile link are genuine.
 *
 * The commit SHAs and the rationale are illustrative – written to demonstrate the
 * shape of a blame-based suggestion, not derived from anyone's actual commits.
 * Keep it that way, or make it real; don't let it read as real while being invented.
 */
export interface Reviewer {
    name: string
    /** Short SHAs the blame walk landed on. Display only. */
    commits: string[]
    /** Why the agent suggested them, naming what it blamed. */
    reason: React.ReactNode
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
    /** Authored relative strings – nothing here is computed from a real clock. */
    firstSeen: string
    lastUpdated: string
    /** Branch chip in the tab strip. */
    branch: string
    /** Drives the meta row's source cluster, e.g. "Support + 2". */
    contributingSources: EvidenceSource[]
    summary: ProseSection[]
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

export const INBOX_ITEMS: InboxItem[] = [
    // 1 — Error tracking. The fully authored item: this is the one that opens into a
    // complete detail view, and the reference for what a finished report looks like.
    {
        id: 'error-tracking',
        commitType: 'fix',
        scope: 'insights',
        title: 'keep unsaved edits when a breakdown refresh lands mid-save',
        summary:
            'Saving an insight while its breakdown is still refreshing throws away the edits and leaves the old query on screen.',
        priority: 'P1',
        // Matches the four evidence findings below, so the row and the detail agree.
        signalCount: 4,
        timeAgo: '2h ago',
        origin: { kind: 'signal', product: 'error_tracking' },
        // Illustrative: there's no public PR to link, so the header offers the repo instead.
        prNumber: 71284,
        detail: {
            status: 'Actionable',
            firstSeen: 'a month ago',
            lastUpdated: '3 hours ago',
            branch: 'posthog-code/fix-insight-save-race',
            contributingSources: ['zendesk', 'error_tracking', 'session_replay'],
            summary: [
                {
                    paragraphs: [
                        <>
                            Saving an insight while its breakdown is still loading throws the edits away.{' '}
                            <strong>412 people hit this in 30 days</strong>, and the save looks like it worked.
                        </>,
                    ],
                },
                {
                    heading: 'Problem',
                    paragraphs: [
                        <>
                            <Code>saveInsight()</Code> reads <Code>values.filters</Code> at{' '}
                            <Code>insightLogic.ts:612</Code>, <strong>after</strong> awaiting the query. If a refresh
                            lands during that await, the PATCH is built from the server's copy instead of the user's.
                        </>,
                        <>
                            The <Code>TypeError</Code> is swallowed by the error boundary, so nothing surfaces. The save
                            button just goes quiet, which is why this sat for a month.
                        </>,
                    ],
                },
                {
                    heading: 'Solution',
                    paragraphs: [
                        <>
                            Snapshot the filters <strong>before</strong> the await, and add a regression test that
                            resolves a refresh mid-save.
                        </>,
                        <>One for a human, not this change: the error boundary hiding this is its own bug.</>,
                    ],
                },
            ],
            ci: {
                successful: 93,
                skipped: 80,
                checks: [
                    { name: 'Frontend tests', status: 'success' },
                    { name: 'ESLint', status: 'success' },
                    { name: 'TypeScript', status: 'success' },
                    { name: 'Visual regression', status: 'skipped' },
                ],
            },
            reviewers: [
                {
                    name: "Paul D'Ambra",
                    commits: ['a3f91c2', '7e0b4d8'],
                    reason: (
                        <>
                            Authored the <Code>loadResultsSuccess</Code> reducer that overwrites <Code>filters</Code> –
                            the write that makes the race possible.
                        </>
                    ),
                },
                {
                    name: 'Michael Matloka',
                    commits: ['c81ae55'],
                    reason: (
                        <>
                            Moved <Code>saveInsight()</Code> to an async flow, adding the await that line{' '}
                            <Code>612</Code> now reads across.
                        </>
                    ),
                },
            ],
            evidence: [
                {
                    id: 'exception',
                    source: 'error_tracking',
                    kind: 'Issue',
                    title: "TypeError: undefined 'breakdown'",
                    body: (
                        <>
                            Thrown from <Code>saveInsight()</Code>. 1,204 times, 412 users, always inside a save.
                        </>
                    ),
                    tags: [
                        {
                            label: 'Blocking exception',
                            tone: 'red',
                            tooltip: 'Stops the thing the person was trying to do, rather than degrading it.',
                        },
                    ],
                    footer: { id: 'a1f2c9de', link: 'View issue' },
                },
                {
                    id: 'replay-confusion',
                    source: 'session_replay',
                    kind: 'Problem segment',
                    title: 'Re-applied the same breakdown three times',
                    body: 'Saved, watched the chart stay on the old query, and tried the identical breakdown twice more before leaving.',
                    tags: [
                        {
                            label: 'Confusion',
                            tone: 'orange',
                            tooltip:
                                'Repeating an action that already succeeded is how a silent failure looks from outside.',
                        },
                    ],
                    hasReplay: true,
                    footer: { id: '019f2198–1…', timing: '02:35 — 27:03 · 4m 32s active' },
                },
                {
                    id: 'vision',
                    source: 'replay_vision',
                    kind: 'Scanner finding',
                    title: 'Save button gives no feedback',
                    body: 'Nine clicks on Save in four seconds, with no toast, spinner, or inline error in response to any of them.',
                    tags: [
                        { label: 'Bug', tone: 'red', tooltip: 'The scanner classified what it watched as a defect.' },
                        {
                            label: '90% confidence',
                            tone: 'blue',
                            tooltip: 'How sure the vision model is. Low-confidence findings stay out of reports.',
                        },
                    ],
                    hasReplay: true,
                    footer: { id: 'tuZvEiDGjp…', timing: '05:44 — 05:53 · 27m 48s active' },
                },
                {
                    id: 'ticket',
                    source: 'zendesk',
                    kind: 'Ticket',
                    title: 'My insight keeps reverting when I save it',
                    body: '"I change the breakdown and save, and it goes back. No error, it just doesn\'t take." Nobody had linked it to the exception.',
                    tags: [
                        {
                            label: 'Pending',
                            tone: 'yellow',
                            dot: true,
                            tooltip: 'Still open with support. Merging this is what lets them close it.',
                        },
                    ],
                    footer: { id: '#61622', link: 'Open ticket' },
                },
            ],
            files: [
                {
                    path: 'frontend/src/scenes/insights/insightLogic.ts',
                    added: 31,
                    removed: 3,
                    hunk: '@@ -604,7 +604,20 @@',
                    lines: [
                        { kind: 'context', text: '    saveInsight: async ({ redirectToViewMode }) => {' },
                        { kind: 'context', text: '        const insightNumericId = values.insight.id' },
                        {
                            kind: 'add',
                            text: '        // Snapshot the filters before awaiting: a breakdown refresh can land',
                        },
                        {
                            kind: 'add',
                            text: '        // mid-save and replace values.filters with the server copy.',
                        },
                        { kind: 'add', text: '        const editedFilters = { ...values.filters }' },
                        { kind: 'context', text: '' },
                        { kind: 'context', text: '        await breakpoint(300)' },
                        { kind: 'context', text: '' },
                        { kind: 'remove', text: '        const savedInsight = await api.update(endpoint, {' },
                        { kind: 'remove', text: '            ...values.insight,' },
                        { kind: 'remove', text: '            filters: values.filters,' },
                        { kind: 'add', text: '        const savedInsight = await api.update(endpoint, {' },
                        { kind: 'add', text: '            ...values.insight,' },
                        { kind: 'add', text: '            filters: editedFilters,' },
                        { kind: 'context', text: '            derived_name: values.derivedName,' },
                        { kind: 'context', text: '        })' },
                    ],
                },
                {
                    path: 'frontend/src/scenes/insights/insightLogic.test.ts',
                    added: 67,
                    removed: 0,
                    hunk: '@@ -1287,3 +1287,70 @@',
                    lines: [
                        { kind: 'context', text: "    describe('saveInsight', () => {" },
                        {
                            kind: 'add',
                            text: "        it('keeps edits when a refresh resolves mid-save', async () => {",
                        },
                        { kind: 'add', text: "            logic.actions.setFilters({ breakdown: '$browser' })" },
                        { kind: 'add', text: '            const save = logic.actions.saveInsight()' },
                        { kind: 'add', text: '            logic.actions.loadResultsSuccess(serverInsight)' },
                        { kind: 'add', text: '            await save' },
                        { kind: 'add', text: '' },
                        {
                            kind: 'add',
                            text: '            expect(api.update).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({',
                        },
                        {
                            kind: 'add',
                            text: "                filters: expect.objectContaining({ breakdown: '$browser' }),",
                        },
                        { kind: 'add', text: '            }))' },
                        { kind: 'add', text: '        })' },
                    ],
                },
            ],
        },
    },
    // 2 — Session replay (real: PostHog/posthog#60829)
    {
        id: 'session-replay',
        commitType: 'fix',
        scope: 'sdk-doctor',
        title: 'handle chunk load failures and surface API errors',
        summary: 'A failed chunk load left users staring at a blank SDK doctor screen with no error to act on.',
        priority: 'P2',
        signalCount: 8,
        timeAgo: '5h ago',
        origin: { kind: 'signal', product: 'session_replay' },
        prUrl: 'https://github.com/PostHog/posthog/pull/60829',
        prNumber: 60829,
        // TODO(use-cases): only the summary is authored. Add evidence, reviewers, CI, and
        // a diff to bring this up to item 1's fidelity.
        detail: {
            status: 'Actionable',
            firstSeen: '3 weeks ago',
            lastUpdated: '5 hours ago',
            branch: 'posthog-code/sdk-doctor-chunk-load',
            contributingSources: ['session_replay'],
            summary: [
                {
                    paragraphs: [
                        <>
                            A run of sessions dead-ends on the SDK doctor screen after a chunk fails to load. Replay
                            clustered the sessions and filed a report.
                        </>,
                    ],
                },
                {
                    heading: 'Problem',
                    paragraphs: [
                        <>
                            The recordings show a blank screen after a failed dynamic import. The chunk load error was
                            swallowed rather than surfaced, so there was nothing on screen to act on.
                        </>,
                    ],
                },
                {
                    heading: 'Solution',
                    paragraphs: [
                        <>
                            Catch the chunk load failure and surface the underlying API error to the user instead of
                            rendering an empty state.
                        </>,
                    ],
                },
            ],
        },
    },
    // 3 — Replay Vision (real, merged: PostHog/posthog#72007)
    {
        id: 'replay-vision',
        commitType: 'fix',
        scope: 'cohorts',
        title: 'sync cohort name validation state on create/save',
        summary: 'The cohort name field kept showing a validation error after a valid name was entered.',
        priority: 'P2',
        signalCount: 6,
        timeAgo: '1d ago',
        origin: { kind: 'signal', product: 'replay_vision' },
        prUrl: 'https://github.com/PostHog/posthog/pull/72007',
        prNumber: 72007,
        // TODO(use-cases): summary only – see the note on item 2.
        detail: {
            status: 'Actionable',
            firstSeen: '2 weeks ago',
            lastUpdated: 'a day ago',
            branch: 'posthog-code/cohort-name-validation-sync',
            contributingSources: ['replay_vision'],
            summary: [
                {
                    paragraphs: [
                        <>
                            Replay Vision flagged a cluster of sessions where the cohort name field shows a validation
                            error even after a valid name is typed, and filed a report with the frames attached.
                        </>,
                    ],
                },
                {
                    heading: 'Problem',
                    paragraphs: [
                        <>
                            Lining the flagged frames up against the form code shows the validation state isn't
                            re-synced on create or save, so a stale error sticks around after the input is already
                            valid.
                        </>,
                    ],
                },
                {
                    heading: 'Solution',
                    paragraphs: [
                        <>
                            Sync the validation state on both create and save. This one shipped – the linked frames show
                            the before and after.
                        </>,
                    ],
                },
            ],
        },
    },
    // 4 — Logs (illustrative, no PR link)
    {
        id: 'logs',
        commitType: 'fix',
        scope: 'worker',
        title: 'stop the retry loop hammering a dead webhook',
        summary: 'A worker retried a webhook that’s been returning 410 for a day, thousands of times an hour.',
        priority: 'P2',
        signalCount: 31,
        timeAgo: '3h ago',
        origin: { kind: 'signal', product: 'logs' },
        // TODO(use-cases): summary only – see the note on item 2.
        detail: {
            status: 'Actionable',
            firstSeen: '4 days ago',
            lastUpdated: '3 hours ago',
            branch: 'posthog-code/webhook-retry-backoff',
            contributingSources: ['logs'],
            summary: [
                {
                    paragraphs: [
                        <>
                            A worker logged the same webhook delivery failure thousands of times an hour, retrying an
                            endpoint that had been dead for a day. The spike filed a report.
                        </>,
                    ],
                },
                {
                    heading: 'Problem',
                    paragraphs: [
                        <>
                            The retry loop has no backoff and no give-up, and the target has returned{' '}
                            <Code>410 Gone</Code> since yesterday. Every attempt fails identically and immediately
                            retries.
                        </>,
                    ],
                },
                {
                    heading: 'Solution',
                    paragraphs: [
                        <>
                            Add capped exponential backoff, and dead-letter the delivery after a fixed number of
                            attempts.
                        </>,
                    ],
                },
            ],
        },
    },
    // 5 — Traces (illustrative, no PR link) — reuses the exact /traces N+1 checkout copy
    {
        id: 'traces',
        commitType: 'fix',
        scope: 'checkout',
        title: 'batch the inventory lookups behind /api/checkout',
        summary: 'Checkout latency crept up as the inventory service fired one query per cart item.',
        priority: 'P2',
        signalCount: 9,
        timeAgo: '6h ago',
        origin: { kind: 'scout', product: 'traces', scout: 'APM' },
        // TODO(use-cases): summary only – see the note on item 2. Copy mirrors /traces.
        detail: {
            status: 'Actionable',
            firstSeen: '9 days ago',
            lastUpdated: '6 hours ago',
            branch: 'posthog-code/batch-inventory-lookups',
            contributingSources: ['traces'],
            summary: [
                {
                    paragraphs: [
                        <>
                            Latency on <Code>GET /api/checkout</Code> started climbing. The APM scout caught it on a
                            scheduled pass and filed a report. Nobody had to notice first.
                        </>,
                    ],
                },
                {
                    heading: 'Problem',
                    paragraphs: [
                        <>
                            Lining the slow traces up against the fast ones isolates the span they share: the inventory
                            service firing one database query per cart item. A classic N+1, so the latency scales with
                            basket size.
                        </>,
                    ],
                },
                {
                    heading: 'Solution',
                    paragraphs: [
                        <>
                            Batch the lookups into a single query, and keep the instrumentation that measures whether it
                            worked.
                        </>,
                    ],
                },
            ],
        },
    },
    // 6 — AI observability (illustrative, no PR link)
    {
        id: 'ai-observability',
        commitType: 'fix',
        scope: 'assistant',
        title: 'stop citing a refund policy we don’t have',
        summary: 'The assistant confidently cited a 30-day refund policy the product doesn’t offer.',
        priority: 'P2',
        signalCount: 5,
        timeAgo: '30m ago',
        origin: { kind: 'scout', product: 'ai_observability', scout: 'Evals' },
        // TODO(use-cases): summary only – see the note on item 2.
        detail: {
            status: 'Actionable',
            firstSeen: '5 days ago',
            lastUpdated: '30 minutes ago',
            branch: 'posthog-code/ground-refund-answers',
            contributingSources: ['ai_observability'],
            summary: [
                {
                    paragraphs: [
                        <>
                            The grounding eval started failing on a cluster of chats where the assistant cites a 30-day
                            refund policy that doesn't exist. The eval scout filed a report.
                        </>,
                    ],
                },
                {
                    heading: 'Problem',
                    paragraphs: [
                        <>
                            The failing traces show the model inventing a policy when the docs are silent, which pins it
                            to a prompt that invites a confident guess rather than an admission of ignorance.
                        </>,
                    ],
                },
                {
                    heading: 'Solution',
                    paragraphs: [
                        <>
                            Tighten the prompt to answer from retrieved docs only and abstain otherwise, and add an eval
                            case for the refund question so it can't regress.
                        </>,
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
 * The "−3 +98" on the tab strip, summed from the per-file whole-file totals rather
 * than stored, so the stat can't drift from the files listed under it.
 */
export const diffStat = (detail: ReportDetail): { added: number; removed: number } =>
    (detail.files ?? []).reduce(
        (acc, file) => ({ added: acc.added + file.added, removed: acc.removed + file.removed }),
        { added: 0, removed: 0 }
    )
