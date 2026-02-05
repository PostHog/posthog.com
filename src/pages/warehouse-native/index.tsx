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
                description="Yes. PostHog supports warehouse-native workflows with its integrated data warehouse. We run queries on PostHog compute (we don't run them on your Snowflake/BigQuery today). Here's how it works."
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
                        PostHog is warehouse native if you're using our [integrated data warehouse](/managed-warehouse).
                        We also support a number of other warehouse native workflows. However, we generally run queries
                        on PostHog compute after syncing or ingesting the data—or after reading from your object
                        storage. This offers many of the benefits of a warehouse native approach, but also offers a way
                        to simplify your entire data stack into a single tool: PostHog.
                    </p>
                </div>

                <h2>What does "warehouse native" mean anyway?</h2>
                <p>
                    &ldquo;Warehouse native&rdquo; usually means that you have an external tool, such as an analytics
                    platform, that exists outside of your warehouse and does not ingest data. Queries and workloads are
                    created in the external platform, but run on your data warehouse (Snowflake, BigQuery, Databricks,
                    etc.) and the data stays there, never moving into the external tool. PostHog can this via our own
                    data warehouse, which can be used either as a standalone data warehouse or as part of an integrated
                    PostHog stack. However, while PostHog tools such as product analytics, experiments, and feature
                    flags, cannot be used on their own in a truly warehouse native setup. Teams either need to use our
                    [integrated data warehouse](/managed-warehouse), or use [the PostHog CDP](/cdp) to ingest data into
                    PostHog for these tools to use.
                </p>

                <h2>What does PostHog support today?</h2>
                <p>
                    PostHog offers an integrated data warehouse (built on ClickHouse today, with [DuckDB coming
                    soon](/managed-warehouse)) which works with many PostHog tools, such as product analytics,
                    experiments, and feature flags. This is an entirely warehouse native setup, as the data stays in the
                    PostHog warehouse and queries run on our compute. For teams using other warehouses, such as
                    Snowflake, BigQuery, or Databricks, PostHog can sync or ingest data for use with our tools. This
                    isn't warehouse native because data is synced into PostHog and queries run on our compute, but
                    offers a flexible way to use PostHog with external warehouses.
                </p>

                <h2>What does PostHog not support today?</h2>
                <p>
                    The only thing PostHog can not do today is execute queries directly on an external warehouse, such
                    as Snowflake, BigQuery, or Databricks. If your requirement is &ldquo;run my analytics queries inside
                    my existing warehouse,&rdquo; that isn&apos;t how PostHog works today. We run queries on PostHog
                    infrastructure - either because it's in our integrated warehouse, or because it's been
                    ingested/synced into PostHog infrastructure.
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
