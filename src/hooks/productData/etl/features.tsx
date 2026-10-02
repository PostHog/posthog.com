import React from 'react'
import { IconDatabase, IconGraph, IconPlug, IconServer } from '@posthog/icons'

export const features = {
    sources: {
        title: 'Sources',
        headline: '1,300+ sources, including the ones most teams start with',
        description:
            'Connect Stripe, HubSpot, Salesforce, your own Postgres, and 1,300 more. You provide credentials and pick the tables. PostHog handles the schedule, schema changes, and retries.',
        icon: <IconPlug />,
        color: 'purple',
        features: [
            {
                title: 'Documented connectors for common tools',
                description:
                    'Stripe, HubSpot, Salesforce, Postgres, MySQL, Zendesk, and the ad platforms each have their own setup docs.',
            },
            {
                title: 'REST connectors for everything else',
                description:
                    'Another 1,300 connectors cover smaller tools. If yours is missing, you can build it with the custom REST source.',
            },
            {
                title: 'Incremental by default',
                description:
                    'Most sources sync only what changed since the last run, so you pay for new rows rather than the whole table.',
            },
        ],
    },
    destinations: {
        title: 'Destinations',
        headline: 'Write synced rows to your own warehouse',
        description:
            'Point a table at your own Postgres, Snowflake, BigQuery, Redshift, Databricks, S3, or Azure Blob. PostHog writes there on the same schedule it syncs.',
        icon: <IconServer />,
        color: 'purple',
        features: [
            {
                title: 'Seven destinations, plus the PostHog warehouse',
                description:
                    'Postgres, Snowflake, BigQuery, Redshift, Databricks, S3, and Azure Blob. A table with no destination set writes to the PostHog warehouse.',
            },
            {
                title: 'Set per source, override per table',
                description:
                    'Tables follow their source by default. Override a single table when it belongs somewhere else.',
            },
            {
                title: 'One set of credentials',
                description:
                    'Destinations reuse the same connections as batch exports, so a warehouse you already connected is ready to pick.',
            },
        ],
    },
    health: {
        title: 'Health',
        headline: 'Sync status in one place',
        description:
            'The ETL page opens with the tables that have stopped syncing, then shows rows written per destination over time, how many tables are syncing, and which runs are in progress.',
        icon: <IconGraph />,
        color: 'purple',
        features: [
            {
                title: 'Failures at the top',
                description: 'Tables that have stopped syncing come first, with the error and a link to the source.',
            },
            {
                title: 'Rows per destination, over time',
                description:
                    'See what each destination received, so a destination that stopped shows up as a flat line.',
            },
            {
                title: 'Updates while you watch',
                description: 'The counts refresh every 30 seconds while the page is open.',
            },
        ],
    },
    query: {
        title: 'Query',
        headline: 'Query business data alongside product data',
        description:
            'Once a table is in PostHog, you can join it to the events your product sends. Revenue against activation, or support tickets against retention, without exporting to another tool first.',
        icon: <IconDatabase />,
        color: 'purple',
        features: [
            {
                title: 'SQL over both',
                description: 'Synced tables and product analytics events live in the same query engine.',
            },
            {
                title: 'Define a join once',
                description: 'Map a synced table to a person once, and every insight can use it.',
            },
        ],
    },
}
