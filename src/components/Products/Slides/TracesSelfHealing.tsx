import React from 'react'
import SelfDrivingStory from 'components/SelfDrivingStory'
import type { SelfDrivingStoryStep } from 'components/SelfDrivingStory'

// "Your product, fixing itself" section. Uses the shared SelfDrivingStory carousel
// (the same Scout → Signal → Investigate → PR → Merge walkthrough reused on
// /ship-with-posthog). The section headline + intro stay constant; each tab swaps
// in its own copy and screenshot.
const SELF_HEALING_HEADLINE = 'Your product, fixing itself'
const SELF_HEALING_INTRO =
    'Point a scout at your slowest traces. It runs on a schedule, and when a query or endpoint starts creeping up, it reports the regression and kicks off an investigation into why.'
const TRACE_IS_THE_EVIDENCE =
    'Throughout, the trace is the evidence: what the scout watches to raise the alarm, and what the agent reads to land the fix on the right line.'

const steps: SelfDrivingStoryStep[] = [
    {
        copy: 'Turn on the APM scout. It watches latency and request volume per service, on a schedule, and files any regression as a report.',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Scout_troop_Mock_b59fadf110.png',
    },
    {
        copy: 'Latency on GET /api/checkout starts climbing. The scout catches it and files a report. Nobody had to notice first.',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Post_Hog_Inbox_Mock_6485bb0963.png',
    },
    {
        copy: 'The agent pulls the slow traces, lines them up against the fast ones, and finds the span they share: the inventory service firing one DB query per cart item. Classic N+1.',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Report_Investigate_Mock_2_76290ef07e.png',
    },
    {
        copy: 'The agent fixes the exact query it located and opens a pull request, wired up with the instrumentation to measure whether it worked.',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Git_Hub_PR_Mock_1_8c4240dc83.png',
    },
    {
        copy: 'You review the diff in your Inbox and hit merge. Nothing ships until you do.',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Git_Hub_PR_Merged_Mock_1_5b9cf8f4b5.png',
    },
]

export default function TracesSelfHealing(): JSX.Element {
    return (
        <div className="flex h-full flex-col justify-center overflow-auto bg-primary p-4 text-primary @md:p-8">
            <SelfDrivingStory
                className="mx-auto w-full max-w-4xl"
                headline={SELF_HEALING_HEADLINE}
                intro={SELF_HEALING_INTRO}
                footer={TRACE_IS_THE_EVIDENCE}
                steps={steps}
            />
        </div>
    )
}
