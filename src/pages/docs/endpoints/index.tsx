import React from 'react'
import { SEO } from 'components/seo'
import ResourceItem from 'components/Docs/ResourceItem'
import Intro from 'components/Docs/Intro'
import ReaderView from 'components/ReaderView'
import Link from 'components/Link'
import { ProductScreenshot } from 'components/ProductScreenshot'
import { Caption } from 'components/Caption'
import { CalloutBox } from 'components/Docs/CalloutBox'

export const Content = () => {
    return (
        <>
            <section className="mb-8">
                <h2 className="mb-4" id="overview">
                    Overview
                </h2>
                <div>
                    <p>
                        Endpoints enable you to create predefined queries from PostHog insights or SQL queries and
                        expose them as API endpoints. You could use endpoints to:
                    </p>
                    <ul>
                        <li>
                            <b>Build embedded analytics.</b> Show analytics to your customers in your own application
                        </li>
                        <li>
                            <b>Pull aggregated PostHog data into your app.</b> Use PostHog data to create feeds with top
                            content, recommended items or more.
                        </li>
                    </ul>
                    <p>
                        Endpoints offers a number of advantages over our query API, such as materialization (giving you
                        better performance) and through the use of isolated resources.
                    </p>
                    <div className="flex justify-center mb-8">
                        <div className="text-center">
                            {' '}
                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/sql_query_from_endpoints_606a61f4c6.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/sql_query_from_endpoints_606a61f4c6.png"
                                alt="Example workflow"
                                padding={false}
                                classes="rounded @md:max-w-2xl"
                            />
                            <Caption>Create an endpoint</Caption>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 mt-0" id="how-endpoints-work">
                    How endpoints work
                </h2>
                <div>
                    <p>Endpoints follow a simple workflow:</p>
                    <ol>
                        <li>
                            <b>Create an insight or SQL query</b> in PostHog that defines the data you want to expose
                        </li>
                        <li>
                            <b>Create an endpoint</b> from that insight or query, giving it a custom name
                        </li>
                        <li>
                            <b>Access the data</b> via a simple API endpoint with improved performance and rate limits
                        </li>
                    </ol>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 mt-0" id="endpoint-url-pattern">
                    Endpoint URL pattern
                </h2>
                <div>
                    <p>Endpoints follow this URL pattern:</p>
                    <code>/api/environments/:project_id/endpoints/:endpoint_name/run</code>
                    <p>For example:</p>
                    <ul>
                        <li>
                            <code>/api/environments/2/endpoints/example-sql-2/run</code>
                        </li>
                        <li>
                            <code>/api/environments/2/endpoints/account_users_activity/run</code>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 mt-0" id="endpoints-vs-api-queries">
                    Endpoints vs API queries
                </h2>
                <CalloutBox icon="IconInfo" type="fyi" title="Endpoints vs API queries">
                    <p>You should use endpoints when you need:</p>
                    <ul>
                        <li>
                            <b>Better performance</b>: Optimized for predefined queries
                        </li>
                        <li>
                            <b>Higher rate limits</b>: More requests per minute/hour than standard API queries
                        </li>
                        <li>
                            <b>Stable URLs</b>: Consistent endpoint names that don't change
                        </li>
                    </ul>
                    <p>
                        If you need to run ad-hoc queries or don't have predefined queries,{' '}
                        <Link to="/docs/api/queries">API queries</Link> may be a better fit, but it will come at a cost.
                    </p>
                </CalloutBox>
            </section>

            <section className="mb-8">
                <h2 className="mb-4" id="next-steps">
                    Next steps
                </h2>
                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid grid-cols-1 @md:grid-cols-3">
                    <ResourceItem
                        type="Getting started"
                        title="Start here"
                        description="Create your first endpoint"
                        url="/docs/endpoints/start-here"
                    />
                    <ResourceItem
                        type="Resources"
                        title="Use cases and tips"
                        description="Common use cases and performance tips"
                        url="/docs/endpoints/use-cases-and-tips"
                    />
                    <ResourceItem
                        type="Resources"
                        title="Troubleshooting"
                        description="Common issues and solutions"
                        url="/docs/endpoints/troubleshooting"
                    />
                </ul>
            </section>
        </>
    )
}

const Endpoints: React.FC = () => {
    return (
        <ReaderView>
            <SEO title="Endpoints - Docs - PostHog" />

            <div className="mx-auto max-w-4xl">
                <section className="mb-6">
                    <Intro
                        subheader="Getting started"
                        title="Endpoints"
                        description="Create predefined queries from insights or SQL and expose them as optimized API endpoints."
                        buttonText="Get started"
                        buttonLink="/docs/endpoints/start-here"
                        imageClasses="max-h-48 md:max-h-64"
                        imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/hog_endpoints_8737bb2c29.png"
                    />
                </section>

                <Content />
            </div>
        </ReaderView>
    )
}

export default Endpoints
