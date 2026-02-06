import React, { useEffect } from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import Link from 'components/Link'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import { CallToAction } from 'components/CallToAction'

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

export default function WarehouseNative(): JSX.Element {
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'PostHog warehouse native – Warehouse-native analytics with PostHog Warehouse')
        }
    }, [appWindow, setWindowTitle])

    return (
        <>
            <SEO
                title="PostHog warehouse native – Warehouse-native analytics with PostHog Warehouse"
                description="PostHog offers an integrated data warehouse that enables warehouse-native workflows across other PostHog tools, such as analytics, feature flags, and surveys. Alternatively, you can ingest data from existing warehouses for use in PostHog."
                image="/images/og/default.png"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />}>
                <h1 className="mx-auto transition-all max-w-full">Is PostHog warehouse native?</h1>
                <p className="text-xl font-semibold text-primary mt-2">
                    PostHog and Snowflake's relationship status: It's complicated.
                </p>

                <div className="rounded-lg border border-primary/20 bg-accent/30 p-4 my-6 not-prose">
                    <p className="font-medium mb-2">tl;dr</p>
                    <p>
                        PostHog offers an integrated data warehouse that enables warehouse-native workflows across other PostHog tools, such as analytics, feature flags, and surveys. This eliminates the need to stitch multiple tools together and provides a single platform for storing and working with data. Alternatively, you can ingest data from an external warehouse, such as Snowflake, and run queries on PostHog compute.
                    </p>
                </div>

                <h2>What does "warehouse native" mean anyway?</h2>
                <p>
                    &ldquo;Warehouse native&rdquo; usually means that you have an external tool, such as an analytics. platform, that exists outside of your warehouse and does not ingest data. Queries and workloads are created in the external platform, but run on your data warehouse (Snowflake, BigQuery, Databricks, etc.) and the data stays there, never moving into the external tool. In PostHog, this is possible due to an integrated data warehouse which makes your warehouse accessible to other PostHog tools, such as product analytics.  
                </p>

                <h2>What does PostHog support today?</h2>
                <p>
                    PostHog offers an [integrated data warehouse](/managed-warehouse) which works with other PostHog tools such as product analytics, experiments, and feature flags. If you&apos;re using PostHog as your data warehouse then data stays where it is and can be accessed by other PostHog tools, eliminating the need for additional point solutions. If you&apos;re using an external warehouse, such as Snowflake, BigQuery, or Databricks, PostHog still enables you to sync data via our warehouse sources; queries then run on PostHog compute.
                </p>

                <h2>What does PostHog not support today?</h2>
                <p>
                    PostHog does not execute queries directly on an external warehouse (e.g. Snowflake, BigQuery, or
                    Databricks). If your requirement is &ldquo;run my analytics queries inside my existing
                    warehouse,&rdquo; that isn&apos;t how PostHog works today. We run queries on PostHog
                    infrastructure—either in our integrated warehouse or on data synced into PostHog via our warehouse sources.
                </p>

                <h2>Why this approach?</h2>
                <p>
                    The benefit of using an integrated stack like PostHog is that it gives you a single place for tools
                    such as product analytics, experiments, and feature targeting without hopping between your warehouse
                    and a separate product tool. We chose to own the execution environment so we can deliver that
                    experience consistently, while also offering users a way to eliminate point solutions that need to
                    be stitched together into complex data stacks.
                </p>

                <h2>What does this mean for the future?</h2>
                <p>
                    PostHog is building a managed warehouse based on DuckDB in addition to the current ClickHouse-based
                    warehouse. The long-term story is:{' '}
                    <strong>warehouse-native in practice because the warehouse is part of PostHog</strong>. If you're
                    interested in finding out more, we suggest [joining the waitlist for the managed DuckDB
                    warehouse](/managed-warehouse).
                </p>

                <p className="mt-8">
                    <Link to="/docs/data-warehouse/warehouse-native-workflows" state={{ newWindow: true }}>
                        Warehouse-native workflows (docs) →
                    </Link>
                    {' · '}
                    <Link to="/data-stack" state={{ newWindow: true }}>
                        PostHog data stack →
                    </Link>
                </p>

                <CallToAction />
            </ReaderView>
        </>
    )
}
