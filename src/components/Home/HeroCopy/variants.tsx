import React from 'react'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'

const Highlight = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <RoughAnnotation
        type="highlight"
        color="rgba(247, 165, 1, 0.15)"
        strokeWidth={1}
        padding={2}
        delay={delay}
        multiline
    >
        {children}
    </RoughAnnotation>
)

const Underline = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <RoughAnnotation
        type="underline"
        color="currentColor"
        strokeWidth={1}
        delay={delay}
        multiline
        className="text-secondary"
    >
        {children}
    </RoughAnnotation>
)

const Paragraph = ({ children }: { children: React.ReactNode }) => (
    <p className="text-balance @xl:text-wrap text-[17px]">{children}</p>
)

/** The emphasis clause is the one that gets the blue highlight treatment. */
export const HERO_HEADLINE = { lead: 'Your product’s', emphasis: 'context layer' }

export const HeroBodyCopy = (): JSX.Element => (
    <Paragraph>
        PostHog ingests and stores your <Highlight>analytics, errors, replays, and business data</Highlight> so you and
        your <Underline delay={900}>agents</Underline> can query and act on it.
    </Paragraph>
)
