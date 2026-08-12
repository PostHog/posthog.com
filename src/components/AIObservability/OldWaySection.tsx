import React from 'react'
import { IconWarning, IconChat, IconSearch, IconStethoscope, IconCode, IconPullRequest } from '@posthog/icons'
import { StickerTombstone } from 'components/Stickers/Stickers'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import { FlowDiagram, type FlowStep } from 'components/Code/FlowDiagram'
import type { SectionComponentProps } from 'components/Products/ReaderViewProduct/types'
import { SectionLabel, InlineIcon } from 'components/ReplayVision/sectionHelpers'

// The manual AI-debugging workflow. Every step is on you — the logs just sit there.
const steps: FlowStep[] = [
    { label: '1. User reports\nan issue', icon: IconWarning, actor: 'Human' },
    { label: '2. Read transcripts\none by one', icon: IconChat, actor: 'Human' },
    { label: '3. Spot the\npattern', icon: IconSearch, actor: 'Human' },
    { label: '4. Guess which\nchange broke it', icon: IconStethoscope, actor: 'Human' },
    { label: '5. Write\nthe fix', icon: IconCode, actor: 'Human' },
    { label: '6. Ship\nand wait', icon: IconPullRequest, actor: 'Human' },
]

const OldWaySection = ({ id }: SectionComponentProps) => {
    return (
        <section id={id} className="scroll-mt-20 not-prose @container relative">
            <FlowDiagram
                className="mb-5 hidden @xl:block float-right ml-8 w-[350px]"
                steps={steps}
                headerLeft="Debugging AI"
                headerRight="(cir. 2023-2026)"
            />

            <SectionLabel>
                <InlineIcon icon={StickerTombstone} className="!size-10 !top-3 -rotate-1" /> The old way to run AI in
                production
            </SectionLabel>

            <p className="text-base leading-loose mb-5">
                Your AI fails quietly – a wrong answer here and a slow reply there. Traces tell you{' '}
                <RoughAnnotation type="underline" color="currentColor" strokeWidth={1.5}>
                    <em>what it said</em>
                </RoughAnnotation>
                , but you have to go read them, one by one.
            </p>

            <FlowDiagram
                className="mb-5 @xl:hidden"
                steps={steps}
                headerLeft="Debugging AI"
                headerRight="(cir. 2023-2026)"
            />

            <p className="text-base leading-loose">
                Just to make a simple fix, you have to read the transcripts, spot the pattern, and figure out which
                change broke it – <em>it's logs with a different schema</em>.
            </p>
        </section>
    )
}

export default OldWaySection
