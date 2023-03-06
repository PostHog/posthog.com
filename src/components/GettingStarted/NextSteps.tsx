import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

type NextStepProps = {
    title: string
    links: {
        title: string
        url: string
    }[]
    children: React.ReactNode
}

export const NextStep: React.FC<NextStepProps> = ({ title, links, children }) => {
    return (
        <div className="space-y-6 pb-8">
            <div className="flex items-end justify-between border-b border-dashed border-gray-accent-light">
                <h3>{title}</h3>
                <div className="w-36">{children}</div>
            </div>

            <ul className="grid grid-cols-2 list-none p-0 m-0">
                {links.map((link) => (
                    <li key={link.title} className="relative w-full py-2 flex items-center">
                        <Link className="leading-none" to={link.url}>
                            <span className="jumpTo pl-6">{link.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export const ProductAnalytics = () => {
    return (
        <NextStep
            title="Product Analytics"
            links={[
                { title: 'Deploy a reverse proxy', url: '/docs/integrate/proxy' },
                { title: 'Ingest historical data', url: '/docs/integrate/ingest-historic-data' },
                { title: 'Find your power users', url: '/tutorials/power-users' },
                { title: '5 things to do after installing PostHog', url: '/tutorials/next-steps-after-installing' },
            ]}
        >
            <StaticImage
                alt=""
                placeholder="none"
                quality={100}
                className="w-full"
                src="../Home/Slider/images/product-analytics-hog.png"
            />
        </NextStep>
    )
}

export const FeatureFlags = () => {
    return (
        <NextStep
            title="Feature flags"
            links={[
                { title: 'Create your first feature flag', url: '/manual/feature-flags#creating-feature-flags' },
                { title: 'Roll out a feature flag', url: '/manual/feature-flags#roll-out-the-feature-flag' },
                { title: 'Set up a canary release', url: '/tutorials/canary-release' },
                {
                    title: 'Feature flags with multiple variants',
                    url: '/manual/feature-flags#multivariate-feature-flags',
                },
            ]}
        >
            <StaticImage
                alt=""
                placeholder="none"
                quality={100}
                className="w-full"
                src="../Home/Slider/images/feature-flags-hog.png"
            />
        </NextStep>
    )
}

export const Experiments = () => {
    return (
        <NextStep
            title="Experiments"
            links={[
                { title: 'Create your first experiment', url: '/manual/experimentation#how-to-use-experimentation' },
                { title: 'Run an experiment on new users', url: '/tutorials/new-user-experiments' },
                {
                    title: 'Experimentation under the hood',
                    url: '/manual/experimentation#advanced-whats-under-the-hood',
                },
            ]}
        >
            <StaticImage
                alt=""
                placeholder="none"
                quality={100}
                className="w-full"
                src="../Home/Slider/images/ab-testing-hog.png"
            />
        </NextStep>
    )
}

export const Apps = () => {
    return (
        <NextStep
            title="Apps"
            links={[
                { title: 'Browse apps', url: '/apps' },
                { title: 'Import Stripe data into PostHog', url: '/tutorials/stripe-payment-data' },
                { title: 'Filter out unwanted events', url: '/tutorials/fewer-unwanted-events' },
                { title: 'Build your own app', url: '/docs/apps/build' },
            ]}
        >
            <StaticImage
                alt=""
                placeholder="none"
                quality={100}
                className="w-full"
                src="../Home/Slider/images/event-pipelines-hog.png"
            />
        </NextStep>
    )
}
