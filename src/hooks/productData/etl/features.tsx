import React from 'react'
import { IconDatabase, IconGraph, IconPlug, IconServer } from '@posthog/icons'

export const features = {
    sources: {
        title: 'Sources',
        headline: 'Over 1,300 sources, including the ones you actually use',
        description:
            'Connect Stripe, HubSpot, Salesforce, your own Postgres, and a long tail of another 1,300 tools. You give PostHog credentials and pick the tables. PostHog handles the schedule, the schema changes, and the retries.',
        icon: <IconPlug />,
        color: 'purple',
        features: [
            {
                title: 'The connectors most teams need, first',
                description:
                    'Stripe, HubSpot, Salesforce, Postgres, MySQL, Zendesk, and the ad platforms are hand-built and documented.',
            },
            {
                title: 'A long tail behind them',
                description:
                    'Another 1,300 REST connectors cover the tools that never make a vendor catalog. Build your own if yours is missing.',
            },
            {
                title: 'Incremental by default',
                description:
                    'Most sources sync only what changed since last time, so you pay for new rows rather than the whole table.',
            },
        ],
    },
    destinations: {
        title: 'Destinations',
        headline: 'The same rows, written wherever you need them',
        description:
            'A source does not have to stop at PostHog. Point any table at your own Postgres, Snowflake, BigQuery, Redshift, Databricks, S3, or Azure Blob, and PostHog writes there on the same schedule it syncs.',
        icon: <IconServer />,
        color: 'purple',
        features: [
            {
                title: 'Seven destinations, plus PostHog',
                description:
                    'Postgres, Snowflake, BigQuery, Redshift, Databricks, S3, and Azure Blob. The PostHog warehouse is one of the list, not a special case.',
            },
            {
                title: 'Set it per table, not per source',
                description:
                    'A table follows its source by default, and you can override any table to write somewhere else.',
            },
            {
                title: 'One set of credentials',
                description:
                    'Destinations reuse the same connections as batch exports, so a warehouse you already connected is ready to use.',
            },
        ],
    },
    health: {
        title: 'Health',
        headline: 'One page that tells you a sync broke',
        description:
            'Most pipelines fail quietly and you find out when a dashboard looks wrong. The ETL page leads with what stopped, then shows rows written per destination over time, how many tables are syncing, and what is running right now.',
        icon: <IconGraph />,
        color: 'purple',
        features: [
            {
                title: 'Failures first',
                description:
                    'Tables that have stopped syncing sit at the top, with the error and a link straight to the source.',
            },
            {
                title: 'Rows per destination, over time',
                description: 'See what each destination actually received, so a silent drop shows up as a flat line.',
            },
            {
                title: 'Numbers that keep up',
                description: 'The counts refresh every 30 seconds while the page is open.',
            },
        ],
    },
    query: {
        title: 'Query',
        headline: 'Business data next to product data, in one query',
        description:
            'Once a table is in PostHog you can join it to the events your product already sends. Revenue against activation, support tickets against retention, without exporting anything to a third tool first.',
        icon: <IconDatabase />,
        color: 'purple',
        features: [
            {
                title: 'SQL over both',
                description: 'Synced tables and product analytics events live in the same query engine.',
            },
            {
                title: 'Joins you define once',
                description: 'Tell PostHog how a synced table maps to a person, and every insight can use it.',
            },
        ],
    },
}
