/* eslint-disable react/jsx-key -- table cells here are data, not rendered lists; keys are applied per row/column by ColumnsTable/FieldValueTable in InstrumentationBlocks.tsx */
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
            input: {
                kind: 'code',
                language: 'js',
                context: 'in <head>',
                snippet: `// in <head>, before anything else
posthog.init('phc_unter_******', {
  api_host: 'https://eu.i.posthog.com',
  // dated defaults bundle. this one sets
  // capture_pageview: 'history_change' (SPA-safe)
  defaults: '2025-05-24',
})`,
            },
            output: {
                context: 'events, last 7 days',
                table: {
                    kind: 'columns',
                    columns: [{ label: 'Event' }, { label: 'Count', align: 'right' }],
                    rows: [
                        [<code>$pageview</code>, '48,210'],
                        [<code>$autocapture</code>, '132,940'],
                        [<code>$pageleave</code>, '41,006'],
                    ],
                },
                footnote: <>All captured by the snippet alone, before a line of custom code.</>,
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
        title: 'Testing which homepage headline wins',
        body: {
            why: (
                <>
                    This headline is being tested: half of visitors see one version, half see another, split randomly by
                    a flag. What makes it an experiment, not just a flag, is the rest of the setup. PostHog logs who saw
                    which headline, ties that to a metric you pick up front (here, whether they view prices), and tells
                    you when the gap is real rather than noise.
                </>
            ),
            input: {
                kind: 'code',
                language: 'js',
                context: 'client-side',
                snippet: `const v = posthog.getFeatureFlag('hero-headline-test')
heroEl.textContent = COPY[v]
// exposure logs itself as $feature_flag_called
// primary metric: ride_prices_viewed (marker 4)`,
            },
            output: {
                context: 'hero-headline-test',
                table: {
                    kind: 'columns',
                    columns: [
                        { label: 'Variant' },
                        { label: 'Exposed', align: 'right' },
                        { label: 'Converted', align: 'right' },
                        { label: 'Rate', align: 'right' },
                    ],
                    rows: [
                        ['control', '12,410', '1,204', '9.7%'],
                        ['variant', '12,388', '1,381', <strong>11.1%</strong>],
                    ],
                },
                footnote: (
                    <>
                        Running · 6 days · 92% significance. Primary metric <code>ride_prices_viewed</code>.
                    </>
                ),
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
        title: 'An AI scout finds friction in recordings',
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
            input: {
                kind: 'config',
                context: 'no code, a signal source',
                rows: [
                    { field: 'Source', value: 'Session recordings' },
                    { field: 'Scans for', value: 'Rage-click and dead-click clusters' },
                    { field: 'Schedule', value: 'Continuous' },
                ],
            },
            output: {
                context: 'session replay scout · medium',
                table: {
                    kind: 'fieldValue',
                    rows: [
                        { field: 'Finding', value: 'Rage-click cluster on the destination field' },
                        { field: 'Sessions', value: '214 over 7 days' },
                        { field: 'Common trait', value: 'All outside London, where gap coverage is empty' },
                        { field: 'Evidence', value: 'Recordings attached' },
                    ],
                },
                footnote: <>Ranked medium: enough sessions to act on, all sharing one cause.</>,
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
        title: 'A named event for a conversion step',
        body: {
            why: (
                <>
                    The click is already in autocapture, but a conversion funnel built on autocapture breaks the day
                    someone reworks this button: the selector stops matching, the step goes quiet, and the rate looks
                    like it cratered when behavior never changed. A named event is a stable definition that survives
                    redesigns. Its properties are ones you chose, so you can break the conversion down by tier,
                    distance, or gaps on the route.
                </>
            ),
            input: {
                kind: 'code',
                language: 'js',
                context: 'client-side',
                snippet: `posthog.capture('ride_prices_viewed', {
  distance_m: 42,
  gaps_on_route: 2,
  tier_preselected: 'solo',
  passenger_weight_class: 'standard'
})`,
            },
            output: {
                context: 'funnel, /ride (7d)',
                table: {
                    kind: 'columns',
                    columns: [
                        { label: 'Step' },
                        { label: 'Count', align: 'right' },
                        { label: 'Conv.', align: 'right' },
                    ],
                    rows: [
                        [<code>$pageview</code>, '12,410', '—'],
                        [<code>ride_prices_viewed</code>, '4,882', '39%'],
                        [<code>ride_requested</code>, '1,204', '25%'],
                    ],
                },
                footnote: (
                    <>
                        Broken down by <code>tier_preselected</code>: solo 15% · xl 8% · pool 11%.
                    </>
                ),
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
        title: 'Masking sensitive inputs in session replay',
        body: {
            why: (
                <>
                    Session replay records this form, but the values people type are replaced with asterisks before the
                    recording leaves the browser. Pickup and destination are location data, which is sensitive data you
                    don't want sitting in a recording.
                </>
            ),
            input: {
                kind: 'code',
                language: 'js',
                context: 'posthog.init()',
                snippet: `session_recording: {
  // maskAllInputs is already true by default;
  // shown to make the burrow addresses -> ****
  // behavior explicit
  maskAllInputs: true,
}`,
            },
            output: {
                context: 'a recording of this form',
                table: {
                    kind: 'fieldValue',
                    rows: [
                        { field: 'Pickup field', value: <code>••••••••</code> },
                        { field: 'Destination field', value: <code>••••••••</code> },
                        { field: 'Still visible', value: 'hesitation, corrections, time on field' },
                    ],
                },
                footnote: <>The stall on the field is visible in replay. The address itself is not.</>,
            },
            after: (
                <>
                    Masking happens in the browser, so the real values never reach PostHog's servers, only the fact that
                    someone hesitated here.
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
            input: {
                kind: 'code',
                language: 'js',
                context: 'client-side',
                snippet: `posthog.capture('ride_tier_selected', {
  tier: 'solo',
  price_gbp: 0,
  viewed_tiers: ['solo', 'xl', 'pool']
})`,
            },
            output: {
                context: 'breakdown, ride_tier_selected (7d)',
                table: {
                    kind: 'columns',
                    columns: [
                        { label: 'Tier' },
                        { label: 'Selected', align: 'right' },
                        { label: 'Share', align: 'right' },
                    ],
                    rows: [
                        ['solo', '3,204', '66%'],
                        ['xl', '892', '18%'],
                        ['pool', '786', '16%'],
                    ],
                },
                footnote: (
                    <>
                        Grouped by <code>utm_source</code>: paid social brings the most people who pick solo.
                    </>
                ),
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
        id: 'ride/tiers/product',
        page: 'ride',
        // The whole row of options, not one card: a heatmap's value here is the
        // comparison between the three.
        target: 'tiers',
        // Heatmaps live in the toolbar and draw on autocapture click data, so they're
        // grouped with product analytics here; the docs link points at the toolbar page.
        tool: 'product',
        docsUrl: '/docs/toolbar/heatmaps',
        docsLabel: 'Heatmaps docs',
        label: 'heatmaps',
        // Bottom edge, centered under all three cards. On the left edge it sat on the
        // first card and read as belonging only to that one.
        dx: 0.5,
        dy: 1.0,
        title: 'Heatmaps show where people click and scroll',
        body: {
            why: (
                <>
                    Heatmaps are one setting rather than any code: turn heatmap capture on (in project settings, or{' '}
                    <code>capture_heatmaps: true</code>). The toolbar overlay then draws four things onto the live page:
                    where people click, how far they scroll, rage clicks, and dead clicks (clicks on something that
                    looked interactive but wasn't).
                </>
            ),
            input: {
                kind: 'code',
                language: 'js',
                context: 'one setting',
                snippet: `// project settings → "capture heatmaps"
// or in posthog.init():
capture_heatmaps: true`,
            },
            output: {
                context: 'toolbar · clickmap, this page',
                table: {
                    kind: 'columns',
                    columns: [
                        { label: 'Tier' },
                        { label: 'Clicks', align: 'right' },
                        { label: 'Share', align: 'right' },
                    ],
                    rows: [
                        ['Solo', '1,204', <strong>62%</strong>],
                        ['XL', '486', '25%'],
                        ['Pool', '233', '13%'],
                    ],
                },
            },
            after: (
                <>
                    The clickmap counts clicks per element from autocapture: Solo takes 62%, XL and Pool split the rest.
                    These cards register no dead clicks because they're real <code>&lt;button&gt;</code> elements;
                    posthog-js only flags a dead click when a click is followed by no change on the page.
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
        title: 'Traffic sources and devices from the base snippet',
        body: {
            why: (
                <>
                    The base snippet captures <code>$pageview</code> / <code>$pageleave</code>, referrers, UTM params,
                    channel type, device, and geo with no extra instrumentation, and they land in a ready-made web
                    analytics dashboard.
                </>
            ),
            input: {
                kind: 'code',
                language: 'js',
                context: 'no extra code',
                snippet: `// nothing. $pageview, $pageleave, referrers,
// UTMs, channel, device and geo are all captured
// by the posthog-js snippet already on the page`,
            },
            output: {
                context: 'web analytics · today',
                table: {
                    kind: 'fieldValue',
                    rows: [
                        { field: 'Channels', value: 'hedgehogstreet.org · organic · social' },
                        { field: 'Top UTM', value: <code>utm_campaign=wild_london_bump</code> },
                        { field: 'Devices', value: 'mobile 71% · desktop 28%' },
                    ],
                },
            },
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
        title: 'Attributing visits to campaigns with UTMs',
        body: {
            why: (
                <>
                    Every link in the funding-round press push carries UTM parameters. The snippet reads them off the
                    first <code>$pageview</code> (no extra code, no redirect service), and web analytics groups them
                    into channels for you.
                </>
            ),
            input: {
                kind: 'config',
                context: 'UTM tags on the press links',
                rows: [
                    { field: <code>utm_source</code>, value: 'techcrunch' },
                    { field: <code>utm_medium</code>, value: 'pr' },
                    { field: <code>utm_campaign</code>, value: 'series_b' },
                ],
            },
            output: {
                context: 'web analytics · channels (7d)',
                table: {
                    kind: 'columns',
                    columns: [{ label: 'Source / medium' }, { label: 'Visitors', align: 'right' }],
                    rows: [
                        ['techcrunch / pr', '11,204'],
                        ['organic search', '2,911'],
                        ['direct', '1,455'],
                    ],
                },
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
                    Signup is the last step of the funnel, so it gets its own named event. It's also the first time you
                    know who the person is. You set two kinds of property here: <code>$set</code> for things that can
                    change later, and <code>$set_once</code> for facts about how they arrived, which should never be
                    overwritten.
                </>
            ),
            input: {
                kind: 'code',
                language: 'js',
                context: 'client-side',
                snippet: `posthog.capture('user_signed_up')
posthog.setPersonProperties(
  { tier: 'solo' },                    // $set: can change
  { initial_utm_campaign: 'series_b',  // $set_once: written
    signed_up_date: '2026-07-25' }     // once, then never
)`,
            },
            output: {
                context: 'person, hog_412',
                table: {
                    kind: 'fieldValue',
                    rows: [
                        { field: <code>tier</code>, value: <>solo · $set, can change</> },
                        { field: <code>initial_utm_campaign</code>, value: <>series_b · $set_once</> },
                        { field: <code>signed_up_date</code>, value: <>2026-07-25 · $set_once</> },
                    ],
                },
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
        title: 'Linking anonymous activity to a real person',
        body: {
            why: (
                <>
                    Before login, events are cheap anonymous events (<code>person_profiles: 'identified_only'</code>).
                    At login, one call merges the whole pre-login journey into the person.
                </>
            ),
            input: {
                kind: 'code',
                language: 'js',
                context: 'on auth success',
                snippet: `// on auth success, from the client:
posthog.identify('hog_412', { tier: 'solo' })
posthog.capture('auth_sign_in_completed')
// a stable id that never changes for them
// posthog.reset() ONLY on logout, never on an
// anonymous page load (that orphans the history)`,
            },
            output: {
                context: 'person timeline, hog_412',
                table: {
                    kind: 'fieldValue',
                    rows: [
                        { field: 'Before', value: '7 anonymous events, no name' },
                        {
                            field: <code>identify()</code>,
                            value: (
                                <>
                                    merges them into <code>hog_412</code>
                                </>
                            ),
                        },
                        { field: 'After', value: 'one person, web + app on one timeline' },
                    ],
                },
                footnote: <>One merge call, and the anonymous history is no longer orphaned.</>,
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
            input: {
                kind: 'code',
                language: 'js',
                context: 'client-side',
                snippet: `if (posthog.isFeatureEnabled('reserve-rollout')) {
  showReserveSection()
}`,
            },
            output: {
                context: 'reserve-rollout',
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
                                Cohort <code>Hackney hosts</code>
                            </>,
                            '20%',
                            '1,204',
                        ],
                        ['Everyone else', '0%', '4,816'],
                    ],
                },
                footnote: (
                    <>
                        Watching <code>crossing_reserved</code> (target ≥ 5%) and <code>$exception</code> rate in the
                        new path.
                    </>
                ),
            },
            after: (
                <>
                    The flag is also the off switch. If <code>$exception</code> rates climb in the new code path, you
                    turn it off in the PostHog UI and every user is back on the old path in seconds, without a deploy.
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
            input: {
                kind: 'code',
                language: 'js',
                context: 'behind the privacy link',
                snippet: `if (!hasConsent) posthog.opt_out_capturing()
// later, if they change their mind:
posthog.opt_in_capturing()
// the choice is remembered, so it holds
// on the next visit too`,
            },
            output: {
                context: 'capture state, this browser',
                table: {
                    kind: 'fieldValue',
                    rows: [
                        { field: 'Consent', value: 'Withdrawn' },
                        { field: 'Capturing', value: 'Off, and it holds across reloads' },
                        { field: 'Sent then deleted', value: 'Nothing, it was never collected' },
                    ],
                },
            },
            after: (
                <>
                    Capture stops in the browser, so nothing is sent – it's never collected in the first place. Handy
                    when every hedgehog on this network is a UK data subject.
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
            input: {
                kind: 'config',
                context: 'targeting, set in PostHog',
                rows: [
                    { field: 'Type', value: 'Feedback button (popover)' },
                    { field: 'Question', value: '"What would make Unter better?"' },
                    {
                        field: 'URL',
                        value: (
                            <>
                                contains <code>unter.co.uk</code>
                            </>
                        ),
                    },
                    { field: 'Feature flag', value: <code>hedgehog-verified</code> },
                    { field: 'Sample', value: '25% of matching users' },
                    { field: 'Frequency', value: 'once per person, then never' },
                ],
            },
            output: {
                context: 'responses, last 30d',
                table: {
                    kind: 'columns',
                    columns: [{ label: 'Answer' }, { label: 'Responses', align: 'right' }],
                    rows: [
                        ['Better route options', '412'],
                        ['Slower is fine', '218'],
                        ['Not enough gaps nearby', '189'],
                    ],
                },
                footnote: <>819 responses · a 23% response rate among the 25% who were asked.</>,
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
        title: 'One person across web and mobile',
        body: {
            why: (
                <>
                    The mobile apps run <code>posthog-ios</code> / <code>posthog-android</code> pointed at the same
                    project, configured from the same env vars the web build uses. The shared token is what gets the
                    events to one place. Calling <code>identify()</code> with the same user id on every platform is what
                    puts them on one person, and without it you get the same human counted once per device.
                </>
            ),
            input: {
                kind: 'code',
                language: 'bash',
                context: 'shared by web + mobile builds',
                snippet: `POSTHOG_PROJECT_TOKEN=phc_unter_******
POSTHOG_HOST=https://eu.i.posthog.com`,
            },
            output: {
                context: 'person timeline, hog_412',
                table: {
                    kind: 'columns',
                    columns: [{ label: 'When' }, { label: 'Platform' }, { label: 'Event' }],
                    rows: [
                        ['Tue', 'Web', 'got a quote'],
                        ['Tue', 'Web', <code>user_signed_up</code>],
                        ['Thu', 'iOS', 'first crossing'],
                    ],
                },
                footnote: (
                    <>
                        <code>identify('hog_412')</code> on every platform puts them on one person. Without it, one
                        human counts once per device.
                    </>
                ),
            },
            after: (
                <>
                    One person's timeline then reads across both: arrived from a link, got a quote on the web, scanned
                    the QR, first crossing in the app two nights later.
                </>
            ),
        },
    },
]
