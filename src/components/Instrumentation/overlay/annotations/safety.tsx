import React from 'react'
import { Annotation } from '../types'

export const safetyAnnotations: Annotation[] = [
    {
        id: 'safety/radar-error/error',
        page: 'safety',
        target: 'radar-error',
        tool: 'error',
        label: '$exception',
        dx: 0.5,
        dy: 0,
        title: 'Exceptions are captured automatically',
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
try { loadBadgerLayer() }
catch (err) {
  posthog.captureException(err, {
    widget: 'badger-radar',
    tile_host: 'tiles.unter.co.uk'
  })
  showFallback()  // the honest error card you see here
}`,
            },
            after: (
                <>
                    Each <code>$exception</code> is linked to its session replay, so you can watch what the user saw
                    before reading the stack trace.
                </>
            ),
        },
    },
    {
        id: 'safety/radar-error/selfdriving',
        page: 'safety',
        target: 'radar-error',
        tool: 'selfdriving',
        label: 'inbox report',
        dx: 0.5,
        dy: 1.0,
        title: 'Signals cluster into one report with a fix',
        body: {
            why: (
                <>
                    Error tracking is a signal source, so the 412 exceptions from this widget are already feeding the
                    self-improving loop. Signals get deduplicated and clustered into one report, an agent digs through
                    the codebase and the data to confirm it, and it comes back with a priority.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `INBOX · high priority
Badger tile requests failing (403)
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
        id: 'safety/badger-radar/error',
        page: 'safety',
        target: 'badger-radar',
        tool: 'error',
        label: 'source maps',
        dx: 0.08,
        dy: 0.92,
        title: 'Source maps make stack traces readable',
        body: {
            why: (
                <>
                    Production JavaScript is minified, so a raw stack trace points at <code>t.exports</code> on line 1
                    of a bundle. Uploading source maps at build time is what turns it back into your own file and line
                    numbers.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `# in CI, after the build:
npx @posthog/wizard upload-source-maps
# without it:  t.exports @ main.a91f.js:1:24855
# with it:     loadBadgerLayer @ radar.ts:42:11`,
            },
            after: (
                <>
                    Same idea as symbol files on mobile. Skip it and errors still group correctly, you just can't tell
                    which line caused them.
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
                    plus scroll depth (captured with the modern defaults) answer it without any extra code.
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
        id: 'safety/btn-radar-retry/replay',
        page: 'safety',
        target: 'btn-radar-retry',
        tool: 'replay',
        label: 'rage clicks',
        dx: 1.35,
        dy: 0.5,
        title: 'Session replay tags rage clicks for you',
        body: {
            why: (
                <>
                    Nobody clicks Retry once. Session replay tags rage clicks automatically, so the recordings of this
                    exact button being hammered are already a filtered list.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `# replay → filters:
rage_click on #btn-radar-retry   47 sessions
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
        id: 'safety/badger-radar/logs',
        page: 'safety',
        target: 'badger-radar',
        tool: 'logs',
        label: 'tile service logs',
        dx: 0.925,
        dy: 0.07,
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
                snippet: `ERROR tile.fetch upstream=badger-layer status=403
      cause=api_key_expired  key_age_days=366
# same timestamps as the $exception spike.
# the badger radar died of an annual key
# rotation nobody calendared.`,
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
        label: 'renderSurvey()',
        dx: 0.5,
        dy: -0.1,
        title: 'Rendering a survey inside the page',
        body: {
            why: (
                <>
                    The popover on the highway page renders itself; this one is embedded in the layout with one call, so
                    it reads as part of the page rather than an interruption.
                </>
            ),
            code: {
                language: 'js',
                snippet: `posthog.renderSurvey(
  'survey_safety_helpful',
  '#page-help'
)`,
            },
            after: (
                <>
                    Answers are events, so they join up with everything else. "No" is running 4:1 among sessions that
                    hit the broken radar above, which is the outage showing up in feedback before anyone emailed
                    support.
                </>
            ),
        },
    },
]
