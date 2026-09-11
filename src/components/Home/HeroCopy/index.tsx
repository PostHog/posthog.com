import React from 'react'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import { cn } from '../../../utils'

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

export const HeroHeadline = ({ className }: { className?: string }): JSX.Element => (
    <h1 className={cn('!text-3xl @xl:!text-4xl mt-0', className)}>
        Make your product{' '}
        <span className="bg-blue/10 dark:bg-blue/20 text-blue rounded-md px-1 @xl:whitespace-nowrap">self-driving</span>
    </h1>
)

export const HeroBody = (): JSX.Element => (
    <>
        <p className="text-balance @xl:text-wrap text-[17px]">
            PostHog already has your <Highlight>analytics and errors</Highlight>. Now it{' '}
            <Underline delay={900}>ships&nbsp;code</Underline> to help you build a better product.
        </p>
        <p className="text-balance @xl:text-wrap text-secondary">Join 500,000+ teams already shipping with PostHog.</p>
    </>
)
