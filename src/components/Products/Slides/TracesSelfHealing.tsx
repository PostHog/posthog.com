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
    image?: string
}[] = [
    {
        value: 'scout',
        label: 'Scout',
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        copy: 'Turn on the APM scout. It watches latency and request volume per service, on a schedule, and files any regression as a report.',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Scout_troop_Mock_b59fadf110.png',
    },
    {
        value: 'signal',
        label: 'Signal',
        color: 'bg-red',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        copy: 'Latency on GET /api/checkout starts climbing. The scout catches it and files a report. Nobody had to notice first.',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Post_Hog_Inbox_Mock_6485bb0963.png',
    },
    {
        value: 'investigate',
        label: 'Investigate',
        color: 'bg-purple',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        copy: 'The agent pulls the slow traces, lines them up against the fast ones, and finds the span they share: the inventory service firing one DB query per cart item. Classic N+1.',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Report_Investigate_Mock_2_76290ef07e.png',
    },
    {
        value: 'pr',
        label: 'PR',
        color: 'bg-green',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        copy: 'The agent fixes the exact query it located and opens a pull request, wired up with the instrumentation to measure whether it worked.',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Git_Hub_PR_Mock_1_8c4240dc83.png',
    },
    {
        value: 'merge',
        label: 'Merge',
        color: 'bg-yellow',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
        copy: 'You review the diff in your Inbox and hit merge. Nothing ships until you do.',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Git_Hub_PR_Merged_Mock_1_5b9cf8f4b5.png',
    },
]

const TabPanel = ({ title, children, image }: { title: string; children: React.ReactNode; image?: string }) => (
    <div className="rounded bg-primary p-4 @xl:p-6 h-full flex flex-col justify-center">
        <div className="text-secondary text-lg @xl:text-xl !leading-normal">{children}</div>
        {image && (
            <img src={image} alt={title} className="mt-6 block w-full rounded-md border border-primary shadow-lg" />
        )}
    </div>
)

const tabs: TabbedCarouselTab[] = steps.map((step) => ({
    value: step.value,
    label: step.label,
    color: step.color,
    activeText: step.activeText,
    progressBar: step.progressBar,
    content: (
        <TabPanel title={step.label} image={step.image}>
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
