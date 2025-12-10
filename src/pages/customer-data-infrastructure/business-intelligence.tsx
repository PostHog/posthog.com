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

type BIFeature = {
    title: string
    description: string
    status?: 'available' | 'coming_soon'
}

const biFeatures: BIFeature[] = [
    {
        title: 'Table',
        description: 'The view that real engineers prefer.',
        status: 'available',
    },
    {
        title: 'Big number',
        description: 'Some numbers should be big.',
        status: 'available',
    },
    {
        title: 'Line chart',
        description: 'You kow what it does.',
        status: 'available',
    },
    {
        title: 'Bar chart',
        description: 'You can have multiple series, too.',
        status: 'available',
    },
    {
        title: 'Stacked bar chart',
        description: 'Pretty sweet for comparing parts of a whole over time.',
        status: 'available',
    },
    {
        title: 'Area chart',
        description: 'Fill in the area under the line.',
        status: 'available',
    },
    {
        title: 'Pivot table',
        description: 'Summarize and aggregate data across multiple dimensions for deeper insights.',
        status: 'coming_soon',
    },
]

export default function BusinessIntelligence(): JSX.Element {
    // Define table columns
    const columns = [
        { name: 'Feature', width: 'minmax(150px, 1fr)', align: 'left' as const },
        { name: 'Description', width: 'minmax(300px, 2fr)', align: 'left' as const },
        { name: '', width: '60px', align: 'center' as const },
    ]

    // Create table rows from biFeatures
    const featureRows = biFeatures.map((feature) => ({
        cells: [
            { content: <span className="font-bold">{feature.title}</span> },
            { content: feature.description, className: 'text-sm' },
            {
                content:
                    feature.status === 'coming_soon' ? (
                        <span className="rounded-sm bg-highlight py-0.5 px-1 text-xs font-bold text-red dark:text-yellow">
                            Soon
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
                title="Business Intelligence (BI) - Customer data infrastructure - PostHog"
                description="Learn about our business intelligence capabilities."
                image="images/og/cdp.jpg"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="Business Intelligence (BI)">
                <p>
                    PostHog's business intelligence (BI) capabilities empower product and data teams to derive deep
                    insights from their data. With integrated BI tools, teams can create interactive dashboards, perform
                    ad-hoc analyses, and visualize key metrics to drive informed decision-making.
                </p>
                <div className="dark:bg-dark bg-accent border border-input p-4 rounded mb-4">
                    <p className="!my-0">
                        <strong>Note:</strong> Looking for product analytics insights like timeseries trends and product
                        usage funnels? You're in the wrong place. Check out{' '}
                        <Link to="/product-analytics">Product analytics</Link>.
                    </p>
                </div>
                <div className="dark:bg-dark bg-accent border border-input p-4 rounded">
                    <p className="!mt-0">
                        <strong>Note:</strong> PostHog business intelligence is great for product teams and analysts who
                        have light visualization needs today, with support for advanced use-cases in active development.
                    </p>
                    <p className="!mb-0">
                        If you have advanced BI needs, we recommend you connect your favorite modeling tooling such as{' '}
                        <Link to="https://hex.tech/" external>
                            Hex
                        </Link>{' '}
                        directly to your PostHog DuckDB warehouse.
                    </p>
                </div>

                <div className="mb-8">
                    <h3>Features</h3>
                    <OSTable columns={columns} rows={featureRows} editable={false} />
                </div>

                <ProductScreenshot
                    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Post_Hog_business_intelligence_95b058ea82.png"
                    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Post_Hog_business_intelligence_95b058ea82.png"
                    alt="Business intelligence in PostHog"
                    classes="rounded"
                    zoom={false}
                />

                <p>You can also visualize your warehouse data with our product analytics insights.</p>
                <p>
                    <Link to="/docs/data-warehouse/insights" state={{ newWindow: true }}>
                        Use warehouse data in insights →
                    </Link>
                </p>
            </ReaderView>
        </>
    )
}
