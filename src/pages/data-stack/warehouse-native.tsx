import React, { useEffect } from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import Link from 'components/Link'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

export default function WarehouseNative(): JSX.Element {
    return (
        <>
            <SEO
                title="Is PostHog warehouse native? – PostHog integrated data warehouse"
                description="PostHog includes an integrated data warehouse with enough tools that your data never needs to travel. You can also connect external warehouses as sources to use your warehouse tables inside PostHog."
                image="/images/og/default.png"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />}>
                <h1 className="mx-auto transition-all max-w-full">Is PostHog warehouse native?</h1>
                <p className="text-xl font-semibold text-primary mt-2">
                    PostHog and Snowflake's relationship status: It's complicated.
                </p>

                <div className="rounded-md border border-primary bg-accent p-4 my-6 not-prose">
                    <p className="font-medium mb-2">tl;dr</p>
                    <p>
                        PostHog enables you to connect external warehouses (like Snowflake or BigQuery) as sources to
                        use warehouse tables inside PostHog. This moves selected data into PostHog and runs queries on
                        our compute. You keep your data in your existing warehouse while still benefitting from PostHog
                        tools such as analytics, experiments, and feature flags.
                    </p>
                    <p>
                        Alternatively, you can use PostHog's integrated data warehouse so that your data never needs to
                        travel. You can store and model data in PostHog&apos;s warehouse, then use it across PostHog
                        tools without stitching together multiple vendors or maintaining complex ETL pipelines.
                    </p>
                </div>

                <h2>What does "warehouse native" mean anyway?</h2>
                <p>
                    &ldquo;Warehouse native&rdquo; usually means that you have an external tool, such as an analytics
                    platform, that exists outside of your warehouse and does not ingest data. Queries and workloads are
                    created in the external platform, but run on your data warehouse (Snowflake, BigQuery, Databricks,
                    etc.) and the data stays there, never moving into the external tool. This is what tools like Statsig
                    and Amplitude offer — they run queries directly in your existing warehouse.
                </p>
                <p>
                    PostHog takes a different approach: we give you the flexibility to either move selected data into
                    PostHog from an external warehouse, or to use our integrated data warehouse. Both options enable you
                    to use warehouse data with PostHog tools and run queries on our compute, while also giving you
                    complete control of where data is stored.
                </p>

                <h2>What does PostHog support today?</h2>
                <p>
                    If you&apos;re using an external warehouse, such as Snowflake, BigQuery, or Databricks, you can
                    connect it as a source and sync the tables and fields you need into PostHog via our warehouse
                    sources. Queries then run on PostHog compute, enabling you to use warehouse data across PostHog
                    tools. This requires moving data out of the warehouse and running compute in PostHog, but gives you
                    the flexibility to keep your data in your existing warehouse while still benefitting from PostHog
                    tools.
                </p>
                <p>
                    Alternatively, PostHog offers an{' '}
                    <Link to="/docs/data-warehouse/integrated-warehouse" state={{ newWindow: true }}>
                        integrated data warehouse
                    </Link>{' '}
                    which works with other PostHog tools such as product analytics, experiments, and feature flags. If
                    you&apos;re using PostHog as your data warehouse, your data stays in PostHog and can be accessed by
                    other PostHog tools, eliminating the need to stitch multiple vendors together and maintain complex
                    ETL pipelines.
                </p>

                <h2>What does PostHog not support today?</h2>
                <p>
                    PostHog does not execute queries directly on an external warehouse (e.g. Snowflake, BigQuery, or
                    Databricks). If your requirement is &ldquo;run my analytics queries inside my existing
                    warehouse,&rdquo; that isn&apos;t how PostHog works today. We run queries on PostHog
                    infrastructure—either in our integrated warehouse or on data synced into PostHog via our warehouse
                    sources.
                </p>

                <h2>Why this approach?</h2>
                <p>
                    The benefit of using an integrated stack like PostHog is that it gives you a single place for tools
                    such as product analytics, experiments, and feature targeting without hopping between your warehouse
                    and a separate product tool. We chose to own the execution environment so we can deliver that
                    experience consistently, while also offering users a way to eliminate point solutions that need to
                    be stitched together into complex data stacks.
                </p>
                <p>
                    Companies like{' '}
                    <Link to="/customers/headshotpro" state={{ newWindow: true }}>
                        HeadshotPro
                    </Link>
                    ,{' '}
                    <Link to="/customers/webshare" state={{ newWindow: true }}>
                        Webshare
                    </Link>
                    , and{' '}
                    <Link to="/customers/elevenlabs" state={{ newWindow: true }}>
                        ElevenLabs
                    </Link>{' '}
                    use PostHog&apos;s integrated warehouse as their single source of truth. This eliminates the need to
                    maintain multiple systems and complex ETL pipelines.
                </p>

                <h2>What does this mean for the future?</h2>
                <p>
                    PostHog is building a managed warehouse based on DuckDB in addition to the current ClickHouse-based
                    warehouse. The focus is on expanding what integrates with our integrated warehouse, making it easier
                    to use PostHog as your primary data platform without needing to stitch together multiple tools. If
                    you&apos;re interested in finding out more, we suggest{' '}
                    <Link to="/data-stack/managed-warehouse">
                        joining the waitlist for the managed DuckDB warehouse
                    </Link>
                    .
                </p>
                <p className="mt-8">
                    <Link to="/docs/data-warehouse/integrated-warehouse" state={{ newWindow: true }}>
                        How PostHog&apos;s integrated warehouse works (docs) →
                    </Link>
                </p>
            </ReaderView>
        </>
    )
}
