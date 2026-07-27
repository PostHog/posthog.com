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
        // In the nav's empty middle, beside the $pageview marker: both annotate the
        // page chrome rather than any one link, and further left this sat on top of
        // "Open your highway" and hid it.
        dx: 0.56,
        dy: 0.5,
        title: 'One script tag enables everything else',
        body: {
            why: (
                <>
                    One script tag in <code>&lt;head&gt;</code> is what makes every other marker on this page possible.
                    It captures pageviews and clicks on its own, and this project points at PostHog's EU Cloud because
                    the users are in the UK.
                </>
            ),
            code: {
                language: 'js',
                snippet: `// in <head>, before anything else
posthog.init('phc_unter_******', {
  api_host: 'https://eu.i.posthog.com',
  // dated defaults bundle. this one sets
  // capture_pageview: 'history_change' (SPA-safe)
  defaults: '2025-05-24',
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
        id: 'ride/hero-headline/experiments',
        page: 'ride',
        target: 'hero-headline',
        tool: 'experiments',
        label: 'hero-headline-test',
        // Bottom-right corner, past the end of the last line. Anywhere further left
        // sits on the glyphs, because the headline wraps and fills its box.
        dx: 1.0,
        dy: 1.0,
        title: 'What makes this an experiment, not a flag',
        body: {
            why: (
                <>
                    Two headlines, split randomly by a flag. What makes it an experiment is the other half: PostHog logs
                    who saw which variant, ties that to a metric you nominated up front, and tells you when the
                    difference stops being noise.
                </>
            ),
            code: {
                language: 'js',
                snippet: `const v = posthog.getFeatureFlag('hero-headline-test')
heroEl.textContent = COPY[v]
// exposure logs itself as $feature_flag_called
// primary metric: ride_prices_viewed (marker 4)`,
            },
            after: (
                <>
                    Nominating the metric first is the part people skip. Pick it afterwards and you will find some
                    number that moved, because on enough metrics one always has.
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
        title: 'Scouts find friction in recordings',
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
                    None of those 214 people filed a bug, so this would never have reached you any other way. Each
                    report is also a <code>$scout_report_emitted</code> event, so you can chart or route findings like
                    anything else PostHog captures.
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
        title: 'A named event for the funnel step',
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
        title: 'Recording the form without the addresses',
        body: {
            why: (
                <>
                    Session replay records this form so you can watch where people abandon it. Every input is masked by
                    default, so the values people type are replaced with asterisks before the recording leaves the
                    browser. Pickup and destination are location data, which is exactly what you don't want sitting in a
                    recording.
                </>
            ),
            code: {
                language: 'js',
                snippet: `session_recording: {
  // maskAllInputs is already true by default;
  // shown to make the burrow addresses -> ****
  // behavior explicit
  maskAllInputs: true,
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
        id: 'ride/tier-solo/product',
        page: 'ride',
        target: 'tier-solo',
        tool: 'product',
        label: 'ride_tier_selected',
        // Bottom edge, level with the heatmap marker on the row below it.
        dx: 0.5,
        dy: 1.0,
        title: 'Capturing which option people pick',
        body: {
            why: (
                <>
                    Autocapture already records the click on this card, but not what it meant. One custom event names
                    the decision and carries the context you'd want to group by later.
                </>
            ),
            code: {
                language: 'js',
                snippet: `posthog.capture('ride_tier_selected', {
  tier: 'solo',
  price_gbp: 3,
  viewed_tiers: ['solo', 'xl', 'pool']
})`,
            },
            after: (
                <>
                    With the tier and the options they saw on one event, you can ask which traffic sources bring people
                    who pick the expensive option.
                </>
            ),
        },
    },
    {
        id: 'ride/tiers/replay',
        page: 'ride',
        // The whole row of options, not one card: a heatmap's value here is the
        // comparison between the three.
        target: 'tiers',
        tool: 'replay',
        label: 'heatmaps',
        // Bottom edge, centered under all three cards. On the left edge it sat on the
        // first card and read as belonging only to that one.
        dx: 0.5,
        dy: 1.0,
        title: 'Heatmaps need a toggle, not code',
        body: {
            why: (
                <>
                    Heatmaps are one setting rather than any code: turn heatmap capture on (in project settings, or{' '}
                    <code>capture_heatmaps: true</code>). After that the toolbar draws clicks, scroll depth, and dead
                    clicks straight onto the page.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `# toolbar -> heatmap, on this page:
              clicks   dead clicks
Solo           1,204           312
XL               486            18
Pool             233             9
# a dead click is a click that changed
# nothing on the page`,
            },
            after: (
                <>
                    Dead clicks are the useful ones. 312 people clicked the Solo price expecting a breakdown and got
                    nothing, which is a missing feature nobody filed a bug about.
                </>
            ),
        },
    },
    {
        id: 'ride/topnav/web',
        page: 'ride',
        // Page-level capture, so it belongs on the page chrome. It used to sit on
        // the map placeholder, which is just a stand-in image and had nothing to
        // do with pageviews.
        target: 'topnav',
        tool: 'web',
        label: '$pageview',
        dx: 0.62,
        dy: 0.5,
        title: 'Web analytics needs no extra code',
        body: {
            why: (
                <>
                    No code on this pin. <code>$pageview</code> / <code>$pageleave</code>, referrers, UTM params,
                    channel type, device and geo are all captured by the snippet and land in a ready-made dashboard.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `# what marketing checks each morning, zero setup:
Channels:  hedgehogstreet.org / organic / social
UTMs:      utm_campaign=wild_london_bump
Devices:   mobile 71% · desktop 28%`,
            },
            after: (
                <>
                    Traffic spikes show up here on their own. It's the layer you get for installing PostHog and doing
                    nothing else.
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
        label: 'user_signed_up',
        // Left of the button and level with the other two nav markers, so the three
        // page-chrome annotations read as a set instead of one hanging below.
        dx: -0.2,
        dy: 0.5,
        title: 'The signup event, and who the person is',
        body: {
            why: (
                <>
                    Signup is the number Unter watches daily and the last step of the funnel that starts on this page,
                    so it gets its own named event. The same moment is also when you first learn who the person is, so
                    two kinds of property are written alongside it: <code>$set</code> for anything that can change
                    later, and <code>$set_once</code> for the facts about how they arrived, which should stay as they
                    were on day one.
                </>
            ),
            code: {
                language: 'js',
                snippet: `posthog.capture('user_signed_up')
posthog.setPersonProperties(
  { tier: 'solo' },                    // $set: can change
  { initial_utm_campaign: 'series_b',  // $set_once: written
    signed_up_date: '2026-07-25' }     // once, then never
)`,
            },
            after: (
                <>
                    Both halves feed the same chart. Daily signups and the prices-to-signup funnel come from the event,
                    and splitting either by <code>initial_utm_campaign</code> shows which campaigns bring people who
                    finish. Use <code>$set</code> for that campaign by mistake and every later visit overwrites it,
                    until everyone looks like they arrived from your own site.
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
        title: 'identify() links anonymous events to a person',
        body: {
            why: (
                <>
                    Before login, events are cheap anonymous events (<code>person_profiles: 'identified_only'</code>).
                    At login, one call merges the whole pre-login journey into the person.
                </>
            ),
            code: {
                language: 'js',
                snippet: `// on auth success, from the client:
posthog.identify('hog_412', { tier: 'solo' })
posthog.capture('auth_sign_in_completed')
// a stable id that never changes for them
// posthog.reset() ONLY on logout, never on an
// anonymous page load (that orphans the history)`,
            },
            after: (
                <>
                    Get either rule wrong and one person is counted as four, which quietly overstates your user count
                    and understates retention.
                </>
            ),
        },
    },
    {
        id: 'ride/reserve-feature/flags',
        page: 'ride',
        // The whole feature, not just its button: the flag decides whether any of
        // this section exists for you.
        target: 'reserve-feature',
        tool: 'flags',
        label: 'reserve-rollout',
        dx: 0,
        dy: 0.5,
        title: 'Releasing a risky feature to a few people first',
        body: {
            why: (
                <>
                    Reserving holds a real gap for someone, so a bug here strands a hedgehog at a fence. The feature is
                    deployed to everyone but wrapped in a feature flag, which decides who can actually see it: it starts
                    at 20% of one borough, and widens once the numbers hold up.
                </>
            ),
            code: {
                language: 'js',
                snippet: `if (posthog.isFeatureEnabled('reserve-rollout')) {
  showReserveSection()
}
// released to: 20% of cohort "Hackney hosts"
// watch: crossing_reserved conversion
//        + $exception rate in the new code path`,
            },
            after: (
                <>
                    The flag is also the off switch. If exceptions climb in the new code path, you flip it off from the
                    PostHog UI and the feature disappears for everyone within seconds, with no deploy and nobody left
                    waiting at a gap that was never held.
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
        title: 'Turning capture off, and back on',
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
// the choice is remembered, so it holds
// on the next visit too`,
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
        id: 'ride/footer-links/product',
        page: 'ride',
        target: 'footer-links',
        tool: 'product',
        label: 'outbound links',
        dx: 0.22,
        dy: 0.5,
        title: 'Autocapture records outbound clicks',
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
youtube.com/watch      642`,
            },
            after: (
                <>
                    One caveat: an outbound click is the last thing you see in that session, so read it as an exit
                    rather than a conversion.
                </>
            ),
        },
    },
    {
        id: 'ride/survey-badge/surveys',
        page: 'ride',
        target: 'survey-badge',
        tool: 'surveys',
        label: 'display conditions',
        dx: 0.5,
        dy: 0,
        title: 'Choosing who sees a survey',
        body: {
            why: (
                <>
                    A survey doesn't have to go to everyone. You set conditions in PostHog: which URLs it appears on,
                    which feature flag the person must match, and what share of them to ask.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `# conditions on this survey, set in PostHog:
url contains       unter.co.uk
feature flag       hedgehog-verified
sample             25% of matching users
# and once someone answers, they're not
# asked again`,
            },
            after: (
                <>
                    Sampling matters more than it looks. Ask everyone every time and response rates fall, so the answers
                    you do get come from the people with the strongest opinions.
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
        title: 'The mobile SDKs report to the same project',
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
                    One person's timeline then reads across both: arrived from a link, got a quote on the web, scanned
                    the QR, first crossing in the app two nights later. That's what makes a campaign traceable to what
                    people actually did.
                </>
            ),
        },
    },
]
