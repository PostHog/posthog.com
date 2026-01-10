import React from 'react'
import ReaderView from 'components/ReaderView'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import Link from 'components/Link'
import { ProductScreenshot } from 'components/ProductScreenshot'
import FeatureTable from './FeatureTable'

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
        title: 'Basic visualizations',
        description: 'Table, big number, line chart, bar chart, stacked bar chart, area chart.',
    },
    {
        title: 'Advanced visualizations',
        description: 'Pivot table, pie chart, scatter plot, heatmap, world maps, and more.',
        status: 'coming_soon',
    },
    {
        title: 'No-code data exploration',
        description: 'Easily explore and analyze your data without writing SQL queries.',
        status: 'coming_soon',
    },
    {
        title: 'Drag-and-drop dashboards',
        description: 'Create and customize dashboards with a simple drag-and-drop interface.',
    },
    {
        title: 'Dashboard filtering & variables',
        description: 'Apply filters and variables to dashboards for ad-hoc data exploration.',
    },
    {
        title: 'Product analytics insights',
        description: 'Leverage built-in product analytics insights for quick access to key metrics.',
    },
    {
        title: 'Text-to-SQL with PostHog AI',
        description: 'Generate SQL queries from natural language prompts using PostHog AI.',
    },
]

export default function BusinessIntelligence(): JSX.Element {
    return (
        <>
            <SEO
                title="Business Intelligence (BI) - PostHog data stack"
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
                        If you have advanced BI needs, we recommend you connect your favorite BI tooling such as{' '}
                        <Link to="https://hex.tech/" external>
                            Hex
                        </Link>{' '}
                        directly to your PostHog DuckDB warehouse.
                    </p>
                </div>

                <div className="mb-8">
                    <h3>Features</h3>
                    <FeatureTable features={biFeatures} />
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
