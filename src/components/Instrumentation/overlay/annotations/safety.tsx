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
        title: 'How fast each page felt to load',
        body: {
            why: (
                <>
                    Turning on web vitals autocapture in project settings starts a <code>$web_vitals</code> event on
                    every page load, carrying the four web vitals PostHog tracks. Nobody adds timing code, and it's a
                    separate switch from autocapture, so you can have one without the other.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `$web_vitals  # properties on one event:
$web_vitals_LCP_value  2840  # ms, largest paint
$web_vitals_FCP_value  1210  # ms, first paint
$web_vitals_INP_value    64  # ms, responsiveness
$web_vitals_CLS_value  0.31  # layout shift`,
            },
            after: (
                <>
                    This page's LCP is the hero you're reading, and its layout shift is the coverage map below loading
                    late and pushing everything down. The toolbar shows both for whatever page you're on, so slow pages
                    are a fact rather than a hunch.
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
            code: {
                language: 'js',
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
            after: (
                <>
                    Rolling forward is a percentage, and rolling back is the same switch. If <code>$exception</code>{' '}
                    rates climb on the new path, or a route comes back with a road in it, you turn the flag off and
                    every request is on the old engine seconds later. No deploy, no revert commit, nobody sent across
                    tarmac while you find out.
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
            code: {
                language: 'js',
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
            code: {
                language: 'bash',
                snippet: `INBOX · high priority
Coverage tile requests failing (403)
  from  $exception ×412 · tile service logs
  cause api key expired 366 days ago
  → pull request open: rotate + calendar
    the key, fall back to a cached layer`,
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
            code: {
                language: 'bash',
                snippet: `posthog-cli sourcemap inject --directory ./dist
posthog-cli sourcemap upload --directory ./dist
# then deploy the injected assets, not a
# pre-inject copy, or the upload can't match
# without it:  t.exports @ main.a91f.js:1:24855
# with it:     loadCoverageTiles @ tiles.ts:42:11`,
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
        title: 'Time on page and scroll depth, free',
        body: {
            why: (
                <>
                    Does anyone read the conservation explainer, or do they bounce at the hero? <code>$pageleave</code>{' '}
                    carries scroll depth with it while autocapture is on, so both questions are answered without any
                    extra code.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `# per-page, out of the box:
$pageleave  →  time on page, scroll depth
# web analytics: /safety avg 2:41,
# 71% reach "Why 13 centimetres?"`,
            },
            after: (
                <>
                    71% of readers reach "Why 13 centimetres?", so anything below that point is worth moving up. No
                    tracking code was written to learn this.
                </>
            ),
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
                    Nobody clicks Retry once. posthog-js tags a rapid cluster of clicks as <code>$rageclick</code> on
                    its own, so the recordings of this exact button being hammered are one filter away in replay.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `# replay → filters:
$rageclick on #btn-coverage-retry  47 sessions
# avg 6.2 clicks per session. one user: 31.
# each recording is linked to its $exception`,
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
            code: {
                language: 'bash',
                snippet: `ERROR tile.fetch upstream=coverage status=403
      cause=api_key_expired  key_age_days=366
# same timestamps as the $exception spike.
# the map died of an annual key rotation
# nobody calendared.`,
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
            code: {
                language: 'js',
                snippet: `posthog.displaySurvey(surveyId, {
  displayType: DisplaySurveyType.Inline,
  selector: '#page-help'
})`,
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
