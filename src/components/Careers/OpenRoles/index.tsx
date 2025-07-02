import AshbyOpenRoles from 'components/AshbyOpenRoles'
import React from 'react'
import { Structure } from '../../Structure'
import { JobListings } from '../JobListings'

export const OpenRoles = () => {
    return (
        <section id="open-roles" className="@container px-8 @3xl:px-8">
            <h2 className="text-center text-5xl mb-12">Open roles</h2>

            <p>We take exceptional people when they come along - and we really mean that!</p>
            <p className="mt-2">
                Applications are taken seriously - you won't just end up in a candidate database. We make quick
                decisions, and if the timing isn’t quite right, we’ll do our best to provide insight into a better time
                to apply.
            </p>
            <p>
                Regardless of the timing of your application or interest in PostHog, you can go ahead and contribute to
                one of our{' '}
                <a href="https://github.com/PostHog/posthog/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22">
                    good first issues
                </a>
                .
            </p>
            <JobListings noId />
        </section>
    )
}
