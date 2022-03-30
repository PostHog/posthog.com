import React from 'react'
import { heading, section } from './classes'

import geoipImage from '../../../contents/images/apps/logos/geoip.png'
import redshiftImage from '../../../contents/images/apps/logos/redshift.png'
import hubspotImage from '../../../contents/images/apps/logos/hubspot.png'
import zapierImage from '../../../contents/images/apps/logos/zapier.svg'

const Listing = ({ name, image, url }) => {
    return (
        <li className="px-4 py-12 md:p-0 border-t border-l border-dashed border-gray-accent-light flex flex-col items-center">
            <img className="icon w-16 h-16 m-0" src={image} />
            <a href={url}>{name}</a>
        </li>
    )
}

export default function Apps() {
    return (
        <section className={section('mt-4 md:mt-8')}>
            <h2 className={heading('md')}>
                An app store to <span className="text-blue">extend functionality</span> with your own data
            </h2>
            <p className="my-6 mx-auto text-center text-base md:text-xl font-semibold mt-2 lg:mt-4 text-primary max-w-2xl opacity-75">
                Learn how to <a href="/docs/plugins/build">build your own app</a>
            </p>
            <div className="mt-8 md:mt-12">
                <ul className="list-none m-0 p-0 grid grid-cols-2 md:grid-cols-4 border-b border-r border-dashed border-gray-accent-light">
                    {/* <Listing width={212} height={44} image={salesforce} /> */}
                    <Listing name="Hubspot" image={hubspotImage} url="/apps/hubspot" />
                    {/* <Listing width={267} height={35} image={zendesk} /> */}
                    {/* <Listing width={229} height={41} image={sentry} /> */}
                    <Listing name="Zapier" image={zapierImage} url="/apps/zapier" />
                    {/* <Listing width={206} height={47} image={snowflake} /> */}
                    {/* <Listing width={173.46} height={51} image={pagerduty} /> */}
                    <Listing name="Redshift" image={redshiftImage} url="/apps/redshift" />
                    {/* <Listing width={175} height={41} image={s3} /> */}
                    {/* <Listing width={175} height={41} image={bigquery} /> */}
                    <Listing name="GeoIP" image={geoipImage} url="/apps/geoip" />
                    {/* <Listing width={175} height={41} image={urlparams} /> */}
                </ul>
            </div>
        </section>
    )
}
