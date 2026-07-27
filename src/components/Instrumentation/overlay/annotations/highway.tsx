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
        title: 'Getting events past ad blockers',
        body: {
            why: (
                <>
                    Ad blockers keep lists of known analytics domains, so events sent straight to one are the events you
                    never see. Unter bundles <code>posthog-js</code> first-party and proxies ingestion through its own
                    domain, which PostHog's docs put at 10-30% more events captured.
                </>
            ),
            code: {
                language: 'js',
                snippet: `posthog.init(token, {
  api_host: 'https://unter.co.uk/ingest',  // proxy
  ui_host:  'https://eu.posthog.com'
})
// CSP stays tight: ingestion is same-origin,
// so connect-src 'self' covers it`,
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
                    funnel gets real steps to stand on. The answers people gave on the way through ride along as
                    properties, and that's what lets you split the funnel by any of them afterwards without going back
                    to add tracking.
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
                    is excluded from recording and autocapture with one class. The test for your own app is whether a
                    single field would identify someone on its own, the way a postcode, an account number, or a full
                    name does. Those are the ones to exclude outright rather than mask.
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
        title: 'Ranking what people click, with no code',
        body: {
            why: (
                <>
                    Autocapture records the click and keeps the text of what was clicked, for links, buttons, form
                    fields, and anything styled as clickable (these FAQ rows are <code>summary</code> elements with{' '}
                    <code>cursor: pointer</code>, which is enough). So any repeated set of choices in your own product,
                    whether that's FAQ rows, nav items, filter chips, or docs links in a sidebar, can be ranked by
                    demand without shipping a line of tracking code.
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
                    A ranking like this is a list of what your page failed to say, ordered by how many people went
                    looking. The top row here beats the next by a third, which is the argument for answering it in the
                    page instead of behind a click.
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
        title: 'An AI scout watches your funnels for drops',
        body: {
            why: (
                <>
                    PostHog's product analytics scout watches funnels, retention, and paths against their own trailing
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
        id: 'highway/refer-block/experiments',
        page: 'highway',
        // The whole block, not just the button: a variant can own every string in
        // a section, and that choice is what the annotation is about.
        target: 'refer-block',
        tool: 'experiments',
        label: 'neighbor-referral-copy',
        dx: 0.5,
        dy: 1.0,
        title: 'Testing a whole block of copy, not one button',
        body: {
            why: (
                <>
                    A variant doesn't have to be one string. Here the flag returns which pitch to make, and the heading,
                    the body copy, and the button text are all read from that one answer, so civic pride and polite
                    guilt each get a coherent version of the whole section instead of a mismatched pairing.
                </>
            ),
            code: {
                language: 'js',
                snippet: `const variant = posthog.getFeatureFlag('neighbor-referral-copy')
const { heading, body, cta } = REFERRAL_COPY[variant]
// 'control'      civic pride:  "Two holes make a route"
// 'polite_guilt'               "Your fence is where
//                               the route ends"
// reading the flag logs $feature_flag_called, and that
// exposure is what PostHog splits the results on`,
            },
            after: (
                <>
                    The trade is that you learn which version won, not which sentence did. That's the right trade when
                    you want a decision and the wrong one when you want a rule about wording, so change one thing at a
                    time only once the bundle has proven there's something there. The goal metric is{' '}
                    <code>highway_signup_completed</code> from referred neighbors within 14 days.
                </>
            ),
        },
    },
    {
        id: 'highway/footer-outbound/product',
        page: 'highway',
        // The link itself rather than the paragraph around it: a fraction of a
        // wrapping block moves with every reflow, and the marker landed on the text.
        target: 'footer-outbound',
        tool: 'product',
        label: 'outbound links',
        // Just past the link's right edge (it's ~115px wide, so 1.15 clears the
        // 24px marker by about 5px) and vertically centered on it.
        dx: 1.15,
        dy: 0.5,
        title: 'Clicks that leave your site are recorded too',
        body: {
            why: (
                <>
                    Autocapture records each click with the element's <code>href</code> and text, and a link pointing at
                    another domain is no different, so every exit to a partner, a docs site, an app store, or a payment
                    provider is already measurable without wrapping any of those anchors in a handler.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `# $autocapture, grouped by element href:
hedgehogstreet.org   1,880 clicks
youtube.com/watch      642`,
            },
            after: (
                <>
                    Read these as exits rather than conversions. The click is usually the last thing in the session, and
                    whatever happened on the other domain isn't yours to see, which is the argument for sending people
                    somewhere you've instrumented when the next step actually matters.
                </>
            ),
        },
    },
]
