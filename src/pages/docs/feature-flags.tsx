import React from 'react'
import { SEO } from 'components/seo'
import ResourceItem from 'components/Docs/ResourceItem'
import AskMax from 'components/AskMax'
import Intro from 'components/Docs/Intro'
import ReaderView from 'components/ReaderView'
import OSTable from 'components/OSTable'
import { IconCheck, IconLogomark } from '@posthog/icons'
import FeatureFlagsInstallationPlatforms from '../../../contents/docs/feature-flags/installation/_snippets/installation-platforms'
import { IconFlask, IconRewindPlay, IconTrends, IconMessage, IconWarning, IconDatabase } from '@posthog/icons'
import Card from 'components/Card'

const phFeatures = [
    {
        title: 'Experiments',
        description: 'Run A/B tests powered by feature flags with statistical significance tracking.',
        icon: <IconFlask className="text-purple" />,
        url: '/docs/experiments',
    },
    {
        title: 'Session replay',
        description: 'Watch recordings of users interacting with flagged features to understand impact.',
        icon: <IconRewindPlay className="text-yellow" />,
        url: '/docs/session-replay',
    },
    {
        title: 'Product analytics',
        description: 'Track how flagged features affect conversion, retention, and revenue.',
        icon: <IconTrends className="text-blue" />,
        url: '/docs/product-analytics',
    },
    {
        title: 'Error tracking',
        description: 'Roll back flagged features when they cause exceptions for users.',
        icon: <IconWarning className="text-orange" />,
        url: '/docs/error-tracking',
    },
    {
        title: 'Surveys',
        description: 'Collect feedback from users who have specific feature flags enabled.',
        icon: <IconMessage className="text-salmon" />,
        url: '/docs/surveys',
    },
    {
        title: 'Data warehouse',
        description: 'Query flag evaluation data alongside product data with SQL.',
        icon: <IconDatabase className="text-purple" />,
        url: '/docs/data-warehouse',
    },
]

const featureFlagFeatures = [
    { text: 'Boolean flags', url: '/docs/feature-flags/creating-feature-flags' },
    { text: 'Multivariate flags', url: '/docs/feature-flags/creating-feature-flags#multivariate-feature-flags' },
    { text: 'Percentage rollouts', url: '/docs/feature-flags/creating-feature-flags#release-conditions' },
    { text: 'User and group targeting', url: '/docs/feature-flags/creating-feature-flags#release-conditions' },
    { text: 'Server-side local evaluation', url: '/docs/feature-flags/local-evaluation' },
    { text: 'Client-side bootstrapping', url: '/docs/feature-flags/bootstrapping' },
    { text: 'Remote config / payloads', url: '/docs/feature-flags/remote-config' },
    { text: 'Scheduled flag changes', url: '/docs/feature-flags/scheduled-flag-changes' },
    { text: 'Feature flag dependencies', url: '/docs/feature-flags/dependencies' },
    { text: 'Early access management', url: '/docs/feature-flags/early-access-feature-management' },
    { text: 'Multi-project flags', url: '/docs/feature-flags/multi-project-feature-flags' },
    { text: 'Property overrides', url: '/docs/feature-flags/property-overrides' },
    { text: 'Evaluation contexts', url: '/docs/feature-flags/evaluation-contexts' },
    { text: 'A/B testing integration', url: '/docs/experiments' },
]

export const Content = () => {
    return (
        <>
            <section className="mb-4">
                <h2 className="mb-4">Overview</h2>
                <div>
                    <p>
                        Feature flags let you toggle features on or off for specific users, groups, or percentages of
                        traffic without redeploying code. They're the foundation for safe rollouts, A/B testing, and
                        remote configuration.
                    </p>
                    <p>Common use cases include:</p>
                    <ul>
                        <li>
                            <strong>Phased rollouts</strong> &mdash; Ship to 5% of users, monitor, then gradually
                            increase
                        </li>
                        <li>
                            <strong>Kill switches</strong> &mdash; Instantly disable a broken feature without
                            redeploying
                        </li>
                        <li>
                            <strong>Targeting</strong> &mdash; Show features to specific users, teams, or organizations
                        </li>
                        <li>
                            <strong>A/B testing</strong> &mdash; Run experiments with multivariate flags and track
                            results
                        </li>
                        <li>
                            <strong>Remote config</strong> &mdash; Send JSON payloads to configure behavior server-side
                        </li>
                        <li>
                            <strong>Beta programs</strong> &mdash; Let users opt in to early access features
                        </li>
                    </ul>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 mt-0">SDKs and frameworks</h2>
                <div className="mt-4">
                    <FeatureFlagsInstallationPlatforms columns={3} />
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4">All the features you expect</h2>
                <OSTable
                    columns={[
                        { name: '', width: '1fr', align: 'left' },
                        { name: <IconLogomark className="h-7" />, width: '80px', align: 'center' },
                        { name: '', width: '1fr', align: 'left' },
                        { name: <IconLogomark className="h-7" />, width: '80px', align: 'center' },
                    ]}
                    rows={featureFlagFeatures.reduce((rows, feature, i) => {
                        if (i % 2 === 0) rows.push({ cells: [] as any[] })
                        const row = rows[rows.length - 1]
                        row.cells.push(
                            { content: <a href={feature.url}>{feature.text}</a> },
                            { content: <IconCheck className="h-5 text-green" /> }
                        )
                        return rows
                    }, [] as any[])}
                    size="sm"
                    width="full"
                />
            </section>

            <section className="mb-8">
                <h2 className="mb-4">Even better in the PostHog ecosystem</h2>
                <div className="flex flex-col gap-4 lg:grid @lg:grid-cols-3">
                    {phFeatures.map((feature, index) => (
                        <Card key={index} url={feature.url} className="bg-accent dark:bg-accent-dark not-prose">
                            <div key="content" className="px-4 py-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 flex-shrink-0">{feature.icon}</div>
                                    <h4 className="font-semibold my-0 flex-1">{feature.title}</h4>
                                </div>
                                <p className="text-secondary text-sm">{feature.description}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4">Next steps</h2>
                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid grid-cols-1 @md:grid-cols-3">
                    <ResourceItem
                        type="Getting started"
                        title="Start here"
                        description="A guided walkthrough of the full feature flag experience"
                        url="/docs/feature-flags/start-here"
                    />
                    <ResourceItem
                        type="Quickstart"
                        title="Install the SDK"
                        description="Set up feature flags in your app with your preferred platform"
                        url="/docs/feature-flags/installation"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Best practices"
                        description="9 best practices for using feature flags effectively"
                        url="/docs/feature-flags/best-practices"
                    />
                </ul>
            </section>
        </>
    )
}

const FeatureFlags: React.FC = () => {
    return (
        <ReaderView>
            <SEO title="Feature flags - Docs - PostHog" />

            <div className="mx-auto max-w-4xl">
                <section className="mb-6">
                    <Intro
                        subheader="Getting started"
                        title="Feature flags"
                        description="Toggle features for cohorts or individuals to test the impact before rolling out to everyone."
                        buttonText="Start here"
                        buttonLink="/docs/feature-flags/start-here"
                        imageColumnClasses="mt-4 md:-mt-8"
                        imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/feature-flags-hog.png"
                        imageClasses="max-h-48 md:max-h-64"
                    />
                </section>

                <Content />

                <div>
                    <AskMax
                        className=""
                        quickQuestions={[
                            'Why is there a delay in loading flags?',
                            'How do I create a multivariate flag?',
                            'How do I target a flag to a specific group?',
                        ]}
                    />
                </div>
            </div>
        </ReaderView>
    )
}

export default FeatureFlags
