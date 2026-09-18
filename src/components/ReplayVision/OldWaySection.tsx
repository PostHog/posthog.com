import React from 'react'
import { IconWarning, IconRewindPlay, IconSearch, IconStethoscope, IconCode, IconPullRequest } from '@posthog/icons'
import { StickerTombstone } from 'components/Stickers/Stickers'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import { FlowDiagram, type FlowStep } from 'components/Code/FlowDiagram'
import type { SectionComponentProps } from 'components/Products/ReaderViewProduct/types'
import { SectionLabel, InlineIcon, KeyBadge } from './sectionHelpers'

// The manual, pre-Replay-Vision workflow. Every step is on you — the tool just
// hands you the footage.
const steps: FlowStep[] = [
    { label: "1. Notice\nsomething's off", icon: IconWarning, actor: 'Human' },
    { label: '2. Watch hours\nof sessions', icon: IconRewindPlay, actor: 'Human' },
    { label: '3. Spot the\npattern', icon: IconSearch, actor: 'Human' },
    { label: '4. Diagnose\nthe cause', icon: IconStethoscope, actor: 'Human' },
    { label: '5. Write\nthe fix', icon: IconCode, actor: 'Human' },
    { label: '6. Ship', icon: IconPullRequest, actor: 'Human' },
]

const OldWaySection = ({ id }: SectionComponentProps) => {
    return (
        <section id={id} className="scroll-mt-20 not-prose @container relative">
            <FlowDiagram
                className="mb-5 hidden @xl:block float-right ml-8 w-[350px]"
                steps={steps}
                headerLeft="Using replay"
                headerRight="(cir. 2022-2026)"
            />

            <SectionLabel>
                <InlineIcon icon={StickerTombstone} className="!size-10 !top-3 -rotate-1" /> The old way to use session
                replay
            </SectionLabel>

            <p className="text-base leading-loose mb-5">
                Session replay tells you{' '}
                <RoughAnnotation type="underline" color="currentColor" strokeWidth={1.5}>
                    <em>what happened</em>
                </RoughAnnotation>
                , but only if you press{' '}
                <KeyBadge>
                    <span className="relative -top-px text-[10px]">▶</span> Play
                </KeyBadge>{' '}
                on session after session after session.
            </p>

            <FlowDiagram
                className="mb-5 @xl:hidden"
                steps={steps}
                headerLeft="Using replay"
                headerRight="(cir. 2022-2026)"
            />

            <p className="text-base leading-loose">
                You're the one who has to watch them all, spot the pattern, and figure out the fix –{' '}
                <em>the tool just hands you the footage</em>.
            </p>
        </section>
    )
}

export default OldWaySection
