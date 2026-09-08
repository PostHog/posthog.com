/**
 * The four scouts on the Scouts tab, taken from project 2 and scrubbed.
 *
 * These are real scouts on PostHog's own project: their names, owners, cadences, run
 * counts, filed/edited/learned/told totals, and per-run outcomes and durations are the
 * genuine values. What they *found* is rewritten – see the scrubbing notes below and in
 * README.md. That's a third deliberate departure from the page's "nothing is invented"
 * promise, alongside the two the README already documents, and it's a bigger one: on the
 * Reports tab only the evidence bodies are re-worded, whereas here every run summary is.
 *
 * ## What was removed, and why
 *
 * 1. **Money.** `Ad spend` watches PostHog's paid-ads warehouse tables. Its real run
 *    summaries carry campaign-level spend, cost-per-acquisition figures, and named
 *    campaign IDs – PostHog's marketing spend, which is commercially sensitive and not
 *    ours to publish. Every figure is gone; the summaries keep the shape of the finding
 *    ("cost per outcome ran above this campaign's own baseline on settled days") without
 *    the numbers. This scout is the most heavily rewritten of the four, and its content
 *    is thinner as a result.
 * 2. **Our own reliability numbers.** `Apm` reports per-service error rates and latency
 *    on PostHog's tracing data. The README already records that this class of figure was
 *    withheld from the APM *report*, for the same reason it's withheld here.
 * 3. **Identifiers.** Report UUIDs, `us.posthog.com` report links, GitHub logins named in
 *    steering notes, and warehouse campaign IDs are all dropped. Scout owners are kept:
 *    they're PostHog employees, and the page already publishes real reviewer names and
 *    profile links on the Reports tab.
 * 4. **Customer names.** None of these four name a customer. That's part of why these
 *    four: the scouts that do – the account and outreach ones – are not here at all.
 *
 * `Website 404s` is the least altered. It watches posthog.com, which is this repository,
 * so its findings are already public by nature.
 */
import React from 'react'
import { IconCheckCircle, IconCircleDashed, IconWarning } from '@posthog/icons'

/** Blue while a new scout settles in, green once its baselines are established. */
export type ScoutState = 'Working' | 'Settling in'

/** A scout PostHog ships, versus one someone on the team wrote. */
export type ScoutKind = 'Canonical' | 'Custom'

/**
 * What a run did. `emitted` filed or edited at least one report, `quiet` cleared nothing
 * past the reporting bar, `failed` errored. Drives both the run strip and the
 * All / Emitted / Quiet / Failed filter.
 */
export type RunOutcome = 'emitted' | 'quiet' | 'failed'

export interface ScoutRun {
    /** Real timestamp label, as the app renders it. */
    when: string
    /** Real wall-clock duration, e.g. "3m 52s". */
    duration: string
    outcome: RunOutcome
    /** The badge on the right, e.g. "4 reports edited". Absent on a quiet run. */
    badge?: string
    /** Lead line of the run's write-up. Rewritten – see the scrubbing notes above. */
    summary: string
    /** The run's own bullet list, where it had one. */
    bullets?: string[]
}

/** One report this scout filed or added to, as its detail page lists them. */
export interface ScoutReport {
    priority: 'P0' | 'P1' | 'P2' | 'P3' | 'P4'
    /** Conventional-commit prefix, where the report carries one. */
    scope?: string
    title: string
    summary: string
    /** Whether this scout wrote the report or added to someone else's. */
    authorship: 'Authored' | 'Edited'
    /** The report's own state: ready to act on, or waiting on a person. */
    status: 'Ready' | 'Needs input'
    timeAgo: string
}

/** An entry in "What it has learned" – the scout's durable memory. */
export interface ScoutMemory {
    /** The kind of thing remembered: a pattern, a dedupe pointer, a noise rule. */
    tag: string
    /** The memory's own key, e.g. `web404:baseline`. */
    key: string
    when: string
    body: string
}

/** A steering note in "What you've told it". */
export interface ScoutNote {
    /** How the note reached the scout, e.g. "From a reviewer change". */
    origin: string
    age: string
    expires: string
    body: string
}

export interface Scout {
    /** Slug used for the URL hash and React keys. */
    id: string
    name: string
    kind: ScoutKind
    state: ScoutState
    /** Absent on a canonical scout, which the whole project owns. */
    owner?: string
    /** Real schedule, e.g. "every 3h", "daily", "hourly". */
    cadence: string
    nextRun: string
    description: string
    /** One-line last-run summary, shown on the list card. Rewritten. */
    lastRun: string
    stats: {
        /** Always 25 here: the app's run strip is the last 25 runs. */
        runs: number
        reportsFiled: number
        reportsEdited: number
        learned: number
        told: number
    }
    /** The "25 runs · N reports filed · added to N existing reports" line. */
    runSummary: string
    /** Real outcome counts across the last 25, for the filter pills. */
    counts: { emitted: number; quiet: number; failed: number }
    /**
     * The runs captured from the scout's detail page, newest first. Fewer than 25 on
     * purpose – these are the ones actually read, with their real timestamps, durations
     * and outcomes, rather than a padded-out sequence.
     */
    runs: ScoutRun[]
    reports?: ScoutReport[]
    notes?: ScoutNote[]
    learned?: ScoutMemory[]
}

export const RUN_META: Record<
    RunOutcome,
    { Icon: React.ComponentType<{ className?: string }>; color: string; block: string; label: string }
> = {
    emitted: { Icon: IconCheckCircle, color: 'text-blue', block: 'bg-blue', label: 'Emitted' },
    quiet: { Icon: IconCircleDashed, color: 'text-muted', block: 'bg-border', label: 'Quiet' },
    failed: { Icon: IconWarning, color: 'text-red', block: 'bg-red', label: 'Failed' },
}

export const SCOUTS: Scout[] = [
    {
        id: 'website-404s',
        name: 'Website 404s',
        kind: 'Custom',
        state: 'Working',
        owner: 'Ian Vanagas',
        cadence: 'daily',
        nextRun: 'in 14 hours',
        // Verbatim: this one watches posthog.com, so its own description is already public.
        description:
            'Watches 404s on posthog.com and files the fix. Every query carries a canonical noise filter (asset extensions, favicon/apple-touch, /page-data, .well-known, wrong-host SDK endpoints like /batch and /flags, and credential scanners) so the scout only ever judges real URLs. Discriminator is provenance, not volume: a dead URL counts when we link to it ourselves.',
        lastRun:
            'Quiet run: no new 404 root cause met the filing bar. Four live reports were refreshed with current evidence.',
        stats: { runs: 25, reportsFiled: 13, reportsEdited: 2, learned: 2, told: 0 },
        runSummary: '25 runs · 2 failed · 13 reports filed · added to 14 existing reports',
        counts: { emitted: 22, quiet: 1, failed: 2 },
        runs: [
            {
                when: 'Yesterday 10:06:42 PM',
                duration: '3m 12s',
                outcome: 'emitted',
                badge: '4 reports edited',
                summary:
                    'Quiet run: no new website 404 root cause met the filing bar. Four live reports were refreshed with current evidence, including the router page-data 404s and the sitemap index.',
            },
            {
                when: 'September 06, 2026 10:06:37 PM',
                duration: '3m 42s',
                outcome: 'emitted',
                badge: '4 reports edited',
                summary:
                    'No new website 404 root cause met the filing bar. Updated four existing reports with current evidence, including the router page-data 404s and the filtered sitemap requests.',
            },
            {
                when: 'September 05, 2026 10:06:40 PM',
                duration: '4m 17s',
                outcome: 'emitted',
                badge: '3 reports edited',
                summary:
                    'Updated the three live reports with fresh validation instead of creating duplicates. Two merged fixes still show post-merge page-data 404s, so they remain under follow-up.',
            },
            {
                when: 'September 04, 2026 10:06:36 PM',
                duration: '3m 32s',
                outcome: 'emitted',
                badge: '1 report authored',
                summary:
                    'Filed one new report: a set of documentation URLs we link to ourselves that resolve to 404 for every visitor who follows them.',
            },
        ],
        learned: [
            {
                tag: 'noise',
                key: 'web404:ruled-out',
                when: 'Yesterday 10:09:36 PM',
                body: 'Ruled out again: a handful of docs paths that 404 only for crawlers hitting old asset URLs, not for anyone following a link from the site. Stays on the noise list.',
            },
            {
                tag: 'pattern',
                key: 'web404:baseline',
                when: 'Yesterday 10:09:36 PM',
                body: 'Baseline refreshed. Page-data 404s track deploys and not traffic, so the bar is provenance, meaning whether we link to the dead URL ourselves, and not request volume.',
            },
        ],
    },
    {
        id: 'apm',
        name: 'Apm',
        kind: 'Canonical',
        state: 'Working',
        cadence: 'every 3h',
        nextRun: 'in an hour',
        // Verbatim: describes the scout's method, and names no data.
        description:
            'Signals scout for PostHog distributed tracing (APM / OpenTelemetry spans). Watches per-service RED metrics for error-rate and latency regressions, new error signatures, and traffic cliffs.',
        lastRun: 'Sandbox provisioning remains a live regression against a matched week with comparable volume.',
        stats: { runs: 25, reportsFiled: 2, reportsEdited: 2, learned: 4, told: 2 },
        runSummary: '25 runs · 2 reports filed · added to 3 existing reports',
        counts: { emitted: 12, quiet: 13, failed: 0 },
        runs: [
            {
                when: 'Today 6:31:34 AM',
                duration: '2m 22s',
                outcome: 'emitted',
                badge: '1 report edited',
                summary:
                    'Sandbox provisioning remains a live regression against a matched week with comparable volume. Updated the existing sandbox provisioning report, and no duplicate was created.',
            },
            {
                when: 'Today 3:32:35 AM',
                duration: '2m 21s',
                outcome: 'emitted',
                badge: '1 report edited',
                summary:
                    'Found one persistent regression: sandbox provisioning is still elevated against its matched week at comparable volume. Updated the existing report instead of filing again.',
            },
            {
                when: 'Today 12:31:28 AM',
                duration: '2m 11s',
                outcome: 'quiet',
                summary:
                    'Quiet run: no new RED regression cleared the reporting bar. Sandbox provisioning holds steady, while the query endpoint has recovered.',
            },
            {
                when: 'Yesterday 9:31:30 PM',
                duration: '2m 42s',
                outcome: 'quiet',
                summary:
                    'Quiet run: no new regression cleared the reporting bar. The existing sandbox provisioning issue remains elevated, and branch checkout stays tracked and not due for validation yet.',
            },
            {
                when: 'Yesterday 6:31:29 PM',
                duration: '5m 3s',
                outcome: 'quiet',
                summary:
                    'Quiet run: no new sustained RED regression met the reporting bar, so no report was authored or edited.',
            },
        ],
        notes: [
            {
                origin: 'From a reviewer change',
                age: '4 days ago',
                expires: 'expires in a month',
                body: 'Inbox routing correction: someone changed the suggested reviewers on a report about stopping project API tokens being exposed in model-visible output. One name was removed, and that was the editor’s own login, which is weaker evidence than a blame walk.',
            },
            {
                origin: 'From a discussion',
                age: '5 days ago',
                expires: 'expires in 25 days',
                body: 'Inbox activity: someone opened a discussion on a report about trend queries failing in the web service and asked whether it was valid, saying the report body was too small and needed more context.',
            },
        ],
        learned: [
            {
                tag: 'report',
                key: 'apm:temporal-provisioning',
                when: 'Today 6:33:51 AM',
                body: 'Sandbox provisioning is the live tracked regression on this surface. Compare against a matched week at similar volume, not the previous day, because provisioning traffic is bursty.',
            },
        ],
    },
    {
        id: 'agent-feedback',
        name: 'Agent feedback',
        kind: 'Custom',
        state: 'Working',
        owner: 'Andy Maguire',
        cadence: 'hourly',
        nextRun: 'in 22 minutes',
        description:
            'Signals scout over the MCP agent-feedback tool: the single feedback stream carrying every feedback type that agents and their users file about PostHog: mcp, product, docs, scout, other, and any type added later. Discovers the live feedback-type set each run, and groups negative and mixed submissions into per-type friction themes and blocking clusters anchored on the calling organization.',
        lastRun:
            'Updated alert tool validation failures after three caller groups reported fresh alert-simulate failures.',
        stats: { runs: 25, reportsFiled: 8, reportsEdited: 15, learned: 25, told: 10 },
        runSummary: '25 runs · 8 reports filed · added to 16 existing reports',
        counts: { emitted: 19, quiet: 6, failed: 0 },
        runs: [
            {
                when: 'Today 7:30:25 AM',
                duration: '3m 52s',
                outcome: 'emitted',
                badge: '1 report edited',
                summary:
                    'Updated alert tool validation failures after three caller groups reported fresh alert-simulate failures.',
                bullets: ['Verified a one-hour window against the seven-day control.'],
            },
            {
                when: 'Today 6:30:31 AM',
                duration: '3m 32s',
                outcome: 'quiet',
                summary: 'No report changed. The verified window held against the seven-day control.',
                bullets: ['Scanned the hour: one task was incomplete, and no new feedback type appeared.'],
            },
            {
                when: 'Today 5:30:20 AM',
                duration: '4m 23s',
                outcome: 'emitted',
                badge: '1 report authored',
                summary:
                    'Filed a report on the Replay Vision enabled-filter contract: validation failures over three days, corroborated by two new caller groups.',
                bullets: ['Verified the window against the seven-day control.'],
            },
            {
                when: 'Today 4:30:28 AM',
                duration: '3m 22s',
                outcome: 'quiet',
                summary: 'No report changed. The verified window held against the seven-day control.',
                bullets: ['Scanned the hour: no blocked tasks and no new feedback types appeared.'],
            },
        ],
        notes: [
            {
                origin: 'From a reviewer change',
                age: '11 hours ago',
                expires: 'expires in a month',
                body: 'Inbox routing correction: someone changed the suggested reviewers on a report about flag results hiding the distinct ID they were evaluated for. A name was removed, the editor’s own login, which is weaker evidence than a blame walk.',
            },
            {
                origin: 'From a reviewer change',
                age: '13 hours ago',
                expires: 'expires in a month',
                body: 'Inbox routing correction: someone changed the suggested reviewers on a report about accepting the current time in observation date filters. A name was added, and an added login is a positive ownership fact for this surface.',
            },
            {
                origin: 'From a reviewer change',
                age: '19 hours ago',
                expires: 'expires in a month',
                body: 'Inbox routing correction: someone changed the suggested reviewers on a report about pinning the active project so it can’t silently drift. A name was added, which is a positive ownership fact worth recording.',
            },
        ],
    },
    {
        id: 'ad-spend',
        name: 'Ad spend',
        kind: 'Custom',
        state: 'Working',
        owner: 'Ben Bradley',
        cadence: 'daily',
        nextRun: 'in 12 hours',
        /*
         * Method kept, platforms kept – that PostHog buys ads is public. Everything the
         * scout has ever measured is gone, which is why this one reads thinner than the
         * other three.
         */
        description:
            'Focused Signals scout for PostHog projects running paid ads. Watches per-platform ad-spend warehouse tables and the marketing budget sheet for cost-per-conversion regressions, spend continuing while conversions go to zero, and budget-pacing breaches. Scores the cost-per-outcome rate against each campaign’s own trailing baseline on settled days only, not raw spend. Emits findings only when they clear the confidence bar. Otherwise it writes durable memory and closes out empty.',
        lastRun: 'All four edits landed. No new ad-spend issue cleared the reporting bar.',
        stats: { runs: 25, reportsFiled: 1, reportsEdited: 6, learned: 6, told: 0 },
        runSummary: '25 runs · 1 report filed · added to 7 existing reports',
        counts: { emitted: 22, quiet: 3, failed: 0 },
        runs: [
            {
                when: 'Yesterday 8:01:23 PM',
                duration: '5m 13s',
                outcome: 'emitted',
                badge: '4 reports edited',
                summary:
                    'All four edits landed. No new ad-spend issue cleared the reporting bar. The four live paid-ads reports were refreshed with fresh settled data, all essentially unchanged from the prior run.',
                bullets: [
                    'Checked table freshness and re-scored each tracked campaign’s settled window against its own trailing baseline.',
                    'Noticed a new sub-pattern on one campaign: daily spend collapsed while conversions stayed near zero. Flagged as a watch item, deliberate wind-down versus tracking issue to be resolved next run.',
                    'Confirmed an ongoing platform-wide reporting halt is still in effect. No action needed, and the follow-up is not yet due.',
                    'Found one warehouse source failing auth with its sync paused. Judged it engineering territory instead of a scoreable ad-spend finding, and recorded the observation instead of filing.',
                    'Skipped the platforms whose data is frozen or unusable, all chronic issues already documented.',
                ],
            },
            {
                when: 'September 06, 2026 8:01:23 PM',
                duration: '3m 22s',
                outcome: 'emitted',
                badge: '4 reports edited',
                summary:
                    'No new ad-spend issue cleared the reporting bar. Updated three live reports with fresh settled evidence, and added a recovery note to a fourth whose rate improved.',
                bullets: [
                    'Skipped new reports for upper-funnel and high-volume brand campaigns, stale budget pacing, and the known campaign halt.',
                    'Refreshed cursors, dedupe records, and follow-ups.',
                ],
            },
            {
                when: 'September 05, 2026 8:01:25 PM',
                duration: '3m 31s',
                outcome: 'emitted',
                badge: '3 reports edited',
                summary:
                    'Updated three live ad-spend reports with fresh settled evidence. Two hold at their previous rate against baseline, and one improved substantially.',
                bullets: [
                    'Checked warehouse freshness and campaign schemas.',
                    'Skipped new reports because existing ones already cover these issues.',
                    'Skipped budget pacing because the budget sheet remains stale and malformed.',
                    'Routed one report to its owner.',
                ],
            },
            {
                when: 'August 23, 2026 8:01:23 PM',
                duration: '2m 51s',
                outcome: 'quiet',
                summary:
                    'Quiet ad-spend run: the settled frontier had not advanced, so no new evidence justified updating either live report.',
                bullets: [
                    'Did not edit the live reports because the settled-data window did not move past the previous run’s frontier.',
                    'Skipped budget pacing: the budget sheet still has duplicate headers and a months-old sync.',
                    'Reviewed current scout context and notes, and no steering changed the decision.',
                ],
            },
        ],
        reports: [
            {
                priority: 'P2',
                scope: 'fix(marketing)',
                title: 'A search campaign has a new sustained cost-per-acquisition spike',
                summary:
                    'The original campaigns this report tracked stopped reporting entirely, and a renamed replacement developed its own sustained regression.',
                authorship: 'Edited',
                status: 'Ready',
                timeAgo: '12 hours ago',
            },
            {
                priority: 'P2',
                title: 'A session-recording campaign is spending with zero conversions',
                summary:
                    'The campaign spent across seven fully settled days with zero conversions, despite recording impressions throughout.',
                authorship: 'Edited',
                status: 'Ready',
                timeAgo: '12 hours ago',
            },
            {
                priority: 'P2',
                title: 'Logs paid-search cost per acquisition regressed across two platforms',
                summary:
                    'The Logs paid-search campaigns are spending materially less efficiently on fully settled data, both well above their own trailing baselines.',
                authorship: 'Edited',
                status: 'Ready',
                timeAgo: '12 hours ago',
            },
            {
                priority: 'P2',
                title: 'A product-analytics campaign’s cost per acquisition doubled on settled spend',
                summary:
                    'The campaign’s cost per acquisition came in at roughly twice its own trailing baseline across a settled week.',
                authorship: 'Edited',
                status: 'Needs input',
                timeAgo: '12 hours ago',
            },
            {
                priority: 'P2',
                scope: 'fix(ads)',
                title: 'An error-tracking campaign has recorded zero spend for 32 days',
                summary:
                    'The campaign has had no rows in the warehouse for over a month, with no accompanying change record.',
                authorship: 'Edited',
                status: 'Ready',
                timeAgo: '3 days ago',
            },
        ],
        learned: [
            {
                tag: 'pattern',
                key: 'ad_spend:paused-source',
                when: 'Yesterday 8:06:19 PM',
                body: 'One platform’s sync is paused and its source reports an auth failure. This is warehouse source health and not a scoreable ad-spend finding. Those campaigns are upper-funnel with structurally zero conversions by design, so a stale sync doesn’t change the marketing risk picture. Skip authoring, and re-check whether spend is still flowing blind if the sync stays paused.',
            },
            {
                tag: 'dedupe',
                key: 'ad_spend:product-analytics',
                when: 'Yesterday 8:06:12 PM',
                body: 'An existing live report covers this campaign and was updated yesterday. Its latest settled comparison is roughly twice its trailing baseline, unchanged from the previous run. Continue monitoring.',
            },
            {
                tag: 'dedupe',
                key: 'ad_spend:logs-paid-search',
                when: 'Yesterday 8:06:08 PM',
                body: 'An existing live report covers the Logs paid-search campaign and was updated yesterday. Its latest settled comparison is above baseline but down slightly from the previous run. Continue monitoring.',
            },
        ],
    },
]

/** The project-wide totals above the list. Real, and the app scopes them to the last 7 days. */
export const SCOUT_TOTALS = {
    pausingSoon: 1,
    recentlyPaused: 1,
    onPatrol: 234,
    runs: 6650,
    reportsFiled: 12,
    reportsEdited: 38,
    /** The app renders this capped rather than exact. */
    learned: '1000+',
}
