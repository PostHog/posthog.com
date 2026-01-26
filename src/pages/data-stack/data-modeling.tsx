import React from 'react'
import ReaderView from 'components/ReaderView'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import Link from 'components/Link'
import { ProductScreenshot } from 'components/ProductScreenshot'

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

export default function DataModeling(): JSX.Element {
    return (
        <>
            <SEO
                title="Data modeling - PostHog data stack"
                description="Learn how to model your data in PostHog"
                image="images/og/cdp.jpg"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="Data modeling">
                <p>
                    PostHog provides powerful tools to clean, enrich, and model your data into the exact shape you need
                    for downstream use.
                </p>
                <div className="dark:bg-dark bg-accent border border-input p-4 rounded">
                    <p className="!mt-0">
                        <strong>Note:</strong> PostHog modeling is in{' '}
                        <span className="rounded-sm bg-highlight py-0.5 ml-2 px-1 text-xs font-bold text-red dark:text-yellow">
                            Beta
                        </span>
                        . It's great for product teams who have light modeling workloads today, with support for
                        advanced use-cases in active development.
                    </p>
                    <p className="!mb-0">
                        If you have advanced modeling needs, we recommend you connect your favorite modeling tooling
                        such as{' '}
                        <Link to="https://www.getdbt.com/" external>
                            dbt
                        </Link>{' '}
                        to your PostHog DuckDB warehouse.
                    </p>
                </div>

                <h3>Step 1: Create reusable queries with views</h3>

                <p>
                    PostHog's modeling workflow starts with creating <Link to="/docs/data-warehouse/views">views</Link>{' '}
                    for your data. This allows you to define custom transformations, joins, and aggregations using HogQL
                    (PostHog's SQL dialect), which can be used as reliable, structured foundations for data analysis.
                </p>

                <h3>Step 2: Create models for scalability</h3>

                <p>
                    Then, save those views into <Link to="/docs/data-warehouse/views/materialize">models</Link> (aka
                    materialized views) in the data warehouse for fast querying, cost saving, and integration with BI
                    tools.
                </p>

                <p>Models are refreshed on a schedule, as frequently as every 5 minutes or as long as monthly.</p>
                <ProductScreenshot
                    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_26_at_13_48_10_2x_88dc4ae252.png"
                    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_26_at_13_48_31_2x_16e9dbe683.png"
                    alt="Materialize view"
                    classes="rounded"
                    zoom={false}
                />
                <p>You can view your models in a DAG, or a visual graph of all model dependencies.</p>
                <ProductScreenshot
                    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Post_Hog_modeling_dag_8f59938982.png"
                    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Post_Hog_modeling_dag_8f59938982.png"
                    alt="DAG view"
                    classes="rounded"
                    zoom={false}
                />

                <h3>Features</h3>
                <ul>
                    <li>
                        <strong>Join multiple sources:</strong> Combine data from different tables and sources
                    </li>
                    <li>
                        <strong>Create calculated fields:</strong> Add derived metrics and computed columns
                    </li>
                    <li>
                        <strong>Build aggregations:</strong> Create summary tables and rollups
                    </li>
                    <li>
                        <strong>Save as models:</strong> Store complex queries as reusable views, materialized for speed
                    </li>
                    <li>
                        <strong>Version control:</strong> Track changes to your data models over time{' '}
                        <span className="rounded-sm bg-highlight py-0.5 ml-2 px-1 text-xs font-bold text-red dark:text-yellow">
                            Coming soon
                        </span>
                    </li>
                    <li>
                        <strong>Git & vcs integrations:</strong> Sync your models with your Git repository for
                        collaboration{' '}
                        <span className="rounded-sm bg-highlight py-0.5 ml-2 px-1 text-xs font-bold text-red dark:text-yellow">
                            Coming soon
                        </span>
                    </li>
                    <li>
                        <strong>DAG visualizations:</strong> view a graph of all model node relationships, and execute
                        workflows based on lineage{' '}
                        <span className="rounded-sm bg-highlight py-0.5 ml-2 px-1 text-xs font-bold text-red dark:text-yellow">
                            Coming soon
                        </span>
                    </li>
                </ul>
                <p>
                    <Link to="/docs/data-warehouse/views/materialize" state={{ newWindow: true }}>
                        Learn how to model your data →
                    </Link>
                </p>

                <hr />

                <h2>Common modeling use cases</h2>

                <h3>User identity resolution</h3>
                <ul>
                    <li>Merge anonymous and identified user sessions</li>
                    <li>Link user IDs across different systems</li>
                    <li>Create a unified customer profile</li>
                </ul>

                <h3>Revenue attribution</h3>
                <ul>
                    <li>Connect product usage to revenue data from Stripe</li>
                    <li>Calculate customer lifetime value</li>
                    <li>Attribute revenue to specific features or campaigns</li>
                </ul>

                <h3>Data standardization</h3>
                <ul>
                    <li>Normalize event names across different platforms</li>
                    <li>Standardize timestamp formats and timezones</li>
                    <li>Map custom properties to a consistent schema</li>
                </ul>

                <h3>Privacy compliance</h3>
                <ul>
                    <li>Automatically remove or hash PII</li>
                    <li>Implement data retention policies</li>
                    <li>Apply GDPR/CCPA compliance rules</li>
                </ul>
            </ReaderView>
        </>
    )
}
