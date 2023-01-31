import { CallToAction } from 'components/CallToAction'
import { AWS, Check2, DigitalOcean, GCS, HelmChart } from 'components/Icons/Icons'
import Link from 'components/Link'
import React from 'react'
import { FeatureWrapperRow } from './FeatureWrapper'
import dataWarehouse from './images/data-warehouse.svg'

const features = [
    {
        title: 'Ideal for hobby projects',
        description: 'Our open-source is ideal for side hustles and hobby projects with up to 100k events per month.',
    },
    {
        title: 'Deploy with Docker',
        description: 'Get PostHog set up on your own server, with basic analytics tools and no event limits.',
    },
    {
        title: 'Permissive MIT license',
        description:
            'The core of PostHog will always be open source. You are free to add, adapt or alter our code within an MIT license.',
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
]

export default function SelfHosting() {
    return (
        <FeatureWrapperRow
            id="self-hosting"
            title="Transparent and open source"
            description={
                <>
                    <p>
                        We work transparently, and all our code is released under an MIT license. You can even deploy an
                        open source version of PostHog for free, with basic analytics!
                    </p>
                    <div className="flex md:flex-row flex-col space-y-4 md:space-y-0 md:space-x-4 justify-between mt-10">
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
                            <ul className="list-none m-0 p-0 grid divide-y divide-gray-accent-light divide-dashed border border-gray-accent-light border-dashed w-full md:w-[240px]">
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
