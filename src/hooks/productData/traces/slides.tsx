import React from 'react'
import { IconCheck, IconFunnels, IconGanttChart, IconRewindPlay, IconWarning } from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import { InlineCode } from 'components/Products/ReaderViewProduct/helpers'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'

const TAB_STYLE = {
    color: 'bg-light dark:bg-dark',
    activeText: 'text-primary',
    progressBar: 'bg-blue',
}

/**
 * Applications = the self-driving loop, one tab per step. A scout watches the
 * traces, the agent reads them to locate the fix, and you merge the result.
 */
export const applications: CarouselSlide[] = [
    {
        slug: 'scout',
        label: 'Scout',
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        layout: 'stack',
        heading: 'Your product, fixing itself',
        description: (
            <>
                <p>
                    Point a scout at your slowest traces. It runs on a schedule, and when a query or endpoint starts
                    creeping up, it reports the regression and kicks off an investigation into why.
                </p>
                <p>
                    Turn on the APM scout. It watches latency and request volume per service, on a schedule, and files
                    any regression as a report.
                </p>
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Scout_troop_Mock_b59fadf110.png',
            alt: 'A scout watching latency per service',
        },
    },
    {
        slug: 'signal',
        label: 'Signal',
        color: 'bg-red',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        layout: 'stack',
        description:
            'Latency on GET /api/checkout starts climbing. The scout catches it and files a report. Nobody had to notice first.',
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Post_Hog_Inbox_Mock_6485bb0963.png',
            alt: 'A latency regression reported in the Inbox',
        },
    },
    {
        slug: 'investigate',
        label: 'Investigate',
        color: 'bg-purple',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        layout: 'stack',
        description:
            'The agent pulls the slow traces, lines them up against the fast ones, and finds the span they share: the inventory service firing one DB query per cart item. Classic N+1.',
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Report_Investigate_Mock_2_76290ef07e.png',
            alt: 'An agent investigating the slow span',
        },
    },
    {
        slug: 'pr',
        label: 'PR',
        color: 'bg-green',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        layout: 'stack',
        description:
            'The agent fixes the exact query it located and opens a pull request, wired up with the instrumentation to measure whether it worked.',
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Git_Hub_PR_Mock_1_8c4240dc83.png',
            alt: 'A pull request with the fix',
        },
    },
    {
        slug: 'merge',
        label: 'Merge',
        color: 'bg-yellow',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
        layout: 'stack',
        description: (
            <>
                <p>You review the diff in your Inbox and hit merge. Nothing ships until you do.</p>
                <p>
                    Throughout, the trace is the evidence: what the scout watches to raise the alarm, and what the agent
                    reads to land the fix on the right line.
                </p>
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Git_Hub_PR_Merged_Mock_1_5b9cf8f4b5.png',
            alt: 'The merged pull request',
        },
    },
]

// Every other signal says *that* something is wrong. The trace says where.
const catnipSignals = [
    {
        icon: IconWarning,
        title: 'Error tracking',
        description: 'A request broke.',
    },
    {
        icon: IconRewindPlay,
        title: 'Session replay',
        description: 'A user waited, then left.',
    },
    {
        icon: IconFunnels,
        title: 'Funnel drop-off',
        description: 'Checkout conversion fell.',
    },
    {
        icon: IconGanttChart,
        title: 'A trace',
        description: '“Checkout took 3.2s, and 2.8s of it was waiting on an N+1 query in the inventory service.”',
        highlight: true,
    },
]

const slackChecklist = [
    'Find which span made a request slow',
    'Follow a failure across services',
    'Catch p99 you can’t reproduce',
    'Surface async work that usually hides',
    'Turn a trace into a PR',
]

export const topFeatures: CarouselSlide[] = [
    {
        slug: 'waterfall',
        label: 'Trace waterfall',
        ...TAB_STYLE,
        layout: 'stack',
        heading: 'Every span of a request, in one waterfall',
        description: (
            <>
                <p>One request becomes a tree of spans across every service, queue, and third-party call it touches.</p>
                <p>
                    Follow the <InlineCode>trace_id</InlineCode> to see where the time went and which span actually
                    broke – even across async boundaries, where stack traces give up.
                </p>
                <p>
                    Built on OpenTelemetry: no proprietary SDK. Point your existing exporter at PostHog and you’re done.
                </p>
                <p>
                    Traces land in the same project as your replays, errors, logs, and analytics – with correlated logs
                    on every span.
                </p>
            </>
        ),
        image: { ref: 'waterfall' },
    },
    {
        slug: 'catnip',
        label: 'Catnip for agents',
        ...TAB_STYLE,
        layout: 'stack',
        heading: 'Catnip for agents',
        description: (
            <>
                <p>
                    Every signal source tells self-driving <em>that</em> something is wrong. Traces are the only one
                    that says <em>where and why.</em>
                </p>
                <ul className="grid @xl:grid-cols-2 gap-4 p-0 m-0 list-none">
                    {catnipSignals.map(({ icon: Icon, title, description, highlight }) => (
                        <li
                            key={title}
                            className={`flex items-start gap-4 rounded border p-4 ${
                                highlight ? 'border-secondary bg-accent' : 'border-primary'
                            }`}
                        >
                            <Icon className={`size-8 shrink-0 ${highlight ? 'text-blue' : 'text-secondary'}`} />
                            <div>
                                <strong className="block text-primary mb-1 text-lg">{title}</strong>
                                <span>{description}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <p className="mt-6">
                    The first three are symptoms. The trace is the one that hands an agent the right location. The agent
                    starts where the trace points and fixes the span that’s actually slow.
                </p>
            </>
        ),
    },
    {
        slug: 'slack',
        label: 'PostHog in Slack',
        ...TAB_STYLE,
        layout: 'stack',
        heading: 'Latency? @PostHog',
        description: (
            <>
                <p>
                    Mention <InlineCode>@PostHog</InlineCode> on a slow endpoint. It pulls the traces, finds the span
                    eating your time, and opens a PR right there in the thread. You review without leaving the channel.
                </p>
                <ul className="space-y-2 list-none p-0 m-0 mb-6">
                    {slackChecklist.map((item) => (
                        <li key={item} className="relative pl-6">
                            <IconCheck className="size-5 text-green absolute left-0 top-1" />
                            {item}
                        </li>
                    ))}
                </ul>
                <CallToAction to="/slack" type="primary" size="md">
                    About the Slack app
                </CallToAction>
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Group_144141_842b4283dd.png',
            alt: 'PostHog in Slack, fixing a slow trace',
        },
    },
]
