import { CallToAction } from 'components/CallToAction'
import { AWS, Check2, DigitalOcean, GCS, HelmChart } from 'components/Icons/Icons'
import Link from 'components/Link'
import React from 'react'
import { FeatureWrapperRow } from './FeatureWrapper'
import dataWarehouse from './images/data-warehouse.svg'

const features = [
    {
        title: 'Data transformations',
        description: 'Capture the live event stream and do something with it - like munge PII or add geolocation.',
    },
    {
        title: 'Build apps',
        description: 'Build custom functionality or choose from the 50ish apps in our 3rd party app library',
    },
    { title: 'Data out', description: 'Access data from dashboards or metrics from saved insights.' },
    {
        title: 'Marketing or product automation',
        description: 'Activate drip campaign or a push notification based on customer activity',
    },
    { title: 'Data augmentation', description: 'Augment event data coming into PostHog with more context and detail' },
    {
        title: 'Customer Data Platform (CDP)',
        description: 'Create a singular customer view by combining event and customer data in one place.',
    },
    { title: 'Reverse ETL', description: 'Update and feed context to external products like Hubspot or Salesforce' },
]

export default function API() {
    return (
        <FeatureWrapperRow
            id="api"
            title="API"
            description={
                <>
                    <p>Do literally anything with your data with PostHog APIs. Here are a few things you can do:</p>
                    <ul className="list-none m-0 p-0 sm:grid grid-cols-2 border-y border-x border-gray-accent-light border-dashed">
                        {features.map(({ title, description }) => {
                            return (
                                <li
                                    key={title}
                                    className="p-8 border-b border-gray-accent-light border-dashed sm:odd:border-r last:border-b-0"
                                >
                                    <h5 className="text-[17px] m-0">{title}</h5>
                                    <p className="text-[15px] m-0 text-black/70">{description}</p>
                                </li>
                            )
                        })}
                    </ul>
                    <CallToAction type="secondary" size="sm" to="/docs/api" className="mt-6">
                        Visit API reference
                    </CallToAction>
                </>
            }
        />
    )
}
