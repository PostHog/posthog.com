/* eslint-disable react/jsx-key -- table cells here are data, not rendered lists; keys are applied per row/column by ColumnsTable/FieldValueTable in InstrumentationBlocks.tsx */
import React from 'react'
import { Annotation } from '../types'

export const safetyAnnotations: Annotation[] = [
    {
        id: 'safety/safety-hero/web',
        page: 'safety',
        target: 'safety-hero',
        tool: 'web',
        label: '$web_vitals',
        dx: 0.86,
        dy: 0.5,
        title: 'Measuring load speed with web vitals',
        body: {
            why: (
                <>
                    Enable web vitals in project settings and posthog-js emits a <code>$web_vitals</code> event on every
                    page load, reading LCP, FCP, INP, and CLS from the browser's Performance API. You don't implement
                    the measurement, and it's a separate switch from autocapture, so you can run one without the other.
                </>
            ),
            input: {
                kind: 'code',
                language: 'js',
                context: 'one setting',
                snippet: `// project settings → "web vitals"
// or in posthog.init():
capture_performance: { web_vitals: true }`,
            },
            output: {
                context: 'web vitals · this page',
                table: {
                    kind: 'fieldValue',
                    rows: [
                        { field: 'LCP', value: '2.84s · largest paint' },
                        { field: 'FCP', value: '1.21s · first paint' },
                        { field: 'INP', value: '64ms · responsiveness' },
                        { field: 'CLS', value: <strong>0.31 · layout shift</strong> },
                    ],
                },
                footnote: <>Google rates CLS over 0.25 as poor; this page sits at 0.31.</>,
            },
            after: (
                <>
                    This page's LCP is the hero you're reading; its layout shift is the coverage map below loading late
                    and pushing everything down. The toolbar shows both for whatever page you're on.
                </>
            ),
        },
    },
    {
        id: 'safety/safe-no-roads/flags',
        page: 'safety',
        target: 'safe-no-roads',
        tool: 'flags',
        label: 'routing-engine-v2-release',
        dx: 0.5,
        dy: 0,
        title: 'Deploying a rewrite without releasing it',
        body: {
            why: (
                <>
                    The engine that refuses to route across a road got rewritten. The new one is deployed to production
                    switched off, and a flag decides who actually gets it: the engineer who wrote it, then the internal
                    team, then 5% of riders. Deploying and releasing stop being the same event. With a secure API key on
                    the server SDK this evaluates in-process, so a flag check per route costs nothing.
                </>
            ),
            input: {
                kind: 'code',
                language: 'js',
                context: 'server-side',
                snippet: `// server-side, where the route is built
const flags = await posthog.evaluateFlags(distinctId, {
  // pass what the release conditions target, or
  // the SDK has to ask the server instead
  personProperties: { borough, staff },
})
return flags.isEnabled('routing-engine-v2-release')
  ? routeV2(from, to)
  : routeV1(from, to)`,
            },
            output: {
                context: 'routing-engine-v2-release',
                table: {
                    kind: 'columns',
                    columns: [
                        { label: 'Release condition' },
                        { label: 'Rollout', align: 'right' },
                        { label: 'Users', align: 'right' },
                    ],
                    rows: [
                        [
                            <>
                                Cohort <code>Internal team</code>
                            </>,
                            '100%',
                            '24',
                        ],
                        ['Riders', '5%', '1,610'],
                        ['Everyone else', '0%', '30,540'],
                    ],
                },
            },
            after: (
                <>
                    Rolling forward is a percentage; rolling back is the same switch. If <code>$exception</code> rates
                    climb on the new path, or a route comes back with a road in it, you turn the flag off and every
                    request is on the old engine seconds later. No deploy, no revert commit.
                </>
            ),
        },
    },
    {
        id: 'safety/coverage-error/error',
        page: 'safety',
        target: 'coverage-error',
        tool: 'error',
        label: '$exception',
        dx: 0.5,
        dy: 0,
        title: 'Errors are captured automatically',
        body: {
            why: (
                <>
                    Exception autocapture is on in project settings, which has posthog-js wrapping{' '}
                    <code>window.onerror</code> and <code>onunhandledrejection</code>. The tile failure became a{' '}
                    <code>$exception</code> event with a stack trace, grouped with the 412 other times it happened
                    tonight.
                </>
            ),
            input: {
                kind: 'code',
                language: 'js',
                context: 'autocapture + the handled path',
                snippet: `// and the handled path, captured manually:
try { await loadCoverageTiles() }
catch (err) {
  posthog.captureException(err, {
    widget: 'coverage-map',
    tile_host: 'tiles.unter.co.uk'
  })
  showFallback()  // the honest error card you see here
}`,
            },
            output: {
                context: 'error tracking · this issue',
                table: {
                    kind: 'fieldValue',
                    rows: [
                        { field: 'Issue', value: 'Coverage tiles failing (403)' },
                        { field: 'Occurrences', value: <strong>412 tonight</strong> },
                        { field: 'First seen', value: '2 hours ago, still climbing' },
                        { field: 'Session replay', value: 'linked to each occurrence' },
                    ],
                },
            },
            after: (
                <>
                    Each <code>$exception</code> is linked to its PostHog session replay, so you can watch what the user
                    saw before reading the stack trace.
                </>
            ),
        },
    },
    {
        id: 'safety/coverage-error/selfdriving',
        page: 'safety',
        target: 'coverage-error',
        tool: 'selfdriving',
        label: 'inbox report',
        dx: 0.5,
        dy: 1.0,
        title: 'Errors cluster into one report with a fix',
        body: {
            why: (
                <>
                    PostHog's error tracking is a signal source, so the 412 exceptions from this widget are already
                    feeding the self-improving loop. Signals get deduplicated and clustered into one report, an agent
                    digs through the codebase and the data to confirm it, and it comes back with a priority.
                </>
            ),
            input: {
                kind: 'config',
                context: 'no code, a signal source',
                rows: [
                    {
                        field: 'Source',
                        value: (
                            <>
                                <code>$exception</code> events + service logs
                            </>
                        ),
                    },
                    { field: 'Clusters', value: 'Dedupes and groups related signals' },
                    { field: 'Acts via', value: 'A PR in a sandbox against your CI' },
                ],
            },
            output: {
                context: 'inbox · high priority',
                table: {
                    kind: 'fieldValue',
                    rows: [
                        { field: 'Report', value: 'Coverage tile requests failing (403)' },
                        {
                            field: 'From',
                            value: (
                                <>
                                    <code>$exception</code> ×412 · tile service logs
                                </>
                            ),
                        },
                        { field: 'Cause', value: 'API key expired 366 days ago' },
                        { field: 'Action', value: 'PR open: rotate + calendar the key, fall back to a cached layer' },
                    ],
                },
            },
            after: (
                <>
                    Reports it can act on arrive as a pull request, built in a sandbox against your CI and code review.
                    Ones that need a judgement call wait in the inbox instead of guessing.
                </>
            ),
        },
    },
    {
        id: 'safety/coverage-map/error',
        page: 'safety',
        target: 'coverage-map',
        tool: 'error',
        label: 'source maps',
        dx: 0.08,
        dy: 0.92,
        title: 'Turning minified errors back into your code',
        body: {
            why: (
                <>
                    Production JavaScript is minified, so a raw stack trace points at <code>t.exports</code> on line 1
                    of a bundle. Two commands in CI, after the build, turn it back into your own file and line numbers.
                </>
            ),
            input: {
                kind: 'code',
                language: 'bash',
                context: 'in CI, after the build',
                snippet: `posthog-cli sourcemap inject --directory ./dist
posthog-cli sourcemap upload --directory ./dist
# deploy the injected assets, not a
# pre-inject copy, or the upload can't match`,
            },
            output: {
                context: 'a stack frame, resolved',
                table: {
                    kind: 'columns',
                    columns: [{ label: 'State' }, { label: 'Top frame' }],
                    rows: [
                        ['Minified', <code>t.exports @ main.a91f.js:1:24855</code>],
                        ['Resolved', <code>loadCoverageTiles @ tiles.ts:42:11</code>],
                    ],
                },
            },
            after: (
                <>
                    Grouping depends on this too. Without resolved stack traces the fingerprint falls back to minified
                    frames, and those change every build, so one bug arrives as a fresh issue each release.
                </>
            ),
        },
    },
    {
        id: 'safety/safety-longread/web',
        page: 'safety',
        target: 'safety-longread',
        tool: 'web',
        label: '$pageleave',
        dx: 1.0,
        dy: 0.15,
        title: 'How far people scroll, and how long they stay',
        body: {
            why: (
                <>
                    Does anyone read the conservation explainer, or do they bounce at the hero? <code>$pageleave</code>{' '}
                    carries scroll depth with it while autocapture is on, so both questions are answered without any
                    extra code.
                </>
            ),
            input: {
                kind: 'code',
                language: 'js',
                context: 'no extra code',
                snippet: `// nothing. $pageleave carries time on page
// and scroll depth while autocapture is on,
// and web analytics charts both per page`,
            },
            output: {
                context: 'web analytics · /safety (7d)',
                table: {
                    kind: 'fieldValue',
                    rows: [
                        { field: 'Avg time on page', value: '2:41' },
                        { field: 'Reach "Why 13 centimetres?"', value: <strong>71%</strong> },
                        { field: 'Bounce at the hero', value: '12%' },
                    ],
                },
            },
            after: <>71% of readers reach "Why 13 centimetres?", so anything below that point is worth moving up.</>,
        },
    },
    {
        id: 'safety/btn-coverage-retry/replay',
        page: 'safety',
        target: 'btn-coverage-retry',
        tool: 'replay',
        label: 'rage clicks',
        dx: 1.35,
        dy: 0.5,
        title: 'Rage clicks are tagged for you',
        body: {
            why: (
                <>
                    When something doesn't respond, people click it again and again. posthog-js tags three fast clicks
                    on the same element as a <code>$rageclick</code>, so the recordings of this button being hammered
                    are one filter away in replay.
                </>
            ),
            input: {
                kind: 'config',
                context: 'no code, auto-tagged',
                rows: [
                    { field: 'Lines of code', value: '0' },
                    {
                        field: 'Tagged by',
                        value: (
                            <>
                                <code>$rageclick</code> (rapid click cluster)
                            </>
                        ),
                    },
                    { field: 'Filter in', value: 'Session replay' },
                ],
            },
            output: {
                context: 'session replay · #btn-coverage-retry',
                table: {
                    kind: 'fieldValue',
                    rows: [
                        { field: 'Rage-click sessions', value: '47 over 7 days' },
                        { field: 'Avg clicks / session', value: '6.2' },
                        { field: 'Worst', value: <strong>one user, 31 clicks</strong> },
                        {
                            field: 'Each recording',
                            value: (
                                <>
                                    linked to its <code>$exception</code>
                                </>
                            ),
                        },
                    ],
                },
            },
            after: (
                <>
                    One person clicked it 31 times. The <code>$exception</code> says what threw, the recording shows
                    what they experienced, and the next marker has the server logs from the same minutes.
                </>
            ),
        },
    },
    {
        id: 'safety/coverage-map/logs',
        page: 'safety',
        target: 'coverage-map',
        tool: 'logs',
        label: 'tile service logs',
        // Right edge, mid-height: at the top it covered the widget's LIVE badge.
        dx: 1.0,
        dy: 0.45,
        title: 'Server logs share the timeline',
        body: {
            why: (
                <>
                    The client captured the <code>$exception</code>. The tile service's own logs (shipped via OTLP to
                    the same project) explain it.
                </>
            ),
            input: {
                kind: 'code',
                language: 'bash',
                context: 'backend, via OTLP',
                snippet: `# tile service → PostHog over OpenTelemetry
OTEL_EXPORTER_OTLP_ENDPOINT=https://eu.i.posthog.com/i/v1/logs
OTEL_EXPORTER_OTLP_HEADERS=Authorization=Bearer phc_unter_******`,
            },
            output: {
                context: 'logs · tile service',
                table: {
                    kind: 'columns',
                    columns: [{ label: 'Level' }, { label: 'Message' }],
                    rows: [
                        ['ERROR', <code>tile.fetch upstream=coverage status=403</code>],
                        ['ERROR', <code>cause=api_key_expired key_age_days=366</code>],
                    ],
                },
                footnote: (
                    <>
                        Same timestamps as the <code>$exception</code> spike. The map died of an annual key rotation
                        nobody calendared.
                    </>
                ),
            },
            after: (
                <>
                    Because logs, exceptions, and recordings share one timeline, the cause was one search away rather
                    than three tools away.
                </>
            ),
        },
    },
    {
        id: 'safety/page-help/surveys',
        page: 'safety',
        target: 'page-help',
        tool: 'surveys',
        label: 'displaySurvey()',
        dx: 0.5,
        dy: -0.1,
        title: 'Rendering a survey inside the page',
        body: {
            why: (
                <>
                    The Host page's survey shows itself when its conditions match. This one is placed in the layout
                    instead, with one call naming the element to render into, so it reads as part of the page rather
                    than an interruption.
                </>
            ),
            input: {
                kind: 'code',
                language: 'js',
                context: 'client-side, into the layout',
                snippet: `// single yes/no question: "Did this page help?"
posthog.displaySurvey(surveyId, {
  displayType: DisplaySurveyType.Inline,
  selector: '#page-help'
})`,
            },
            output: {
                context: 'responses, last 30d',
                table: {
                    kind: 'columns',
                    columns: [{ label: 'Segment' }, { label: 'Yes', align: 'right' }, { label: 'No', align: 'right' }],
                    rows: [
                        ['All sessions', '61%', '39%'],
                        ['Saw the broken map', '20%', <strong>80%</strong>],
                    ],
                },
            },
            after: (
                <>
                    Answers are events, so they join up with everything else. "No" is running 4:1 among sessions that
                    hit the broken map above, which is the outage showing up in feedback before anyone emailed support.
                </>
            ),
        },
    },
]
