import Link from 'components/Link'
import React from 'react'
import Section from './Section'
import { Change } from '../../templates/Changelog'
import { UnderConsideration } from 'components/Roadmap/UnderConsideration'

export default function Roadmap({
    hasUnderConsideration,
    underConsideration,
    recentlyShipped,
}: {
    hasUnderConsideration: boolean
    underConsideration?: any[]
    recentlyShipped?: any
}): JSX.Element {
    return (
        <div id="roadmap">
            {hasUnderConsideration && (
                <Section title="Roadmap">
                    <p className="-mt-2">
                        Here’s what we’re considering building next. Vote for your favorites or share a new idea on{' '}
                        <Link to="https://github.com/PostHog/posthog">GitHub</Link>.
                    </p>
                    <div className="max-w-2xl">
                        <ul className="list-none m-0 p-0 space-y-4">
                            {underConsideration?.map((roadmap) => (
                                <UnderConsideration key={roadmap.squeakId} {...roadmap} />
                            ))}
                        </ul>
                    </div>
                </Section>
            )}
            {recentlyShipped && (
                <Section title="Recently shipped">
                    <div className="max-w-2xl team-page-content">
                        <div className="border border-light dark:border-dark rounded bg-white dark:bg-accent-dark p-6">
                            <Change {...recentlyShipped} />
                        </div>
                    </div>
                </Section>
            )}
        </div>
    )
}
