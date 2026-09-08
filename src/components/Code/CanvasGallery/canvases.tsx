import { CustomerLookupDemo, PostDeployCheckDemo, SignupDipDemo } from './demos/DisposableDemos'
import { CreditBurnDemo, MorningSkimDemo, RetentionGridDemo } from './demos/DurableDemos'
import { FishTankDemo, GlobeDemo, IncidentReportDemo, LiveDeckDemo } from './demos/ShowableDemos'

export type CanvasShape = 'disposable' | 'durable' | 'showable'

export interface ShapeInfo {
    label: string
    verb: string
    description: string
    lifespan: string
    chipClass: string
}

export const SHAPES: Record<CanvasShape, ShapeInfo> = {
    disposable: {
        label: 'Disposable',
        verb: 'Look once. Throw away.',
        description:
            'Answers one question, then dies. Nobody should bookmark it. If you open it twice, it wanted to be a dashboard.',
        lifespan: 'minutes to a day',
        chipClass: 'bg-orange/15 text-orange',
    },
    durable: {
        label: 'Durable',
        verb: 'Skim every morning.',
        description:
            'Boring on purpose. Same layout every day so your eye learns where each number lives. Red means look, green means leave.',
        lifespan: 'months',
        chipClass: 'bg-blue/15 text-blue',
    },
    showable: {
        label: 'Showable',
        verb: 'Made to be seen.',
        description:
            'For the all-hands, the incident review, the customer call. This is where the fancy visualization earns its keep, and only here.',
        lifespan: 'one meeting, then a link',
        chipClass: 'bg-purple/15 text-purple',
    },
}

// Model ids match the ones PostHog Desktop accepts in a posthog-code://new deep link.
export const MODELS = {
    cheap: {
        id: 'claude-sonnet-5',
        label: 'Sonnet 5',
        why: 'Tables, stat tiles, and one query per panel do not need the expensive model. Sonnet does this in one pass.',
    },
    strong: {
        id: 'claude-fable-5',
        label: 'Fable 5',
        why: 'Animation, layout that has to fit a projector, or data that needs a judgment call. Costs more, argues less.',
    },
} as const

export interface GalleryCanvas {
    slug: string
    title: string
    shape: CanvasShape
    tagline: string
    /** When to build it and what it should tell you, in two or three sentences. */
    when: string
    /** The prompt someone pastes into PostHog Desktop to get something similar. */
    prompt: string
    model: keyof typeof MODELS
    /** How long a person should need to read it. */
    skim: string
    /** PostHog data the canvas reads. */
    reads: string[]
    weird?: boolean
    Demo: () => JSX.Element
}

export const CANVASES: GalleryCanvas[] = [
    {
        slug: 'signup-dip',
        title: 'Why did signups dip on Tuesday?',
        shape: 'disposable',
        tagline: 'One question. One answer. Close the tab.',
        when: 'Someone posts a scary screenshot of a trend in Slack. Build this instead of replying "looking into it". It shows the dip, breaks it down by the dimension most likely to explain it, and writes the verdict in one sentence.',
        prompt: `Signups dipped on Tuesday. Build a canvas that shows daily signups for the last 14 days with the dip highlighted, breaks the drop down by referrer, UTM source, and country, and highlights which segment explains most of the change. End with a one-paragraph verdict: is this a bug, a traffic change, or noise? Use the "signed_up" event. Keep it to one screen.`,
        model: 'cheap',
        skim: '20 s',
        reads: ['signed_up event', '$referring_domain', 'utm_source', '$geoip_country_code'],
        Demo: SignupDipDemo,
    },
    {
        slug: 'customer-lookup',
        title: 'Customer lookup',
        shape: 'disposable',
        tagline: 'A support tool you use once per ticket.',
        when: 'A ticket comes in and you want everything about that account on one screen before you reply. Plan, last seen, flags, recent errors, and the replay of the moment it went wrong. Used a hundred times, but each use is a fresh throwaway.',
        prompt: `Build a customer lookup canvas. Give me a search box that accepts an email, a company name, or a distinct_id. When I search, show one screen with: the person and their group properties (plan, MRR, company), events in the last 24 hours as a bar chart, feature flags that are on for them, exceptions from error tracking in the last 7 days, and links to their 3 most recent session recordings. Make it fast to read. No charts with more than one series.`,
        model: 'cheap',
        skim: '30 s',
        reads: ['persons & groups', 'events (24h)', 'feature flags', 'error tracking', 'session recordings'],
        Demo: CustomerLookupDemo,
    },
    {
        slug: 'post-deploy-check',
        title: 'Did that deploy break anything?',
        shape: 'disposable',
        tagline: 'Lives for 20 minutes after a deploy. Then nobody opens it again.',
        when: 'You just shipped. You want error rate, latency, and new exception groups against the last hour, plus a hold/continue verdict for the flag rollout. Build it once per deploy, or ask an agent to build it automatically when a PR merges.',
        prompt: `I just deployed. Build a canvas that compares the 20 minutes after the deploy with the 60 minutes before it: error rate per minute (mark the deploy time), p95 latency, new exception groups that did not exist before, and the current rollout percentage of the feature flag "new-editor". Show four pass/fail checks and a single recommendation: continue the rollout or hold. Use a timer that shows minutes since deploy.`,
        model: 'cheap',
        skim: '15 s',
        reads: ['error tracking', 'APM traces (p95)', 'feature flag rollout', 'deploy annotations'],
        Demo: PostDeployCheckDemo,
    },
    {
        slug: 'morning-skim',
        title: 'The morning skim',
        shape: 'durable',
        tagline: 'Six numbers, three tables, no charts. Read in under a minute.',
        when: 'The daily check: a handful of numbers, a glance at flags and experiments, and one question, did anything move? This canvas is that check on one screen, with one line at the bottom that says what needs you today.',
        prompt: `Build my morning canvas. I want to read it in under a minute. Top row: signups, weekly active users, activation rate, error count, p95 latency, and MRR, each as a big number with the percent change versus the same day last week. Green if it moved the way I want, red if not. Below that, three small tables: feature flags changed in the last 7 days with their rollout percentage, running experiments with their current lift and whether it is significant, and survey response counts for this week. Finish with one sentence that names the single thing I should act on. No charts. Same layout every day.`,
        model: 'cheap',
        skim: '60 s',
        reads: ['trends insights', 'feature flags', 'experiments', 'surveys', 'error tracking'],
        Demo: MorningSkimDemo,
    },
    {
        slug: 'credit-burn',
        title: 'AI credits burn-down',
        shape: 'durable',
        tagline: 'A dashboard for one number that gets scary.',
        when: 'You have a monthly limit on AI credits and several products drawing from it. You want to know, without math, if the month ends inside the limit. The dashed line is where you should be today. The projection is the number you have to explain to someone.',
        prompt: `Build a canvas that tracks our PostHog AI credit usage this month. Show credits used against the billing limit as a progress bar with a marker at where we should be for today's date, a projected end-of-month total based on the average daily rate, credits per day as a sparkline, and a breakdown by product (Desktop tasks, canvases, self-driving reports, PostHog AI). Turn the bar orange above 65% and red above 85%. Use the billing usage API for the numbers.`,
        model: 'cheap',
        skim: '10 s',
        reads: ['billing usage', 'AI credit ledger', 'usage by product'],
        Demo: CreditBurnDemo,
    },
    {
        slug: 'retention-grid',
        title: 'Weekly retention triangle',
        shape: 'durable',
        tagline: 'The same shape every Monday, so your eye learns it.',
        when: 'Retention is the number that changes slowly and matters most. A triangle with one hue, light to dark, lets you see a better cohort in a second. The footer says whether anything changed. Most weeks it says no, and that is the point.',
        prompt: `Build a weekly retention canvas. Cohorts are people who fired "signed_up" in each of the last 8 weeks. Retention is any event in the following weeks. Render it as a retention triangle with one color, light to dark by percentage, with the percentage written in each cell. Highlight the cohort that is furthest from the trend and say by how many points. Add one sentence at the bottom: what week-4 retention is now, what it was a quarter ago, and whether I need to do anything.`,
        model: 'cheap',
        skim: '15 s',
        reads: ['retention insight', 'signed_up event', 'cohorts'],
        Demo: RetentionGridDemo,
    },
    {
        slug: 'live-deck',
        title: 'The live deck',
        shape: 'showable',
        tagline: 'Slides where the numbers are queries, not screenshots.',
        when: 'The quarterly review, the board update, the customer call. Every number re-queries when you open the deck, so it is still right when someone reopens it in two months. Four slides is enough. The third slide is "people in the product right now", because it works every time.',
        prompt: `Build a four-slide deck as a canvas for our Q3 review. Slide 1: weekly active users as a single big number with percent change versus Q2. Slide 2: activation rate by acquisition channel as horizontal bars with the value labeled, plus one line of what we should do about it. Slide 3: the number of people active in the product right now, live. Slide 4: our bet for Q4 as three short sentences with a measurable pass/fail condition. Arrow keys move between slides. A thin progress bar at the top shows where we are. Every number is a live query, never a pasted value.`,
        model: 'strong',
        skim: '4 slides',
        reads: ['trends insights', 'breakdown by channel', 'live event stream'],
        Demo: LiveDeckDemo,
    },
    {
        slug: 'globe',
        title: 'Where is everyone?',
        shape: 'showable',
        tagline: 'A globe that pulses when a session starts. Built for the all-hands, not for a Tuesday.',
        when: 'You want the room to feel the product being used. A dotted globe, a pulse per new session, a counter that ticks up. It tells you nothing you could act on. That is fine. It is not for acting, it is for showing.',
        prompt: `Build a canvas with a slowly rotating dotted globe. Plot every session that started in the last 10 minutes at its $geoip_latitude and $geoip_longitude, and pulse the dot when a new session starts. Next to it, show active users right now, the number of countries, and the top city. Refresh every 10 seconds. Dark background, one accent color, no legend. It should look good on a projector from the back of the room.`,
        model: 'strong',
        skim: 'do not skim. Look.',
        reads: ['$geoip_latitude / $geoip_longitude', 'live session starts', '$geoip_city_name'],
        weird: true,
        Demo: GlobeDemo,
    },
    {
        slug: 'incident-report',
        title: 'Incident report',
        shape: 'showable',
        tagline: 'A postmortem people read, because it is not a wall of text.',
        when: 'Something broke, you fixed it, and now you owe the team a write-up. A canvas with the error curve, the blast radius, and a timeline is read by more people than a document, and the numbers are pulled from PostHog rather than typed from memory. Share the link in the incident channel and move on.',
        prompt: `Build an incident report canvas for the incident on September 4 between 14:02 and 14:31 UTC. Show errors per minute for the surrounding two hours with the incident window shaded, three headline numbers (duration, users affected, failed export jobs), a timeline of what happened with times, and a "what we changed" list. Pull the error data from error tracking and the affected users from the "export_failed" event. Make it printable on one page.`,
        model: 'strong',
        skim: '90 s',
        reads: ['error tracking', 'export_failed event', 'deploy annotations', 'alerts'],
        Demo: IncidentReportDemo,
    },
    {
        slug: 'fish-tank',
        title: 'The fish tank',
        shape: 'showable',
        tagline: 'Each fish is a live session. Delightful for a day. Unreadable forever. Here anyway.',
        when: 'The honest entry. Great on day one. By day three you cannot read it, and the boring board wins. Build it for the office TV, the launch party, or to make a point about what dashboards are for. Do not put it in your morning routine.',
        prompt: `Build a fish tank canvas. Every person who viewed /editor in the last 5 minutes is a fish swimming across the screen. Blue for free plan, orange for paid, purple for people from our own company. Add some bubbles and a sand floor. Show the count of fish in the corner. Refresh the population every 30 seconds without restarting the animation. This is for the office TV, so no controls and no text smaller than 14px.`,
        model: 'strong',
        skim: 'never',
        reads: ['$pageview on /editor', 'person property: plan', 'is_internal_user'],
        weird: true,
        Demo: FishTankDemo,
    },
]

export const deepLinkFor = (canvas: GalleryCanvas): string =>
    `posthog-code://new?prompt=${encodeURIComponent(canvas.prompt)}&model=${MODELS[canvas.model].id}`
