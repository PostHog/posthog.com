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

const BodySelfDriving = (): JSX.Element => (
    <Paragraph>
        PostHog already has your <Highlight>analytics and errors</Highlight>. Now it{' '}
        <Underline delay={900}>ships&nbsp;code</Underline> to help you build a better product.
    </Paragraph>
)

const BodyDataFocus = (): JSX.Element => (
    <Paragraph>
        PostHog combines and stores your <Highlight>analytics, errors, replays, and business data</Highlight> so you and
        your <Underline delay={900}>agents</Underline> can understand and act on it.
    </Paragraph>
)

const BodyPartner = (): JSX.Element => (
    <Paragraph>
        PostHog <Highlight>understands your users</Highlight>, finds what needs improving, and helps you and your agents
        decide <Underline delay={900}>what to build next</Underline>.
    </Paragraph>
)

export type HeroCopyVariant = {
    id: string
    label: string
    /** The emphasis clause is the one that gets the blue highlight treatment. */
    headline: { lead: string; emphasis: string }
    Body: () => JSX.Element
}

export const HERO_COPY_VARIANTS: HeroCopyVariant[] = [
    {
        id: 'self-driving',
        label: 'Self-driving',
        headline: { lead: 'Make your product', emphasis: 'self-driving' },
        Body: BodySelfDriving,
    },
    {
        id: 'data-focus',
        label: 'Data focus',
        headline: { lead: "Your product's", emphasis: 'context layer' },
        Body: BodyDataFocus,
    },
    {
        id: 'partner',
        label: 'Product partner',
        headline: { lead: 'Build a', emphasis: 'better product' },
        Body: BodyPartner,
    },
]

export const DEFAULT_HERO_COPY_VARIANT = HERO_COPY_VARIANTS[0]

export function resolveHeroCopyVariant(value: string | null | undefined): HeroCopyVariant | null {
    if (!value) return null
    const normalized = value.trim().toLowerCase()
    return HERO_COPY_VARIANTS.find(({ id }) => id === normalized) ?? null
}
