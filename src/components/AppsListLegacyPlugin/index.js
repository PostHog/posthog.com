import React from 'react'

import currencyNormalizationImage from '../AppsList/logos/currency-normalization.png'
import githubReleaseTrackerImage from '../AppsList/logos/github-release-tracker.png'
import gitlabReleaseTrackerImage from '../AppsList/logos/gitlab-release-tracker.png'
import bitbucketReleaseTrackerImage from '../AppsList/logos/bitbucket-release-tracker.png'
import twitterFollowersImage from '../AppsList/logos/twitter-followers.png'
import replicatorImage from '../AppsList/logos/replicator.png'
import schemaEnforcerImage from '../AppsList/logos/schema-enforcer.png'
import customerioConnectorImage from '../AppsList/logos/customerio-connector.png'
import sendgridConnectorImage from '../AppsList/logos/sendgrid-connector.png'
import emailScoringImage from '../AppsList/logos/email-scoring.png'
import pubSubExportImage from '../AppsList/logos/pub-sub-export.png'
import useragentEnhancerImage from '../AppsList/logos/useragent-enhancer.png'
import timestampParserImage from '../AppsList/logos/timestamp-parser.png'
import taxonomyStandardizerImage from '../AppsList/logos/taxonomy-standardizer.png'
import propertyFlattenerImage from '../AppsList/logos/property-flattener.png'
import eventSequenceTimerPluginImage from '../AppsList/logos/event-sequence-timer-plugin.png'
import firstTimeEventTrackerImage from '../AppsList/logos/first-time-event-tracker.png'
import redshiftExportImage from '../AppsList/logos/redshift-export.png'
import downsamplingImage from '../AppsList/logos/downsampling.png'
import postgresqlExportImage from '../AppsList/logos/postgresql-export.png'
import gcsExportImage from '../AppsList/logos/gcs-export.png'
import automaticCohortCreatorImage from '../AppsList/logos/automatic-cohort-creator.png'
import rudderstackExportImage from '../AppsList/logos/rudderstack-export.png'
import orbitStatsSyncImage from '../AppsList/logos/orbit-stats-sync.png'
import githubStarSyncImage from '../AppsList/logos/github-star-sync.png'
import migrator3000Image from '../AppsList/logos/migrator-3000.png'
import ingestionAlertImage from '../AppsList/logos/ingestion-alert.png'
import heartbeatImage from '../AppsList/logos/heartbeat.png'
import propertyFilterImage from '../AppsList/logos/property-filter.png'
import segmentImage from '../AppsList/logos/segment.png'
import airbyteImage from '../AppsList/logos/airbyte.png'
import n8nImage from '../AppsList/logos/n8n.png'
import twilioImage from '../AppsList/logos/twilio.png'
import shopifyImage from '../AppsList/logos/shopify.png'
import intercomImage from '../AppsList/logos/intercom.png'
import amazonkinesisImage from '../AppsList/logos/kinesis.png'
import brazeImage from '../AppsList/logos/braze.png'

const LegacyListing = ({ name, image, url }) => {
    return (
        <li className="border-t border-l border-dashed border-gray-accent-light">
            <a
                href={url}
                className="flex flex-col h-full relative items-center text-center px-2 py-8 hover:bg-gray-accent-light"
            >
                <img className="icon w-6 h-6 mb-2" src={image} />

                <span className="text-primary">{name}</span>
                <div className="absolute top-4 right-4 inline-flex px-2 py-1 text-[12px] uppercase rounded-[2px] text-primary text-opacity-50">
                    Free
                </div>
            </a>
        </li>
    )
}

export default function AppsList() {
    return (
        <React.Fragment>
            <LegacyListing
                name="Currency Normalization"
                image={currencyNormalizationImage}
                url="/apps/currency-normalization"
            />
            <LegacyListing
                name="Github Release Tracker"
                image={githubReleaseTrackerImage}
                url="/apps/github-release-tracker"
            />
            <LegacyListing
                name="GitLab Release Tracker"
                image={gitlabReleaseTrackerImage}
                url="/apps/gitlab-release-tracker"
            />
            <LegacyListing
                name="BitBucket Release Tracker"
                image={bitbucketReleaseTrackerImage}
                url="/apps/bitbucket-release-tracker"
            />
            <LegacyListing name="Twitter Followers" image={twitterFollowersImage} url="/apps/twitter-followers" />
            <LegacyListing name="Replicator" image={replicatorImage} url="/apps/replicator" />
            <LegacyListing name="Schema Enforcer" image={schemaEnforcerImage} url="/apps/schema-enforcer" />
            <LegacyListing
                name="Customer.io Connector"
                image={customerioConnectorImage}
                url="/apps/customerio-connector"
            />
            <LegacyListing name="Sendgrid Connector" image={sendgridConnectorImage} url="/apps/sendgrid-connector" />
            <LegacyListing name="Email Scoring" image={emailScoringImage} url="/apps/email-scoring" />
            <LegacyListing name="Pub-Sub Export" image={pubSubExportImage} url="/apps/pub-sub-export" />
            <LegacyListing name="Useragent Enhancer" image={useragentEnhancerImage} url="/apps/useragent-enhancer" />
            <LegacyListing name="Timestamp Parser" image={timestampParserImage} url="/apps/timestamp-parser" />
            <LegacyListing
                name="Taxonomy Standardizer"
                image={taxonomyStandardizerImage}
                url="/apps/taxonomy-standardizer"
            />
            <LegacyListing name="Property Flattener" image={propertyFlattenerImage} url="/apps/property-flattener" />
            <LegacyListing
                name="Event Sequence Timer Plugin"
                image={eventSequenceTimerPluginImage}
                url="/apps/event-sequence-timer-plugin"
            />
            <LegacyListing
                name="First Time Event Tracker"
                image={firstTimeEventTrackerImage}
                url="/apps/first-time-event-tracker"
            />
            <LegacyListing name="Redshift Export" image={redshiftExportImage} url="/apps/redshift-export" />
            <LegacyListing name="Downsampling" image={downsamplingImage} url="/apps/downsampling" />
            <LegacyListing name="PostgreSQL Export" image={postgresqlExportImage} url="/apps/postgresql-export" />
            <LegacyListing name="GCS Export" image={gcsExportImage} url="/apps/gcs-export" />
            <LegacyListing
                name="Automatic Cohort Creator"
                image={automaticCohortCreatorImage}
                url="/apps/automatic-cohort-creator"
            />
            <LegacyListing name="Rudderstack Export" image={rudderstackExportImage} url="/apps/rudderstack-export" />
            <LegacyListing name="Orbit Stats Syn" image={orbitStatsSyncImage} url="/apps/orbit-stats-sync" />
            <LegacyListing name="Github Star Sync" image={githubStarSyncImage} url="/apps/github-star-sync" />
            <LegacyListing name="Migrator 3000" image={migrator3000Image} url="/apps/migrator-3000" />
            <LegacyListing name="Ingestion Alert" image={ingestionAlertImage} url="/apps/ingestion-alert" />
            <LegacyListing name="Heartbeat" image={heartbeatImage} url="/apps/heartbeat" />
            <LegacyListing name="Property Filter" image={propertyFilterImage} url="/apps/property-filter" />
            <LegacyListing name="Twilio" image={twilioImage} url="/apps/twilio" />
            <LegacyListing name="Shopify" image={shopifyImage} url="/apps/shopify" />
            <LegacyListing name="Intercom" image={intercomImage} url="/apps/intercom" />
            <LegacyListing name="Amazon Kinesis" image={amazonkinesisImage} url="/apps/amazon-kinesis" />
            <LegacyListing name="Braze" image={brazeImage} url="/apps/braze" />
            <LegacyListing name="Segment" image={segmentImage} url="/apps/segment" />
            <LegacyListing name="Airbyte" image={airbyteImage} url="/apps/airbyte" />
            <LegacyListing name="n8n" image={n8nImage} url="/apps/n8n" />
        </React.Fragment>
    )
}
