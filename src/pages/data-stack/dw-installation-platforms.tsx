import React, { useState } from 'react'
import List from 'components/List'
import { Select } from 'components/RadixUI/Select'

interface DWInstallationPlatformsProps {
    showFiltering?: boolean
    maxItems?: number
}

const DWInstallationPlatforms = ({ showFiltering = false, maxItems }: DWInstallationPlatformsProps) => {
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null)

    const platforms = [
        {
            label: 'Azure Blob',
            url: '/docs/data-warehouse/sources/azure-blob',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/azure_blob_storage_a5110351f6.svg',
            category: 'Cloud storage',
        },
        {
            label: 'Attio',
            url: '/docs/data-warehouse/sources/attio',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/pasted_image_2026_02_02_T13_32_15_602_Z_3d36e826ca.png',
            category: 'SaaS tools',
        },
        {
            label: 'Azure SQL Server',
            url: '/docs/data-warehouse/sources/azure-db',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/sql_database_generic_8f6b358019.svg',
            category: 'Databases',
        },
        {
            label: 'BigQuery',
            url: '/docs/data-warehouse/sources/bigquery',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/bigquery_8546771248.svg',
            category: 'Databases',
        },
        {
            label: 'Bing Ads',
            url: '/docs/data-warehouse/sources/bing-ads',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Bing_Ads_ce5e8e208f.svg',
            category: 'Ad platforms',
        },
        {
            label: 'Chargebee',
            url: '/docs/data-warehouse/sources/chargebee',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/cb_597858b354.svg',
            category: 'SaaS tools',
        },
        {
            label: 'Clerk',
            url: '/docs/data-warehouse/sources/clerk',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/pasted_image_2026_02_02_T12_36_01_806_Z_30c81aea20.png',
            category: 'SaaS tools',
        },
        {
            label: 'Cloudflare R2',
            url: '/docs/data-warehouse/sources/r2',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/r2_0d79d88d1f.svg',
            category: 'Cloud storage',
        },
        {
            label: 'DoIt',
            url: '/docs/data-warehouse/sources/doit',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/doit_bb90b12280.svg',
            category: 'SaaS tools',
        },
        {
            label: 'Google Ads',
            url: '/docs/data-warehouse/sources/google-ads',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Google_Ads_logo_b59e784792.svg',
            category: 'Ad platforms',
        },
        {
            label: 'LinkedIn Ads',
            url: '/docs/data-warehouse/sources/linkedin-ads',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/4221chis9yaztef5phd0v3lal_12c6e6b2a1.svg',
            category: 'Ad platforms',
        },
        {
            label: 'Reddit Ads',
            url: '/docs/data-warehouse/sources/reddit-ads',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/reddit_logo_f6d4c5cb0b.svg',
            category: 'Ad platforms',
        },
        {
            label: 'Meta Ads',
            url: '/docs/data-warehouse/sources/meta-ads',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/meta_logo_56e02d5502.svg',
            category: 'Ad platforms',
        },
        {
            label: 'TikTok Ads',
            url: '/docs/data-warehouse/sources/tiktok-ads',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/tiktok_svgrepo_com_9315a2fa30.svg',
            category: 'Ad platforms',
        },
        {
            label: 'Google Cloud Storage',
            url: '/docs/data-warehouse/sources/gcs',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Google_Cloud_14ebf7693d.svg',
            category: 'Cloud storage',
        },
        {
            label: 'Google Sheets',
            url: '/docs/data-warehouse/sources/google-sheets',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Google_Sheets_logo_2014_2020_7db9f50a1e.svg',
            category: 'Other',
        },
        {
            label: 'GitHub',
            url: '/docs/data-warehouse/sources/github',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/github_mark_903e35d471.svg',
            category: 'SaaS tools',
        },
        {
            label: 'Hubspot',
            url: '/docs/data-warehouse/sources/hubspot',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hubspot_1_f8248c008e.svg',
            category: 'SaaS tools',
        },
        {
            label: 'Klaviyo',
            url: '/docs/data-warehouse/sources/klaviyo',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/pasted_image_2026_02_02_T12_13_09_301_Z_1c73fd1ac6.png',
            category: 'SaaS tools',
        },
        {
            label: 'Mailchimp',
            url: '/docs/data-warehouse/sources/mailchimp',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/pasted_image_2026_02_02_T12_37_02_666_Z_2c8f3e8398.png',
            category: 'SaaS tools',
        },
        {
            label: 'MongoDB',
            url: '/docs/data-warehouse/sources/mongodb',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Mongo_DB_Logo_f095b5aca0.svg',
            category: 'Databases',
        },
        {
            label: 'MySQL',
            url: '/docs/data-warehouse/sources/mysql',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/mysql_logo_0ce3cfe493.svg',
            category: 'Databases',
        },
        {
            label: 'Postgres',
            url: '/docs/data-warehouse/sources/postgres',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Postgresql_elephant_f6157ebdd3.svg',
            category: 'Databases',
        },
        {
            label: 'S3',
            url: '/docs/data-warehouse/sources/s3',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/s3_8f86e011ce.svg',
            category: 'Cloud storage',
        },
        {
            label: 'Salesforce',
            url: '/docs/data-warehouse/sources/salesforce',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Salesforce_com_logo_2e650322bc.svg',
            category: 'SaaS tools',
        },
        {
            label: 'Shopify',
            url: '/docs/data-warehouse/sources/shopify',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/shopify_1aa4658e01.png',
            category: 'SaaS tools',
        },
        {
            label: 'Snowflake',
            url: '/docs/data-warehouse/sources/snowflake',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/snowflake_color_517158afd5.svg',
            category: 'Databases',
        },
        {
            label: 'Stripe',
            url: '/docs/data-warehouse/sources/stripe',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Stripe_Logo_revised_2016_24183d3284.svg',
            category: 'SaaS tools',
        },
        {
            label: 'Supabase',
            url: '/tutorials/supabase-query',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/supabase_2fbe7c54ee.png',
            category: 'Databases',
        },
        {
            label: 'Temporal.io',
            url: '/docs/data-warehouse/sources/temporal',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Temporal_Symbol_dark_66b0582c1b.svg',
            category: 'SaaS tools',
        },
        {
            label: 'Vitally',
            url: '/docs/data-warehouse/sources/vitally',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/vitally_a2d87ff23b.svg',
            category: 'SaaS tools',
        },
        {
            label: 'Zendesk',
            url: '/docs/data-warehouse/sources/zendesk',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Zendesk_logo_bb4cbd3548.svg',
            category: 'SaaS tools',
        },
    ]

    // Get unique categories, with "Other" at the end
    const allCategories = Array.from(new Set(platforms.map((p) => p.category)))
        .sort()
        // put "Other" last
        .sort((a, b) => (a === 'Other' ? 1 : b === 'Other' ? -1 : 0))

    // Filter platforms by category
    const filteredPlatforms = categoryFilter ? platforms.filter((p) => p.category === categoryFilter) : platforms

    // Apply maxItems limit if specified
    const displayedPlatforms = maxItems ? filteredPlatforms.slice(0, maxItems) : filteredPlatforms
    const remainingCount = maxItems && filteredPlatforms.length > maxItems ? filteredPlatforms.length - maxItems : 0

    return (
        <>
            {showFiltering && (
                <div className="flex flex-wrap gap-2 mb-4">
                    <Select
                        groups={[
                            {
                                label: '',
                                items: [
                                    { value: 'all', label: 'All categories' },
                                    ...allCategories.map((cat) => ({
                                        value: cat,
                                        label: cat,
                                    })),
                                ],
                            },
                        ]}
                        placeholder="Category"
                        ariaLabel="Filter by category"
                        value={categoryFilter || 'all'}
                        onValueChange={(value) => setCategoryFilter(value === 'all' ? null : value)}
                        dataScheme="primary"
                    />
                </div>
            )}
            <List className="grid @2xl:grid-cols-2 @3xl:grid-cols-3 mb-4" items={displayedPlatforms} />
            {remainingCount > 0 && <p className="text-sm font-bold ml-6">+ {remainingCount} more!</p>}
        </>
    )
}
export default DWInstallationPlatforms
