import React from 'react'
import { Annotation } from '../types'

export const highwayAnnotations: Annotation[] = [
    {
        id: 'highway/topnav/core',
        page: 'highway',
        target: 'topnav',
        product: 'core',
        label: '/ingest proxy',
        dx: 0.5,
        dy: 0.5,
        title: 'Served first-party, through a reverse proxy',
        body: {
            why: (
                <>
                    Tracker blockers eat 30–40% of a marketing site's events if you load analytics from a third-party
                    domain. Snuffl serves <code>posthog-js</code> bundled first-party and proxies ingestion through its
                    own domain.
                </>
            ),
            code: {
                language: 'js',
                snippet: `posthog.init(token, {
  api_host: 'https://snuffl.co.uk/ingest',  // proxy
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
        product: 'product',
        label: 'highway_signup_completed',
        dx: 0,
        dy: 0.12,
        title: 'The host acquisition funnel',
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
        product: 'replay',
        label: 'ph-no-capture',
        dx: -0.06,
        dy: 0.5,
        title: 'ph-no-capture on the postcode',
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
        product: 'logs',
        label: 'OTLP logs',
        dx: 0.5,
        dy: 1.15,
        title: 'Server-side: the API call logs to PostHog too',
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
        id: 'highway/survey-pop/surveys',
        page: 'highway',
        target: 'survey-pop',
        product: 'surveys',
        label: 'popover survey',
        dx: 0.9,
        dy: 0,
        title: 'Popover survey, nothing shipped',
        body: {
            why: (
                <>
                    This isn't custom UI. It's a PostHog popover survey, rendered by the snippet itself, targeted at:
                    URL contains <code>/highway</code>, shown once, only after <code>highway_signup_completed</code>.
                </>
            ),
            code: {
                language: 'js',
                snippet: `// amount of code shipped for this survey:
//   (none — configured in the PostHog UI)`,
            },
            after: (
                <>
                    Responses land as events on the person who gave them. Filter for everyone who answered "The
                    neighbour (ongoing situation)", then check whether that cohort finished signup anyway. Most did. The
                    neighbour was not consulted.
                </>
            ),
        },
    },
    {
        id: 'highway/impact-calc/product',
        page: 'highway',
        target: 'impact-calc',
        product: 'product',
        label: 'impact_calculated',
        dx: 0.5,
        dy: 0,
        title: 'One event per decision',
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
                    Dashboard tile it feeds: the median slider position is 2 holes, and the median registration is 1.
                    Someone in growth now owns the difference between what people drag and what they cut.
                </>
            ),
        },
    },
    {
        id: 'highway/host-faq/product',
        page: 'highway',
        target: 'host-faq',
        product: 'product',
        label: '$autocapture',
        dx: 0.52,
        dy: 0.24,
        title: 'The FAQ is an objection ranking',
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
                    The most-opened question is whatever the landing page failed to answer. "What about my dog?" has
                    been winning by 3×, so the dog reassurance is about to move up into the hero copy.
                </>
            ),
        },
    },
    {
        id: 'highway/btn-refer/expflags',
        page: 'highway',
        target: 'btn-refer',
        product: 'expflags',
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
//              Colin walks the long way"`,
            },
            after: (
                <>
                    Goal metric: <code>highway_signup_completed</code> by referred neighbours within 14 days. Guilt is
                    currently winning by 22%, which says something about Britain that Snuffl chooses not to examine.
                </>
            ),
        },
    },
]
