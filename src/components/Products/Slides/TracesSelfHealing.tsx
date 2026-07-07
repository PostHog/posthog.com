import React from 'react'
import TabbedCarousel from 'components/TabbedCarousel'
import type { TabbedCarouselTab } from 'components/TabbedCarousel'

// "Your product, fixing itself" section. Uses the same tabbed carousel layout as
// the "How a product improves itself" section on /self-driving. The section
// headline + intro stay constant; each tab swaps in its own copy. Per-tab
// illustrations will be added later.
const SELF_HEALING_HEADLINE = 'Your product, fixing itself'
const SELF_HEALING_INTRO =
    'Point a scout at your slowest traces. It runs on a schedule, and when a query or endpoint starts creeping up, it reports the regression and kicks off an investigation into why.'
const TRACE_IS_THE_EVIDENCE =
    'Throughout, the trace is the evidence: what the scout watches to raise the alarm, and what the agent reads to land the fix on the right line.'

const steps: {
    value: string
    label: string
    color: string
    activeText: string
    progressBar: string
    copy: string
}[] = [
    {
        value: 'scout',
        label: 'Scout',
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        copy: 'You set a scout to watch your slowest traces. It runs on a schedule and keeps an eye on the queries and endpoints that matter.',
    },
    {
        value: 'signal',
        label: 'Signal',
        color: 'bg-red',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        copy: 'Latency on GET /api/checkout starts climbing. The scout catches it and files a report. Nobody had to notice first.',
    },
    {
        value: 'investigate',
        label: 'Investigate',
        color: 'bg-purple',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        copy: 'The agent pulls the slow traces, lines them up against the fast ones, and finds the span they share: the inventory service firing one DB query per cart item. Classic N+1.',
    },
    {
        value: 'pr',
        label: 'PR',
        color: 'bg-green',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        copy: 'The agent fixes the exact query it located and opens a pull request, wired up with the instrumentation to measure whether it worked.',
    },
    {
        value: 'merge',
        label: 'Merge',
        color: 'bg-yellow',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
        copy: 'You review the diff in your Inbox and hit merge. Nothing ships until you do.',
    },
]

const TabPanel = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="rounded bg-primary p-4 @xl:p-6 h-full flex flex-col justify-center">
        <h2 className="mt-0 mb-3 text-3xl @xl:text-4xl font-bold">{title}</h2>
        <div className="text-secondary text-lg @xl:text-xl !leading-normal">{children}</div>
    </div>
)

const tabs: TabbedCarouselTab[] = steps.map((step) => ({
    value: step.value,
    label: step.label,
    color: step.color,
    activeText: step.activeText,
    progressBar: step.progressBar,
    content: (
        <TabPanel title={step.label}>
            <p className="m-0">{step.copy}</p>
        </TabPanel>
    ),
}))

export default function TracesSelfHealing(): JSX.Element {
    return (
        <div className="h-full text-primary bg-primary overflow-auto p-4 @md:p-8 flex flex-col justify-center">
            <div className="max-w-4xl mx-auto w-full">
                <h1 className="text-4xl @2xl:text-5xl font-bold mb-2">{SELF_HEALING_HEADLINE}</h1>
                <p className="text-lg @2xl:text-xl text-secondary mb-6">{SELF_HEALING_INTRO}</p>
                <div className="not-prose">
                    <TabbedCarousel tabs={tabs} />
                </div>
                <p className="text-base @2xl:text-lg text-secondary mt-6">{TRACE_IS_THE_EVIDENCE}</p>
            </div>
        </div>
    )
}
