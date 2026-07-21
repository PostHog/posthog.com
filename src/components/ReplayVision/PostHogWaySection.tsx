import React, { useState } from 'react'
import { IconEye, IconGraph, IconBell, IconPullRequest, IconCheckCircle } from '@posthog/icons'
import Logo from 'components/Logo'
import { ChoppyReveal } from 'components/Code/ChoppyReveal'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import { IconPop } from 'components/Code/IconPop'
import { FlowDiagram, type FlowStep } from 'components/Code/FlowDiagram'
import type { SectionComponentProps } from 'components/Products/ReaderViewProduct/types'
import { SectionLabel, KeyBadge } from './sectionHelpers'

// The Replay Vision loop: the machine does the watching, diagnosing, and
// patching – you only step in to review and merge.
const steps: FlowStep[] = [
    { label: 'Replay Vision', description: 'watches the sessions', icon: IconEye, actor: 'Machine' },
    { label: 'Observation', description: 'what happened, as data', icon: IconGraph, actor: 'Machine' },
    { label: 'Signal', description: 'raised to your Inbox', icon: IconBell, actor: 'Machine' },
    { label: 'Agent', description: 'opens the PR', icon: IconPullRequest, actor: 'Machine' },
    { label: 'You', description: 'review & merge', icon: IconCheckCircle, actor: 'Human' },
]

const PostHogWaySection = ({ id }: SectionComponentProps) => {
    const [p1Done, setP1Done] = useState(false)

    return (
        <section id={id} className="scroll-mt-20 not-prose @container relative">
            <SectionLabel>
                The{' '}
                <IconPop>
                    <Logo wordmark={false} className="inline-block align-middle w-10 relative top-1 -rotate-2" />
                </IconPop>{' '}
                PostHog way
            </SectionLabel>

            <FlowDiagram
                className="mb-5 hidden @xl:block float-right ml-8 w-[350px]"
                steps={steps}
                headerLeft="The loop"
                headerRight="(cir. 2026–)"
            />

            <p className="text-base leading-loose mb-5">
                <ChoppyReveal wordDelay={40} onComplete={() => setP1Done(true)}>
                    <strong>Replay Vision</strong>
                    {' watches your session recordings for you. Describe what to look for once, and a scanner reads '}
                    {'every matching session, video and events, and turns what it sees into '}
                    <RoughAnnotation
                        type="highlight"
                        color="rgba(48, 164, 108, 0.2)"
                        strokeWidth={1}
                        padding={2}
                        multiline
                    >
                        <strong>structured observations</strong>
                    </RoughAnnotation>
                    {' you can query, chart, and alert on.'}
                </ChoppyReveal>
            </p>

            <FlowDiagram className="mb-5 @xl:hidden" steps={steps} headerLeft="The loop" headerRight="(cir. 2026–)" />

            <p className="text-base leading-loose">
                <ChoppyReveal wordDelay={40} initialDelay={p1Done ? 0 : 999999}>
                    {"The friction you'd never have watched becomes a signal in your "}
                    <strong>Inbox</strong>
                    {' – where an agent picks it up and '}
                    <RoughAnnotation type="underline" color="#30A46C" strokeWidth={2}>
                        <em>opens the pull request</em>
                    </RoughAnnotation>
                    {'. You just hit '}
                    <KeyBadge>
                        Merge <span className="relative top-px">↵</span>
                    </KeyBadge>
                    {'.'}
                </ChoppyReveal>
            </p>
        </section>
    )
}

export default PostHogWaySection
