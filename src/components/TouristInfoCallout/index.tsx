import React from 'react'
import { IconInfo } from '@posthog/icons'
import { HedgehogTourist } from '@posthog/brand/hoggies'
import OSButton from 'components/OSButton'

// "Tourist info" callout for visitors arriving from a partner's docs.
// Modeled on MCPAnalyticsAd in src/components/MCPLeaderboard/index.tsx: same surface,
// tokens, OSButton pair and @container breakpoints, minus the "sorry, this is an ad" badge
// and the feature list. The hog is hidden below @2xl, like the original.
export default function TouristInfoCallout({ className = '' }: { className?: string }): JSX.Element {
    return (
        <aside aria-label="Tourist info" className={`not-prose ${className}`}>
            <div className="relative border border-primary rounded bg-accent p-5 @2xl/reader-content:p-6 @2xl/reader-content:grid @2xl/reader-content:grid-cols-[minmax(0,1fr)_auto] @2xl/reader-content:gap-6">
                <div className="min-w-0">
                    <div className="flex items-center gap-2 text-blue mb-2">
                        <IconInfo className="size-6" />
                        <span className="font-bold">Tourist info</span>
                    </div>
                    <h2 className="text-2xl font-bold text-primary m-0 mb-3">If you just landed here, welcome</h2>
                    <p className="text-base text-secondary m-0 mb-5 max-w-xl">
                        PostHog is the context layer for your product. And since we're advertising anyway: 97% of
                        companies use it for free.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <OSButton asLink to="https://app.posthog.com/signup" variant="primary" size="md">
                            Get started
                        </OSButton>
                        <OSButton asLink to="/docs" variant="secondary" size="md">
                            Read the docs
                        </OSButton>
                    </div>
                </div>
                <HedgehogTourist
                    title="A hedgehog tourist holding a map and a suitcase"
                    className="hidden @2xl/reader-content:block justify-self-end self-center w-40 @4xl/reader-content:w-48 mr-2"
                />
            </div>
        </aside>
    )
}
