import { HedgehogConstruction } from '@posthog/brand/hoggies'
import React from 'react'
import Link from 'components/Link'
import WizardCommand from 'components/WizardCommand'

const SIGNUP_URL = 'https://app.posthog.com/signup'

export default function SourcesHero(): JSX.Element {
    return (
        <section className="not-prose @container/hero">
            <div className="grid items-center gap-6 @2xl:grid-cols-[1.7fr_1fr] @2xl:gap-8">
                <div className="min-w-0">
                    <h1 className="m-0 text-balance !text-4xl font-bold !leading-tight text-primary @2xl:text-4xl">
                        <span className="rounded-md bg-blue/10 px-1 text-blue dark:bg-blue/20">Sources</span>, the ELT
                        tool from PostHog
                    </h1>
                    <p className="mb-0 mt-3 max-w-prose text-lg text-primary/70">
                        Sync 1,400+ tools and databases into PostHog, right next to your product data. Or send them to
                        any warehouse. 1M rows free every month.
                    </p>
                    <p className="mb-2 mt-6 text-sm font-bold text-primary">
                        See how many sources you can connect right now
                    </p>
                    <WizardCommand command="warehouse" slim className="!px-3 !py-1.5 [&_code]:text-base" />
                    <p className="mb-0 mt-2 max-w-md text-sm text-secondary">
                        The wizard scans your codebase for the tools you already use, then connects them for you. Or{' '}
                        <Link to={SIGNUP_URL} externalNoIcon className="font-semibold underline">
                            connect sources by hand
                        </Link>
                        .
                    </p>
                </div>
                <div className="order-first flex min-w-0 justify-start @2xl:order-none @2xl:justify-center">
                    <div className="flex w-full max-w-72 items-end justify-center @2xl:max-w-none">
                        <HedgehogConstruction variant="1" size={260} className="h-auto w-1/2 max-w-[260px]" />
                        <HedgehogConstruction variant="2" size={260} className="h-auto w-1/2 max-w-[260px]" />
                    </div>
                </div>
            </div>
        </section>
    )
}
