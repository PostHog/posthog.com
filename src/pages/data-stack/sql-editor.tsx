import React from 'react'
import ReaderView from 'components/ReaderView'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import Link from 'components/Link'
import { ProductScreenshot } from 'components/ProductScreenshot'
import OSTable from 'components/OSTable'

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

type SQLEditorFeature = {
    title: string
    description: string
    comingSoon?: boolean
}

const sqlEditorFeatures: SQLEditorFeature[] = [
    {
        title: 'Direct data access',
        description:
            'Query all your data in PostHog, including PostHog-specific tables (events, persons) and synced warehouse sources',
    },
    {
        title: 'HogQL support',
        description:
            "Uses PostHog's SQL variant with simplified property access (dot notation like properties.$current_url), null handling, and ClickHouse functions",
    },
    {
        title: 'Autocomplete',
        description: 'Intelligent code completion for tables, columns, and SQL keywords to speed up query writing',
    },
    {
        title: 'Schema browser',
        description:
            'View and search the schema of all available sources, PostHog tables, and saved views directly in the editor',
    },
    {
        title: 'Save as views',
        description: 'Save queries as views accessible from the data warehouse tab, visible to all project users',
    },
    {
        title: 'Draft queries',
        description: 'Save draft queries for later without cluttering the saved views list',
        comingSoon: true,
    },
    {
        title: 'DuckDB syntax support',
        description: 'Full support for DuckDB SQL syntax and functions when connected to a managed DuckDB warehouse',
        comingSoon: true,
    },
    {
        title: 'Add queries to notebooks',
        description: 'Use PostHog notebooks to collect warehouse info, research topics, or just as a scratch pad',
    },
    {
        title: 'Write SQL without knowing SQL',
        description: 'Let PostHog AI write SQL for you',
    },
    {
        title: 'Simplified syntax',
        description: 'Access properties with dot notation like properties.$browser',
    },
    {
        title: 'Smart joins',
        description: 'Automatic joins between events, persons, and groups',
    },
    {
        title: 'Product functions',
        description: 'Built-in functions for cohorts, feature flags, and more',
    },
    {
        title: 'Time zone handling',
        description: 'Automatic time zone conversion for your project',
    },
]

export default function SQLEditor(): JSX.Element {
    // Define table columns
    const columns = [
        { name: 'Feature', width: 'minmax(150px, 1fr)', align: 'left' as const },
        { name: 'Description', width: 'minmax(300px, 2fr)', align: 'left' as const },
        { name: '', width: '60px', align: 'center' as const },
    ]

    // Create table rows from duckDBFeatures
    const featureRows = sqlEditorFeatures.map((feature) => ({
        cells: [
            { content: <span className="font-bold">{feature.title}</span> },
            { content: feature.description, className: 'text-sm' },
            {
                content: feature.comingSoon ? (
                    <span className="rounded-sm bg-highlight py-0.5 px-1 text-xs font-bold text-red dark:text-yellow">
                        Coming soon
                    </span>
                ) : (
                    '✅'
                ),
                className: 'text-xl',
            },
        ],
    }))
    return (
        <>
            <SEO
                title="SQL editor - PostHog data stack"
                description="Unify and query data from any source and analyze it alongside your product data."
                image="https://res.cloudinary.com/dmukukwp6/image/upload/dw_temp_528efa76a2.png"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="SQL editor">
                <p>
                    PostHog's SQL editor allows you to run ad-hoc queries directly against your data warehouse using
                    PostHog SQL - a SQL dialect optimized for analytics. Analyze and model your product data alongside
                    data from any source, all within PostHog.
                </p>

                <ProductScreenshot
                    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_data_warehouse_light_b0cdbebe8f.png"
                    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_data_warehouse_dark_8f465ecfaa.png"
                    alt="PostHog SQL editor screenshot"
                    classes="rounded"
                    zoom={false}
                />

                <h3>Features</h3>
                <OSTable columns={columns} rows={featureRows} editable={false} />
                <p>
                    <Link to="/docs/data-warehouse/sql" state={{ newWindow: true }}>
                        Read the SQL editor docs →
                    </Link>
                </p>
            </ReaderView>
        </>
    )
}
