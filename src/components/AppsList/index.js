import React from 'react'
import AnimateIntoView, { item } from '../AnimateIntoView'

import bigqueryImage from './logos/bigquery.svg'
import geoipImage from './logos/geoip.png'
import hubspotImage from './logos/hubspot.svg'
import redshiftImage from './logos/redshift.svg'
import pagerdutyImage from './logos/pagerduty.svg'
import salesforceImage from './logos/salesforce.svg'
import s3Image from './logos/s3.svg'
import sentryImage from './logos/sentry.svg'
import snowflakeImage from './logos/snowflake.svg'
import zapierImage from './logos/zapier.svg'
import zendeskImage from './logos/zendesk.svg'

const Listing = ({ name, image, url }) => {
    return (
        <AnimateIntoView>
            <li className="border-t border-l border-dashed border-gray-accent-light">
                <a href={url} className="flex flex-col items-center text-center px-2 py-6 hover:bg-gray-accent-light">
                    <img className="icon w-8 h-8 mb-2" src={image} />
                    <span className="text-primary">{name}</span>
                </a>
            </li>
        </AnimateIntoView>
    )
}

export default function AppsList() {
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}
