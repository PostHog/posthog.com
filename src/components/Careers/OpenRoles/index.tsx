import AshbyOpenRoles from 'components/AshbyOpenRoles'
import React from 'react'
import { Structure } from '../../Structure'

export const OpenRoles = () => {
    return (
        <div id="open-roles" className="mt-16">
            <Structure.Section width="5xl" className="">
                <h2 className="text-center text-5xl mb-12">Open roles</h2>

                <div className="md:flex">
                    <div className="flex-1 max-w-md md:mr-16 md:mt-4 mb-12 md:mb-0 mx-auto">
                        <p>We take exceptional people when they come along - and we really mean that!</p>
                        <p>
                            <strong>Don’t see a specific role listed?</strong> That doesn't mean we won't have a spot
                            for you. <a href="/careers/speculative-application">Send us a speculative application!</a>
                            <a href=""></a>
                        </p>
                        <p className="mt-2">
                            We take applications seriously - you won't just end up in a candidate database. We make
                            quick decisions, and if the timing isn’t quite right, we’ll do our best to provide insight
                            into a better time to apply.
                        </p>
                        <p>
                            Regardless of the timing of your application or interest in PostHog, you can go ahead and
                            contribute to one of our{' '}
                            <a href="https://github.com/PostHog/posthog/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22">
                                good first issues
                            </a>
                            .
                        </p>
                    </div>
                    <div className="flex-1 max-w-md mx-auto">
                        <AshbyOpenRoles />
                    </div>
                </div>
            </Structure.Section>
        </div>
    )
}
