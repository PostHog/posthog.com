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

const BodyControl = () => (
    <>
        <Paragraph>PostHog already knows your customers, which features they use, and the issues they have.</Paragraph>
        <Paragraph>
            Now, PostHog automatically <Highlight>diagnoses problems</Highlight>,{' '}
            <Highlight delay={500}>fixes bugs</Highlight>, and{' '}
            <Highlight delay={900}>generates pull requests</Highlight>
            {' – all '}
            <Underline delay={1800}>without you having to prompt it.</Underline>
        </Paragraph>
    </>
)

const BodyInstruments = () => (
    <Paragraph>
        PostHog <Highlight>instruments your codebase</Highlight>, then combines that context with product data like
        analytics, errors, and recordings to <Underline delay={900}>understand problems and propose fixes.</Underline>
    </Paragraph>
)

const BodyReviewAndMerge = () => (
    <Paragraph>
        PostHog agents <Highlight>generate reports</Highlight> from your analytics, errors, and recordings for you to
        act on. All you have to do is <Underline delay={900}>review and hit merge.</Underline> If you want to.
    </Paragraph>
)

const BodyShipsCode = () => (
    <Paragraph>
        PostHog already has your <Highlight>analytics and errors</Highlight>. Now it{' '}
        <Underline delay={900}>ships code</Underline> to help you build a better product.
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
        headline: { lead: 'Shift your product into', emphasis: 'self-driving mode' },
        Body: BodyControl,
    },
    {
        id: 'variant-1',
        headline: { lead: 'Make your product', emphasis: 'self-driving' },
        Body: BodyInstruments,
    },
    {
        id: 'variant-2',
        headline: { lead: 'Shift your product into', emphasis: 'self-driving mode' },
        Body: BodyReviewAndMerge,
    },
    {
        id: 'variant-3',
        headline: { lead: 'Make your product', emphasis: 'self-driving' },
        Body: BodyShipsCode,
    },
]

export const DEFAULT_HERO_COPY_VARIANT = HERO_COPY_VARIANTS[0]

export function resolveHeroCopyVariant(value: string | null | undefined): HeroCopyVariant | null {
    if (!value) return null
    const normalized = value.trim().toLowerCase()
    return HERO_COPY_VARIANTS.find(({ id }) => id === normalized) ?? null
}
