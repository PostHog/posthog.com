import { CallToAction } from 'components/CallToAction'
import { AWS, Check2, DigitalOcean, GCS, HelmChart } from 'components/Icons/Icons'
import Link from 'components/Link'
import React from 'react'
import { FeatureWrapperRow } from './FeatureWrapper'
import dataWarehouse from './images/data-warehouse.svg'

const features = [
    {
        title: 'Customer data never leaves your infrastructure',
        description: 'Self-hosting PostHog makes it much easier to meet HIPAA, GDPR, and SOC 2 requirements.',
    },
    {
        title: 'Capture up to 30% more events than PostHog Cloud',
        description: 'First-party cookie means privacy tools don’t block PostHog like typical third-party scripts.',
    },
    {
        title: 'Eliminate 3rd party subprocessors',
        description:
            'By using PostHog for event pipelines, product analytics, session recording, feature flags, A/B testing, and your data warehouse, you can reduce reliance on third parties for critical customer data.',
    },
]

const deploymentInstructions = [
    {
        Icon: AWS,
        title: 'Amazon AWS',
        url: '/docs/self-host/deploy/aws',
    },
    {
        Icon: DigitalOcean,
        title: 'Digital Ocean',
        url: '/docs/self-host/deploy/digital-ocean',
    },
    {
        Icon: GCS,
        title: 'Google Cloud',
        url: '/docs/self-host/deploy/gcp',
    },
    {
        Icon: HelmChart,
        title: 'Helm Chart',
        url: '/docs/self-host/deploy/other',
    },
]

export default function SelfHosting() {
    return (
        <FeatureWrapperRow
            title="Self-hosting"
            description={
                <>
                    <p>
                        Host on-prem or in your private cloud so customer data never leaves your infrastructure.
                        <strong>Don’t need to self-host?</strong> Use PostHog Cloud and we’ll manage everything for you.
                    </p>
                    <div className="flex space-x-4 justify-between mt-10">
                        <ul className="list-none m-0 p-0 grid gap-y-7 max-w-[450px]">
                            {features.map(({ title, description }) => {
                                return (
                                    <li key={title} className="flex space-x-2 items-start">
                                        <Check2 className="w-[20px] text-[#34A853] flex-shrink-0 mt-1" />
                                        <span>
                                            <h5 className="text-lg m-0 text-black/75">{title}</h5>
                                            <p className="font-medium text-black/50 m-0">{description}</p>
                                        </span>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="flex-shrink-0">
                            <p className="text-black/50 m-0 mb-3 text-center">Easy deploy instructions</p>
                            <ul className="list-none m-0 p-0 grid divide-y divide-gray-accent-light divide-dashed border border-gray-accent-light border-dashed w-[240px]">
                                {deploymentInstructions.map(({ title, url, Icon }) => {
                                    return (
                                        <li key={title}>
                                            <Link
                                                className="flex space-x-4 items-center py-2 px-4 hover:bg-gray-accent-light transition-all relative active:top-[0.5px] active:scale-[.98]"
                                                to={url}
                                            >
                                                <Icon className="w-[36px] h-[36px] flex-shrink-0 text-black" />
                                                <p className="m-0 text-[15px]">{title}</p>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                            <div className="text-center">
                                <CallToAction to="/docs/self-host" type="secondary" size="sm" className="mx-auto mt-3">
                                    Learn about self-hosting
                                </CallToAction>
                            </div>
                        </div>
                    </div>
                </>
            }
        />
    )
}
