import Link from 'components/Link'
import React from 'react'
import { FeatureWrapperRow } from './FeatureWrapper'
import dataWarehouse from './images/data-warehouse.svg'

export default function DataWarehouse() {
    return (
        <FeatureWrapperRow
            title="Data warehouse"
            description={
                <>
                    <p>PostHog syncs with BigQuery, Snowflake, or Redshift.</p>
                    <p>
                        Or if you self-host PostHog, you can use ClickHouse as your data warehouse - it’s the database
                        that powers PostHog. <small className="text-black/50">(Coming soon to PostHog Cloud)</small>
                    </p>
                    <img src={dataWarehouse} />
                </>
            }
        />
    )
}
