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
}

export interface EvidenceItem {
    id: string
    source: EvidenceSource
    /** Sub-label after the source name, e.g. "Problem segment", "Ticket", "Issue". */
    kind: string
    title: string
    body: React.ReactNode
    tag: EvidenceTag
    /** Renders a "View replay" button. Inert – it's chrome, there's no recording. */
    hasReplay?: boolean
    /** Footer line: a session or issue id, plus replay timings when there are any. */
    footer?: { id: string; timing?: string }
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
        // Matches the six evidence findings below, so the row and the detail agree.
        signalCount: 6,
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
                            Users lose their work when they save an insight while its breakdown is still loading.{' '}
                            <strong>412 people hit this in the last 30 days</strong>, and the save looks like it
                            succeeded – the edits are gone and the old query is still on screen.
                        </>,
                    ],
                },
                {
                    heading: 'Problem',
                    paragraphs: [
                        <>
                            It's a race, and everything traces back to one function. <Code>saveInsight()</Code> in{' '}
                            <Code>frontend/src/scenes/insights/insightLogic.ts</Code> reads <Code>values.filters</Code>{' '}
                            at line <Code>612</Code>, <strong>after</strong> it awaits the in-flight query. If a
                            breakdown refresh resolves during that await, <Code>loadResultsSuccess</Code> has already
                            swapped <Code>filters</Code> for the server's copy, so the PATCH is built from an object
                            that never contained the user's edits.
                        </>,
                        <>
                            The window is small but it's hit constantly, because changing a breakdown is what triggers
                            both the refresh and the urge to save. The resulting <Code>TypeError</Code> is caught by the
                            insight scene's error boundary, so <strong>nothing surfaces to the user</strong> – no toast,
                            no inline error. The save button simply goes quiet, which is why this sat for a month.
                        </>,
                    ],
                },
                {
                    heading: 'Impact',
                    paragraphs: [
                        <>
                            1,204 exceptions from 412 users over 30 days, all on <Code>PATCH /api/insight</Code>. The
                            replays are consistent: someone edits a breakdown, hits save, sees nothing happen, and tries
                            again. Three sessions show the same person re-applying an identical breakdown three times
                            before leaving the page.
                        </>,
                        <>
                            One support ticket has been open since the 12th describing it as "my insight keeps reverting
                            when I save it", which nobody had connected to the exception until now.
                        </>,
                    ],
                },
                {
                    heading: 'Solution',
                    paragraphs: [
                        <>
                            Capture the filters <strong>before</strong> the await instead of reading them after it, so
                            the PATCH is built from what the user actually had on screen. The added regression test
                            resolves a breakdown refresh mid-save and asserts the edits survive.
                        </>,
                        <>
                            One thing to hand to a human rather than fix here: the error boundary swallowing this
                            silently is its own bug. Worth a follow-up, but it isn't this change.
                        </>,
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
                            Authored the <Code>loadResultsSuccess</Code> reducer that replaces <Code>filters</Code> with
                            the server response – the write that makes the race possible. Still unchanged on master.
                        </>
                    ),
                },
                {
                    name: 'Michael Matloka',
                    commits: ['c81ae55'],
                    reason: (
                        <>
                            Moved <Code>saveInsight()</Code> to an async flow, which introduced the await that{' '}
                            <Code>values.filters</Code> is now read across. The line ordering at <Code>612</Code> dates
                            from that change.
                        </>
                    ),
                },
            ],
            evidence: [
                {
                    id: 'exception',
                    source: 'error_tracking',
                    kind: 'Issue',
                    title: "TypeError: Cannot read properties of undefined (reading 'breakdown')",
                    body: (
                        <>
                            Thrown from <Code>saveInsight()</Code> at <Code>insightLogic.ts:612</Code>. 1,204
                            occurrences across 412 users in 30 days, every one of them inside a save.
                        </>
                    ),
                    tag: { label: 'Blocking exception', tone: 'red' },
                    footer: { id: 'a1f2c9de' },
                },
                {
                    id: 'replay-confusion',
                    source: 'session_replay',
                    kind: 'Problem segment',
                    title: 'Re-applied the same breakdown three times',
                    body: 'Edited the breakdown, saved, and watched the chart stay on the old query. Re-applied the identical breakdown twice more, then left without the insight ever saving.',
                    tag: { label: 'Confusion', tone: 'orange' },
                    hasReplay: true,
                    footer: { id: '019f2198–1…', timing: '02:35 — 27:03 · 4m 32s active / 32m 4s total' },
                },
                {
                    id: 'replay-rage',
                    source: 'session_replay',
                    kind: 'Rage click',
                    title: 'Nine clicks on Save in four seconds',
                    body: 'The save button gives no feedback when the PATCH fails, so the click reads as unregistered. Rage clicks on this button are up 6× on the 30-day mean.',
                    tag: { label: 'Friction', tone: 'orange' },
                    hasReplay: true,
                    footer: { id: 'pPy33qMuuL…', timing: '01:31 — 02:17 · 2m 24s active / 2m 37s total' },
                },
                {
                    id: 'ticket',
                    source: 'zendesk',
                    kind: 'Ticket',
                    title: 'My insight keeps reverting when I save it',
                    body: 'Open since the 12th. "Every time I change the breakdown and save, it goes back to what it was before. No error, it just doesn\'t take." Nobody had linked it to the exception.',
                    tag: { label: 'Pending', tone: 'yellow', dot: true },
                    footer: { id: '#61622' },
                },
                {
                    id: 'api-error',
                    source: 'error_tracking',
                    kind: 'Issue',
                    title: '400 Bad Request on PATCH /api/insight',
                    body: (
                        <>
                            The correlated server-side rejection: the request body arrives without{' '}
                            <Code>filters.breakdown</Code>, so validation fails. Rises and falls with the{' '}
                            <Code>TypeError</Code> above.
                        </>
                    ),
                    tag: { label: 'Blocking exception', tone: 'red' },
                    footer: { id: 'c7d0e41b' },
                },
                {
                    id: 'replay-stale',
                    source: 'session_replay',
                    kind: 'Problem segment',
                    title: 'Saved insight reloaded with the previous breakdown',
                    body: 'Reloaded the page to check whether the save had worked. It had not – the insight came back with the breakdown from before the edit.',
                    tag: { label: 'Confusion', tone: 'orange' },
                    hasReplay: true,
                    footer: { id: 't4HQhDQzqM…', timing: '03:57 — 08:51 · 4m 57s active / 14m 8s total' },
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
