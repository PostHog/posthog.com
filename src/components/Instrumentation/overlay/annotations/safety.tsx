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
        title: 'This widget is broken on purpose',
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
                    Error tracking links each <code>$exception</code> to its session replay. You can watch the radar die
                    in the recording, then go fix the 403.
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
        title: 'Nobody has to notice this',
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
                    Actionable reports arrive as a pull request, built in a sandbox with your CI and code review
                    attached. The ones that need a human decision wait in your inbox instead. Either way it happened
                    while everyone was asleep, which is also when the hedgehogs were commuting.
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
        title: 'Why the stack trace is readable',
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
                    Same idea as the mobile SDKs' symbol files. Skip this step and error tracking still groups the issue
                    correctly, you just can't tell what code caused it.
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
        title: 'Content engagement, from pageleave',
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
                    71% of readers reach "Why 13 centimetres?", which is a strong case for moving the Hedgehog Street
                    link above the fold. The content team has been arguing about that link for a month; this settles it.
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
        title: 'Rage clicks, auto-detected',
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
                    One user clicked it 31 times. The <code>$exception</code> event says what threw, the recording shows
                    how it felt, and the next pin has the server logs from the same minutes.
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
        title: "The 403, from the server's side",
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
                    Finding this took one search, because the logs sit on the same timeline as the exceptions and the
                    recordings. The key expired a year to the day after someone created it. There was never a calendar
                    invite.
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
        title: 'Inline survey, rendered into the page',
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
                    Responses land as events, so they cross-reference. "No, and I have opinions" is running 4:1 among
                    sessions that met the broken badger radar, which means the feedback widget found the outage before
                    the support inbox did.
                </>
            ),
        },
    },
]
