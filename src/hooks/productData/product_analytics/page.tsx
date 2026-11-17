import React from 'react'
import {
    IconBrowser,
    IconDatabase,
    IconHogQL,
    IconPhone,
    IconPlug,
    IconServer,
    IconShieldLock,
    IconTerminal,
    IconUpload,
} from '@posthog/icons'
import { HedgehogChart, HedgehogHahaBizzniss } from '@posthog/brand/hoggies'
import Link from 'components/Link'
import SlotMachineText from 'components/SlotMachineText'
import { IconClaudeCode, IconMCP, IconOpenAI, IconSlack } from 'components/OSIcons'
import posthogIcon from 'images/posthog-icon-white.svg'
import { PAGE_INSIGHTS } from './pageInsights'

/**
 * Content for the product analytics page prototype. Each key is read by the
 * section template of the same name in `ReaderViewProduct/templates/`.
 */

const LINK_CLASSES = 'font-semibold text-primary underline hover:text-red dark:hover:text-yellow'

export const heroHog = {
    Component: HedgehogChart,
    alt: 'A hedgehog presenting a bar chart',
    className: 'h-40 @3xl/reader-content:h-56 @6xl/reader-content:h-64',
}

const askTitle = (
    <SlotMachineText
        words={['retention', 'correlation', 'trends', 'funnels', 'revenue', 'usage']}
        holdDuration={1200}
        wordClassName="text-blue"
        prefix={
            <span className="inline-flex items-center gap-2">
                <span>Ask</span>
                <img src={posthogIcon} alt="" aria-hidden className="size-6 rounded-md" />
                <span>PostHog about</span>
            </span>
        }
    />
)

const docs = (path: string) => `/docs/product-analytics/${path}`

/** One color per insight tool. */
const TOOL_TAGS: Record<string, string> = {
    Funnels: 'bg-orange/15 text-orange',
    Trends: 'bg-blue/15 text-blue',
    Retention: 'bg-green/15 text-green',
    Correlation: 'bg-purple/15 text-purple',
    Paths: 'bg-seagreen/15 text-seagreen',
    SQL: 'bg-red/15 text-red',
}

export const eventJourney = {
    title: 'Analyze more than just events',
    lede: (
        <>
            Raw events only get you so far. PostHog adds{' '}
            <Link to="/docs/data/events" state={{ newWindow: true }} className={LINK_CLASSES}>
                properties
            </Link>
            , like GeoIP, and creates{' '}
            <Link to="/docs/data/persons" state={{ newWindow: true }} className={LINK_CLASSES}>
                person
            </Link>{' '}
            and{' '}
            <Link to="/docs/product-analytics/group-analytics" state={{ newWindow: true }} className={LINK_CLASSES}>
                group
            </Link>{' '}
            profiles, so you can break down any insight by who, where, and which company. Group people into{' '}
            <Link to="/docs/data/cohorts" state={{ newWindow: true }} className={LINK_CLASSES}>
                cohorts
            </Link>{' '}
            and events into{' '}
            <Link to="/docs/data/actions" state={{ newWindow: true }} className={LINK_CLASSES}>
                actions
            </Link>{' '}
            to match how your team talks about your product.
        </>
    ),
    event: 'purchase_completed',
    stages: [
        {
            key: 'ingestion',
            label: 'Ingestion',
            detail: 'Capture with any SDK',
            Icon: IconUpload,
            tile: 'bg-orange/15 text-orange border-orange',
        },
        {
            key: 'validation',
            label: 'Validation',
            detail: 'Enrich with properties and more',
            Icon: IconShieldLock,
            tile: 'bg-purple/15 text-purple border-purple',
        },
        {
            key: 'storage',
            label: 'Enrichment',
            detail: 'Connect to replays and profiles',
            Icon: IconDatabase,
            tile: 'bg-seagreen/15 text-seagreen border-seagreen',
        },
        {
            key: 'querying',
            label: 'Querying',
            detail: 'Build insights with AI',
            Icon: IconHogQL,
            tile: 'bg-blue text-white border-blue',
            youAreHere: true,
        },
        {
            key: 'everywhere',
            label: 'Usage',
            detail: 'Use data for flags and more',
            Icon: IconPlug,
            tile: 'bg-green/15 text-green border-green',
        },
        {
            key: 'export',
            label: 'Export',
            detail: 'Send your data anywhere',
            Icon: IconServer,
            tile: 'bg-red/15 text-red border-red',
        },
    ],
    youAreHereLabel: 'You are here',
}

const question = (
    tool: string,
    to: string,
    fields: { question: string; summary: string; answer: string }
): Record<string, unknown> => ({ tool, to, tag: TOOL_TAGS[tool], Insight: PAGE_INSIGHTS[tool], ...fields })

export const queryExamples = {
    title: askTitle,
    lede: (
        <>
            See how we use Product Analytics to answer questions about <em>this actual page</em>.
        </>
    ),
    docsLinkLabel: 'Read the docs',
    insightLabel: 'Example data',
    questions: [
        question('Funnels', docs('funnels'), {
            question: 'How far down this page do people get?',
            summary:
                'Funnels show where people get stuck in a flow, so you can fix it. Like it or not, more people will always start a funnel than finish it.',
            answer: "64% make it to the diagram and 22% reach the FAQ. If you're still reading, you're in the top fifth. Congratulations, probably.",
        }),
        question('Trends', docs('trends/overview'), {
            question: 'How many people read this page this week?',
            summary:
                "Trends show how any number changes over time. Break it down by any property, or write a formula when one line isn't enough.",
            answer: "11,482 people, up 18% on last week. Tuesday's spike was our newsletter. Hi, newsletter readers.",
        }),
        question('Retention', docs('retention'), {
            question: 'Do people who sign up from this page come back?',
            summary:
                "Retention shows who comes back, and who never does. You can buy signups with ads. You can't buy people coming back.",
            answer: '61% are still active three weeks later. The other 39% are about to get a polite email.',
        }),
        question('Correlation', docs('correlation'), {
            question: 'What do people who sign up from here do differently?',
            summary:
                "Correlation analysis shows which events and properties make people more or less likely to convert, including the ones you didn't think to check.",
            answer: "People who click a question here are 2.8x more likely to sign up. Statistically, you're doing great.",
        }),
        question('Paths', docs('paths'), {
            question: 'Where do people go after this page?',
            summary: "Paths show the routes people take through your product. They're rarely the ones you designed.",
            answer: "31% sign up, 24% read the docs, and 27% close the tab. We're working on the 27%.",
        }),
        question('SQL', '/docs/data-warehouse/sql', {
            question: 'Which countries read this page the most?',
            summary: "SQL is for the questions the other tools don't cover. Analytics in hard mode.",
            answer: 'The US, then Germany, then the UK. Germans also reach the FAQ more often than anyone.',
        }),
    ],
}

export const midCTA = {
    title: 'Get started for free',
    description: 'Your first 1M events are free, every month.',
    platformsLabel: 'Available on',
    platforms: [
        {
            label: 'Web',
            description: 'Ask PostHog AI, or build it yourself.',
            Icon: IconBrowser,
            tile: 'bg-blue/15 text-blue',
            to: 'https://app.posthog.com/signup',
        },
        {
            label: 'CLI',
            description: 'Query from your terminal.',
            Icon: IconTerminal,
            tile: 'bg-red/15 text-red',
            to: '/docs/cli',
        },
        {
            label: 'MCP',
            description: 'Ask questions in Claude, Codex, wherever.',
            Icon: IconMCP,
            tile: 'bg-purple/15 text-purple',
            to: '/docs/model-context-protocol',
        },
        {
            label: 'Slack',
            description: 'Tag PostHog in any channel or thread.',
            Icon: IconSlack,
            tile: 'bg-yellow/20 text-primary',
            to: '/slack',
        },
        // TODO: link the app store pages when the mobile app launches.
        { label: 'Mobile', description: 'iOS and Android.', Icon: IconPhone, tile: 'bg-green/15 text-green' },
    ],
}

export const whyPostHog = {
    title: 'Why you should analyze your product with PostHog',
    badge: 'Opinion piece',
    lede: (
        <>
            There are{' '}
            <Link to="/compare" state={{ newWindow: true }} className={LINK_CLASSES}>
                lots of product analytics tools
            </Link>
            . We built the one we wanted, with an opinion behind every decision. Here are our spiciest takes.
        </>
    ),
    points: [
        {
            accent: 'border-blue',
            highlight: 'bg-blue/20',
            title: 'Autocapture is on by default',
            description: (
                <>
                    Adding events by hand is a pain, so{' '}
                    <Link to="/docs/product-analytics/autocapture" state={{ newWindow: true }} className={LINK_CLASSES}>
                        autocapture
                    </Link>{' '}
                    is on from day one. Turning it off is silly, but you can.
                </>
            ),
        },
        {
            accent: 'border-purple',
            highlight: 'bg-purple/20',
            title: "Product data alone isn't enough",
            description: (
                <>
                    Pageviews and rage clicks need context from tools like Stripe, so we built{' '}
                    <Link to="/docs/data-pipelines/sources" state={{ newWindow: true }} className={LINK_CLASSES}>
                        data sources
                    </Link>{' '}
                    to pull it in.
                </>
            ),
        },
        {
            accent: 'border-orange',
            highlight: 'bg-orange/20',
            title: 'Sessions are just as valuable as events',
            description: (
                <>
                    Pageviews are great, but sometimes you need context.{' '}
                    <Link to="/session-replay" state={{ newWindow: true }} className={LINK_CLASSES}>
                        Session replay
                    </Link>{' '}
                    shows the journey behind every click.
                </>
            ),
        },
        {
            accent: 'border-red',
            highlight: 'bg-red/20',
            title: 'Insights should help your agents ship',
            description: (
                <>
                    We like agents, so{' '}
                    <Link to="/self-driving" state={{ newWindow: true }} className={LINK_CLASSES}>
                        self-driving
                    </Link>{' '}
                    lets them use Product Analytics, report what they find, and propose fixes.
                </>
            ),
        },
        {
            accent: 'border-seagreen',
            highlight: 'bg-seagreen/20',
            title: "It's your data, not ours, obviously",
            description:
                "Sadly, not everyone agrees. You choose where it's hosted, the code is open source, and we never sell your data or train on it without permission.",
        },
        {
            accent: 'border-green',
            highlight: 'bg-green/20',
            title: 'Building should be fun, not expensive',
            description: (
                <>
                    Our{' '}
                    <Link to="/pricing" state={{ newWindow: true }} className={LINK_CLASSES}>
                        pricing
                    </Link>{' '}
                    lets small teams pay nothing, and our margins mean we never need dark patterns. We've never raised
                    prices.
                </>
            ),
        },
    ],
    customersTitle: 'Teams that agree with us',
    customers: [
        { slug: 'assemblyai', author: 'alberto_santos', caseStudyLabel: 'Why AssemblyAI left Mixpanel' },
        { slug: 'pry', author: 'andy_su', caseStudyLabel: 'How Pry grew registrations 20 to 30%' },
        { slug: 'mention-me', author: 'anca_filip', caseStudyLabel: 'Read the Mention Me story' },
        { slug: 'arena', author: 'lily_dinh', caseStudyLabel: 'Read the Arena story' },
    ],
}

const agentPrompt =
    'Read https://posthog.com/product-analytics and https://posthog.com/docs/billing/what-you-pay-for-per-event. Then tell me if PostHog Product Analytics is a good fit for my product, and what it would cost me. Ask me what you need to know first.'

export const closingCTA = {
    Hog: HedgehogHahaBizzniss,
    title: "Honestly, it's easiest if you just try it and see.",
    description:
        "Did we mention your first 1M events are free every month? That's how little we care about increasing shareholder value.",
    footer: (
        <>
            Still not sold? Ask your agent what it thinks (
            <Link
                to={`https://claude.ai/new?q=${encodeURIComponent(agentPrompt)}`}
                externalNoIcon
                className={LINK_CLASSES}
            >
                <IconClaudeCode className="inline-block size-4 mr-1 relative -top-px [&_path]:!fill-current" />
                Claude
            </Link>{' '}
            ·{' '}
            <Link
                to={`https://chatgpt.com/?q=${encodeURIComponent(agentPrompt)}`}
                externalNoIcon
                className={LINK_CLASSES}
            >
                <IconOpenAI className="inline-block size-4 mr-1 relative -top-px" />
                ChatGPT
            </Link>
            ), or{' '}
            <Link to="/demo" state={{ newWindow: true }} className={LINK_CLASSES}>
                watch our demo
            </Link>{' '}
            if you're feeling <s>Enterprisey</s> old fashioned.
        </>
    ),
}

/** Plain-text answers, so the same array feeds the accordion and the FAQPage structured data. */
export const faq = {
    title: 'An FAQ we wrote to help agents make sense of this page.',
    subtitle: '(But you can use it too.)',
    items: [
        {
            question: 'What does PostHog Product Analytics do?',
            answer: 'Product Analytics shows you what people do in your product. Autocapture tracks pageviews, clicks, and form submissions without extra code. From there you build trends, funnels, retention curves, paths, and SQL queries, then open the session recordings behind any data point when you need to see why.',
        },
        {
            question: 'What questions can I answer with it?',
            answer: "Trends show how a number changes over time, like revenue by country. Funnels show where people drop off between steps. Retention shows who comes back. Correlation analysis shows what converters do differently. Paths show what people do before or after an event. Lifecycle splits active users into new, returning, resurrecting, and dormant, so you can see whether you're growing or replacing people who left. Stickiness counts how many days people do something, which separates the people who tried a feature once from the people who can't stop. When none of those fit, write SQL.",
            link: { label: 'Product Analytics docs', to: '/docs/product-analytics' },
        },
        {
            question: 'Do I have to set up tracking for every event?',
            answer: 'No. Autocapture records pageviews, clicks, and form submissions as soon as you install the web SDK. Add custom events, like purchase_completed, when you need them. If you forgot to track something, you can define it later from autocaptured data with an action, and it applies to past data too.',
            link: { label: 'Autocapture docs', to: '/docs/product-analytics/autocapture' },
        },
        {
            question: 'Who is it for?',
            answer: 'Product engineers check whether what they shipped gets used. Product managers use funnels, retention, and paths to plan the roadmap. Growth engineers find conversion leaks and measure experiments. Founders watch KPIs on a shared dashboard without waiting on a data team. Support engineers pull the events behind a customer report and open the matching replay.',
        },
        {
            question: 'How is PostHog different from Amplitude or Mixpanel?',
            answer: "PostHog is one system, so agents can query your analytics and act on them, and you can jump from a graph to the replays behind it. You also get SQL access, automatic correlation analysis, and group analytics for B2B. There's no charge per seat, and the first 1M events every month are free.",
            link: { label: 'PostHog vs Amplitude', to: '/compare/posthog-vs-amplitude' },
        },
        {
            question: 'When is PostHog the wrong choice?',
            answer: "If you want all your analytics to live in your own warehouse, like Snowflake, a warehouse-native tool can suit you better. If you only need pageviews and traffic sources, use Web Analytics, which is simpler. If you sell analytics infrastructure, or your data doesn't fit an events table, building your own can be the better call.",
            link: { label: 'Web Analytics', to: '/web-analytics' },
        },
        {
            question: 'How much does it cost?',
            answer: 'Your first 1M events are free every month, and 97% of users never pay us anything. After that you pay per event, and the price per event drops as you send more. Anonymous events cost less than identified events, because person processing is the most expensive step in the pipeline. You can set a billing limit, and there are no annual contracts.',
            link: { label: 'Product Analytics pricing', to: '/product-analytics/pricing' },
        },
        {
            question: 'What do I get when I pay for an event?',
            answer: 'The price covers six jobs: getting the event in, making sure it is not lost, validating and enriching it, storing it for years, querying it as often as you like, and sending it to other tools. It also covers the on-call engineers who get paged when something breaks, so yours do not.',
            link: {
                label: 'What you actually get when you pay for an event',
                to: '/docs/billing/what-you-pay-for-per-event',
            },
        },
        {
            question: 'Do you charge to store or query my data?',
            answer: "No. The event price includes storage and the compute for every query in PostHog, including dashboards, SQL, and the queries PostHog AI runs. Asking PostHog AI a question spends AI credits on top. Each query has guard rails, like a 60-second default timeout, so one query can't slow down everyone else.",
        },
        {
            question: 'How long do you keep my data?',
            answer: 'Paid plans keep events for many years, and free plans keep them for one year. You can set a shorter window if you need one.',
            link: { label: 'Event retention', to: '/docs/data/events-retention' },
        },
        {
            question: 'Should I build my own analytics on ClickHouse instead?',
            answer: 'Agents make the first version faster to build than it used to be. Most of the cost arrives later: years of storage, compute for peak load, identity resolution, SDK upkeep, on-call, and every funnel or cohort feature someone asks for next. Our billing docs include a ledger you or your agent can fill in to compare both options at your volume.',
            link: { label: 'Compare build and buy', to: '/docs/billing/what-you-pay-for-per-event#your-own-ledger' },
        },
        {
            question: 'Can I write SQL and join other data?',
            answer: 'Yes. The SQL editor queries your events, persons, sessions, and groups directly. Sources sync data from Stripe, HubSpot, Postgres, S3, and other tools, so you can join it with your events in the same query.',
            link: { label: 'SQL docs', to: '/docs/data-warehouse/sql' },
        },
        {
            question: 'Can I analyze companies, not only users?',
            answer: 'Yes. Group analytics rolls up events to a company, team, or any other group you define, so B2B products can see how each account uses them.',
            link: { label: 'Group analytics docs', to: '/docs/product-analytics/group-analytics' },
        },
        {
            question: 'Can I send my data somewhere else?',
            answer: 'Yes. Batch exports send events to S3, Snowflake, BigQuery, Postgres, Redshift, Databricks, or Azure on a schedule. Destinations send events to tools like Slack and HubSpot in real time. If you leave PostHog, your data leaves with you.',
            link: { label: 'Batch exports docs', to: '/docs/data-pipelines/batch-exports' },
        },
        {
            question: 'Where can I use PostHog? Do you have an app?',
            answer: "Yes, we have an app for iOS and Android. You can also use PostHog via MCP in the harness of your choice, or via the CLI. Plus, we have a web app if you'd rather talk to the AI there or handcraft your insights.",
        },
        {
            question: 'How do I install it?',
            answer: 'Run the PostHog wizard with npx -y @posthog/wizard@latest, or paste the install prompt into your AI coding tool. It detects your framework and sets up the SDK. You can also install an SDK by hand for web, mobile, or your backend.',
            link: { label: 'SDK docs', to: '/docs/libraries' },
        },
    ],
    moreQuestionsTitle: 'More questions you can answer with Product Analytics',
}
