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
    IconToggle,
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
    | 'feature_flags'
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
    feature_flags: {
        label: 'Feature flags',
        // IconToggle and seagreen are what the rest of the site uses for this product.
        Icon: IconToggle,
        color: 'text-seagreen',
        found: 'A flag drifted. Stale, renamed, or evaluating off a cliff.',
    },
    signals_scout: {
        label: 'Scout',
        Icon: IconCompass,
        color: 'text-purple',
        found: 'A scout went looking on a schedule, without waiting for something to break.',
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
     * The Signal → Report → PR walkthrough for `SignalsToInbox`.
     * Optional for the same reason: only items with steps show up in the selector, so an
     * item added to the inbox never breaks that section by having nothing to narrate.
     */
    steps?: SelfDrivingStoryStep[]
    /**
     * Overrides the `SignalsToInbox` selector button label (default: "<source> · <scope>").
     * Display-only – the inbox row above still shows the item's real discovery channel.
     *
     * Two reasons an item sets this: its walkthrough narrates the product rather than the
     * one PR, so the disambiguating scope is noise ("Replay Vision"); or the default would
     * name the wrong product, because the report's discovery channel isn't what the story
     * is about ("Session replay" on a report Replay Vision found).
     */
    walkthroughLabel?: string
}

/*
 * Every walkthrough here now carries real screenshots, so the `ph` helper that supplied
 * placeholder labels is gone. The mechanism it fed remains: a step can still set
 * `imagePlaceholder` and `SelfDrivingStory` will render a labeled dashed box, with `image`
 * taking precedence once a real capture lands. Reach for it when authoring a new
 * walkthrough before its mocks exist – the strings it used were:
 *   signal      "Screenshot: the report in your Inbox"
 *   investigate "Screenshot: the agent tracing the root cause"
 *   pr / merge  "Screenshot: pull request #<n> on GitHub" / "Screenshot: #<n> merged"
 */

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
    // 1 — PostHog/posthog-js#4151. Found by error tracking.
    {
        /*
         * Report 019... on project 2, and the pull request it produced:
         * PostHog/posthog-js#4151, merged 2026-07-15.
         *
         * The GitHub half is verbatim from the public API (`/repos/PostHog/posthog-js/pulls/4151`,
         * `/reviews`, `/files`): title, branch, base, diff totals, file list, the approver, and the
         * hunk under Files changed. The report half is read from a capture of the report itself,
         * because project 2's API isn't reachable from here – see the note in README.md.
         *
         * This is the one item whose repo isn't `PostHog/posthog`. `repoOf()` parses it from
         * `prUrl`, so the row names posthog-js without anything else needing to know.
         */
        id: 'error-tracking',
        commitType: 'fix',
        // The report's own scope, which is `replay` – the PR that came out of it says `rrweb`.
        scope: 'replay',
        title: 'Guard rrweb native setter hooks against Illegal invocation',
        summary:
            'Users recording sessions hit a recurring TypeError inside the session recorder, degrading replay capture and filling error tracking with fresh fingerprints of the same bug.',
        /*
         * NOT VERIFIED. The report's priority isn't in the capture – the app shows the chip on the
         * Files-changed tab, and the capture is of Summary. P2 is inferred from the report's own
         * impact language: it degrades capture quality without being fatal to the host page. Worth
         * correcting against the report.
         */
        priority: 'P2',
        signalCount: 2,
        timeAgo: 'Merged Jul 15',
        origin: { kind: 'signal', product: 'error_tracking' },
        prUrl: 'https://github.com/PostHog/posthog-js/pull/4151',
        prNumber: 4151,
        // Product-level narration rather than this one PR, so the scope would be noise.
        walkthroughLabel: 'Error tracking',
        intro: "Error tracking turns exceptions into grouped, ranked issues. It's the loop's most direct route from signal to fix.",
        steps: [
            {
                stage: 'signal',
                copy: 'New exceptions, reopened issues, and volume spikes arrive as signals, grouped so that seven fingerprints of the same bug land as one report. A scout can keep closer watch on a single service or release.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_09_08_at_11_59_22_2x_bf6ec34f73.png',
            },
            {
                stage: 'investigate',
                label: 'Report',
                copy: "The agent walks the stack traces to the code they share, checks who's affected and since when, and writes it up with the issues attached.",
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_09_08_at_11_47_46_2x_bce5d16e66.png',
            },
            {
                stage: 'pr',
                copy: 'Error tracking hands the agent a stack trace, so it goes straight to a draft PR without waiting for a human decision. The PR lands in your Inbox next to the report that produced it, and merging it can close a whole family of grouped issues at once. Dismissing it works too, and the reason you give steers what error tracking surfaces after that.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_09_08_at_11_45_28_2x_52fe679c8a.png',
            },
        ],
        detail: {
            status: 'Actionable',
            /*
             * `firstSeen` is a real first-seen date the report quotes for one of the fingerprints in
             * its cluster; `lastUpdated` is the merge. Both from the sources named above.
             */
            firstSeen: 'Jul 9, 2026',
            lastUpdated: 'Jul 15, 2026',
            branch: 'posthog-code/rrweb-hooksetter-illegal-invocation',
            contributingSources: ['error_tracking'],
            // Real whole-PR totals from the GitHub API.
            stats: { added: 102, removed: 1, files: 3, commits: 2 },
            approvers: ['turnipdabeets'],
            summary: [
                {
                    paragraphs: [
                        <>
                            Users recording sessions hit a recurring <Code>TypeError: Illegal invocation</Code> thrown
                            inside the rrweb session recorder, degrading replay capture and polluting error tracking
                            with churning fingerprints.
                        </>,
                    ],
                },
                {
                    heading: 'Problem',
                    paragraphs: [
                        <>
                            rrweb's input observer calls <Code>hookSetter</Code> to redefine the native{' '}
                            <Code>value</Code> / <Code>checked</Code> / <Code>selectedIndex</Code> setters on the
                            input-element prototypes. The redefined setter then runs the original native setter plus a
                            deferred mock event handler that reads native accessors. When <Code>this</Code> is{' '}
                            <strong>not a genuine native element</strong> (a custom element, a cross-realm object, or a
                            proxy another library placed on the prototype chain), the native accessor rejects the call
                            with 'Illegal invocation'. That deferred call is unwrapped, so it propagates instead of
                            being swallowed.
                        </>,
                    ],
                },
                {
                    heading: 'Impact',
                    paragraphs: [
                        <>
                            This isn't isolated. Error tracking shows a cluster of sibling issues with identical name,
                            description, and source that keep spawning fresh fingerprints, with new ones still appearing
                            weeks after the first. It's non-fatal to the host page, but it degrades replay capture
                            quality and the churn pollutes error tracking.
                        </>,
                        <>
                            Because the fix ships in <Code>posthog-js</Code> and not in the app, it reaches every SDK
                            user instead of one project.
                        </>,
                    ],
                },
                {
                    heading: 'Solution',
                    paragraphs: [
                        <>
                            Wrap the <strong>deferred</strong> setter call in a <Code>try</Code>/<Code>catch</Code> so
                            an illegal <Code>this</Code> drops that one replay update instead of throwing.
                        </>,
                        <>
                            The synchronous call beside it is left deliberately unguarded: it runs inside the page's own
                            assignment, where the platform throws even for genuine elements. Setting a file input's{' '}
                            <Code>value</Code>, say. Swallowing there would turn real errors into silent no-ops and
                            change host-page behaviour.
                        </>,
                    ],
                },
            ],
            /*
             * No reviewers panel: the PR's approver is real and is on `approvers`, but the report's
             * own rationale for suggesting them isn't in the capture, and README.md's rule is to omit
             * a reviewer rather than dress one up.
             */
            evidence: [
                {
                    id: 'illegal-invocation-new-issue',
                    source: 'error_tracking',
                    title: 'New issue: TypeError: Illegal invocation',
                    body: (
                        <>
                            Error tracking opened this the first time the exception was seen, with frames inside the
                            bundled recorder and not in any application code. Re-worded from the finding: the stored
                            prose carries issue fingerprints and per-project counts.
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
                    codePaths: ['packages/rrweb/rrweb/src/utils.ts', 'packages/rrweb/rrweb/src/record/observer.ts'],
                },
                {
                    id: 'illegal-invocation-siblings',
                    source: 'error_tracking',
                    title: 'A cluster of sibling issues with the same source',
                    body: (
                        <>
                            Further issues arrived with an identical name, description, and source frame, each under its
                            own fingerprint. That's what turns one recorder bug into a stream of apparently separate
                            errors.
                        </>
                    ),
                    tags: [{ label: 'Grouped', tone: 'blue', tooltip: 'Separate signals describing one problem.' }],
                    codePaths: ['packages/rrweb/rrweb/src/utils.ts'],
                },
            ],
            /*
             * The real file list from `/pulls/4151/files`. The hunk below is the actual patch on
             * `utils.ts`, trimmed to the changed region.
             */
            files: [
                {
                    path: 'packages/rrweb/rrweb/src/utils.ts',
                    added: 12,
                    removed: 1,
                    hunk: '@@ -155,9 +155,20 @@',
                    lines: [
                        { kind: 'context', text: '          set(value) {' },
                        {
                            kind: 'context',
                            text: '            // put hooked setter into event loop to avoid of set latency',
                        },
                        { kind: 'context', text: '            setTimeout(() => {' },
                        { kind: 'remove', text: '              d.set!.call(this, value);' },
                        {
                            kind: 'add',
                            text: "              // the accessors read inside `d.set` throw 'Illegal invocation'",
                        },
                        {
                            kind: 'add',
                            text: '              // when `this` is not a genuine native element (e.g. a proxy);',
                        },
                        {
                            kind: 'add',
                            text: '              // the page cannot observe this deferred call, so drop the',
                        },
                        { kind: 'add', text: '              // update rather than throw' },
                        { kind: 'add', text: '              try {' },
                        { kind: 'add', text: '                d.set!.call(this, value);' },
                        { kind: 'add', text: '              } catch {' },
                        { kind: 'add', text: '                // noop' },
                        { kind: 'add', text: '              }' },
                        { kind: 'context', text: '            }, 0);' },
                        { kind: 'context', text: '            if (original && original.set) {' },
                        {
                            kind: 'add',
                            text: '              // deliberately unguarded: this runs synchronously inside the',
                        },
                        {
                            kind: 'add',
                            text: "              // page's own assignment, where the platform throws even for",
                        },
                        { kind: 'add', text: "              // genuine elements (e.g. setting a file input's value)" },
                        { kind: 'context', text: '              original.set.call(this, value);' },
                        { kind: 'context', text: '            }' },
                    ],
                },
                {
                    path: 'packages/rrweb/rrweb/test/util.test.ts',
                    added: 83,
                    removed: 0,
                    hunk: '@@ -100,6 +101,88 @@',
                    lines: [
                        { kind: 'context', text: '    });' },
                        { kind: 'context', text: '  });' },
                        { kind: 'context', text: '' },
                        { kind: 'add', text: "  describe('hookSetter()', () => {" },
                        {
                            kind: 'add',
                            text: "    it('should contain a failing deferred hooked setter and preserve the native throw', () => {",
                        },
                        { kind: 'add', text: '      vi.useFakeTimers();' },
                        { kind: 'add', text: '      try {' },
                        { kind: 'add', text: '        // emulates a native accessor rejecting a foreign `this`' },
                        { kind: 'add', text: '        const proto = {} as Record<string, unknown>;' },
                        { kind: 'add', text: "        Object.defineProperty(proto, 'value', {" },
                        { kind: 'add', text: '          configurable: true,' },
                        { kind: 'add', text: '          set() {' },
                        { kind: 'add', text: "            throw new TypeError('Illegal invocation');" },
                        { kind: 'add', text: '          },' },
                    ],
                },
            ],
        },
    },
    // 2 — PostHog/posthog#86244. Found by Replay Vision.
    {
        /*
         * The report Replay Vision's scanners filed, and the pull request it produced:
         * PostHog/posthog#86244, merged 2026-08-20.
         *
         * A good illustration of why these are grouped by discovery channel rather than by product.
         * The bug is in AI observability's summarisation path, but nothing in AI observability
         * noticed it – Replay Vision's scanners did, by watching people hit it in recordings. The
         * affected product only shows up in the commit scope.
         *
         * GitHub half verbatim from the public API (`/pulls/86244`, `/reviews`, `/files`). Report
         * half read from a capture of the report; project 2's API isn't reachable from here.
         */
        id: 'replay-vision',
        commitType: 'fix',
        scope: 'aio',
        title: "stop summarizing traces the formatters can't read",
        summary:
            'Trace summaries came back either confidently empty for a trace that clearly had content, or as a raw error code, so a paid feature was quietly describing the wrong thing.',
        /*
         * NOT VERIFIED. The capture is of the Summary tab, which doesn't show the priority chip.
         * P1 is inferred from the report's own impact language: it calls the silent case "a paid
         * feature actively lying about the data" and names two projects hit within hours. Worth
         * correcting against the report.
         */
        priority: 'P1',
        signalCount: 2,
        timeAgo: 'Merged Aug 20',
        origin: { kind: 'signal', product: 'replay_vision' },
        prUrl: 'https://github.com/PostHog/posthog/pull/86244',
        prNumber: 86244,
        // The scope would read "Replay Vision · aio", but this walkthrough narrates the product
        // rather than this one summarisation bug, so the button carries the product alone.
        walkthroughLabel: 'Replay Vision',
        intro: 'Replay Vision watches your recordings with vision models, so findings come from the footage itself.',
        steps: [
            {
                stage: 'signal',
                copy: 'Scanners watch recordings with vision models and flag frustration, dead ends, and bad outcomes. Repeat findings become reports, and writing a new scanner takes a prompt.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_09_08_at_13_49_13_2x_ee11a9ed21.png',
            },
            {
                stage: 'investigate',
                label: 'Report',
                copy: 'The agent pulls the flagged recordings and confirms what the scanner saw before touching code. Vision models can be wrong, and the report says so when they are. Confirmed findings get traced to the responsible component.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_09_08_at_13_04_05_2x_36403ed9ca.png',
            },
            {
                stage: 'pr',
                copy: 'Scanner findings get a human look before any code changes. When you confirm what it saw, the agent writes the fix and opens the PR. You review the diff with the clips beside it, and if the scanner misread the situation, Improve scanner takes your correction and adjusts what it looks for.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_09_08_at_13_03_39_2x_b50488f158.png',
            },
        ],
        detail: {
            status: 'Actionable',
            // `firstSeen` is the report's own generation date from the capture; `lastUpdated` is the merge.
            firstSeen: 'Aug 20, 2026',
            lastUpdated: 'Aug 20, 2026',
            branch: 'posthog-self-driving/fixaio-stop-summarizing-traces-the-39e624',
            contributingSources: ['replay_vision'],
            // Real whole-PR totals from the GitHub API.
            stats: { added: 256, removed: 56, files: 8, commits: 9 },
            /*
             * Only the human approver. The reviews endpoint also lists `stamphog[bot]` and
             * `posthog[bot]`, which are ours rather than a person's judgment.
             */
            approvers: ['carlos-marchal-ph'],
            summary: [
                {
                    paragraphs: [
                        <>
                            Users on the AI observability trace view were getting broken summaries. Either a confident{' '}
                            <strong>"empty input"</strong> summary of a trace that clearly has content, or a red toast
                            with a raw error code in it.
                        </>,
                    ],
                },
                {
                    heading: 'Problem',
                    paragraphs: [
                        <>
                            Once summarising moved to being done by id, the server built the text representation itself
                            and <strong>handed it to the model without ever checking it held content</strong>. Two
                            things fed it empty. The generation formatter read only the plain input and output
                            properties, while the span formatter, the trace formatter, and the frontend all fall back to
                            the <Code>_state</Code> variants, so a generation whose SDK wrote the state properties
                            renders in the UI but summarises as nothing.
                        </>,
                        <>
                            The formatters also <strong>crash outright on shapes they don't expect</strong>: one threw
                            an <Code>AttributeError</Code> on a string where it expected a mapping, and another threw a
                            formatting error, both thousands of times over.
                        </>,
                    ],
                },
                {
                    heading: 'Impact',
                    paragraphs: [
                        <>
                            Two different projects hit this within hours of each other, one silently wrong and one
                            loudly broken. The silent case is the worse of the two: a made-up summary of a populated
                            trace is a paid feature actively describing data that isn't there.
                        </>,
                    ],
                },
                {
                    heading: 'Solution',
                    paragraphs: [
                        <>
                            Add the <Code>_state</Code> fallback to the generation formatter so it matches what the
                            frontend and the span formatter already do, make the message formatters tolerate
                            string-shaped entries instead of raising, and stop handing the model a representation that
                            holds no content.
                        </>,
                    ],
                },
            ],
            /*
             * No reviewers panel: the approver is real and recorded above, but the report's own
             * rationale for suggesting them isn't in the capture, and README.md's rule is to omit a
             * reviewer rather than dress one up.
             */
            evidence: [
                {
                    id: 'scanner-empty-input-toast',
                    source: 'replay_vision',
                    title: 'Summarisation failed with an empty-input error, across multiple traces',
                    body: (
                        <>
                            A scanner watching the traces page saw the summary fail and surface a raw status code to the
                            user, on more than one trace, which is enough to read as recurring instead of a one-off.
                            Re-worded from the finding: the stored prose carries session ids.
                        </>
                    ),
                    tags: [
                        {
                            label: 'Scanner finding',
                            tone: 'yellow',
                            tooltip: 'A vision model watching the recording flagged this, not an exception.',
                        },
                    ],
                    codePaths: ['products/ai_observability/backend/api/summarization.py'],
                },
                {
                    id: 'scanner-empty-input-populated-trace',
                    source: 'replay_vision',
                    title: 'A populated conversation summarised as "empty input with no actions"',
                    body: (
                        <>
                            The other half of the bug, and the one nobody would have reported: the summary tab stated
                            the user had provided no content for a generation whose conversation history was plainly
                            there in the trace beside it.
                        </>
                    ),
                    tags: [
                        {
                            label: 'Scanner finding',
                            tone: 'yellow',
                            tooltip: 'A vision model watching the recording flagged this, not an exception.',
                        },
                    ],
                    codePaths: [
                        'products/ai_observability/backend/text_repr/formatters/message_formatter.py',
                        'products/ai_observability/frontend/summary-view/summaryViewLogic.ts',
                    ],
                },
            ],
            // Real file list and patch from `/pulls/86244/files`.
            files: [
                {
                    path: 'products/ai_observability/backend/text_repr/formatters/message_formatter.py',
                    added: 14,
                    removed: 5,
                    hunk: '@@ -218,17 +218,26 @@',
                    lines: [
                        { kind: 'remove', text: 'def format_tool_calls(tool_calls: list[ToolCall]) -> list[str]:' },
                        { kind: 'add', text: 'def format_tool_calls(tool_calls: list[Any]) -> list[str]:' },
                        { kind: 'context', text: '    lines: list[str] = []' },
                        { kind: 'context', text: '' },
                        { kind: 'context', text: '    for tc in tool_calls:' },
                        { kind: 'add', text: '        if not isinstance(tc, dict):' },
                        { kind: 'add', text: '            lines.append(f"  - {tc}")' },
                        { kind: 'add', text: '            continue' },
                        { kind: 'add', text: '' },
                        { kind: 'remove', text: '        if tc.get("function"):' },
                        { kind: 'remove', text: '            name = tc["function"].get("name", "unknown")' },
                        { kind: 'add', text: '        function = tc.get("function")' },
                        { kind: 'add', text: '        if isinstance(function, dict):' },
                        { kind: 'add', text: '            name = function.get("name", "unknown")' },
                        { kind: 'context', text: '        else:' },
                        { kind: 'context', text: '            name = tc.get("name", "unknown")' },
                    ],
                },
                {
                    path: 'products/ai_observability/backend/api/summarization.py',
                    added: 74,
                    removed: 12,
                    hunk: '@@ -33,7 +33,14 @@',
                    lines: [
                        { kind: 'context', text: 'from posthog.api.routing import TeamAndOrgViewSetMixin' },
                        {
                            kind: 'context',
                            text: 'from posthog.clickhouse.query_tagging import Feature, Product, tags_context',
                        },
                        { kind: 'context', text: 'from posthog.event_usage import report_user_action' },
                        {
                            kind: 'add',
                            text: 'from posthog.hogql_queries.ai.ai_table_resolver import AIEventsExpiredError, AIEventsUnavailableError, query_ai_events',
                        },
                        {
                            kind: 'context',
                            text: 'from posthog.hogql_queries.ai.trace_query_runner import TraceQueryRunner',
                        },
                        { kind: 'add', text: 'from posthog.hogql_queries.ai.utils import (' },
                        { kind: 'add', text: '    HEAVY_COLUMN_NAMES,' },
                        { kind: 'add', text: '    HEAVY_PROPERTY_NAMES,' },
                        { kind: 'add', text: '    merge_heavy_properties,' },
                    ],
                },
            ],
        },
    },
    // 3 — PostHog/posthog#90772. Found by a support conversation.
    {
        id: 'conversations',
        // A docs fix rather than a code fix – the report's own type and scope.
        commitType: 'docs',
        scope: 'llm-analytics',
        title: "Clarify batch exports don't include AI prompts/completions",
        summary:
            'Our own event definition promised batch exports carried AI prompts and completions. They never did, and two customers lost trace data before anyone noticed the docs were wrong.',
        priority: 'P2',
        signalCount: 2,
        timeAgo: 'Merged Sep 1',
        origin: { kind: 'signal', product: 'conversations' },
        prUrl: 'https://github.com/PostHog/posthog/pull/90772',
        prNumber: 90772,
        walkthroughLabel: 'Conversations',
        intro: 'Conversations reads your support threads, so a problem reaches the loop in the words the customer used to describe it.',
        steps: [
            {
                stage: 'signal',
                /*
                 * The same inbox capture the Error tracking walkthrough uses. It shows the list
                 * rather than any one report, so it suits whichever channel it sits under.
                 */
                copy: 'Support threads are read as they arrive, so a problem a customer described in their own words becomes a signal without anyone triaging it by hand. Repeat tickets about the same thing group into one report.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_09_08_at_13_49_13_2x_ee11a9ed21.png',
            },
            {
                stage: 'investigate',
                label: 'Report',
                copy: 'The agent reads the whole thread and checks the claim against the product instead of taking the ticket at face value, so the report says when the customer was right about the symptom and wrong about the cause, and names what it actually found.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_09_08_at_14_25_36_2x_260986ac3a.png',
            },
            {
                stage: 'pr',
                copy: 'A support-sourced report often needs a human call first, because the fix might be code, documentation, or simply a better answer. Once that call is made the agent opens the PR, and the reply back to the customer can point at it.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_09_08_at_13_31_26_2x_70675f0e6e.png',
            },
        ],
        detail: {
            status: 'Actionable',
            // Report generation date from the capture; `lastUpdated` is the merge.
            firstSeen: 'Aug 8, 2026',
            lastUpdated: 'Sep 1, 2026',
            branch: 'posthog-self-driving/fixllm-analytics-stop-telling-users-3ba44a',
            contributingSources: ['conversations'],
            // Real whole-PR totals from the GitHub API.
            stats: { added: 35, removed: 2, files: 2, commits: 4 },
            approvers: ['carlos-marchal-ph'],
            summary: [
                {
                    paragraphs: [
                        <>
                            Every LLM analytics user was told <Code>$ai_generation</Code> contains the input prompt and
                            output, but the events table they query and export has neither, and customers lost trace
                            data to that gap before anyone noticed.
                        </>,
                    ],
                },
                {
                    heading: 'Problem',
                    paragraphs: [
                        <>
                            Our own event definition said <Code>$ai_generation</Code> "contains the input prompt,
                            output, model used and costs". That is <strong>false for the events table</strong>:
                            ingestion deliberately strips the large AI properties from the events copy and keeps the
                            full event only in the AI events table. So someone reads the definition, sets up an export
                            of <Code>$ai_generation</Code>, watches it succeed, and gets metadata only.
                        </>,
                        <>
                            The public data-retention page contradicted itself the same way: it says the events table
                            never holds the large properties, then tells readers an export preserves raw prompts past
                            thirty days.
                        </>,
                    ],
                },
                {
                    heading: 'Impact',
                    paragraphs: [
                        <>
                            The failure is silent and then irreversible. The real rows expire on a thirty-day TTL, so by
                            the time the gap shows, the data it was supposed to preserve is already gone. Two separate
                            support threads two weeks apart hit this same trap.
                        </>,
                    ],
                },
                {
                    heading: 'Solution',
                    paragraphs: [
                        <>
                            Fix the copy in both taxonomy files to say the prompt and completion live on the AI events
                            table, name that table as the one to query, and correct the retention page. Copy only, with
                            no ingestion behaviour changes.
                        </>,
                    ],
                },
            ],
            /*
             * No reviewers panel: the approver is real and recorded above, but the report's rationale
             * for suggesting them isn't in the capture.
             */
            evidence: [
                {
                    id: 'ticket-export-missing-prompts',
                    source: 'conversations',
                    title: 'Support thread: trace data batch export missing prompts and completions',
                    body: (
                        <>
                            A customer set up a daily export filtered on the AI generation and trace events to keep LLM
                            data past retention. The exports ran successfully and carried metadata only. Support
                            confirmed the behaviour was correct and the documentation misleading, and escalated it.
                        </>
                    ),
                    tags: [
                        {
                            label: 'Ticket',
                            tone: 'orange',
                            tooltip: 'A support conversation, read as a signal instead of triaged by hand.',
                        },
                    ],
                    codePaths: [
                        'posthog/taxonomy/taxonomy.py',
                        'frontend/src/taxonomy/core-filter-definitions-by-group.json',
                    ],
                },
                {
                    id: 'ticket-export-second-report',
                    source: 'conversations',
                    title: 'A second thread, two weeks later, describing the same gap',
                    body: (
                        <>
                            The same misunderstanding arrived again from a different thread, which is what turned one
                            ticket into a documentation bug instead of a one-off answer.
                        </>
                    ),
                    tags: [{ label: 'Grouped', tone: 'blue', tooltip: 'Separate signals describing one problem.' }],
                },
            ],
            // Real file list and patch from `/pulls/90772/files`.
            files: [
                {
                    path: 'posthog/taxonomy/taxonomy.py',
                    added: 1,
                    removed: 1,
                    hunk: '@@ -250,1 +250,1 @@',
                    lines: [
                        {
                            kind: 'remove',
                            text: '        "description": "Contains the input prompt, output, model used and costs.",',
                        },
                        {
                            kind: 'add',
                            text: '        "description": "Contains the model used and costs. The input prompt and output are not on the events table - query posthog.ai_events for those.",',
                        },
                    ],
                },
            ],
        },
    },
    // 4 — PostHog/posthog#88073. Found by AI observability's own eval reports.
    {
        id: 'ai-observability',
        commitType: 'fix',
        scope: 'aio',
        title: 'guard eval report IDs by handled set, not UUID shape',
        summary:
            'Roughly one AI observability eval report in 45 shipped a dead identifier that nobody could click, because the guard meant to catch them only recognised one shape of ID.',
        priority: 'P1',
        signalCount: 1,
        timeAgo: 'Merged Aug 27',
        // The report's evidence is AI observability's own evaluation reports.
        origin: { kind: 'signal', product: 'ai_observability' },
        prUrl: 'https://github.com/PostHog/posthog/pull/88073',
        prNumber: 88073,
        /*
         * The report really was discovered by Conversations, with AI observability
         * confirming it – see `contributingSources` below – so the origin stays honest and
         * the button gets overridden instead. Without this it would read "Conversations · aio".
         */
        walkthroughLabel: 'AI observability',
        intro: 'AI observability watches your LLM features the way error tracking watches your code: every generation is a trace, and evals grade them.',
        steps: [
            {
                stage: 'signal',
                copy: 'Evals score your LLM traffic for correctness, cost and latency, and failing patterns become reports. The scout sweeps for the trends you have no eval written for yet.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_09_08_at_13_49_13_2x_ee11a9ed21.png',
            },
            {
                stage: 'investigate',
                label: 'Report',
                copy: 'The agent reads the failing traces against the passing ones and follows them back to the prompt, tool, or model call responsible. The report cites the failing traces, so you can read exactly what the model was asked and what it answered.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_09_08_at_13_36_55_2x_7e30697cdc.png',
            },
            {
                stage: 'pr',
                copy: 'Most AI bugs are prompt bugs, so the fix is often a diff in a prompt file. The agent opens it like any other PR, and you review it with the failing traces beside it. Once it is merged, the eval that caught the bug becomes the regression test that keeps it fixed.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_09_08_at_13_35_01_2x_29bb66b7f2.png',
            },
        ],
        detail: {
            status: 'Actionable',
            // Report generation date from the capture; `lastUpdated` is the merge.
            firstSeen: 'Aug 22, 2026',
            lastUpdated: 'Aug 27, 2026',
            branch: 'posthog-self-driving/fixaio-extend-the-eval-report-id-guard-f2063d',
            contributingSources: ['ai_observability'],
            // Real whole-PR totals from the GitHub API.
            stats: { added: 313, removed: 38, files: 5, commits: 8 },
            approvers: ['carlos-marchal-ph'],
            summary: [
                {
                    paragraphs: [
                        <>
                            The team reading AI observability eval reports still got dead identifiers in about one
                            report in 45. An id in backticks that looks clickable, isn't, and has to be copied and
                            searched by hand.
                        </>,
                    ],
                },
                {
                    heading: 'Problem',
                    paragraphs: [
                        <>
                            The agent is told to wrap ids in backticks so the renderer can link them, but the linker
                            only links ids that came through <Code>add_citation</Code>. An earlier fix added a preflight
                            check to catch the mismatch, and it worked. The catch is its regex, which{' '}
                            <strong>matches canonical UUIDs only</strong>. Opaque session ids are invisible to it and
                            are genuinely citable, so they shipped dead. Report titles had no guard at all.
                        </>,
                    ],
                },
                {
                    heading: 'Impact',
                    paragraphs: [
                        <>
                            This is internal pain, for the people who read these reports to chase regressions. Ten to
                            seventeen of 650 daily runs shipped a dead id, and the rate sat between one and three
                            percent every window since the first fix landed. It was a standing gap and not a decaying
                            one, and each dead id cost a reader a manual copy-paste-and-search.
                        </>,
                    ],
                },
                {
                    heading: 'Solution',
                    paragraphs: [
                        <>
                            Rekey the guard on <strong>the set of ids the session actually handled</strong> instead of
                            on the shape of the id, using the allowlists already held in state, and extend it to cover
                            the title. That's the same rule the evaluation grades on.
                        </>,
                    ],
                },
            ],
            /*
             * No reviewers panel: the approver is real and recorded above, but the report's rationale
             * for suggesting them isn't in the capture.
             */
            evidence: [
                {
                    id: 'eval-inline-ids-all-cited',
                    source: 'ai_observability',
                    title: 'Evaluation "inline IDs are all cited" started failing more often',
                    body: (
                        <>
                            The evaluation that checks every backticked identifier has a matching structured citation
                            saw its fail rate rise across a few hundred runs in a day. Failing sessions shared a
                            pattern: both canonical UUIDs and opaque strings appeared in report text with no matching
                            citation call, so they rendered as plain text instead of links.
                        </>
                    ),
                    tags: [
                        {
                            label: 'Evaluation report',
                            tone: 'blue',
                            tooltip: "AI observability grading its own agents' output, not an exception.",
                        },
                    ],
                    verified: true,
                    codePaths: [
                        'posthog/temporal/ai_observability/eval_reports/report_agent/tools.py',
                        'posthog/temporal/ai_observability/eval_reports/report_agent/prompts.py',
                    ],
                },
            ],
            // Real file list and patch from `/pulls/88073/files`.
            files: [
                {
                    path: 'posthog/temporal/ai_observability/eval_reports/report_agent/tools.py',
                    added: 83,
                    removed: 18,
                    hunk: '@@ -70,6 +70,12 @@',
                    lines: [
                        { kind: 'remove', text: '_BACKTICKED_UUID_RE = re.compile(' },
                        { kind: 'add', text: '# a backticked token is dead when the session never handled that id,' },
                        { kind: 'add', text: '# whatever shape the id happens to have' },
                        { kind: 'add', text: '_BACKTICKED_TOKEN_RE = re.compile(' },
                    ],
                },
            ],
        },
    },
    // 5 — PostHog/posthog#76517. Found by Session replay.
    {
        id: 'session-replay',
        commitType: 'fix',
        scope: 'dashboards',
        title: 'remove cursor pointer from non-interactive chart elements',
        summary:
            'Users clicked data points, table cells, and big-number tiles and got nothing back. Drill-down is silently disabled on formula charts, and the cursor still promised it would work.',
        priority: 'P2',
        signalCount: 3,
        timeAgo: 'Merged Aug 4',
        // The report's evidence is session-replay problem segments.
        origin: { kind: 'signal', product: 'session_replay' },
        prUrl: 'https://github.com/PostHog/posthog/pull/76517',
        prNumber: 76517,
        intro: 'Session replay is where self-driving sees what users did, including the problems that never threw an exception.',
        // This walkthrough is the general session-replay story, so its selector button reads
        // "Session replay" even though the underlying report was discovered by Replay Vision.
        walkthroughLabel: 'Session replay',
        /*
         * The built-out walkthrough, and the only one with real screenshots rather than
         * placeholder boxes. Its copy is about how a replay-sourced report moves through the
         * loop rather than about this specific 404, which is why the captures are reusable.
         */
        steps: [
            {
                stage: 'signal',
                copy: "The signal source reads every new recording for rage clicks, dead ends, and blocking errors, and files recurring problems as reports. For one flow you're worried about, make a scout and give it a schedule.",
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_09_08_at_13_49_13_2x_ee11a9ed21.png',
            },
            {
                stage: 'investigate',
                label: 'Report',
                copy: 'The agent watches the flagged sessions, sizes the damage against your product data, and traces it to the responsible code. The report links the replays as evidence.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_09_08_at_13_48_09_2x_a654bdcf92.png',
            },
            {
                stage: 'pr',
                copy: 'A replay shows the symptom and not the cause, so the report waits for your call. Once you decide what the fix should be, the agent writes it and opens the PR. You review the diff next to the replays and merge when you are satisfied. Dismiss it instead and your note is forwarded to the scout, which reads it before deciding what to surface next.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_09_08_at_13_47_07_2x_f462450931.png',
            },
        ],
        detail: {
            status: 'Actionable',
            // Report generation date from the capture; `lastUpdated` is the merge.
            firstSeen: 'Aug 3, 2026',
            lastUpdated: 'Aug 4, 2026',
            branch: 'posthog-self-driving/fixinsights-make-formula-charts-stop-e1eaef',
            contributingSources: ['session_replay'],
            // Real whole-PR totals from the GitHub API.
            stats: { added: 131, removed: 12, files: 4, commits: 2 },
            approvers: ['sampennington'],
            summary: [
                {
                    paragraphs: [
                        <>
                            Users were clicking data points, table cells, big-number tiles and dashboard titles and
                            getting nothing back. Drill-down is silently disabled on formula charts, and the pointer
                            cursor over a dead target promised otherwise.
                        </>,
                    ],
                },
                {
                    heading: 'Problem',
                    paragraphs: [
                        <>
                            Nine recordings across two days, from nine different people, show the same thing: someone
                            clicks something on a dashboard, nothing happens, they click again, and eventually give up.
                            Several were ratio charts, which in PostHog means a{' '}
                            <strong>multi-series formula trend</strong>, and the guard that disables the persons modal
                            for those also leaves the chart with no click handler attached at all.
                        </>,
                        <>
                            The chart still renders exactly like an interactive one. There's no fallback either: only
                            the tile title is a link, so clicking the plot area neither drills down nor opens the
                            insight.
                        </>,
                    ],
                },
                {
                    heading: 'Impact',
                    paragraphs: [
                        <>
                            This is the kind of bug nobody files. Nothing errors and nothing is logged. The click does
                            nothing, and the person assumes they used it wrong. It only surfaced because a scanner
                            watched people give up.
                        </>,
                    ],
                },
                {
                    heading: 'Solution',
                    paragraphs: [
                        <>
                            Say so instead of going silent. The tooltip now explains drill-down isn't available for
                            formula insights, and on dashboard tiles a click navigates to the underlying insight instead
                            of dead-ending.
                        </>,
                    ],
                },
            ],
            /*
             * No reviewers panel: the approver is real and recorded above, but the report's rationale
             * for suggesting them isn't in the capture.
             */
            evidence: [
                {
                    id: 'replay-dead-clicks-dashboard',
                    source: 'session_replay',
                    title: 'Repeated dead clicks on dashboard charts, then abandonment',
                    body: (
                        <>
                            A problem segment caught someone reviewing a dashboard where a click on a chart did not
                            respond, then moving on to another view. Re-worded from the finding: the stored prose
                            carries session ids.
                        </>
                    ),
                    tags: [
                        {
                            label: 'Problem segment',
                            tone: 'orange',
                            tooltip: 'A stretch of a recording the scanner judged to be going wrong.',
                        },
                    ],
                    codePaths: [
                        'products/product_analytics/frontend/insights/trends/TrendsLineChart/TrendsLineChart.tsx',
                        'products/product_analytics/frontend/insights/shared/InsightSeriesTooltip.tsx',
                    ],
                },
                {
                    id: 'replay-dead-clicks-summary-metrics',
                    source: 'session_replay',
                    title: 'Clicks on summary metrics and section headers did nothing visible',
                    body: (
                        <>
                            A second segment, a different person: they scrolled the dashboard for other metrics and
                            found that clicking the summary numbers and headers triggered no visible action.
                        </>
                    ),
                    tags: [{ label: 'Grouped', tone: 'blue', tooltip: 'Separate signals describing one problem.' }],
                },
            ],
            // Real file list from `/pulls/76517/files`.
            files: [
                {
                    path: 'products/product_analytics/frontend/insights/trends/TrendsLineChart/TrendsLineChart.tsx',
                    added: 47,
                    removed: 7,
                    hunk: '@@ -130,6 +130,12 @@',
                    lines: [
                        { kind: 'context', text: '    const canHandleClick = !isMultiSeriesFormula' },
                        { kind: 'add', text: '    // a formula chart cannot drill down, so say why instead of' },
                        { kind: 'add', text: '    // rendering a dead interactive-looking target' },
                        { kind: 'add', text: '    const formulaTooltipOverride = isMultiSeriesFormula' },
                    ],
                },
            ],
        },
    },
    /*
     * 6 — Product analytics.
     *
     * TODO: the second item here without a real merged pull request. As with APM, `prUrl`,
     * `prNumber` and `detail` are absent rather than invented, and the title and summary
     * below are placeholders that DO render in the inbox row. Swap for the real PR's data.
     */
    {
        id: 'product-analytics',
        commitType: 'fix',
        scope: 'insights',
        title: 'stop counting aborted requests in the query failure metric',
        summary:
            'A real outage nearly went unnoticed: most of what the query-failure metric counted was people navigating away mid-request, so genuine failures sat buried about 100x under their own noise floor.',
        priority: 'P2',
        signalCount: 4,
        timeAgo: 'Merged Aug 13',
        prUrl: 'https://github.com/PostHog/posthog/pull/76435',
        prNumber: 76435,
        /*
         * `analytics` already exists in SOURCE_META, labelled exactly "Product analytics",
         * with `found: 'The numbers moved against their own baseline.'` – so this needs no
         * new SourceKey. Signal rather than scout because the revised copy leads with
         * "checked against baseline as signals" and offers a scout as the alternative.
         */
        origin: { kind: 'signal', product: 'analytics' },
        // Drops the scope: this narrates the product, not the one PR.
        walkthroughLabel: 'Product analytics',
        intro: 'Product analytics puts your funnels and trends into the loop, checked against baseline like any other production system.',
        steps: [
            {
                stage: 'signal',
                copy: 'Funnel and trend regressions arrive as signals, measured on complete cohorts against their own baseline. For a metric you currently watch by hand, make a scout and hand it the schedule.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_09_08_at_13_49_13_2x_ee11a9ed21.png',
            },
            {
                stage: 'investigate',
                label: 'Report',
                copy: 'The agent segments the drop by browser, OS, cohort, and experiment exposure, then follows the failing step into the code that renders it. The funnel comparison stays attached to the report.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_09_08_at_14_41_33_2x_fe6438c076.png',
            },
            {
                stage: 'pr',
                copy: 'A conversion bug gets the same treatment as a crash. The agent opens the fix and adds events on the step the funnel could not see before. You review it with the funnel beside it, and the recovery gets measured by the next complete cohort, in the same comparison that caught the drop.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_09_08_at_14_40_08_2x_86e8a03f9a.png',
            },
        ],
        detail: {
            status: 'Actionable',
            // Report generation date from the capture; `lastUpdated` is the merge.
            firstSeen: 'Aug 2, 2026',
            lastUpdated: 'Aug 13, 2026',
            branch: 'posthog-self-driving/fixinsights-stop-counting-aborted-05d742',
            contributingSources: ['analytics'],
            // Real whole-PR totals from the GitHub API.
            stats: { added: 32, removed: 13, files: 3, commits: 3 },
            approvers: ['carlos-marchal-ph'],
            summary: [
                {
                    paragraphs: [
                        <>
                            The query-failure alert caught a real outage, thousands of 500s in an hour across hundreds
                            of people. But it <strong>almost didn't</strong>, because most of what the metric counts is
                            people navigating away mid-request.
                        </>,
                    ],
                },
                {
                    heading: 'Problem',
                    paragraphs: [
                        <>
                            The headline "Query failures" insight counts an event the frontend fires whenever a query
                            throws. That catch block doesn't distinguish a server error from a request the browser
                            aborted because the user clicked away, so{' '}
                            <strong>
                                hundreds of aborted requests an hour sit in the metric as permanent background noise
                            </strong>
                            . Genuine server failures normally run at single digits per hour, which means the signal is
                            buried under about a hundred times its own volume.
                        </>,
                    ],
                },
                {
                    heading: 'Impact',
                    paragraphs: [
                        <>
                            On the day it fired, the app returned thousands of 500s inside an hour, up from a handful
                            per hour earlier that morning. That's a real, broad incident, but because of the noise floor
                            the metric only moved about five-fold when the thing it is supposed to detect moved roughly
                            two hundred-fold.
                        </>,
                        <>
                            The ensemble detector caught it that time. A smaller outage in the same shape wouldn't have
                            cleared the baseline at all, and everyone watching the dashboard would have missed it.
                        </>,
                    ],
                },
                {
                    heading: 'Solution',
                    paragraphs: [
                        <>
                            Skip the capture when the caught error is an abort, reusing the check the API layer already
                            has. Error propagation is untouched. The caller still sees the rejection and handles
                            cancellation exactly as before. Only the analytics capture is skipped.
                        </>,
                    ],
                },
            ],
            /*
             * No reviewers panel: the approver is real and recorded above, but the report's rationale
             * for suggesting them isn't in the capture.
             */
            evidence: [
                {
                    id: 'anomaly-query-failures',
                    source: 'analytics',
                    title: 'Anomaly investigation on the "Query failures" headline, verdict true positive',
                    body: (
                        <>
                            The detector ensemble flagged the headline metric jumping to roughly five times its
                            prior-24h range and well above the previous twelve-day peak. The failure window broke down
                            into network errors, client cancellations and concurrency limits, which points at a real
                            capacity or connectivity incident, not noise.
                        </>
                    ),
                    tags: [
                        {
                            label: 'True positive',
                            tone: 'green',
                            tooltip: 'The investigation confirmed the anomaly was real, not a detector artefact.',
                        },
                    ],
                    verified: true,
                    codePaths: ['frontend/src/queries/query.ts', 'frontend/src/lib/api.ts'],
                },
            ],
            // Real file list and patch from `/pulls/76435/files`.
            files: [
                {
                    path: 'frontend/src/queries/query.ts',
                    added: 16,
                    removed: 12,
                    hunk: '@@ -284,17 +284,21 @@',
                    lines: [
                        { kind: 'context', text: '    } catch (e) {' },
                        {
                            kind: 'remove',
                            text: '        // Raw error detail/message can echo query fragments, so telemetry only gets status and code',
                        },
                        { kind: 'remove', text: "        posthog.capture('query failed', {" },
                        {
                            kind: 'add',
                            text: '        // an aborted request is the user navigating away, not a failure',
                        },
                        { kind: 'add', text: '        if (!isAbortError(e)) {' },
                        { kind: 'add', text: "            posthog.capture('query failed', {" },
                    ],
                },
                {
                    path: 'frontend/src/lib/api.ts',
                    added: 1,
                    removed: 1,
                    hunk: '@@ -1,1 +1,1 @@',
                    lines: [
                        { kind: 'remove', text: 'const isAbortError = (e: unknown): boolean =>' },
                        { kind: 'add', text: 'export const isAbortError = (e: unknown): boolean =>' },
                    ],
                },
            ],
        },
    },
    /*
     * NOTE: APM and Feature flags used to sit here. Both turned out to be real reports with
     * `implementation_pr_url: null`, so they moved to `REPORT_ITEMS` where they belong –
     * `SignalsToInbox` draws walkthroughs from both arrays, so they keep their carousel slots.
     */
]

/**
 * Real reports that have **not** become pull requests – the other half of the Inbox, and
 * the state every item in `INBOX_ITEMS` passed through first.
 *
 * A report is what the loop produces before anyone commits to a fix: the evidence is
 * gathered, the code is read, reviewers are worked out, and a write-up exists – but no
 * branch has been merged. Some are `immediately_actionable`, meaning an agent could open
 * the pull request today; the rest are `requires_human_input`, where the agent
 * investigated and stopped rather than shipping a fix it couldn't stand behind. Those are
 * the honest cases, so they're included.
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
    /*
     * 0 — Report 019fb921, the APM walkthrough's report. Scout-authored: its real
     * `source_products` is `['signals_scout']` with `scout_name: 'signals-scout-apm'`.
     *
     * Title is the report's own, verbatim. The summary is written fresh: the stored one
     * carries PostHog's own failure rates, p95 figures and ClickHouse diagnosis, which is
     * more of our reliability data than a public page should publish.
     */
    {
        id: 'apm',
        commitType: 'fix',
        scope: 'query',
        title: 'Events-list endpoint is timing out at 11.5%',
        summary:
            'The events-list endpoint started failing at a materially higher rate than the week before, with latency worsening alongside it. A sustained step, not a traffic artifact.',
        priority: 'P1',
        signalCount: 3,
        timeAgo: 'Updated Jul 31',
        origin: { kind: 'scout', scout: 'APM' },
        // Metrics, logs and traces are one story here, so the button drops the scope.
        walkthroughLabel: 'APM',
        intro: 'APM gives the loop your traces, logs, and metrics. What broke, what it said, and where it happened.',
        steps: [
            {
                stage: 'signal',
                copy: 'Log alerts and new error signatures arrive as signals on their own. The APM scout adds the scheduled sweep: RED metrics per service and operation, compared against baseline, with every validated regression filed as a report.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Scanners_Mock_APM_1_8d287374b6.png',
            },
            {
                stage: 'investigate',
                label: 'Report',
                copy: 'The agent lines the slow traces up against the fast ones, pulls the logs on the failing spans, and finds what they share. Because a trace names the service, operation, and line, the agent starts at the problem instead of searching for it.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Report_Investigate_Mock_APM_68ef834f95.png',
            },
            {
                stage: 'pr',
                copy: 'The agent fixes what the trace located and opens the PR, with instrumentation included so the effect of the change shows up in the same metrics. You review it with the waterfall beside it, and after you merge, the same check that raised the alarm watches the graph come back down.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Git_Hub_PR_Mock_APM_62fd9d0412.png',
            },
        ],
        detail: {
            status: 'Needs input',
            firstSeen: 'Jul 31, 2026',
            lastUpdated: 'Jul 31, 2026',
            contributingSources: ['signals_scout'],
            summary: [
                {
                    paragraphs: [
                        <>
                            The events-list endpoint's failure rate stepped up sharply against the same window a week
                            earlier, while traffic barely moved, so this is a real regression in the query path and not
                            load. Latency at the 95th percentile worsened alongside it.
                        </>,
                    ],
                },
                {
                    heading: 'Why it needs a human',
                    paragraphs: [
                        <>
                            The failing requests time out inside query execution against a fixed limit. Whether the
                            right fix is that limit, the query plan, or the materialisation strategy is an owner
                            decision, so the agent stopped at the diagnosis instead of picking one.
                        </>,
                    ],
                },
            ],
        },
    },
    /*
     * 0b — Report 019fc98f, the Feature flags walkthrough's report. Also scout-authored
     * (`scout_name: 'signals-scout-feature-flags'`), which is why its origin is a scout even
     * though the step copy leads with signals.
     *
     * Title verbatim from the report. Summary rewritten to drop the evaluation counts and
     * person counts the stored one carries.
     */
    {
        id: 'feature-flags',
        commitType: 'fix',
        scope: 'feature-flags',
        title: 'remove residual calls to renamed streamlit flag',
        summary:
            'A retired flag key kept being evaluated for days after the live flag was renamed, with almost every one of those calls returning null.',
        priority: 'P3',
        signalCount: 3,
        timeAgo: 'Updated Aug 3',
        origin: { kind: 'scout', scout: 'Feature flags' },
        walkthroughLabel: 'Feature flags',
        intro: 'Feature flags accumulate faster than anyone cleans them up. The loop does the cleaning.',
        steps: [
            {
                stage: 'signal',
                copy: 'The signals cover flag drift: stale keys, evaluation cliffs, renamed flags still being called from old deployments. A scout can watch the flags with the highest stakes, like an experiment gate or a kill switch.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Scanners_Mock_Feature_flags_eabb057430.png',
            },
            {
                stage: 'investigate',
                label: 'Report',
                copy: 'The agent finds the call sites, works out which SDK and deployment they ship in, and separates cached noise from live code still checking a dead key.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Report_Investigate_Mock_Feature_flags_641e6583a6.png',
            },
            {
                stage: 'pr',
                copy: "Flag cleanup is the PR that never makes it off anyone's backlog, so the agent opens it. The checks migrate to the right key and the dead branch comes out. You review it with the evaluation graph beside it, and once the old key's calls decay to zero the cleanup is confirmed in the same graph.",
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Git_Hub_PR_Mock_Feature_flags_3e6586debd.png',
            },
        ],
        detail: {
            status: 'Needs input',
            firstSeen: 'Aug 3, 2026',
            lastUpdated: 'Aug 3, 2026',
            contributingSources: ['signals_scout'],
            summary: [
                {
                    paragraphs: [
                        <>
                            A flag key was renamed, but the old key kept being evaluated every day afterwards. The
                            roster has no live flag under the old name, so nearly all of those calls resolved to nothing
                            . Callers were reading a default instead of the flag they meant.
                        </>,
                    ],
                },
                {
                    heading: 'Why it needs a human',
                    paragraphs: [
                        <>
                            The remaining calls could be cached deployments that will age out on their own, or live code
                            still checking a dead key. Which one decides whether this is a migration or a deletion, and
                            that call belongs to whoever owns the caller.
                        </>,
                    ],
                },
            ],
        },
    },
    /*
     * 0c — Experiments. Scout-authored, like the two above, so no new `SourceKey` is needed.
     *
     * The work behind this reached PostHog/posthog#70239 – `feat(web-analytics): gate session
     * replay tile behind experiment flag`, +26/-1 across three files, approved by lricoy –
     * but that PR was **closed without merging** on Jul 28, so no `prUrl` or `prNumber` here:
     * the header link is gated on `prUrl`, and linking an unmerged PR from a page about
     * merged ones would misrepresent it. Title and diff shape are the real PR's.
     *
     * `priority` and `signalCount` are illustrative – unlike APM and Feature flags there's no
     * stored report to read them from. Replace them if one turns up.
     */
    {
        id: 'experiments',
        commitType: 'feat',
        scope: 'web-analytics',
        title: 'gate session replay tile behind experiment flag',
        summary:
            'A running experiment produced no exposures, because the flag it was built on was never read in the serving path, so neither variant could fill and the readout would have been empty.',
        priority: 'P2',
        signalCount: 2,
        timeAgo: 'Updated Jul 28',
        origin: { kind: 'scout', scout: 'Experiments' },
        walkthroughLabel: 'Experiments',
        intro: 'An experiment is only as good as the data underneath it. Something has to check that data, and this is it.',
        steps: [
            {
                stage: 'signal',
                copy: "The experiments scout sweeps every running test on a schedule: exposure balance, sample ratios, metrics actually filling. A test that can't produce a valid readout becomes a report a day into the run, not at the readout. For a high-stakes launch, set up your own scout with tighter checks.",
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Scanners_Mock_Experiments_83d2511ca0.png',
            },
            {
                stage: 'investigate',
                label: 'Report',
                copy: 'The agent traces the exposure stream back through the serving path: whether the flag is read at all, where the exposure event fires, and whether the split you configured is the split users get.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Report_Investigate_Mock_Experiments_bcb10f1ea2.png',
            },
            {
                stage: 'pr',
                copy: 'Wiring problems are code problems, so the agent opens the PR. The flag read goes into the serving path, with tests that keep it there, and a note on resetting the experiment so the empty window stays out of the analysis. You review it with the exposure data beside it; both variants start filling after the merge, and the readout you eventually get is one you can trust.',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Git_Hub_PR_Mock_Experiments_af42b8b94b.png',
            },
        ],
        detail: {
            status: 'Needs input',
            firstSeen: 'Jul 11, 2026',
            lastUpdated: 'Jul 28, 2026',
            branch: 'posthog-code/wire-web-analytics-replay-tile-flag',
            contributingSources: ['signals_scout'],
            summary: [
                {
                    paragraphs: [
                        <>
                            The experiment was configured and running, but its flag was never read on the path that
                            serves the tile, so no exposure event fired for either variant and the test could not
                            produce a readout at all.
                        </>,
                    ],
                },
                {
                    heading: 'Why it needs a human',
                    paragraphs: [
                        <>
                            Wiring the flag in is straightforward, but the run already has an empty window in it.
                            Whether to reset the experiment and discard that window, or restart it outright, is a call
                            for whoever owns the test.
                        </>,
                    ],
                },
            ],
        },
    },
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
                            Worse, both gates <em>raise</em> instead of degrading, so one denied tile query escalates
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
                            the overview loader fail the individual tile instead of throwing to the scene error
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
                            server-side, which is still a live failure path when the eval fails or hasn't propagated.
                            Also authored the session-selection button behind the reported dead click.
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
                            can see MCP analytics and another cannot. It replaced the beta email allow-list as the
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
                            Set <Code>PostHogFeatureFlagPermission</Code> on the MCP analytics viewsets, which is the
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
                            access-control error, then explore its dashboards, sessions, and tool-quality metrics, with
                            one dead click when trying to select a session. The view failed as a whole-scene error
                            instead of a single unavailable tile, with a scout configuration panel stuck mid-load behind
                            it.
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
                            explained it. But the allow-list is gone and the asymmetry isn't, which is what pointed at a
                            second, independent gate.
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
                            Queried <Code>query access control error</Code> events: they still fire every day, 42 on one
                            day and 15 the next, between 1 and 42 a day across a month, and they carried on{' '}
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
                            never got that treatment, and <Code>WebAnalyticsTile.tsx</Code>{' '}
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
                            . An explicit ID lookup shouldn't be date-bounded at all.
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
                            before 90 days, the concrete reason the list is empty while the table shows visitors.
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
                            tooltip: 'The segment was classified as the user being confused, not blocked.',
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
                            (hit Refresh). The aggregate blast radius isn't quantifiable from here. The recordings and
                            error events for those projects were cross-region and unreachable from this environment, so
                            this reads as recurring, annoying friction and not a confirmed broken flow.
                        </>,
                    ],
                },
                {
                    heading: 'Solution',
                    paragraphs: [
                        <>
                            Don't ship the originally-proposed fix blindly: it would be a{' '}
                            <strong>no-op in the editor</strong> and just add redundant recomputes. Instead, a human
                            with insight-editor access should confirm the true cause first. Candidates are{' '}
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
                            making ClickHouse timeouts and memory errors, surfaced as a 500, far more likely than a
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
                            the reducers feeding <Code>InsightErrorState</Code>, the component the user sees when this
                            fails.
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
                            stale or empty cached response be served without a fresh server query, the mechanism the
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
                            populates. A failure to handle the initial loading state gracefully, or a query timeout that
                            needs manual intervention.
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
                            then stops. There's no <Code>posthog.capture</Code> on that path. The shared join modal
                            already captures <Code>join created</Code> and <Code>join updated</Code>, so the codebase
                            has a settled idiom for this. Deletion is the one that didn't get it.
                        </>,
                    ],
                },
                {
                    heading: 'Impact',
                    paragraphs: [
                        <>
                            Nothing is broken for anyone. This is a measurement gap and not a defect. The cost is that
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
                            outlives the patch. The agent stopped instead of guessing a schema: the Data Catalog owner
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
                            used in this repo. None of them appear.
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
                            events, but nothing for deletion, which confirms the gap from the data side as well as the
                            code side.
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

/* ── The unified list ──────────────────────────────────────────────────────── */

/**
 * Every item the inbox shows, in one list.
 *
 * The app used to split these across a Pull requests tab and a Reports tab; it now
 * shows a single Reports list where a pull request is a property of an item rather
 * than a category of its own. The two arrays above stay separate because they're
 * sourced and privacy-reviewed differently (see the notes on each), but nothing
 * downstream should care which one an item came from – ask `prNumber` instead.
 */
export const ALL_ITEMS: InboxItem[] = [...INBOX_ITEMS, ...REPORT_ITEMS]

/**
 * The status facet, replacing the old Actionable / Needs-input row badge.
 *
 * These are the app's own five, in its order. The first two are the open states and
 * are the ones selected by default; the last three are closed states that no item on
 * this page is in, because a report nobody has acted on is the whole point of showing
 * it here. They're listed anyway because the scale is part of the product, the same
 * reason the priority menu lists levels that match nothing.
 */
export const STATUSES = ['Review and merge', 'Needs decision', 'Resolved', 'Dismissed', 'Not actionable'] as const

export type ReportStatus = (typeof STATUSES)[number]

/** The two open states, which the app pre-selects – hence its "2 statuses" chip. */
export const DEFAULT_STATUSES: ReportStatus[] = ['Review and merge', 'Needs decision']

/**
 * Derived rather than stored, so the detail payloads don't each need a new field that
 * would only restate what `prNumber` already says.
 *
 * A pull request is the thing you review and merge, so an item that has one is in that
 * state and an item that doesn't is waiting on a human to decide what happens next.
 *
 * This deliberately drops the report's own Actionable / Needs-input judgment, which the
 * old row badged. The redesign has no such badge – "Actionable" and "Needs input" both
 * describe a report with no pull request yet, which is one status here. The judgment is
 * still on `detail.status` for the detail view.
 */
export const statusOf = (item: InboxItem): ReportStatus => (item.prNumber ? 'Review and merge' : 'Needs decision')

/**
 * The repo an item's pull request lives in, parsed from its own URL so the row can't
 * name a repo the link doesn't go to. Undefined without a pull request – the app shows
 * no repo on a report that hasn't produced one, because there's nothing to name yet.
 */
export const repoOf = (item: InboxItem): string | undefined => {
    const match = /github\.com\/([^/]+\/[^/]+)\/pull\//.exec(item.prUrl ?? '')
    return match?.[1]
}
