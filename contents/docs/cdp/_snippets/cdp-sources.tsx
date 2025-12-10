import React from 'react'
import List from 'components/List'

export const CDPManagedSources = () => {
    const platforms = [
        {
            label: 'Azure SQL Server',
            url: '/docs/cdp/sources/azure-db',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/sql_database_generic_8f6b358019.svg',
        },
        {
            label: 'BigQuery',
            url: '/docs/cdp/sources/bigquery',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/bigquery_8546771248.svg',
        },
        {
            label: 'Bing Ads',
            url: '/docs/cdp/sources/bing-ads',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Bing_Ads_ce5e8e208f.svg',
        },
        {
            label: 'Chargebee',
            url: '/docs/cdp/sources/chargebee',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/cb_597858b354.svg',
        },
        {
            label: 'DoIt',
            url: '/docs/cdp/sources/doit',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/bz_Esg02_S_400x400_2e3b1b54a3.png',
        },
        {
            label: 'Google Ads',
            url: '/docs/cdp/sources/google-ads',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Google_Ads_logo_b59e784792.svg',
        },
        {
            label: 'Google Sheets',
            url: '/docs/cdp/sources/google-sheets',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Google_Sheets_logo_2014_2020_7db9f50a1e.svg',
        },
        {
            label: 'Hubspot',
            url: '/docs/cdp/sources/hubspot',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hubspot_1_f8248c008e.svg',
        },
        {
            label: 'LinkedIn Ads',
            url: '/docs/cdp/sources/linkedin-ads',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/4221chis9yaztef5phd0v3lal_12c6e6b2a1.svg',
        },
        {
            label: 'Meta Ads',
            url: '/docs/cdp/sources/meta-ads',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/meta_logo_56e02d5502.svg',
        },
        {
            label: 'MongoDB',
            url: '/docs/cdp/sources/mongodb',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Mongo_DB_Logo_f095b5aca0.svg',
        },
        {
            label: 'MySQL',
            url: '/docs/cdp/sources/mysql',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/mysql_logo_0ce3cfe493.svg',
        },
        {
            label: 'Postgres',
            url: '/docs/cdp/sources/postgres',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Postgresql_elephant_f6157ebdd3.svg',
        },
        {
            label: 'Reddit Ads',
            url: '/docs/cdp/sources/reddit-ads',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/reddit_logo_f6d4c5cb0b.svg',
        },
        {
            label: 'Salesforce',
            url: '/docs/cdp/sources/salesforce',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Salesforce_com_logo_2e650322bc.svg',
        },
        {
            label: 'Shopify',
            url: '/docs/cdp/sources/shopify',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/shopify_1aa4658e01.png',
        },
        {
            label: 'Snowflake',
            url: '/docs/cdp/sources/snowflake',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/snowflake_color_517158afd5.svg',
        },
        {
            label: 'Stripe',
            url: '/docs/cdp/sources/stripe',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Stripe_Logo_revised_2016_24183d3284.svg',
        },
        {
            label: 'Supabase',
            url: '/tutorials/supabase-query',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/supabase_2fbe7c54ee.png',
        },
        {
            label: 'Temporal.io',
            url: '/docs/cdp/sources/temporal',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Temporal_Symbol_dark_66b0582c1b.svg',
        },
        {
            label: 'TikTok Ads',
            url: '/docs/cdp/sources/tiktok-ads',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/tiktok_svgrepo_com_9315a2fa30.svg',
        },
        {
            label: 'Vitally',
            url: '/docs/cdp/sources/vitally',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/vitally_a2d87ff23b.svg',
        },
        {
            label: 'Zendesk',
            url: '/docs/cdp/sources/zendesk',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Zendesk_Icon_85ef830586.png',
        },
    ]

    return <List className="grid gap-4 grid-cols-2 @md:grid-cols-3 not-prose" items={platforms} />
}

export const CDPSelfManagedSources = () => {
    const platforms = [
        {
            label: 'Azure Blob',
            url: '/docs/cdp/sources/azure-blob',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/azure_blob_storage_a5110351f6.svg',
        },
        {
            label: 'Cloudflare R2',
            url: '/docs/cdp/sources/r2',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/r2_0d79d88d1f.svg',
        },
        {
            label: 'Google Cloud Storage',
            url: '/docs/cdp/sources/gcs',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Google_Cloud_14ebf7693d.svg',
        },
        {
            label: 'S3',
            url: '/docs/cdp/sources/s3',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/s3_8f86e011ce.svg',
        },
    ]

    return <List className="grid gap-4 grid-cols-2 @md:grid-cols-3 not-prose" items={platforms} />
}
