import React from 'react'
import Link from 'components/Link'
import { Annotation } from '../types'

export const highwayAnnotations: Annotation[] = [
    {
        id: 'highway/topnav/core',
        page: 'highway',
        target: 'topnav',
        tool: 'core',
        label: '/ingest proxy',
        dx: 0.5,
        dy: 0.5,
        title: 'Served first-party, through a reverse proxy',
        body: {
            why: (
                <>
                    Tracker blockers eat 30–40% of a marketing site's events if you load analytics from a third-party
                    domain. Unter serves <code>posthog-js</code> bundled first-party and proxies ingestion through its
                    own domain.
                </>
            ),
            code: {
                language: 'js',
                snippet: `posthog.init(token, {
  api_host: 'https://unter.co.uk/ingest',  // proxy
  ui_host:  'https://eu.posthog.com'
})
// CSP stays tight:
// connect-src 'self' https://*.posthog.com`,
            },
            after: (
                <>
                    House rule from the install: a missing PostHog config must never break the app. Every call site is
                    guarded (<code>posthog?.capture(…)</code>) and the site builds and boots with no analytics env set
                    at all.
                </>
            ),
        },
    },
    {
        id: 'highway/hw-form/product',
        page: 'highway',
        target: 'hw-form',
        tool: 'product',
        label: 'highway_signup_completed',
        dx: 0,
        dy: 0.12,
        title: 'One event marks the signup complete',
        body: {
            why: (
                <>
                    Host signup is the supply side of the marketplace, so each step gets its own named event and the
                    funnel gets real steps to stand on.
                </>
            ),
            code: {
                language: 'js',
                snippet: `posthog.capture('highway_signup_started')
posthog.capture('highway_signup_completed', {
  fence_type: 'timber_panel',
  borough: 'hackney',   // postcode → borough, server-side
  has_neighbour_consent: false  // they always say false
})`,
            },
            after: (
                <>
                    Funnel insight: started → completed, broken down by fence type. If "Brick wall (we'll talk)"
                    converts at 4%, the work is in the select option rather than the landing page.
                </>
            ),
        },
    },
    {
        id: 'highway/input-postcode/replay',
        page: 'highway',
        target: 'input-postcode',
        tool: 'replay',
        label: 'ph-no-capture',
        dx: -0.06,
        dy: 0.5,
        title: 'Leaving one field out of recordings',
        body: {
            why: (
                <>
                    Masking inputs isn't enough here. A postcode narrows a host to about 15 houses, so the whole field
                    is excluded from recording and autocapture with one class.
                </>
            ),
            code: {
                language: 'html',
                snippet: `<div class="field ph-no-capture">
  <input id="input-postcode" … />
</div>`,
            },
            after: (
                <>
                    Playback shows an empty block of the same size where the field sits, so the interaction is still
                    visible in recordings. The postcode itself never leaves the browser.
                </>
            ),
        },
    },
    {
        id: 'highway/btn-start-cutting/logs',
        page: 'highway',
        target: 'btn-start-cutting',
        tool: 'logs',
        label: 'OTLP logs',
        dx: 0.5,
        dy: 1.15,
        title: 'Backend logs land in the same project',
        body: {
            why: (
                <>
                    Submitting hits <code>POST /api/highways</code>. The backend ships its logs to PostHog over standard
                    OpenTelemetry (OTLP), meaning no vendor SDK, just an endpoint and the project token.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `# backend log stream, same project as the analytics
INFO  highway.registered  gap_id=g_9241  borough=hackney
WARN  gap.measure  nominal=13cm measured=11.8cm
      → flagged for re-measure  # stuck-hedgehog risk`,
            },
            after: (
                <>
                    Same project means one search across the stack: a host complains signup failed → find their session
                    replay → jump to the server logs for that exact request.
                </>
            ),
        },
    },
    {
        id: 'highway/survey-badge/surveys',
        page: 'highway',
        target: 'survey-badge',
        tool: 'surveys',
        label: 'feedback button survey',
        dx: 0.5,
        dy: 0,
        title: 'Surveys are built in PostHog, not in your code',
        body: {
            why: (
                <>
                    Click the badge to open it. This is a PostHog survey, not custom UI: you write the question in
                    PostHog, point it at a CSS selector, and the snippet renders it. Nothing about it ships in a deploy.
                </>
            ),
            code: {
                language: 'js',
                snippet: `// lines of code for this survey: 0
// in PostHog:  type     feedback button
//              attach   .un-survey-badge
//              question "What nearly stopped you?"`,
            },
            after: (
                <>
                    Each answer is captured as an event on the person who gave it, so you can filter to the people who
                    picked one option and look at what they did next.
                </>
            ),
        },
    },
    {
        id: 'highway/impact-calc/product',
        page: 'highway',
        target: 'impact-calc',
        tool: 'product',
        label: 'impact_calculated',
        dx: 0.5,
        dy: 0,
        title: 'Capture the result, not every keystroke',
        body: {
            why: (
                <>
                    The slider is the most-touched thing on this page. Fired per tick it would be thousands of junk
                    events a day, so it captures once, past tense, when the hand comes off.
                </>
            ),
            code: {
                language: 'js',
                snippet: `slider.addEventListener('change', () =>  // not 'input'
  posthog?.capture('impact_calculated', {
    holes: 3,
    projected_hogs_per_night: 21
  })
)`,
            },
            after: (
                <>
                    The median person drags the slider to 2 holes but registers 1. That gap is measurable now, which is
                    the first step to closing it.
                </>
            ),
        },
    },
    {
        id: 'highway/host-faq/product',
        page: 'highway',
        target: 'host-faq',
        tool: 'product',
        label: '$autocapture',
        dx: 0.52,
        dy: 0.24,
        title: 'Autocapture keeps the text people clicked',
        body: {
            why: (
                <>
                    No code behind this pin. Autocapture logs every click on every <code>&lt;summary&gt;</code> element,
                    and it keeps the element's text.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `# insight: $autocapture clicks, grouped by
# element text, on /highway:
"What about my dog?"        1,204  ← top objection
"Will the hedgehogs pay me?"  892
"Can I close it in winter?"   347`,
            },
            after: (
                <>
                    The most-opened question is usually the one the page above it failed to answer. Here that's the dog
                    question by 3x, so the answer is worth moving into the page itself.
                </>
            ),
        },
    },
    {
        id: 'highway/hw-form/selfdriving',
        page: 'highway',
        target: 'hw-form',
        tool: 'selfdriving',
        label: 'product analytics scout',
        dx: 1.0,
        dy: 0.62,
        title: 'Scouts check your funnels on a schedule',
        body: {
            why: (
                <>
                    The product analytics scout watches funnels, retention, and paths against their own trailing
                    baseline. Host signup dropped and it noticed before anyone opened the dashboard.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `INBOX · product analytics scout · high
Host signup conversion down 18% (7d)
  breakdown: fence_type = brick_wall
  those hosts drop at the fence select
  → pull request open: explain the
    "we'll talk" option inline`,
            },
            after: (
                <>
                    Scouts read your data through the same{' '}
                    <Link to="/docs/model-context-protocol" disablePrefetch externalNoIcon>
                        PostHog MCP
                    </Link>{' '}
                    you can point Claude Code at, and keep a memory between runs, so they dedupe against themselves
                    instead of re-reporting this every week.
                </>
            ),
        },
    },
    {
        id: 'highway/btn-refer/experiments',
        page: 'highway',
        target: 'btn-refer',
        tool: 'experiments',
        label: 'neighbour-referral-copy',
        dx: 0.5,
        dy: 1.18,
        title: 'Referral copy experiment',
        body: {
            why: (
                <>
                    Supply grows fastest neighbour-by-neighbour, so the referral CTA is a proper experiment: does
                    polite-guilt or civic-pride get more holes cut?
                </>
            ),
            code: {
                language: 'js',
                snippet: `const v = posthog.getFeatureFlag('neighbour-referral-copy')
// 'control' → "Send a very polite note"
// 'guilt'   → "Your fence is the reason
//              Max walks the long way"`,
            },
            after: (
                <>
                    The goal metric is <code>highway_signup_completed</code> from referred neighbours within 14 days.
                    Guilt is ahead by 22%, so that's the copy that ships.
                </>
            ),
        },
    },
]
