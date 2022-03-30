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
            <a href={url} className="flex flex-col items-center text-center px-2 py-6 hover:bg-gray-accent-light">
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
                Do more with your data with the <br className="hidden lg:block" />
                <span className="text-blue">PostHog App Store</span>
            </h2>
            <p className="my-6 mx-auto text-center text-base md:text-lg font-semibold mt-2 lg:mt-4 text-primary max-w-2xl opacity-75">
                40+ apps available
            </p>
            <div className="mt-8 md:mt-12">
                <ul className="list-none m-0 p-0 grid grid-cols-2 md:grid-cols-4 border-b border-r border-dashed border-gray-accent-light">
                    {/* <Listing image={salesforce} /> */}
                    <Listing name="Salesforce Connector" image={salesforceImage} url="/apps/salesforce-connector" />
                    <Listing name="Hubspot Connector" image={hubspotImage} url="/apps/hubspot-connector" />
                    <Listing name="Zendesk Connector" image={zendeskImage} url="/apps/zendesk-connector" />
                    <Listing name="Sentry Connector" image={sentryImage} url="/apps/sentry-connector" />
                    <Listing name="Zapier Connector" image={zapierImage} url="/apps/zapier-connector" />
                    <Listing name="Snowflake Export" image={snowflakeImage} url="/apps/snowflake-export" />
                    <Listing name="PagerDuty Connector" image={pagerdutyImage} url="/apps/pagerduty-connector" />
                    <Listing name="Redshift Import (Beta)" image={redshiftImage} url="/apps/redshift-import" />
                    <Listing name="S3 Export" image={s3Image} url="/apps/s3-export" />
                    <Listing name="BigQuery Export" image={bigqueryImage} url="/apps/bigquery-export" />
                    <Listing name="GeoIP Enrichment" image={geoipImage} url="/apps/geoip-enrichment" />
                    <li className="border-t border-l border-dashed border-gray-accent-light">
                        <a
                            href="/docs/plugins/build"
                            className="flex flex-col h-full items-center justify-center px-2 py-6 hover:bg-gray-accent-light"
                        >
                            <span className="text-red">Build your own app</span>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    )
}
