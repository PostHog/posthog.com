import React from 'react'
import { cn } from '../../../utils'
import { HERO_HEADLINE, HeroBodyCopy } from './variants'

export const HeroHeadline = ({ className }: { className?: string }): JSX.Element => (
    <h1 className={cn('!text-3xl @xl:!text-4xl mt-0', className)}>
        {HERO_HEADLINE.lead}{' '}
        <span className="bg-blue/10 dark:bg-blue/20 text-blue rounded-md px-1 @xl:whitespace-nowrap">
            {HERO_HEADLINE.emphasis}
        </span>
    </h1>
)

export const HeroBody = (): JSX.Element => (
    <>
        <HeroBodyCopy />
        <p className="text-balance @xl:text-wrap text-secondary">Join 500,000+ teams already shipping with PostHog.</p>
    </>
)
