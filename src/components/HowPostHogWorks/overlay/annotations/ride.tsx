import React from 'react'
import { Annotation } from '../types'

export const rideAnnotations: Annotation[] = [
    {
        id: 'ride/topnav/core',
        page: 'ride',
        target: 'topnav',
        product: 'core',
        label: 'posthog-js snippet',
        dx: 0.315,
        dy: 0.5,
        title: 'The snippet: one tag in <head>',
        body: {
            why: (
                <>
                    Everything on this page hangs off one script tag. UK hedgehogs are GDPR animals, so events go to
                    PostHog's EU Cloud.
                </>
            ),
            code: {
                language: 'js',
                snippet: `// in <head>, before anything else
posthog.init('phc_snuffl_******', {
  api_host: 'https://eu.i.posthog.com',
  defaults: '2025-05-24',  // sane modern defaults:
  // capture_pageview: 'history_change' (SPA-safe)
  // person_profiles: 'identified_only'
})`,
            },
            after: (
                <>
                    That <code>defaults</code> date matters here: this site is a SPA, and history-change pageviews mean
                    the Ride → Highway → Safety navigation you just did was captured without any router code.
                </>
            ),
        },
    },
    {
        id: 'ride/hero-headline/expflags',
        page: 'ride',
        target: 'hero-headline',
        product: 'expflags',
        label: 'hero-headline-test',
        dx: 0.72,
        dy: 0.1,
        title: 'Headline A/B test',
        body: {
            why: (
                <>
                    The hero copy is an experiment gated by a feature flag. Half of visitors see this; half see{' '}
                    <i>"The whole city is a garden."</i>
                </>
            ),
            code: {
                language: 'js',
                snippet: `const v = posthog.getFeatureFlag('hero-headline-test')
// 'control' → "Go anywhere. Under everything."
// 'test'    → "The whole city is a garden."
heroEl.textContent = COPY[v]`,
            },
            after: (
                <>
                    Exposure is logged automatically as <code>$feature_flag_called</code>. The primary metric is{' '}
                    <code>ride_prices_viewed</code> (the pin on the button below), so the experiment reads directly
                    against the conversion it's supposed to move.
                </>
            ),
        },
    },
    {
        id: 'ride/btn-see-prices/product',
        page: 'ride',
        target: 'btn-see-prices',
        product: 'product',
        label: 'ride_prices_viewed',
        dx: 0.5,
        dy: 1.0,
        title: 'The conversion event',
        body: {
            why: (
                <>
                    The click is already in autocapture. The named event exists so the funnel doesn't depend on a CSS
                    selector surviving the next redesign, and so the properties arrive with a schema someone chose on
                    purpose.
                </>
            ),
            code: {
                language: 'js',
                snippet: `posthog.capture('ride_prices_viewed', {
  distance_m: 42,
  gaps_on_route: 2,
  tier_preselected: 'solo',
  passenger_weight_class: 'standard'
})`,
            },
            after: (
                <>
                    Funnel: <code>$pageview → ride_prices_viewed → ride_requested</code>. When the headline experiment
                    runs, this event is its success metric.
                </>
            ),
        },
    },
    {
        id: 'ride/ride-form/replay',
        page: 'ride',
        target: 'ride-form',
        product: 'replay',
        label: 'maskAllInputs',
        dx: -0.045,
        dy: 0.22,
        title: 'Replay, with burrows masked',
        body: {
            why: (
                <>
                    Session replay records the quote flow so you can watch where hedgehogs abandon it. But pickup and
                    destination are where an animal sleeps, which is PII by any reasonable reading.
                </>
            ),
            code: {
                language: 'js',
                snippet: `session_recording: {
  maskAllInputs: true,   // burrow addresses render as ****
  maskInputOptions: { password: true }
}`,
            },
            after: (
                <>
                    Masking happens in the browser, so the real values never reach PostHog's servers. A recording still
                    shows the stall on the destination field. The destination itself stays on Colin's machine.
                </>
            ),
        },
    },
    {
        id: 'ride/tier-xl/product',
        page: 'ride',
        target: 'tier-xl',
        product: 'product',
        label: 'ride_tier_selected',
        dx: 0.5,
        dy: 0,
        title: 'Tier comparison behavior',
        body: {
            why: (
                <>
                    Which tier do people hover, open, and actually pick? Autocapture gets the clicks; one custom event
                    captures the decision with context.
                </>
            ),
            code: {
                language: 'js',
                snippet: `posthog.capture('ride_tier_selected', {
  tier: 'xl',
  price_slugs: 5,
  viewed_tiers: ['solo', 'xl']
})`,
            },
            after: (
                <>
                    Insight this feeds: XL selection rate by referrer. (Hedgehog Street traffic skews Solo. Reddit
                    traffic skews XL. No further comment.)
                </>
            ),
        },
    },
    {
        id: 'ride/chat-widget/llm',
        page: 'ride',
        target: 'chat-widget',
        product: 'llm',
        label: '$ai_generation',
        dx: 0.12,
        dy: 0,
        title: 'Prickles is an LLM. Bill accordingly.',
        body: {
            why: (
                <>
                    The concierge runs on an LLM server-side, and every completion is captured as an{' '}
                    <code>$ai_generation</code> event. Cost, latency, and tokens land in LLM analytics next to the
                    product data.
                </>
            ),
            code: {
                language: 'js',
                snippet: `{
  event: '$ai_generation',
  properties: {
    $ai_model: 'claude-sonnet-5',
    $ai_provider: 'anthropic',
    $ai_input_tokens: 214,
    $ai_output_tokens: 96,
    $ai_latency: 1.4,        // seconds
    $ai_total_cost_usd: 0.0031,
    $ai_trace_id: 'trace_7f2…'
  }
}`,
            },
            after: (
                <>
                    Because it shares person and session with everything else, you can ask whether visitors who talk to
                    Prickles convert better than ones who don't, and whether that's worth $0.003 a conversation.
                </>
            ),
        },
    },
    {
        id: 'ride/chat-bot-msg/llm',
        page: 'ride',
        target: 'chat-bot-msg',
        product: 'llm',
        label: '$ai_trace',
        dx: 0.06,
        dy: 1.06,
        title: 'The pipeline behind one answer',
        body: {
            why: (
                <>
                    Prickles pulled the CD-case rule from the gap docs before answering. The whole pipeline is one{' '}
                    <code>$ai_trace</code> with child spans, viewable as a tree in LLM analytics.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `$ai_trace  trace_7f2…
├─ $ai_span        vector search: gap reviews   112ms
├─ $ai_span        fetch: gap spec (13cm doc)    38ms
└─ $ai_generation  claude-sonnet-5              1.4s
   # $ai_is_error: false`,
            },
            after: (
                <>
                    When an answer comes back wrong or slow, the tree shows which step did it. Either retrieval returned
                    junk, or retrieval was fine and the model ignored what it was handed. Those are different bugs with
                    different fixes.
                </>
            ),
        },
    },
    {
        id: 'ride/garden-map/web',
        page: 'ride',
        target: 'garden-map',
        product: 'web',
        label: '$pageview',
        dx: 0.05,
        dy: 0.1,
        title: 'Web analytics: the free layer',
        body: {
            why: (
                <>
                    No code on this pin. <code>$pageview</code> / <code>$pageleave</code>, referrers, UTM params,
                    channel type, device, geo, and Web Vitals are all captured by the snippet and land in a ready-made
                    dashboard.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `# what marketing checks each morning, zero setup:
Channels:  hedgehogstreet.org / organic / social
UTMs:      utm_campaign=wild_london_bump
Vitals:    LCP 1.9s · CLS 0.02 · INP 140ms`,
            },
            after: (
                <>
                    The traffic spike after Wild London aired shows up in this dashboard on its own. Nobody wrote a line
                    of code to chart the Attenborough bump.
                </>
            ),
        },
    },
    {
        id: 'ride/promo-banner/web',
        page: 'ride',
        target: 'promo-banner',
        product: 'web',
        label: 'utm_campaign',
        dx: 0.58,
        dy: 0.5,
        title: 'UTMs on the press links',
        body: {
            why: (
                <>
                    Every link in the Wild London press push carries UTMs. The snippet reads them off the first{' '}
                    <code>$pageview</code>. No extra code, no redirect service.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `?utm_source=bbc&utm_medium=pr
&utm_campaign=wild_london
# web analytics → Channels:
#   bbc / pr        11,204 visitors  ↑340%
#   hedgehogstreet   2,911 visitors`,
            },
            after: (
                <>
                    The banner itself is measured by autocapture: clicks on the link vs. sessions that saw it. If the
                    banner doesn't out-convert the hero, it goes.
                </>
            ),
        },
    },
    {
        id: 'ride/acct-row/product',
        page: 'ride',
        target: 'acct-row',
        product: 'product',
        label: 'identify()',
        dx: 0.028,
        dy: 0.5,
        title: 'identify() at login',
        body: {
            why: (
                <>
                    Before login, events are cheap anonymous events (<code>person_profiles: 'identified_only'</code>).
                    At login, one call merges the whole pre-login journey into the person.
                </>
            ),
            code: {
                language: 'js',
                snippet: `// on auth success — server fires the event,
// client links the identity:
posthog.identify('hog_412', { tier: 'solo' })
posthog.capture('auth_sign_in_completed')
// stable, unique, non-PII id — never the email
// posthog.reset() ONLY on logout, never on an
// anonymous page load (that orphans the history)`,
            },
            after: (
                <>
                    Get either rule wrong and one hedgehog turns into four separate users, and the retention chart lies
                    to you for a quarter before anyone notices.
                </>
            ),
        },
    },
    {
        id: 'ride/btn-reserve/expflags',
        page: 'ride',
        target: 'btn-reserve',
        product: 'expflags',
        label: 'reserve-rollout',
        dx: 0.5,
        dy: 1.15,
        title: 'Reserve ships behind a plain flag',
        body: {
            why: (
                <>
                    Reserve is new and touchy (it holds real gaps). It ships behind a plain feature flag, released
                    borough by borough, starting with 20% of Hackney.
                </>
            ),
            code: {
                language: 'js',
                snippet: `if (posthog.isFeatureEnabled('reserve-rollout')) {
  showReserveRow()
}
// flag targeting: cohort "Hackney hosts ≥ 90 days"
// watch: crossing_reserved conversion
//        + $exception rate for the new code path`,
            },
            after: (
                <>
                    Same flag UI as the headline experiment, doing a different job. If <code>$exception</code> rates
                    climb in the new code path, the flag flips off from the PostHog UI, without a deploy, before anyone
                    is stranded at a held gap.
                </>
            ),
        },
    },
    {
        id: 'ride/btn-brood/product',
        page: 'ride',
        target: 'btn-brood',
        product: 'product',
        label: "group('brood')",
        dx: 0.5,
        dy: 1.15,
        title: 'Broods use group analytics',
        body: {
            why: (
                <>
                    A brood is a unit of six hedgehogs acting as one household. Group analytics models that directly
                    instead of stuffing a brood_id property on every event.
                </>
            ),
            code: {
                language: 'js',
                snippet: `posthog.group('brood', 'brood_812', {
  hoglets: 4,
  borough: 'hackney'
})
// now every event is person-level AND brood-level`,
            },
            after: (
                <>
                    Retention can now be asked at the household level. Does brood_812 still cross in March? Which
                    boroughs sign up whole families, and which sign up loners who never invite anyone?
                </>
            ),
        },
    },
    {
        id: 'ride/app-row/core',
        page: 'ride',
        target: 'app-row',
        product: 'core',
        label: 'mobile SDKs',
        dx: 0.5,
        dy: -0.05,
        title: 'Same person, web to app',
        body: {
            why: (
                <>
                    The mobile apps run <code>posthog-ios</code> / <code>posthog-android</code> pointed at the same
                    project, configured from the same env vars the web build uses.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `POSTHOG_PROJECT_TOKEN=phc_snuffl_******
POSTHOG_HOST=https://eu.i.posthog.com
# app calls identify('hog_412') after login →
# web anon session + app sessions stitch into
# one person, one timeline`,
            },
            after: (
                <>
                    The stitched timeline reads: arrived from the BBC link, requested a quote, scanned the QR, first
                    crossing in the app two nights later. All of it on one person record, which is what makes the Wild
                    London campaign attributable to actual crossings.
                </>
            ),
        },
    },
]
