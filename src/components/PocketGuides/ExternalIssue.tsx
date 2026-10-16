import React from 'react'

import { IconCheckCircle, IconGithub } from '@posthog/icons'

import AnatomyFrame from './AnatomyFrame'
import { FigureMarker } from './FigureMarker'

/** A useful GitHub handoff built in Error Tracking's editable external-reference form. */
export default function ExternalIssue(): JSX.Element {
    return (
        <AnatomyFrame className="rounded border border-primary bg-primary">
            <div className="flex items-center gap-1.5 border-b border-primary px-3 py-2 text-[0.68em] leading-none text-secondary">
                <IconGithub className="size-4 text-primary" aria-hidden="true" />
                <span className="text-primary">acme</span>
                <span>/</span>
                <span className="font-bold text-primary">storefront</span>
                <span className="ml-auto">Issues</span>
            </div>

            <div className="p-3 @md:p-4">
                <div className="flex flex-col gap-2 @md:flex-row @md:items-start @md:justify-between">
                    <p className="m-0 text-[0.95em] font-semibold leading-snug text-primary">
                        Checkout confirm fails for discounted carts{' '}
                        <span className="font-normal text-secondary">#381</span>
                    </p>
                    <div className="flex shrink-0 flex-wrap items-center gap-1.5 text-[0.62em] font-semibold leading-none">
                        <span className="rounded-full border border-orange px-2 py-1 text-orange">P1</span>
                        <span className="rounded-full border border-primary px-2 py-1 text-secondary">Payments</span>
                    </div>
                </div>

                <div className="mt-2 flex items-center gap-2 text-[0.68em] leading-none text-secondary">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green px-2 py-1 font-bold text-white">
                        <IconCheckCircle className="size-3" aria-hidden="true" /> Open
                    </span>
                    <span>opened just now</span>
                </div>

                <div className="mt-3 grid grid-cols-[2rem_minmax(0,1fr)] gap-2">
                    <div className="flex size-8 items-center justify-center rounded-full bg-accent text-[0.68em] font-bold text-primary dark:bg-accent-dark">
                        PH
                    </div>
                    <div className="min-w-0 rounded border border-primary">
                        <div className="border-b border-primary bg-accent px-3 py-2 text-[0.65em] text-secondary dark:bg-accent-dark">
                            posthog-app opened this issue just now
                        </div>
                        <div className="space-y-3 px-3 py-3 text-[0.72em] leading-relaxed text-primary">
                            <section>
                                <div className="mb-1 flex items-center justify-between gap-2">
                                    <h3 className="m-0 text-[1em] font-bold leading-none">Summary</h3>
                                </div>
                                <p className="m-0 text-secondary">
                                    Checkout confirmation fails when a cart contains a discounted item. No order is
                                    created, and the customer remains on the payment step.
                                </p>
                            </section>

                            <section className="border-t border-primary pt-3">
                                <div className="mb-2 flex items-center justify-between gap-2">
                                    <h3 className="m-0 text-[1em] font-bold leading-none">Impact</h3>
                                    <FigureMarker
                                        n={1}
                                        label="Impact"
                                        gloss="The handoff says how many sessions and accounts the issue affected, rather than reporting occurrence count alone."
                                        visibility="always"
                                    />
                                </div>
                                <dl className="m-0 grid grid-cols-3 gap-2 text-center">
                                    <div>
                                        <dt className="text-[0.9em] text-secondary">Sessions</dt>
                                        <dd className="m-0 font-bold">47</dd>
                                    </div>
                                    <div className="border-x border-primary px-1">
                                        <dt className="text-[0.9em] text-secondary">Accounts</dt>
                                        <dd className="m-0 font-bold">12</dd>
                                    </div>
                                    <div>
                                        <dt className="text-[0.9em] text-secondary">Paid plans</dt>
                                        <dd className="m-0 font-bold">3</dd>
                                    </div>
                                </dl>
                            </section>

                            <section className="border-t border-primary pt-3">
                                <div className="mb-2 flex items-center justify-between gap-2">
                                    <h3 className="m-0 text-[1em] font-bold leading-none">Evidence</h3>
                                    <FigureMarker
                                        n={2}
                                        label="Evidence"
                                        gloss="The exception, source frame, release, and session behavior narrow the failure to one code path."
                                        visibility="always"
                                    />
                                </div>
                                <div className="space-y-1.5 text-secondary">
                                    <p className="m-0 font-mono text-[0.9em] text-primary">
                                        TypeError: Cannot read properties of undefined (reading 'total')
                                    </p>
                                    <p className="m-0">
                                        Top frame: <code>src/checkout/confirm.ts:42:18</code>
                                    </p>
                                    <p className="m-0">
                                        First seen four minutes after <code>web@1.4.2</code>. Affected recordings show
                                        repeated clicks on <strong>Confirm order</strong>.
                                    </p>
                                </div>
                            </section>

                            <section className="border-t border-primary pt-3">
                                <h3 className="m-0 mb-1 text-[1em] font-bold leading-none">Suggested fix</h3>
                                <p className="m-0 text-secondary">
                                    Set <code>cart.pricing.total</code> on the discount path, and fall back to summing
                                    line items when it is missing.
                                </p>
                            </section>

                            <p className="m-0 flex items-start justify-between gap-2 border-t border-primary pt-3">
                                <span className="min-w-0">
                                    <span className="font-bold">PostHog issue:</span>{' '}
                                    <span className="break-all text-orange underline">
                                        app.posthog.com/error_tracking/...
                                    </span>
                                </span>
                                <FigureMarker
                                    n={3}
                                    label="Source data"
                                    gloss="The backlink opens the live issue with every exception, stack frame, recording, and affected person."
                                    visibility="always"
                                />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AnatomyFrame>
    )
}
