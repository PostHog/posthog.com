import React from 'react'
import { IconEye, IconLlmPromptEvaluation, IconBell, IconPullRequest, IconCheckCircle } from '@posthog/icons'
import { Logo } from '@posthog/brand/logo'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import { FlowDiagram, type FlowStep } from 'components/Code/FlowDiagram'
import type { SectionComponentProps } from 'components/Products/ReaderViewProduct/types'
import { SectionLabel } from 'components/ReplayVision/sectionHelpers'

// The AI Observability loop: capture, score, watch, investigate, fix – you only
// step in to review and merge.
const steps: FlowStep[] = [
    { label: 'AI Observability', description: 'captures every generation', icon: IconEye, actor: 'Machine' },
    {
        label: 'Evals & alerts',
        description: 'score and watch live traffic',
        icon: IconLlmPromptEvaluation,
        actor: 'Machine',
    },
    { label: 'Alerts', description: 'report to your inbox', icon: IconBell, actor: 'Machine' },
    { label: 'Agent', description: 'investigates and opens the PR', icon: IconPullRequest, actor: 'Machine' },
    { label: 'You', description: 'review & merge', icon: IconCheckCircle, actor: 'Human' },
]

const PostHogWaySection = ({ id }: SectionComponentProps) => {
    return (
        <section id={id} className="scroll-mt-20 not-prose @container relative">
            <FlowDiagram
                className="mb-5 hidden @xl:block float-right ml-8 w-[350px]"
                steps={steps}
                headerLeft="The loop"
                headerRight="(cir. 2026–)"
            />

            <SectionLabel className="flex items-baseline gap-2">
                The <Logo layout="logomark" width="auto" className="inline-block w-10" /> PostHog way
            </SectionLabel>

            <p className="text-base leading-loose mb-5">
                <strong>AI Observability</strong> captures the full context of each generation and connects it to other
                PostHog products (like Session Replay). Evals score your live traffic and anomaly alerts learn what
                normal looks like,{' '}
                <RoughAnnotation type="highlight" color="rgba(48, 164, 108, 0.2)" strokeWidth={1} padding={2} multiline>
                    so regressions in tool calling, response quality, or latency automatically turn into{' '}
                    <strong>signals</strong>
                </RoughAnnotation>
                .
            </p>

            <FlowDiagram className="mb-5 @xl:hidden" steps={steps} headerLeft="The loop" headerRight="(cir. 2026–)" />

            <p className="text-base leading-loose">
                With each regression, an agent investigates and creates a report in your <strong>Inbox</strong>.{' '}
                <RoughAnnotation type="underline" color="#30A46C" strokeWidth={2} multiline>
                    When there's code to fix, it <em>opens a pull request</em>.
                </RoughAnnotation>{' '}
                Your AI improves while you sleep.
            </p>
        </section>
    )
}

export default PostHogWaySection
