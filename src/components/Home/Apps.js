import React from 'react'
import { heading, section } from './classes'

import bigqueryImage from '../../images/apps/logos/bigquery.svg'
import geoipImage from '../../images/apps/logos/geoip.png'
import hubspotImage from '../../images/apps/logos/hubspot.svg'
import redshiftImage from '../../images/apps/logos/redshift.svg'
import pagerdutyImage from '../../images/apps/logos/pagerduty.svg'
import salesforceImage from '../../images/apps/logos/salesforce.svg'
import s3Image from '../../images/apps/logos/s3.svg'
import sentryImage from '../../images/apps/logos/sentry.svg'
import snowflakeImage from '../../images/apps/logos/snowflake.svg'
import zapierImage from '../../images/apps/logos/zapier.svg'
import zendeskImage from '../../images/apps/logos/zendesk.svg'

const Listing = ({ name, image, url }) => {
    return (
        <li className="border-t border-l border-dashed border-gray-accent-light">
            <a href={url} className="flex flex-col items-center px-2 py-4 hover:bg-gray-accent-light">
                <img className="icon w-8 h-8 mb-2" src={image} />
                <span className="text-primary">{name}</span>
            </a>
        </li>
    )
}

export default function Apps() {
    return (
        <section className={section('mt-4 md:mt-8')}>
            <h2 className={heading('lg')}>
                Do more with your data with the <span className="text-blue">PostHog App Store</span>
            </h2>
            <p className="my-6 mx-auto text-center text-base md:text-lg font-semibold mt-2 lg:mt-4 text-primary max-w-2xl opacity-75">
                Learn how to <a href="/docs/plugins/build">build your own app</a>.
            </p>
            <div className="mt-8 md:mt-12">
                <ul className="list-none m-0 p-0 grid grid-cols-2 md:grid-cols-4 border-b border-r border-dashed border-gray-accent-light">
                    {/* <Listing image={salesforce} /> */}
                    <Listing name="Salesforce" image={salesforceImage} url="/apps/salesforce" />
                    <Listing name="Hubspot" image={hubspotImage} url="/apps/hubspot" />
                    <Listing name="Zendesk" image={zendeskImage} url="/apps/zendesk" />
                    <Listing name="Sentry" image={sentryImage} url="/apps/sentry" />
                    <Listing name="Zapier" image={zapierImage} url="/apps/zapier" />
                    <Listing name="Snowflake" image={snowflakeImage} url="/apps/snowflake" />
                    <Listing name="Pagerduty" image={pagerdutyImage} url="/apps/pagerduty" />
                    <Listing name="Redshift" image={redshiftImage} url="/apps/redshift" />
                    <Listing name="Amazon S3" image={s3Image} url="/apps/s3" />
                    <Listing name="BigQuery" image={bigqueryImage} url="/apps/bigquery" />
                    <Listing name="GeoIP" image={geoipImage} url="/apps/geoip" />
                    {/* <Listing name="URL Params" image={urlparamsImage} url="/apps/" /> */}
                </ul>
            </div>
        </section>
    )
}
