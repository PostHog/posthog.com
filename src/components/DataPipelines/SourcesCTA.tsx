import { HedgehogDeskWizard } from '@posthog/brand/hoggies'
import React from 'react'
import Link from 'components/Link'
import WizardCommand from 'components/WizardCommand'
import { WINDOW_BG } from 'constants/frostedSurfaces'

const SIGNUP_URL = 'https://app.posthog.com/signup'

export default function SourcesCTA(): JSX.Element {
    return (
        <section className="not-prose mb-12">
            <div
                className={`@container relative mt-6 grid items-center gap-6 overflow-visible rounded-lg border border-primary p-5 @md:p-10 @3xl:grid-cols-3 @3xl:gap-8 ${WINDOW_BG}`}
            >
                <div className="min-w-0 @3xl:col-span-2">
                    <h3 className="mb-2 mt-0 text-xl font-bold text-primary @xl:text-2xl">
                        Let AI connect your sources for you
                    </h3>
                    <p className="m-0 text-sm text-primary @xl:text-base">
                        Run this in your project and the wizard detects your databases and APIs, then connects them.
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                        <WizardCommand command="warehouse" slim className="!px-3 !py-1.5 [&_code]:text-base" />
                        <p className="m-0 text-sm text-secondary">
                            or{' '}
                            <Link to={SIGNUP_URL} externalNoIcon className="font-semibold underline">
                                connect by hand
                            </Link>
                        </p>
                    </div>
                </div>
                <figure className="order-first mx-0 -mb-4 -mt-24 flex min-w-0 justify-start @md:-mt-24 @3xl:order-none @3xl:-mb-12 @3xl:-mt-24 @3xl:justify-center">
                    <HedgehogDeskWizard aria-hidden="true" className="h-auto w-full max-w-56 @3xl:max-w-72" />
                </figure>
            </div>
        </section>
    )
}
