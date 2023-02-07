import { CallToAction } from 'components/CallToAction'
import { AWS, Check2, DigitalOcean, GCS, HelmChart } from 'components/Icons/Icons'
import Link from 'components/Link'
import React from 'react'
import { FeatureWrapperRow } from './FeatureWrapper'
import dataWarehouse from './images/data-warehouse.svg'

const features = [
    {
        title: 'Ideal for hobby projects',
        description: 'Our open-source is ideal for side hustles and hobby projects.',
    },
    {
        title: 'Deploy with Docker Compose',
        description: 'Get set up on your own server, with basic analytics.',
    },
    {
        title: 'Permissive MIT license',
        description: 'Our core will always be open source. Add to, or alter our code under an MIT license.',
    },
]

export default function SelfHosting() {
    return (
        <FeatureWrapperRow
            id="open-source"
            title="Open source"
            description={
                <>
                    <p>
                        We work transparently, and all our code is released under an MIT license. Kick the tires by
                        deploying an open source version of PostHog for free with basic analytics.
                    </p>
                    <CallToAction to="/docs/self-host" type="secondary" size="sm" className="mx-auto mt-3">
                        Learn about self-hosting
                    </CallToAction>
                </>
            }
        />
    )
}
