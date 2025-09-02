import React from 'react'
import List from 'components/List'

const DWInstallationPlatforms = () => {
    const platforms = [
        {
            label: 'Azure Blob',
            url: '/docs/data-warehouse/sources/azure-blob',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/azure_blob_storage_a5110351f6.svg',
        },
        {
            label: 'Azure SQL Server',
            url: '/docs/data-warehouse/sources/azure-db',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/sql_database_generic_8f6b358019.svg',
        },
        {
            label: 'BigQuery',
            url: '/docs/data-warehouse/sources/bigquery',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/bigquery_8546771248.svg',
        },
        {
            label: 'Chargebee',
            url: '/docs/data-warehouse/sources/chargebee',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/cb_597858b354.svg',
        },
        {
            label: 'Cloudflare R2',
            url: '/docs/data-warehouse/sources/r2',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/r2_0d79d88d1f.svg',
        },
        {
            label: 'DoIt',
            url: '/docs/data-warehouse/sources/doit',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/doit_bb90b12280.svg',
        },
        {
            label: 'Google Ads',
            url: '/docs/data-warehouse/sources/google-ads',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Google_Ads_logo_b59e784792.svg',
        },
        {
            label: 'Google Cloud Storage',
            url: '/docs/data-warehouse/sources/gcs',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Google_Cloud_14ebf7693d.svg',
        },
        {
            label: 'Google Sheets',
            url: '/docs/data-warehouse/sources/google-sheets',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Google_Sheets_logo_2014_2020_7db9f50a1e.svg',
        },
        {
            label: 'Hubspot',
            url: '/docs/data-warehouse/sources/hubspot',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hubspot_1_f8248c008e.svg',
        },
        {
            label: 'MongoDB',
            url: '/docs/data-warehouse/sources/mongodb',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Mongo_DB_Logo_f095b5aca0.svg',
        },
        {
            label: 'MySQL',
            url: '/docs/data-warehouse/sources/mysql',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/mysql_logo_0ce3cfe493.svg',
        },
        {
            label: 'Postgres',
            url: '/docs/data-warehouse/sources/postgres',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Postgresql_elephant_f6157ebdd3.svg',
        },
        {
            label: 'S3',
            url: '/docs/data-warehouse/sources/s3',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/s3_8f86e011ce.svg',
        },
        {
            label: 'Salesforce',
            url: '/docs/data-warehouse/sources/salesforce',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Salesforce_com_logo_2e650322bc.svg',
        },
        {
            label: 'Snowflake',
            url: '/docs/data-warehouse/sources/snowflake',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/snowflake_color_517158afd5.svg',
        },
        {
            label: 'Stripe',
            url: '/docs/data-warehouse/sources/stripe',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Stripe_Logo_revised_2016_24183d3284.svg',
        },
        {
            label: 'Temporal.io',
            url: '/docs/data-warehouse/sources/temporal',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Temporal_Symbol_dark_66b0582c1b.svg',
        },
        {
            label: 'Vitally',
            url: '/docs/data-warehouse/sources/vitally',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/vitally_a2d87ff23b.svg',
        },
        {
            label: 'Zendesk',
            url: '/docs/data-warehouse/sources/zendesk',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Zendesk_logo_bb4cbd3548.svg',
        },
    ]

    return <List className="grid sm:grid-cols-2" items={platforms} />
}
export default DWInstallationPlatforms
