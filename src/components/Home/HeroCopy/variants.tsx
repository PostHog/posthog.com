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

const BodyControl = (): JSX.Element => (
    <Paragraph>
        PostHog already has your <Highlight>analytics and errors</Highlight>. Now it{' '}
        <Underline delay={900}>ships&nbsp;code</Underline> to help you build a better product.
    </Paragraph>
)

const BodyTest = (): JSX.Element => (
    <Paragraph>
        PostHog combines and stores your <Highlight>analytics, errors, replays, and business data</Highlight> so you and
        your <Underline delay={900}>agents</Underline> can understand and act on it.
    </Paragraph>
)

export type HeroCopyVariant = {
    id: string
    /** The emphasis clause is the one that gets the blue highlight treatment. */
    headline: { lead: string; emphasis: string }
    Body: () => JSX.Element
}

export const HERO_COPY_VARIANTS: HeroCopyVariant[] = [
    {
        id: 'control',
        headline: { lead: 'Make your product', emphasis: 'self-driving' },
        Body: BodyControl,
    },
    {
        id: 'test',
        headline: { lead: 'Give your agents', emphasis: 'product context' },
        Body: BodyTest,
    },
]

export const DEFAULT_HERO_COPY_VARIANT = HERO_COPY_VARIANTS[0]

export function resolveHeroCopyVariant(value: string | null | undefined): HeroCopyVariant | null {
    if (!value) return null
    const normalized = value.trim().toLowerCase()
    return HERO_COPY_VARIANTS.find(({ id }) => id === normalized) ?? null
}
