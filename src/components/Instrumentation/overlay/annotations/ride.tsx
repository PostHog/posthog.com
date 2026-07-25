import React from 'react'
import Link from 'components/Link'
import { Annotation } from '../types'

export const rideAnnotations: Annotation[] = [
    {
        id: 'ride/topnav/core',
        page: 'ride',
        target: 'topnav',
        tool: 'core',
        label: 'posthog-js snippet',
        dx: 0.315,
        dy: 0.5,
        title: 'The snippet: one tag in <head>',
        body: {
            why: (
                <>
                    One script tag in <code>&lt;head&gt;</code> is what makes every other marker on this page possible.
                    It captures pageviews, clicks, and errors on its own, and this project points at PostHog's EU Cloud
                    because the users are in the UK.
                </>
            ),
            code: {
                language: 'js',
                snippet: `// in <head>, before anything else
posthog.init('phc_unter_******', {
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
        tool: 'expflags',
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
        id: 'ride/input-destination/selfdriving',
        page: 'ride',
        target: 'input-destination',
        tool: 'selfdriving',
        label: 'session replay scout',
        dx: 0.88,
        dy: 0.5,
        title: 'Friction nobody filed a ticket about',
        body: {
            why: (
                <>
                    The{' '}
                    <Link to="/docs/self-driving/scouts" disablePrefetch externalNoIcon>
                        session replay scout
                    </Link>{' '}
                    watches recordings for friction clusters (rage clicks, dead clicks) and groups them by what people
                    were doing. It found one on the destination field in the recordings this form produces.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `INBOX · session replay scout · medium
Rage-click cluster: destination field
  214 sessions over 7 days
  all outside London, where the gap
  database has no coverage yet
  → recordings attached as evidence`,
            },
            after: (
                <>
                    Nobody complained, because nobody knew who to complain to. Every report is also a{' '}
                    <code>$scout_report_emitted</code> event, so you can chart or route your scouts' findings like any
                    other event.
                </>
            ),
        },
    },
    {
        id: 'ride/btn-see-prices/product',
        page: 'ride',
        target: 'btn-see-prices',
        tool: 'product',
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
        tool: 'replay',
        label: 'maskAllInputs',
        // Just inside the form's left edge: a negative dx puts the marker over
        // the browser frame's border once the hero stacks and the form is full width.
        dx: 0.02,
        dy: 0.22,
        title: 'Replay, with burrows masked',
        body: {
            why: (
                <>
                    Session replay records this form so you can watch where people abandon it. Input masking is on, so
                    every value the user types is replaced with asterisks before the recording leaves the browser.
                    Pickup and destination are location data, which is exactly what you don't want sitting in a
                    recording.
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
                    shows the stall on the destination field. The address itself stays in the visitor's browser.
                </>
            ),
        },
    },
    {
        id: 'ride/tier-xl/product',
        page: 'ride',
        target: 'tier-xl',
        tool: 'product',
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
  price_gbp: 5,
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
        id: 'ride/tier-xl/replay',
        page: 'ride',
        target: 'tier-xl',
        tool: 'replay',
        label: 'heatmaps',
        dx: 0.5,
        dy: 1.0,
        title: 'Where people click, including where they cannot',
        body: {
            why: (
                <>
                    Heatmaps come from the same autocapture data, so this needed no code either. Open the toolbar on
                    your own site and it draws clicks, scroll depth, and dead clicks straight onto the page.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `# toolbar → heatmap, on /ride:
clicks        XL card    1,204
dead clicks   XL card      312  ← the price
rageclicks    XL card       47
# 3 clicks within 30px in one second
# counts as a rageclick`,
            },
            after: (
                <>
                    Dead clicks are the useful ones here: 312 hedgehogs tried to click the price expecting a breakdown,
                    and nothing happened. That's a missing feature nobody filed a ticket for.
                </>
            ),
        },
    },
    {
        id: 'ride/garden-map/web',
        page: 'ride',
        target: 'garden-map',
        tool: 'web',
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
        id: 'ride/promo-link/web',
        page: 'ride',
        target: 'promo-link',
        tool: 'web',
        label: 'utm_campaign',
        dx: 0.5,
        dy: 1.2,
        title: 'Where the traffic came from',
        body: {
            why: (
                <>
                    Every link in the funding-round press push carries UTM parameters. The snippet reads them off the
                    first <code>$pageview</code> (no extra code, no redirect service), and web analytics groups them
                    into channels for you.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `?utm_source=techcrunch&utm_medium=pr
&utm_campaign=series_b
# web analytics → Channels:
#   techcrunch / pr   11,204 visitors
#   organic search     2,911 visitors`,
            },
            after: (
                <>
                    The banner itself is measured by autocapture: clicks on the link versus sessions that saw it. If it
                    doesn't out-convert the hero, it goes.
                </>
            ),
        },
    },
    {
        id: 'ride/btn-signup/product',
        page: 'ride',
        target: 'btn-signup',
        tool: 'product',
        label: '$set_once',
        dx: 0.5,
        dy: 1.6,
        title: 'Signup is where attribution gets frozen',
        body: {
            why: (
                <>
                    Two kinds of person property get written here. <code>$set</code> is for things that change, like the
                    tier someone is on. <code>$set_once</code> is for things that must never be overwritten: where they
                    came from, and when they joined.
                </>
            ),
            code: {
                language: 'js',
                snippet: `posthog.setPersonProperties(
  { tier: 'solo' },                    // $set
  { initial_utm_campaign: 'series_b',  // $set_once
    signed_up_date: '2026-07-25' }
)`,
            },
            after: (
                <>
                    Use <code>$set</code> for acquisition data by mistake and every later visit overwrites it, so
                    everyone looks like they arrived from your own site. That's the bug that quietly ruins a year of
                    attribution.
                </>
            ),
        },
    },
    {
        id: 'ride/acct-row/product',
        page: 'ride',
        target: 'acct-row',
        tool: 'product',
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
                snippet: `// on auth success, the server fires the event,
// client links the identity:
posthog.identify('hog_412', { tier: 'solo' })
posthog.capture('auth_sign_in_completed')
// stable, unique, non-PII id (never the email)
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
        tool: 'expflags',
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
        tool: 'product',
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
        id: 'ride/footer-legal/core',
        page: 'ride',
        target: 'footer-legal',
        tool: 'core',
        label: 'opt_out_capturing()',
        // Over the "Privacy" link itself, and inside the frame at every width.
        dx: 0.04,
        dy: 0.4,
        title: 'The opt-out behind the privacy link',
        body: {
            why: (
                <>
                    The SDK has a real on/off switch for capture, and it persists across reloads. So wiring up a working
                    "withdraw consent" control behind the privacy link is two calls, not a project.
                </>
            ),
            code: {
                language: 'js',
                snippet: `if (!hasConsent) posthog.opt_out_capturing()
// later, if they change their mind:
posthog.opt_in_capturing()
// persistence: 'memory' keeps a session
// working with no cookie at all`,
            },
            after: (
                <>
                    Opting out stops capture in the browser, so nothing is sent and then deleted: it's never collected.
                    Handy given every hedgehog on this network is a UK data subject.
                </>
            ),
        },
    },
    {
        id: 'ride/footer/product',
        page: 'ride',
        target: 'footer',
        tool: 'product',
        label: 'outbound links',
        dx: 0.12,
        dy: 0.12,
        title: 'Autocapture keeps the link target',
        body: {
            why: (
                <>
                    The footer sends people to Hedgehog Street and the BBC. Autocapture records each click with the
                    element's <code>href</code> and text, so leaving the site is measurable without wrapping every
                    anchor in a handler.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `# $autocapture, grouped by element href:
hedgehogstreet.org   1,880 clicks
youtube.com/watch      642
/careers                 12  ← unpaid, all of them`,
            },
            after: (
                <>
                    Worth knowing what this <em>doesn't</em> do: an outbound click is the last thing you see from that
                    session, so treat it as an exit, not a conversion.
                </>
            ),
        },
    },
    {
        id: 'ride/app-row/core',
        page: 'ride',
        target: 'app-row',
        tool: 'core',
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
                snippet: `POSTHOG_PROJECT_TOKEN=phc_unter_******
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
