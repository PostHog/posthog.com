import React from 'react'
import { IconWarning, IconRewindPlay, IconEye, IconList, IconCompass, IconSparkles } from '@posthog/icons'
import type { SelfDrivingStoryStep } from 'components/SelfDrivingStory'

/**
 * Data for the /ship-with-posthog inbox replica: six pull requests, one per tool,
 * each with the Scout/Signal/Investigate/PR/Merge walkthrough behind it.
 *
 * Items 1–3 are real reports that produced real PRs on the public repo (the PR
 * link is genuine). Items 4–6 are illustrative – Logs, Traces, and AI
 * observability are too new to have shipped their own self-driving PRs, so they
 * carry no PR link and their copy is placeholder (marked TODO(use-cases)).
 * The Traces item reuses the exact N+1 checkout copy from /traces.
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
    /** Minutes since the report was created – drives "Newest"/"Oldest" sort and the row timestamp. */
    createdMinutesAgo: number
    /** Minutes since last activity – drives "Last updated first" sort. */
    updatedMinutesAgo: number
    origin: Origin
    /** Real merged/open PR on the public repo, when the item is real. */
    prUrl?: string
    prNumber?: number
    steps: SelfDrivingStoryStep[]
}

// Placeholder screenshot labels, so the content pass knows what image each slot wants.
const ph = {
    source: (source: string) => `Screenshot: ${source} in PostHog`,
    signal: 'Screenshot: the report in your Inbox',
    investigate: 'Screenshot: the agent tracing the root cause',
    pr: 'Screenshot: the GitHub pull request',
    merge: 'Screenshot: the merged pull request',
}

export const INBOX_ITEMS: InboxItem[] = [
    // 1 — Error tracking (real: PostHog/posthog#70470)
    {
        id: 'error-tracking',
        commitType: 'fix',
        scope: 'hogql',
        title: 'guard visitor recursion depth instead of raising RecursionError',
        summary: 'Deeply nested queries hit Python’s recursion limit and 500 instead of returning a clean query error.',
        priority: 'P1',
        signalCount: 12,
        createdMinutesAgo: 120,
        updatedMinutesAgo: 50,
        origin: { kind: 'signal', product: 'error_tracking' },
        prUrl: 'https://github.com/PostHog/posthog/pull/70470',
        prNumber: 70470,
        steps: [
            {
                // TODO(use-cases): confirm against the real report behind PostHog/posthog#70470
                label: 'Source',
                copy: 'Error tracking watches every exception your app throws and groups them into issues with a running count. It’s a continuous pipeline, not a scheduled check – the moment an issue spikes, that’s a signal.',
                imagePlaceholder: ph.source('Error tracking'),
            },
            {
                // TODO(use-cases)
                copy: 'A deeply nested query starts raising RecursionError for a cluster of users, and the issue climbs to the top of the list. Error tracking files it as a report.',
                imagePlaceholder: ph.signal,
            },
            {
                // TODO(use-cases)
                copy: 'The agent reads the stack trace, reproduces the query, and finds the visitor walking the syntax tree with no depth guard – deep queries blow the recursion limit instead of failing cleanly.',
                imagePlaceholder: ph.investigate,
            },
            {
                // TODO(use-cases)
                copy: 'The agent adds an explicit depth guard that raises a clear query error, opens a pull request, and includes a regression test built from the failing query.',
                imagePlaceholder: ph.pr,
            },
            {
                // TODO(use-cases)
                copy: 'You read the diff in your Inbox, see the test, and hit merge. The next deep query returns a message instead of a crash.',
                imagePlaceholder: ph.merge,
            },
        ],
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
        createdMinutesAgo: 300,
        updatedMinutesAgo: 300,
        origin: { kind: 'signal', product: 'session_replay' },
        prUrl: 'https://github.com/PostHog/posthog/pull/60829',
        prNumber: 60829,
        steps: [
            {
                // TODO(use-cases): confirm against the real report behind PostHog/posthog#60829
                label: 'Source',
                copy: 'Session replay records real sessions – every click, scroll, and stall – and flags friction like rage clicks and dead clicks as it goes. The stream never stops, so a new pattern surfaces the moment it happens.',
                imagePlaceholder: ph.source('Session replay'),
            },
            {
                // TODO(use-cases)
                copy: 'A run of sessions dead-ends on the SDK doctor screen after a chunk fails to load. Replay clusters the sessions and files a report.',
                imagePlaceholder: ph.signal,
            },
            {
                // TODO(use-cases)
                copy: 'The agent watches the recordings, sees the blank screen after a failed dynamic import, and traces it to a chunk load error that was swallowed instead of surfaced.',
                imagePlaceholder: ph.investigate,
            },
            {
                // TODO(use-cases)
                copy: 'The agent catches the chunk load failure, surfaces the underlying API error to the user, and opens a pull request with the fix.',
                imagePlaceholder: ph.pr,
            },
            {
                // TODO(use-cases)
                copy: 'You watch one of the linked sessions, confirm the dead end, and merge.',
                imagePlaceholder: ph.merge,
            },
        ],
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
        createdMinutesAgo: 1440,
        updatedMinutesAgo: 600,
        origin: { kind: 'signal', product: 'replay_vision' },
        prUrl: 'https://github.com/PostHog/posthog/pull/72007',
        prNumber: 72007,
        steps: [
            {
                // TODO(use-cases): confirm against the real report behind PostHog/posthog#72007
                label: 'Source',
                copy: 'Replay Vision runs a vision model over your recordings and describes what it sees – UI that’s broken, confusing, or off. It’s a continuous pass over new sessions, not a scheduled sweep.',
                imagePlaceholder: ph.source('Replay Vision'),
            },
            {
                // TODO(use-cases)
                copy: 'Vision flags a cluster of sessions where the cohort name field shows a validation error even after a valid name is typed. It files a report with the frames attached.',
                imagePlaceholder: ph.signal,
            },
            {
                // TODO(use-cases)
                copy: 'The agent lines up the flagged frames with the form code and finds the validation state isn’t re-synced on create or save, so a stale error sticks around.',
                imagePlaceholder: ph.investigate,
            },
            {
                // TODO(use-cases)
                copy: 'The agent syncs the validation state on both create and save, opens a pull request, and links the frames that showed the stale error.',
                imagePlaceholder: ph.pr,
            },
            {
                // TODO(use-cases)
                copy: 'You skim the before-and-after frames in the report and merge. This one actually shipped.',
                imagePlaceholder: ph.merge,
            },
        ],
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
        createdMinutesAgo: 180,
        updatedMinutesAgo: 10,
        origin: { kind: 'signal', product: 'logs' },
        steps: [
            {
                // TODO(use-cases)
                label: 'Source',
                copy: 'Logs stream in from every service and stay queryable in real time. A pattern in the noise – a line repeating far more than it should – becomes a signal without anyone tailing the file.',
                imagePlaceholder: ph.source('Logs'),
            },
            {
                // TODO(use-cases)
                copy: 'A worker logs the same webhook delivery failure thousands of times an hour, retrying an endpoint that’s been dead for a day. The spike files a report.',
                imagePlaceholder: ph.signal,
            },
            {
                // TODO(use-cases)
                copy: 'The agent reads the log context, finds the retry loop with no backoff and no give-up, and confirms the target has returned 410 since yesterday.',
                imagePlaceholder: ph.investigate,
            },
            {
                // TODO(use-cases)
                copy: 'The agent adds capped exponential backoff and a dead-letter after a fixed number of attempts, then opens a pull request.',
                imagePlaceholder: ph.pr,
            },
            {
                // TODO(use-cases)
                copy: 'You check the log volume in the report, agree it’s noise, and merge.',
                imagePlaceholder: ph.merge,
            },
        ],
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
        createdMinutesAgo: 360,
        updatedMinutesAgo: 200,
        origin: { kind: 'scout', product: 'traces', scout: 'APM' },
        steps: [
            {
                copy: 'Turn on the APM scout. It watches latency and request volume per service, on a schedule, and files any regression as a report.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Scout_troop_Mock_b59fadf110.png',
            },
            {
                copy: 'Latency on GET /api/checkout starts climbing. The scout catches it and files a report. Nobody had to notice first.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Post_Hog_Inbox_Mock_6485bb0963.png',
            },
            {
                copy: 'The agent pulls the slow traces, lines them up against the fast ones, and finds the span they share: the inventory service firing one DB query per cart item. Classic N+1.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Report_Investigate_Mock_2_76290ef07e.png',
            },
            {
                copy: 'The agent fixes the exact query it located and opens a pull request, wired up with the instrumentation to measure whether it worked.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Git_Hub_PR_Mock_1_8c4240dc83.png',
            },
            {
                copy: 'You review the diff in your Inbox and hit merge. Nothing ships until you do.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Git_Hub_PR_Merged_Mock_1_5b9cf8f4b5.png',
            },
        ],
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
        createdMinutesAgo: 30,
        updatedMinutesAgo: 15,
        origin: { kind: 'scout', product: 'ai_observability', scout: 'Evals' },
        steps: [
            {
                // TODO(use-cases)
                copy: 'A scout is a scheduled agent that explores your data and files what it finds. The eval scout runs your evals against real assistant traces on a schedule and reports the failures worth acting on.',
                imagePlaceholder: ph.source('AI observability'),
            },
            {
                // TODO(use-cases)
                copy: 'The grounding eval starts failing on a cluster of chats where the assistant cites a 30-day refund policy that doesn’t exist. The scout files a report.',
                imagePlaceholder: ph.signal,
            },
            {
                // TODO(use-cases)
                copy: 'The agent reads the failing traces, finds the model inventing a policy when the docs are silent, and pins it to a prompt that invites a confident guess.',
                imagePlaceholder: ph.investigate,
            },
            {
                // TODO(use-cases)
                copy: 'The agent tightens the prompt to answer from retrieved docs only and abstain otherwise, adds an eval case for the refund question, and opens a pull request.',
                imagePlaceholder: ph.pr,
            },
            {
                // TODO(use-cases)
                copy: 'You read the new eval case, agree it should never happen, and merge.',
                imagePlaceholder: ph.merge,
            },
        ],
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

// Resolves how an item's origin renders on the row and in the reading pane: a source
// product's icon + name for signal sources, or a compass + "Scout · <category>" for scouts.
export const originMeta = (item: InboxItem): OriginMeta => {
    const source = SOURCE_META[item.origin.product]
    if (item.origin.kind === 'scout') {
        return { Icon: IconCompass, color: source.color, primary: 'Scout', secondary: item.origin.scout }
    }
    return { Icon: source.Icon, color: source.color, primary: source.label }
}

// Short relative timestamp, e.g. "30m ago" / "2h ago" / "1d ago".
export const formatAgo = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
}

// ---- Sort ----
// The four sort choices the real Inbox offers (there is no signal-count sort).
export type SortValue = 'priority' | 'updated' | 'newest' | 'oldest'
export const SORT_OPTIONS: { value: SortValue; label: string }[] = [
    { value: 'priority', label: 'Priority first' },
    { value: 'updated', label: 'Last updated first' },
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
]
export const DEFAULT_SORT: SortValue = 'priority'

const PRIORITY_RANK: Record<Priority, number> = { P0: 0, P1: 1, P2: 2, P3: 3, P4: 4 }

// ---- Priority filter ----
// All five priorities are shown (as in the real Inbox), with the meaning label and
// the accent-dot color the app uses for the filter rows.
export const PRIORITY_OPTIONS: Priority[] = ['P0', 'P1', 'P2', 'P3', 'P4']
export const PRIORITY_MEANING: Record<Priority, { label: string; dot: string }> = {
    P0: { label: 'Critical', dot: '#e5484d' },
    P1: { label: 'High', dot: '#f76b15' },
    P2: { label: 'Medium', dot: '#ffc53d' },
    P3: { label: 'Low', dot: '#3b9eff' },
    P4: { label: 'Minimal', dot: '#8f8f8f' },
}

// ---- Source filter (with nested scouts) ----
// The distinct signal-source products and scouts present in the data, preserving
// item order – the Source popover lists sources, then scouts under a "Scout" group.
export const SIGNAL_SOURCES: SourceKey[] = INBOX_ITEMS.reduce<SourceKey[]>((acc, item) => {
    if (item.origin.kind === 'signal' && !acc.includes(item.origin.product)) acc.push(item.origin.product)
    return acc
}, [])
export const SCOUTS: string[] = INBOX_ITEMS.reduce<string[]>((acc, item) => {
    if (item.origin.kind === 'scout' && !acc.includes(item.origin.scout)) acc.push(item.origin.scout)
    return acc
}, [])

export interface InboxFilters {
    sort: SortValue
    sources: SourceKey[]
    scouts: string[]
    priorities: Priority[]
}

export const EMPTY_FILTERS: InboxFilters = { sort: DEFAULT_SORT, sources: [], scouts: [], priorities: [] }

// True when any narrowing filter is active (sort is excluded, matching the app's hasActiveFilters).
export const hasActiveFilters = (f: InboxFilters): boolean =>
    f.sources.length > 0 || f.scouts.length > 0 || f.priorities.length > 0

// Apply the filters, then order by the chosen sort. Priority sort puts P0 first and
// breaks ties by most-recent activity, mirroring the app's priority+recency ordering.
export const selectItems = (f: InboxFilters): InboxItem[] => {
    const narrowing = f.sources.length > 0 || f.scouts.length > 0
    const filtered = INBOX_ITEMS.filter((item) => {
        if (f.priorities.length && !f.priorities.includes(item.priority)) return false
        if (narrowing) {
            if (item.origin.kind === 'signal') return f.sources.includes(item.origin.product)
            return f.scouts.includes(item.origin.scout)
        }
        return true
    })

    const sorted = [...filtered]
    sorted.sort((a, b) => {
        switch (f.sort) {
            case 'updated':
                return a.updatedMinutesAgo - b.updatedMinutesAgo
            case 'newest':
                return a.createdMinutesAgo - b.createdMinutesAgo
            case 'oldest':
                return b.createdMinutesAgo - a.createdMinutesAgo
            case 'priority':
            default:
                return (
                    PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority] || a.updatedMinutesAgo - b.updatedMinutesAgo
                )
        }
    })
    return sorted
}
